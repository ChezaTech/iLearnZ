<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class LoginAsController extends Controller
{
    /**
     * Get a list of users for the "Login As" feature
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers()
    {
        // Define the user types we want to fetch
        $userTypes = [
            'admin',
            'school_admin',
            'teacher',
            'student',
            'parent'
        ];
        
        $result = [];
        
        // For each user type, fetch at least 2 users
        foreach ($userTypes as $type) {
            // Get users of this type with required fields
            $users = User::where('user_type', $type)
                ->where('is_active', true)
                ->with(['role:id,name', 'school:id,name'])
                ->select('id', 'name', 'email', 'user_type', 'school_id', 'role_id')
                ->limit(3)
                ->get()
                ->map(function ($user) {
                    return [
                        'name' => $user->name,
                        'email' => $user->email,
                        'password' => 'password', // Default password for demo login
                        'user_type' => $user->user_type,
                        'school' => $user->school ? $user->school->name : null,
                        'role' => $user->role ? $user->role->name : null,
                    ];
                });
            
            // Format the user type for display
            $displayType = ucwords(str_replace('_', ' ', $type));
            
            // Add to results if we have users
            if ($users->count() > 0) {
                $result[] = [
                    'type' => $displayType,
                    'users' => $users
                ];
            }
        }
        
        return response()->json($result);
    }
    
    /**
     * Render the login page with demo users data
     * 
     * @param Request $request
     * @return \Inertia\Response
     */
    public function showLoginPage(Request $request)
    {
        // Define the user types we want to fetch
        $userTypes = [
            'admin',
            'school_admin',
            'teacher',
            'student',
            'parent'
        ];
        
        $demoUsers = [];
        
        // For each user type, fetch at least 2 users
        foreach ($userTypes as $type) {
            // Get users of this type with required fields
            $usersQuery = User::where('user_type', $type)
                ->where('is_active', true)
                ->with(['role:id,name', 'school:id,name'])
                ->select('id', 'name', 'email', 'user_type', 'school_id', 'role_id')
                ->limit(3);
            
            // We'll try to get users with school_id and role_id first, but if none exist, we'll get any users of this type
            $users = $usersQuery->get();
            
            if ($users->isEmpty()) {
                // If no users with school_id and role_id, get any users of this type
                $users = User::where('user_type', $type)
                    ->where('is_active', true)
                    ->with(['role:id,name', 'school:id,name'])
                    ->select('id', 'name', 'email', 'user_type', 'school_id', 'role_id')
                    ->limit(3)
                    ->get();
            }
            
            $mappedUsers = $users->map(function ($user) {
                return [
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => 'password', // Default password for demo login
                    'user_type' => $user->user_type,
                    'school' => $user->school ? $user->school->name : 'Not Assigned',
                    'role' => $user->role ? $user->role->name : 'Not Assigned',
                ];
            });
            
            // Format the user type for display
            $displayType = ucwords(str_replace('_', ' ', $type));
            
            // Add to results if we have users
            if ($mappedUsers->count() > 0) {
                $demoUsers[] = [
                    'type' => $displayType,
                    'users' => $mappedUsers
                ];
            }
        }
        
        // If we have no demo users at all, create a fallback admin user
        if (empty($demoUsers)) {
            $demoUsers[] = [
                'type' => 'Admin',
                'users' => [
                    [
                        'name' => 'Demo Admin',
                        'email' => 'admin@example.com',
                        'password' => 'password',
                        'user_type' => 'admin',
                        'school' => 'All Schools',
                        'role' => 'Administrator'
                    ]
                ]
            ];
        }
        
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
            'canResetPassword' => Route::has('password.request'),
            'userTypes' => $demoUsers
        ]);
    }
}
