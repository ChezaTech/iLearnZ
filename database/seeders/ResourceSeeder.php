<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $resources = [
            // Resources for Algebra Lesson
            [
                'lesson_id' => 1, // Introduction to Algebra
                'title' => 'Algebra Basics PDF',
                'description' => 'A comprehensive guide to basic algebra concepts',
                'type' => 'document',
                'file_path' => 'resources/math/algebra_basics.pdf',
                'url' => null,
                'file_size' => 1024, // 1MB
                'mime_type' => 'application/pdf',
                'is_offline_available' => true,
                'created_by' => 3, // John Smith
            ],
            [
                'lesson_id' => 1, // Introduction to Algebra
                'title' => 'Algebra Introduction Video',
                'description' => 'Video tutorial explaining algebra fundamentals',
                'type' => 'video',
                'file_path' => 'resources/math/algebra_intro.mp4',
                'url' => null,
                'file_size' => 15360, // 15MB
                'mime_type' => 'video/mp4',
                'is_offline_available' => true,
                'created_by' => 3, // John Smith
            ],
            // Resources for Quadratic Equations Lesson
            [
                'lesson_id' => 2, // Quadratic Equations
                'title' => 'Quadratic Formula Worksheet',
                'description' => 'Practice problems using the quadratic formula',
                'type' => 'document',
                'file_path' => 'resources/math/quadratic_worksheet.pdf',
                'url' => null,
                'file_size' => 512, // 512KB
                'mime_type' => 'application/pdf',
                'is_offline_available' => true,
                'created_by' => 3, // John Smith
            ],
            // Resources for Parts of Speech Lesson
            [
                'lesson_id' => 3, // Parts of Speech
                'title' => 'Parts of Speech Infographic',
                'description' => 'Visual guide to the eight parts of speech',
                'type' => 'image',
                'file_path' => 'resources/english/parts_of_speech.png',
                'url' => null,
                'file_size' => 2048, // 2MB
                'mime_type' => 'image/png',
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
            // Resources for Essay Writing Lesson
            [
                'lesson_id' => 4, // Essay Writing
                'title' => 'Essay Structure Template',
                'description' => 'Template for structuring a five-paragraph essay',
                'type' => 'document',
                'file_path' => 'resources/english/essay_template.docx',
                'url' => null,
                'file_size' => 256, // 256KB
                'mime_type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'is_offline_available' => true,
                'created_by' => 4, // Mary Johnson
            ],
            [
                'lesson_id' => 4, // Essay Writing
                'title' => 'Essay Writing Tips',
                'description' => 'Helpful tips for writing effective essays',
                'type' => 'other',
                'file_path' => null,
                'url' => 'https://www.example.com/essay-writing-tips',
                'file_size' => null,
                'mime_type' => null,
                'is_offline_available' => false,
                'created_by' => 4, // Mary Johnson
            ],
            // Resources for Solar System Lesson
            [
                'lesson_id' => 5, // The Solar System
                'title' => 'Solar System Interactive',
                'description' => 'Interactive model of the solar system',
                'type' => 'interactive',
                'file_path' => 'resources/science/solar_system_interactive.html',
                'url' => null,
                'file_size' => 5120, // 5MB
                'mime_type' => 'text/html',
                'is_offline_available' => true,
                'created_by' => 5, // David Moyo
            ],
            // Resources for Cell Structure Lesson
            [
                'lesson_id' => 6, // Cell Structure
                'title' => 'Cell Diagram',
                'description' => 'Detailed diagram of animal and plant cells',
                'type' => 'image',
                'file_path' => 'resources/biology/cell_diagram.jpg',
                'url' => null,
                'file_size' => 1536, // 1.5MB
                'mime_type' => 'image/jpeg',
                'is_offline_available' => true,
                'created_by' => 4, // Mary Johnson
            ],
            [
                'lesson_id' => 6, // Cell Structure
                'title' => 'Cell Structure 3D Model',
                'description' => '3D model of a cell for interactive exploration',
                'type' => 'interactive',
                'file_path' => 'resources/biology/cell_3d_model.html',
                'url' => null,
                'file_size' => 8192, // 8MB
                'mime_type' => 'text/html',
                'is_offline_available' => true,
                'created_by' => 4, // Mary Johnson
            ],
        ];

        foreach ($resources as $resource) {
            Resource::create($resource);
        }
    }
}
