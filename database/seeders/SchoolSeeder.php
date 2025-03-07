<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $schools = [
            [
                'name' => 'Harare High School',
                'code' => 'HHS001',
                'address' => '123 Main Street',
                'city' => 'Harare',
                'province' => 'Harare',
                'postal_code' => '00263',
                'phone' => '+263 242 123456',
                'email' => 'info@hararehigh.edu.zw',
                'principal_name' => 'Dr. John Moyo',
                'type' => 'secondary',
                'connectivity_status' => 'online',
                'internet_provider' => 'Econet',
                'has_smartboards' => true,
                'student_count' => 850,
                'teacher_count' => 45,
            ],
            [
                'name' => 'Bulawayo Primary School',
                'code' => 'BPS002',
                'address' => '456 Oak Avenue',
                'city' => 'Bulawayo',
                'province' => 'Bulawayo',
                'postal_code' => '00264',
                'phone' => '+263 292 654321',
                'email' => 'info@bulawayoprimary.edu.zw',
                'principal_name' => 'Mrs. Sarah Ndlovu',
                'type' => 'primary',
                'connectivity_status' => 'hybrid',
                'internet_provider' => 'TelOne',
                'has_smartboards' => true,
                'student_count' => 620,
                'teacher_count' => 32,
            ],
            [
                'name' => 'Mutare Combined School',
                'code' => 'MCS003',
                'address' => '789 Pine Road',
                'city' => 'Mutare',
                'province' => 'Manicaland',
                'postal_code' => '00265',
                'phone' => '+263 20 123789',
                'email' => 'info@mutarecombined.edu.zw',
                'principal_name' => 'Mr. Robert Chigumba',
                'type' => 'combined',
                'connectivity_status' => 'offline',
                'internet_provider' => null,
                'has_smartboards' => false,
                'student_count' => 450,
                'teacher_count' => 25,
            ],
            [
                'name' => 'Gweru Academy',
                'code' => 'GA004',
                'address' => '101 Cedar Lane',
                'city' => 'Gweru',
                'province' => 'Midlands',
                'postal_code' => '00266',
                'phone' => '+263 54 987654',
                'email' => 'info@gweruacademy.edu.zw',
                'principal_name' => 'Dr. Elizabeth Tafara',
                'type' => 'secondary',
                'connectivity_status' => 'online',
                'internet_provider' => 'NetOne',
                'has_smartboards' => true,
                'student_count' => 720,
                'teacher_count' => 38,
            ],
            [
                'name' => 'Masvingo Elementary',
                'code' => 'ME005',
                'address' => '202 Birch Street',
                'city' => 'Masvingo',
                'province' => 'Masvingo',
                'postal_code' => '00267',
                'phone' => '+263 39 456789',
                'email' => 'info@masvingoelementary.edu.zw',
                'principal_name' => 'Mr. Thomas Chirwa',
                'type' => 'primary',
                'connectivity_status' => 'hybrid',
                'internet_provider' => 'Econet',
                'has_smartboards' => false,
                'student_count' => 380,
                'teacher_count' => 20,
            ],
        ];

        foreach ($schools as $school) {
            School::create($school);
        }
    }
}
