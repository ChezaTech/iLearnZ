<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin
        User::create([
            'name' => 'System Administrator',
            'email' => 'admin@ilearnz.com',
            'password' => Hash::make('password'),
            'role_id' => 1, // Super Admin
            'user_type' => 'admin',
            'phone_number' => '+263 77 123 4567',
            'is_active' => true,
        ]);

        // School Admins
        $schoolAdmins = [
            [
                'name' => 'Harare High Admin',
                'email' => 'admin@hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 2, // School Admin
                'school_id' => 1,
                'user_type' => 'admin',
                'phone_number' => '+263 77 234 5678',
                'is_active' => true,
            ],
            [
                'name' => 'Bulawayo Primary Admin',
                'email' => 'admin@bulawayoprimary.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 2, // School Admin
                'school_id' => 2,
                'user_type' => 'admin',
                'phone_number' => '+263 77 345 6789',
                'is_active' => true,
            ],
        ];

        foreach ($schoolAdmins as $admin) {
            User::create($admin);
        }

        // Teachers
        $teachers = [
            [
                'name' => 'John Smith',
                'email' => 'jsmith@hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 1,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 456 7890',
                'is_active' => true,
            ],
            [
                'name' => 'Mary Johnson',
                'email' => 'mjohnson@hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 1,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 567 8901',
                'is_active' => true,
            ],
            [
                'name' => 'David Moyo',
                'email' => 'dmoyo@bulawayoprimary.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 2,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 678 9012',
                'is_active' => true,
            ],
        ];

        foreach ($teachers as $teacher) {
            User::create($teacher);
        }

        // Students
        $students = [
            // Harare High Students
            [
                'name' => 'Tendai Mutasa',
                'email' => 'tmutasa@student.hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 1,
                'user_type' => 'student',
                'is_active' => true,
            ],
            [
                'name' => 'Chipo Dziva',
                'email' => 'cdziva@student.hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 1,
                'user_type' => 'student',
                'is_active' => true,
            ],
            // Bulawayo Primary Students
            [
                'name' => 'Tafara Ncube',
                'email' => 'tncube@student.bulawayoprimary.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 2,
                'user_type' => 'student',
                'is_active' => true,
            ],
            [
                'name' => 'Rudo Sibanda',
                'email' => 'rsibanda@student.bulawayoprimary.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 2,
                'user_type' => 'student',
                'is_active' => true,
            ],
        ];

        foreach ($students as $student) {
            User::create($student);
        }

        // Parents
        $parents = [
            [
                'name' => 'Mr. Mutasa',
                'email' => 'mutasa.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 1,
                'user_type' => 'parent',
                'phone_number' => '+263 77 789 0123',
                'is_active' => true,
            ],
            [
                'name' => 'Mrs. Ncube',
                'email' => 'ncube.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 2,
                'user_type' => 'parent',
                'phone_number' => '+263 77 890 1234',
                'is_active' => true,
            ],
        ];

        foreach ($parents as $parent) {
            User::create($parent);
        }

        // Government Officials
        $officials = [
            [
                'name' => 'Education Minister',
                'email' => 'minister@education.gov.zw',
                'password' => Hash::make('password'),
                'role_id' => 6, // Government Official
                'user_type' => 'government',
                'phone_number' => '+263 77 901 2345',
                'is_active' => true,
            ],
            [
                'name' => 'ZIMSEC Director',
                'email' => 'director@zimsec.gov.zw',
                'password' => Hash::make('password'),
                'role_id' => 6, // Government Official
                'user_type' => 'government',
                'phone_number' => '+263 77 012 3456',
                'is_active' => true,
            ],
        ];

        foreach ($officials as $official) {
            User::create($official);
        }
    }
}
