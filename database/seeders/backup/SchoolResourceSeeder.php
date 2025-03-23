<?php

namespace Database\Seeders;

use App\Models\SchoolResource;
use Illuminate\Database\Seeder;

class SchoolResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $resources = [
            // Harare High School Resources
            [
                'school_id' => 1,
                'resource_type' => 'textbook',
                'name' => 'Advanced Mathematics Textbook',
                'description' => 'Comprehensive mathematics textbook for advanced secondary school students',
                'quantity' => 250,
                'condition' => 'good',
                'acquisition_date' => '2024-01-15',
                'estimated_value' => 12500.00,
                'supplier' => 'Zimbabwe Educational Publishers',
                'location' => 'Main Library',
                'is_digital' => false,
                'digital_access_url' => null,
                'notes' => 'Used by Form 3 and Form 4 students',
            ],
            [
                'school_id' => 1,
                'resource_type' => 'textbook',
                'name' => 'English Literature Anthology',
                'description' => 'Collection of classic and contemporary literature for secondary school',
                'quantity' => 200,
                'condition' => 'excellent',
                'acquisition_date' => '2024-02-10',
                'estimated_value' => 10000.00,
                'supplier' => 'Oxford University Press',
                'location' => 'Main Library',
                'is_digital' => false,
                'digital_access_url' => null,
                'notes' => 'Includes works by African and international authors',
            ],
            [
                'school_id' => 1,
                'resource_type' => 'equipment',
                'name' => 'Science Laboratory Kit',
                'description' => 'Complete laboratory equipment for physics and chemistry experiments',
                'quantity' => 15,
                'condition' => 'good',
                'acquisition_date' => '2023-11-05',
                'estimated_value' => 75000.00,
                'supplier' => 'Scientific Solutions Ltd',
                'location' => 'Science Laboratory',
                'is_digital' => false,
                'digital_access_url' => null,
                'notes' => 'Each kit serves a group of 4 students',
            ],
            [
                'school_id' => 1,
                'resource_type' => 'digital',
                'name' => 'Online Learning Platform Subscription',
                'description' => 'Annual subscription to comprehensive e-learning platform',
                'quantity' => 1,
                'condition' => 'excellent',
                'acquisition_date' => '2025-01-01',
                'estimated_value' => 50000.00,
                'supplier' => 'EduTech Solutions',
                'location' => null,
                'is_digital' => true,
                'digital_access_url' => 'https://edutech.learning.platform/harare-high',
                'notes' => 'Provides access for all students and teachers',
            ],
            
            // Bulawayo Primary School Resources
            [
                'school_id' => 2,
                'resource_type' => 'textbook',
                'name' => 'Primary Mathematics Series',
                'description' => 'Grade-appropriate mathematics textbooks for primary school students',
                'quantity' => 350,
                'condition' => 'good',
                'acquisition_date' => '2024-01-20',
                'estimated_value' => 14000.00,
                'supplier' => 'Zimbabwe Educational Publishers',
                'location' => 'Primary Library',
                'is_digital' => false,
                'digital_access_url' => null,
                'notes' => 'Set includes books for Grades 1-7',
            ],
            [
                'school_id' => 2,
                'resource_type' => 'equipment',
                'name' => 'Art Supplies Kit',
                'description' => 'Comprehensive art supplies for primary school art classes',
                'quantity' => 25,
                'condition' => 'good',
                'acquisition_date' => '2024-02-15',
                'estimated_value' => 12500.00,
                'supplier' => 'Creative Arts Supplies',
                'location' => 'Art Room',
                'is_digital' => false,
                'digital_access_url' => null,
                'notes' => 'Each kit includes paints, brushes, paper, and clay',
            ],
            [
                'school_id' => 2,
                'resource_type' => 'equipment',
                'name' => 'Musical Instruments Set',
                'description' => 'Collection of musical instruments for music education',
                'quantity' => 1,
                'condition' => 'excellent',
                'acquisition_date' => '2023-10-10',
                'estimated_value' => 35000.00,
                'supplier' => 'Music Education Suppliers',
                'location' => 'Music Room',
                'is_digital' => false,
                'digital_access_url' => null,
                'notes' => 'Includes keyboards, recorders, percussion instruments, and guitars',
            ],
            [
                'school_id' => 2,
                'resource_type' => 'digital',
                'name' => 'Interactive Whiteboard Software',
                'description' => 'Educational software for interactive whiteboards',
                'quantity' => 10,
                'condition' => 'excellent',
                'acquisition_date' => '2024-03-01',
                'estimated_value' => 15000.00,
                'supplier' => 'Interactive Education Technologies',
                'location' => null,
                'is_digital' => true,
                'digital_access_url' => 'https://interactive-edu.com/whiteboard-software',
                'notes' => 'Licensed for use on all school interactive whiteboards',
            ],
            
            // Shared District Resources
            [
                'school_id' => null,
                'resource_type' => 'equipment',
                'name' => 'Mobile Computer Lab',
                'description' => 'Portable computer lab with laptops and networking equipment',
                'quantity' => 2,
                'condition' => 'good',
                'acquisition_date' => '2023-09-15',
                'estimated_value' => 120000.00,
                'supplier' => 'Tech Solutions Zimbabwe',
                'location' => 'District Resource Center',
                'is_digital' => false,
                'digital_access_url' => null,
                'notes' => 'Available for booking by all district schools, each lab contains 20 laptops',
            ],
            [
                'school_id' => null,
                'resource_type' => 'digital',
                'name' => 'District Educational Content Repository',
                'description' => 'Centralized repository of educational resources for all district schools',
                'quantity' => 1,
                'condition' => 'excellent',
                'acquisition_date' => '2024-01-05',
                'estimated_value' => 75000.00,
                'supplier' => 'Ministry of Education',
                'location' => null,
                'is_digital' => true,
                'digital_access_url' => 'https://education.gov.zw/resources',
                'notes' => 'Accessible to all teachers and administrators in the district',
            ],
        ];

        foreach ($resources as $resource) {
            // Check if the resource already exists by name and school_id
            $exists = SchoolResource::where([
                ['name', '=', $resource['name']],
                ['school_id', '=', $resource['school_id']],
            ])->exists();
            
            if (!$exists) {
                SchoolResource::create($resource);
            }
        }
    }
}
