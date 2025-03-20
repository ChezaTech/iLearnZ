import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeftIcon, 
    PencilSquareIcon, 
    XMarkIcon,
    AcademicCapIcon,
    BookOpenIcon,
    ChartBarIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

export default function Show({ student }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const { data, setData, put, processing, errors, reset } = useForm({
        name: student.name,
        email: student.email,
        grade: student.student?.grade_level || '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    
    const openEditModal = () => {
        setIsEditModalOpen(true);
    };
    
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        reset();
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('students.update', student.id), {
            onSuccess: () => {
                closeEditModal();
                window.location.reload(); // Reload to see the updated student
            }
        });
    };
    
    return (
        <AuthenticatedLayout>
            <Head title={`${student.name} - Student Details`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Back button and student name */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link 
                                href={route('schools.show', student.school_id)} 
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                                <span>Back to School</span>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                Student
                            </span>
                        </div>
                        <button
                            onClick={openEditModal}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <PencilSquareIcon className="h-4 w-4 mr-2" />
                            Edit Student
                        </button>
                    </div>
                    
                    {/* Student Details */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                                <p className="mt-1 text-sm text-gray-900">{student.name}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                                <p className="mt-1 text-sm text-gray-900">{student.email}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Grade Level</h3>
                                                <p className="mt-1 text-sm text-gray-900">{student.student?.grade_level || 'Not assigned'}</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                                <p className="mt-1">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h2>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Classes</h3>
                                                <p className="mt-1 text-sm text-gray-900">No classes assigned</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Subjects</h3>
                                                <p className="mt-1 text-sm text-gray-900">No subjects assigned</p>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-500">Performance</h3>
                                                <p className="mt-1">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        No data available
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">No recent activity to display.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Edit Student Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Edit Student</h2>
                                <button
                                    onClick={closeEditModal}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                                    <input
                                        type="text"
                                        id="grade"
                                        name="grade"
                                        value={data.grade}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                                </div>
                                
                                <div className="flex justify-end mt-6">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-3"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
