<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Student;
use App\Models\Book;
use App\Models\School;
use App\Models\Classes;
use App\Models\SchoolEvent;
use App\Models\SchoolResource;
use App\Models\ReportCard;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Display the school admin dashboard with all necessary data.
     *
     * @return \Inertia\Response
     */
    public function dashboard()
    {
        // Get authenticated user's school
        $user = Auth::user();
        $school = School::where('admin_id', $user->id)->first();
        
        if (!$school) {
            // Fallback to mock data if no school is found
            return $this->dashboardWithMockData();
        }
        
        // Fetch real data for the dashboard
        $stats = [
            'totalTeachers' => Teacher::where('school_id', $school->id)->count(),
            'totalStudents' => Student::where('school_id', $school->id)->count(),
            'totalClasses' => Classes::where('school_id', $school->id)->count(),
            'attendanceRate' => 92, // This could be calculated from actual attendance records
            'averageGrade' => 78, // This could be calculated from actual grade records
        ];
        
        $events = SchoolEvent::where('school_id', $school->id)
            ->orderBy('date', 'asc')
            ->take(5)
            ->get();
            
        $resources = SchoolResource::where('school_id', $school->id)
            ->take(5)
            ->get();
            
        $recentReportCards = ReportCard::where('school_id', $school->id)
            ->with('student')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function($reportCard) {
                return [
                    'id' => $reportCard->id,
                    'student' => $reportCard->student->name,
                    'grade' => $reportCard->grade->name,
                    'term' => $reportCard->term,
                    'average' => $reportCard->average_score,
                ];
            });
            
        $teachers = Teacher::where('school_id', $school->id)->get();
        
        $grades = Classes::where('school_id', $school->id)
            ->with('teacher')
            ->get()
            ->map(function($grade) {
                return [
                    'id' => $grade->id,
                    'name' => $grade->name,
                    'students' => $grade->students()->count(),
                    'teacher' => $grade->teacher ? $grade->teacher->name : 'Unassigned',
                    'averageScore' => $grade->average_score ?? 0,
                ];
            });
            
        $books = Book::where('school_id', $school->id)->get();
        
        $settings = [
            'schoolName' => $school->name,
            'address' => $school->address,
            'phone' => $school->phone,
            'email' => $school->email,
            'principal' => $school->principal_name,
            'academicYear' => date('Y'),
            'terms' => $school->terms ?? 3,
            'schoolHours' => $school->school_hours ?? '07:30 - 16:00',
        ];
        
        return Inertia::render('Dashboard/SchoolAdmin', [
            'stats' => $stats,
            'events' => $events,
            'resources' => $resources,
            'recentReportCards' => $recentReportCards,
            'teachers' => $teachers,
            'grades' => $grades,
            'books' => $books,
            'settings' => $settings,
        ]);
    }
    
    /**
     * Provide mock data for the dashboard when real data is not available.
     *
     * @return \Inertia\Response
     */
    private function dashboardWithMockData()
    {
        $stats = [
            'totalTeachers' => 6,
            'totalStudents' => 120,
            'totalClasses' => 8,
            'attendanceRate' => 92,
            'averageGrade' => 78
        ];

        $events = [
            ['id' => 1, 'title' => 'Annual Science Fair', 'date' => '2025-03-15', 'type' => 'academic'],
            ['id' => 2, 'title' => 'Parent-Teacher Conference', 'date' => '2025-04-05', 'type' => 'meeting'],
            ['id' => 3, 'title' => 'Inter-School Sports Tournament', 'date' => '2025-05-10', 'type' => 'sports']
        ];

        $resources = [
            ['id' => 1, 'name' => 'Science Laboratory Kit', 'type' => 'equipment', 'condition' => 'good', 'quantity' => 15],
            ['id' => 2, 'name' => 'Online Learning Platform Subscription', 'type' => 'digital', 'condition' => 'excellent', 'quantity' => 1]
        ];

        $recentReportCards = [
            ['id' => 1, 'student' => 'Tendai Mutasa', 'grade' => 'Form 5', 'term' => 'First Term', 'average' => 82.5],
            ['id' => 2, 'student' => 'Chipo Dziva', 'grade' => 'Form 4', 'term' => 'First Term', 'average' => 88.75]
        ];
        
        $teachers = [
            ['id' => 1, 'name' => 'John Banda', 'subject' => 'Mathematics', 'email' => 'john.banda@example.com', 'phone' => '+260 97 1234567', 'status' => 'Active'],
            ['id' => 2, 'name' => 'Mary Mwanza', 'subject' => 'English', 'email' => 'mary.mwanza@example.com', 'phone' => '+260 96 7654321', 'status' => 'Active'],
            ['id' => 3, 'name' => 'David Lungu', 'subject' => 'Science', 'email' => 'david.lungu@example.com', 'phone' => '+260 95 1122334', 'status' => 'On Leave'],
            ['id' => 4, 'name' => 'Sarah Phiri', 'subject' => 'History', 'email' => 'sarah.phiri@example.com', 'phone' => '+260 97 5566778', 'status' => 'Active'],
            ['id' => 5, 'name' => 'Michael Tembo', 'subject' => 'Geography', 'email' => 'michael.tembo@example.com', 'phone' => '+260 96 9988776', 'status' => 'Active'],
            ['id' => 6, 'name' => 'Elizabeth Daka', 'subject' => 'Art', 'email' => 'elizabeth.daka@example.com', 'phone' => '+260 95 3344556', 'status' => 'Inactive']
        ];
        
        $grades = [
            ['id' => 1, 'name' => 'Grade 1', 'students' => 25, 'teacher' => 'John Banda', 'averageScore' => 78],
            ['id' => 2, 'name' => 'Grade 2', 'students' => 22, 'teacher' => 'Mary Mwanza', 'averageScore' => 82],
            ['id' => 3, 'name' => 'Grade 3', 'students' => 24, 'teacher' => 'David Lungu', 'averageScore' => 75],
            ['id' => 4, 'name' => 'Grade 4', 'students' => 26, 'teacher' => 'Sarah Phiri', 'averageScore' => 80],
            ['id' => 5, 'name' => 'Grade 5', 'students' => 23, 'teacher' => 'Michael Tembo', 'averageScore' => 85]
        ];
        
        $books = [
            ['id' => 1, 'title' => 'Mathematics Textbook Grade 5', 'author' => 'Ministry of Education', 'category' => 'Textbook', 'status' => 'Available', 'copies' => 30],
            ['id' => 2, 'title' => 'English Grammar Guide', 'author' => 'Oxford Press', 'category' => 'Reference', 'status' => 'Available', 'copies' => 20],
            ['id' => 3, 'title' => 'Science Encyclopedia', 'author' => 'National Geographic', 'category' => 'Reference', 'status' => 'Available', 'copies' => 15],
            ['id' => 4, 'title' => 'History of Zambia', 'author' => 'Andrew Roberts', 'category' => 'Textbook', 'status' => 'Available', 'copies' => 25],
            ['id' => 5, 'title' => 'Computer Basics', 'author' => 'Tech Publishing', 'category' => 'Textbook', 'status' => 'Available', 'copies' => 18]
        ];
        
        $settings = [
            'schoolName' => 'Lusaka Primary School',
            'address' => '123 Independence Avenue, Lusaka',
            'phone' => '+260 211 123456',
            'email' => 'info@lusakaprimary.edu.zm',
            'principal' => 'Dr. Mulenga Chilufya',
            'academicYear' => '2025',
            'terms' => 3,
            'schoolHours' => '07:30 - 16:00'
        ];
        
        return Inertia::render('Dashboard/SchoolAdmin', [
            'stats' => $stats,
            'events' => $events,
            'resources' => $resources,
            'recentReportCards' => $recentReportCards,
            'teachers' => $teachers,
            'grades' => $grades,
            'books' => $books,
            'settings' => $settings,
        ]);
    }

    /**
     * Display the school admin dashboard.
     *
     * @return \Inertia\Response
     */
    public function schoolAdminDashboard()
    {
        $user = Auth::user();
        
        // Check if user is a school admin
        if ($user->role_id != 2) { // Not a school admin
            return redirect('/dashboard');
        }
        
        $school = School::where('id', $user->school_id)->first();
        
        // If no school is found, return with an error
        if (!$school) {
            return Inertia::render('Dashboard/SchoolAdmin', [
                'error' => 'No school associated with your account. Please contact the administrator.'
            ]);
        }
        
        // Get teachers for this school
        $teachers = User::where('school_id', $school->id)
            ->where('role_id', 3) // Teacher role
            ->with('teacher') // Include teacher profile data
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'subject' => $user->teacher ? $user->teacher->subject_specialty : null,
                    'status' => $user->teacher ? $user->teacher->employment_status : 'Active',
                    'qualification' => $user->teacher ? $user->teacher->qualification : null,
                    'years_of_experience' => $user->teacher ? $user->teacher->years_of_experience : null,
                ];
            });
            
        // Get existing users that are not already teachers or school admins
        $existingUsers = User::whereNotIn('role_id', [2, 3]) // Not school admin or teacher
            ->where(function($query) use ($school) {
                $query->whereNull('school_id')
                      ->orWhere('school_id', $school->id);
            })
            ->select('id', 'name', 'email')
            ->get();
            
        // Get students for this school
        $students = User::where('school_id', $school->id)
            ->where('role_id', 4) // Student role
            ->select('id', 'name', 'email')
            ->get();
        
        // Get classes/grades for this school
        $grades = Classes::where('school_id', $school->id)
            ->with('teacher:id,name,email')
            ->withCount('students')
            ->get()
            ->map(function ($class) {
                // Calculate average score if there are grades
                $averageScore = $class->grades()->avg('score') ?? 0;
                
                return [
                    'id' => $class->id,
                    'name' => $class->name,
                    'grade_level' => $class->grade_level,
                    'section' => $class->section,
                    'teacher' => $class->teacher ? $class->teacher->name : 'Unassigned',
                    'students' => $class->students_count,
                    'averageScore' => round($averageScore, 2),
                ];
            });
            
        // Get events
        $events = []; // Placeholder for events
        
        // Get resources
        $resources = []; // Placeholder for resources
        
        // Get recent report cards
        $recentReportCards = []; // Placeholder for report cards
        
        // Get books
        $books = []; // Placeholder for books
        
        // School stats
        $stats = [
            'students' => $students->count(),
            'teachers' => $teachers->count(),
            'classes' => $grades->count(),
            'attendance' => 0, // Placeholder for attendance
        ];
        
        // School settings
        $settings = [
            'name' => $school->name,
            'code' => $school->code,
            'address' => $school->address,
            'city' => $school->city,
            'province' => $school->province,
            'postal_code' => $school->postal_code,
            'phone' => $school->phone,
            'email' => $school->email,
            'principal' => $school->principal_name,
            'academicYear' => date('Y'),
            'terms' => $school->terms ?? 3,
            'schoolHours' => $school->school_hours ?? '07:30 - 16:00',
        ];
        
        return Inertia::render('Dashboard/SchoolAdmin', [
            'stats' => $stats,
            'events' => $events,
            'resources' => $resources,
            'recentReportCards' => $recentReportCards,
            'teachers' => $teachers,
            'students' => $students,
            'grades' => $grades,
            'books' => $books,
            'settings' => $settings,
            'existingUsers' => $existingUsers,
        ]);
    }

    /**
     * Store a newly created administrator in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|in:admin,school_admin',
            'school_id' => 'required|exists:schools,id',
        ]);
        
        // Determine the role_id based on the role
        $role_id = null;
        if ($validated['role'] === 'admin') {
            $role_id = 1; // Admin role_id
        } elseif ($validated['role'] === 'school_admin') {
            $role_id = 2; // School Admin role_id
        }
        
        // Create admin user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('password'), // Default password
            'school_id' => $validated['school_id'],
            'user_type' => $validated['role'],
            'role_id' => $role_id, // Set the role_id
        ]);
        
        return redirect()->back()->with('success', 'Administrator added successfully!');
    }

    /**
     * Update the specified administrator in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'role' => 'required|in:admin,school_admin',
        ]);
        
        // Determine the role_id based on the role
        $role_id = null;
        if ($validated['role'] === 'admin') {
            $role_id = 1; // Admin role_id
        } elseif ($validated['role'] === 'school_admin') {
            $role_id = 2; // School Admin role_id
        }
        
        // Update admin user
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'user_type' => $validated['role'],
            'role_id' => $role_id, // Set the role_id
        ]);
        
        return redirect()->back()->with('success', 'Administrator updated successfully!');
    }

    /**
     * Remove the specified administrator from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Delete admin user
        $user->delete();
        
        return redirect()->back()->with('success', 'Administrator deleted successfully!');
    }

    /**
     * Get a list of existing users that are not administrators.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExistingUsers(Request $request)
    {
        $schoolId = $request->query('school_id');
        $search = $request->query('search', '');
        
        $users = User::where(function($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->whereNotIn('user_type', ['admin', 'school_admin'])
            ->when($schoolId, function($query, $schoolId) {
                return $query->where('school_id', $schoolId);
            })
            ->select('id', 'name', 'email', 'user_type')
            ->limit(10)
            ->get();
        
        return response()->json($users);
    }

    /**
     * Add an existing user as a school administrator.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addExistingUserAsAdmin(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'school_id' => 'required|exists:schools,id',
            'admin_role' => 'required|in:admin,school_admin',
        ]);
        
        $user = User::findOrFail($validated['user_id']);
        
        // Determine the role_id based on the admin_role
        $role_id = null;
        if ($validated['admin_role'] === 'admin') {
            $role_id = 1; // Admin role_id
        } elseif ($validated['admin_role'] === 'school_admin') {
            $role_id = 2; // School Admin role_id
        }
        
        // Update user to be an admin
        $user->update([
            'user_type' => $validated['admin_role'],
            'school_id' => $validated['school_id'],
            'role_id' => $role_id, // Set the role_id
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'User has been added as an administrator successfully!',
            'admin' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $validated['admin_role'],
                'status' => 'Active',
            ]
        ]);
    }

    /**
     * Create a new user and add them as a school administrator.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNewAdmin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'school_id' => 'required|exists:schools,id',
            'admin_role' => 'required|in:admin,school_admin',
            'password' => 'required|string|min:8',
        ]);
        
        // Determine the role_id based on the admin_role
        $role_id = null;
        if ($validated['admin_role'] === 'admin') {
            $role_id = 1; // Admin role_id
        } elseif ($validated['admin_role'] === 'school_admin') {
            $role_id = 2; // School Admin role_id
        }
        
        // Create new admin user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'school_id' => $validated['school_id'],
            'user_type' => $validated['admin_role'],
            'role_id' => $role_id, // Set the role_id
            'is_active' => true,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'New administrator created successfully!',
            'admin' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $validated['admin_role'],
                'status' => 'Active',
            ]
        ]);
    }

    /**
     * Get administrators for a specific school.
     *
     * @param  \App\Models\School  $school
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSchoolAdmins(\App\Models\School $school)
    {
        $admins = \App\Models\User::where('school_id', $school->id)
            ->whereIn('user_type', ['admin', 'school_admin'])
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => ucfirst($user->user_type),
                    'status' => 'Active',
                ];
            });
        
        return response()->json($admins);
    }
}
