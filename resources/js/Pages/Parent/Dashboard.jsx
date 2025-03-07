import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

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

    const toggleStudentStatus = (student) => {
        router.patch(route('parent.students.toggle-status', student.id), {}, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Parent Dashboard
                    </h2>
                    <Link
                        href={route('parent.students.create')}
                        className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <PlusIcon className="mr-2 h-5 w-5" />
                        Add Student
                    </Link>
                </div>
            }
        >
            <Head title="Parent Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-8 overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-lg font-medium text-gray-900">Welcome to Your Parent Dashboard</h3>
                        <p className="text-gray-600">
                            Here you can manage your children's accounts, monitor their progress, and help them succeed in their learning journey.
                        </p>
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
