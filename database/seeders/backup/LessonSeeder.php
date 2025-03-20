<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lessons = [
            // Mathematics Lessons
            [
                'subject_id' => 1, // Mathematics
                'title' => 'Introduction to Algebra',
                'description' => 'Basic concepts of algebra including variables and expressions',
                'content' => 'Algebra is a branch of mathematics dealing with symbols and the rules for manipulating these symbols. In elementary algebra, those symbols (today written as Latin and Greek letters) represent quantities without fixed values, known as variables.',
                'grade_level' => 'Form 1',
                'duration_minutes' => 45,
                'is_offline_available' => true,
                'is_interactive' => false,
                'is_approved' => true,
                'approved_by' => 2, // School Admin
                'approved_at' => now(),
                'created_by' => 3, // John Smith
            ],
            [
                'subject_id' => 1, // Mathematics
                'title' => 'Quadratic Equations',
                'description' => 'Solving quadratic equations using different methods',
                'content' => 'A quadratic equation is a second-degree polynomial equation in a single variable. The general form is ax² + bx + c = 0, where a ≠ 0. There are several methods to solve quadratic equations including factoring, completing the square, and the quadratic formula.',
                'grade_level' => 'Form 2',
                'duration_minutes' => 60,
                'is_offline_available' => true,
                'is_interactive' => true,
                'is_approved' => true,
                'approved_by' => 2, // School Admin
                'approved_at' => now(),
                'created_by' => 3, // John Smith
            ],
            // English Lessons
            [
                'subject_id' => 2, // English Language
                'title' => 'Parts of Speech',
                'description' => 'Understanding the different parts of speech in English',
                'content' => 'Parts of speech are categories of words based on their function within a sentence. The main parts of speech in English are: Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, and Interjections.',
                'grade_level' => 'Grade 5',
                'duration_minutes' => 40,
                'is_offline_available' => true,
                'is_interactive' => false,
                'is_approved' => true,
                'approved_by' => 2, // School Admin
                'approved_at' => now(),
                'created_by' => 5, // David Moyo
            ],
            [
                'subject_id' => 2, // English Language
                'title' => 'Essay Writing',
                'description' => 'Learning how to write effective essays',
                'content' => 'An essay is a piece of writing that gives the author\'s own argument. Essays are commonly used as literary criticism, political manifestos, learned arguments, observations of daily life, recollections, and reflections of the author.',
                'grade_level' => 'Form 1',
                'duration_minutes' => 50,
                'is_offline_available' => true,
                'is_interactive' => false,
                'is_approved' => true,
                'approved_by' => 2, // School Admin
                'approved_at' => now(),
                'created_by' => 4, // Mary Johnson
            ],
            // Science Lessons
            [
                'subject_id' => 3, // Science
                'title' => 'The Solar System',
                'description' => 'Exploring our solar system and its planets',
                'content' => 'The Solar System is the gravitationally bound system of the Sun and the objects that orbit it, either directly or indirectly. Of the objects that orbit the Sun directly, the largest are the eight planets, with the remainder being smaller objects, such as dwarf planets and small Solar System bodies.',
                'grade_level' => 'Grade 6',
                'duration_minutes' => 45,
                'is_offline_available' => true,
                'is_interactive' => true,
                'is_approved' => true,
                'approved_by' => 2, // School Admin
                'approved_at' => now(),
                'created_by' => 5, // David Moyo
            ],
            // Biology Lessons
            [
                'subject_id' => 4, // Biology
                'title' => 'Cell Structure',
                'description' => 'Understanding the structure and function of cells',
                'content' => 'Cells are the basic structural, functional, and biological unit of all known living organisms. Cells consist of cytoplasm enclosed within a membrane, which contains many biomolecules such as proteins and nucleic acids.',
                'grade_level' => 'Form 2',
                'duration_minutes' => 55,
                'is_offline_available' => true,
                'is_interactive' => true,
                'is_approved' => true,
                'approved_by' => 2, // School Admin
                'approved_at' => now(),
                'created_by' => 4, // Mary Johnson
            ],
        ];

        foreach ($lessons as $lesson) {
            Lesson::create($lesson);
        }
    }
}
