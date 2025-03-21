<?php

use App\Http\Controllers\Api\SuperAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Simple test route that doesn't use a controller
Route::get('test', function() {
    return response()->json(['message' => 'API is working!']);
});

// SuperAdmin dashboard routes
Route::controller(SuperAdminController::class)->group(function () {
    Route::get('schools', 'getSchools');
    Route::post('schools', 'createSchool');
    Route::delete('schools/{school}', 'deleteSchool');
    Route::get('teachers', 'getTeachers');
    Route::get('students', 'getStudents');
    Route::get('districts', 'getDistricts');
    Route::get('resources', 'getResources');
    Route::get('events', 'getEvents');
    Route::get('superadmin-test', 'test');
});

// Auth routes
Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});

// School routes (no auth required for testing)
Route::get('schools/{school}', [\App\Http\Controllers\SchoolController::class, 'getSchool']);
Route::put('schools/{school}', [\App\Http\Controllers\SchoolController::class, 'updateSchool']);
Route::get('schools/{school}/admins', [\App\Http\Controllers\SchoolAdminController::class, 'getSchoolAdmins']);
Route::post('schools/add-existing-admin', [\App\Http\Controllers\SchoolAdminController::class, 'addExistingUserAsAdmin']);
Route::post('schools/create-admin', [\App\Http\Controllers\SchoolAdminController::class, 'createNewAdmin']);
Route::delete('schools/admins/{admin}', [\App\Http\Controllers\SchoolAdminController::class, 'deleteAdmin']);

// Admin routes (no auth required for testing)
Route::get('admins/existing-users', [\App\Http\Controllers\AdminController::class, 'searchExistingUsers']);
Route::post('admins/add-existing', [\App\Http\Controllers\AdminController::class, 'addExistingUserAsAdmin']);
Route::post('admins/create-new', [\App\Http\Controllers\AdminController::class, 'createNewAdmin']);
Route::delete('admins/{admin}', [\App\Http\Controllers\AdminController::class, 'deleteAdmin']);

// Search routes (no auth required for testing)
Route::get('search/users', [\App\Http\Controllers\AdminController::class, 'searchExistingUsers']);
Route::get('users/search', [\App\Http\Controllers\SchoolAdminController::class, 'searchUsers']);

// Login-as routes - MOVED TO CONTROLLER-BASED APPROACH
// Route::get('login-as/users', [\App\Http\Controllers\Auth\LoginAsController::class, 'getUsers']);
