<?php

use App\Http\Controllers\ParentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
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
