import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { 
    PencilIcon, 
    TrashIcon, 
    EyeIcon, 
    EyeSlashIcon,
    AcademicCapIcon,
    BookOpenIcon,
    CalendarIcon,
    ClockIcon,
    UserGroupIcon,
    BellIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

// Playful color palette
const colors = {
    primary: '#4F46E5', // Indigo
    secondary: '#06B6D4', // Cyan
    accent: '#8B5CF6', // Purple
    success: '#10B981', // Emerald
    warning: '#F59E0B', // Amber
    danger: '#EF4444', // Red
    background: '#F3F4F6', // Light gray
    card: '#FFFFFF',
    text: '#1F2937',
    textLight: '#6B7280',
};

export default function Dashboard({ auth, students }) {
    const [confirmingStudentDeactivation, setConfirmingStudentDeactivation] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    const toggleStudentStatus = (student) => {
        router.patch(route('parent.students.toggle-status', student.id), {}, {
            preserveScroll: true,
        });
    };
    
    // Mock data for dashboard stats
    const totalCourses = students.length > 0 ? students.length * 3 : 0;
    const upcomingEvents = 2;
    const recentActivities = 5;
    const unreadMessages = 3;

    // Get current date for greeting
    const currentHour = new Date().getHours();
    let greeting = "Good morning";
    if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good afternoon";
    } else if (currentHour >= 17) {
        greeting = "Good evening";
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {greeting}, {auth.user.name}!
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Here's what's happening with your students' learning journey
                        </p>
                    </div>
                    <div className="mt-4 flex space-x-3 sm:mt-0">
                        <Link
                            href={route('parent.students.create')}
                            className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <PlusIcon className="mr-2 h-5 w-5" />
                            Add Student
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Parent Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Dashboard Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Students Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <UserGroupIcon className="h-10 w-10 rounded-full bg-indigo-100 p-2 text-indigo-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">Students</dt>
                                            <dd>
                                                <div className="text-lg font-semibold text-gray-900">{students.length}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3">
                                <div className="text-sm">
                                    <Link href={route('parent.students.create')} className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Add another
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Courses Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <BookOpenIcon className="h-10 w-10 rounded-full bg-cyan-100 p-2 text-cyan-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">Active Courses</dt>
                                            <dd>
                                                <div className="text-lg font-semibold text-gray-900">{totalCourses}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
                                        View all courses
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CalendarIcon className="h-10 w-10 rounded-full bg-purple-100 p-2 text-purple-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">Upcoming Events</dt>
                                            <dd>
                                                <div className="text-lg font-semibold text-gray-900">{upcomingEvents}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                                        View calendar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Messages Card */}
                        <div className="overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <ChatBubbleLeftRightIcon className="h-10 w-10 rounded-full bg-emerald-100 p-2 text-emerald-600" />
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="truncate text-sm font-medium text-gray-500">Unread Messages</dt>
                                            <dd className="flex items-center">
                                                <div className="text-lg font-semibold text-gray-900">{unreadMessages}</div>
                                                {unreadMessages > 0 && (
                                                    <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">New</span>
                                                )}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-5 py-3">
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                                        View messages
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Navigation Tabs */}
                    <div className="mb-6 border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`${activeTab === 'overview' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('students')}
                                className={`${activeTab === 'students' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                            >
                                Students
                            </button>
                            <button
                                onClick={() => setActiveTab('progress')}
                                className={`${activeTab === 'progress' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                            >
                                Academic Progress
                            </button>
                            <button
                                onClick={() => setActiveTab('calendar')}
                                className={`${activeTab === 'calendar' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                            >
                                Calendar
                            </button>
                        </nav>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-6 text-lg font-medium text-gray-900">Your Students</h3>

                            {students.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                        <PlusIcon className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <h3 className="mb-2 text-sm font-medium text-gray-900">No students added yet</h3>
                                    <p className="mb-4 text-sm text-gray-500">Get started by adding your first student</p>
                                    <Link
                                        href={route('parent.students.create')}
                                        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <PlusIcon className="mr-2 h-5 w-5" />
                                        Add Student
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Grade Level
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {students.map((student) => (
                                                <tr key={student.id} className="hover:bg-gray-50">
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0">
                                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                                                    {student.user.name.charAt(0).toUpperCase()}
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{student.user.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="text-sm text-gray-500">{student.user.email}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="text-sm text-gray-500">{student.grade_level}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                            student.is_active 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {student.is_active ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route('parent.students.edit', student.id)}
                                                                className="rounded p-1 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-900"
                                                                title="Edit"
                                                            >
                                                                <PencilIcon className="h-5 w-5" />
                                                            </Link>
                                                            <button
                                                                onClick={() => toggleStudentStatus(student)}
                                                                className={`rounded p-1 ${
                                                                    student.is_active 
                                                                        ? 'text-red-600 hover:bg-red-100 hover:text-red-900' 
                                                                        : 'text-green-600 hover:bg-green-100 hover:text-green-900'
                                                                }`}
                                                                title={student.is_active ? 'Deactivate' : 'Activate'}
                                                            >
                                                                {student.is_active ? (
                                                                    <EyeSlashIcon className="h-5 w-5" />
                                                                ) : (
                                                                    <EyeIcon className="h-5 w-5" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
