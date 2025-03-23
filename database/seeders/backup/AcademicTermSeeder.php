<?php

namespace Database\Seeders;

use App\Models\AcademicTerm;
use Illuminate\Database\Seeder;

class AcademicTermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Zimbabwe typically follows a three-term academic year
        $academicTerms = [
            // School 1 - Harare High School (2025 Academic Year)
            [
                'name' => 'Term 1',
                'academic_year' => '2025',
                'start_date' => '2025-01-13', // Zimbabwe schools typically start in January
                'end_date' => '2025-04-03',
                'exam_start_date' => '2025-03-20',
                'exam_end_date' => '2025-04-01',
                'report_card_date' => '2025-04-03',
                'is_current' => true,
                'school_id' => 1,
            ],
            [
                'name' => 'Term 2',
                'academic_year' => '2025',
                'start_date' => '2025-05-05', // Second term typically starts in May
                'end_date' => '2025-08-07',
                'exam_start_date' => '2025-07-24',
                'exam_end_date' => '2025-08-05',
                'report_card_date' => '2025-08-07',
                'is_current' => false,
                'school_id' => 1,
            ],
            [
                'name' => 'Term 3',
                'academic_year' => '2025',
                'start_date' => '2025-09-08', // Third term typically starts in September
                'end_date' => '2025-12-04',
                'exam_start_date' => '2025-11-20',
                'exam_end_date' => '2025-12-02',
                'report_card_date' => '2025-12-04',
                'is_current' => false,
                'school_id' => 1,
            ],
            
            // School 2 - St George's College (2025 Academic Year)
            [
                'name' => 'Term 1',
                'academic_year' => '2025',
                'start_date' => '2025-01-13',
                'end_date' => '2025-04-03',
                'exam_start_date' => '2025-03-20',
                'exam_end_date' => '2025-04-01',
                'report_card_date' => '2025-04-03',
                'is_current' => true,
                'school_id' => 2,
            ],
            [
                'name' => 'Term 2',
                'academic_year' => '2025',
                'start_date' => '2025-05-05',
                'end_date' => '2025-08-07',
                'exam_start_date' => '2025-07-24',
                'exam_end_date' => '2025-08-05',
                'report_card_date' => '2025-08-07',
                'is_current' => false,
                'school_id' => 2,
            ],
            [
                'name' => 'Term 3',
                'academic_year' => '2025',
                'start_date' => '2025-09-08',
                'end_date' => '2025-12-04',
                'exam_start_date' => '2025-11-20',
                'exam_end_date' => '2025-12-02',
                'report_card_date' => '2025-12-04',
                'is_current' => false,
                'school_id' => 2,
            ],
            
            // School 3 - Prince Edward School (2025 Academic Year)
            [
                'name' => 'Term 1',
                'academic_year' => '2025',
                'start_date' => '2025-01-13',
                'end_date' => '2025-04-03',
                'exam_start_date' => '2025-03-20',
                'exam_end_date' => '2025-04-01',
                'report_card_date' => '2025-04-03',
                'is_current' => true,
                'school_id' => 3,
            ],
            [
                'name' => 'Term 2',
                'academic_year' => '2025',
                'start_date' => '2025-05-05',
                'end_date' => '2025-08-07',
                'exam_start_date' => '2025-07-24',
                'exam_end_date' => '2025-08-05',
                'report_card_date' => '2025-08-07',
                'is_current' => false,
                'school_id' => 3,
            ],
            [
                'name' => 'Term 3',
                'academic_year' => '2025',
                'start_date' => '2025-09-08',
                'end_date' => '2025-12-04',
                'exam_start_date' => '2025-11-20',
                'exam_end_date' => '2025-12-02',
                'report_card_date' => '2025-12-04',
                'is_current' => false,
                'school_id' => 3,
            ],
        ];

        foreach ($academicTerms as $term) {
            // Check if the term already exists
            $exists = AcademicTerm::where([
                ['name', '=', $term['name']],
                ['academic_year', '=', $term['academic_year']],
                ['school_id', '=', $term['school_id']],
            ])->exists();
            
            if (!$exists) {
                AcademicTerm::create($term);
            }
        }
    }
}
