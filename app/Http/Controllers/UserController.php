<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Search for users by name or email
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $request->validate([
            'search' => 'required|string|min:2',
            'school_id' => 'required|integer|exists:schools,id',
        ]);

        $searchTerm = $request->input('search');
        $schoolId = $request->input('school_id');

        // Search for users that are not already admins of this school
        $users = User::where(function($query) use ($searchTerm) {
                $query->where('name', 'LIKE', "%{$searchTerm}%")
                      ->orWhere('email', 'LIKE', "%{$searchTerm}%");
            })
            ->whereDoesntHave('adminSchools', function($query) use ($schoolId) {
                $query->where('school_id', $schoolId);
            })
            ->limit(10)
            ->get(['id', 'name', 'email']);

        return response()->json($users);
    }
}
