<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Teacher;
use App\Models\School;
use App\Models\Classes;
use App\Models\Subject;
use App\Models\Student;
use App\Models\Attendance;
use App\Models\Assignment;
use App\Models\Exam;
use App\Models\Material;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display the teacher dashboard.
     *
     * @return \Inertia\Response
     */
    public function dashboard()
    {
        $user = Auth::user();
        $teacher = $user->teacher;
        
        // Get classes taught by the teacher
        $classes = Classes::with(['students.student', 'subjects'])
            ->where('teacher_id', $user->id)
            ->get();
            
        // Get subjects taught by the teacher
        $subjects = Subject::with(['classes'])
            ->whereHas('classes', function($query) use ($user) {
                $query->where('class_subject.teacher_id', $user->id);
            })
            ->get()
            ->map(function($subject) {
                // Calculate student count manually
                $studentCount = 0;
                foreach ($subject->classes as $class) {
                    $studentCount += $class->students()->count();
                }
                $subject->student_count = $studentCount;
                return $subject;
            });
            
        // Get assessments created by the teacher
        $assessments = Assignment::with(['class', 'subject'])
            ->where('created_by', $user->id)
            ->get();
            
        // Get announcements for the teacher
        $announcements = Announcement::where(function($query) use ($user) {
                $query->where('target_type', 'all')
                    ->orWhere('target_type', 'teachers')
                    ->orWhere('author_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
            
        // Get today's schedule
        $schedule = $this->getTodaySchedule($user->id);
        
        return Inertia::render('Teacher/Dashboard', [
            'classes' => $classes,
            'subjects' => $subjects,
            'assessments' => $assessments,
            'announcements' => $announcements,
            'schedule' => $schedule
        ]);
    }
    
    /**
     * Get today's schedule for the teacher.
     *
     * @param int $teacherId
     * @return array
     */
    private function getTodaySchedule($teacherId)
    {
        $today = strtolower(date('l')); // Get current day of week
        
        $classes = Classes::with(['subjects' => function($query) use ($today) {
            $query->whereRaw("LOWER(schedule) LIKE ?", ["%$today%"]);
        }])
        ->where('teacher_id', $teacherId)
        ->get()
        ->map(function($class) {
            return [
                'id' => $class->id,
                'name' => $class->name,
                'todaySubjects' => $class->subjects->filter(function($subject) {
                    return !empty($subject->pivot->schedule);
                })
            ];
        });
        
        return $classes;
    }

    /**
     * Display the list of classes taught by the teacher.
     *
     * @return \Inertia\Response
     */
    public function classes()
    {
        $user = Auth::user();
        
        $classes = Classes::with(['students.student', 'subjects'])
            ->where('teacher_id', $user->id)
            ->get();
            
        return Inertia::render('Teacher/Classes/Index', [
            'classes' => $classes
        ]);
    }
    
    /**
     * Display the details of a specific class.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function classDetails($id)
    {
        $class = Classes::with(['students.student', 'subjects', 'teacher.user', 'school'])
            ->findOrFail($id);
            
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        return Inertia::render('Teacher/Classes/Show', [
            'class' => $class
        ]);
    }
    
    /**
     * Display the students in a specific class.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function classStudents($id)
    {
        $class = Classes::with(['students.student', 'teacher.user'])
            ->findOrFail($id);
            
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        return Inertia::render('Teacher/Classes/Students', [
            'class' => $class
        ]);
    }
    
    /**
     * Add a student to a class.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function addStudentToClass(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id'
        ]);
        
        // Check if student is already in the class
        $exists = $class->students()->where('student_id', $validated['student_id'])->exists();
        
        if ($exists) {
            return redirect()->back()->with('error', 'Student is already in this class.');
        }
        
        // Add student to class
        $class->students()->attach($validated['student_id']);
        
        return redirect()->back()->with('success', 'Student added to class successfully.');
    }
    
    /**
     * Remove a student from a class.
     *
     * @param int $classId
     * @param int $studentId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function removeStudentFromClass($classId, $studentId)
    {
        $class = Classes::findOrFail($classId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        // Remove student from class
        $class->students()->detach($studentId);
        
        return redirect()->back()->with('success', 'Student removed from class successfully.');
    }
    
    /**
     * Display the attendance page for a class.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function attendance($id)
    {
        $class = Classes::with(['students.student', 'teacher.user'])
            ->findOrFail($id);
            
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        // Get attendance records for the last 7 days
        $startDate = now()->subDays(7)->format('Y-m-d');
        $endDate = now()->format('Y-m-d');
        
        $attendanceRecords = Attendance::where('class_id', $id)
            ->whereBetween('date', [$startDate, $endDate])
            ->get()
            ->groupBy('student_id');
            
        return Inertia::render('Teacher/Classes/Attendance', [
            'class' => $class,
            'attendanceRecords' => $attendanceRecords
        ]);
    }
    
    /**
     * Mark attendance for students in a class.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function markAttendance(Request $request, $id)
    {
        $class = Classes::findOrFail($id);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        $validated = $request->validate([
            'date' => 'required|date',
            'attendance' => 'required|array',
            'attendance.*.student_id' => 'required|exists:students,id',
            'attendance.*.status' => 'required|in:present,late,absent'
        ]);
        
        // Process attendance records
        foreach ($validated['attendance'] as $record) {
            Attendance::updateOrCreate(
                [
                    'class_id' => $id,
                    'student_id' => $record['student_id'],
                    'date' => $validated['date']
                ],
                [
                    'status' => $record['status'],
                    'marked_by' => Auth::id()
                ]
            );
        }
        
        return redirect()->back()->with('success', 'Attendance marked successfully.');
    }
    
    /**
     * Display the materials page for a class.
     *
     * @param int $classId
     * @param int $subjectId
     * @return \Inertia\Response
     */
    public function materials($classId, $subjectId)
    {
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        // Get materials for this class and subject
        $materials = Material::where('class_id', $classId)
            ->where('subject_id', $subjectId)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('Teacher/Classes/Materials', [
            'class' => $class,
            'subject' => $subject,
            'materials' => $materials
        ]);
    }
    
    /**
     * Upload a new material.
     *
     * @param Request $request
     * @param int $classId
     * @param int $subjectId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function uploadMaterial(Request $request, $classId, $subjectId)
    {
        $class = Classes::findOrFail($classId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|max:10240', // Max 10MB
            'type' => 'required|in:document,presentation,video,other'
        ]);
        
        // Store the file
        $path = $request->file('file')->store('materials');
        
        // Create material record
        Material::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'file_path' => $path,
            'file_name' => $request->file('file')->getClientOriginalName(),
            'file_type' => $validated['type'],
            'class_id' => $classId,
            'subject_id' => $subjectId,
            'uploaded_by' => Auth::id()
        ]);
        
        return redirect()->back()->with('success', 'Material uploaded successfully.');
    }
    
    /**
     * Display the assignments page for a class.
     *
     * @param int $classId
     * @param int $subjectId
     * @return \Inertia\Response
     */
    public function assignments($classId, $subjectId)
    {
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        // Get assignments for this class and subject
        $assignments = Assignment::where('class_id', $classId)
            ->where('subject_id', $subjectId)
            ->orderBy('due_date', 'desc')
            ->get();
            
        return Inertia::render('Teacher/Classes/Assignments', [
            'class' => $class,
            'subject' => $subject,
            'assignments' => $assignments
        ]);
    }
    
    /**
     * Create a new assignment.
     *
     * @param Request $request
     * @param int $classId
     * @param int $subjectId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createAssignment(Request $request, $classId, $subjectId)
    {
        $class = Classes::findOrFail($classId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'max_score' => 'required|numeric|min:0',
            'file' => 'nullable|file|max:10240' // Max 10MB
        ]);
        
        // Store the file if provided
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('assignments');
        }
        
        // Create assignment record
        Assignment::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'max_score' => $validated['max_score'],
            'file_path' => $filePath,
            'file_name' => $request->hasFile('file') ? $request->file('file')->getClientOriginalName() : null,
            'class_id' => $classId,
            'subject_id' => $subjectId,
            'created_by' => Auth::id()
        ]);
        
        return redirect()->back()->with('success', 'Assignment created successfully.');
    }
    
    /**
     * Display the exams page for a class.
     *
     * @param int $classId
     * @param int $subjectId
     * @return \Inertia\Response
     */
    public function exams($classId, $subjectId)
    {
        $class = Classes::findOrFail($classId);
        $subject = Subject::findOrFail($subjectId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        // Get exams for this class and subject
        $exams = Exam::where('class_id', $classId)
            ->where('subject_id', $subjectId)
            ->orderBy('exam_date', 'desc')
            ->get();
            
        return Inertia::render('Teacher/Classes/Exams', [
            'class' => $class,
            'subject' => $subject,
            'exams' => $exams
        ]);
    }
    
    /**
     * Create a new exam.
     *
     * @param Request $request
     * @param int $classId
     * @param int $subjectId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function createExam(Request $request, $classId, $subjectId)
    {
        $class = Classes::findOrFail($classId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'exam_date' => 'required|date',
            'duration' => 'required|integer|min:1',
            'max_score' => 'required|numeric|min:0'
        ]);
        
        // Create exam record
        Exam::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'exam_date' => $validated['exam_date'],
            'duration' => $validated['duration'],
            'max_score' => $validated['max_score'],
            'class_id' => $classId,
            'subject_id' => $subjectId,
            'created_by' => Auth::id()
        ]);
        
        return redirect()->back()->with('success', 'Exam created successfully.');
    }
    
    /**
     * Display the whiteboard for a class.
     *
     * @param int $classId
     * @return \Inertia\Response
     */
    public function whiteboard($classId)
    {
        $class = Classes::findOrFail($classId);
        
        // Check if the authenticated user is the teacher of this class
        if (Auth::id() !== $class->teacher_id) {
            abort(403, 'Unauthorized action.');
        }
        
        return Inertia::render('Teacher/Classes/Whiteboard', [
            'class' => $class
        ]);
    }
    
    /**
     * Display the messages page for a teacher.
     *
     * @return \Inertia\Response
     */
    public function messages()
    {
        $user = Auth::user();
        
        // Get messages for the teacher
        // This would need to be implemented based on your messaging system
        
        return Inertia::render('Teacher/Messages', [
            // Pass messages data here
        ]);
    }
    
    /**
     * Display the reports page for a teacher.
     *
     * @return \Inertia\Response
     */
    public function reports()
    {
        $user = Auth::user();
        $teacher = $user->teacher;
        
        // Get classes taught by the teacher
        $classes = Classes::with(['students.student', 'subjects'])
            ->where('teacher_id', $user->id)
            ->get();
            
        // Get attendance data for each class
        $attendanceData = [];
        $performanceData = [];
        $assignmentData = [];
        $examData = [];
        $studentProgressData = [];
        
        foreach ($classes as $class) {
            // Attendance data
            $attendanceRecords = Attendance::where('class_id', $class->id)
                ->whereDate('date', '>=', now()->subDays(30))
                ->get();
                
            $totalAttendance = $attendanceRecords->count();
            $presentCount = $attendanceRecords->where('status', 'present')->count();
            $lateCount = $attendanceRecords->where('status', 'late')->count();
            $absentCount = $attendanceRecords->where('status', 'absent')->count();
            
            $attendanceData[$class->id] = [
                'average' => $totalAttendance > 0 ? round((($presentCount + $lateCount) / $totalAttendance) * 100, 1) : 0,
                'perfect' => $attendanceRecords->groupBy('student_id')
                    ->filter(function($records) {
                        return $records->where('status', 'absent')->count() === 0;
                    })->count(),
                'concerns' => $attendanceRecords->groupBy('student_id')
                    ->filter(function($records) {
                        return $records->where('status', 'absent')->count() > 3;
                    })->count(),
                'weekly' => $this->getWeeklyAttendanceTrend($class->id)
            ];
            
            // Performance/Grade data
            $assignments = Assignment::where('class_id', $class->id)->get();
            $exams = Exam::where('class_id', $class->id)->get();
            
            $assignmentScores = $assignments->pluck('average_score')->filter()->toArray();
            $examScores = $exams->pluck('average_score')->filter()->toArray();
            
            $allScores = array_merge($assignmentScores, $examScores);
            
            $performanceData[$class->id] = [
                'average' => count($allScores) > 0 ? round(array_sum($allScores) / count($allScores), 1) : 0,
                'highest' => count($allScores) > 0 ? max($allScores) : 0,
                'lowest' => count($allScores) > 0 ? min($allScores) : 0,
                'distribution' => $this->getGradeDistribution($class->id)
            ];
            
            // Assignment data
            $totalAssignments = $assignments->count();
            $completedAssignments = $assignments->filter(function($assignment) {
                return $assignment->submissions_count > 0;
            })->count();
            
            $assignmentData[$class->id] = [
                'completion_rate' => $totalAssignments > 0 ? round(($completedAssignments / $totalAssignments) * 100, 1) : 0,
                'on_time' => $assignments->filter(function($assignment) {
                    return $assignment->on_time_submissions_count > 0;
                })->count(),
                'late' => $assignments->filter(function($assignment) {
                    return $assignment->late_submissions_count > 0;
                })->count(),
                'missing' => $this->getStudentsWithMissingAssignments($class->id)
            ];
            
            // Exam data
            $totalExams = $exams->count();
            $passedExams = $exams->filter(function($exam) {
                return $exam->pass_rate > 50;
            })->count();
            
            $examData[$class->id] = [
                'average' => count($examScores) > 0 ? round(array_sum($examScores) / count($examScores), 1) : 0,
                'pass_rate' => $totalExams > 0 ? round(($passedExams / $totalExams) * 100, 1) : 0,
                'improvement' => $this->getExamImprovementRate($class->id),
                'by_student' => $this->getExamResultsByStudent($class->id)
            ];
            
            // Student progress data
            $studentProgressData[$class->id] = [
                'average_improvement' => $this->getAverageImprovementRate($class->id),
                'most_improved' => $this->getMostImprovedStudent($class->id),
                'needs_attention' => $this->getStudentsNeedingAttention($class->id),
                'by_student' => $this->getDetailedStudentProgress($class->id)
            ];
        }
        
        return Inertia::render('Teacher/Reports', [
            'classes' => $classes,
            'attendanceData' => $attendanceData,
            'performanceData' => $performanceData,
            'assignmentData' => $assignmentData,
            'examData' => $examData,
            'studentProgressData' => $studentProgressData,
            'overview' => $this->getOverviewData($classes)
        ]);
    }
    
    /**
     * Get weekly attendance trend for a class.
     *
     * @param int $classId
     * @return array
     */
    private function getWeeklyAttendanceTrend($classId)
    {
        $startDate = now()->subDays(30);
        $endDate = now();
        
        $attendanceByWeek = Attendance::where('class_id', $classId)
            ->whereDate('date', '>=', $startDate)
            ->whereDate('date', '<=', $endDate)
            ->get()
            ->groupBy(function($attendance) {
                return \Carbon\Carbon::parse($attendance->date)->startOfWeek()->format('Y-m-d');
            })
            ->map(function($records) {
                $total = $records->count();
                $present = $records->where('status', 'present')->count();
                $late = $records->where('status', 'late')->count();
                
                return [
                    'week' => \Carbon\Carbon::parse($records->first()->date)->format('M d'),
                    'rate' => $total > 0 ? round((($present + $late) / $total) * 100, 1) : 0
                ];
            })
            ->values()
            ->toArray();
            
        return $attendanceByWeek;
    }
    
    /**
     * Get grade distribution for a class.
     *
     * @param int $classId
     * @return array
     */
    private function getGradeDistribution($classId)
    {
        $assignments = Assignment::where('class_id', $classId)->get();
        $exams = Exam::where('class_id', $classId)->get();
        
        $distribution = [
            'A' => 0,
            'B' => 0,
            'C' => 0,
            'D' => 0,
            'F' => 0
        ];
        
        // Process assignment grades
        foreach ($assignments as $assignment) {
            if ($assignment->submissions_count > 0) {
                $grade = $this->scoreToGrade($assignment->average_score);
                $distribution[$grade]++;
            }
        }
        
        // Process exam grades
        foreach ($exams as $exam) {
            if ($exam->submissions_count > 0) {
                $grade = $this->scoreToGrade($exam->average_score);
                $distribution[$grade]++;
            }
        }
        
        return $distribution;
    }
    
    /**
     * Convert score to letter grade.
     *
     * @param float $score
     * @return string
     */
    private function scoreToGrade($score)
    {
        if ($score >= 90) return 'A';
        if ($score >= 80) return 'B';
        if ($score >= 70) return 'C';
        if ($score >= 60) return 'D';
        return 'F';
    }
    
    /**
     * Get students with missing assignments.
     *
     * @param int $classId
     * @return array
     */
    private function getStudentsWithMissingAssignments($classId)
    {
        $class = Classes::with('students.student')->findOrFail($classId);
        $assignments = Assignment::where('class_id', $classId)->get();
        
        $studentsWithMissing = [];
        
        foreach ($class->students as $classStudent) {
            $student = $classStudent->student;
            $missingCount = 0;
            
            foreach ($assignments as $assignment) {
                // Check if student has submitted this assignment
                $hasSubmitted = $assignment->submissions()
                    ->where('student_id', $student->id)
                    ->exists();
                    
                if (!$hasSubmitted) {
                    $missingCount++;
                }
            }
            
            if ($missingCount > 0) {
                $studentsWithMissing[] = [
                    'id' => $student->id,
                    'name' => $student->user->name,
                    'missing_count' => $missingCount
                ];
            }
        }
        
        return $studentsWithMissing;
    }
    
    /**
     * Get exam improvement rate for a class.
     *
     * @param int $classId
     * @return float
     */
    private function getExamImprovementRate($classId)
    {
        $exams = Exam::where('class_id', $classId)
            ->orderBy('exam_date', 'asc')
            ->get();
            
        if ($exams->count() < 2) {
            return 0;
        }
        
        $firstExam = $exams->first();
        $lastExam = $exams->last();
        
        if (!$firstExam->average_score || !$lastExam->average_score) {
            return 0;
        }
        
        return round((($lastExam->average_score - $firstExam->average_score) / $firstExam->average_score) * 100, 1);
    }
    
    /**
     * Get exam results by student.
     *
     * @param int $classId
     * @return array
     */
    private function getExamResultsByStudent($classId)
    {
        $class = Classes::with('students.student.user')->findOrFail($classId);
        $exams = Exam::where('class_id', $classId)->get();
        
        $resultsByStudent = [];
        
        foreach ($class->students as $classStudent) {
            $student = $classStudent->student;
            $studentResults = [];
            
            foreach ($exams as $exam) {
                $submission = $exam->submissions()
                    ->where('student_id', $student->id)
                    ->first();
                    
                $studentResults[] = [
                    'exam_id' => $exam->id,
                    'exam_title' => $exam->title,
                    'score' => $submission ? $submission->score : null,
                    'max_score' => $exam->max_score,
                    'percentage' => $submission ? round(($submission->score / $exam->max_score) * 100, 1) : 0
                ];
            }
            
            $resultsByStudent[] = [
                'student_id' => $student->id,
                'student_name' => $student->user->name,
                'results' => $studentResults
            ];
        }
        
        return $resultsByStudent;
    }
    
    /**
     * Get average improvement rate for students in a class.
     *
     * @param int $classId
     * @return float
     */
    private function getAverageImprovementRate($classId)
    {
        $class = Classes::with('students.student')->findOrFail($classId);
        $exams = Exam::where('class_id', $classId)
            ->orderBy('exam_date', 'asc')
            ->get();
            
        if ($exams->count() < 2) {
            return 0;
        }
        
        $improvementRates = [];
        
        foreach ($class->students as $classStudent) {
            $student = $classStudent->student;
            
            $firstExamSubmission = $exams->first()->submissions()
                ->where('student_id', $student->id)
                ->first();
                
            $lastExamSubmission = $exams->last()->submissions()
                ->where('student_id', $student->id)
                ->first();
                
            if ($firstExamSubmission && $lastExamSubmission && $firstExamSubmission->score > 0) {
                $improvementRate = (($lastExamSubmission->score - $firstExamSubmission->score) / $firstExamSubmission->score) * 100;
                $improvementRates[] = $improvementRate;
            }
        }
        
        return count($improvementRates) > 0 ? round(array_sum($improvementRates) / count($improvementRates), 1) : 0;
    }
    
    /**
     * Get the most improved student in a class.
     *
     * @param int $classId
     * @return array|null
     */
    private function getMostImprovedStudent($classId)
    {
        $class = Classes::with('students.student.user')->findOrFail($classId);
        $exams = Exam::where('class_id', $classId)
            ->orderBy('exam_date', 'asc')
            ->get();
            
        if ($exams->count() < 2) {
            return null;
        }
        
        $studentImprovements = [];
        
        foreach ($class->students as $classStudent) {
            $student = $classStudent->student;
            
            $firstExamSubmission = $exams->first()->submissions()
                ->where('student_id', $student->id)
                ->first();
                
            $lastExamSubmission = $exams->last()->submissions()
                ->where('student_id', $student->id)
                ->first();
                
            if ($firstExamSubmission && $lastExamSubmission && $firstExamSubmission->score > 0) {
                $improvementRate = (($lastExamSubmission->score - $firstExamSubmission->score) / $firstExamSubmission->score) * 100;
                
                $studentImprovements[] = [
                    'student_id' => $student->id,
                    'student_name' => $student->user->name,
                    'improvement_rate' => $improvementRate
                ];
            }
        }
        
        if (count($studentImprovements) === 0) {
            return null;
        }
        
        // Sort by improvement rate (descending)
        usort($studentImprovements, function($a, $b) {
            return $b['improvement_rate'] <=> $a['improvement_rate'];
        });
        
        $mostImproved = $studentImprovements[0];
        $mostImproved['improvement_rate'] = round($mostImproved['improvement_rate'], 1);
        
        return $mostImproved;
    }
    
    /**
     * Get students needing attention in a class.
     *
     * @param int $classId
     * @return array
     */
    private function getStudentsNeedingAttention($classId)
    {
        $class = Classes::with('students.student.user')->findOrFail($classId);
        $assignments = Assignment::where('class_id', $classId)->get();
        $exams = Exam::where('class_id', $classId)->get();
        $attendanceRecords = Attendance::where('class_id', $classId)
            ->whereDate('date', '>=', now()->subDays(30))
            ->get()
            ->groupBy('student_id');
            
        $studentsNeedingAttention = [];
        
        foreach ($class->students as $classStudent) {
            $student = $classStudent->student;
            $reasons = [];
            
            // Check attendance
            $studentAttendance = $attendanceRecords->get($student->id, collect());
            $absentCount = $studentAttendance->where('status', 'absent')->count();
            
            if ($absentCount > 3) {
                $reasons[] = 'High absences';
            }
            
            // Check assignments
            $missingAssignments = 0;
            foreach ($assignments as $assignment) {
                $hasSubmitted = $assignment->submissions()
                    ->where('student_id', $student->id)
                    ->exists();
                    
                if (!$hasSubmitted) {
                    $missingAssignments++;
                }
            }
            
            if ($missingAssignments > 2) {
                $reasons[] = 'Missing assignments';
            }
            
            // Check exam performance
            $lowExamScores = 0;
            foreach ($exams as $exam) {
                $submission = $exam->submissions()
                    ->where('student_id', $student->id)
                    ->first();
                    
                if ($submission && ($submission->score / $exam->max_score) * 100 < 60) {
                    $lowExamScores++;
                }
            }
            
            if ($lowExamScores > 0) {
                $reasons[] = 'Low exam scores';
            }
            
            if (count($reasons) > 0) {
                $studentsNeedingAttention[] = [
                    'student_id' => $student->id,
                    'student_name' => $student->user->name,
                    'reasons' => $reasons
                ];
            }
        }
        
        return $studentsNeedingAttention;
    }
    
    /**
     * Get detailed progress for each student in a class.
     *
     * @param int $classId
     * @return array
     */
    private function getDetailedStudentProgress($classId)
    {
        $class = Classes::with('students.student.user')->findOrFail($classId);
        $assignments = Assignment::where('class_id', $classId)->get();
        $exams = Exam::where('class_id', $classId)->get();
        $attendanceRecords = Attendance::where('class_id', $classId)
            ->whereDate('date', '>=', now()->subDays(30))
            ->get()
            ->groupBy('student_id');
            
        $detailedProgress = [];
        
        foreach ($class->students as $classStudent) {
            $student = $classStudent->student;
            
            // Calculate attendance rate
            $studentAttendance = $attendanceRecords->get($student->id, collect());
            $totalAttendance = $studentAttendance->count();
            $presentCount = $studentAttendance->where('status', 'present')->count();
            $lateCount = $studentAttendance->where('status', 'late')->count();
            $attendanceRate = $totalAttendance > 0 ? round((($presentCount + $lateCount) / $totalAttendance) * 100, 1) : 0;
            
            // Calculate assignment completion
            $completedAssignments = 0;
            foreach ($assignments as $assignment) {
                $hasSubmitted = $assignment->submissions()
                    ->where('student_id', $student->id)
                    ->exists();
                    
                if ($hasSubmitted) {
                    $completedAssignments++;
                }
            }
            $assignmentRate = $assignments->count() > 0 ? round(($completedAssignments / $assignments->count()) * 100, 1) : 0;
            
            // Calculate exam performance
            $examScores = [];
            foreach ($exams as $exam) {
                $submission = $exam->submissions()
                    ->where('student_id', $student->id)
                    ->first();
                    
                if ($submission) {
                    $examScores[] = ($submission->score / $exam->max_score) * 100;
                }
            }
            $averageExamScore = count($examScores) > 0 ? round(array_sum($examScores) / count($examScores), 1) : 0;
            
            $detailedProgress[] = [
                'student_id' => $student->id,
                'student_name' => $student->user->name,
                'attendance_rate' => $attendanceRate,
                'assignment_completion' => $assignmentRate,
                'average_exam_score' => $averageExamScore,
                'overall_grade' => $this->calculateOverallGrade($attendanceRate, $assignmentRate, $averageExamScore)
            ];
        }
        
        return $detailedProgress;
    }
    
    /**
     * Calculate overall grade based on attendance, assignments, and exams.
     *
     * @param float $attendanceRate
     * @param float $assignmentRate
     * @param float $examScore
     * @return string
     */
    private function calculateOverallGrade($attendanceRate, $assignmentRate, $examScore)
    {
        // Weight: 20% attendance, 30% assignments, 50% exams
        $overallScore = ($attendanceRate * 0.2) + ($assignmentRate * 0.3) + ($examScore * 0.5);
        
        return $this->scoreToGrade($overallScore);
    }
    
    /**
     * Get overview data for all classes.
     *
     * @param \Illuminate\Database\Eloquent\Collection $classes
     * @return array
     */
    private function getOverviewData($classes)
    {
        $totalStudents = 0;
        $totalAttendance = 0;
        $totalGrade = 0;
        $totalAssignmentsCompleted = 0;
        $totalAssignments = 0;
        $totalExamsPassed = 0;
        $totalExams = 0;
        $classesWithData = 0;
        
        foreach ($classes as $class) {
            $totalStudents += $class->students->count();
            
            // Attendance data
            $attendanceRecords = Attendance::where('class_id', $class->id)
                ->whereDate('date', '>=', now()->subDays(30))
                ->get();
                
            $totalAttendanceCount = $attendanceRecords->count();
            $presentCount = $attendanceRecords->where('status', 'present')->count();
            $lateCount = $attendanceRecords->where('status', 'late')->count();
            
            if ($totalAttendanceCount > 0) {
                $totalAttendance += (($presentCount + $lateCount) / $totalAttendanceCount) * 100;
            }
            
            // Grade data
            $assignments = Assignment::where('class_id', $class->id)->get();
            $exams = Exam::where('class_id', $class->id)->get();
            
            $assignmentScores = $assignments->pluck('average_score')->filter()->toArray();
            $examScores = $exams->pluck('average_score')->filter()->toArray();
            
            $allScores = array_merge($assignmentScores, $examScores);
            
            if (count($allScores) > 0) {
                $totalGrade += array_sum($allScores) / count($allScores);
            }
            
            // Assignment data
            $totalAssignments += $assignments->count();
            $totalAssignmentsCompleted += $assignments->filter(function($assignment) {
                return $assignment->submissions_count > 0;
            })->count();
            
            // Exam data
            $totalExams += $exams->count();
            $totalExamsPassed += $exams->filter(function($exam) {
                return $exam->pass_rate > 50;
            })->count();
            
            if ($attendanceRecords->count() > 0 || count($allScores) > 0) {
                $classesWithData++;
            }
        }
        
        return [
            'total_students' => $totalStudents,
            'average_attendance' => $classesWithData > 0 ? round($totalAttendance / $classesWithData, 1) : 0,
            'average_grade' => $classesWithData > 0 ? round($totalGrade / $classesWithData, 1) : 0,
            'assignments_completed' => $totalAssignmentsCompleted,
            'total_assignments' => $totalAssignments,
            'exams_passed' => $totalExamsPassed,
            'total_exams' => $totalExams,
            'improvement_rate' => $this->getOverallImprovementRate($classes)
        ];
    }
    
    /**
     * Get overall improvement rate across all classes.
     *
     * @param \Illuminate\Database\Eloquent\Collection $classes
     * @return float
     */
    private function getOverallImprovementRate($classes)
    {
        $improvementRates = [];
        
        foreach ($classes as $class) {
            $rate = $this->getExamImprovementRate($class->id);
            if ($rate !== 0) {
                $improvementRates[] = $rate;
            }
        }
        
        return count($improvementRates) > 0 ? round(array_sum($improvementRates) / count($improvementRates), 1) : 0;
    }

    /**
     * Store a newly created teacher in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        // Get the authenticated user
        $user = Auth::user();
        
        // Get the school associated with the user
        $school = School::where('id', $user->school_id)->first();
        
        // If no school is found, return with an error
        if (!$school) {
            return redirect()->back()->with('error', 'No school associated with your account. Please contact the administrator.');
        }
        
        // Check if we're using an existing user or creating a new one
        if ($request->has('existing_user_id') && $request->existing_user_id) {
            // Validate the request
            $validated = $request->validate([
                'existing_user_id' => 'required|exists:users,id',
                'subject' => 'required|string|max:255',
                'employment_status' => 'required|in:Active,On Leave,Inactive',
                'qualification' => 'nullable|string|max:255',
                'years_of_experience' => 'nullable|integer|min:0',
            ]);
            
            // Get the existing user
            $existingUser = User::findOrFail($validated['existing_user_id']);
            
            // Update the user to have teacher role and school_id
            $existingUser->update([
                'role_id' => 3, // Teacher role
                'school_id' => $school->id,
                'user_type' => 'teacher',
            ]);
            
            // Generate a teacher ID number
            $teacherIdNumber = 'TCH' . str_pad($existingUser->id, 5, '0', STR_PAD_LEFT);
            
            // Create or update teacher record
            $teacher = Teacher::updateOrCreate(
                ['user_id' => $existingUser->id],
                [
                    'school_id' => $school->id,
                    'subject_specialty' => $validated['subject'],
                    'employment_status' => $validated['employment_status'],
                    'qualification' => $validated['qualification'] ?? null,
                    'years_of_experience' => $validated['years_of_experience'] ?? null,
                    'is_active' => $validated['employment_status'] === 'Active',
                    'teacher_id_number' => $teacherIdNumber,
                ]
            );
            
            return redirect()->back()->with('success', 'Teacher added successfully!');
        } else {
            // Validate the request for creating a new user
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'subject' => 'required|string|max:255',
                'employment_status' => 'required|in:Active,On Leave,Inactive',
                'qualification' => 'nullable|string|max:255',
                'years_of_experience' => 'nullable|integer|min:0',
            ]);
            
            // Create user account
            $newUser = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make('password'), // Default password
                'school_id' => $school->id,
                'user_type' => 'teacher',
                'role_id' => 3, // Teacher role
                'is_active' => true,
            ]);
            
            // Generate a teacher ID number
            $teacherIdNumber = 'TCH' . str_pad($newUser->id, 5, '0', STR_PAD_LEFT);
            
            // Create teacher record
            $teacher = Teacher::create([
                'user_id' => $newUser->id,
                'school_id' => $school->id,
                'subject_specialty' => $validated['subject'],
                'employment_status' => $validated['employment_status'],
                'qualification' => $validated['qualification'] ?? null,
                'years_of_experience' => $validated['years_of_experience'] ?? null,
                'is_active' => $validated['employment_status'] === 'Active',
                'teacher_id_number' => $teacherIdNumber,
            ]);
            
            return redirect()->back()->with('success', 'Teacher added successfully!');
        }
    }

    /**
     * Update the specified teacher in storage.
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
            'subject' => 'required|string|max:255',
            'employment_status' => 'required|in:Active,On Leave,Inactive',
            'qualification' => 'nullable|string|max:255',
            'years_of_experience' => 'nullable|integer|min:0',
        ]);
        
        // Update user
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);
        
        // Check if teacher record exists
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        // If teacher record doesn't exist, generate a teacher ID number
        $teacherIdNumber = $teacher ? $teacher->teacher_id_number : 'TCH' . str_pad($user->id, 5, '0', STR_PAD_LEFT);
        
        // Update teacher
        $user->teacher()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'subject_specialty' => $validated['subject'],
                'employment_status' => $validated['employment_status'],
                'qualification' => $validated['qualification'] ?? null,
                'years_of_experience' => $validated['years_of_experience'] ?? null,
                'is_active' => $validated['employment_status'] === 'Active',
                'teacher_id_number' => $teacherIdNumber,
            ]
        );
        
        return redirect()->back()->with('success', 'Teacher updated successfully!');
    }

    /**
     * Reset the password for a teacher.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function resetPassword(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);
        
        // Update user password
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);
        
        return redirect()->back()->with('success', 'Teacher password reset successfully!');
    }

    /**
     * Remove the specified teacher from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Delete teacher record
        $user->teacher()->delete();
        
        // Delete user
        $user->delete();
        
        return redirect()->back()->with('success', 'Teacher deleted successfully!');
    }
}
