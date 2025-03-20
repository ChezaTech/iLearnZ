<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles if they don't exist
        $adminRole = Role::firstOrCreate(['name' => 'Admin'], [
            'description' => 'System Administrator',
            'permissions' => json_encode(['all']),
        ]);

        $schoolAdminRole = Role::firstOrCreate(['name' => 'School Admin'], [
            'description' => 'School Administrator',
            'permissions' => json_encode(['manage_school', 'manage_users', 'manage_classes']),
        ]);

        $teacherRole = Role::firstOrCreate(['name' => 'Teacher'], [
            'description' => 'Teacher',
            'permissions' => json_encode(['manage_classes', 'manage_grades', 'manage_attendance']),
        ]);

        $studentRole = Role::firstOrCreate(['name' => 'Student'], [
            'description' => 'Student',
            'permissions' => json_encode(['view_grades', 'view_assignments', 'submit_assignments']),
        ]);

        $parentRole = Role::firstOrCreate(['name' => 'Parent'], [
            'description' => 'Parent',
            'permissions' => json_encode(['view_child_grades', 'view_child_attendance', 'communicate_with_teachers']),
        ]);

        // Create a demo school if it doesn't exist
        $school = School::firstOrCreate(['name' => 'Demo School'], [
            'code' => 'DEMO001',
            'address' => '123 Education Street',
            'city' => 'Learning City',
            'province' => 'Knowledge Province',
            'postal_code' => '12345',
            'phone' => '123-456-7890',
            'email' => 'info@demoschool.edu',
            'principal_name' => 'Dr. Principal',
            'type' => 'primary',
            'connectivity_status' => 'online',
            'internet_provider' => 'EduNet',
            'has_smartboards' => true,
            'student_count' => 500,
            'teacher_count' => 30,
            'school_hours' => '8:00 AM - 3:00 PM',
        ]);

        // Create demo users for each role
        $this->createDemoUsers('admin', $adminRole->id, $school->id);
        $this->createDemoUsers('school_admin', $schoolAdminRole->id, $school->id);
        $this->createDemoUsers('teacher', $teacherRole->id, $school->id);
        $this->createDemoUsers('student', $studentRole->id, $school->id);
        $this->createDemoUsers('parent', $parentRole->id, $school->id);
    }

    /**
     * Create demo users for a specific user type
     *
     * @param string $userType
     * @param int $roleId
     * @param int $schoolId
     * @return void
     */
    private function createDemoUsers(string $userType, int $roleId, int $schoolId): void
    {
        $users = [
            'admin' => [
                [
                    'name' => 'John Admin',
                    'email' => 'admin@ilearnz.edu',
                ],
                [
                    'name' => 'Sarah Admin',
                    'email' => 'sarah.admin@ilearnz.edu',
                ],
            ],
            'school_admin' => [
                [
                    'name' => 'Michael Principal',
                    'email' => 'principal@ilearnz.edu',
                ],
                [
                    'name' => 'Lisa Principal',
                    'email' => 'lisa.principal@ilearnz.edu',
                ],
            ],
            'teacher' => [
                [
                    'name' => 'David Teacher',
                    'email' => 'teacher@ilearnz.edu',
                ],
                [
                    'name' => 'Emily Teacher',
                    'email' => 'emily.teacher@ilearnz.edu',
                ],
            ],
            'student' => [
                [
                    'name' => 'Alex Student',
                    'email' => 'student@ilearnz.edu',
                ],
                [
                    'name' => 'Bella Student',
                    'email' => 'bella.student@ilearnz.edu',
                ],
            ],
            'parent' => [
                [
                    'name' => 'Frank Parent',
                    'email' => 'parent@ilearnz.edu',
                ],
                [
                    'name' => 'Grace Parent',
                    'email' => 'grace.parent@ilearnz.edu',
                ],
            ],
        ];

        foreach ($users[$userType] as $userData) {
            User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('password'),
                    'role_id' => $roleId,
                    'school_id' => $schoolId,
                    'user_type' => $userType,
                    'is_active' => true,
                ]
            );
        }
    }
}
