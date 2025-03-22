<?php

namespace Database\Seeders;

use App\Models\Progress;
use Illuminate\Database\Seeder;

class ProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $progressRecords = [
            // Progress for Tendai Mutasa
            [
                'student_id' => 6, // Tendai Mutasa
                'lesson_id' => 1, // Introduction to Algebra
                'status' => 'completed',
                'progress_percentage' => 100,
                'score' => 85.0,
                'started_at' => '2025-03-05 10:15:00',
                'completed_at' => '2025-03-05 11:00:00',
                'time_spent_seconds' => 2700, // 45 minutes
            ],
            [
                'student_id' => 6, // Tendai Mutasa
                'lesson_id' => 4, // Essay Writing
                'status' => 'in_progress',
                'progress_percentage' => 60,
                'score' => null,
                'started_at' => '2025-03-06 14:30:00',
                'completed_at' => null,
                'time_spent_seconds' => 1800, // 30 minutes so far
            ],
            
            // Progress for Chipo Dziva
            [
                'student_id' => 7, // Chipo Dziva
                'lesson_id' => 2, // Quadratic Equations
                'status' => 'completed',
                'progress_percentage' => 100,
                'score' => 92.0,
                'started_at' => '2025-03-04 09:00:00',
                'completed_at' => '2025-03-04 10:00:00',
                'time_spent_seconds' => 3600, // 60 minutes
            ],
            [
                'student_id' => 7, // Chipo Dziva
                'lesson_id' => 6, // Cell Structure
                'status' => 'completed',
                'progress_percentage' => 100,
                'score' => 88.5,
                'started_at' => '2025-03-05 13:15:00',
                'completed_at' => '2025-03-05 14:10:00',
                'time_spent_seconds' => 3300, // 55 minutes
            ],
            
            // Progress for Tafara Ncube
            [
                'student_id' => 8, // Tafara Ncube
                'lesson_id' => 3, // Parts of Speech
                'status' => 'completed',
                'progress_percentage' => 100,
                'score' => 75.0,
                'started_at' => '2025-03-03 10:30:00',
                'completed_at' => '2025-03-03 11:10:00',
                'time_spent_seconds' => 2400, // 40 minutes
            ],
            [
                'student_id' => 8, // Tafara Ncube
                'lesson_id' => 5, // The Solar System
                'status' => 'in_progress',
                'progress_percentage' => 40,
                'score' => null,
                'started_at' => '2025-03-06 11:00:00',
                'completed_at' => null,
                'time_spent_seconds' => 1080, // 18 minutes so far
            ],
            
            // Progress for Rudo Sibanda
            [
                'student_id' => 9, // Rudo Sibanda
                'lesson_id' => 3, // Parts of Speech
                'status' => 'completed',
                'progress_percentage' => 100,
                'score' => 90.0,
                'started_at' => '2025-03-04 14:00:00',
                'completed_at' => '2025-03-04 14:40:00',
                'time_spent_seconds' => 2400, // 40 minutes
            ],
            [
                'student_id' => 9, // Rudo Sibanda
                'lesson_id' => 5, // The Solar System
                'status' => 'completed',
                'progress_percentage' => 100,
                'score' => 85.5,
                'started_at' => '2025-03-05 09:30:00',
                'completed_at' => '2025-03-05 10:15:00',
                'time_spent_seconds' => 2700, // 45 minutes
            ],
        ];

        foreach ($progressRecords as $progress) {
            Progress::create($progress);
        }
    }
}
