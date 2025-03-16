<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Store a newly created student in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'grade' => 'required|string|max:255',
            'school_id' => 'required|exists:schools,id',
            'parent_id' => 'nullable|exists:users,id'
        ]);
        
        // Create user account
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('password'), // Default password
            'school_id' => $validated['school_id'],
            'user_type' => 'student',
        ]);
        
        // Create student record
        $student = Student::create([
            'user_id' => $user->id,
            'grade_level' => $validated['grade'],
            'parent_id' => $validated['parent_id'] ?? null,
            'is_active' => true,
        ]);
        
        return redirect()->back()->with('success', 'Student added successfully!');
    }

    /**
     * Update the specified student in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'grade' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:users,id',
            'is_active' => 'nullable|boolean'
        ]);
        
        // Update user
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);
        
        // Update student
        $user->student()->update([
            'grade_level' => $validated['grade'],
            'parent_id' => $validated['parent_id'] ?? $user->student->parent_id,
            'is_active' => $validated['is_active'] ?? $user->student->is_active,
        ]);
        
        return redirect()->back()->with('success', 'Student updated successfully!');
    }

    /**
     * Remove the specified student from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Delete student record
        $user->student()->delete();
        
        // Delete user
        $user->delete();
        
        return redirect()->back()->with('success', 'Student deleted successfully!');
    }
}
