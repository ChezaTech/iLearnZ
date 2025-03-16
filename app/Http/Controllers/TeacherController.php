<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Teacher;
use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Store a newly created teacher in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Get the authenticated user
        $user = Auth::user();
        
        // Get the school associated with the user
        $school = School::where('id', $user->school_id)->first();
        
        // If no school is found, return with an error
        if (!$school) {
            return redirect()->back()->with('error', 'No school associated with your account. Please contact the administrator.');
        }
        
        // Check if we're using an existing user or creating a new one
        if ($request->has('existing_user_id') && $request->existing_user_id) {
            // Validate the request
            $validated = $request->validate([
                'existing_user_id' => 'required|exists:users,id',
                'subject' => 'required|string|max:255',
                'employment_status' => 'required|in:Active,On Leave,Inactive',
                'qualification' => 'nullable|string|max:255',
                'years_of_experience' => 'nullable|integer|min:0',
            ]);
            
            // Get the existing user
            $existingUser = User::findOrFail($validated['existing_user_id']);
            
            // Update the user to have teacher role and school_id
            $existingUser->update([
                'role_id' => 3, // Teacher role
                'school_id' => $school->id,
                'user_type' => 'teacher',
            ]);
            
            // Generate a teacher ID number
            $teacherIdNumber = 'TCH' . str_pad($existingUser->id, 5, '0', STR_PAD_LEFT);
            
            // Create or update teacher record
            $teacher = Teacher::updateOrCreate(
                ['user_id' => $existingUser->id],
                [
                    'school_id' => $school->id,
                    'subject_specialty' => $validated['subject'],
                    'employment_status' => $validated['employment_status'],
                    'qualification' => $validated['qualification'] ?? null,
                    'years_of_experience' => $validated['years_of_experience'] ?? null,
                    'is_active' => $validated['employment_status'] === 'Active',
                    'teacher_id_number' => $teacherIdNumber,
                ]
            );
            
            return redirect()->back()->with('success', 'Teacher added successfully!');
        } else {
            // Validate the request for creating a new user
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'subject' => 'required|string|max:255',
                'employment_status' => 'required|in:Active,On Leave,Inactive',
                'qualification' => 'nullable|string|max:255',
                'years_of_experience' => 'nullable|integer|min:0',
            ]);
            
            // Create user account
            $newUser = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('password'), // Default password
                'school_id' => $school->id,
                'user_type' => 'teacher',
                'role_id' => 3, // Teacher role
                'is_active' => true,
            ]);
            
            // Generate a teacher ID number
            $teacherIdNumber = 'TCH' . str_pad($newUser->id, 5, '0', STR_PAD_LEFT);
            
            // Create teacher record
            $teacher = Teacher::create([
                'user_id' => $newUser->id,
                'school_id' => $school->id,
                'subject_specialty' => $validated['subject'],
                'employment_status' => $validated['employment_status'],
                'qualification' => $validated['qualification'] ?? null,
                'years_of_experience' => $validated['years_of_experience'] ?? null,
                'is_active' => $validated['employment_status'] === 'Active',
                'teacher_id_number' => $teacherIdNumber,
            ]);
            
            return redirect()->back()->with('success', 'Teacher added successfully!');
        }
    }

    /**
     * Update the specified teacher in storage.
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
            'subject' => 'required|string|max:255',
            'employment_status' => 'required|in:Active,On Leave,Inactive',
            'qualification' => 'nullable|string|max:255',
            'years_of_experience' => 'nullable|integer|min:0',
        ]);
        
        // Update user
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);
        
        // Check if teacher record exists
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        // If teacher record doesn't exist, generate a teacher ID number
        $teacherIdNumber = $teacher ? $teacher->teacher_id_number : 'TCH' . str_pad($user->id, 5, '0', STR_PAD_LEFT);
        
        // Update teacher
        $user->teacher()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'subject_specialty' => $validated['subject'],
                'employment_status' => $validated['employment_status'],
                'qualification' => $validated['qualification'] ?? null,
                'years_of_experience' => $validated['years_of_experience'] ?? null,
                'is_active' => $validated['employment_status'] === 'Active',
                'teacher_id_number' => $teacherIdNumber,
            ]
        );
        
        return redirect()->back()->with('success', 'Teacher updated successfully!');
    }

    /**
     * Remove the specified teacher from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Delete teacher record
        $user->teacher()->delete();
        
        // Delete user
        $user->delete();
        
        return redirect()->back()->with('success', 'Teacher deleted successfully!');
    }
}
