<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            // Questions for Algebra Basics Quiz
            [
                'quiz_id' => 1, // Algebra Basics Quiz
                'content' => 'What is the value of x in the equation 2x + 5 = 15?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 1,
                'explanation' => 'To solve for x, subtract 5 from both sides to get 2x = 10, then divide both sides by 2 to get x = 5.',
            ],
            [
                'quiz_id' => 1, // Algebra Basics Quiz
                'content' => 'Simplify the expression 3(x + 2) - 4x',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 2,
                'explanation' => 'First distribute: 3(x + 2) = 3x + 6, then subtract 4x: 3x + 6 - 4x = -x + 6',
            ],
            [
                'quiz_id' => 1, // Algebra Basics Quiz
                'content' => 'Solve for y: 2y - 7 = 3y + 4',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 3,
                'explanation' => 'Subtract 3y from both sides: 2y - 3y - 7 = 4, which gives -y - 7 = 4. Add 7 to both sides: -y = 11. Multiply both sides by -1: y = -11',
            ],
            
            // Questions for Quadratic Equations Quiz
            [
                'quiz_id' => 2, // Quadratic Equations Quiz
                'content' => 'What are the solutions to the equation x² - 5x + 6 = 0?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 1,
                'explanation' => 'Factor the equation: (x - 2)(x - 3) = 0, so x = 2 or x = 3',
            ],
            [
                'quiz_id' => 2, // Quadratic Equations Quiz
                'content' => 'Which of the following is the quadratic formula?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 2,
                'explanation' => 'The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a for the equation ax² + bx + c = 0',
            ],
            
            // Questions for Parts of Speech Quiz
            [
                'quiz_id' => 3, // Parts of Speech Quiz
                'content' => 'In the sentence "The quick brown fox jumps over the lazy dog", what part of speech is "quick"?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 1,
                'explanation' => '"Quick" is an adjective because it describes the noun "fox".',
            ],
            [
                'quiz_id' => 3, // Parts of Speech Quiz
                'content' => 'Identify the verb in the sentence: "She sings beautifully in the choir."',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 2,
                'explanation' => '"Sings" is the verb in the sentence as it shows the action performed by the subject "she".',
            ],
            
            // Questions for Essay Structure Quiz
            [
                'quiz_id' => 4, // Essay Structure Quiz
                'content' => 'What are the three main parts of an essay?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 1,
                'explanation' => 'The three main parts of an essay are the introduction, body, and conclusion.',
            ],
            [
                'quiz_id' => 4, // Essay Structure Quiz
                'content' => 'What is the purpose of a thesis statement?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 2,
                'explanation' => 'A thesis statement presents the main argument or point of the essay and outlines how it will be supported.',
            ],
            
            // Questions for Solar System Quiz
            [
                'quiz_id' => 5, // Solar System Quiz
                'content' => 'Which planet is known as the "Red Planet"?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 1,
                'explanation' => 'Mars is known as the "Red Planet" due to its reddish appearance caused by iron oxide (rust) on its surface.',
            ],
            [
                'quiz_id' => 5, // Solar System Quiz
                'content' => 'How many planets are in our solar system?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 2,
                'explanation' => 'There are eight planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.',
            ],
            
            // Questions for Cell Structure Quiz
            [
                'quiz_id' => 6, // Cell Structure Quiz
                'content' => 'Which organelle is responsible for protein synthesis?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 1,
                'explanation' => 'Ribosomes are responsible for protein synthesis in cells.',
            ],
            [
                'quiz_id' => 6, // Cell Structure Quiz
                'content' => 'What is the main difference between plant and animal cells?',
                'type' => 'multiple_choice',
                'points' => 5,
                'order' => 2,
                'explanation' => 'Plant cells have cell walls, chloroplasts, and a large central vacuole, which animal cells lack.',
            ],
        ];

        foreach ($questions as $question) {
            Question::create($question);
        }
    }
}
