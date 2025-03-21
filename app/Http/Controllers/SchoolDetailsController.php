<?php

namespace App\Http\Controllers;

use App\Models\School;
use App\Models\SchoolDistrict;
use App\Models\User;
use App\Models\Student;
use App\Models\Book;
use App\Models\SchoolAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SchoolDetailsController extends Controller
{
    /**
     * Display the school details page with all necessary data.
     *
     * @param School $school
     * @return \Inertia\Response
     */
    public function show(School $school)
    {
        // Get students through the User model that have this school_id
        $students = User::where('school_id', $school->id)
            ->where('user_type', 'student')
            ->with('student')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'student_info' => $user->student
                ];
            });
            
        // Get teachers through the User model that have this school_id
        $teachers = User::where('school_id', $school->id)
            ->where('user_type', 'teacher')
            ->with('teacher')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'teacher_info' => $user->teacher
                ];
            });
            
        // Get classes for this school
        $classes = $school->classes()
            ->with(['teacher:id,name,email', 'students:id,name,email'])
            ->get();
            
        // Get admins for this school
        $admins = User::where('school_id', $school->id)
            ->where('user_type', 'school_admin')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ];
            });
            
        // Get books for this school
        $books = $school->books()->get();
        
        // Get districts for the dropdown
        $districts = SchoolDistrict::select('id', 'name', 'region', 'province')
            ->orderBy('name')
            ->get();
        
        // Return the Inertia view with all data
        return Inertia::render('Schools/Show', [
            'school' => $school,
            'students' => $students,
            'teachers' => $teachers,
            'classes' => $classes,
            'admins' => $admins,
            'books' => $books,
            'districts' => $districts,
        ]);
    }

    /**
     * Update the school information.
     *
     * @param Request $request
     * @param School $school
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, School $school)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'district_id' => 'required|exists:school_districts,id',
            'type' => 'required|string|max:255',
            'connectivity_status' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'principal_name' => 'nullable|string|max:255',
            'internet_provider' => 'nullable|string|max:255',
            'has_smartboards' => 'boolean',
            'school_hours' => 'nullable|string|max:255',
        ]);

        // Update the school
        $school->update($validated);

        // Redirect back with success message
        return redirect()->back()->with('success', 'School updated successfully!');
    }

    /**
     * Get all admins for a school
     * 
     * @param School $school
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSchoolAdmins(School $school)
    {
        $admins = $school->admins()->with('user')->get()->map(function($admin) {
            return [
                'id' => $admin->id,
                'name' => $admin->user->name,
                'email' => $admin->user->email,
                'admin_role' => $admin->admin_role
            ];
        });
        
        return response()->json($admins);
    }

    /**
     * Add an existing user as an admin
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addExistingUserAsAdmin(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'school_id' => 'required|exists:schools,id',
            'admin_role' => 'required|string|in:admin,super_admin'
        ]);

        // Check if user is already an admin for this school
        $existingAdmin = SchoolAdmin::where('user_id', $request->user_id)
            ->where('school_id', $request->school_id)
            ->first();

        if ($existingAdmin) {
            return response()->json([
                'success' => false,
                'message' => 'User is already an admin for this school'
            ], 422);
        }

        // Create new admin
        $admin = SchoolAdmin::create([
            'user_id' => $request->user_id,
            'school_id' => $request->school_id,
            'admin_role' => $request->admin_role
        ]);

        // Get user details
        $user = User::find($request->user_id);

        return response()->json([
            'success' => true,
            'message' => 'Administrator added successfully',
            'admin' => [
                'id' => $admin->id,
                'name' => $user->name,
                'email' => $user->email,
                'admin_role' => $admin->admin_role
            ]
        ]);
    }

    /**
     * Create a new user and add as admin
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNewAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'school_id' => 'required|exists:schools,id',
            'admin_role' => 'required|string|in:admin,super_admin'
        ]);

        // Create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'school_admin'
        ]);

        // Create new admin
        $admin = SchoolAdmin::create([
            'user_id' => $user->id,
            'school_id' => $request->school_id,
            'admin_role' => $request->admin_role
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Administrator created successfully',
            'admin' => [
                'id' => $admin->id,
                'name' => $user->name,
                'email' => $user->email,
                'admin_role' => $admin->admin_role
            ]
        ]);
    }

    /**
     * Delete an admin
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAdmin($id)
    {
        $admin = SchoolAdmin::findOrFail($id);
        $admin->delete();

        return response()->json([
            'success' => true,
            'message' => 'Administrator removed successfully'
        ]);
    }
}
