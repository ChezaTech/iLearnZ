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
        if (!User::where('email', 'admin@iLearn.com')->exists()) {
            User::create([
            'name' => 'System Administrator',
            'email' => 'admin@iLearn.com',
            'password' => Hash::make('password'),
            'role_id' => 1, // Super Admin
            'user_type' => 'admin',
            'phone_number' => '+263 77 123 4567',
            'is_active' => true,
        ]);
        }

        // School Admins - Using Zimbabwean names
        $schoolAdmins = [
            [
                'name' => 'Takudzwa Mhaka',
                'email' => 'admin@hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 2, // School Admin
                'school_id' => 1,
                'user_type' => 'admin',
                'phone_number' => '+263 77 234 5678',
                'is_active' => true,
            ],
            [
                'name' => 'Sibongile Ndlovu',
                'email' => 'admin@stgeorges.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 2, // School Admin
                'school_id' => 2,
                'user_type' => 'admin',
                'phone_number' => '+263 77 345 6789',
                'is_active' => true,
            ],
            [
                'name' => 'Tinashe Makoni',
                'email' => 'admin@princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 2, // School Admin
                'school_id' => 3,
                'user_type' => 'admin',
                'phone_number' => '+263 77 456 7890',
                'is_active' => true,
            ],
        ];

        foreach ($schoolAdmins as $admin) {
            if (!User::where('email', $admin['email'])->exists()) {
                User::create($admin);
            }
        }

        // Teachers - Using Zimbabwean names and subjects common in Zimbabwe's curriculum
        $teachers = [
            // Harare High School Teachers
            [
                'name' => 'Tatenda Gumbo',
                'email' => 'tgumbo@hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 1,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 456 7890',
                'is_active' => true,
                'preferences' => json_encode(['subjects' => ['Mathematics', 'Additional Mathematics']]),
            ],
            [
                'name' => 'Vimbai Chikerema',
                'email' => 'vchikerema@hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 1,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 567 8901',
                'is_active' => true,
                'preferences' => json_encode(['subjects' => ['English Language', 'English Literature']]),
            ],
            [
                'name' => 'Blessing Moyo',
                'email' => 'bmoyo@hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 1,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 678 9012',
                'is_active' => true,
                'preferences' => json_encode(['subjects' => ['Geography', 'History']]),
            ],
            // St. George's College Teachers
            [
                'name' => 'Farai Mutasa',
                'email' => 'fmutasa@stgeorges.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 2,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 789 0123',
                'is_active' => true,
                'preferences' => json_encode(['subjects' => ['Physics', 'Chemistry']]),
            ],
            [
                'name' => 'Nyasha Chigumba',
                'email' => 'nchigumba@stgeorges.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 2,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 890 1234',
                'is_active' => true,
                'preferences' => json_encode(['subjects' => ['Biology', 'Agriculture']]),
            ],
            // Prince Edward School Teachers
            [
                'name' => 'Tonderai Mujuru',
                'email' => 'tmujuru@princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 3,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 901 2345',
                'is_active' => true,
                'preferences' => json_encode(['subjects' => ['Computer Science', 'Business Studies']]),
            ],
            [
                'name' => 'Rumbidzai Zulu',
                'email' => 'rzulu@princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 3, // Teacher
                'school_id' => 3,
                'user_type' => 'teacher',
                'phone_number' => '+263 77 012 3456',
                'is_active' => true,
                'preferences' => json_encode(['subjects' => ['Shona', 'Ndebele']]),
            ],
        ];

        foreach ($teachers as $teacher) {
            if (!User::where('email', $teacher['email'])->exists()) {
                User::create($teacher);
            }
        }

        // Students - Using common Zimbabwean names
        $students = [
            // Harare High School Students (Form 4-6 students, ages 16-18)
            [
                'name' => 'Tendai Mutasa',
                'email' => 'tmutasa@student.hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 1,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 5',
                    'date_of_birth' => '2008-05-15',
                    'subjects' => ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Geography']
                ]),
            ],
            [
                'name' => 'Chipo Dziva',
                'email' => 'cdziva@student.hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 1,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 4',
                    'date_of_birth' => '2009-08-22',
                    'subjects' => ['Mathematics', 'English', 'History', 'Geography', 'Shona', 'Computer Science']
                ]),
            ],
            [
                'name' => 'Kudzai Manyika',
                'email' => 'kmanyika@student.hararehigh.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 1,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 6',
                    'date_of_birth' => '2007-03-10',
                    'subjects' => ['Mathematics', 'English', 'Physics', 'Chemistry', 'Computer Science']
                ]),
            ],
            // St. George's College Students
            [
                'name' => 'Tafara Ncube',
                'email' => 'tncube@student.stgeorges.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 2,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 3',
                    'date_of_birth' => '2010-11-05',
                    'subjects' => ['Mathematics', 'English', 'Science', 'Geography', 'Ndebele', 'Agriculture']
                ]),
            ],
            [
                'name' => 'Rudo Sibanda',
                'email' => 'rsibanda@student.stgeorges.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 2,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 2',
                    'date_of_birth' => '2011-07-18',
                    'subjects' => ['Mathematics', 'English', 'Science', 'History', 'Ndebele', 'Art']
                ]),
            ],
            // Prince Edward School Students
            [
                'name' => 'Tatenda Moyo',
                'email' => 'tmoyo@student.princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 3,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 4',
                    'date_of_birth' => '2009-04-30',
                    'subjects' => ['Mathematics', 'English', 'Physics', 'Chemistry', 'Business Studies']
                ]),
            ],
            [
                'name' => 'Nyasha Mpofu',
                'email' => 'nmpofu@student.princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 3,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 5',
                    'date_of_birth' => '2008-09-12',
                    'subjects' => ['Mathematics', 'English', 'Biology', 'Chemistry', 'Computer Science']
                ]),
            ],
            [
                'name' => 'Simba Dube',
                'email' => 'sdube@student.princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 3,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 3',
                    'date_of_birth' => '2010-06-25',
                    'subjects' => ['Mathematics', 'English', 'Geography', 'History', 'Shona']
                ]),
            ],
            [
                'name' => 'Kudzai Chigumba',
                'email' => 'kchigumba@student.princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 3,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 2',
                    'date_of_birth' => '2011-12-03',
                    'subjects' => ['Mathematics', 'English', 'Science', 'Geography', 'Shona']
                ]),
            ],
            [
                'name' => 'Farai Chirwa',
                'email' => 'fchirwa@student.princeedward.edu.zw',
                'password' => Hash::make('password'),
                'role_id' => 4, // Student
                'school_id' => 3,
                'user_type' => 'student',
                'is_active' => true,
                'preferences' => json_encode([
                    'grade' => 'Form 1',
                    'date_of_birth' => '2012-02-15',
                    'subjects' => ['Mathematics', 'English', 'Science', 'History', 'Shona']
                ]),
            ],
        ];

        foreach ($students as $student) {
            if (!User::where('email', $student['email'])->exists()) {
                User::create($student);
            }
        }

        // Parents - Using common Zimbabwean names and occupations
        $parents = [
            // Parents for Harare High School students
            [
                'name' => 'Mr. Tapiwa Mutasa',
                'email' => 'tmutasa.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 1,
                'user_type' => 'parent',
                'phone_number' => '+263 77 789 0123',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Bank Manager',
                    'address' => '25 Samora Machel Avenue, Harare',
                ]),
            ],
            [
                'name' => 'Mrs. Tsitsi Dziva',
                'email' => 'tdziva.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 1,
                'user_type' => 'parent',
                'phone_number' => '+263 77 890 1234',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Doctor',
                    'address' => '42 Churchill Avenue, Harare',
                ]),
            ],
            [
                'name' => 'Mr. Fungai Manyika',
                'email' => 'fmanyika.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 1,
                'user_type' => 'parent',
                'phone_number' => '+263 77 901 2345',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Engineer',
                    'address' => '15 Borrowdale Road, Harare',
                ]),
            ],
            // Parents for St. George's College students
            [
                'name' => 'Mr. Themba Ncube',
                'email' => 'tncube.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 2,
                'user_type' => 'parent',
                'phone_number' => '+263 77 012 3456',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Lawyer',
                    'address' => '78 Fife Avenue, Harare',
                ]),
            ],
            [
                'name' => 'Mrs. Nomsa Sibanda',
                'email' => 'nsibanda.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 2,
                'user_type' => 'parent',
                'phone_number' => '+263 77 123 4567',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Teacher',
                    'address' => '32 Enterprise Road, Harare',
                ]),
            ],
            // Parents for Prince Edward School students
            [
                'name' => 'Mr. Simbarashe Moyo',
                'email' => 'smoyo.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 3,
                'user_type' => 'parent',
                'phone_number' => '+263 77 234 5678',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Businessman',
                    'address' => '45 Second Street, Harare',
                ]),
            ],
            [
                'name' => 'Mrs. Rutendo Mpofu',
                'email' => 'rmpofu.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 3,
                'user_type' => 'parent',
                'phone_number' => '+263 77 345 6789',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Accountant',
                    'address' => '12 Lomagundi Road, Harare',
                ]),
            ],
            [
                'name' => 'Mr. Tawanda Dube',
                'email' => 'tdube.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 3,
                'user_type' => 'parent',
                'phone_number' => '+263 77 456 7890',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Civil Servant',
                    'address' => '67 Harare Drive, Harare',
                ]),
            ],
            [
                'name' => 'Mrs. Nyaradzo Chigumba',
                'email' => 'nchigumba.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 3,
                'user_type' => 'parent',
                'phone_number' => '+263 77 567 8901',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Nurse',
                    'address' => '23 Mazowe Street, Harare',
                ]),
            ],
            [
                'name' => 'Mr. Tinashe Chirwa',
                'email' => 'tchirwa.parent@gmail.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Parent
                'school_id' => 3,
                'user_type' => 'parent',
                'phone_number' => '+263 77 678 9012',
                'is_active' => true,
                'preferences' => json_encode([
                    'occupation' => 'Pastor',
                    'address' => '89 Kwame Nkrumah Avenue, Harare',
                ]),
            ],
        ];

        foreach ($parents as $parent) {
            if (!User::where('email', $parent['email'])->exists()) {
                User::create($parent);
            }
        }

        // Government Officials - Using realistic Zimbabwean government positions
        $officials = [
            [
                'name' => 'Hon. Tafadzwa Mugwadi',
                'email' => 'minister@education.gov.zw',
                'password' => Hash::make('password'),
                'role_id' => 6, // Government Official
                'user_type' => 'government',
                'phone_number' => '+263 77 901 2345',
                'is_active' => true,
                'preferences' => json_encode([
                    'position' => 'Minister of Primary and Secondary Education',
                    'office' => 'Ministry of Primary and Secondary Education, Ambassador House, Harare',
                ]),
            ],
            [
                'name' => 'Dr. Lazarus Dokora',
                'email' => 'director@zimsec.gov.zw',
                'password' => Hash::make('password'),
                'role_id' => 6, // Government Official
                'user_type' => 'government',
                'phone_number' => '+263 77 012 3456',
                'is_active' => true,
                'preferences' => json_encode([
                    'position' => 'Director of Zimbabwe School Examinations Council (ZIMSEC)',
                    'office' => 'ZIMSEC Head Office, Upper East Road, Mount Pleasant, Harare',
                ]),
            ],
            [
                'name' => 'Mrs. Evelyn Ndlovu',
                'email' => 'ps@education.gov.zw',
                'password' => Hash::make('password'),
                'role_id' => 6, // Government Official
                'user_type' => 'government',
                'phone_number' => '+263 77 123 4567',
                'is_active' => true,
                'preferences' => json_encode([
                    'position' => 'Permanent Secretary of Education',
                    'office' => 'Ministry of Primary and Secondary Education, Ambassador House, Harare',
                ]),
            ],
            [
                'name' => 'Dr. Tumisang Thabela',
                'email' => 'inspector@education.gov.zw',
                'password' => Hash::make('password'),
                'role_id' => 6, // Government Official
                'user_type' => 'government',
                'phone_number' => '+263 77 234 5678',
                'is_active' => true,
                'preferences' => json_encode([
                    'position' => 'Chief Inspector of Schools',
                    'office' => 'Ministry of Primary and Secondary Education, Ambassador House, Harare',
                ]),
            ],
            [
                'name' => 'Mr. Gibson Mandishona',
                'email' => 'director@curriculum.gov.zw',
                'password' => Hash::make('password'),
                'role_id' => 6, // Government Official
                'user_type' => 'government',
                'phone_number' => '+263 77 345 6789',
                'is_active' => true,
                'preferences' => json_encode([
                    'position' => 'Director of Curriculum Development',
                    'office' => 'Curriculum Development Unit, Harare',
                ]),
            ],
        ];

        foreach ($officials as $official) {
            if (!User::where('email', $official['email'])->exists()) {
                User::create($official);
            }
        }
    }
}
