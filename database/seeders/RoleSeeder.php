<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'description' => 'Has full access to all features of the system',
                'permissions' => json_encode([
                    'users.view', 'users.create', 'users.edit', 'users.delete',
                    'schools.view', 'schools.create', 'schools.edit', 'schools.delete',
                    'subjects.view', 'subjects.create', 'subjects.edit', 'subjects.delete',
                    'lessons.view', 'lessons.create', 'lessons.edit', 'lessons.delete',
                    'reports.view', 'reports.create', 'reports.edit', 'reports.delete',
                    'system.settings'
                ])
            ],
            [
                'name' => 'School Admin',
                'description' => 'Has access to manage their school',
                'permissions' => json_encode([
                    'users.view', 'users.create', 'users.edit',
                    'classes.view', 'classes.create', 'classes.edit', 'classes.delete',
                    'subjects.view',
                    'lessons.view',
                    'reports.view', 'reports.create'
                ])
            ],
            [
                'name' => 'Teacher',
                'description' => 'Has access to teach and manage classes',
                'permissions' => json_encode([
                    'classes.view', 'classes.edit',
                    'subjects.view',
                    'lessons.view', 'lessons.create',
                    'quizzes.view', 'quizzes.create', 'quizzes.edit',
                    'assignments.view', 'assignments.create', 'assignments.edit',
                    'grades.view', 'grades.create', 'grades.edit',
                    'reports.view', 'reports.create'
                ])
            ],
            [
                'name' => 'Student',
                'description' => 'Has access to learn and submit assignments',
                'permissions' => json_encode([
                    'subjects.view',
                    'lessons.view',
                    'quizzes.view',
                    'assignments.view',
                    'grades.view'
                ])
            ],
            [
                'name' => 'Parent',
                'description' => 'Has access to view their child\'s progress',
                'permissions' => json_encode([
                    'grades.view',
                    'reports.view',
                    'attendance.view'
                ])
            ],
            [
                'name' => 'Government Official',
                'description' => 'Has access to view school statistics',
                'permissions' => json_encode([
                    'schools.view',
                    'reports.view'
                ])
            ],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
