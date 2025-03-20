<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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
        // Log the request data for debugging
        Log::info('Student store request data:', $request->all());
        
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'birthdate' => 'required|date',
                'gender' => 'required|string|in:male,female,other',
                'password' => 'required|string|min:6',
                'school_id' => 'required|exists:schools,id',
            ]);
            
            Log::info('Validation passed');
            
            // Create user account
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'school_id' => $validated['school_id'],
                'user_type' => 'student',
                'role_id' => 4, // Student role
            ]);
            
            Log::info('User created', ['user_id' => $user->id]);
            
            // Create student record
            $student = Student::create([
                'user_id' => $user->id,
                'date_of_birth' => $validated['birthdate'],
                'gender' => $validated['gender'],
                'is_active' => true,
            ]);
            
            Log::info('Student created successfully:', ['user_id' => $user->id, 'student_id' => $student->id]);
            
            return redirect()->back()->with('success', 'Student added successfully!');
        } catch (\Exception $e) {
            Log::error('Error creating student: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Failed to create student: ' . $e->getMessage()]);
        }
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
            'birthdate' => 'required|date',
            'gender' => 'required|string|in:male,female,other',
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
            'date_of_birth' => $validated['birthdate'],
            'gender' => $validated['gender'],
            'parent_id' => $validated['parent_id'] ?? $user->student->parent_id,
            'is_active' => $validated['is_active'] ?? $user->student->is_active,
        ]);
        
        return redirect()->back()->with('success', 'Student updated successfully!');
    }

    /**
     * Remove the specified student from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);
            
            // Check if user has a student record
            if (!$user->student) {
                return response()->json(['error' => 'No student record found for this user'], 404);
            }
            
            // Delete student record
            $user->student()->delete();
            
            // Delete user
            $user->delete();
            
            Log::info('Student deleted successfully', ['user_id' => $id]);
            
            return response()->json(['message' => 'Student deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Error deleting student: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete student: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Reset the password for the specified student.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword($id)
    {
        $user = User::findOrFail($id);
        
        // Generate a random password or use a default one
        $newPassword = 'password123'; // You might want to generate a random one in production
        
        // Update the user's password
        $user->update([
            'password' => Hash::make($newPassword)
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Password has been reset successfully.'
        ]);
    }

    /**
     * Display the specified student.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $user = User::with('student')->findOrFail($id);
        
        return Inertia::render('Students/Show', [
            'student' => $user
        ]);
    }
}
