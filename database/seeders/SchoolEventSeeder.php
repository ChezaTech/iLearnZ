<?php

namespace Database\Seeders;

use App\Models\SchoolEvent;
use Illuminate\Database\Seeder;

class SchoolEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            // Harare High School Events
            [
                'school_id' => 1,
                'title' => 'Annual Science Fair',
                'description' => 'Showcase of student science projects with prizes for top innovations',
                'event_type' => 'academic',
                'start_date' => '2025-03-15 09:00:00',
                'end_date' => '2025-03-15 16:00:00',
                'location' => 'School Main Hall',
                'organizer_id' => 4, // John Smith (teacher)
                'is_public' => true,
                'requires_registration' => true,
                'max_participants' => 200,
                'registration_deadline' => '2025-03-10',
                'status' => 'scheduled',
                'notes' => 'Students should prepare display boards and 5-minute presentations',
            ],
            [
                'school_id' => 1,
                'title' => 'Parent-Teacher Conference',
                'description' => 'Term 1 parent-teacher meetings to discuss student progress',
                'event_type' => 'meeting',
                'start_date' => '2025-04-05 14:00:00',
                'end_date' => '2025-04-05 18:00:00',
                'location' => 'School Classrooms',
                'organizer_id' => 2, // Harare High Admin
                'is_public' => false,
                'requires_registration' => true,
                'max_participants' => null,
                'registration_deadline' => '2025-04-03',
                'status' => 'scheduled',
                'notes' => 'Parents should book 15-minute slots with specific teachers',
            ],
            [
                'school_id' => 1,
                'title' => 'Inter-School Sports Tournament',
                'description' => 'Annual sports competition between Harare district schools',
                'event_type' => 'sports',
                'start_date' => '2025-05-10 08:00:00',
                'end_date' => '2025-05-12 17:00:00',
                'location' => 'School Sports Grounds',
                'organizer_id' => 5, // Mary Johnson (teacher)
                'is_public' => true,
                'requires_registration' => true,
                'max_participants' => 500,
                'registration_deadline' => '2025-05-01',
                'status' => 'scheduled',
                'notes' => 'Events include football, netball, athletics, and swimming',
            ],
            
            // Bulawayo Primary School Events
            [
                'school_id' => 2,
                'title' => 'Reading Week',
                'description' => 'Week-long celebration of reading with special activities and guest authors',
                'event_type' => 'academic',
                'start_date' => '2025-03-01 08:00:00',
                'end_date' => '2025-03-05 15:00:00',
                'location' => 'School Library and Classrooms',
                'organizer_id' => 6, // David Moyo (teacher)
                'is_public' => false,
                'requires_registration' => false,
                'max_participants' => null,
                'registration_deadline' => null,
                'status' => 'scheduled',
                'notes' => 'Students should bring their favorite books to share',
            ],
            [
                'school_id' => 2,
                'title' => 'Cultural Day Celebration',
                'description' => 'Celebration of Zimbabwe\'s cultural diversity with performances, food, and traditional activities',
                'event_type' => 'cultural',
                'start_date' => '2025-04-20 10:00:00',
                'end_date' => '2025-04-20 16:00:00',
                'location' => 'School Grounds',
                'organizer_id' => 3, // Bulawayo Primary Admin
                'is_public' => true,
                'requires_registration' => false,
                'max_participants' => null,
                'registration_deadline' => null,
                'status' => 'scheduled',
                'notes' => 'Students are encouraged to wear traditional attire',
            ],
            [
                'school_id' => 2,
                'title' => 'End of Year Concert',
                'description' => 'Annual music and drama performance showcasing student talents',
                'event_type' => 'performance',
                'start_date' => '2025-11-25 18:00:00',
                'end_date' => '2025-11-25 20:30:00',
                'location' => 'School Hall',
                'organizer_id' => 6, // David Moyo (teacher)
                'is_public' => true,
                'requires_registration' => true,
                'max_participants' => 300,
                'registration_deadline' => '2025-11-20',
                'status' => 'planning',
                'notes' => 'Tickets will be available for purchase from the school office',
            ],
            
            // District-wide Events
            [
                'school_id' => null,
                'title' => 'District Teacher Development Workshop',
                'description' => 'Professional development workshop for all district teachers',
                'event_type' => 'training',
                'start_date' => '2025-04-15 09:00:00',
                'end_date' => '2025-04-16 16:00:00',
                'location' => 'District Education Office',
                'organizer_id' => 13, // Education Minister
                'is_public' => false,
                'requires_registration' => true,
                'max_participants' => 200,
                'registration_deadline' => '2025-04-10',
                'status' => 'scheduled',
                'notes' => 'Teachers should bring laptops and teaching materials',
            ],
            [
                'school_id' => null,
                'title' => 'National Examination Preparation Conference',
                'description' => 'Conference to prepare schools for upcoming national examinations',
                'event_type' => 'meeting',
                'start_date' => '2025-06-05 09:00:00',
                'end_date' => '2025-06-05 15:00:00',
                'location' => 'ZIMSEC Headquarters',
                'organizer_id' => 14, // ZIMSEC Director
                'is_public' => false,
                'requires_registration' => true,
                'max_participants' => 100,
                'registration_deadline' => '2025-06-01',
                'status' => 'scheduled',
                'notes' => 'Each school should send at least one representative',
            ],
        ];

        foreach ($events as $event) {
            SchoolEvent::create($event);
        }
    }
}
