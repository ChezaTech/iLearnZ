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
                'academic_term_id' => 1,
                'school_id' => 1,
                'issue_date' => '2025-04-03',
                'grades' => json_encode([
                    'Mathematics' => ['score' => 85, 'grade' => 'A', 'comments' => 'Excellent work in algebra'],
                    'English' => ['score' => 78, 'grade' => 'B', 'comments' => 'Good comprehension skills'],
                    'Science' => ['score' => 92, 'grade' => 'A+', 'comments' => 'Outstanding performance in physics'],
                    'History' => ['score' => 75, 'grade' => 'B', 'comments' => 'Needs to improve essay writing'],
                ]),
                'attendance' => json_encode([
                    'present_days' => 58,
                    'absent_days' => 2,
                    'late_days' => 3,
                ]),
                'teacher_comments' => 'Tendai is a diligent student who consistently puts forth good effort in class.',
                'principal_comments' => 'Keep up the good work, Tendai!',
                'overall_grade' => 'A-',
                'overall_percentage' => 82.5,
                'class_rank' => 3,
                'behavior_rating' => 'Excellent',
                'next_term_recommendations' => 'Continue to focus on essay writing skills.',
                'parent_signature_required' => true,
                'parent_signed' => false,
            ],
            
            // Report cards for Chipo Dziva (student_id: 8) at Harare High School
            [
                'student_id' => 8,
                'class_id' => 2,
                'academic_term_id' => 1,
                'school_id' => 1,
                'issue_date' => '2025-04-03',
                'grades' => json_encode([
                    'Mathematics' => ['score' => 90, 'grade' => 'A', 'comments' => 'Exceptional problem-solving skills'],
                    'English' => ['score' => 88, 'grade' => 'A', 'comments' => 'Excellent writing and comprehension'],
                    'Science' => ['score' => 85, 'grade' => 'A', 'comments' => 'Strong understanding of concepts'],
                    'Geography' => ['score' => 92, 'grade' => 'A+', 'comments' => 'Outstanding map work and projects'],
                ]),
                'attendance' => json_encode([
                    'present_days' => 60,
                    'absent_days' => 0,
                    'late_days' => 1,
                ]),
                'teacher_comments' => 'Chipo is an exceptional student who consistently demonstrates leadership in class.',
                'principal_comments' => 'Excellent work this term, Chipo!',
                'overall_grade' => 'A',
                'overall_percentage' => 88.75,
                'class_rank' => 1,
                'behavior_rating' => 'Excellent',
                'next_term_recommendations' => 'Consider taking advanced courses next year.',
                'parent_signature_required' => true,
                'parent_signed' => false,
            ],
            
            // Report cards for Tafara Ncube (student_id: 9) at Bulawayo Primary School
            [
                'student_id' => 9,
                'class_id' => 3,
                'academic_term_id' => 4,
                'school_id' => 2,
                'issue_date' => '2025-04-03',
                'grades' => json_encode([
                    'Mathematics' => ['score' => 72, 'grade' => 'B', 'comments' => 'Good progress in arithmetic'],
                    'English' => ['score' => 68, 'grade' => 'C+', 'comments' => 'Improving in reading comprehension'],
                    'Science' => ['score' => 75, 'grade' => 'B', 'comments' => 'Good understanding of basic concepts'],
                    'Art' => ['score' => 90, 'grade' => 'A', 'comments' => 'Exceptional creativity and talent'],
                ]),
                'attendance' => json_encode([
                    'present_days' => 55,
                    'absent_days' => 5,
                    'late_days' => 2,
                ]),
                'teacher_comments' => 'Tafara has shown improvement this term, particularly in mathematics and art.',
                'principal_comments' => 'Good progress, Tafara. Keep working hard!',
                'overall_grade' => 'B',
                'overall_percentage' => 76.25,
                'class_rank' => 8,
                'behavior_rating' => 'Good',
                'next_term_recommendations' => 'Focus on improving English language skills.',
                'parent_signature_required' => true,
                'parent_signed' => false,
            ],
            
            // Report cards for Rudo Sibanda (student_id: 10) at Bulawayo Primary School
            [
                'student_id' => 10,
                'class_id' => 4,
                'academic_term_id' => 4,
                'school_id' => 2,
                'issue_date' => '2025-04-03',
                'grades' => json_encode([
                    'Mathematics' => ['score' => 80, 'grade' => 'B+', 'comments' => 'Strong performance in geometry'],
                    'English' => ['score' => 85, 'grade' => 'A', 'comments' => 'Excellent reading and writing skills'],
                    'Science' => ['score' => 78, 'grade' => 'B+', 'comments' => 'Good understanding of concepts'],
                    'Music' => ['score' => 95, 'grade' => 'A+', 'comments' => 'Outstanding musical talent'],
                ]),
                'attendance' => json_encode([
                    'present_days' => 59,
                    'absent_days' => 1,
                    'late_days' => 0,
                ]),
                'teacher_comments' => 'Rudo is a well-rounded student who excels particularly in English and music.',
                'principal_comments' => 'Excellent work, Rudo. Your dedication is commendable!',
                'overall_grade' => 'A-',
                'overall_percentage' => 84.5,
                'class_rank' => 2,
                'behavior_rating' => 'Excellent',
                'next_term_recommendations' => 'Consider joining the school choir or music program.',
                'parent_signature_required' => true,
                'parent_signed' => false,
            ],
        ];

        foreach ($reportCards as $reportCard) {
            ReportCard::create($reportCard);
        }
    }
}
