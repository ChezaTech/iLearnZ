<?php

namespace Database\Seeders;

use App\Models\GovernmentReport;
use Illuminate\Database\Seeder;

class GovernmentReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reports = [
            // District-level reports
            [
                'title' => 'Harare Metropolitan District Education Performance Report',
                'report_type' => 'district_performance',
                'report_date' => '2025-04-15',
                'academic_year' => '2025',
                'term' => 'Term 1',
                'district_id' => 1,
                'school_id' => null,
                'report_data' => json_encode([
                    'total_schools' => 45,
                    'total_students' => 28500,
                    'total_teachers' => 1250,
                    'average_pass_rate' => 76.5,
                    'attendance_rate' => 92.3,
                    'top_performing_schools' => [
                        ['name' => 'Harare High School', 'pass_rate' => 94.2],
                        ['name' => 'St. Mary\'s Academy', 'pass_rate' => 92.8],
                        ['name' => 'Prince Edward School', 'pass_rate' => 91.5],
                    ],
                    'subject_performance' => [
                        ['subject' => 'Mathematics', 'average_score' => 68.5],
                        ['subject' => 'English', 'average_score' => 72.3],
                        ['subject' => 'Science', 'average_score' => 70.1],
                        ['subject' => 'History', 'average_score' => 75.8],
                    ],
                    'resource_allocation' => [
                        'textbooks_per_student' => 3.2,
                        'computers_per_school' => 24.5,
                        'teacher_to_student_ratio' => '1:22.8',
                    ],
                ]),
                'summary' => 'The Harare Metropolitan District has shown improvement in overall academic performance compared to the previous year. The average pass rate has increased by 2.3%, and attendance rates remain high. However, there are still challenges in mathematics performance that need to be addressed.',
                'recommendations' => 'Implement targeted mathematics intervention programs across the district. Increase resource allocation for STEM subjects. Organize district-wide teacher training workshops focusing on modern teaching methodologies.',
                'status' => 'approved',
                'created_by' => 13, // Education Minister
                'approved_by' => 14, // ZIMSEC Director
                'approved_at' => '2025-04-20 14:30:00',
            ],
            [
                'title' => 'Bulawayo Metropolitan District Technology Integration Report',
                'report_type' => 'technology_assessment',
                'report_date' => '2025-04-10',
                'academic_year' => '2025',
                'term' => 'Term 1',
                'district_id' => 2,
                'school_id' => null,
                'report_data' => json_encode([
                    'total_schools' => 38,
                    'schools_with_internet' => 32,
                    'internet_connectivity_rate' => 84.2,
                    'student_to_computer_ratio' => '18:1',
                    'schools_with_smartboards' => 24,
                    'teacher_tech_proficiency' => [
                        ['level' => 'Advanced', 'percentage' => 25],
                        ['level' => 'Intermediate', 'percentage' => 45],
                        ['level' => 'Basic', 'percentage' => 30],
                    ],
                    'digital_resources_usage' => [
                        ['resource' => 'Educational Software', 'usage_rate' => 68.5],
                        ['resource' => 'Online Learning Platforms', 'usage_rate' => 72.3],
                        ['resource' => 'Digital Textbooks', 'usage_rate' => 45.8],
                        ['resource' => 'Educational Apps', 'usage_rate' => 52.1],
                    ],
                ]),
                'summary' => 'Bulawayo Metropolitan District has made significant progress in technology integration in schools. Most schools now have internet connectivity, and there is increasing adoption of digital learning resources. However, teacher technology proficiency remains a challenge that needs to be addressed.',
                'recommendations' => 'Implement comprehensive teacher technology training programs. Increase investment in digital textbooks and educational software. Establish a district-wide technology support team to assist schools with implementation and troubleshooting.',
                'status' => 'submitted',
                'created_by' => 14, // ZIMSEC Director
                'approved_by' => null,
                'approved_at' => null,
            ],
            
            // School-level reports
            [
                'title' => 'Harare High School Annual Performance Report',
                'report_type' => 'school_performance',
                'report_date' => '2025-04-05',
                'academic_year' => '2025',
                'term' => 'Term 1',
                'district_id' => 1,
                'school_id' => 1,
                'report_data' => json_encode([
                    'total_students' => 1250,
                    'total_teachers' => 65,
                    'pass_rate' => 94.2,
                    'attendance_rate' => 95.8,
                    'graduation_rate' => 98.3,
                    'university_acceptance_rate' => 85.2,
                    'subject_performance' => [
                        ['subject' => 'Mathematics', 'average_score' => 82.5],
                        ['subject' => 'English', 'average_score' => 86.3],
                        ['subject' => 'Science', 'average_score' => 84.1],
                        ['subject' => 'History', 'average_score' => 88.8],
                    ],
                    'extracurricular_participation' => 78.5,
                    'teacher_qualifications' => [
                        ['qualification' => 'Masters Degree', 'percentage' => 35],
                        ['qualification' => 'Bachelors Degree', 'percentage' => 60],
                        ['qualification' => 'Diploma', 'percentage' => 5],
                    ],
                ]),
                'summary' => 'Harare High School continues to demonstrate excellent academic performance with high pass rates and university acceptance rates. The school maintains strong performance across all subject areas and has high student participation in extracurricular activities.',
                'recommendations' => 'Continue to strengthen the mathematics and science programs. Expand university preparation programs. Consider implementing more advanced placement courses for high-achieving students.',
                'status' => 'approved',
                'created_by' => 2, // Harare High Admin
                'approved_by' => 13, // Education Minister
                'approved_at' => '2025-04-12 10:15:00',
            ],
            [
                'title' => 'Bulawayo Primary School Infrastructure Assessment Report',
                'report_type' => 'infrastructure_assessment',
                'report_date' => '2025-03-28',
                'academic_year' => '2025',
                'term' => 'Term 1',
                'district_id' => 2,
                'school_id' => 2,
                'report_data' => json_encode([
                    'building_condition' => 'Good',
                    'classroom_count' => 32,
                    'average_class_size' => 28,
                    'library_resources' => 'Adequate',
                    'computer_lab_condition' => 'Excellent',
                    'sports_facilities' => 'Good',
                    'sanitation_facilities' => 'Adequate',
                    'accessibility_features' => 'Limited',
                    'maintenance_budget_allocation' => 'ZWL 450,000',
                    'planned_improvements' => [
                        'Renovation of 5 classrooms',
                        'Expansion of library',
                        'Installation of solar panels',
                        'Improvement of accessibility features',
                    ],
                ]),
                'summary' => 'Bulawayo Primary School maintains good infrastructure overall, with excellent computer lab facilities. However, accessibility features for students with disabilities need improvement, and some classrooms require renovation.',
                'recommendations' => 'Prioritize accessibility improvements to ensure inclusive education. Complete planned classroom renovations before the start of the next academic year. Increase budget allocation for library resources.',
                'status' => 'draft',
                'created_by' => 3, // Bulawayo Primary Admin
                'approved_by' => null,
                'approved_at' => null,
            ],
        ];

        foreach ($reports as $report) {
            GovernmentReport::create($report);
        }
    }
}
