<?php

use App\Http\Controllers\ParentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\DistrictController;
use App\Models\Classes;
use App\Models\Subject;
use App\Models\Assessment;
use App\Models\Announcement;
use App\Models\Notification;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
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
    switch ($user->role_id) {
        case 1: // Super Admin
            return redirect()->route('superadmin.dashboard');
        case 2: // School Admin
            return redirect()->route('school-admin.dashboard');
        case 3: // Teacher
            return redirect()->route('teacher.dashboard');
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Super Admin routes
    Route::get('/superadmin/dashboard', [\App\Http\Controllers\SuperAdminDashboardController::class, 'index'])->name('superadmin.dashboard');

    // School routes
    Route::get('/schools/{school}', [\App\Http\Controllers\SchoolController::class, 'show'])->name('schools.show');
    Route::post('/schools', [\App\Http\Controllers\SchoolController::class, 'store'])->name('schools.store');
    Route::put('/schools/{school}', [\App\Http\Controllers\SchoolController::class, 'update'])->name('schools.update');
    Route::delete('/schools/{school}', [\App\Http\Controllers\SchoolController::class, 'destroy'])->name('schools.destroy');

    // District routes
    Route::post('/districts', [\App\Http\Controllers\DistrictController::class, 'store'])->name('districts.store');
    Route::put('/districts/{district}', [\App\Http\Controllers\DistrictController::class, 'update'])->name('districts.update');
    Route::delete('/districts/{district}', [\App\Http\Controllers\DistrictController::class, 'destroy'])->name('districts.destroy');

    // Student routes
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');

    // Teacher routes
    Route::post('/teachers', [TeacherController::class, 'store'])->name('teachers.store');
    Route::put('/teachers/{teacher}', [TeacherController::class, 'update'])->name('teachers.update');
    Route::delete('/teachers/{teacher}', [TeacherController::class, 'destroy'])->name('teachers.destroy');

    // Class routes
    Route::post('/classes', [ClassController::class, 'store'])->name('classes.store');
    Route::put('/classes/{class}', [ClassController::class, 'update'])->name('classes.update');
    Route::delete('/classes/{class}', [ClassController::class, 'destroy'])->name('classes.destroy');
    Route::post('/classes/{class}/students', [ClassController::class, 'addStudent'])->name('classes.students.add');
    Route::delete('/classes/{class}/students', [ClassController::class, 'removeStudent'])->name('classes.students.remove');

    // Admin routes
    Route::post('/admins', [AdminController::class, 'store'])->name('admins.store');
    Route::put('/admins/{admin}', [AdminController::class, 'update'])->name('admins.update');
    Route::delete('/admins/{admin}', [AdminController::class, 'destroy'])->name('admins.destroy');
    Route::get('/admins/existing-users', [AdminController::class, 'getExistingUsers'])->name('admins.existing-users');
    Route::post('/admins/add-existing', [AdminController::class, 'addExistingUserAsAdmin'])->name('admins.add-existing');
    Route::post('/admins/create-new', [AdminController::class, 'createNewAdmin'])->name('admins.create-new');

    // Book routes
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::put('/books/{book}', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('books.destroy');
    Route::post('/books/{book}/borrow', [BookController::class, 'borrow'])->name('books.borrow');
    Route::post('/books/{book}/return', [BookController::class, 'return'])->name('books.return');

    // API routes
    Route::get('/api/schools/{school}/books', [BookController::class, 'getSchoolBooks']);
    Route::get('/api/schools/{school}/teachers', [\App\Http\Controllers\SchoolController::class, 'getTeachers']);
    Route::get('/api/classes/{class}/students', [ClassController::class, 'getStudents']);

    // School Admin Routes
    Route::middleware(['auth', 'verified'])->group(function () {
        // Dashboard
        Route::get('/school-admin/dashboard', [AdminController::class, 'schoolAdminDashboard'])->name('school-admin.dashboard');

        // Classes/Grades Management
        Route::resource('classes', ClassController::class);

        // Subject Management for Classes
        Route::get('/classes/{class}/subjects', [SubjectController::class, 'index'])->name('classes.subjects.index');
        Route::post('/classes/{class}/subjects', [SubjectController::class, 'store'])->name('classes.subjects.store');
        Route::get('/classes/{class}/subjects/{subject}', [SubjectController::class, 'show'])->name('classes.subjects.show');
        Route::put('/classes/{class}/subjects/{subject}', [SubjectController::class, 'update'])->name('classes.subjects.update');
        Route::delete('/classes/{class}/subjects/{subject}', [SubjectController::class, 'destroy'])->name('classes.subjects.destroy');

        // Material Management for Subjects
        Route::prefix('classes/{class}/subjects/{subject}/materials')->name('classes.subjects.materials.')->group(function () {
            Route::get('/', [MaterialController::class, 'index'])->name('index');
            Route::post('/', [MaterialController::class, 'store'])->name('store');
            Route::get('/{material}', [MaterialController::class, 'show'])->name('show');
            Route::post('/{material}', [MaterialController::class, 'update'])->name('update');
            Route::delete('/{material}', [MaterialController::class, 'destroy'])->name('destroy');
            Route::post('/batch-delete', [MaterialController::class, 'batchDelete'])->name('batchDelete');
            
            // New category management routes
            Route::get('/categories', [MaterialController::class, 'getCategories'])->name('getCategories');
            Route::post('/categories', [MaterialController::class, 'storeCategory'])->name('storeCategory');
        });

        // Assessment Management for Subjects
        Route::prefix('classes/{class}/subjects/{subject}/assessments')->name('classes.subjects.assessments.')->group(function () {
            Route::get('/', [AssessmentController::class, 'index'])->name('index');
            Route::post('/', [AssessmentController::class, 'store'])->name('store');
            Route::get('/{assessment}', [AssessmentController::class, 'show'])->name('show');
            Route::put('/{assessment}', [AssessmentController::class, 'update'])->name('update');
            Route::delete('/{assessment}', [AssessmentController::class, 'destroy'])->name('destroy');
            Route::post('/{assessment}/submit', [AssessmentController::class, 'submitAssessment'])->name('submit');
            Route::post('/{assessment}/submissions/{submission}/grade', [AssessmentController::class, 'gradeSubmission'])->name('grade');
        });

        // Teacher Management
        Route::resource('teachers', TeacherController::class);
        Route::post('/teachers/{id}/reset-password', [TeacherController::class, 'resetPassword'])->name('teachers.reset-password');

        // Student Enrollment Management
        Route::get('/classes/{id}/students', [ClassController::class, 'getStudents'])->name('classes.getStudents');
        Route::get('/classes/{id}/available-students', [ClassController::class, 'getAvailableStudents'])->name('classes.getAvailableStudents');
        Route::post('/classes/{id}/add-students', [ClassController::class, 'addStudents'])->name('classes.addStudents');
        Route::delete('/classes/{id}/remove-student/{student_id}', [ClassController::class, 'removeStudent'])->name('classes.removeStudent');
    });

    // Parent routes
    Route::middleware('parent')->group(function () {
        Route::get('/parent/dashboard', [ParentController::class, 'dashboard'])->name('parent.dashboard');
        Route::get('/parent/students/create', [ParentController::class, 'createStudent'])->name('parent.students.create');
        Route::post('/parent/students', [ParentController::class, 'storeStudent'])->name('parent.students.store');
        Route::get('/parent/students/{student}/edit', [ParentController::class, 'editStudent'])->name('parent.students.edit');
        Route::put('/parent/students/{student}', [ParentController::class, 'updateStudent'])->name('parent.students.update');
        Route::patch('/parent/students/{student}/toggle-status', [ParentController::class, 'toggleStudentStatus'])->name('parent.students.toggle-status');
    });

    // Teacher routes
    Route::middleware(['auth', 'verified'])->group(function () {
        // Teacher Dashboard
        Route::get('/teacher/dashboard', function () {
            $user = Auth::user();
            
            // Get classes taught by this teacher with students and subjects
            $classes = Classes::where('teacher_id', $user->id)
                ->with(['students', 'subjects'])
                ->get();
                
            // Get subjects taught by this teacher with class info
            $subjects = Subject::whereHas('classes', function ($query) use ($user) {
                $query->where('classes.teacher_id', $user->id);
            })
            ->with(['classes' => function ($query) use ($user) {
                $query->where('classes.teacher_id', $user->id);
            }])
            ->get();
            
            // Add student count to each subject
            foreach ($subjects as $subject) {
                $studentIds = [];
                foreach ($subject->classes as $class) {
                    foreach ($class->students as $student) {
                        $studentIds[$student->id] = true;
                    }
                }
                $subject->students_count = count($studentIds);
            }
            
            // Get assessments created by this teacher
            $assessments = Assessment::where('created_by', $user->id)
                ->with(['class', 'subject'])
                ->withCount(['submissions as submissions_count' => function ($query) {
                    $query->where('status', 'submitted')->whereNull('grade');
                }])
                ->withCount(['submissions as graded_count' => function ($query) {
                    $query->whereNotNull('grade');
                }])
                ->orderBy('due_date', 'asc')
                ->take(5)
                ->get();
                
            // Get announcements relevant to this teacher
            $announcements = Announcement::where(function ($query) use ($user) {
                    $query->where('target_type', 'all')
                        ->orWhere('target_type', 'teachers')
                        ->orWhere(function ($q) use ($user) {
                            $q->where('target_type', 'specific')
                                ->whereJsonContains('target_ids', $user->id);
                        });
                })
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
                
            // Get today's schedule
            $today = strtolower(date('l')); // Get current day of week
            $schedule = [];
            
            foreach ($classes as $class) {
                $todaySubjects = $class->subjects->filter(function ($subject) use ($today) {
                    $schedule = strtolower($subject->pivot->schedule ?? '');
                    return str_contains($schedule, $today);
                });
                
                if ($todaySubjects->count() > 0) {
                    $schedule[] = [
                        'class' => $class,
                        'todaySubjects' => $todaySubjects
                    ];
                }
            }
            
            return Inertia::render('Teacher/Dashboard', [
                'classes' => $classes,
                'subjects' => $subjects,
                'assessments' => $assessments,
                'announcements' => $announcements,
                'schedule' => $schedule
            ]);
        })->middleware(['auth', 'verified', \App\Http\Middleware\CheckRole::class.':teacher'])->name('teacher.dashboard');
        
        // Assignment routes - only accessible to teachers
        Route::middleware(['auth', 'verified'])->group(function () {
            Route::post('/assignments', [AssignmentController::class, 'store'])->name('assignments.store');
            Route::get('/assignments/{id}', [AssignmentController::class, 'show'])->name('assignments.show');
            Route::put('/assignments/{id}', [AssignmentController::class, 'update'])->name('assignments.update');
            Route::delete('/assignments/{id}', [AssignmentController::class, 'destroy'])->name('assignments.destroy');
        });
    });
});

require __DIR__ . '/auth.php';
