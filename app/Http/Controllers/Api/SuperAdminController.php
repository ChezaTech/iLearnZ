<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\SchoolDistrict;
use App\Models\SchoolEvent;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SuperAdminController extends Controller
{
    /**
     * Test endpoint to verify API is working
     *
     * @return JsonResponse
     */
    public function test(): JsonResponse
    {
        return response()->json(['message' => 'SuperAdminController API is working!']);
    }
    /**
     * Get all schools for the dashboard
     *
     * @return JsonResponse
     */
    public function getSchools(): JsonResponse
    {
        $schools = School::select(
            'id', 
            'name', 
            'district_id', 
            'type', 
            'connectivity_status as connectivity', 
            'student_count as students', 
            'teacher_count as teachers'
        )
        ->with(['district:id,name'])
        ->get()
        ->map(function ($school) {
            return [
                'id' => $school->id,
                'name' => $school->name,
                'district' => $school->district->name ?? 'Unknown',
                'type' => $school->type,
                'students' => $school->students,
                'teachers' => $school->teachers,
                'connectivity' => $school->connectivity,
            ];
        });

        return response()->json($schools);
    }

    /**
     * Get all teachers for the dashboard
     *
     * @return JsonResponse
     */
    public function getTeachers(): JsonResponse
    {
        $teachers = User::where('role', 'teacher')
            ->select('id', 'name', 'school_id', 'subject', 'experience', 'digital_training')
            ->with(['school:id,name'])
            ->get()
            ->map(function ($teacher) {
                return [
                    'id' => $teacher->id,
                    'name' => $teacher->name,
                    'school' => $teacher->school->name ?? 'Unknown',
                    'subject' => $teacher->subject,
                    'experience' => $teacher->experience,
                    'digitalTraining' => (bool) $teacher->digital_training,
                ];
            });

        return response()->json($teachers);
    }

    /**
     * Get all students for the dashboard
     *
     * @return JsonResponse
     */
    public function getStudents(): JsonResponse
    {
        $students = User::where('role', 'student')
            ->select('id', 'name', 'school_id', 'grade', 'age', 'performance', 'attendance')
            ->with(['school:id,name'])
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'school' => $student->school->name ?? 'Unknown',
                    'grade' => $student->grade,
                    'age' => $student->age,
                    'performance' => $student->performance,
                    'attendance' => $student->attendance,
                ];
            });

        return response()->json($students);
    }

    /**
     * Get all districts for the dashboard
     *
     * @return JsonResponse
     */
    public function getDistricts(): JsonResponse
    {
        $districts = SchoolDistrict::select('id', 'name', 'region')
            ->withCount('schools as schools')
            ->withSum('schools as population', 'student_count')
            ->get();

        return response()->json($districts);
    }

    /**
     * Get all resources for the dashboard
     *
     * @return JsonResponse
     */
    public function getResources(): JsonResponse
    {
        $resources = Resource::select('id', 'name', 'type', 'quantity', 'location', 'status')
            ->get();

        return response()->json($resources);
    }

    /**
     * Get all events for the dashboard
     *
     * @return JsonResponse
     */
    public function getEvents(): JsonResponse
    {
        $events = SchoolEvent::select('id', 'title', 'date', 'type')
            ->get();

        return response()->json($events);
    }
    
    /**
     * Create a new school
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createSchool(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'district_id' => 'required|exists:school_districts,id',
            'type' => 'required|string|in:Primary,Secondary,Combined',
            'connectivity_status' => 'required|string|in:Online,Hybrid,Offline',
        ]);
        
        $school = School::create([
            'name' => $validated['name'],
            'district_id' => $validated['district_id'],
            'type' => $validated['type'],
            'connectivity_status' => $validated['connectivity_status'],
            'student_count' => 0,
            'teacher_count' => 0,
        ]);
        
        return response()->json($school, 201);
    }
    
    /**
     * Delete a school
     *
     * @param School $school
     * @return JsonResponse
     */
    public function deleteSchool(School $school): JsonResponse
    {
        $school->delete();
        
        return response()->json(null, 204);
    }
}
