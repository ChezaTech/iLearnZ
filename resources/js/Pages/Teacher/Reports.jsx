import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeftIcon, 
    DocumentChartBarIcon,
    AcademicCapIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    ChartBarIcon,
    ChartPieIcon,
    ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

export default function Reports({ auth, classData, subject, reports }) {
    const [activeReport, setActiveReport] = useState('overview');
    const [dateRange, setDateRange] = useState('term');
    
    // Sample data for demonstration
    const overviewData = {
        totalStudents: 35,
        averageAttendance: 92,
        averageGrade: 76,
        assignmentsCompleted: 87,
        examsPassed: 94,
        improvementRate: 12,
    };
    
    const attendanceData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        datasets: [
            {
                name: 'Present',
                data: [32, 30, 33, 31, 29, 34, 33, 35],
                color: '#4ade80',
            },
            {
                name: 'Absent',
                data: [3, 5, 2, 4, 6, 1, 2, 0],
                color: '#f87171',
            },
        ],
    };
    
    const performanceData = {
        labels: ['A', 'B', 'C', 'D', 'F'],
        datasets: [
            {
                name: 'Students',
                data: [8, 12, 9, 4, 2],
                colors: ['#4ade80', '#a3e635', '#facc15', '#fb923c', '#f87171'],
            },
        ],
    };
    
    const assignmentCompletionData = {
        labels: ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5'],
        datasets: [
            {
                name: 'Completed',
                data: [32, 28, 30, 25, 33],
                color: '#60a5fa',
            },
            {
                name: 'Late',
                data: [2, 5, 3, 7, 1],
                color: '#fbbf24',
            },
            {
                name: 'Missing',
                data: [1, 2, 2, 3, 1],
                color: '#f87171',
            },
        ],
    };
    
    const examResultsData = {
        labels: ['Exam 1', 'Exam 2', 'Midterm', 'Exam 3', 'Final'],
        datasets: [
            {
                name: 'Average Score',
                data: [72, 68, 75, 78, 82],
                color: '#818cf8',
            },
            {
                name: 'Highest Score',
                data: [95, 92, 98, 96, 100],
                color: '#34d399',
            },
            {
                name: 'Lowest Score',
                data: [45, 42, 50, 55, 60],
                color: '#fb7185',
            },
        ],
    };
    
    const studentProgressData = {
        students: [
            { id: 1, name: 'John Doe', attendance: 95, assignments: 90, exams: 85, overall: 88, improvement: 5 },
            { id: 2, name: 'Jane Smith', attendance: 98, assignments: 95, exams: 92, overall: 95, improvement: 3 },
            { id: 3, name: 'Michael Johnson', attendance: 85, assignments: 80, exams: 75, overall: 78, improvement: 8 },
            { id: 4, name: 'Emily Williams', attendance: 90, assignments: 88, exams: 82, overall: 86, improvement: 4 },
            { id: 5, name: 'David Brown', attendance: 80, assignments: 75, exams: 70, overall: 73, improvement: 10 },
            { id: 6, name: 'Sarah Davis', attendance: 92, assignments: 85, exams: 88, overall: 88, improvement: 6 },
            { id: 7, name: 'Robert Miller', attendance: 88, assignments: 82, exams: 78, overall: 82, improvement: 7 },
            { id: 8, name: 'Jennifer Wilson', attendance: 94, assignments: 90, exams: 86, overall: 89, improvement: 4 },
            { id: 9, name: 'William Moore', attendance: 86, assignments: 78, exams: 72, overall: 77, improvement: 9 },
            { id: 10, name: 'Linda Taylor', attendance: 96, assignments: 92, exams: 90, overall: 92, improvement: 2 },
        ],
    };
    
    // Helper function to render progress bars
    const renderProgressBar = (value, color = 'bg-[#1e5091]') => {
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className={`${color} h-2.5 rounded-full`} style={{ width: `${value}%` }}></div>
            </div>
        );
    };
    
    // Helper function to determine color based on value
    const getColorByValue = (value) => {
        if (value >= 90) return 'bg-green-500';
        if (value >= 80) return 'bg-blue-500';
        if (value >= 70) return 'bg-yellow-500';
        if (value >= 60) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route('teacher.class.show', classData.id)} className="mr-4">
                        <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                        {subject.name} Reports - {classData.name}
                    </h2>
                </div>
            }
        >
            <Head title={`${subject.name} Reports - ${classData.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="md:w-1/4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Report Types</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <button 
                                                onClick={() => setActiveReport('overview')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeReport === 'overview' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <DocumentChartBarIcon className="h-5 w-5 mr-2" />
                                                Class Overview
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setActiveReport('attendance')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeReport === 'attendance' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                                Attendance Report
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setActiveReport('performance')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeReport === 'performance' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <ChartPieIcon className="h-5 w-5 mr-2" />
                                                Grade Distribution
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setActiveReport('assignments')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeReport === 'assignments' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                                                Assignment Completion
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setActiveReport('exams')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeReport === 'exams' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <AcademicCapIcon className="h-5 w-5 mr-2" />
                                                Exam Results
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setActiveReport('progress')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeReport === 'progress' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <ChartBarIcon className="h-5 w-5 mr-2" />
                                                Student Progress
                                            </button>
                                        </li>
                                    </ul>

                                    <div className="mt-8">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Time Period</h3>
                                        <div className="flex flex-col space-y-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#1e5091]"
                                                    name="dateRange"
                                                    value="week"
                                                    checked={dateRange === 'week'}
                                                    onChange={() => setDateRange('week')}
                                                />
                                                <span className="ml-2">This Week</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#1e5091]"
                                                    name="dateRange"
                                                    value="month"
                                                    checked={dateRange === 'month'}
                                                    onChange={() => setDateRange('month')}
                                                />
                                                <span className="ml-2">This Month</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#1e5091]"
                                                    name="dateRange"
                                                    value="term"
                                                    checked={dateRange === 'term'}
                                                    onChange={() => setDateRange('term')}
                                                />
                                                <span className="ml-2">Current Term</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#1e5091]"
                                                    name="dateRange"
                                                    value="year"
                                                    checked={dateRange === 'year'}
                                                    onChange={() => setDateRange('year')}
                                                />
                                                <span className="ml-2">Academic Year</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            className="w-full flex items-center justify-center px-4 py-2 bg-[#1e5091] text-white rounded-md text-sm font-medium hover:bg-[#1e5091]/90"
                                        >
                                            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                                            Export Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:w-3/4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    {/* Overview Report */}
                                    {activeReport === 'overview' && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Class Overview</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Total Students</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.totalStudents}</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Average Attendance</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.averageAttendance}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Average Grade</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.averageGrade}%</p>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Assignments Completed</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.assignmentsCompleted}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Exams Passed</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.examsPassed}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Improvement Rate</h4>
                                                    <p className="text-2xl font-bold text-green-500">+{overviewData.improvementRate}%</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Class Performance Summary</h4>
                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm font-medium text-gray-700">Attendance</span>
                                                            <span className="text-sm font-medium text-gray-700">{overviewData.averageAttendance}%</span>
                                                        </div>
                                                        {renderProgressBar(overviewData.averageAttendance, getColorByValue(overviewData.averageAttendance))}
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm font-medium text-gray-700">Assignments</span>
                                                            <span className="text-sm font-medium text-gray-700">{overviewData.assignmentsCompleted}%</span>
                                                        </div>
                                                        {renderProgressBar(overviewData.assignmentsCompleted, getColorByValue(overviewData.assignmentsCompleted))}
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm font-medium text-gray-700">Exams</span>
                                                            <span className="text-sm font-medium text-gray-700">{overviewData.examsPassed}%</span>
                                                        </div>
                                                        {renderProgressBar(overviewData.examsPassed, getColorByValue(overviewData.examsPassed))}
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm font-medium text-gray-700">Overall Grade</span>
                                                            <span className="text-sm font-medium text-gray-700">{overviewData.averageGrade}%</span>
                                                        </div>
                                                        {renderProgressBar(overviewData.averageGrade, getColorByValue(overviewData.averageGrade))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Attendance Report */}
                                    {activeReport === 'attendance' && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Attendance Report</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Average Attendance</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.averageAttendance}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Perfect Attendance</h4>
                                                    <p className="text-2xl font-bold text-green-500">12 students</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Attendance Concern</h4>
                                                    <p className="text-2xl font-bold text-red-500">3 students</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Weekly Attendance Trend</h4>
                                                <div className="h-64 bg-gray-50 rounded-lg border p-4 flex items-end justify-between">
                                                    {attendanceData.labels.map((label, index) => (
                                                        <div key={index} className="flex flex-col items-center">
                                                            <div className="flex flex-col-reverse h-48">
                                                                <div 
                                                                    className="w-8 bg-green-500" 
                                                                    style={{ height: `${(attendanceData.datasets[0].data[index] / overviewData.totalStudents) * 100}%` }}
                                                                ></div>
                                                                <div 
                                                                    className="w-8 bg-red-500" 
                                                                    style={{ height: `${(attendanceData.datasets[1].data[index] / overviewData.totalStudents) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-xs mt-2">{label}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-center mt-4">
                                                    <div className="flex items-center mr-4">
                                                        <div className="w-3 h-3 bg-green-500 mr-1"></div>
                                                        <span className="text-xs">Present</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 bg-red-500 mr-1"></div>
                                                        <span className="text-xs">Absent</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Students with Attendance Concerns</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Rate</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absences</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Absence</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">85%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">6 days</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">March 15, 2025</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">David Brown</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">80%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">8 days</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">March 18, 2025</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">William Moore</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">86%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '86%' }}></div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">5 days</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">March 12, 2025</div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Performance/Grade Distribution Report */}
                                    {activeReport === 'performance' && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Grade Distribution</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Class Average</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.averageGrade}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Highest Grade</h4>
                                                    <p className="text-2xl font-bold text-green-500">95%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Lowest Grade</h4>
                                                    <p className="text-2xl font-bold text-red-500">58%</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Grade Distribution</h4>
                                                <div className="h-64 bg-gray-50 rounded-lg border p-4 flex items-end justify-around">
                                                    {performanceData.labels.map((label, index) => (
                                                        <div key={index} className="flex flex-col items-center">
                                                            <div 
                                                                className="w-16 rounded-t-md" 
                                                                style={{ 
                                                                    height: `${(performanceData.datasets[0].data[index] / Math.max(...performanceData.datasets[0].data)) * 200}px`,
                                                                    backgroundColor: performanceData.datasets[0].colors[index]
                                                                }}
                                                            ></div>
                                                            <div className="mt-2 flex flex-col items-center">
                                                                <span className="text-sm font-medium">{label}</span>
                                                                <span className="text-xs text-gray-500">{performanceData.datasets[0].data[index]} students</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Grade Breakdown by Assessment</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assessment</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">A's</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">B's</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">C's</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D's</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">F's</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">Quiz 1</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">78%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">7</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">12</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">10</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">4</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">2</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">Midterm Exam</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">75%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">6</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">10</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">12</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">5</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">2</div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">Final Project</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">82%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">10</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">15</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">7</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">2</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">1</div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Assignment Completion Report */}
                                    {activeReport === 'assignments' && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Assignment Completion</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Completion Rate</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.assignmentsCompleted}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">On-Time Submissions</h4>
                                                    <p className="text-2xl font-bold text-green-500">82%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Late Submissions</h4>
                                                    <p className="text-2xl font-bold text-yellow-500">15%</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Assignment Completion by Assignment</h4>
                                                <div className="h-64 bg-gray-50 rounded-lg border p-4">
                                                    <div className="h-full flex items-end space-x-8">
                                                        {assignmentCompletionData.labels.map((label, index) => (
                                                            <div key={index} className="flex-1 flex flex-col items-center">
                                                                <div className="w-full flex flex-col-reverse h-48">
                                                                    <div 
                                                                        className="w-full bg-blue-500" 
                                                                        style={{ height: `${(assignmentCompletionData.datasets[0].data[index] / overviewData.totalStudents) * 100}%` }}
                                                                    ></div>
                                                                    <div 
                                                                        className="w-full bg-yellow-500" 
                                                                        style={{ height: `${(assignmentCompletionData.datasets[1].data[index] / overviewData.totalStudents) * 100}%` }}
                                                                    ></div>
                                                                    <div 
                                                                        className="w-full bg-red-500" 
                                                                        style={{ height: `${(assignmentCompletionData.datasets[2].data[index] / overviewData.totalStudents) * 100}%` }}
                                                                    ></div>
                                                                </div>
                                                                <span className="text-xs mt-2">{label}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-4">
                                                    <div className="flex items-center mr-4">
                                                        <div className="w-3 h-3 bg-blue-500 mr-1"></div>
                                                        <span className="text-xs">Completed</span>
                                                    </div>
                                                    <div className="flex items-center mr-4">
                                                        <div className="w-3 h-3 bg-yellow-500 mr-1"></div>
                                                        <span className="text-xs">Late</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 bg-red-500 mr-1"></div>
                                                        <span className="text-xs">Missing</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Students with Missing Assignments</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Missing</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">2</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">1</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">80%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">David Brown</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">3</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">2</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">75%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">William Moore</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">1</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">2</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">85%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Exam Results Report */}
                                    {activeReport === 'exams' && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Exam Results</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Average Score</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">75%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Pass Rate</h4>
                                                    <p className="text-2xl font-bold text-green-500">{overviewData.examsPassed}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Improvement</h4>
                                                    <p className="text-2xl font-bold text-blue-500">+8%</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Exam Performance Trend</h4>
                                                <div className="h-64 bg-gray-50 rounded-lg border p-4">
                                                    <div className="h-full flex items-end space-x-8">
                                                        {examResultsData.labels.map((label, index) => (
                                                            <div key={index} className="flex-1 flex flex-col items-center">
                                                                <div className="w-full h-48 relative">
                                                                    {/* Average Score */}
                                                                    <div 
                                                                        className="absolute bottom-0 left-0 right-0 bg-indigo-500 border-t-2 border-indigo-600" 
                                                                        style={{ height: `${(examResultsData.datasets[0].data[index] / 100) * 100}%` }}
                                                                    ></div>
                                                                    
                                                                    {/* Highest Score Marker */}
                                                                    <div 
                                                                        className="absolute w-full border-t-2 border-green-500"
                                                                        style={{ bottom: `${(examResultsData.datasets[1].data[index] / 100) * 100}%` }}
                                                                    >
                                                                        <div className="w-2 h-2 bg-green-500 rounded-full absolute -right-1 -top-1"></div>
                                                                    </div>
                                                                    
                                                                    {/* Lowest Score Marker */}
                                                                    <div 
                                                                        className="absolute w-full border-t-2 border-red-500"
                                                                        style={{ bottom: `${(examResultsData.datasets[2].data[index] / 100) * 100}%` }}
                                                                    >
                                                                        <div className="w-2 h-2 bg-red-500 rounded-full absolute -right-1 -top-1"></div>
                                                                    </div>
                                                                </div>
                                                                <span className="text-xs mt-2">{label}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex justify-center mt-4">
                                                    <div className="flex items-center mr-4">
                                                        <div className="w-3 h-3 bg-indigo-500 mr-1"></div>
                                                        <span className="text-xs">Average Score</span>
                                                    </div>
                                                    <div className="flex items-center mr-4">
                                                        <div className="w-3 h-3 bg-green-500 mr-1"></div>
                                                        <span className="text-xs">Highest Score</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 bg-red-500 mr-1"></div>
                                                        <span className="text-xs">Lowest Score</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Exam Results by Student</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam 1</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam 2</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Midterm</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">78%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">82%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">85%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">88%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">83%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '83%' }}></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">92%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">90%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">95%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">98%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">94%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '94%' }}></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">65%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">70%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">75%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">80%</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">73%</div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '73%' }}></div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* Student Progress Report */}
                                    {activeReport === 'progress' && (
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-6">Student Progress</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Average Improvement</h4>
                                                    <p className="text-2xl font-bold text-[#1e5091]">{overviewData.improvementRate}%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Most Improved</h4>
                                                    <p className="text-2xl font-bold text-green-500">+15%</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                    <h4 className="text-sm font-medium text-gray-500">Needs Attention</h4>
                                                    <p className="text-2xl font-bold text-red-500">3 students</p>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Student Progress Overview</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exams</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall</th>
                                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {studentProgressData.students.map((student, index) => (
                                                                <tr key={student.id}>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">{student.attendance}%</div>
                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                            <div className={`${getColorByValue(student.attendance)} h-1.5 rounded-full`} style={{ width: `${student.attendance}%` }}></div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">{student.assignments}%</div>
                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                            <div className={`${getColorByValue(student.assignments)} h-1.5 rounded-full`} style={{ width: `${student.assignments}%` }}></div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">{student.exams}%</div>
                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                            <div className={`${getColorByValue(student.exams)} h-1.5 rounded-full`} style={{ width: `${student.exams}%` }}></div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-gray-900">{student.overall}%</div>
                                                                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                                                            <div className={`${getColorByValue(student.overall)} h-1.5 rounded-full`} style={{ width: `${student.overall}%` }}></div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        <div className="text-sm text-green-500">+{student.improvement}%</div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8">
                                                <h4 className="text-md font-medium text-gray-700 mb-4">Students Needing Attention</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                                                <span className="text-red-500 font-bold">WM</span>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-sm font-medium">William Moore</h5>
                                                                <p className="text-xs text-gray-500">Overall: 77%</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-700 mt-2">Struggling with attendance and assignment completion. Recommend scheduling a meeting.</p>
                                                        <button className="mt-3 text-xs text-[#1e5091] font-medium hover:underline">View Detailed Report</button>
                                                    </div>
                                                    
                                                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                                                <span className="text-red-500 font-bold">DB</span>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-sm font-medium">David Brown</h5>
                                                                <p className="text-xs text-gray-500">Overall: 73%</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-700 mt-2">Low exam scores and inconsistent assignment submission. Consider additional support.</p>
                                                        <button className="mt-3 text-xs text-[#1e5091] font-medium hover:underline">View Detailed Report</button>
                                                    </div>
                                                    
                                                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                                                        <div className="flex items-center mb-2">
                                                            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                                                <span className="text-red-500 font-bold">MJ</span>
                                                            </div>
                                                            <div>
                                                                <h5 className="text-sm font-medium">Michael Johnson</h5>
                                                                <p className="text-xs text-gray-500">Overall: 78%</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-gray-700 mt-2">Attendance issues and declining exam performance. May need intervention.</p>
                                                        <button className="mt-3 text-xs text-[#1e5091] font-medium hover:underline">View Detailed Report</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
