import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    AcademicCapIcon,
    ArrowLeftIcon,
    BookOpenIcon,
    CalendarIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function StudentDetails({ auth, student, attendance, assessments }) {
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate overall performance if available
    const performance = student.performances && student.performances.length > 0 
        ? student.performances[0].average_score 
        : null;
    
    // Calculate color based on performance
    let performanceColor = 'gray';
    if (performance !== null) {
        if (performance >= 80) performanceColor = 'green';
        else if (performance >= 60) performanceColor = 'yellow';
        else performanceColor = 'red';
    }

    // Get student attendance records
    const studentAttendance = [];
    attendance.forEach(record => {
        record.records.forEach(entry => {
            if (entry.student_id === student.id) {
                studentAttendance.push({
                    date: record.date,
                    status: entry.status,
                    notes: entry.notes
                });
            }
        });
    });

    // Get assessments for student's class
    const studentAssessments = assessments.filter(assessment => 
        assessment.class_id === student.class.id
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <Link 
                        href={route('teacher.dashboard')} 
                        className="mr-3 p-1 rounded-full hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                        Student Profile
                    </h2>
                </div>
            }
        >
            <Head title={`Student: ${student.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Student Profile Header */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center">
                                    <div className="h-16 w-16 rounded-full bg-[#1e5091]/20 flex items-center justify-center text-[#1e5091] text-xl font-bold">
                                        {student.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="ml-4">
                                        <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                                        <p className="text-gray-600">
                                            ID: {student.student?.student_id_number || 'N/A'} | 
                                            Class: {student.class.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center">
                                    {performance !== null && (
                                        <div className="mr-6">
                                            <p className="text-sm text-gray-600 mb-1">Overall Performance</p>
                                            <div className="flex items-center">
                                                <div className="w-32 bg-gray-200 rounded-full h-2.5">
                                                    <div 
                                                        className={`bg-${performanceColor}-500 h-2.5 rounded-full`} 
                                                        style={{ width: `${performance}%` }}
                                                    ></div>
                                                </div>
                                                <span className="ml-2 text-sm font-medium text-gray-600">{performance}%</span>
                                            </div>
                                        </div>
                                    )}
                                    <Link
                                        href={`mailto:student-email@example.com`}
                                        className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all"
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                        activeTab === 'overview'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('attendance')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                        activeTab === 'attendance'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Attendance
                                </button>
                                <button
                                    onClick={() => setActiveTab('assessments')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                        activeTab === 'assessments'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Assessments
                                </button>
                                <button
                                    onClick={() => setActiveTab('grades')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                        activeTab === 'grades'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Grades
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Student Overview</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-gray-700 mb-2">Personal Information</h4>
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Full Name:</span> {student.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Student ID:</span> {student.student?.student_id_number || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Class:</span> {student.class.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Grade Level:</span> {student.class.grade_level}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Section:</span> {student.class.section}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-gray-700 mb-2">Academic Summary</h4>
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Overall Performance:</span> {performance ? `${performance}%` : 'No data available'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Attendance Rate:</span> {studentAttendance.length > 0 ? 
                                                        `${(studentAttendance.filter(a => a.status === 'present').length / studentAttendance.length * 100).toFixed(1)}%` : 
                                                        'No data available'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Assessments Completed:</span> {studentAssessments.length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'attendance' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Records</h3>
                                    {studentAttendance.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Date
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Notes
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {studentAttendance.map((record, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {new Date(record.date).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                                                                    record.status === 'absent' ? 'bg-red-100 text-red-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                                }`}>
                                                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {record.notes || '-'}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance records</h3>
                                            <p className="mt-1 text-sm text-gray-500">There are no attendance records for this student yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'assessments' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Assessments</h3>
                                    {studentAssessments.length > 0 ? (
                                        <div className="space-y-4">
                                            {studentAssessments.map((assessment) => (
                                                <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{assessment.title}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>
                                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                                <BookOpenIcon className="h-4 w-4 mr-1" />
                                                                <span>{assessment.subject.name}</span>
                                                                <span className="mx-2">•</span>
                                                                <CalendarIcon className="h-4 w-4 mr-1" />
                                                                <span>Due: {new Date(assessment.due_date).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            new Date(assessment.due_date) < new Date() ? 'bg-gray-100 text-gray-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {new Date(assessment.due_date) < new Date() ? 'Past Due' : 'Upcoming'}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <ClipboardDocumentCheckIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments</h3>
                                            <p className="mt-1 text-sm text-gray-500">There are no assessments assigned to this student's class yet.</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'grades' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Grades</h3>
                                    <div className="text-center py-8">
                                        <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No grades available</h3>
                                        <p className="mt-1 text-sm text-gray-500">Grade information will be available once assessments are graded.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
