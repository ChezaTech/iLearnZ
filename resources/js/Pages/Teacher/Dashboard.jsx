import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    AcademicCapIcon,
    BookOpenIcon,
    CalendarIcon,
    ClipboardDocumentCheckIcon,
    DocumentPlusIcon,
    UserGroupIcon,
    BellAlertIcon,
    ClockIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function TeacherDashboard({ auth, classes, subjects, assessments, announcements }) {
    const { user } = auth;
    const [activeTab, setActiveTab] = useState('classes');

    // Extract last name for personalized greeting
    const nameParts = user.name.split(' ');
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

    // Get current time for greeting
    const currentHour = new Date().getHours();
    let greeting = 'Good evening';
    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                    Teacher Dashboard
                </h2>
            }
        >
            <Head title="Teacher Dashboard" />

            {/* Header & Welcome Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden mb-6">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-[#1e5091]">
                                {greeting}, Mr. {lastName}!
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Welcome to your teaching dashboard. Here's an overview of your classes and activities.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button className="p-2 bg-[#1e5091]/10 rounded-full hover:bg-[#1e5091]/20 transition-all">
                                    <BellAlertIcon className="h-6 w-6 text-[#1e5091]" />
                                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                                        3
                                    </span>
                                </button>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1e5091] to-[#1e5091] flex items-center justify-center text-white font-semibold text-lg border-2 border-[#ffb81c]">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all">
                            <DocumentPlusIcon className="h-5 w-5 mr-2" />
                            Create Assignment
                        </button>
                        <button className="inline-flex items-center px-4 py-2 bg-[#ffb81c] text-[#1e5091] rounded-lg text-sm font-medium hover:bg-[#ffb81c]/90 transition-all">
                            <CalendarIcon className="h-5 w-5 mr-2" />
                            View Schedule
                        </button>
                        <button className="inline-flex items-center px-4 py-2 bg-white border border-[#1e5091]/20 text-[#1e5091] rounded-lg text-sm font-medium hover:bg-[#1e5091]/5 transition-all">
                            <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                            Grade Submissions
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - My Classes & My Students */}
                <div className="lg:col-span-2 space-y-6">
                    {/* My Classes Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <AcademicCapIcon className="h-5 w-5 mr-2" />
                                My Classes
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            {classes && classes.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {classes.map((classItem) => (
                                        <div key={classItem.id} className="py-4 first:pt-0 last:pb-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-base font-medium text-gray-900">
                                                        {classItem.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Grade {classItem.grade_level} | {classItem.section} | {classItem.students?.length || 0} students
                                                    </p>
                                                </div>
                                                <Link
                                                    href={route('classes.show', classItem.id)}
                                                    className="px-3 py-1 bg-[#1e5091]/10 text-[#1e5091] rounded-lg text-sm hover:bg-[#1e5091]/20 transition-all"
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {classItem.subjects?.map((subject) => (
                                                    <span
                                                        key={subject.id}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ffb81c]/10 text-[#ffb81c]"
                                                    >
                                                        {subject.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No classes assigned</h3>
                                    <p className="mt-1 text-sm text-gray-500">You don't have any classes assigned yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* My Students Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                My Students
                            </h2>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search students..."
                                    className="w-48 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5091]"
                                />
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Class
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Performance
                                            </th>
                                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* Sample student data - replace with actual data */}
                                        <tr>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-[#1e5091]/20 flex items-center justify-center text-[#1e5091] font-medium">
                                                        JS
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">John Smith</div>
                                                        <div className="text-xs text-gray-500">ID: STD-001</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                                                Grade 10-A
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                                    </div>
                                                    <span className="ml-2 text-xs font-medium text-gray-600">85%</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                                                <Link href="#" className="text-[#1e5091] hover:text-[#ffb81c]">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-[#1e5091]/20 flex items-center justify-center text-[#1e5091] font-medium">
                                                        MJ
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">Mary Johnson</div>
                                                        <div className="text-xs text-gray-500">ID: STD-002</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                                                Grade 10-A
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                                                    </div>
                                                    <span className="ml-2 text-xs font-medium text-gray-600">72%</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                                                <Link href="#" className="text-[#1e5091] hover:text-[#ffb81c]">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Schedule, Subjects, Assessments, Announcements */}
                <div className="space-y-6">
                    {/* My Schedule Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <CalendarIcon className="h-5 w-5 mr-2" />
                                My Schedule
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                Full View
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-sm font-medium text-gray-900">Today's Classes</h3>
                                <span className="text-xs text-gray-500">Monday, March 18, 2025</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center p-3 bg-[#1e5091]/5 rounded-lg border-l-4 border-[#1e5091]">
                                    <div className="mr-3 flex-shrink-0">
                                        <ClockIcon className="h-5 w-5 text-[#1e5091]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Mathematics</p>
                                        <p className="text-xs text-gray-600">Grade 10-A • 08:00 - 09:30</p>
                                    </div>
                                    <button className="px-3 py-1 bg-[#1e5091] text-white rounded text-xs">
                                        Join
                                    </button>
                                </div>
                                <div className="flex items-center p-3 bg-[#ffb81c]/5 rounded-lg border-l-4 border-[#ffb81c]">
                                    <div className="mr-3 flex-shrink-0">
                                        <ClockIcon className="h-5 w-5 text-[#ffb81c]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Physics</p>
                                        <p className="text-xs text-gray-600">Grade 11-B • 10:00 - 11:30</p>
                                    </div>
                                    <button className="px-3 py-1 bg-[#1e5091] text-white rounded text-xs">
                                        Join
                                    </button>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                                    <div className="mr-3 flex-shrink-0">
                                        <ClockIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Chemistry</p>
                                        <p className="text-xs text-gray-600">Grade 10-B • 13:00 - 14:30</p>
                                    </div>
                                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                                        Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* My Subjects Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <BookOpenIcon className="h-5 w-5 mr-2" />
                                My Subjects
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#1e5091]/30 hover:shadow-sm transition-all">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-medium text-gray-900">Mathematics</h3>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                            Grade 10
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-600">3 classes • 78 students</p>
                                    <div className="mt-2 flex justify-end">
                                        <Link href="#" className="text-xs text-[#1e5091] hover:text-[#ffb81c]">
                                            View Materials
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#1e5091]/30 hover:shadow-sm transition-all">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-medium text-gray-900">Physics</h3>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                            Grade 11
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-600">2 classes • 52 students</p>
                                    <div className="mt-2 flex justify-end">
                                        <Link href="#" className="text-xs text-[#1e5091] hover:text-[#ffb81c]">
                                            View Materials
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-gray-200 hover:border-[#1e5091]/30 hover:shadow-sm transition-all">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-medium text-gray-900">Chemistry</h3>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                            Grade 10
                                        </span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-600">1 class • 32 students</p>
                                    <div className="mt-2 flex justify-end">
                                        <Link href="#" className="text-xs text-[#1e5091] hover:text-[#ffb81c]">
                                            View Materials
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* My Assessments Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                                My Assessments
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                                <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Math Quiz - Algebra</h3>
                                            <p className="text-xs text-gray-600">Grade 10-A • Due: Mar 20</p>
                                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Needs Grading (12)
                                            </span>
                                        </div>
                                    </div>
                                    <Link href="#" className="text-xs text-[#1e5091] hover:text-[#ffb81c]">
                                        Grade
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                                <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Physics Lab Report</h3>
                                            <p className="text-xs text-gray-600">Grade 11-B • Due: Mar 22</p>
                                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending (8)
                                            </span>
                                        </div>
                                    </div>
                                    <Link href="#" className="text-xs text-[#1e5091] hover:text-[#ffb81c]">
                                        View
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mr-3">
                                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <ClipboardDocumentCheckIcon className="h-4 w-4" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Chemistry Test</h3>
                                            <p className="text-xs text-gray-600">Grade 10-B • Due: Mar 15</p>
                                            <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Graded
                                            </span>
                                        </div>
                                    </div>
                                    <Link href="#" className="text-xs text-[#1e5091] hover:text-[#ffb81c]">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Announcements Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
                        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                                <BellAlertIcon className="h-5 w-5 mr-2" />
                                Announcements
                            </h2>
                            <Link href="#" className="text-sm text-[#1e5091] hover:text-[#ffb81c] transition-all">
                                View All
                            </Link>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div className="border-l-4 border-[#1e5091] pl-3 py-1">
                                    <h3 className="text-sm font-medium text-gray-900">Staff Meeting</h3>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Staff meeting scheduled for Friday, March 22nd at 2:00 PM in the conference room.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
                                </div>
                                <div className="border-l-4 border-[#ffb81c] pl-3 py-1">
                                    <h3 className="text-sm font-medium text-gray-900">End of Term Reminder</h3>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Please submit all grades by April 5th for the end of term reports.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">1 day ago</p>
                                </div>
                                <div className="border-l-4 border-gray-300 pl-3 py-1">
                                    <h3 className="text-sm font-medium text-gray-900">Professional Development</h3>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Sign up for the upcoming professional development workshop on modern teaching methods.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
