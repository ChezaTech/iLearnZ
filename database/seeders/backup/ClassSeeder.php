<?php

namespace Database\Seeders;

use App\Models\Classes;
use Illuminate\Database\Seeder;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            // Harare High School Classes
            [
                'school_id' => 1,
                'name' => 'Form 1A',
                'grade_level' => 'Form 1',
                'section' => 'A',
                'academic_year' => '2025',
                'teacher_id' => 4, // Mary Johnson
                'start_date' => '2025-01-15',
                'end_date' => '2025-12-15',
                'is_active' => true,
                'max_students' => 35,
            ],
            [
                'school_id' => 1,
                'name' => 'Form 2B',
                'grade_level' => 'Form 2',
                'section' => 'B',
                'academic_year' => '2025',
                'teacher_id' => 3, // John Smith
                'start_date' => '2025-01-15',
                'end_date' => '2025-12-15',
                'is_active' => true,
                'max_students' => 30,
            ],
            // Bulawayo Primary School Classes
            [
                'school_id' => 2,
                'name' => 'Grade 5 Eagles',
                'grade_level' => 'Grade 5',
                'section' => 'Eagles',
                'academic_year' => '2025',
                'teacher_id' => 5, // David Moyo
                'start_date' => '2025-01-15',
                'end_date' => '2025-12-15',
                'is_active' => true,
                'max_students' => 25,
            ],
            [
                'school_id' => 2,
                'name' => 'Grade 6 Lions',
                'grade_level' => 'Grade 6',
                'section' => 'Lions',
                'academic_year' => '2025',
                'teacher_id' => 5, // David Moyo
                'start_date' => '2025-01-15',
                'end_date' => '2025-12-15',
                'is_active' => true,
                'max_students' => 25,
            ],
        ];

        foreach ($classes as $class) {
            Classes::create($class);
        }
    }
}
