<?php

namespace Database\Seeders;

use App\Models\Answer;
use Illuminate\Database\Seeder;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $answers = [
            // Answers for Algebra Basics Quiz - Question 1
            [
                'question_id' => 1,
                'content' => '5',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 1,
                'content' => '7',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 1,
                'content' => '10',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 1,
                'content' => '3',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Algebra Basics Quiz - Question 2
            [
                'question_id' => 2,
                'content' => '3x + 6',
                'is_correct' => false,
                'order' => 1,
            ],
            [
                'question_id' => 2,
                'content' => '-x + 6',
                'is_correct' => true,
                'order' => 2,
            ],
            [
                'question_id' => 2,
                'content' => '-4x + 6',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 2,
                'content' => 'x + 6',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Algebra Basics Quiz - Question 3
            [
                'question_id' => 3,
                'content' => 'y = -11',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 3,
                'content' => 'y = 11',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 3,
                'content' => 'y = -5.5',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 3,
                'content' => 'y = 5.5',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Quadratic Equations Quiz - Question 1
            [
                'question_id' => 4,
                'content' => 'x = 2 and x = 3',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 4,
                'content' => 'x = -2 and x = -3',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 4,
                'content' => 'x = 1 and x = 6',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 4,
                'content' => 'x = -1 and x = -6',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Quadratic Equations Quiz - Question 2
            [
                'question_id' => 5,
                'content' => 'x = (-b ± √(b² - 4ac)) / 2a',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 5,
                'content' => 'x = (-b ± √(b² + 4ac)) / 2a',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 5,
                'content' => 'x = (b ± √(b² - 4ac)) / 2a',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 5,
                'content' => 'x = (-b ± √(b² - 4ac)) / 2c',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Parts of Speech Quiz - Question 1
            [
                'question_id' => 6,
                'content' => 'Adjective',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 6,
                'content' => 'Adverb',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 6,
                'content' => 'Noun',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 6,
                'content' => 'Verb',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Parts of Speech Quiz - Question 2
            [
                'question_id' => 7,
                'content' => 'Sings',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 7,
                'content' => 'She',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 7,
                'content' => 'Beautifully',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 7,
                'content' => 'Choir',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Essay Structure Quiz - Question 1
            [
                'question_id' => 8,
                'content' => 'Introduction, Body, Conclusion',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 8,
                'content' => 'Title, Content, References',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 8,
                'content' => 'Thesis, Arguments, Evidence',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 8,
                'content' => 'Beginning, Middle, End',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Essay Structure Quiz - Question 2
            [
                'question_id' => 9,
                'content' => 'To state the main argument or point of the essay',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 9,
                'content' => 'To summarize the entire essay',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 9,
                'content' => 'To introduce the topic without taking a position',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 9,
                'content' => 'To list all the sources used in the essay',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Solar System Quiz - Question 1
            [
                'question_id' => 10,
                'content' => 'Mars',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 10,
                'content' => 'Venus',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 10,
                'content' => 'Jupiter',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 10,
                'content' => 'Mercury',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Solar System Quiz - Question 2
            [
                'question_id' => 11,
                'content' => '8',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 11,
                'content' => '9',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 11,
                'content' => '7',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 11,
                'content' => '10',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Cell Structure Quiz - Question 1
            [
                'question_id' => 12,
                'content' => 'Ribosome',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 12,
                'content' => 'Mitochondria',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 12,
                'content' => 'Nucleus',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 12,
                'content' => 'Golgi apparatus',
                'is_correct' => false,
                'order' => 4,
            ],
            
            // Answers for Cell Structure Quiz - Question 2
            [
                'question_id' => 13,
                'content' => 'Plant cells have cell walls and chloroplasts, while animal cells do not',
                'is_correct' => true,
                'order' => 1,
            ],
            [
                'question_id' => 13,
                'content' => 'Animal cells have a nucleus, while plant cells do not',
                'is_correct' => false,
                'order' => 2,
            ],
            [
                'question_id' => 13,
                'content' => 'Plant cells are round, while animal cells are rectangular',
                'is_correct' => false,
                'order' => 3,
            ],
            [
                'question_id' => 13,
                'content' => 'Animal cells have mitochondria, while plant cells do not',
                'is_correct' => false,
                'order' => 4,
            ],
        ];

        foreach ($answers as $answer) {
            Answer::create($answer);
        }
    }
}
