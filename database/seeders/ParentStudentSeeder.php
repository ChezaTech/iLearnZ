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
        $parentStudentRelationships = [
            // Mr. Mutasa (parent_id: 11) is related to Tendai Mutasa (student_id: 7)
            [
                'parent_id' => 11,
                'student_id' => 7,
                'relationship' => 'father',
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
            // Mr. Mutasa (parent_id: 11) is also related to Chipo Dziva (student_id: 8)
            [
                'parent_id' => 11,
                'student_id' => 8,
                'relationship' => 'guardian',
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
            // Mrs. Ncube (parent_id: 12) is also related to Rudo Sibanda (student_id: 10)
            [
                'parent_id' => 12,
                'student_id' => 10,
                'relationship' => 'aunt',
                'is_emergency_contact' => true,
                'can_pickup' => true,
                'receives_reports' => true,
                'receives_notifications' => true,
            ],
        ];

        foreach ($parentStudentRelationships as $relationship) {
            ParentStudent::create($relationship);
        }
    }
}
