<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class ParentController extends Controller
{
    /**
     * Display the parent dashboard.
     */
    public function dashboard()
    {
        $parent = Auth::user();
        $students = $parent->students()->with('user')->get();
        
        return Inertia::render('Parent/Dashboard', [
            'students' => $students,
        ]);
    }
    
    /**
     * Show the form for adding a new student.
     */
    public function createStudent()
    {
        return Inertia::render('Parent/CreateStudent');
    }
    
    /**
     * Store a new student.
     */
    public function storeStudent(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'grade_level' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|in:male,female,other',
            'emergency_contact' => 'nullable|string|max:50',
            'medical_information' => 'nullable|string',
        ]);
        
        // Create student user account
        $studentUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => 'student',
            'is_active' => true,
        ]);
        
        // Create student profile linked to parent
        $student = Student::create([
            'user_id' => $studentUser->id,
            'parent_id' => Auth::id(),
            'grade_level' => $request->grade_level,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'emergency_contact' => $request->emergency_contact,
            'medical_information' => $request->medical_information,
            'is_active' => true,
        ]);
        
        return redirect()->route('parent.dashboard')->with('success', 'Student added successfully');
    }
    
    /**
     * Show the form for editing a student.
     */
    public function editStudent(Student $student)
    {
        // Ensure the parent can only edit their own students
        if ($student->parent_id !== Auth::id()) {
            abort(403);
        }
        
        return Inertia::render('Parent/EditStudent', [
            'student' => $student->load('user'),
        ]);
    }
    
    /**
     * Update the student information.
     */
    public function updateStudent(Request $request, Student $student)
    {
        // Ensure the parent can only update their own students
        if ($student->parent_id !== Auth::id()) {
            abort(403);
        }
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,'.$student->user_id,
            'grade_level' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string|in:male,female,other',
            'emergency_contact' => 'nullable|string|max:50',
            'medical_information' => 'nullable|string',
        ]);
        
        // Update student user account
        $student->user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);
        
        // Update student profile
        $student->update([
            'grade_level' => $request->grade_level,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'emergency_contact' => $request->emergency_contact,
            'medical_information' => $request->medical_information,
        ]);
        
        return redirect()->route('parent.dashboard')->with('success', 'Student updated successfully');
    }
    
    /**
     * Toggle student account status (active/inactive).
     */
    public function toggleStudentStatus(Student $student)
    {
        // Ensure the parent can only manage their own students
        if ($student->parent_id !== Auth::id()) {
            abort(403);
        }
        
        $student->update([
            'is_active' => !$student->is_active,
        ]);
        
        $status = $student->is_active ? 'activated' : 'deactivated';
        
        return redirect()->route('parent.dashboard')
            ->with('success', "Student account {$status} successfully");
    }
}
