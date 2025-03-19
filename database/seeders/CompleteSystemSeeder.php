<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;
use App\Models\School;
use App\Models\Subject;
use App\Models\Classes;
use App\Models\Enrollment;
use App\Models\Assessment;
use App\Models\AssessmentSubmission;
use App\Models\Material;
use App\Models\Notification;
use App\Models\Grade;
use App\Models\Announcement;

class CompleteSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data
        $this->clearExistingData();
        
        // Create school
        $school = $this->createSchool();
        
        // Create users
        $superAdmins = $this->createSuperAdmins();
        $schoolAdmin = $this->createSchoolAdmin($school);
        $teachers = $this->createTeachers($school);
        $students = $this->createStudents($school);
        $parents = $this->createParents($students);
        
        // Create subjects
        $subjects = $this->createSubjects($school);
        
        // Create classes
        $classes = $this->createClasses($school, $teachers, $subjects);
        
        // Create enrollments
        $this->createEnrollments($classes, $students);
        
        // Create assessments
        $assessments = $this->createAssessments($classes, $subjects, $teachers);
        
        // Create assessment submissions
        $this->createAssessmentSubmissions($assessments, $students);
        
        // Create grades
        $this->createGrades($students, $subjects, $classes);
        
        // Create materials
        $this->createMaterials($subjects, $teachers);
        
        // Create notifications
        $users = array_merge($superAdmins, [$schoolAdmin], $teachers, $students, $parents);
        $this->createNotifications($users, $assessments);
        
        // Create announcements
        $this->createAnnouncements();
    }
    
    /**
     * Clear existing data.
     */
    private function clearExistingData(): void
    {
        // Clear all data from tables in reverse order of dependencies
        DB::statement('PRAGMA foreign_keys = OFF;');
        
        DB::table('notifications')->truncate();
        DB::table('materials')->truncate();
        DB::table('assessment_submissions')->truncate();
        DB::table('assessments')->truncate();
        DB::table('grades')->truncate();
        DB::table('parent_student')->truncate();
        DB::table('enrollments')->truncate();
        DB::table('class_subject')->truncate();
        DB::table('classes')->truncate();
        DB::table('subjects')->truncate();
        
        // Clear users except for any existing super admins
        DB::table('users')->where('user_type', '!=', 'super_admin')->delete();
        
        // Clear school data
        DB::table('schools')->truncate();
        
        DB::statement('PRAGMA foreign_keys = ON;');
    }
    
    /**
     * Create a school.
     */
    private function createSchool(): School
    {
        return School::create([
            'name' => 'iLearnZ Academy',
            'code' => 'ILA-001',
            'address' => '123 Education Street, Knowledge City',
            'city' => 'Knowledge City',
            'province' => 'Central',
            'postal_code' => '10101',
            'phone' => '+260 97 1234567',
            'email' => 'admin@ilearnz.edu',
            'principal_name' => 'Dr. James Principal',
            'type' => 'Secondary',
            'connectivity_status' => 'online',
            'internet_provider' => 'SpeedNet',
            'has_smartboards' => true,
            'student_count' => 500,
            'teacher_count' => 30,
            'school_hours' => '08:00-16:00',
        ]);
    }
    
    /**
     * Create super admins.
     */
    private function createSuperAdmins(): array
    {
        $superAdmins = [];
        
        $superAdmins[] = User::create([
            'name' => 'John Admin',
            'email' => 'john.admin@ilearnz.edu',
            'password' => Hash::make('password'),
            'user_type' => 'admin',
            'phone_number' => '+260 97 1111111',
            'profile_photo' => null,
            'role_id' => 1,
            'email_verified_at' => now(),
        ]);
        
        $superAdmins[] = User::create([
            'name' => 'Sarah Admin',
            'email' => 'sarah.admin@ilearnz.edu',
            'password' => Hash::make('password'),
            'user_type' => 'admin',
            'phone_number' => '+260 97 2222222',
            'profile_photo' => null,
            'role_id' => 1,
            'email_verified_at' => now(),
        ]);
        
        return $superAdmins;
    }
    
    /**
     * Create school admin.
     */
    private function createSchoolAdmin(School $school): User
    {
        return User::create([
            'name' => 'Michael Principal',
            'email' => 'principal@ilearnz.edu',
            'password' => Hash::make('password'),
            'user_type' => 'school_admin',
            'phone_number' => '+260 97 3333333',
            'profile_photo' => null,
            'role_id' => 2,
            'email_verified_at' => now(),
            'school_id' => $school->id,
        ]);
    }
    
    /**
     * Create teachers.
     */
    private function createTeachers(School $school): array
    {
        $teachers = [];
        
        $teachers[] = User::create([
            'name' => 'David Teacher',
            'email' => 'david.teacher@ilearnz.edu',
            'password' => Hash::make('password'),
            'user_type' => 'teacher',
            'phone_number' => '+260 97 4444444',
            'profile_photo' => null,
            'role_id' => 3,
            'email_verified_at' => now(),
            'school_id' => $school->id,
        ]);
        
        $teachers[] = User::create([
            'name' => 'Emily Teacher',
            'email' => 'emily.teacher@ilearnz.edu',
            'password' => Hash::make('password'),
            'user_type' => 'teacher',
            'phone_number' => '+260 97 5555555',
            'profile_photo' => null,
            'role_id' => 3,
            'email_verified_at' => now(),
            'school_id' => $school->id,
        ]);
        
        return $teachers;
    }
    
    /**
     * Create students.
     */
    private function createStudents(School $school): array
    {
        $students = [];
        
        $studentData = [
            [
                'name' => 'Alex Student',
                'email' => 'alex.student@ilearnz.edu',
                'phone_number' => '+260 97 6666661',
                'grade_level' => '10',
            ],
            [
                'name' => 'Bella Student',
                'email' => 'bella.student@ilearnz.edu',
                'phone_number' => '+260 97 6666662',
                'grade_level' => '10',
            ],
            [
                'name' => 'Carlos Student',
                'email' => 'carlos.student@ilearnz.edu',
                'phone_number' => '+260 97 6666663',
                'grade_level' => '11',
            ],
            [
                'name' => 'Diana Student',
                'email' => 'diana.student@ilearnz.edu',
                'phone_number' => '+260 97 6666664',
                'grade_level' => '11',
            ],
            [
                'name' => 'Ethan Student',
                'email' => 'ethan.student@ilearnz.edu',
                'phone_number' => '+260 97 6666665',
                'grade_level' => '12',
            ],
        ];
        
        foreach ($studentData as $data) {
            $students[] = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'user_type' => 'student',
                'phone_number' => $data['phone_number'],
                'profile_photo' => null,
                'role_id' => 4,
                'email_verified_at' => now(),
                'school_id' => $school->id,
                'preferences' => json_encode(['grade_level' => $data['grade_level']]),
            ]);
        }
        
        return $students;
    }
    
    /**
     * Create parents.
     */
    private function createParents(array $students): array
    {
        $parents = [];
        
        $parentData = [
            [
                'name' => 'Frank Parent',
                'email' => 'frank.parent@example.com',
                'phone_number' => '+260 97 7777771',
                'children' => [0, 1], // Indices of students array
            ],
            [
                'name' => 'Grace Parent',
                'email' => 'grace.parent@example.com',
                'phone_number' => '+260 97 7777772',
                'children' => [2], // Index of students array
            ],
            [
                'name' => 'Henry Parent',
                'email' => 'henry.parent@example.com',
                'phone_number' => '+260 97 7777773',
                'children' => [3, 4], // Indices of students array
            ],
        ];
        
        foreach ($parentData as $data) {
            $parent = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make('password'),
                'user_type' => 'parent',
                'phone_number' => $data['phone_number'],
                'profile_photo' => null,
                'role_id' => 5,
                'email_verified_at' => now(),
            ]);
            
            // Associate parent with children
            foreach ($data['children'] as $childIndex) {
                if (isset($students[$childIndex])) {
                    DB::table('parent_student')->insert([
                        'parent_id' => $parent->id,
                        'student_id' => $students[$childIndex]->id,
                        'relationship' => $childIndex === 0 ? 'father' : 'mother',
                        'is_emergency_contact' => true,
                        'can_pickup' => true,
                        'receives_reports' => true,
                        'receives_notifications' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
            
            $parents[] = $parent;
        }
        
        return $parents;
    }
    
    /**
     * Create subjects.
     */
    private function createSubjects(School $school): array
    {
        $subjects = [];
        
        $subjectData = [
            [
                'name' => 'Mathematics',
                'code' => 'MATH101',
                'description' => 'Core mathematics curriculum covering algebra, geometry, and calculus.',
                'grade_level' => 'secondary',
            ],
            [
                'name' => 'English Language',
                'code' => 'ENG101',
                'description' => 'Comprehensive English language and literature studies.',
                'grade_level' => 'secondary',
            ],
            [
                'name' => 'Science',
                'code' => 'SCI101',
                'description' => 'Integrated science covering physics, chemistry, and biology.',
                'grade_level' => 'secondary',
            ],
            [
                'name' => 'History',
                'code' => 'HIST101',
                'description' => 'World history with focus on major historical events and their impact.',
                'grade_level' => 'secondary',
            ],
            [
                'name' => 'Computer Science',
                'code' => 'CS101',
                'description' => 'Introduction to computer science, programming, and digital literacy.',
                'grade_level' => 'secondary',
            ],
        ];
        
        foreach ($subjectData as $data) {
            $subjects[] = Subject::create([
                'name' => $data['name'],
                'code' => $data['code'],
                'description' => $data['description'],
                'grade_level' => $data['grade_level'],
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2024',
            ]);
        }
        
        return $subjects;
    }
    
    /**
     * Create classes.
     */
    private function createClasses(School $school, array $teachers, array $subjects): array
    {
        $classes = [];
        
        $classData = [
            [
                'name' => 'Grade 10-A',
                'grade_level' => '10',
                'section' => 'A',
                'teacher_id' => $teachers[0]->id,
                'subjects' => [0, 1, 2], // Indices of subjects array
            ],
            [
                'name' => 'Grade 10-B',
                'grade_level' => '10',
                'section' => 'B',
                'teacher_id' => $teachers[1]->id,
                'subjects' => [0, 1, 3], // Indices of subjects array
            ],
            [
                'name' => 'Grade 11-A',
                'grade_level' => '11',
                'section' => 'A',
                'teacher_id' => $teachers[0]->id,
                'subjects' => [0, 2, 4], // Indices of subjects array
            ],
            [
                'name' => 'Grade 12-A',
                'grade_level' => '12',
                'section' => 'A',
                'teacher_id' => $teachers[1]->id,
                'subjects' => [1, 3, 4], // Indices of subjects array
            ],
        ];
        
        foreach ($classData as $data) {
            $class = Classes::create([
                'name' => $data['name'],
                'grade_level' => $data['grade_level'],
                'section' => $data['section'],
                'teacher_id' => $data['teacher_id'],
                'school_id' => $school->id,
                'academic_year' => '2024-2025',
                'start_date' => now()->startOfYear(),
                'end_date' => now()->endOfYear(),
                'is_active' => true,
                'max_students' => 40,
            ]);
            
            // Associate class with subjects
            foreach ($data['subjects'] as $subjectIndex) {
                if (isset($subjects[$subjectIndex])) {
                    DB::table('class_subject')->insert([
                        'class_id' => $class->id,
                        'subject_id' => $subjects[$subjectIndex]->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
            
            $classes[] = $class;
        }
        
        return $classes;
    }
    
    /**
     * Create enrollments.
     */
    private function createEnrollments(array $classes, array $students): void
    {
        // Grade 10 students (first 2 students)
        for ($i = 0; $i < 2; $i++) {
            Enrollment::create([
                'student_id' => $students[$i]->id,
                'class_id' => $classes[0]->id, // Grade 10-A
                'enrollment_date' => now()->subMonths(1),
                'status' => 'active',
                'notes' => 'Enrolled for the academic year 2024-2025',
            ]);
        }
        
        // Grade 11 students (next 2 students)
        for ($i = 2; $i < 4; $i++) {
            Enrollment::create([
                'student_id' => $students[$i]->id,
                'class_id' => $classes[2]->id, // Grade 11-A
                'enrollment_date' => now()->subMonths(1),
                'status' => 'active',
                'notes' => 'Enrolled for the academic year 2024-2025',
            ]);
        }
        
        // Grade 12 student (last student)
        Enrollment::create([
            'student_id' => $students[4]->id,
            'class_id' => $classes[3]->id, // Grade 12-A
            'enrollment_date' => now()->subMonths(1),
            'status' => 'active',
            'notes' => 'Enrolled for the academic year 2024-2025',
        ]);
    }
    
    /**
     * Create assessments.
     */
    private function createAssessments(array $classes, array $subjects, array $teachers): array
    {
        $assessments = [];
        
        $assessmentData = [
            // Math assessments
            [
                'title' => 'Algebra Quiz',
                'instructions' => 'Quiz covering basic algebraic concepts and equations.',
                'class_id' => $classes[0]->id,
                'subject_id' => $subjects[0]->id,
                'created_by' => $teachers[0]->id,
                'due_date' => now()->addDays(7),
                'available_from' => now(),
                'max_score' => 20,
                'is_published' => true,
                'allow_late_submissions' => false,
            ],
            [
                'title' => 'Geometry Assignment',
                'instructions' => 'Assignment on geometric shapes and theorems.',
                'class_id' => $classes[0]->id,
                'subject_id' => $subjects[0]->id,
                'created_by' => $teachers[0]->id,
                'due_date' => now()->addDays(14),
                'available_from' => now(),
                'max_score' => 50,
                'is_published' => true,
                'allow_late_submissions' => true,
            ],
            
            // English assessments
            [
                'title' => 'Essay Writing',
                'instructions' => 'Write a 500-word essay on a topic of your choice.',
                'class_id' => $classes[1]->id,
                'subject_id' => $subjects[1]->id,
                'created_by' => $teachers[1]->id,
                'due_date' => now()->addDays(10),
                'available_from' => now(),
                'max_score' => 100,
                'is_published' => true,
                'allow_late_submissions' => true,
            ],
            [
                'title' => 'Grammar Test',
                'instructions' => 'Test on parts of speech and sentence structure.',
                'class_id' => $classes[1]->id,
                'subject_id' => $subjects[1]->id,
                'created_by' => $teachers[1]->id,
                'due_date' => now()->addDays(5),
                'available_from' => now(),
                'max_score' => 30,
                'is_published' => true,
                'allow_late_submissions' => false,
            ],
            
            // Science assessments
            [
                'title' => 'Physics Lab Report',
                'instructions' => 'Write a lab report on the pendulum experiment.',
                'class_id' => $classes[2]->id,
                'subject_id' => $subjects[2]->id,
                'created_by' => $teachers[0]->id,
                'due_date' => now()->addDays(21),
                'available_from' => now(),
                'max_score' => 80,
                'is_published' => true,
                'allow_late_submissions' => true,
            ],
            
            // History assessments
            [
                'title' => 'World War II Research',
                'instructions' => 'Research paper on a specific aspect of World War II.',
                'class_id' => $classes[3]->id,
                'subject_id' => $subjects[3]->id,
                'created_by' => $teachers[1]->id,
                'due_date' => now()->addDays(30),
                'available_from' => now(),
                'max_score' => 150,
                'is_published' => true,
                'allow_late_submissions' => true,
            ],
            
            // Computer Science assessments
            [
                'title' => 'Programming Challenge',
                'instructions' => 'Solve a set of programming challenges using Python.',
                'class_id' => $classes[3]->id,
                'subject_id' => $subjects[4]->id,
                'created_by' => $teachers[1]->id,
                'due_date' => now()->addDays(15),
                'available_from' => now(),
                'max_score' => 100,
                'is_published' => true,
                'allow_late_submissions' => false,
            ],
        ];
        
        foreach ($assessmentData as $data) {
            $assessments[] = Assessment::create([
                'title' => $data['title'],
                'instructions' => $data['instructions'],
                'class_id' => $data['class_id'],
                'subject_id' => $data['subject_id'],
                'created_by' => $data['created_by'],
                'due_date' => $data['due_date'],
                'available_from' => $data['available_from'],
                'max_score' => $data['max_score'],
                'is_published' => $data['is_published'],
                'allow_late_submissions' => $data['allow_late_submissions'],
                'metadata' => json_encode(['type' => 'assignment']),
            ]);
        }
        
        return $assessments;
    }
    
    /**
     * Create assessment submissions.
     */
    private function createAssessmentSubmissions(array $assessments, array $students): void
    {
        foreach ($assessments as $assessment) {
            // Get students enrolled in the class of this assessment
            $enrolledStudents = Enrollment::where('class_id', $assessment->class_id)
                ->pluck('student_id')
                ->toArray();
            
            foreach ($students as $student) {
                // Check if student is enrolled in the class
                if (in_array($student->id, $enrolledStudents)) {
                    // 70% chance of submission
                    if (rand(1, 10) <= 7) {
                        $submissionDate = Carbon::parse($assessment->available_from)
                            ->addDays(rand(1, Carbon::parse($assessment->due_date)->diffInDays(Carbon::parse($assessment->available_from))));
                        
                        $isLate = $submissionDate->isAfter(Carbon::parse($assessment->due_date));
                        $score = rand(intval($assessment->max_score * 0.6), $assessment->max_score);
                        
                        // If late, reduce score
                        if ($isLate) {
                            $score = intval($score * 0.8);
                        }
                        
                        AssessmentSubmission::create([
                            'assessment_id' => $assessment->id,
                            'student_id' => $student->id,
                            'submission_path' => 'submissions/assessment_' . $assessment->id . '_student_' . $student->id . '.pdf',
                            'comments' => $score > ($assessment->max_score * 0.8) ? 'Excellent work!' : 'Good effort, but there\'s room for improvement.',
                            'score' => $score,
                            'graded_by' => $assessment->created_by,
                            'submitted_at' => $submissionDate,
                            'graded_at' => $submissionDate->addDays(rand(1, 3)),
                            'is_late' => $isLate,
                            'metadata' => json_encode(['format' => 'pdf']),
                        ]);
                    }
                }
            }
        }
    }
    
    /**
     * Create grades.
     */
    private function createGrades(array $students, array $subjects, array $classes): void
    {
        foreach ($students as $student) {
            // Get classes the student is enrolled in
            $enrolledClasses = Enrollment::where('student_id', $student->id)
                ->pluck('class_id')
                ->toArray();
            
            foreach ($enrolledClasses as $classId) {
                // Get subjects for this class
                $classSubjects = DB::table('class_subject')
                    ->where('class_id', $classId)
                    ->pluck('subject_id')
                    ->toArray();
                
                foreach ($classSubjects as $subjectId) {
                    // Create grades for different terms
                    $terms = ['first', 'second'];
                    
                    foreach ($terms as $term) {
                        $score = rand(60, 98);
                        $letterGrade = '';
                        
                        if ($score >= 90) $letterGrade = 'A';
                        elseif ($score >= 80) $letterGrade = 'B';
                        elseif ($score >= 70) $letterGrade = 'C';
                        elseif ($score >= 60) $letterGrade = 'D';
                        else $letterGrade = 'F';
                        
                        Grade::create([
                            'student_id' => $student->id,
                            'subject_id' => $subjectId,
                            'class_id' => $classId,
                            'term' => $term,
                            'score' => $score,
                            'letter_grade' => $letterGrade,
                            'comments' => 'Regular term grade',
                            'academic_year' => '2024-2025',
                            'recorded_by' => 1, // First teacher
                        ]);
                    }
                }
            }
        }
    }
    
    /**
     * Create materials.
     */
    private function createMaterials(array $subjects, array $teachers): void
    {
        $materialTypes = ['document', 'video', 'link', 'presentation'];
        
        foreach ($subjects as $subject) {
            $teacherId = $teachers[array_rand($teachers)]->id;
            
            // Create 2-3 materials of each type for each subject
            foreach ($materialTypes as $type) {
                for ($i = 0; $i < rand(2, 3); $i++) {
                    Material::create([
                        'title' => ucfirst($type) . ' on ' . $subject->name . ' - ' . ($i + 1),
                        'description' => 'Educational ' . $type . ' for ' . $subject->name . ' students.',
                        'type' => $type,
                        'url' => $type === 'link' ? 'https://example.com/material/' . $subject->id . '/' . ($i + 1) : null,
                        'file_path' => $type !== 'link' ? 'materials/' . $subject->code . '_' . $type . '_' . ($i + 1) . '.pdf' : null,
                        'subject_id' => $subject->id,
                        'uploaded_by' => $teacherId,
                        'status' => 'active',
                    ]);
                }
            }
        }
    }
    
    /**
     * Create notifications.
     */
    private function createNotifications(array $users, array $assessments): void
    {
        // Create notifications for all users
        foreach ($users as $user) {
            // Welcome notification for all users
            Notification::create([
                'user_id' => $user->id,
                'title' => 'Welcome to iLearnZ',
                'content' => 'Welcome to the iLearnZ platform! We are excited to have you join our educational community.',
                'type' => 'info',
                'is_read' => rand(0, 1),
                'link' => '/dashboard',
                'read_at' => rand(0, 1) ? now()->subDays(rand(1, 3)) : null,
            ]);
            
            // Role-specific notifications
            if ($user->user_type === 'student') {
                // New assessment notification for students
                foreach (array_slice($assessments, 0, 2) as $assessment) {
                    Notification::create([
                        'user_id' => $user->id,
                        'title' => 'New Assessment Available',
                        'content' => "A new assessment '{$assessment->title}' has been assigned to you. Please complete it by the due date.",
                        'type' => 'info',
                        'is_read' => false,
                        'link' => '/assessments/' . $assessment->id,
                        'read_at' => null,
                    ]);
                }
            } elseif ($user->user_type === 'teacher') {
                // Student submission notification for teachers
                Notification::create([
                    'user_id' => $user->id,
                    'title' => 'New Assessment Submissions',
                    'content' => 'Several students have submitted their assessments. Please review and grade them.',
                    'type' => 'success',
                    'is_read' => false,
                    'link' => '/assessments/submissions',
                    'read_at' => null,
                ]);
            } elseif ($user->user_type === 'parent') {
                // Child performance notification for parents
                Notification::create([
                    'user_id' => $user->id,
                    'title' => 'Child Performance Update',
                    'content' => 'Your child has received new grades. Check their performance dashboard for details.',
                    'type' => 'info',
                    'is_read' => false,
                    'link' => '/children/performance',
                    'read_at' => null,
                ]);
            } elseif ($user->user_type === 'admin' || $user->user_type === 'super_admin') {
                // System update notification for admins
                Notification::create([
                    'user_id' => $user->id,
                    'title' => 'System Update',
                    'content' => 'The iLearnZ system has been updated with new features. Check the admin panel for details.',
                    'type' => 'warning',
                    'is_read' => false,
                    'link' => '/admin/system-updates',
                    'read_at' => null,
                ]);
            }
        }
    }
    
    /**
     * Create announcements.
     */
    private function createAnnouncements(): void
    {
        // Get a valid user for author (first admin or first teacher)
        $author = User::where('user_type', 'admin')->first();
        if (!$author) {
            $author = User::where('user_type', 'teacher')->first();
        }
        
        // Ensure we have an author
        if (!$author) {
            // Create a default admin if none exists
            $author = User::create([
                'name' => 'System Admin',
                'email' => 'system@ilearnz.com',
                'password' => bcrypt('password'),
                'user_type' => 'admin',
            ]);
        }
        
        // Get teacher IDs
        $teacherIds = User::where('user_type', 'teacher')->pluck('id')->toArray();
        
        Announcement::create([
            'title' => 'Staff Meeting',
            'content' => 'Staff meeting scheduled for Friday at 2:00 PM in the conference room. All teachers are required to attend.',
            'author_id' => $author->id,
            'target_type' => 'teachers',
            'target_ids' => null,
            'priority' => 'high',
            'expires_at' => now()->addDays(7),
        ]);
        
        Announcement::create([
            'title' => 'End of Term Reminder',
            'content' => 'Please submit all grades by the end of next week for the end of term reports. Contact the academic office if you need assistance.',
            'author_id' => $author->id,
            'target_type' => 'teachers',
            'target_ids' => null,
            'priority' => 'medium',
            'expires_at' => now()->addDays(14),
        ]);
        
        Announcement::create([
            'title' => 'Professional Development',
            'content' => 'Sign up for the upcoming professional development workshop on modern teaching methods. The workshop will be held next month.',
            'author_id' => $author->id,
            'target_type' => 'teachers',
            'target_ids' => null,
            'priority' => 'low',
            'expires_at' => now()->addDays(30),
        ]);
        
        Announcement::create([
            'title' => 'System Maintenance',
            'content' => 'The system will be undergoing maintenance this weekend. Please save all your work before Friday evening.',
            'author_id' => $author->id,
            'target_type' => 'all',
            'target_ids' => null,
            'priority' => 'high',
            'expires_at' => now()->addDays(5),
        ]);
        
        // Create a specific announcement for a subset of teachers if we have teachers
        if (!empty($teacherIds)) {
            $specificTeachers = array_slice($teacherIds, 0, min(3, count($teacherIds)));
            
            Announcement::create([
                'title' => 'Department Meeting',
                'content' => 'Science department meeting scheduled for Monday at 3:00 PM. Please bring your curriculum plans.',
                'author_id' => $author->id,
                'target_type' => 'specific',
                'target_ids' => $specificTeachers,
                'priority' => 'medium',
                'expires_at' => now()->addDays(10),
            ]);
        }
    }
}
