<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call all seeders in the correct order to maintain data integrity
        $this->call([
            RoleSeeder::class,
            SchoolSeeder::class,
            UserSeeder::class,
            SubjectSeeder::class,
            ClassSeeder::class,
            EnrollmentSeeder::class,
            LessonSeeder::class,
            ResourceSeeder::class,
            QuizSeeder::class,
            QuestionSeeder::class,
            AnswerSeeder::class,
            AssignmentSeeder::class,
            SubmissionSeeder::class,
            AttendanceSeeder::class,
            GradeSeeder::class,
            ProgressSeeder::class,
            ReportSeeder::class,
            DeviceSeeder::class,
            SyncLogSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
