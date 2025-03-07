<?php

namespace Database\Seeders;

use App\Models\Assignment;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $assignments = [
            // Assignments for Form 1A class
            [
                'class_id' => 1, // Form 1A
                'subject_id' => 1, // Mathematics
                'title' => 'Algebra Practice Problems',
                'description' => 'Complete the set of algebra practice problems. Solve all problems showing your work. Submit your solutions as a PDF document.',
                'due_date' => '2025-03-20',
                'total_points' => 100,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 4, // Mary Johnson
            ],
            [
                'class_id' => 1, // Form 1A
                'subject_id' => 2, // English Language
                'title' => 'Essay on Environmental Conservation',
                'description' => 'Write a 500-word essay on the importance of environmental conservation. Your essay should include an introduction, body paragraphs, and conclusion. Use proper grammar and citations.',
                'due_date' => '2025-03-25',
                'total_points' => 50,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 4, // Mary Johnson
            ],
            
            // Assignments for Form 2B class
            [
                'class_id' => 2, // Form 2B
                'subject_id' => 1, // Mathematics
                'title' => 'Quadratic Equations Worksheet',
                'description' => 'Complete the worksheet on solving quadratic equations. Solve each equation using the method specified. Show all steps of your work.',
                'due_date' => '2025-03-22',
                'total_points' => 50,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 3, // John Smith
            ],
            [
                'class_id' => 2, // Form 2B
                'subject_id' => 4, // Biology
                'title' => 'Cell Structure Diagram',
                'description' => 'Create a detailed diagram of an animal cell and a plant cell. Label all major organelles and include a brief description of their functions.',
                'due_date' => '2025-03-28',
                'total_points' => 75,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 3, // John Smith
            ],
            
            // Assignments for Grade 5 Eagles class
            [
                'class_id' => 3, // Grade 5 Eagles
                'subject_id' => 2, // English Language
                'title' => 'Parts of Speech Identification',
                'description' => 'Identify parts of speech in the provided sentences. Underline each word in the sentences and label its part of speech.',
                'due_date' => '2025-03-18',
                'total_points' => 30,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
            [
                'class_id' => 3, // Grade 5 Eagles
                'subject_id' => 3, // Science
                'title' => 'Solar System Model',
                'description' => 'Create a model of the solar system. Build a 3D model of the solar system showing all 8 planets in their correct order from the sun.',
                'due_date' => '2025-04-05',
                'total_points' => 100,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
            
            // Assignments for Grade 6 Lions class
            [
                'class_id' => 4, // Grade 6 Lions
                'subject_id' => 1, // Mathematics
                'title' => 'Fractions and Decimals',
                'description' => 'Complete the worksheet on converting between fractions and decimals. Convert each fraction to a decimal and each decimal to a fraction in its simplest form.',
                'due_date' => '2025-03-21',
                'total_points' => 40,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
            [
                'class_id' => 4, // Grade 6 Lions
                'subject_id' => 8, // Geography
                'title' => 'Map of Zimbabwe',
                'description' => 'Draw a map of Zimbabwe showing major cities and geographical features. Your map should include at least 5 major cities, major rivers, mountains, and neighboring countries.',
                'due_date' => '2025-03-30',
                'total_points' => 60,
                'is_graded' => true,
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
        ];

        foreach ($assignments as $assignment) {
            Assignment::create($assignment);
        }
    }
}
