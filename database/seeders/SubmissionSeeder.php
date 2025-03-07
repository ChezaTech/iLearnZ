<?php

namespace Database\Seeders;

use App\Models\Submission;
use Illuminate\Database\Seeder;

class SubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $submissions = [
            // Submissions for Tendai Mutasa
            [
                'assignment_id' => 1, // Algebra Practice Problems
                'student_id' => 6, // Tendai Mutasa
                'content' => 'I have completed all the algebra problems as requested.',
                'file_path' => 'submissions/tendai_algebra_practice.pdf',
                'submission_date' => '2025-03-18 15:30:00',
                'is_late' => false,
                'grade' => 85,
                'feedback' => 'Good work! You showed your steps clearly. Work on simplifying your final answers.',
                'graded_by' => 4, // Mary Johnson
                'graded_at' => '2025-03-19 10:15:00',
            ],
            [
                'assignment_id' => 2, // Essay on Environmental Conservation
                'student_id' => 6, // Tendai Mutasa
                'content' => 'My essay on environmental conservation focuses on water conservation.',
                'file_path' => 'submissions/tendai_environmental_essay.docx',
                'submission_date' => '2025-03-24 22:45:00',
                'is_late' => false,
                'grade' => 42,
                'feedback' => 'Well-structured essay with good points. Include more specific examples and improve your conclusion.',
                'graded_by' => 4, // Mary Johnson
                'graded_at' => '2025-03-26 14:20:00',
            ],
            
            // Submissions for Chipo Dziva
            [
                'assignment_id' => 3, // Quadratic Equations Worksheet
                'student_id' => 7, // Chipo Dziva
                'content' => 'I have solved all the quadratic equations using the methods specified.',
                'file_path' => 'submissions/chipo_quadratic_worksheet.pdf',
                'submission_date' => '2025-03-22 18:10:00',
                'is_late' => false,
                'grade' => 48,
                'feedback' => 'Excellent work! All solutions are correct and your work is very well organized.',
                'graded_by' => 3, // John Smith
                'graded_at' => '2025-03-23 09:30:00',
            ],
            [
                'assignment_id' => 4, // Cell Structure Diagram
                'student_id' => 7, // Chipo Dziva
                'content' => 'I have created detailed diagrams of both plant and animal cells with all required labels.',
                'file_path' => 'submissions/chipo_cell_diagrams.jpg',
                'submission_date' => '2025-03-27 20:05:00',
                'is_late' => false,
                'grade' => null,
                'feedback' => null,
                'graded_by' => null,
                'graded_at' => null,
            ],
            
            // Submissions for Tafara Ncube
            [
                'assignment_id' => 5, // Parts of Speech Identification
                'student_id' => 8, // Tafara Ncube
                'content' => 'I have identified all parts of speech in the provided sentences.',
                'file_path' => 'submissions/tafara_parts_of_speech.pdf',
                'submission_date' => '2025-03-18 14:20:00',
                'is_late' => false,
                'grade' => 27,
                'feedback' => 'Good job identifying most parts of speech. Review the difference between adverbs and adjectives.',
                'graded_by' => 5, // David Moyo
                'graded_at' => '2025-03-19 11:45:00',
            ],
            
            // Submissions for Rudo Sibanda
            [
                'assignment_id' => 7, // Fractions and Decimals
                'student_id' => 9, // Rudo Sibanda
                'content' => 'I have converted all fractions to decimals and decimals to fractions.',
                'file_path' => 'submissions/rudo_fractions_decimals.pdf',
                'submission_date' => '2025-03-21 16:50:00',
                'is_late' => false,
                'grade' => 38,
                'feedback' => 'Very good work! All conversions are correct. Your work is neat and organized.',
                'graded_by' => 5, // David Moyo
                'graded_at' => '2025-03-22 10:30:00',
            ],
            [
                'assignment_id' => 8, // Map of Zimbabwe
                'student_id' => 9, // Rudo Sibanda
                'content' => 'I have drawn a detailed map of Zimbabwe with all required elements.',
                'file_path' => 'submissions/rudo_zimbabwe_map.jpg',
                'submission_date' => '2025-03-31 09:15:00',
                'is_late' => true,
                'grade' => null,
                'feedback' => null,
                'graded_by' => null,
                'graded_at' => null,
            ],
        ];

        foreach ($submissions as $submission) {
            Submission::create($submission);
        }
    }
}
