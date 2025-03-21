<?php

namespace App\Http\Controllers;

use App\Models\School;
use App\Models\SchoolAdmin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class SchoolAdminController extends Controller
{
    /**
     * Get all admins for a school
     * 
     * @param School $school
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSchoolAdmins(School $school)
    {
        try {
            Log::info('Getting admins for school: ' . $school->id);
            
            $admins = $school->admins()->with('user')->get()->map(function($admin) {
                return [
                    'id' => $admin->id,
                    'name' => $admin->user->name,
                    'email' => $admin->user->email,
                    'admin_role' => $admin->admin_role
                ];
            });
            
            Log::info('Found ' . count($admins) . ' admins for school: ' . $school->id);
            
            return response()->json($admins);
        } catch (\Exception $e) {
            Log::error('Error getting school admins: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to load administrators: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Search for existing users
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchUsers(Request $request)
    {
        try {
            $query = $request->input('q');
            
            if (empty($query) || strlen($query) < 2) {
                return response()->json([]);
            }
            
            Log::info('Searching users with query: ' . $query);
            
            $users = User::where(function($q) use ($query) {
                    $q->where('name', 'like', "%{$query}%")
                      ->orWhere('email', 'like', "%{$query}%");
                })
                ->select('id', 'name', 'email')
                ->limit(10)
                ->get();
                
            Log::info('Found ' . count($users) . ' users matching query: ' . $query);
            
            return response()->json($users);
        } catch (\Exception $e) {
            Log::error('Error searching users: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to search users: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Add an existing user as an admin
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addExistingUserAsAdmin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'school_id' => 'required|exists:schools,id',
                'admin_role' => 'required|string|in:admin,super_admin'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            Log::info('Adding user ID ' . $request->user_id . ' as admin for school ID ' . $request->school_id);

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

            Log::info('Successfully added user ID ' . $request->user_id . ' as admin with ID ' . $admin->id);

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
        } catch (\Exception $e) {
            Log::error('Error adding existing user as admin: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to add administrator: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new user and add as admin
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNewAdmin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'password_confirmation' => 'required|same:password',
                'school_id' => 'required|exists:schools,id',
                'admin_role' => 'required|string|in:admin,super_admin'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            Log::info('Creating new admin user for school ID ' . $request->school_id);

            // Create new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => 'school_admin',
                'school_id' => $request->school_id
            ]);

            // Create new admin
            $admin = SchoolAdmin::create([
                'user_id' => $user->id,
                'school_id' => $request->school_id,
                'admin_role' => $request->admin_role
            ]);

            Log::info('Successfully created new admin user with ID ' . $user->id . ' and admin ID ' . $admin->id);

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
        } catch (\Exception $e) {
            Log::error('Error creating new admin: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to create administrator: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete an admin
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAdmin($id)
    {
        try {
            Log::info('Deleting admin with ID ' . $id);
            
            $admin = SchoolAdmin::findOrFail($id);
            $admin->delete();

            Log::info('Successfully deleted admin with ID ' . $id);

            return response()->json([
                'success' => true,
                'message' => 'Administrator removed successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting admin: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove administrator: ' . $e->getMessage()
            ], 500);
        }
    }
}
