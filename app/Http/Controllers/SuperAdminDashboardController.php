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
        // Get all schools
        $schools = School::select(
            'id', 
            'name', 
            'type', 
            'student_count', 
            'teacher_count'
        )
        ->get()
        ->map(function ($school) {
            return [
                'id' => $school->id,
                'name' => $school->name,
                'district' => 'District ' . rand(1, 10), // Mock district data
                'type' => $school->type ?? 'Primary',
                'students' => $school->student_count ?? rand(100, 1000),
                'teachers' => $school->teacher_count ?? rand(10, 50),
                'connectivity' => ['Online', 'Hybrid', 'Offline'][rand(0, 2)], // Mock connectivity data
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
        $students = Student::select(
            'id', 
            'name', 
            'grade'
        )
        ->get()
        ->map(function ($student) use ($schools) {
            $schoolIndex = rand(0, count($schools) - 1);
            return [
                'id' => $student->id,
                'name' => $student->name,
                'school' => $schools[$schoolIndex]['name'] ?? 'Unknown School',
                'grade' => $student->grade ?? rand(1, 12),
                'performance' => ['Excellent', 'Good', 'Average', 'Poor'][rand(0, 3)],
                'status' => ['Active', 'Inactive'][rand(0, 1)],
            ];
        });
        
        // Mock districts data (since District model doesn't exist)
        $districts = collect(range(1, 10))->map(function ($i) {
            $regions = ['Northern', 'Southern', 'Eastern', 'Western', 'Central'];
            return [
                'id' => $i,
                'name' => 'District ' . $i,
                'region' => $regions[rand(0, count($regions) - 1)],
                'schools' => rand(5, 20),
            ];
        });
        
        // Get all resources
        $resources = Resource::select(
            'id', 
            'name', 
            'type'
        )
        ->get()
        ->map(function ($resource) {
            $locations = ['Online', 'School Library', 'District Office', 'Ministry Office'];
            return [
                'id' => $resource->id,
                'name' => $resource->name,
                'type' => $resource->type ?? ['Textbook', 'Digital', 'Equipment', 'Software'][rand(0, 3)],
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
            'initialDistricts' => $districts,
            'initialResources' => $resources,
            'initialEvents' => $events,
        ]);
    }
}
