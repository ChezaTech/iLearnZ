<?php

namespace Database\Seeders;

use App\Models\ParentStudent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParentStudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Zimbabwe-specific parent-student relationships with common Zimbabwean surnames
        $parentStudentRelationships = [
            // Mr. Mutasa (parent_id: 11) is related to Tendai Mutasa (student_id: 7)
            [
                'parent_id' => 11,
                'student_id' => 7,
                'relationship' => 'father', // Common family structure in Zimbabwe
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            // Mr. Mutasa (parent_id: 11) is also related to Chipo Dziva (student_id: 8) - extended family is common in Zimbabwe
            [
                'parent_id' => 11,
                'student_id' => 8,
                'relationship' => 'guardian', // Extended family guardianship is common in Zimbabwe
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            // Mrs. Ncube (parent_id: 12) is related to Tafara Ncube (student_id: 9)
            [
                'parent_id' => 12,
                'student_id' => 9,
                'relationship' => 'mother',
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            // Mrs. Ncube (parent_id: 12) is also related to Rudo Sibanda (student_id: 10) - different surnames in same family can be common
            [
                'parent_id' => 12,
                'student_id' => 10,
                'relationship' => 'other', // Extended family relationships (aunt) are important in Zimbabwean culture
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            // Additional Zimbabwean family relationships with common surnames
            [
                'parent_id' => 13, // Mr. Moyo - common surname in Zimbabwe
                'student_id' => 11, // Tatenda Moyo
                'relationship' => 'father',
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            [
                'parent_id' => 14, // Mrs. Mpofu - common surname in Matabeleland
                'student_id' => 12, // Nyasha Mpofu
                'relationship' => 'mother',
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            [
                'parent_id' => 15, // Mr. Dube - common surname in Zimbabwe
                'student_id' => 13, // Simba Dube
                'relationship' => 'father',
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            [
                'parent_id' => 16, // Mrs. Chigumba - Zimbabwean surname
                'student_id' => 14, // Kudzai Chigumba
                'relationship' => 'mother',
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            [
                'parent_id' => 17, // Mr. Chirwa - Zimbabwean surname
                'student_id' => 15, // Farai Chirwa
                'relationship' => 'guardian', // Many children in Zimbabwe are raised by guardians
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
        ];

        foreach ($parentStudentRelationships as $relationship) {
            // Check if the relationship already exists
            $exists = ParentStudent::where([
                ['parent_id', '=', $relationship['parent_id']],
                ['student_id', '=', $relationship['student_id']],
            ])->exists();
            
            if (!$exists) {
                ParentStudent::create($relationship);
            }
        }
    }
}
