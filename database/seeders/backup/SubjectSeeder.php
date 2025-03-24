<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'name' => 'Mathematics',
                'code' => 'MATH',
                'description' => 'Study of numbers, quantities, and shapes',
                'grade_level' => 'all',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'English Language',
                'code' => 'ENG',
                'description' => 'Study of the English language and literature',
                'grade_level' => 'all',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'Science',
                'code' => 'SCI',
                'description' => 'Study of the natural world through observation and experiment',
                'grade_level' => 'primary',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'Biology',
                'code' => 'BIO',
                'description' => 'Study of living organisms and their interactions',
                'grade_level' => 'secondary',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'Chemistry',
                'code' => 'CHEM',
                'description' => 'Study of matter, its properties, and reactions',
                'grade_level' => 'secondary',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'Physics',
                'code' => 'PHYS',
                'description' => 'Study of matter, energy, and their interactions',
                'grade_level' => 'secondary',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'History',
                'code' => 'HIST',
                'description' => 'Study of past events and human affairs',
                'grade_level' => 'all',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'Geography',
                'code' => 'GEO',
                'description' => 'Study of the Earth and its features',
                'grade_level' => 'all',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'Computer Science',
                'code' => 'CS',
                'description' => 'Study of computers and computational systems',
                'grade_level' => 'secondary',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
            [
                'name' => 'Physical Education',
                'code' => 'PE',
                'description' => 'Education in physical exercise and games',
                'grade_level' => 'all',
                'is_zimsec_aligned' => true,
                'curriculum_version' => '2023',
            ],
        ];

        foreach ($subjects as $subject) {
            Subject::create($subject);
        }
    }
}
