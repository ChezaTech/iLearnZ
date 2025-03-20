<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Report;
use App\Models\School;
use App\Models\Student;
use App\Models\Teacher;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    /**
     * Display a listing of the reports.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reports = Report::orderBy('created_at', 'desc')->get();
        return response()->json(['reports' => $reports])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    }

    /**
     * Generate a new report.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function generate(Request $request)
    {
        $request->validate([
            'report_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Get data based on report type and date range
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);
        $reportType = $request->report_type;
        
        // Generate report data based on type
        $reportData = $this->generateReportData($reportType, $startDate, $endDate);
        
        // Create report record in database
        $report = Report::create([
            'name' => $reportType . ' (' . $startDate->format('Y-m-d') . ' to ' . $endDate->format('Y-m-d') . ')',
            'type' => $reportType,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'file_path' => null, // Will be updated after file is generated
            'size' => 0, // Will be updated after file is generated
            'generated_by' => Auth::id() ?? 1, // Default to 1 if not authenticated
        ]);
        
        // Generate PDF file
        $pdf = PDF::loadView('reports.' . $this->getReportTemplate($reportType), [
            'data' => $reportData,
            'report' => $report,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
        
        // Save PDF to storage
        $fileName = 'report_' . $report->id . '_' . time() . '.pdf';
        $filePath = 'reports/' . $fileName;
        Storage::put('public/' . $filePath, $pdf->output());
        
        // Update report with file information
        $fileSize = Storage::size('public/' . $filePath);
        $report->update([
            'file_path' => $filePath,
            'size' => $fileSize,
        ]);
        
        return response()->json([
            'success' => true,
            'report' => $report,
            'message' => 'Report generated successfully!'
        ])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    }

    /**
     * Display the specified report.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $report = Report::findOrFail($id);
        return response()->json(['report' => $report])
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    }

    /**
     * Download the specified report.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function download($id)
    {
        $report = Report::findOrFail($id);
        
        if (!$report->file_path || !Storage::exists('public/' . $report->file_path)) {
            return response()->json(['error' => 'Report file not found'], 404)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
        }
        
        // Get the file content
        $fileContent = Storage::get('public/' . $report->file_path);
        
        // Create a response with the file content
        $response = response($fileContent, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $report->name . '.pdf"',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'X-Requested-With, Content-Type, X-Token-Auth, Authorization'
        ]);
        
        return $response;
    }

    /**
     * Generate report data based on report type and date range.
     *
     * @param  string  $reportType
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @return array
     */
    private function generateReportData($reportType, $startDate, $endDate)
    {
        switch ($reportType) {
            case 'School Performance Report':
                return $this->generateSchoolPerformanceReport($startDate, $endDate);
            
            case 'Teacher Effectiveness Report':
                return $this->generateTeacherEffectivenessReport($startDate, $endDate);
            
            case 'Resource Utilization Report':
                return $this->generateResourceUtilizationReport($startDate, $endDate);
            
            case 'Student Progress Report':
                return $this->generateStudentProgressReport($startDate, $endDate);
            
            case 'District Comparison Report':
                return $this->generateDistrictComparisonReport($startDate, $endDate);
            
            default:
                return [];
        }
    }

    /**
     * Get the appropriate report template based on report type.
     *
     * @param  string  $reportType
     * @return string
     */
    private function getReportTemplate($reportType)
    {
        switch ($reportType) {
            case 'School Performance Report':
                return 'school_performance';
            
            case 'Teacher Effectiveness Report':
                return 'teacher_effectiveness';
            
            case 'Resource Utilization Report':
                return 'resource_utilization';
            
            case 'Student Progress Report':
                return 'student_progress';
            
            case 'District Comparison Report':
                return 'district_comparison';
            
            default:
                return 'generic';
        }
    }

    /**
     * Generate school performance report data.
     *
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @return array
     */
    private function generateSchoolPerformanceReport($startDate, $endDate)
    {
        $schools = School::all();
        $reportData = [];
        
        foreach ($schools as $school) {
            $students = Student::where('school_id', $school->id)->get();
            $studentCount = $students->count();
            
            // Calculate performance metrics
            $attendanceRate = rand(80, 98); // Placeholder for actual attendance calculation
            $completionRate = rand(75, 95); // Placeholder for actual completion calculation
            $passingRate = rand(70, 90); // Placeholder for actual passing rate calculation
            
            $reportData[] = [
                'school' => $school,
                'student_count' => $studentCount,
                'attendance_rate' => $attendanceRate,
                'completion_rate' => $completionRate,
                'passing_rate' => $passingRate,
                'performance_score' => ($attendanceRate + $completionRate + $passingRate) / 3,
            ];
        }
        
        return $reportData;
    }

    /**
     * Generate teacher effectiveness report data.
     *
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @return array
     */
    private function generateTeacherEffectivenessReport($startDate, $endDate)
    {
        $teachers = Teacher::all();
        $reportData = [];
        
        foreach ($teachers as $teacher) {
            // Calculate effectiveness metrics
            $studentEngagement = rand(70, 95); // Placeholder for actual engagement calculation
            $assignmentCompletion = rand(75, 98); // Placeholder for actual completion calculation
            $studentPerformance = rand(70, 90); // Placeholder for actual performance calculation
            
            $reportData[] = [
                'teacher' => $teacher,
                'student_engagement' => $studentEngagement,
                'assignment_completion' => $assignmentCompletion,
                'student_performance' => $studentPerformance,
                'effectiveness_score' => ($studentEngagement + $assignmentCompletion + $studentPerformance) / 3,
            ];
        }
        
        return $reportData;
    }

    /**
     * Generate resource utilization report data.
     *
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @return array
     */
    private function generateResourceUtilizationReport($startDate, $endDate)
    {
        $schools = School::all();
        $reportData = [];
        
        foreach ($schools as $school) {
            // Calculate resource utilization metrics
            $digitalResourceUsage = rand(60, 95); // Placeholder for actual usage calculation
            $physicalResourceUsage = rand(50, 90); // Placeholder for actual usage calculation
            $resourceEfficiency = rand(65, 95); // Placeholder for actual efficiency calculation
            
            $reportData[] = [
                'school' => $school,
                'digital_resource_usage' => $digitalResourceUsage,
                'physical_resource_usage' => $physicalResourceUsage,
                'resource_efficiency' => $resourceEfficiency,
                'utilization_score' => ($digitalResourceUsage + $physicalResourceUsage + $resourceEfficiency) / 3,
            ];
        }
        
        return $reportData;
    }

    /**
     * Generate student progress report data.
     *
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @return array
     */
    private function generateStudentProgressReport($startDate, $endDate)
    {
        $students = Student::all();
        $reportData = [];
        
        foreach ($students as $student) {
            // Calculate progress metrics
            $attendanceRate = rand(80, 100); // Placeholder for actual attendance calculation
            $assignmentCompletion = rand(70, 100); // Placeholder for actual completion calculation
            $academicPerformance = rand(60, 100); // Placeholder for actual performance calculation
            
            $reportData[] = [
                'student' => $student,
                'attendance_rate' => $attendanceRate,
                'assignment_completion' => $assignmentCompletion,
                'academic_performance' => $academicPerformance,
                'progress_score' => ($attendanceRate + $assignmentCompletion + $academicPerformance) / 3,
            ];
        }
        
        return $reportData;
    }

    /**
     * Generate district comparison report data.
     *
     * @param  \Carbon\Carbon  $startDate
     * @param  \Carbon\Carbon  $endDate
     * @return array
     */
    private function generateDistrictComparisonReport($startDate, $endDate)
    {
        // Group schools by district and calculate metrics
        $districts = School::select('district')->distinct()->get()->pluck('district');
        $reportData = [];
        
        foreach ($districts as $district) {
            $schools = School::where('district', $district)->get();
            $schoolCount = $schools->count();
            
            // Calculate district-wide metrics
            $overallPerformance = rand(70, 95); // Placeholder for actual performance calculation
            $resourceEfficiency = rand(65, 90); // Placeholder for actual efficiency calculation
            $teacherEffectiveness = rand(75, 95); // Placeholder for actual effectiveness calculation
            
            $reportData[] = [
                'district' => $district,
                'school_count' => $schoolCount,
                'overall_performance' => $overallPerformance,
                'resource_efficiency' => $resourceEfficiency,
                'teacher_effectiveness' => $teacherEffectiveness,
                'district_score' => ($overallPerformance + $resourceEfficiency + $teacherEffectiveness) / 3,
            ];
        }
        
        return $reportData;
    }
}
