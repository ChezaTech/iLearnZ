<?php

namespace Database\Seeders;

use App\Models\ParentCommunication;
use Illuminate\Database\Seeder;

class ParentCommunicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $communications = [
            // Communications between Mr. Mutasa (parent_id: 11) and John Smith (teacher_id: 4) about Tendai Mutasa (student_id: 7)
            [
                'parent_id' => 11,
                'teacher_id' => 4,
                'student_id' => 7,
                'subject' => 'Homework Concern',
                'message' => 'Dear Mr. Smith, I noticed Tendai has been struggling with the recent mathematics homework. Could we discuss some strategies to help him improve?',
                'type' => 'general',
                'is_read' => true,
                'read_at' => '2025-02-15 10:30:00',
                'requires_response' => true,
                'response' => 'Dear Mr. Mutasa, I would be happy to discuss this. Tendai is doing well overall but seems to struggle with geometry concepts. I can provide some additional resources and would suggest 30 minutes of extra practice each day. Would you be available for a meeting next Tuesday at 3pm?',
                'responded_at' => '2025-02-15 14:45:00',
            ],
            [
                'parent_id' => 11,
                'teacher_id' => 4,
                'student_id' => 7,
                'subject' => 'Upcoming Science Fair',
                'message' => 'Hello Mr. Smith, I wanted to ask about the upcoming science fair. Tendai is very excited about it but we are unsure about the requirements and deadlines.',
                'type' => 'general',
                'is_read' => true,
                'read_at' => '2025-02-20 09:15:00',
                'requires_response' => true,
                'response' => 'Hello Mr. Mutasa, the science fair will be held on March 15th. Projects should be submitted by March 10th. Students need to prepare a display board and a 5-minute presentation. The theme this year is "Sustainable Energy". I will send home a detailed information packet with Tendai tomorrow.',
                'responded_at' => '2025-02-20 15:30:00',
            ],
            
            // Communications between Mrs. Ncube (parent_id: 12) and David Moyo (teacher_id: 6) about Tafara Ncube (student_id: 9)
            [
                'parent_id' => 12,
                'teacher_id' => 6,
                'student_id' => 9,
                'subject' => 'Reading Improvement',
                'message' => 'Dear Mr. Moyo, I am concerned about Tafara\'s reading skills. His last report card mentioned he needs improvement in this area. What can we do at home to support his learning?',
                'type' => 'academic',
                'is_read' => true,
                'read_at' => '2025-02-18 11:20:00',
                'requires_response' => true,
                'response' => 'Dear Mrs. Ncube, thank you for your concern. I recommend setting aside 20 minutes each day for reading practice. I will send home some grade-appropriate books that Tafara can practice with. Also, asking him questions about what he\'s read will help improve his comprehension. Let\'s schedule a follow-up in two weeks to assess his progress.',
                'responded_at' => '2025-02-18 16:00:00',
            ],
            [
                'parent_id' => 12,
                'teacher_id' => 6,
                'student_id' => 9,
                'subject' => 'Art Program Participation',
                'message' => 'Hello Mr. Moyo, Tafara has shown great interest in art. Are there any special art programs or activities at school that he could participate in to develop this talent?',
                'type' => 'general',
                'is_read' => true,
                'read_at' => '2025-02-25 10:45:00',
                'requires_response' => true,
                'response' => 'Hello Mrs. Ncube, yes, Tafara has shown exceptional talent in art! We have an after-school art club that meets on Wednesdays from 2-3:30pm. Additionally, we will be having an art exhibition in April where students can showcase their work. I would highly recommend enrolling him in the art club - I can provide the registration form if you\'re interested.',
                'responded_at' => '2025-02-25 13:15:00',
            ],
            
            // Unread/new communications
            [
                'parent_id' => 11,
                'teacher_id' => 5, // Mary Johnson
                'student_id' => 8, // Chipo Dziva
                'subject' => 'Academic Excellence Recognition',
                'message' => 'Dear Ms. Johnson, I wanted to thank you for recognizing Chipo\'s hard work in your class. She was very proud to receive the Student of the Month certificate. We appreciate your dedication to encouraging the students.',
                'type' => 'general',
                'is_read' => false,
                'requires_response' => false,
            ],
            [
                'parent_id' => 12,
                'teacher_id' => 6, // David Moyo
                'student_id' => 10, // Rudo Sibanda
                'subject' => 'Music Program Inquiry',
                'message' => 'Dear Mr. Moyo, Rudo has been talking about joining the school choir. Could you please provide information about auditions and rehearsal schedules? She is very passionate about music and we would like to support this interest.',
                'type' => 'general',
                'is_read' => false,
                'requires_response' => true,
            ],
        ];

        foreach ($communications as $communication) {
            ParentCommunication::create($communication);
        }
    }
}
