<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ParentMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check() || !Auth::user()->isParent()) {
            if (Auth::check()) {
                // If user is logged in but not a parent, redirect to dashboard
                return redirect()->route('dashboard')->with('error', 'You do not have permission to access this page.');
            }
            
            // If user is not logged in, redirect to login
            return redirect()->route('login');
        }
        
        return $next($request);
    }
}
