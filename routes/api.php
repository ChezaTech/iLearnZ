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
