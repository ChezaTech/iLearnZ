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
        // ]);
        
        // Use our comprehensive system seeder instead
        $this->call([
            CompleteSystemSeeder::class,
            DemoUsersSeeder::class, // Add demo users for login-as feature
        ]);
    }
}
