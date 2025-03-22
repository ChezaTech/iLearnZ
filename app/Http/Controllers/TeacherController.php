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
        
        // Get dummy data for the dashboard
        $dummyData = $this->getDummyData();
        
        return Inertia::render('Teacher/Dashboard', [
            'classes' => $dummyData['classes'],
            'subjects' => $dummyData['subjects'],
            'assessments' => $dummyData['assessments'],
            'announcements' => $dummyData['announcements'],
            'schedule' => $dummyData['schedule'],
            'whiteboard' => $dummyData['whiteboard'],
            'lessons' => $dummyData['lessons'],
            'quizzes' => $dummyData['quizzes'],
            'attendance' => $dummyData['attendance']
        ]);
    }
    
    /**
     * Get dummy data for the teacher dashboard.
     *
     * @return array
     */
    private function getDummyData()
    {
        // Dummy Classes
        $classes = [
            [
                'id' => 1,
                'name' => 'Grade 10-A',
                'grade_level' => 10,
                'section' => 'A',
                'teacher_id' => 1,
                'students' => [
                    [
                        'id' => 1,
                        'name' => 'John Smith',
                        'student' => [
                            'id' => 1,
                            'student_id_number' => 'S10001',
                        ],
                        'performances' => [
                            [
                                'average_score' => 85
                            ]
                        ]
                    ],
                    [
                        'id' => 2,
                        'name' => 'Sarah Johnson',
                        'student' => [
                            'id' => 2,
                            'student_id_number' => 'S10002',
                        ],
                        'performances' => [
                            [
                                'average_score' => 92
                            ]
                        ]
                    ],
                    [
                        'id' => 3,
                        'name' => 'Michael Brown',
                        'student' => [
                            'id' => 3,
                            'student_id_number' => 'S10003',
                        ],
                        'performances' => [
                            [
                                'average_score' => 78
                            ]
                        ]
                    ],
                    [
                        'id' => 4,
                        'name' => 'Emily Davis',
                        'student' => [
                            'id' => 4,
                            'student_id_number' => 'S10004',
                        ],
                        'performances' => [
                            [
                                'average_score' => 65
                            ]
                        ]
                    ],
                    [
                        'id' => 5,
                        'name' => 'David Wilson',
                        'student' => [
                            'id' => 5,
                            'student_id_number' => 'S10005',
                        ],
                        'performances' => [
                            [
                                'average_score' => 88
                            ]
                        ]
                    ]
                ],
                'subjects' => [
                    [
                        'id' => 1,
                        'name' => 'Mathematics',
                        'code' => 'MATH10'
                    ],
                    [
                        'id' => 2,
                        'name' => 'English',
                        'code' => 'ENG10'
                    ],
                    [
                        'id' => 3,
                        'name' => 'Science',
                        'code' => 'SCI10'
                    ]
                ]
            ],
            [
                'id' => 2,
                'name' => 'Grade 11-B',
                'grade_level' => 11,
                'section' => 'B',
                'teacher_id' => 1,
                'students' => [
                    [
                        'id' => 6,
                        'name' => 'Jessica Taylor',
                        'student' => [
                            'id' => 6,
                            'student_id_number' => 'S11001',
                        ],
                        'performances' => [
                            [
                                'average_score' => 91
                            ]
                        ]
                    ],
                    [
                        'id' => 7,
                        'name' => 'Daniel Martinez',
                        'student' => [
                            'id' => 7,
                            'student_id_number' => 'S11002',
                        ],
                        'performances' => [
                            [
                                'average_score' => 75
                            ]
                        ]
                    ],
                    [
                        'id' => 8,
                        'name' => 'Olivia Anderson',
                        'student' => [
                            'id' => 8,
                            'student_id_number' => 'S11003',
                        ],
                        'performances' => [
                            [
                                'average_score' => 82
                            ]
                        ]
                    ]
                ],
                'subjects' => [
                    [
                        'id' => 4,
                        'name' => 'Advanced Mathematics',
                        'code' => 'MATH11'
                    ],
                    [
                        'id' => 5,
                        'name' => 'Literature',
                        'code' => 'LIT11'
                    ],
                    [
                        'id' => 6,
                        'name' => 'Physics',
                        'code' => 'PHY11'
                    ]
                ]
            ]
        ];

        // Dummy Subjects
        $subjects = [
            [
                'id' => 1,
                'name' => 'Mathematics',
                'code' => 'MATH10',
                'description' => 'Basic algebra, geometry, and statistics for Grade 10',
                'classes' => [
                    [
                        'id' => 1,
                        'grade_level' => 10,
                        'section' => 'A'
                    ]
                ],
                'student_count' => 5
            ],
            [
                'id' => 2,
                'name' => 'English',
                'code' => 'ENG10',
                'description' => 'Grammar, composition, and literature for Grade 10',
                'classes' => [
                    [
                        'id' => 1,
                        'grade_level' => 10,
                        'section' => 'A'
                    ]
                ],
                'student_count' => 5
            ],
            [
                'id' => 3,
                'name' => 'Science',
                'code' => 'SCI10',
                'description' => 'General science covering biology, chemistry, and physics for Grade 10',
                'classes' => [
                    [
                        'id' => 1,
                        'grade_level' => 10,
                        'section' => 'A'
                    ]
                ],
                'student_count' => 5
            ],
            [
                'id' => 4,
                'name' => 'Advanced Mathematics',
                'code' => 'MATH11',
                'description' => 'Calculus and trigonometry for Grade 11',
                'classes' => [
                    [
                        'id' => 2,
                        'grade_level' => 11,
                        'section' => 'B'
                    ]
                ],
                'student_count' => 3
            ],
            [
                'id' => 5,
                'name' => 'Literature',
                'code' => 'LIT11',
                'description' => 'Advanced literature analysis for Grade 11',
                'classes' => [
                    [
                        'id' => 2,
                        'grade_level' => 11,
                        'section' => 'B'
                    ]
                ],
                'student_count' => 3
            ],
            [
                'id' => 6,
                'name' => 'Physics',
                'code' => 'PHY11',
                'description' => 'Mechanics, electricity, and magnetism for Grade 11',
                'classes' => [
                    [
                        'id' => 2,
                        'grade_level' => 11,
                        'section' => 'B'
                    ]
                ],
                'student_count' => 3
            ]
        ];

        // Dummy Assessments
        $assessments = [
            [
                'id' => 1,
                'title' => 'Algebra Mid-Term Exam',
                'description' => 'Covers chapters 1-5 of the textbook',
                'due_date' => now()->addDays(5),
                'class_id' => 1,
                'subject_id' => 1,
                'created_by' => 1,
                'class' => [
                    'id' => 1,
                    'name' => 'Grade 10-A'
                ],
                'subject' => [
                    'id' => 1,
                    'name' => 'Mathematics'
                ],
                'submissions_count' => 0,
                'graded_count' => 0
            ],
            [
                'id' => 2,
                'title' => 'Essay on Shakespeare',
                'description' => '1000-word essay analyzing a Shakespeare play',
                'due_date' => now()->addDays(2),
                'class_id' => 1,
                'subject_id' => 2,
                'created_by' => 1,
                'class' => [
                    'id' => 1,
                    'name' => 'Grade 10-A'
                ],
                'subject' => [
                    'id' => 2,
                    'name' => 'English'
                ],
                'submissions_count' => 3,
                'graded_count' => 0
            ],
            [
                'id' => 3,
                'title' => 'Science Lab Report',
                'description' => 'Report on the photosynthesis experiment',
                'due_date' => now()->subDays(1),
                'class_id' => 1,
                'subject_id' => 3,
                'created_by' => 1,
                'class' => [
                    'id' => 1,
                    'name' => 'Grade 10-A'
                ],
                'subject' => [
                    'id' => 3,
                    'name' => 'Science'
                ],
                'submissions_count' => 0,
                'graded_count' => 5
            ],
            [
                'id' => 4,
                'title' => 'Calculus Quiz',
                'description' => 'Short quiz on derivatives and integrals',
                'due_date' => now()->addHours(6),
                'class_id' => 2,
                'subject_id' => 4,
                'created_by' => 1,
                'class' => [
                    'id' => 2,
                    'name' => 'Grade 11-B'
                ],
                'subject' => [
                    'id' => 4,
                    'name' => 'Advanced Mathematics'
                ],
                'submissions_count' => 2,
                'graded_count' => 1
            ]
        ];

        // Dummy Announcements
        $announcements = [
            [
                'id' => 1,
                'title' => 'Parent-Teacher Conference',
                'content' => 'Parent-teacher conferences will be held next Friday from 2-5 PM. Please prepare student progress reports.',
                'created_at' => now()->subDays(1),
                'author_id' => 2,
                'target_type' => 'teachers',
                'priority' => 'high'
            ],
            [
                'id' => 2,
                'title' => 'Staff Meeting',
                'content' => 'Reminder: Staff meeting tomorrow at 8 AM in the conference room.',
                'created_at' => now()->subHours(5),
                'author_id' => 2,
                'target_type' => 'teachers',
                'priority' => 'medium'
            ],
            [
                'id' => 3,
                'title' => 'New Grading System',
                'content' => 'We are implementing a new grading system starting next month. Training sessions will be scheduled soon.',
                'created_at' => now()->subDays(3),
                'author_id' => 2,
                'target_type' => 'all',
                'priority' => 'medium'
            ],
            [
                'id' => 4,
                'title' => 'School Holiday',
                'content' => 'Reminder: School will be closed next Monday for the national holiday.',
                'created_at' => now()->subHours(12),
                'author_id' => 2,
                'target_type' => 'all',
                'priority' => 'low'
            ],
            [
                'id' => 5,
                'title' => 'Curriculum Update',
                'content' => 'Please review the updated curriculum guidelines shared via email yesterday.',
                'created_at' => now()->subMinutes(30),
                'author_id' => 2,
                'target_type' => 'teachers',
                'priority' => 'high'
            ]
        ];

        // Dummy Schedule
        $schedule = [
            [
                'id' => 1,
                'name' => 'Grade 10-A',
                'class' => [
                    'id' => 1,
                    'grade_level' => 10,
                    'section' => 'A'
                ],
                'todaySubjects' => [
                    [
                        'id' => 1,
                        'name' => 'Mathematics',
                        'pivot' => [
                            'schedule' => 'Monday 8:00 - 9:30'
                        ]
                    ],
                    [
                        'id' => 2,
                        'name' => 'English',
                        'pivot' => [
                            'schedule' => 'Monday 10:00 - 11:30'
                        ]
                    ],
                    [
                        'id' => 3,
                        'name' => 'Science',
                        'pivot' => [
                            'schedule' => 'Monday 13:00 - 14:30'
                        ]
                    ]
                ]
            ],
            [
                'id' => 2,
                'name' => 'Grade 11-B',
                'class' => [
                    'id' => 2,
                    'grade_level' => 11,
                    'section' => 'B'
                ],
                'todaySubjects' => [
                    [
                        'id' => 4,
                        'name' => 'Advanced Mathematics',
                        'pivot' => [
                            'schedule' => 'Monday 9:30 - 11:00'
                        ]
                    ],
                    [
                        'id' => 5,
                        'name' => 'Literature',
                        'pivot' => [
                            'schedule' => 'Monday 11:30 - 13:00'
                        ]
                    ],
                    [
                        'id' => 6,
                        'name' => 'Physics',
                        'pivot' => [
                            'schedule' => 'Monday 14:30 - 16:00'
                        ]
                    ]
                ]
            ]
        ];

        // Dummy Whiteboard Data
        $whiteboard = [
            [
                'id' => 1,
                'title' => 'Algebra Concepts',
                'subject_id' => 1,
                'class_id' => 1,
                'created_at' => now()->subDays(2),
                'content' => [
                    'type' => 'drawing',
                    'elements' => [
                        [
                            'type' => 'text',
                            'content' => 'Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a',
                            'position' => ['x' => 100, 'y' => 50]
                        ],
                        [
                            'type' => 'shape',
                            'shape' => 'rectangle',
                            'position' => ['x' => 200, 'y' => 100],
                            'dimensions' => ['width' => 300, 'height' => 200]
                        ],
                        [
                            'type' => 'line',
                            'points' => [
                                ['x' => 150, 'y' => 150],
                                ['x' => 350, 'y' => 250]
                            ]
                        ]
                    ]
                ],
                'thumbnail' => 'whiteboard_thumbnails/algebra_concepts.jpg'
            ],
            [
                'id' => 2,
                'title' => 'Literary Devices',
                'subject_id' => 2,
                'class_id' => 1,
                'created_at' => now()->subDays(1),
                'content' => [
                    'type' => 'drawing',
                    'elements' => [
                        [
                            'type' => 'text',
                            'content' => 'Types of Literary Devices:',
                            'position' => ['x' => 50, 'y' => 30]
                        ],
                        [
                            'type' => 'text',
                            'content' => '1. Metaphor\n2. Simile\n3. Personification\n4. Alliteration\n5. Hyperbole',
                            'position' => ['x' => 70, 'y' => 70]
                        ],
                        [
                            'type' => 'shape',
                            'shape' => 'circle',
                            'position' => ['x' => 300, 'y' => 200],
                            'dimensions' => ['radius' => 100]
                        ]
                    ]
                ],
                'thumbnail' => 'whiteboard_thumbnails/literary_devices.jpg'
            ],
            [
                'id' => 3,
                'title' => 'Cell Structure',
                'subject_id' => 3,
                'class_id' => 1,
                'created_at' => now()->subHours(5),
                'content' => [
                    'type' => 'drawing',
                    'elements' => [
                        [
                            'type' => 'image',
                            'src' => 'images/cell_diagram.png',
                            'position' => ['x' => 100, 'y' => 100],
                            'dimensions' => ['width' => 400, 'height' => 300]
                        ],
                        [
                            'type' => 'text',
                            'content' => 'Cell Membrane',
                            'position' => ['x' => 150, 'y' => 420]
                        ],
                        [
                            'type' => 'text',
                            'content' => 'Nucleus',
                            'position' => ['x' => 300, 'y' => 250]
                        ],
                        [
                            'type' => 'text',
                            'content' => 'Mitochondria',
                            'position' => ['x' => 400, 'y' => 150]
                        ]
                    ]
                ],
                'thumbnail' => 'whiteboard_thumbnails/cell_structure.jpg'
            ]
        ];

        // Dummy Lessons
        $lessons = [
            [
                'id' => 1,
                'title' => 'Introduction to Quadratic Equations',
                'subject_id' => 1,
                'class_id' => 1,
                'created_at' => now()->subDays(5),
                'scheduled_date' => now()->addDays(1),
                'status' => 'scheduled',
                'description' => 'This lesson covers the basics of quadratic equations, including the standard form, factoring, and the quadratic formula.',
                'objectives' => [
                    'Understand the standard form of a quadratic equation',
                    'Learn how to factor quadratic expressions',
                    'Apply the quadratic formula to solve equations',
                    'Graph quadratic functions'
                ],
                'materials' => [
                    [
                        'id' => 1,
                        'title' => 'Quadratic Equations Slides',
                        'type' => 'presentation',
                        'file_path' => 'materials/quadratic_equations_slides.pptx'
                    ],
                    [
                        'id' => 2,
                        'title' => 'Practice Problems',
                        'type' => 'document',
                        'file_path' => 'materials/quadratic_practice_problems.pdf'
                    ]
                ]
            ],
            [
                'id' => 2,
                'title' => 'Shakespeare\'s Romeo and Juliet',
                'subject_id' => 2,
                'class_id' => 1,
                'created_at' => now()->subDays(3),
                'scheduled_date' => now()->addDays(3),
                'status' => 'scheduled',
                'description' => 'An introduction to Shakespeare\'s famous tragedy, focusing on themes, characters, and literary devices.',
                'objectives' => [
                    'Understand the historical context of the play',
                    'Analyze the main characters and their motivations',
                    'Identify key themes and motifs',
                    'Recognize Shakespeare\'s use of language and literary devices'
                ],
                'materials' => [
                    [
                        'id' => 3,
                        'title' => 'Romeo and Juliet Text',
                        'type' => 'document',
                        'file_path' => 'materials/romeo_and_juliet.pdf'
                    ],
                    [
                        'id' => 4,
                        'title' => 'Character Analysis Worksheet',
                        'type' => 'document',
                        'file_path' => 'materials/character_analysis.docx'
                    ]
                ]
            ],
            [
                'id' => 3,
                'title' => 'Cell Biology and Organelles',
                'subject_id' => 3,
                'class_id' => 1,
                'created_at' => now()->subDays(2),
                'scheduled_date' => now()->addDays(2),
                'status' => 'scheduled',
                'description' => 'This lesson explores the structure and function of cells, focusing on the various organelles and their roles.',
                'objectives' => [
                    'Identify the main parts of a cell',
                    'Understand the function of each organelle',
                    'Compare and contrast plant and animal cells',
                    'Explain how cells work together in tissues and organs'
                ],
                'materials' => [
                    [
                        'id' => 5,
                        'title' => 'Cell Biology Presentation',
                        'type' => 'presentation',
                        'file_path' => 'materials/cell_biology.pptx'
                    ],
                    [
                        'id' => 6,
                        'title' => 'Cell Labeling Activity',
                        'type' => 'activity',
                        'file_path' => 'materials/cell_labeling.pdf'
                    ],
                    [
                        'id' => 7,
                        'title' => 'Cell Video',
                        'type' => 'video',
                        'file_path' => 'materials/cell_video.mp4'
                    ]
                ]
            ]
        ];

        // Dummy Quizzes
        $quizzes = [
            [
                'id' => 1,
                'title' => 'Algebra Quiz 1',
                'subject_id' => 1,
                'class_id' => 1,
                'created_at' => now()->subDays(7),
                'due_date' => now()->addDays(2),
                'status' => 'published',
                'time_limit' => 30, // minutes
                'total_points' => 20,
                'questions' => [
                    [
                        'id' => 1,
                        'type' => 'multiple_choice',
                        'question' => 'What is the solution to x² + 5x + 6 = 0?',
                        'options' => [
                            'x = -2, -3',
                            'x = 2, 3',
                            'x = -1, -6',
                            'x = 1, 6'
                        ],
                        'correct_answer' => 'x = -2, -3',
                        'points' => 2
                    ],
                    [
                        'id' => 2,
                        'type' => 'short_answer',
                        'question' => 'Factor the expression: x² - 9',
                        'correct_answer' => '(x+3)(x-3)',
                        'points' => 3
                    ],
                    [
                        'id' => 3,
                        'type' => 'multiple_choice',
                        'question' => 'Which of the following is the quadratic formula?',
                        'options' => [
                            'x = -b ± √(b² - 4ac) / 2a',
                            'x = -b / 2a',
                            'x = -c / b',
                            'x = a / b'
                        ],
                        'correct_answer' => 'x = -b ± √(b² - 4ac) / 2a',
                        'points' => 2
                    ]
                ],
                'submissions' => 12,
                'average_score' => 16.5
            ],
            [
                'id' => 2,
                'title' => 'Literary Terms Quiz',
                'subject_id' => 2,
                'class_id' => 1,
                'created_at' => now()->subDays(5),
                'due_date' => now()->addDays(4),
                'status' => 'published',
                'time_limit' => 25, // minutes
                'total_points' => 15,
                'questions' => [
                    [
                        'id' => 4,
                        'type' => 'matching',
                        'question' => 'Match the literary term with its definition',
                        'items' => [
                            ['term' => 'Metaphor', 'definition' => 'A comparison between two unlike things without using like or as'],
                            ['term' => 'Simile', 'definition' => 'A comparison between two unlike things using like or as'],
                            ['term' => 'Personification', 'definition' => 'Giving human characteristics to non-human things'],
                            ['term' => 'Alliteration', 'definition' => 'Repetition of the same sound at the beginning of nearby words']
                        ],
                        'points' => 4
                    ],
                    [
                        'id' => 5,
                        'type' => 'multiple_choice',
                        'question' => 'Which of the following is an example of a simile?',
                        'options' => [
                            'The stars are diamonds in the sky',
                            'She is as brave as a lion',
                            'The wind whispered through the trees',
                            'Time is money'
                        ],
                        'correct_answer' => 'She is as brave as a lion',
                        'points' => 2
                    ]
                ],
                'submissions' => 8,
                'average_score' => 12.3
            ]
        ];

        // Dummy Attendance Records
        $attendance = [
            [
                'id' => 1,
                'class_id' => 1,
                'date' => now()->subDays(1)->format('Y-m-d'),
                'records' => [
                    [
                        'student_id' => 1,
                        'status' => 'present',
                        'notes' => ''
                    ],
                    [
                        'student_id' => 2,
                        'status' => 'present',
                        'notes' => ''
                    ],
                    [
                        'student_id' => 3,
                        'status' => 'absent',
                        'notes' => 'Doctor\'s appointment'
                    ],
                    [
                        'student_id' => 4,
                        'status' => 'present',
                        'notes' => ''
                    ],
                    [
                        'student_id' => 5,
                        'status' => 'late',
                        'notes' => 'Arrived 15 minutes late'
                    ]
                ],
                'summary' => [
                    'total' => 5,
                    'present' => 3,
                    'absent' => 1,
                    'late' => 1
                ]
            ],
            [
                'id' => 2,
                'class_id' => 2,
                'date' => now()->subDays(1)->format('Y-m-d'),
                'records' => [
                    [
                        'student_id' => 6,
                        'status' => 'present',
                        'notes' => ''
                    ],
                    [
                        'student_id' => 7,
                        'status' => 'present',
                        'notes' => ''
                    ],
                    [
                        'student_id' => 8,
                        'status' => 'present',
                        'notes' => ''
                    ]
                ],
                'summary' => [
                    'total' => 3,
                    'present' => 3,
                    'absent' => 0,
                    'late' => 0
                ]
            ]
        ];

        return [
            'classes' => $classes,
            'subjects' => $subjects,
            'assessments' => $assessments,
            'announcements' => $announcements,
            'schedule' => $schedule,
            'whiteboard' => $whiteboard,
            'lessons' => $lessons,
            'quizzes' => $quizzes,
            'attendance' => $attendance
        ];
    }

    /**
     * Display student details.
     *
     * @param int $studentId
     * @return \Inertia\Response
     */
    public function studentDetails($studentId)
    {
        // In a real application, we would fetch the student from the database
        // For now, we'll use our dummy data
        $dummyData = $this->getDummyData();
        
        // Find the student in our dummy data
        $student = null;
        foreach ($dummyData['classes'] as $class) {
            foreach ($class['students'] as $classStudent) {
                if ($classStudent['id'] == $studentId) {
                    $student = $classStudent;
                    $student['class'] = [
                        'id' => $class['id'],
                        'name' => $class['name'],
                        'grade_level' => $class['grade_level'],
                        'section' => $class['section']
                    ];
                    break 2;
                }
            }
        }
        
        if (!$student) {
            abort(404, 'Student not found');
        }
        
        return Inertia::render('Teacher/StudentDetails', [
            'student' => $student,
            'attendance' => $dummyData['attendance'],
            'assessments' => $dummyData['assessments']
        ]);
    }
    
    /**
     * Display subject details.
     *
     * @param int $subjectId
     * @return \Inertia\Response
     */
    public function subjectDetails($subjectId)
    {
        // In a real application, we would fetch the subject from the database
        // For now, we'll use our dummy data
        $dummyData = $this->getDummyData();
        
        // Find the subject in our dummy data
        $subject = null;
        foreach ($dummyData['subjects'] as $dummySubject) {
            if ($dummySubject['id'] == $subjectId) {
                $subject = $dummySubject;
                break;
            }
        }
        
        if (!$subject) {
            abort(404, 'Subject not found');
        }
        
        // Get related data
        $relatedLessons = array_filter($dummyData['lessons'], function($lesson) use ($subjectId) {
            return $lesson['subject_id'] == $subjectId;
        });
        
        $relatedQuizzes = array_filter($dummyData['quizzes'], function($quiz) use ($subjectId) {
            return $quiz['subject_id'] == $subjectId;
        });
        
        return Inertia::render('Teacher/SubjectDetails', [
            'subject' => $subject,
            'lessons' => array_values($relatedLessons),
            'quizzes' => array_values($relatedQuizzes)
        ]);
    }
    
    /**
     * Display teacher calendar.
     *
     * @return \Inertia\Response
     */
    public function calendar()
    {
        $dummyData = $this->getDummyData();
        
        // Prepare calendar events from schedule, lessons, and assessments
        $events = [];
        
        // Add schedule events
        foreach ($dummyData['schedule'] as $scheduleItem) {
            foreach ($scheduleItem['todaySubjects'] as $subject) {
                // Parse schedule to get time
                $scheduleInfo = $subject['pivot']['schedule'] ?? '';
                preg_match('/(\w+)\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/', $scheduleInfo, $matches);
                
                if (count($matches) >= 4) {
                    $day = $matches[1];
                    $startTime = $matches[2];
                    $endTime = $matches[3];
                    
                    $events[] = [
                        'id' => 'schedule_' . $scheduleItem['id'] . '_' . $subject['id'],
                        'title' => $subject['name'] . ' - ' . $scheduleItem['name'],
                        'start' => $this->getNextDayTime($day, $startTime),
                        'end' => $this->getNextDayTime($day, $endTime),
                        'type' => 'class',
                        'color' => '#1e5091'
                    ];
                }
            }
        }
        
        // Add assessment events
        foreach ($dummyData['assessments'] as $assessment) {
            $events[] = [
                'id' => 'assessment_' . $assessment['id'],
                'title' => $assessment['title'],
                'start' => $assessment['due_date'],
                'allDay' => true,
                'type' => 'assessment',
                'color' => '#ffb81c'
            ];
        }
        
        // Add lesson events
        foreach ($dummyData['lessons'] as $lesson) {
            $events[] = [
                'id' => 'lesson_' . $lesson['id'],
                'title' => $lesson['title'],
                'start' => $lesson['scheduled_date'],
                'allDay' => true,
                'type' => 'lesson',
                'color' => '#4CAF50'
            ];
        }
        
        return Inertia::render('Teacher/Calendar', [
            'events' => $events
        ]);
    }
    
    /**
     * Display notifications.
     *
     * @return \Inertia\Response
     */
    public function notifications()
    {
        // In a real application, we would fetch notifications from the database
        // For now, we'll use dummy data
        $notifications = [
            [
                'id' => 1,
                'title' => 'New Assessment Added',
                'content' => 'A new assessment "Mid-Term Exam" has been added to Grade 10-A Mathematics.',
                'type' => 'assessment',
                'read' => false,
                'created_at' => now()->subHours(2),
                'actions' => [
                    [
                        'label' => 'View Assessment',
                        'url' => route('teacher.dashboard')
                    ]
                ]
            ],
            [
                'id' => 2,
                'title' => 'Student Joined Class',
                'content' => 'John Smith has joined Grade 10-A Mathematics.',
                'type' => 'class',
                'read' => false,
                'created_at' => now()->subHours(5),
                'actions' => [
                    [
                        'label' => 'View Student',
                        'url' => route('teacher.studentDetails', 1)
                    ]
                ]
            ],
            [
                'id' => 3,
                'title' => 'School Announcement',
                'content' => 'Parent-teacher meeting scheduled for next Friday at 3:00 PM.',
                'type' => 'announcement',
                'read' => true,
                'created_at' => now()->subDays(1),
                'actions' => [
                    [
                        'label' => 'Add to Calendar',
                        'url' => route('teacher.calendar')
                    ]
                ]
            ],
            [
                'id' => 4,
                'title' => 'Lesson Plan Approved',
                'content' => 'Your lesson plan for "Algebraic Expressions" has been approved by the head of department.',
                'type' => 'approval',
                'read' => true,
                'created_at' => now()->subDays(2),
                'actions' => null
            ],
            [
                'id' => 5,
                'title' => 'Assignment Due Soon',
                'content' => 'The assignment "Geometry Basics" for Grade 10-A is due in 2 days.',
                'type' => 'assessment',
                'read' => false,
                'created_at' => now()->subHours(12),
                'actions' => [
                    [
                        'label' => 'View Assignment',
                        'url' => route('teacher.dashboard')
                    ]
                ]
            ]
        ];

        return Inertia::render('Teacher/Notifications', [
            'notifications' => $notifications
        ]);
    }

    /**
     * Display the join class page.
     *
     * @return \Inertia\Response
     */
    public function joinClass()
    {
        return Inertia::render('Teacher/JoinClass');
    }
    
    /**
     * Helper function to get the next occurrence of a day with a specific time.
     *
     * @param string $day
     * @param string $time
     * @return string
     */
    private function getNextDayTime($day, $time)
    {
        $days = [
            'Monday' => 1,
            'Tuesday' => 2,
            'Wednesday' => 3,
            'Thursday' => 4,
            'Friday' => 5,
            'Saturday' => 6,
            'Sunday' => 0
        ];
        
        $dayNumber = $days[$day] ?? 1; // Default to Monday if day not found
        
        $date = new \DateTime();
        $currentDayNumber = (int)$date->format('w');
        
        // Calculate days to add to get to the next occurrence of the specified day
        $daysToAdd = ($dayNumber - $currentDayNumber + 7) % 7;
        
        // If today is the specified day, don't add days
        if ($daysToAdd === 0) {
            $daysToAdd = 7; // Go to next week
        }
        
        $date->add(new \DateInterval("P{$daysToAdd}D"));
        $date->setTime(
            (int)substr($time, 0, strpos($time, ':')),
            (int)substr($time, strpos($time, ':') + 1)
        );
        
        return $date->format('Y-m-d\TH:i:s');
    }
}
