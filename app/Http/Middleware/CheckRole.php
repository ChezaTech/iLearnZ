<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if (!Auth::check()) {
            return redirect('login');
        }
        
        // Get the role name from the database based on role_id
        $userRole = '';
        switch(Auth::user()->role_id) {
            case 1:
                $userRole = 'admin';
                break;
            case 2:
                $userRole = 'school_admin';
                break;
            case 3:
                $userRole = 'teacher';
                break;
            case 4:
                $userRole = 'student';
                break;
            case 5:
                $userRole = 'parent';
                break;
            default:
                $userRole = 'guest';
        }
        
        // Check if the user has the required role
        if ($userRole !== $role) {
            return redirect('/dashboard');
        }
        
        return $next($request);
    }
}
