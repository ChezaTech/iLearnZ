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

class DashboardController extends Controller
{
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
                'district' => $school->district->name,
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
        $teachers = User::where('user_type', 'teacher')
            ->with(['school:id,name'])
            ->get()
            ->map(function ($teacher) {
                // Find the main subject by looking at classes
                $mainSubject = $teacher->teacherClasses()
                    ->with('subject')
                    ->first()?->subject?->name ?? 'Not assigned';
                
                // Calculate years of experience (placeholder logic)
                $experience = now()->diffInYears($teacher->created_at) . ' years';
                
                return [
                    'id' => $teacher->id,
                    'name' => $teacher->name,
                    'school' => $teacher->school?->name ?? 'Not assigned',
                    'subject' => $mainSubject,
                    'experience' => $experience,
                    'digitalTraining' => (bool) ($teacher->preferences['digital_training'] ?? false),
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
        $students = User::where('user_type', 'student')
            ->with(['school:id,name', 'grades', 'attendance'])
            ->get()
            ->map(function ($student) {
                // Get the student's grade/class
                $currentEnrollment = $student->enrollments()
                    ->with('class')
                    ->orderBy('created_at', 'desc')
                    ->first();
                
                $grade = $currentEnrollment?->class?->grade_level ?? 'Not assigned';
                
                // Calculate average performance
                $averageGrade = $student->grades()->avg('score') ?? 0;
                $performance = 'Average';
                
                if ($averageGrade >= 90) {
                    $performance = 'Excellent';
                } elseif ($averageGrade >= 80) {
                    $performance = 'Good';
                } elseif ($averageGrade >= 70) {
                    $performance = 'Average';
                } else {
                    $performance = 'Needs Improvement';
                }
                
                // Calculate attendance percentage
                $totalDays = $student->attendance()->count();
                $presentDays = $student->attendance()->where('status', 'present')->count();
                $attendancePercentage = $totalDays > 0 ? round(($presentDays / $totalDays) * 100) : 0;
                
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'school' => $student->school?->name ?? 'Not assigned',
                    'grade' => $grade,
                    'age' => $student->date_of_birth ? now()->diffInYears($student->date_of_birth) : null,
                    'performance' => $performance,
                    'attendance' => $attendancePercentage . '%',
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
            ->withCount('schools')
            ->get()
            ->map(function ($district) {
                return [
                    'id' => $district->id,
                    'name' => $district->name,
                    'schools' => $district->schools_count,
                    'population' => $district->total_students,
                    'region' => $district->region,
                ];
            });

        return response()->json($districts);
    }

    /**
     * Get all resources for the dashboard
     *
     * @return JsonResponse
     */
    public function getResources(): JsonResponse
    {
        // For the dashboard, we'll use SchoolResource model if available, otherwise use Resource
        // This is a simplified version for the dashboard
        $resources = Resource::select('id', 'title as name', 'type', 'file_size', 'created_by')
            ->with(['creator.school:id,name'])
            ->get()
            ->map(function ($resource) {
                // Determine quantity (placeholder)
                $quantity = rand(10, 200); // This would be replaced with actual logic
                
                // Determine status based on quantity
                $status = 'Available';
                if ($quantity <= 20) {
                    $status = 'Low Stock';
                } elseif ($quantity <= 50) {
                    $status = 'Limited';
                }
                
                return [
                    'id' => $resource->id,
                    'name' => $resource->name,
                    'type' => ucfirst($resource->type),
                    'quantity' => $quantity,
                    'location' => $resource->creator?->school?->name ?? 'Central Repository',
                    'status' => $status,
                ];
            });

        return response()->json($resources);
    }

    /**
     * Get all events for the dashboard
     *
     * @return JsonResponse
     */
    public function getEvents(): JsonResponse
    {
        $events = SchoolEvent::select('id', 'title', 'start_date as date', 'event_type as type')
            ->orderBy('start_date')
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date->format('Y-m-d'),
                    'type' => $event->type,
                ];
            });

        return response()->json($events);
    }
}
