<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\School;
use App\Models\Student;
use App\Models\Resource;
use App\Models\User;
use App\Models\SchoolDistrict;

class SuperAdminDashboardController extends Controller
{
    /**
     * Display the super admin dashboard
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Get all school districts
        $schoolDistricts = SchoolDistrict::select('id', 'name', 'code', 'region', 'province')
            ->orderBy('name')
            ->get()
            ->map(function ($district) {
                return [
                    'id' => $district->id,
                    'name' => $district->name,
                    'code' => $district->code,
                    'region' => $district->region,
                    'province' => $district->province,
                ];
            });
        
        // Get all schools with district relationship
        $schools = School::with('district')
            ->select(
                'id', 
                'name',
                'code',
                'district_id',
                'type', 
                'connectivity_status',
                'student_count', 
                'teacher_count',
                'address',
                'city',
                'province',
                'phone',
                'email',
                'principal_name',
                'internet_provider',
                'has_smartboards'
            )
            ->get()
            ->map(function ($school) {
                return [
                    'id' => $school->id,
                    'name' => $school->name,
                    'code' => $school->code,
                    'district_id' => $school->district_id,
                    'district' => $school->district ? $school->district->name : 'Unknown District',
                    'type' => ucfirst($school->type) ?? 'Primary',
                    'students' => $school->student_count ?? 0,
                    'teachers' => $school->teacher_count ?? 0,
                    'connectivity_status' => ucfirst($school->connectivity_status) ?? 'Offline',
                    'connectivity' => ucfirst($school->connectivity_status) ?? 'Offline', 
                    'address' => $school->address,
                    'city' => $school->city,
                    'province' => $school->province,
                    'phone' => $school->phone,
                    'email' => $school->email,
                    'principal_name' => $school->principal_name,
                    'internet_provider' => $school->internet_provider,
                    'has_smartboards' => $school->has_smartboards,
                    'student_count' => $school->student_count ?? 0,
                    'teacher_count' => $school->teacher_count ?? 0
                ];
            });
        
        // Mock teachers data (since Teacher model doesn't exist)
        $teachers = collect(range(1, 50))->map(function ($i) use ($schools) {
            $schoolIndex = rand(0, count($schools) - 1);
            $subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Art', 'Music', 'Physical Education'];
            return [
                'id' => $i,
                'name' => 'Teacher ' . $i,
                'school' => $schools[$schoolIndex]['name'] ?? 'Unknown School',
                'subject' => $subjects[rand(0, count($subjects) - 1)],
                'status' => ['Active', 'On Leave', 'Inactive'][rand(0, 2)],
            ];
        });
        
        // Get all students
        $students = Student::with('user')
            ->select(
                'students.id', 
                'students.grade_level',
                'students.user_id'
            )
            ->get()
            ->map(function ($student) use ($schools) {
                $schoolIndex = rand(0, count($schools) - 1);
                return [
                    'id' => $student->id,
                    'name' => $student->user ? $student->user->name : 'Unknown Student',
                    'school' => $schools[$schoolIndex]['name'] ?? 'Unknown School',
                    'grade' => $student->grade_level ?? rand(1, 12),
                    'performance' => ['Excellent', 'Good', 'Average', 'Poor'][rand(0, 3)],
                    'status' => ['Active', 'Inactive'][rand(0, 1)],
                ];
            });
        
        // Get all resources
        $resources = Resource::select(
            'id', 
            'title', 
            'type'
        )
        ->get()
        ->map(function ($resource) {
            $locations = ['Online', 'School Library', 'District Office', 'Ministry Office'];
            return [
                'id' => $resource->id,
                'name' => $resource->title,
                'type' => $resource->type,
                'location' => $locations[rand(0, count($locations) - 1)],
                'status' => ['Available', 'Limited', 'Unavailable'][rand(0, 2)],
            ];
        });
        
        // Mock events data (since Event model doesn't exist)
        $events = collect(range(1, 10))->map(function ($i) {
            $eventTypes = ['Training', 'Workshop', 'Conference', 'Meeting', 'Competition'];
            $locations = ['Online', 'School', 'District Office', 'Ministry Office', 'Conference Center'];
            $startDate = strtotime('2023-01-01');
            $endDate = strtotime('2023-12-31');
            $randomTimestamp = rand($startDate, $endDate);
            return [
                'id' => $i,
                'name' => $eventTypes[rand(0, count($eventTypes) - 1)] . ' ' . $i,
                'date' => date('Y-m-d', $randomTimestamp),
                'location' => $locations[rand(0, count($locations) - 1)],
                'description' => 'This is a description for event ' . $i,
                'status' => ['Upcoming', 'Ongoing', 'Completed'][rand(0, 2)],
            ];
        });
        
        return Inertia::render('Dashboard/SuperAdmin', [
            'initialSchools' => $schools,
            'initialTeachers' => $teachers,
            'initialStudents' => $students,
            'initialDistricts' => $schoolDistricts,
            'initialResources' => $resources,
            'initialEvents' => $events,
        ]);
    }
}
