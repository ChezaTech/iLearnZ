<?php

namespace App\Http\Controllers;

use App\Models\Classes;
use App\Models\User;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Enrollment;

class ClassController extends Controller
{
    /**
     * Display a listing of the classes.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get the school associated with the user
        $school = null;
        if ($user->role_id == 2) { // School admin role
            $school = School::where('id', $user->school_id)->first();
        } else {
            // If not a school admin, get the school from the user's school_id
            $school = $user->school;
        }
        
        // If no school is found, return with an error
        if (!$school) {
            return Inertia::render('SchoolAdmin/Dashboard', [
                'error' => 'No school associated with your account. Please contact the administrator.'
            ]);
        }
        
        $classes = Classes::where('school_id', $school->id)
            ->with('teacher:id,name,email')
            ->withCount('students')
            ->get()
            ->map(function ($class) {
                // Calculate average score if there are grades
                $averageScore = $class->grades()->avg('score') ?? 0;
                
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'grade_level' => $class->grade_level,
                    'section' => $class->section,
                    'teacher_id' => $class->teacher_id,
                    'teacher_name' => $class->teacher ? $class->teacher->name : 'Unassigned',
                    'students_count' => $class->students_count,
                    'average_score' => round($averageScore, 2),
                    'is_active' => $class->is_active,
                ];
            });
            
        // Get available teachers for assignment
        $teachers = User::where('school_id', $school->id)
            ->where('role_id', 3) // Teacher role
            ->select('id', 'name', 'email')
            ->get();
            
        return Inertia::render('SchoolAdmin/Classes/Index', [
            'classes' => $classes,
            'teachers' => $teachers,
        ]);
    }

    /**
     * Store a newly created class in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        // Get the school associated with the user
        // First check if user is a school admin
        $school = null;
        if ($user->role_id == 2) { // School admin role
            $school = School::where('id', $user->school_id)->first();
        } else {
            // If not a school admin, get the school from the user's school_id
            $school = $user->school;
        }
        
        // If no school is found, return with an error
        if (!$school) {
            return redirect()->back()->with('error', 'No school associated with your account. Please contact the administrator.');
        }
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'grade_level' => 'required|string|max:255',
            'section' => 'nullable|string|max:255',
            'teacher_id' => 'nullable|exists:users,id',
            'max_students' => 'nullable|integer|min:1',
            'academic_year' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);
        
        // Create class
        $class = Classes::create([
            'name' => $validated['name'],
            'grade_level' => $validated['grade_level'],
            'section' => $validated['section'] ?? null,
            'teacher_id' => $validated['teacher_id'] ?? null,
            'school_id' => $school->id,
            'max_students' => $validated['max_students'] ?? 40,
            'academic_year' => $validated['academic_year'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'] ?? null,
            'is_active' => true,
        ]);
        
        return redirect()->back()->with('success', 'Class added successfully!');
    }

    /**
     * Display the specified class.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $class = Classes::with(['teacher:id,name,email', 'students:id,name,email'])->findOrFail($id);
        
        $user = Auth::user();
        
        // Get the school associated with the user
        $school = null;
        if ($user->role_id == 2) { // School admin role
            $school = School::where('id', $user->school_id)->first();
        } else {
            // If not a school admin, get the school from the user's school_id
            $school = $user->school;
        }
        
        // If no school is found, return with an error
        if (!$school) {
            return Inertia::render('SchoolAdmin/Dashboard', [
                'error' => 'No school associated with your account. Please contact the administrator.'
            ]);
        }
        
        // Verify that the class belongs to the user's school
        if ($class->school_id !== $school->id) {
            return redirect()->route('classes.index')->with('error', 'You do not have permission to view this class.');
        }
            
        // Get available teachers for assignment
        $availableTeachers = User::where('school_id', $school->id)
            ->where('role_id', 3) // Teacher role
            ->select('id', 'name', 'email')
            ->get();
            
        // Get available students (not enrolled in this class)
        $enrolledStudentIds = $class->students->pluck('id')->toArray();
        $availableStudents = User::where('school_id', $school->id)
            ->where('role_id', 4) // Student role
            ->whereNotIn('id', $enrolledStudentIds)
            ->select('id', 'name', 'email')
            ->get();
            
        return Inertia::render('SchoolAdmin/Classes/Show', [
            'class' => [
                'id' => $class->id,
                'name' => $class->name,
                'grade_level' => $class->grade_level,
                'section' => $class->section,
                'teacher_id' => $class->teacher_id,
                'teacher' => $class->teacher,
                'students' => $class->students,
                'academic_year' => $class->academic_year,
                'start_date' => $class->start_date,
                'end_date' => $class->end_date,
                'is_active' => $class->is_active,
                'max_students' => $class->max_students,
            ],
            'availableTeachers' => $availableTeachers,
            'availableStudents' => $availableStudents,
        ]);
    }

    /**
     * Update the specified class in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'grade_level' => 'required|string|max:255',
            'section' => 'nullable|string|max:255',
            'teacher_id' => 'nullable|exists:users,id',
            'max_students' => 'nullable|integer|min:1',
            'academic_year' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_active' => 'boolean',
        ]);
        
        $class->update([
            'name' => $validated['name'],
            'grade_level' => $validated['grade_level'],
            'section' => $validated['section'] ?? $class->section,
            'teacher_id' => $validated['teacher_id'] ?? $class->teacher_id,
            'max_students' => $validated['max_students'] ?? $class->max_students,
            'academic_year' => $validated['academic_year'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'] ?? $class->end_date,
            'is_active' => $validated['is_active'] ?? $class->is_active,
        ]);
        
        return redirect()->back()->with('success', 'Class updated successfully!');
    }
    
    /**
     * Remove the specified class from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $class = Classes::findOrFail($id);
        $class->delete();
        
        return redirect()->route('classes.index')->with('success', 'Class deleted successfully!');
    }
    
    /**
     * Add a student to the class.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addStudent(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        
        $validated = $request->validate([
            'student_id' => 'required|exists:users,id',
            'enrollment_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);
        
        // Check if student is already enrolled
        $existingEnrollment = $class->students()->where('student_id', $validated['student_id'])->exists();
        if ($existingEnrollment) {
            return redirect()->back()->with('error', 'Student is already enrolled in this class.');
        }
        
        // Check if class has reached maximum students
        if ($class->students()->count() >= $class->max_students) {
            return redirect()->back()->with('error', 'Class has reached maximum student capacity.');
        }
        
        // Enroll student
        $class->students()->attach($validated['student_id'], [
            'enrollment_date' => $validated['enrollment_date'] ?? now(),
            'status' => 'active',
            'notes' => $validated['notes'] ?? null,
        ]);
        
        return redirect()->back()->with('success', 'Student added to class successfully!');
    }
    
    /**
     * Remove a student from the class.
     *
     * @param  int  $id
     * @param  int  $student_id
     * @return \Illuminate\Http\Response
     */
    public function removeStudent($id, $student_id)
    {
        $class = Classes::findOrFail($id);
        
        // Check if student is enrolled and remove them
        if (request()->expectsJson()) {
            // API request - return JSON response
            $deleted = Enrollment::where('class_id', $class->id)
                ->where('student_id', $student_id)
                ->delete();
                
            if ($deleted) {
                return response()->json([
                    'message' => 'Student removed successfully',
                ]);
            } else {
                return response()->json([
                    'message' => 'Student not found in this class',
                ], 404);
            }
        } else {
            // Web request - return redirect response
            $enrollment = $class->students()->where('student_id', $student_id)->first();
            if (!$enrollment) {
                return redirect()->back()->with('error', 'Student is not enrolled in this class.');
            }
            
            // Remove student from class
            $class->students()->detach($student_id);
            
            return redirect()->back()->with('success', 'Student removed from class successfully!');
        }
    }
    
