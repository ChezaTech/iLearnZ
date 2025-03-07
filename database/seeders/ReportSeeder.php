<?php

namespace Database\Seeders;

use App\Models\Report;
use Illuminate\Database\Seeder;

class ReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reports = [
            // Reports for Tendai Mutasa
            [
                'student_id' => 6, // Tendai Mutasa
                'class_id' => 1, // Form 1A
                'term' => 'first',
                'academic_year' => '2025',
                'overall_average' => 80.25,
                'class_rank' => 2,
                'teacher_comments' => 'Tendai is a hardworking student who consistently completes assignments on time. He participates actively in class discussions and shows a good understanding of concepts across subjects.',
                'principal_comments' => 'Keep up the good work, Tendai. Your dedication to your studies is commendable.',
                'subject_scores' => json_encode([
                    ['subject' => 'Mathematics', 'score' => 82.5, 'grade' => 'B'],
                    ['subject' => 'English Language', 'score' => 78.0, 'grade' => 'C'],
                    ['subject' => 'Science', 'score' => 81.0, 'grade' => 'B'],
                    ['subject' => 'History', 'score' => 79.5, 'grade' => 'C'],
                ]),
                'is_published' => true,
                'generated_by' => 4, // Mary Johnson
            ],
            
            // Reports for Chipo Dziva
            [
                'student_id' => 7, // Chipo Dziva
                'class_id' => 2, // Form 2B
                'term' => 'first',
                'academic_year' => '2025',
                'overall_average' => 88.25,
                'class_rank' => 1,
                'teacher_comments' => 'Chipo is an exceptional student who excels in all subjects, particularly in mathematics and sciences. She demonstrates analytical thinking and problem-solving skills beyond her grade level.',
                'principal_comments' => 'Excellent performance, Chipo. Your academic achievements are outstanding.',
                'subject_scores' => json_encode([
                    ['subject' => 'Mathematics', 'score' => 91.0, 'grade' => 'A'],
                    ['subject' => 'English Language', 'score' => 84.0, 'grade' => 'B'],
                    ['subject' => 'Biology', 'score' => 85.5, 'grade' => 'B'],
                    ['subject' => 'Chemistry', 'score' => 92.5, 'grade' => 'A'],
                ]),
                'is_published' => true,
                'generated_by' => 3, // John Smith
            ],
            
            // Reports for Tafara Ncube
            [
                'student_id' => 8, // Tafara Ncube
                'class_id' => 3, // Grade 5 Eagles
                'term' => 'first',
                'academic_year' => '2025',
                'overall_average' => 83.75,
                'class_rank' => 2,
                'teacher_comments' => 'Tafara is a diligent student who shows particular strength in English and Social Studies. He needs to focus more on his mathematics and science work to improve in these areas.',
                'principal_comments' => 'Good work this term, Tafara. Continue to build on your strengths while working on areas that need improvement.',
                'subject_scores' => json_encode([
                    ['subject' => 'Mathematics', 'score' => 76.5, 'grade' => 'C'],
                    ['subject' => 'English Language', 'score' => 88.0, 'grade' => 'B'],
                    ['subject' => 'Science', 'score' => 79.5, 'grade' => 'C'],
                    ['subject' => 'Social Studies', 'score' => 91.0, 'grade' => 'A'],
                ]),
                'is_published' => true,
                'generated_by' => 5, // David Moyo
            ],
            
            // Reports for Rudo Sibanda
            [
                'student_id' => 9, // Rudo Sibanda
                'class_id' => 4, // Grade 6 Lions
                'term' => 'first',
                'academic_year' => '2025',
                'overall_average' => 90.25,
                'class_rank' => 1,
                'teacher_comments' => 'Rudo is an outstanding student who consistently produces high-quality work across all subjects. She is particularly strong in mathematics and shows excellent critical thinking skills.',
                'principal_comments' => 'Congratulations on your excellent performance, Rudo. Your academic achievements set a high standard for your peers.',
                'subject_scores' => json_encode([
                    ['subject' => 'Mathematics', 'score' => 94.0, 'grade' => 'A'],
                    ['subject' => 'English Language', 'score' => 89.5, 'grade' => 'B'],
                    ['subject' => 'Science', 'score' => 91.0, 'grade' => 'A'],
                    ['subject' => 'Geography', 'score' => 86.5, 'grade' => 'B'],
                ]),
                'is_published' => true,
                'generated_by' => 5, // David Moyo
            ],
        ];

        foreach ($reports as $report) {
            Report::create($report);
        }
    }
}
