<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Classes;
use App\Models\Book;

class SchoolController extends Controller
{
    /**
     * Store a newly created school in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'district_id' => 'required|exists:school_districts,id',
            'type' => 'required|in:Primary,Secondary,Combined',
            'connectivity_status' => 'required|in:Online,Hybrid,Offline'
        ]);
        
        // Generate a unique code for the school
        $validated['code'] = strtoupper(substr(str_replace(' ', '', $validated['name']), 0, 3) . '-' . Str::random(5));
        
        // Convert type and connectivity_status to lowercase to match database enum values
        $validated['type'] = strtolower($validated['type']);
        $validated['connectivity_status'] = strtolower($validated['connectivity_status']);
        
        // Set default values for required fields
        $validated['address'] = $validated['address'] ?? 'TBD';
        $validated['city'] = $validated['city'] ?? 'TBD';
        $validated['province'] = $validated['province'] ?? 'TBD';
        $validated['phone'] = $validated['phone'] ?? 'TBD';

        $school = School::create($validated);
        
        return redirect()->back()->with('success', 'School created successfully!');
    }

    /**
     * Display the specified school.
     *
     * @param  \App\Models\School  $school
     * @return \Inertia\Response
     */
    public function show(School $school)
    {
        // Load the school's district
        $school->load('district');
        
        // Get students associated with this school
        $students = User::where('school_id', $school->id)
            ->where('user_type', 'student')
            ->with('student')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'grade' => $user->student?->grade_level ?? 'N/A',
                    'performance' => 'Good', // This would come from grades or other metrics
                    'status' => $user->student?->is_active ? 'Active' : 'Inactive',
                    'student_id' => $user->student?->id, // Add student_id for reference
                    'birthdate' => $user->student?->date_of_birth,
                    'gender' => $user->student?->gender,
                ];
            });
        
        // Get teachers associated with this school
        $teachers = User::where('school_id', $school->id)
            ->where('user_type', 'teacher')
            ->with('teacher')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'subject' => $user->teacher?->subject_specialty ?? 'N/A',
                    'status' => $user->teacher?->employment_status ?? 'Active',
                ];
            });
        
        // Get classes for this school
        $classes = Classes::where('school_id', $school->id)
            ->with('teacher:id,name')
            ->withCount('students')
            ->get()
            ->map(function ($class) {
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'grade' => $class->grade_level,
                    'teacher_name' => $class->teacher?->name ?? 'Unassigned',
                    'student_count' => $class->students_count,
                ];
            });
        
        // Get administrators for this school
        $admins = User::where('school_id', $school->id)
            ->whereIn('user_type', ['admin', 'school_admin'])
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => ucfirst($user->user_type),
                    'status' => 'Active',
                ];
            });
        
        // Get books in the school's library
        $books = Book::where('school_id', $school->id)
            ->with(['borrowings' => function($query) {
                $query->whereNull('returned_at');
            }])
            ->get()
            ->map(function ($book) {
                // Check if the book is currently borrowed
                $is_borrowed = $book->borrowings->count() > 0;
                
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'author' => $book->author,
                    'isbn' => $book->isbn,
                    'publication_year' => $book->publication_year,
                    'category' => $book->category,
                    'description' => $book->description,
                    'is_borrowed' => $is_borrowed,
                    // Get the current borrower if the book is borrowed
                    'current_borrower' => $is_borrowed ? [
                        'id' => $book->borrowings->first()->user_id,
                        'due_date' => $book->borrowings->first()->due_date,
                    ] : null,
                ];
            });
        
        // Format the school data for the frontend
        $schoolData = [
            'id' => $school->id,
            'name' => $school->name,
            'code' => $school->code,
            'district' => $school->district->name ?? 'N/A',
            'district_id' => $school->district_id,
            'type' => $school->type,
            'connectivity_status' => $school->connectivity_status,
            'address' => $school->address,
            'city' => $school->city,
            'province' => $school->province,
            'phone' => $school->phone,
            'email' => $school->email,
            'principal_name' => $school->principal_name,
            'internet_provider' => $school->internet_provider,
            'has_smartboards' => $school->has_smartboards,
            'student_count' => $school->student_count,
            'teacher_count' => $school->teacher_count,
            'school_hours' => $school->school_hours ?? '',
        ];
        
        return Inertia::render('Schools/Show', [
            'school' => $schoolData,
            'students' => $students,
            'teachers' => $teachers,
            'classes' => $classes,
            'admins' => $admins,
            'books' => $books,
        ]);
    }

    /**
     * Update the specified school in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, School $school)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'district_id' => 'required|exists:school_districts,id',
            'type' => 'required|in:primary,secondary,combined',
            'connectivity_status' => 'required|in:online,offline,hybrid',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'province' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'principal_name' => 'nullable|string',
            'internet_provider' => 'nullable|string',
            'has_smartboards' => 'boolean',
            'student_count' => 'nullable|integer',
            'teacher_count' => 'nullable|integer',
            'school_hours' => 'nullable|string',
        ]);
        
        $school->update($validated);
        
        return redirect()->back()->with('success', 'School updated successfully!');
    }

    /**
     * Get teachers for a specific school.
     *
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTeachers(School $school)
    {
        $teachers = User::where('school_id', $school->id)
            ->where('user_type', 'teacher')
            ->with('teacher')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'subject' => $user->teacher?->subject_specialty ?? 'N/A',
                    'status' => $user->teacher?->employment_status ?? 'Active',
                ];
            });
        
        return response()->json($teachers);
    }

    /**
     * Get school data for a specific school.
     *
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSchool(\App\Models\School $school)
    {
        // Format the school data for the frontend
        $schoolData = [
            'id' => $school->id,
            'name' => $school->name,
            'code' => $school->code,
            'district' => $school->district->name ?? 'N/A',
            'type' => $school->type,
            'connectivity_status' => $school->connectivity_status,
            'address' => $school->address,
            'city' => $school->city,
            'province' => $school->province,
            'phone' => $school->phone,
            'email' => $school->email,
            'principal_name' => $school->principal_name,
            'internet_provider' => $school->internet_provider,
            'has_smartboards' => $school->has_smartboards,
            'student_count' => $school->student_count,
            'teacher_count' => $school->teacher_count,
            'school_hours' => $school->school_hours ?? '',
        ];
        
        return response()->json($schoolData);
    }

    /**
     * Remove the specified school from storage.
     *
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(School $school)
    {
        $school->delete();
        return redirect()->back()->with('success', 'School deleted successfully!');
    }
}
