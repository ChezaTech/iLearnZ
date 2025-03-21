import { useState, useEffect } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    AcademicCapIcon,
    UserGroupIcon,
    BookOpenIcon,
    BuildingLibraryIcon,
    UserIcon,
    PencilSquareIcon,
    ArrowLeftIcon,
    PlusIcon,
    XMarkIcon,
    UserPlusIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Show({ school, students, teachers, classes, admins, books }) {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Tabs for different sections of the school details
    const tabs = [
        { name: 'overview', label: 'Overview', icon: BuildingLibraryIcon },
        { name: 'students', label: 'Students', icon: AcademicCapIcon },
        { name: 'teachers', label: 'Teachers', icon: UserGroupIcon },
        { name: 'classes', label: 'Classes', icon: BookOpenIcon },
        { name: 'admins', label: 'Administrators', icon: UserIcon },
        { name: 'library', label: 'Library', icon: BookOpenIcon },
    ];

    return (
        <AuthenticatedLayout>
            <Head title={`${school.name} - School Details`} />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Back button and school name */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link 
                                href={route('superadmin.dashboard')} 
                                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                                <span>Back to Dashboard</span>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {school.code}
                            </span>
                        </div>
                        <Link
                            href="#"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <PencilSquareIcon className="h-4 w-4 mr-2" />
                            Edit School
                        </Link>
                    </div>
                    
                    {/* Tabs */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`
                                        flex items-center py-4 px-1 border-b-2 font-medium text-sm
                                        ${activeTab === tab.name
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                    `}
                                >
                                    <tab.icon className="h-5 w-5 mr-2" />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                    
                    {/* Content based on active tab */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {activeTab === 'overview' && <OverviewTab school={school} />}
                        {activeTab === 'students' && <StudentsTab students={students} />}
                        {activeTab === 'teachers' && <TeachersTab teachers={teachers} />}
                        {activeTab === 'classes' && <ClassesTab classes={classes} />}
                        {activeTab === 'admins' && <AdminsTab admins={admins} />}
                        {activeTab === 'library' && <LibraryTab school={school} />}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Overview Tab Component
function OverviewTab({ school }) {
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">School Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">School Name</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.name}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">School Code</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.code}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">District</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.district}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.type}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Connectivity Status</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.connectivity_status}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.address}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">City</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.city}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Province</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.province}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.phone}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.email || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Principal Name</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.principal_name || 'Not provided'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Internet Provider</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.internet_provider || 'Not provided'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Has Smartboards</h3>
                                <p className="mt-1 text-sm text-gray-900">{school.has_smartboards ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Statistics</h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Students</h3>
                                <p className="mt-1 text-2xl font-semibold text-blue-600">{school.student_count}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Teachers</h3>
                                <p className="mt-1 text-2xl font-semibold text-green-600">{school.teacher_count}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Classes</h3>
                                <p className="mt-1 text-2xl font-semibold text-purple-600">0</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <h3 className="text-sm font-medium text-gray-500">Books</h3>
                                <p className="mt-1 text-2xl font-semibold text-amber-600">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Students Tab Component
function StudentsTab({ students }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        grade: '',
        parent_id: '',
        school_id: students && students.length > 0 ? students[0].school_id : null
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('students.store'), {
            onSuccess: () => {
                setShowAddModal(false);
                reset();
            }
        });
    };
    
    const handleEdit = (student) => {
        setSelectedStudent(student);
        setData({
            name: student.name,
            email: student.email,
            grade: student.grade || '',
            parent_id: student.parent_id || '',
            school_id: student.school_id
        });
        setShowEditModal(true);
    };
    
    const handleUpdate = (e) => {
        e.preventDefault();
        put(route('students.update', selectedStudent.id), {
            onSuccess: () => {
                setShowEditModal(false);
                setSelectedStudent(null);
                reset();
            }
        });
    };
    
    const handleDelete = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };
    
    const confirmDelete = () => {
        axios.delete(route('students.destroy', selectedStudent.id))
            .then(() => {
                setShowDeleteModal(false);
                setSelectedStudent(null);
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };
    
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Students</h2>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Student
                </button>
            </div>
            
            {students && students.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">{student.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${student.performance === 'Excellent' ? 'bg-green-100 text-green-800' : 
                                            student.performance === 'Good' ? 'bg-blue-100 text-blue-800' : 
                                            student.performance === 'Average' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'}`}>
                                            {student.performance}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button 
                                            onClick={() => handleEdit(student)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(student)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No students found for this school.</p>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Student
                    </button>
                </div>
            )}
            
            {/* Add Student Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Student</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700 mb-1">Parent ID</label>
                                    <input
                                        type="text"
                                        id="parent_id"
                                        name="parent_id"
                                        value={data.parent_id}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.parent_id && <p className="text-red-500 text-xs mt-1">{errors.parent_id}</p>}
                                </div>
                                
                                <input type="hidden" name="school_id" value={data.school_id} />
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Student'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Edit Student Modal */}
            {showEditModal && selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Student</h3>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-4">
                                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="edit-name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="edit-email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-grade" className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                                    <input
                                        type="text"
                                        id="edit-grade"
                                        name="grade"
                                        value={data.grade}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-parent_id" className="block text-sm font-medium text-gray-700 mb-1">Parent ID</label>
                                    <input
                                        type="text"
                                        id="edit-parent_id"
                                        name="parent_id"
                                        value={data.parent_id}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.parent_id && <p className="text-red-500 text-xs mt-1">{errors.parent_id}</p>}
                                </div>
                                
                                <input type="hidden" name="school_id" value={data.school_id} />
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setSelectedStudent(null);
                                            reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Student'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Delete Student Modal */}
            {showDeleteModal && selectedStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Student: {selectedStudent.name}</h3>
                            <p className="text-sm text-gray-500">Are you sure you want to delete this student? This action cannot be undone.</p>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedStudent(null);
                                    }}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700"
                                >
                                    Delete Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Teachers Tab Component
function TeachersTab({ teachers }) {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Teachers</h2>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Teacher
                </button>
            </div>
            
            {teachers && teachers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teachers.map((teacher) => (
                                <tr key={teacher.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">{teacher.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${teacher.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No teachers found for this school.</p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Teacher
                    </button>
                </div>
            )}
        </div>
    );
}

// Classes Tab Component
function ClassesTab({ classes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const { auth } = usePage().props;
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        grade_level: '',
        teacher_id: '',
        school_id: window.location.pathname.split('/').pop(),
    });

    const fetchTeachers = async (schoolId) => {
        try {
            const response = await axios.get(`/api/schools/${schoolId}/teachers`);
            setTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const fetchClassStudents = async (classId) => {
        try {
            const response = await axios.get(`/api/classes/${classId}/students`);
            setStudents(response.data.enrolled);
            setAvailableStudents(response.data.available);
        } catch (error) {
            console.error('Error fetching class students:', error);
        }
    };

    const openModal = (classItem = null) => {
        const schoolId = window.location.pathname.split('/').pop();
        
        // Fetch teachers for this school
        fetchTeachers(schoolId);
        
        if (classItem) {
            setEditingClass(classItem);
            setData({
                name: classItem.name,
                grade_level: classItem.grade,
                teacher_id: classItem.teacher_id || '',
                school_id: schoolId,
            });
        } else {
            setEditingClass(null);
            reset();
            setData('school_id', schoolId);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingClass(null);
        reset();
    };

    const openStudentModal = (classItem) => {
        setSelectedClass(classItem);
        fetchClassStudents(classItem.id);
        setIsStudentModalOpen(true);
    };

    const closeStudentModal = () => {
        setIsStudentModalOpen(false);
        setSelectedClass(null);
        setStudents([]);
        setAvailableStudents([]);
        setSelectedStudent('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingClass) {
            put(route('classes.update', editingClass.id), {
                onSuccess: () => {
                    closeModal();
                    window.location.reload(); // Reload to see changes
                },
            });
        } else {
            post(route('classes.store'), {
                onSuccess: () => {
                    closeModal();
                    window.location.reload(); // Reload to see changes
                },
            });
        }
    };

    const addStudentToClass = () => {
        if (!selectedStudent || !selectedClass) return;

        post(route('classes.students.add', selectedClass.id), {
            student_id: selectedStudent
        }, {
            onSuccess: () => {
                // Refresh the student lists
                fetchClassStudents(selectedClass.id);
                setSelectedStudent('');
            }
        });
    };

    const removeStudentFromClass = (studentId) => {
        if (!selectedClass) return;

        axios.delete(route('classes.students.remove', selectedClass.id), {
            data: { student_id: studentId }
        }).then(() => {
            // Refresh the student lists
            fetchClassStudents(selectedClass.id);
        }).catch(error => {
            console.error('Error removing student:', error);
        });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Classes</h2>
                <button 
                    onClick={() => openModal()}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Class
                </button>
            </div>
            
            {classes && classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {classes.map((classItem) => (
                        <div key={classItem.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">Grade {classItem.grade}</p>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500">Students</p>
                                        <p className="text-sm font-medium">{classItem.student_count}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Teacher</p>
                                        <p className="text-sm font-medium">{classItem.teacher_name}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                                    <button 
                                        onClick={() => openModal(classItem)}
                                        className="text-blue-600 hover:text-blue-900 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => openStudentModal(classItem)}
                                        className="text-blue-600 hover:text-blue-900 text-sm"
                                    >
                                        Manage Students
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No classes found for this school.</p>
                    <button 
                        onClick={() => openModal()}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Class
                    </button>
                </div>
            )}

            {/* Add/Edit Class Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {editingClass ? 'Edit Class' : 'Add New Class'}
                            </h3>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Class Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="grade_level" className="block text-sm font-medium text-gray-700">Grade Level</label>
                                    <input
                                        type="text"
                                        id="grade_level"
                                        value={data.grade_level}
                                        onChange={e => setData('grade_level', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                    {errors.grade_level && <p className="mt-1 text-sm text-red-600">{errors.grade_level}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">Teacher (Optional)</label>
                                    <select
                                        id="teacher_id"
                                        value={data.teacher_id}
                                        onChange={e => setData('teacher_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Select a teacher</option>
                                        {teachers.map(teacher => (
                                            <option key={teacher.id} value={teacher.id}>
                                                {teacher.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.teacher_id && <p className="mt-1 text-sm text-red-600">{errors.teacher_id}</p>}
                                </div>
                                
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {processing ? 'Saving...' : (editingClass ? 'Update Class' : 'Add Class')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Students Modal */}
            {isStudentModalOpen && selectedClass && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Students for {selectedClass.name}</h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-2">Enrolled Students</h4>
                                    <ul>
                                        {students.map((student) => (
                                            <li key={student.id} className="py-2">
                                                <span className="text-sm text-gray-500">{student.name}</span>
                                                <button 
                                                    onClick={() => removeStudentFromClass(student.id)}
                                                    className="ml-2 text-red-600 hover:text-red-900 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-2">Available Students</h4>
                                    <select
                                        value={selectedStudent}
                                        onChange={(e) => setSelectedStudent(e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="">Select a student</option>
                                        {availableStudents.map((student) => (
                                            <option key={student.id} value={student.id}>
                                                {student.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={addStudentToClass}
                                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Add Student
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeStudentModal}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Admins Tab Component
function AdminsTab({ admins }) {
    const [showAddExistingModal, setShowAddExistingModal] = useState(false);
    const [showCreateNewModal, setShowCreateNewModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [adminsList, setAdminsList] = useState(admins || []);
    const { auth } = usePage().props;
    
    const school = usePage().props.school;
    
    const addExistingForm = useForm({
        user_id: '',
        school_id: school.id,
        admin_role: 'school_admin',
    });
    
    const createNewForm = useForm({
        name: '',
        email: '',
        password: '',
        school_id: school.id,
        admin_role: 'school_admin',
    });
    
    const searchUsers = async () => {
        if (searchTerm.length < 2) return;
        
        setIsSearching(true);
        try {
            const response = await axios.get(route('admins.existing-users'), {
                params: {
                    search: searchTerm,
                    school_id: school.id
                }
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        } finally {
            setIsSearching(false);
        }
    };
    
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchTerm.length >= 2) {
                searchUsers();
            }
        }, 500);
        
        return () => clearTimeout(delaySearch);
    }, [searchTerm]);
    
    const selectUser = (user) => {
        setSelectedUser(user);
        addExistingForm.setData('user_id', user.id);
    };
    
    const handleAddExistingSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(route('admins.add-existing'), addExistingForm.data);
            
            if (response.data.success) {
                setAdminsList([...adminsList, response.data.admin]);
                setShowAddExistingModal(false);
                addExistingForm.reset();
                setSelectedUser(null);
            }
        } catch (error) {
            console.error('Error adding existing user as admin:', error);
            if (error.response && error.response.data.errors) {
                addExistingForm.setError(error.response.data.errors);
            }
        }
    };
    
    const handleCreateNewSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(route('admins.create-new'), createNewForm.data);
            
            if (response.data.success) {
                setAdminsList([...adminsList, response.data.admin]);
                setShowCreateNewModal(false);
                createNewForm.reset();
            }
        } catch (error) {
            console.error('Error creating new admin:', error);
            if (error.response && error.response.data.errors) {
                createNewForm.setError(error.response.data.errors);
            }
        }
    };
    
    const openAddModal = () => {
        setShowAddExistingModal(true);
    };
    
    const openCreateModal = () => {
        setShowCreateNewModal(true);
    };
    
    // Generate a random password
    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        createNewForm.setData('password', password);
    };
    
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">School Administrators</h2>
                <div className="flex space-x-2">
                    <button 
                        onClick={openAddModal}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    >
                        <UserPlusIcon className="h-4 w-4 mr-2" />
                        Add Existing User
                    </button>
                    <button 
                        onClick={openCreateModal}
                        className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Create New Admin
                    </button>
                </div>
            </div>
            
            {adminsList && adminsList.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {adminsList.map((admin) => (
                                <tr key={admin.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-600 font-medium">{admin.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${admin.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No administrators found for this school.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button 
                            onClick={openAddModal}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                        >
                            <UserPlusIcon className="h-4 w-4 mr-2" />
                            Add Existing User
                        </button>
                        <button 
                            onClick={openCreateModal}
                            className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Create New Admin
                        </button>
                    </div>
                </div>
            )}
            
            {/* Add Existing User Modal */}
            {showAddExistingModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Add Existing User as Administrator</h3>
                            <button 
                                onClick={() => {
                                    setShowAddExistingModal(false);
                                    setSelectedUser(null);
                                    addExistingForm.reset();
                                }}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddExistingSubmit}>
                            <div className="mb-4">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                                    Search for User
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="search"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Search by name or email"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                
                                {isSearching && (
                                    <div className="mt-2 text-sm text-gray-500">Searching...</div>
                                )}
                                
                                {searchResults.length > 0 && (
                                    <div className="mt-2 border border-gray-200 rounded-md max-h-40 overflow-y-auto">
                                        {searchResults.map(user => (
                                            <div 
                                                key={user.id}
                                                onClick={() => selectUser(user)}
                                                className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? 'bg-blue-50' : ''}`}
                                            >
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                                <div className="text-xs text-gray-400">Current role: {user.user_type}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                {searchTerm.length >= 2 && searchResults.length === 0 && !isSearching && (
                                    <div className="mt-2 text-sm text-gray-500">No users found. Try a different search term.</div>
                                )}
                            </div>
                            
                            {selectedUser && (
                                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                                    <div className="font-medium">Selected User:</div>
                                    <div>{selectedUser.name} ({selectedUser.email})</div>
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <label htmlFor="admin_role" className="block text-sm font-medium text-gray-700 mb-1">
                                    Administrator Role
                                </label>
                                <select
                                    id="admin_role"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={addExistingForm.data.admin_role}
                                    onChange={e => addExistingForm.setData('admin_role', e.target.value)}
                                >
                                    <option value="school_admin">School Admin</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {addExistingForm.errors.admin_role && (
                                    <div className="text-red-500 text-sm mt-1">{addExistingForm.errors.admin_role}</div>
                                )}
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddExistingModal(false);
                                        setSelectedUser(null);
                                        addExistingForm.reset();
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!selectedUser || addExistingForm.processing}
                                    className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                                        !selectedUser || addExistingForm.processing
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {addExistingForm.processing ? 'Adding...' : 'Add as Administrator'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Create New Admin Modal */}
            {showCreateNewModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Create New Administrator</h3>
                            <button 
                                onClick={() => {
                                    setShowCreateNewModal(false);
                                    createNewForm.reset();
                                }}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleCreateNewSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter full name"
                                    value={createNewForm.data.name}
                                    onChange={e => createNewForm.setData('name', e.target.value)}
                                />
                                {createNewForm.errors.name && (
                                    <div className="text-red-500 text-sm mt-1">{createNewForm.errors.name}</div>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter email address"
                                    value={createNewForm.data.email}
                                    onChange={e => createNewForm.setData('email', e.target.value)}
                                />
                                {createNewForm.errors.email && (
                                    <div className="text-red-500 text-sm mt-1">{createNewForm.errors.email}</div>
                                )}
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        id="password"
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Enter password"
                                        value={createNewForm.data.password}
                                        onChange={e => createNewForm.setData('password', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={generatePassword}
                                        className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-r-md text-sm font-medium text-gray-700 hover:bg-gray-300"
                                    >
                                        Generate
                                    </button>
                                </div>
                                {createNewForm.errors.password && (
                                    <div className="text-red-500 text-sm mt-1">{createNewForm.errors.password}</div>
                                )}
                                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long.</p>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="create_admin_role" className="block text-sm font-medium text-gray-700 mb-1">
                                    Administrator Role
                                </label>
                                <select
                                    id="create_admin_role"
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    value={createNewForm.data.admin_role}
                                    onChange={e => createNewForm.setData('admin_role', e.target.value)}
                                >
                                    <option value="school_admin">School Admin</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {createNewForm.errors.admin_role && (
                                    <div className="text-red-500 text-sm mt-1">{createNewForm.errors.admin_role}</div>
                                )}
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCreateNewModal(false);
                                        createNewForm.reset();
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createNewForm.processing}
                                    className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                                        createNewForm.processing
                                            ? 'bg-green-400 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {createNewForm.processing ? 'Creating...' : 'Create Administrator'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Library Tab Component
function LibraryTab({ school }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        author: '',
        isbn: '',
        publication_year: '',
        category: '',
        school_id: school.id,
    });

    const borrowForm = useForm({
        user_id: '',
        due_date: '',
        book_id: '',
    });

    const [books, setBooks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBorrowModal, setShowBorrowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const { auth } = usePage().props;

    useEffect(() => {
        // Fetch books for this school
        axios.get(`/api/schools/${school.id}/books`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }, [school.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const submitBook = (e) => {
        e.preventDefault();
        post(route('books.store'), {
            onSuccess: () => {
                setShowAddModal(false);
                reset();
            }
        });
    };

    const openEditModal = (book) => {
        setSelectedBook(book);
        setData({
            title: book.title,
            author: book.author,
            isbn: book.isbn || '',
            publication_year: book.publication_year || '',
            category: book.category || '',
            school_id: school.id,
        });
        setShowEditModal(true);
    };

    const updateBook = (e) => {
        e.preventDefault();
        put(route('books.update', selectedBook.id), {
            onSuccess: () => {
                reset();
                setShowEditModal(false);
                setSelectedBook(null);
                // Refresh books list
                axios.get(`/api/schools/${school.id}/books`)
                    .then(response => {
                        setBooks(response.data);
                    });
            }
        });
    };

    const openBorrowModal = (book) => {
        setSelectedBook(book);
        borrowForm.setData('book_id', book.id);
        setShowBorrowModal(true);
    };

    const borrowBook = (e) => {
        e.preventDefault();
        borrowForm.post(route('books.borrow', selectedBook.id), {
            onSuccess: () => {
                borrowForm.reset();
                setShowBorrowModal(false);
                setSelectedBook(null);
                // Refresh books list
                axios.get(`/api/schools/${school.id}/books`)
                    .then(response => {
                        setBooks(response.data);
                    });
            }
        });
    };

    const returnBook = (book) => {
        if (confirm('Are you sure you want to mark this book as returned?')) {
            axios.post(route('books.return', book.id))
                .then(() => {
                    // Refresh books list
                    axios.get(`/api/schools/${school.id}/books`)
                        .then(response => {
                            setBooks(response.data);
                        });
                })
                .catch(error => {
                    console.error('Error returning book:', error);
                });
        }
    };

    const deleteBook = (book) => {
        if (confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
            axios.delete(route('books.destroy', book.id))
                .then(() => {
                    // Refresh books list
                    axios.get(`/api/schools/${school.id}/books`)
                        .then(response => {
                            setBooks(response.data);
                        });
                })
                .catch(error => {
                    console.error('Error deleting book:', error);
                });
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Library Books</h2>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Book
                </button>
            </div>
            
            {books && books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                            <div className="h-40 bg-gray-200 flex items-center justify-center">
                                <BookOpenIcon className="h-16 w-16 text-gray-400" />
                            </div>
                            <div className="p-4">
                                <h3 className="text-md font-semibold text-gray-900 truncate">{book.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">By {book.author}</p>
                                {book.isbn && <p className="text-xs text-gray-500 mt-1">ISBN: {book.isbn}</p>}
                                {book.category && <p className="text-xs text-gray-500 mt-1">Category: {book.category}</p>}
                                {book.publication_year && <p className="text-xs text-gray-500 mt-1">Published: {book.publication_year}</p>}
                                
                                <div className="mt-3 flex justify-between items-center">
                                    <span className={`px-2 py-1 text-xs rounded-full 
                                        ${!book.is_borrowed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {!book.is_borrowed ? 'Available' : 'Borrowed'}
                                    </span>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => openEditModal(book)}
                                            className="text-blue-600 hover:text-blue-900 text-sm"
                                        >
                                            Edit
                                        </button>
                                        {!book.is_borrowed ? (
                                            <button 
                                                onClick={() => openBorrowModal(book)}
                                                className="text-green-600 hover:text-green-900 text-sm"
                                            >
                                                Borrow
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => returnBook(book)}
                                                className="text-orange-600 hover:text-orange-900 text-sm"
                                            >
                                                Return
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => deleteBook(book)}
                                            className="text-red-600 hover:text-red-900 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 p-6 text-center rounded-lg">
                    <p className="text-gray-500">No books found in the library.</p>
                    <button 
                        onClick={() => setShowAddModal(true)}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Book
                    </button>
                </div>
            )}
            
            {/* Add Book Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Book</h3>
                            <form onSubmit={submitBook}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        value={data.author}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                                    <input
                                        type="text"
                                        id="isbn"
                                        name="isbn"
                                        value={data.isbn}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
                                    <input
                                        type="number"
                                        id="publication_year"
                                        name="publication_year"
                                        value={data.publication_year}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.publication_year && <p className="text-red-500 text-xs mt-1">{errors.publication_year}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={data.category}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                                
                                <input type="hidden" name="school_id" value={data.school_id} />
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Book'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Edit Book Modal */}
            {showEditModal && selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Book</h3>
                            <form onSubmit={updateBook}>
                                <div className="mb-4">
                                    <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        id="edit-title"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <input
                                        type="text"
                                        id="edit-author"
                                        name="author"
                                        value={data.author}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    />
                                    {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-isbn" className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                                    <input
                                        type="text"
                                        id="edit-isbn"
                                        name="isbn"
                                        value={data.isbn}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.isbn && <p className="text-red-500 text-xs mt-1">{errors.isbn}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-publication_year" className="block text-sm font-medium text-gray-700 mb-1">Publication Year</label>
                                    <input
                                        type="number"
                                        id="edit-publication_year"
                                        name="publication_year"
                                        value={data.publication_year}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.publication_year && <p className="text-red-500 text-xs mt-1">{errors.publication_year}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        id="edit-category"
                                        name="category"
                                        value={data.category}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setSelectedBook(null);
                                            reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update Book'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Borrow Book Modal */}
            {showBorrowModal && selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Borrow Book: {selectedBook.title}</h3>
                            <form onSubmit={borrowBook}>
                                <div className="mb-4">
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">Student/User</label>
                                    <select
                                        id="user_id"
                                        name="user_id"
                                        value={borrowForm.data.user_id}
                                        onChange={(e) => borrowForm.setData('user_id', e.target.value)}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="">Select a user</option>
                                        {/* This would be populated with users from the school */}
                                        <option value="1">John Doe (Student)</option>
                                        <option value="2">Jane Smith (Teacher)</option>
                                    </select>
                                    {borrowForm.errors.user_id && <p className="text-red-500 text-xs mt-1">{borrowForm.errors.user_id}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        id="due_date"
                                        name="due_date"
                                        value={borrowForm.data.due_date}
                                        onChange={(e) => borrowForm.setData('due_date', e.target.value)}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    {borrowForm.errors.due_date && <p className="text-red-500 text-xs mt-1">{borrowForm.errors.due_date}</p>}
                                </div>
                                
                                <input type="hidden" name="book_id" value={selectedBook.id} />
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowBorrowModal(false);
                                            setSelectedBook(null);
                                            borrowForm.reset();
                                        }}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={borrowForm.processing}
                                        className="px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {borrowForm.processing ? 'Processing...' : 'Confirm Borrowing'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
