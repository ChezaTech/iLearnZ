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
        // Comment out existing seeders that have already been run to avoid unique constraint violations
        // $this->call([
        //     RoleSeeder::class,
        //     SchoolSeeder::class,
        //     UserSeeder::class,
        //     SubjectSeeder::class,
        //     ClassSeeder::class,
        //     EnrollmentSeeder::class,
        //     LessonSeeder::class,
        //     ResourceSeeder::class,
        //     QuizSeeder::class,
        //     QuestionSeeder::class,
        //     AnswerSeeder::class,
        //     AssignmentSeeder::class,
        //     SubmissionSeeder::class,
        //     AttendanceSeeder::class,
        //     GradeSeeder::class,
        //     ProgressSeeder::class,
        //     ReportSeeder::class,
        //     DeviceSeeder::class,
        //     SyncLogSeeder::class,
        //     NotificationSeeder::class,
        // ]);
        
        // Run only the new seeders
        $this->call([
            SchoolDistrictSeeder::class,
            AcademicTermSeeder::class,
            ParentStudentSeeder::class,
            ReportCardSeeder::class,
            StudentPerformanceSeeder::class,
            ParentCommunicationSeeder::class,
            GovernmentReportSeeder::class,
            SchoolResourceSeeder::class,
            SchoolEventSeeder::class,
        ]);
    }
}
