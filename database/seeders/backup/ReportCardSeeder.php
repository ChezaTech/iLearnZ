<?php

namespace Database\Seeders;

use App\Models\ReportCard;
use Illuminate\Database\Seeder;

class ReportCardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reportCards = [
            // Report cards for Tendai Mutasa (student_id: 7) at Harare High School
            [
                'student_id' => 7,
                'class_id' => 1,
                'school_id' => 1,
                'term' => 'First Term',
                'academic_year' => '2025',
                'issue_date' => '2025-04-03',
                'subject_grades' => json_encode([
                    'Mathematics' => ['score' => 85, 'grade' => 'A', 'comments' => 'Excellent work in algebra'],
                    'English' => ['score' => 78, 'grade' => 'B', 'comments' => 'Good comprehension skills'],
                    'Science' => ['score' => 92, 'grade' => 'A+', 'comments' => 'Outstanding performance in physics'],
                    'History' => ['score' => 75, 'grade' => 'B', 'comments' => 'Needs to improve essay writing'],
                ]),
                'average_grade' => 82.5,
                'rank_in_class' => 3,
                'teacher_comments' => 'Tendai is a diligent student who consistently puts forth good effort in class.',
                'principal_comments' => 'Keep up the good work, Tendai!',
                'status' => 'published',
                'created_by' => 1,
                'parent_acknowledged' => false,
            ],
            
            // Report cards for Chipo Dziva (student_id: 8) at Harare High School
            [
                'student_id' => 8,
                'class_id' => 2,
                'school_id' => 1,
                'term' => 'First Term',
                'academic_year' => '2025',
                'issue_date' => '2025-04-03',
                'subject_grades' => json_encode([
                    'Mathematics' => ['score' => 90, 'grade' => 'A', 'comments' => 'Exceptional problem-solving skills'],
                    'English' => ['score' => 88, 'grade' => 'A', 'comments' => 'Excellent writing and comprehension'],
                    'Science' => ['score' => 85, 'grade' => 'A', 'comments' => 'Strong understanding of concepts'],
                    'Geography' => ['score' => 92, 'grade' => 'A+', 'comments' => 'Outstanding map work and projects'],
                ]),
                'average_grade' => 88.75,
                'rank_in_class' => 1,
                'teacher_comments' => 'Chipo is an exceptional student who consistently demonstrates leadership in class.',
                'principal_comments' => 'Excellent work this term, Chipo!',
                'status' => 'published',
                'created_by' => 1,
                'parent_acknowledged' => false,
            ],
            
            // Report cards for Tafara Ncube (student_id: 9) at Bulawayo Primary School
            [
                'student_id' => 9,
                'class_id' => 3,
                'school_id' => 2,
                'term' => 'Second Term',
                'academic_year' => '2025',
                'issue_date' => '2025-04-03',
                'subject_grades' => json_encode([
                    'Mathematics' => ['score' => 72, 'grade' => 'B', 'comments' => 'Good progress in arithmetic'],
                    'English' => ['score' => 68, 'grade' => 'C+', 'comments' => 'Improving in reading comprehension'],
                    'Science' => ['score' => 75, 'grade' => 'B', 'comments' => 'Good understanding of basic concepts'],
                    'Art' => ['score' => 90, 'grade' => 'A', 'comments' => 'Exceptional creativity and talent'],
                ]),
                'average_grade' => 76.25,
                'rank_in_class' => 8,
                'teacher_comments' => 'Tafara has shown improvement this term, particularly in mathematics and art.',
                'principal_comments' => 'Good progress, Tafara. Keep working hard!',
                'status' => 'published',
                'created_by' => 1,
                'parent_acknowledged' => false,
            ],
            
            // Report cards for Rudo Sibanda (student_id: 10) at Bulawayo Primary School
            [
                'student_id' => 10,
                'class_id' => 4,
                'school_id' => 2,
                'term' => 'Second Term',
                'academic_year' => '2025',
                'issue_date' => '2025-04-03',
                'subject_grades' => json_encode([
                    'Mathematics' => ['score' => 80, 'grade' => 'B+', 'comments' => 'Strong performance in geometry'],
                    'English' => ['score' => 85, 'grade' => 'A', 'comments' => 'Excellent reading and writing skills'],
                    'Science' => ['score' => 78, 'grade' => 'B+', 'comments' => 'Good understanding of concepts'],
                    'Music' => ['score' => 95, 'grade' => 'A+', 'comments' => 'Outstanding musical talent'],
                ]),
                'average_grade' => 84.5,
                'rank_in_class' => 2,
                'teacher_comments' => 'Rudo is a well-rounded student who excels particularly in English and music.',
                'principal_comments' => 'Excellent work, Rudo. Your dedication is commendable!',
                'status' => 'published',
                'created_by' => 1,
                'parent_acknowledged' => false,
            ],
        ];

        foreach ($reportCards as $reportCard) {
            // Check if the report card already exists for this student, term, and academic year
            $exists = ReportCard::where([
                ['student_id', '=', $reportCard['student_id']],
                ['term', '=', $reportCard['term']],
                ['academic_year', '=', $reportCard['academic_year']],
                ['class_id', '=', $reportCard['class_id']],
            ])->exists();
            
            if (!$exists) {
                ReportCard::create($reportCard);
            }
        }
    }
}
