<?php

namespace Database\Seeders;

use App\Models\Attendance;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attendances = [
            // Attendance for Tendai Mutasa in Form 1A
            [
                'student_id' => 6, // Tendai Mutasa
                'class_id' => 1, // Form 1A
                'date' => '2025-03-01',
                'status' => 'present',
                'recorded_by' => 4, // Mary Johnson
            ],
            [
                'student_id' => 6, // Tendai Mutasa
                'class_id' => 1, // Form 1A
                'date' => '2025-03-02',
                'status' => 'present',
                'recorded_by' => 4, // Mary Johnson
            ],
            [
                'student_id' => 6, // Tendai Mutasa
                'class_id' => 1, // Form 1A
                'date' => '2025-03-03',
                'status' => 'absent',
                'remarks' => 'Sick',
                'recorded_by' => 4, // Mary Johnson
            ],
            
            // Attendance for Chipo Dziva in Form 2B
            [
                'student_id' => 7, // Chipo Dziva
                'class_id' => 2, // Form 2B
                'date' => '2025-03-01',
                'status' => 'present',
                'recorded_by' => 3, // John Smith
            ],
            [
                'student_id' => 7, // Chipo Dziva
                'class_id' => 2, // Form 2B
                'date' => '2025-03-02',
                'status' => 'present',
                'recorded_by' => 3, // John Smith
            ],
            [
                'student_id' => 7, // Chipo Dziva
                'class_id' => 2, // Form 2B
                'date' => '2025-03-03',
                'status' => 'present',
                'recorded_by' => 3, // John Smith
            ],
            
            // Attendance for Tafara Ncube in Grade 5 Eagles
            [
                'student_id' => 8, // Tafara Ncube
                'class_id' => 3, // Grade 5 Eagles
                'date' => '2025-03-01',
                'status' => 'present',
                'recorded_by' => 5, // David Moyo
            ],
            [
                'student_id' => 8, // Tafara Ncube
                'class_id' => 3, // Grade 5 Eagles
                'date' => '2025-03-02',
                'status' => 'late',
                'remarks' => 'Transport issues',
                'recorded_by' => 5, // David Moyo
            ],
            [
                'student_id' => 8, // Tafara Ncube
                'class_id' => 3, // Grade 5 Eagles
                'date' => '2025-03-03',
                'status' => 'present',
                'recorded_by' => 5, // David Moyo
            ],
            
            // Attendance for Rudo Sibanda in Grade 6 Lions
            [
                'student_id' => 9, // Rudo Sibanda
                'class_id' => 4, // Grade 6 Lions
                'date' => '2025-03-01',
                'status' => 'present',
                'recorded_by' => 5, // David Moyo
            ],
            [
                'student_id' => 9, // Rudo Sibanda
                'class_id' => 4, // Grade 6 Lions
                'date' => '2025-03-02',
                'status' => 'absent',
                'remarks' => 'Family emergency',
                'recorded_by' => 5, // David Moyo
            ],
            [
                'student_id' => 9, // Rudo Sibanda
                'class_id' => 4, // Grade 6 Lions
                'date' => '2025-03-03',
                'status' => 'present',
                'recorded_by' => 5, // David Moyo
            ],
        ];

        foreach ($attendances as $attendance) {
            Attendance::create($attendance);
        }
    }
}
