<?php

namespace Database\Seeders;

use App\Models\Enrollment;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $enrollments = [
            // Harare High School Enrollments
            [
                'class_id' => 1, // Form 1A
                'student_id' => 6, // Tendai Mutasa
                'enrollment_date' => '2025-01-15',
                'status' => 'active',
                'notes' => 'Regular enrollment for academic year 2025',
            ],
            [
                'class_id' => 2, // Form 2B
                'student_id' => 7, // Chipo Dziva
                'enrollment_date' => '2025-01-15',
                'status' => 'active',
                'notes' => 'Regular enrollment for academic year 2025',
            ],
            // Bulawayo Primary School Enrollments
            [
                'class_id' => 3, // Grade 5 Eagles
                'student_id' => 8, // Tafara Ncube
                'enrollment_date' => '2025-01-10',
                'status' => 'active',
                'notes' => 'Regular enrollment for academic year 2025',
            ],
            [
                'class_id' => 4, // Grade 6 Lions
                'student_id' => 9, // Rudo Sibanda
                'enrollment_date' => '2025-01-10',
                'status' => 'active',
                'notes' => 'Regular enrollment for academic year 2025',
            ],
        ];

        foreach ($enrollments as $enrollment) {
            Enrollment::create($enrollment);
        }
    }
}
