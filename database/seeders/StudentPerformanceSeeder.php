<?php

namespace Database\Seeders;

use App\Models\StudentPerformance;
use Illuminate\Database\Seeder;

class StudentPerformanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $performances = [
            // Tendai Mutasa (student_id: 7) performance records
            [
                'student_id' => 7,
                'class_id' => 1,
                'subject_id' => 1, // Mathematics
                'academic_term_id' => 1,
                'average_score' => 85.50,
                'rank_in_subject' => 3,
                'strengths' => 'Algebra, calculus, problem-solving',
                'areas_for_improvement' => 'Geometry, trigonometry',
                'teacher_comments' => 'Tendai shows strong analytical skills but needs to work on spatial reasoning.',
                'parent_viewed' => false,
            ],
            [
                'student_id' => 7,
                'class_id' => 1,
                'subject_id' => 2, // English
                'academic_term_id' => 1,
                'average_score' => 78.25,
                'rank_in_subject' => 5,
                'strengths' => 'Reading comprehension, vocabulary',
                'areas_for_improvement' => 'Essay writing, grammar',
                'teacher_comments' => 'Tendai has good understanding of texts but needs to improve writing structure.',
                'parent_viewed' => false,
            ],
            
            // Chipo Dziva (student_id: 8) performance records
            [
                'student_id' => 8,
                'class_id' => 2,
                'subject_id' => 1, // Mathematics
                'academic_term_id' => 1,
                'average_score' => 90.75,
                'rank_in_subject' => 1,
                'strengths' => 'All areas of mathematics, particularly advanced topics',
                'areas_for_improvement' => 'Can be challenged with more complex problems',
                'teacher_comments' => 'Chipo demonstrates exceptional mathematical ability and should be encouraged to participate in competitions.',
                'parent_viewed' => false,
            ],
            [
                'student_id' => 8,
                'class_id' => 2,
                'subject_id' => 3, // Science
                'academic_term_id' => 1,
                'average_score' => 85.25,
                'rank_in_subject' => 2,
                'strengths' => 'Scientific method, laboratory work, biology',
                'areas_for_improvement' => 'Physics concepts',
                'teacher_comments' => 'Chipo shows strong scientific curiosity and performs well in experiments.',
                'parent_viewed' => false,
            ],
            
            // Tafara Ncube (student_id: 9) performance records
            [
                'student_id' => 9,
                'class_id' => 3,
                'subject_id' => 2, // English
                'academic_term_id' => 4,
                'average_score' => 68.50,
                'rank_in_subject' => 12,
                'strengths' => 'Speaking, storytelling',
                'areas_for_improvement' => 'Reading comprehension, writing',
                'teacher_comments' => 'Tafara is improving but needs more practice with reading and writing exercises.',
                'parent_viewed' => false,
            ],
            [
                'student_id' => 9,
                'class_id' => 3,
                'subject_id' => 4, // Art
                'academic_term_id' => 4,
                'average_score' => 90.00,
                'rank_in_subject' => 1,
                'strengths' => 'Drawing, painting, creativity',
                'areas_for_improvement' => 'Art history knowledge',
                'teacher_comments' => 'Tafara shows exceptional artistic talent and should be encouraged to develop this skill further.',
                'parent_viewed' => false,
            ],
            
            // Rudo Sibanda (student_id: 10) performance records
            [
                'student_id' => 10,
                'class_id' => 4,
                'subject_id' => 2, // English
                'academic_term_id' => 4,
                'average_score' => 85.25,
                'rank_in_subject' => 2,
                'strengths' => 'Reading, writing, vocabulary',
                'areas_for_improvement' => 'Public speaking',
                'teacher_comments' => 'Rudo has excellent language skills and produces well-structured written work.',
                'parent_viewed' => false,
            ],
            [
                'student_id' => 10,
                'class_id' => 4,
                'subject_id' => 5, // Music
                'academic_term_id' => 4,
                'average_score' => 95.50,
                'rank_in_subject' => 1,
                'strengths' => 'Vocal performance, music theory, piano',
                'areas_for_improvement' => 'Music composition',
                'teacher_comments' => 'Rudo has exceptional musical talent and should be encouraged to pursue music further.',
                'parent_viewed' => false,
            ],
        ];

        foreach ($performances as $performance) {
            StudentPerformance::create($performance);
        }
    }
}