    /**
     * Get students enrolled in a class.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStudents($id)
    {
        $class = Classes::findOrFail($id);
        $students = $class->students()->select('id', 'name', 'email')->get();
        
        return response()->json($students);
    }
    
    /**
     * Get all students available to be added to a class (not already enrolled).
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAvailableStudents($id)
    {
        $class = Classes::findOrFail($id);
        $user = Auth::user();
        
        // Get the school associated with the user
        $school = null;
        if ($user->role_id == 2) { // School admin role
            $school = School::where('id', $user->school_id)->first();
        } else {
            // If not a school admin, get the school from the user's school_id
            $school = $user->school;
        }
        
        // If no school is found, return empty array
        if (!$school) {
            return response()->json([]);
        }
        
        // Get enrolled student IDs
        $enrolledStudentIds = $class->students()->pluck('id')->toArray();
        
        // Get available students (not enrolled in this class)
        $availableStudents = User::where('school_id', $school->id)
            ->where('role_id', 4) // Student role
            ->whereNotIn('id', $enrolledStudentIds)
            ->select('id', 'name', 'email')
            ->get();
            
        return response()->json($availableStudents);
    }
    
    /**
     * Add multiple students to a class.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function addStudents(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        
        $validated = $request->validate([
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:users,id',
        ]);
        
        // Check if adding these students would exceed the maximum capacity
        $currentEnrollmentCount = $class->students()->count();
        $newStudentsCount = count($validated['student_ids']);
        
        if ($class->max_students && ($currentEnrollmentCount + $newStudentsCount) > $class->max_students) {
            return response()->json([
                'message' => 'Cannot add all students. It would exceed the maximum capacity of ' . $class->max_students . ' students.'
            ], 422);
        }
        
        // Add each student to the class
        $enrollmentDate = now();
        $enrollments = [];
        
        foreach ($validated['student_ids'] as $studentId) {
            // Check if student is already enrolled
            $existingEnrollment = Enrollment::where('class_id', $class->id)
                ->where('student_id', $studentId)
                ->exists();
                
            if (!$existingEnrollment) {
                $enrollments[] = [
                    'class_id' => $class->id,
                    'student_id' => $studentId,
                    'enrollment_date' => $enrollmentDate,
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        
        // Bulk insert enrollments
        if (!empty($enrollments)) {
            Enrollment::insert($enrollments);
        }
        
        return response()->json([
            'message' => 'Students added successfully',
            'enrolled_count' => count($enrollments),
        ]);
    }
}
