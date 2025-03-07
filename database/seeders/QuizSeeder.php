<?php

namespace Database\Seeders;

use App\Models\Quiz;
use Illuminate\Database\Seeder;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quizzes = [
            // Quizzes for Algebra Lesson
            [
                'lesson_id' => 1, // Introduction to Algebra
                'title' => 'Algebra Basics Quiz',
                'description' => 'Test your understanding of basic algebra concepts',
                'duration_minutes' => 20,
                'total_points' => 100,
                'is_randomized' => false,
                'show_answers_after_submission' => true,
                'is_offline_available' => true,
                'created_by' => 3, // John Smith
            ],
            // Quizzes for Quadratic Equations Lesson
            [
                'lesson_id' => 2, // Quadratic Equations
                'title' => 'Quadratic Equations Quiz',
                'description' => 'Test your ability to solve quadratic equations',
                'duration_minutes' => 30,
                'total_points' => 100,
                'is_randomized' => true,
                'show_answers_after_submission' => false,
                'is_offline_available' => true,
                'created_by' => 3, // John Smith
            ],
            // Quizzes for Parts of Speech Lesson
            [
                'lesson_id' => 3, // Parts of Speech
                'title' => 'Parts of Speech Quiz',
                'description' => 'Identify the different parts of speech in sentences',
                'duration_minutes' => 15,
                'total_points' => 50,
                'is_randomized' => false,
                'show_answers_after_submission' => true,
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
            // Quizzes for Essay Writing Lesson
            [
                'lesson_id' => 4, // Essay Writing
                'title' => 'Essay Structure Quiz',
                'description' => 'Test your knowledge of proper essay structure',
                'duration_minutes' => 25,
                'total_points' => 75,
                'is_randomized' => false,
                'show_answers_after_submission' => true,
                'is_offline_available' => true,
                'created_by' => 4, // Mary Johnson
            ],
            // Quizzes for Solar System Lesson
            [
                'lesson_id' => 5, // The Solar System
                'title' => 'Solar System Quiz',
                'description' => 'Test your knowledge of planets and the solar system',
                'duration_minutes' => 20,
                'total_points' => 80,
                'is_randomized' => true,
                'show_answers_after_submission' => false,
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
            // Quizzes for Cell Structure Lesson
            [
                'lesson_id' => 6, // Cell Structure
                'title' => 'Cell Structure Quiz',
                'description' => 'Test your knowledge of cell components and functions',
                'duration_minutes' => 25,
                'total_points' => 90,
                'is_randomized' => true,
                'show_answers_after_submission' => true,
                'is_offline_available' => true,
                'created_by' => 4, // Mary Johnson
            ],
        ];

        foreach ($quizzes as $quiz) {
            Quiz::create($quiz);
        }
    }
}
