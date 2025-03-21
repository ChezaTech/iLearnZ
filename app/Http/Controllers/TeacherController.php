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

    // ... rest of the code remains the same ...
}
