<?php

namespace Database\Seeders;

use App\Models\Grade;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grades = [
            // Grades for Tendai Mutasa
            [
                'student_id' => 6, // Tendai Mutasa
                'subject_id' => 1, // Mathematics
                'class_id' => 1, // Form 1A
                'score' => 82.5,
                'letter_grade' => 'B',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Tendai shows good understanding of mathematical concepts but needs to improve on problem-solving skills.',
                'recorded_by' => 4, // Mary Johnson
            ],
            [
                'student_id' => 6, // Tendai Mutasa
                'subject_id' => 2, // English Language
                'class_id' => 1, // Form 1A
                'score' => 78.0,
                'letter_grade' => 'C',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Good grammar and vocabulary. Needs to work on essay structure and critical analysis.',
                'recorded_by' => 4, // Mary Johnson
            ],
            
            // Grades for Chipo Dziva
            [
                'student_id' => 7, // Chipo Dziva
                'subject_id' => 1, // Mathematics
                'class_id' => 2, // Form 2B
                'score' => 91.0,
                'letter_grade' => 'A',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Excellent performance in all areas of mathematics. Particularly strong in algebra and geometry.',
                'recorded_by' => 3, // John Smith
            ],
            [
                'student_id' => 7, // Chipo Dziva
                'subject_id' => 4, // Biology
                'class_id' => 2, // Form 2B
                'score' => 85.5,
                'letter_grade' => 'B',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Good understanding of biological concepts. Lab work is excellent.',
                'recorded_by' => 3, // John Smith
            ],
            
            // Grades for Tafara Ncube
            [
                'student_id' => 8, // Tafara Ncube
                'subject_id' => 2, // English Language
                'class_id' => 3, // Grade 5 Eagles
                'score' => 88.0,
                'letter_grade' => 'B',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Strong reading and comprehension skills. Writing is improving steadily.',
                'recorded_by' => 5, // David Moyo
            ],
            [
                'student_id' => 8, // Tafara Ncube
                'subject_id' => 3, // Science
                'class_id' => 3, // Grade 5 Eagles
                'score' => 79.5,
                'letter_grade' => 'C',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Shows interest in scientific concepts. Needs to improve on experimental work.',
                'recorded_by' => 5, // David Moyo
            ],
            
            // Grades for Rudo Sibanda
            [
                'student_id' => 9, // Rudo Sibanda
                'subject_id' => 1, // Mathematics
                'class_id' => 4, // Grade 6 Lions
                'score' => 94.0,
                'letter_grade' => 'A',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Outstanding performance in mathematics. Demonstrates advanced problem-solving skills.',
                'recorded_by' => 5, // David Moyo
            ],
            [
                'student_id' => 9, // Rudo Sibanda
                'subject_id' => 8, // Geography
                'class_id' => 4, // Grade 6 Lions
                'score' => 86.5,
                'letter_grade' => 'B',
                'term' => 'first',
                'academic_year' => '2025',
                'comments' => 'Good understanding of geographical concepts. Map work is excellent.',
                'recorded_by' => 5, // David Moyo
            ],
        ];

        foreach ($grades as $grade) {
            Grade::create($grade);
        }
    }
}
