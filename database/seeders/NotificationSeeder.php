<?php

namespace Database\Seeders;

use App\Models\Notification;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notifications = [
            // Notifications for John Smith (Teacher)
            [
                'user_id' => 3, // John Smith
                'title' => 'New Assignment Submissions',
                'content' => 'You have 3 new assignment submissions to grade.',
                'type' => 'info',
                'is_read' => true,
                'link' => '/teacher/assignments/submissions',
                'read_at' => '2025-03-05 10:15:00',
            ],
            [
                'user_id' => 3, // John Smith
                'title' => 'Staff Meeting Reminder',
                'content' => 'Reminder: Staff meeting tomorrow at 14:00 in the conference room.',
                'type' => 'warning',
                'is_read' => false,
                'link' => '/calendar/events/45',
                'read_at' => null,
            ],
            
            // Notifications for Mary Johnson (Teacher)
            [
                'user_id' => 4, // Mary Johnson
                'title' => 'New Assignment Submissions',
                'content' => 'You have 2 new assignment submissions to grade.',
                'type' => 'info',
                'is_read' => false,
                'link' => '/teacher/assignments/submissions',
                'read_at' => null,
            ],
            [
                'user_id' => 4, // Mary Johnson
                'title' => 'Term Reports Due',
                'content' => 'Reminder: Term 1 reports are due by Friday.',
                'type' => 'warning',
                'is_read' => true,
                'link' => '/teacher/reports',
                'read_at' => '2025-03-04 16:30:00',
            ],
            
            // Notifications for David Moyo (Teacher)
            [
                'user_id' => 5, // David Moyo
                'title' => 'Device Maintenance Alert',
                'content' => 'Smartboard BPS-002 has been scheduled for maintenance.',
                'type' => 'info',
                'is_read' => true,
                'link' => '/devices/status',
                'read_at' => '2025-03-03 09:45:00',
            ],
            
            // Notifications for Tendai Mutasa (Student)
            [
                'user_id' => 6, // Tendai Mutasa
                'title' => 'Assignment Graded',
                'content' => 'Your Algebra Practice Problems assignment has been graded.',
                'type' => 'success',
                'is_read' => true,
                'link' => '/student/assignments/1/feedback',
                'read_at' => '2025-03-19 15:20:00',
            ],
            [
                'user_id' => 6, // Tendai Mutasa
                'title' => 'New Assignment',
                'content' => 'New assignment posted: Essay on Environmental Conservation.',
                'type' => 'info',
                'is_read' => true,
                'link' => '/student/assignments/2',
                'read_at' => '2025-03-15 14:10:00',
            ],
            [
                'user_id' => 6, // Tendai Mutasa
                'title' => 'Assignment Due Soon',
                'content' => 'Reminder: Your Essay on Environmental Conservation is due in 2 days.',
                'type' => 'warning',
                'is_read' => false,
                'link' => '/student/assignments/2',
                'read_at' => null,
            ],
            
            // Notifications for Chipo Dziva (Student)
            [
                'user_id' => 7, // Chipo Dziva
                'title' => 'Assignment Graded',
                'content' => 'Your Quadratic Equations Worksheet assignment has been graded.',
                'type' => 'success',
                'is_read' => true,
                'link' => '/student/assignments/3/feedback',
                'read_at' => '2025-03-23 12:30:00',
            ],
            [
                'user_id' => 7, // Chipo Dziva
                'title' => 'New Assignment',
                'content' => 'New assignment posted: Cell Structure Diagram.',
                'type' => 'info',
                'is_read' => true,
                'link' => '/student/assignments/4',
                'read_at' => '2025-03-20 09:15:00',
            ],
            
            // Notifications for Tafara Ncube (Student)
            [
                'user_id' => 8, // Tafara Ncube
                'title' => 'Assignment Graded',
                'content' => 'Your Parts of Speech Identification assignment has been graded.',
                'type' => 'success',
                'is_read' => false,
                'link' => '/student/assignments/5/feedback',
                'read_at' => null,
            ],
            
            // Notifications for Rudo Sibanda (Student)
            [
                'user_id' => 9, // Rudo Sibanda
                'title' => 'Assignment Graded',
                'content' => 'Your Fractions and Decimals assignment has been graded.',
                'type' => 'success',
                'is_read' => true,
                'link' => '/student/assignments/7/feedback',
                'read_at' => '2025-03-22 15:45:00',
            ],
            [
                'user_id' => 9, // Rudo Sibanda
                'title' => 'Assignment Due Today',
                'content' => 'Reminder: Your Map of Zimbabwe assignment is due today.',
                'type' => 'warning',
                'is_read' => true,
                'link' => '/student/assignments/8',
                'read_at' => '2025-03-30 08:30:00',
            ],
        ];

        foreach ($notifications as $notification) {
            Notification::create($notification);
        }
    }
}
