<?php

use App\Http\Controllers\ParentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    
    // Redirect to the appropriate dashboard based on user role
    switch($user->role_id) {
        case 1: // Super Admin
            return redirect()->route('superadmin.dashboard');
        case 2: // School Admin
            return Inertia::render('Dashboard/SchoolAdmin');
        case 3: // Teacher
            return Inertia::render('Dashboard/Teacher');
        case 4: // Student
            return Inertia::render('Dashboard/Student');
        case 5: // Parent
            return Inertia::render('Dashboard/Parent');
        case 6: // Government Official
            return Inertia::render('Dashboard/GovernmentOfficial');
        default:
            return Inertia::render('Dashboard');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Super Admin routes
    Route::get('/superadmin/dashboard', [\App\Http\Controllers\SuperAdminDashboardController::class, 'index'])->name('superadmin.dashboard');
    
    // School routes
    Route::post('/schools', [\App\Http\Controllers\SchoolController::class, 'store'])->name('schools.store');
    Route::put('/schools/{school}', [\App\Http\Controllers\SchoolController::class, 'update'])->name('schools.update');
    Route::delete('/schools/{school}', [\App\Http\Controllers\SchoolController::class, 'destroy'])->name('schools.destroy');
    
    // Parent routes
    Route::middleware('parent')->group(function () {
        Route::get('/parent/dashboard', [ParentController::class, 'dashboard'])->name('parent.dashboard');
        Route::get('/parent/students/create', [ParentController::class, 'createStudent'])->name('parent.students.create');
        Route::post('/parent/students', [ParentController::class, 'storeStudent'])->name('parent.students.store');
        Route::get('/parent/students/{student}/edit', [ParentController::class, 'editStudent'])->name('parent.students.edit');
        Route::put('/parent/students/{student}', [ParentController::class, 'updateStudent'])->name('parent.students.update');
        Route::patch('/parent/students/{student}/toggle-status', [ParentController::class, 'toggleStudentStatus'])->name('parent.students.toggle-status');
    });
});

require __DIR__.'/auth.php';
