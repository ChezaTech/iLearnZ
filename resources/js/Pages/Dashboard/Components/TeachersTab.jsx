import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

// Helper function for route generation
const route = (name, params = {}) => {
    if (name === 'teachers.store') {
        return '/teachers';
    } else if (name === 'teachers.update') {
        return `/teachers/${params}`;
    } else if (name === 'teachers.destroy') {
        return `/teachers/${params}`;
    }
    return '/';
};

const TeachersTab = ({ teachers: initialTeachers, teacherSearch, setTeacherSearch, teacherSchoolFilter, 
                       setTeacherSchoolFilter, teacherSubjectFilter, setTeacherSubjectFilter, schools }) => {
    
    // State for teachers list and modals
    const [teachers, setTeachers] = useState(initialTeachers || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [teacherToEdit, setTeacherToEdit] = useState(null);
    const [teacherToDelete, setTeacherToDelete] = useState(null);
    
    // Update teachers when initialTeachers changes
    useEffect(() => {
        setTeachers(initialTeachers || []);
    }, [initialTeachers]);
    
    // Use Inertia form handling
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        email: '',
        school_id: '',
        subject_specialty: '',
        employment_status: 'Active',
        qualifications: '',
        phone: '',
        address: ''
    });
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    // Reset form data function
    const resetForm = () => {
        reset();
    };
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('teachers.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowAddModal(false);
                resetForm();
                alert('Teacher created successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };
    
    // Handle teacher update
    const handleUpdate = (e) => {
        e.preventDefault();
        
        if (!teacherToEdit) return;
        
        put(route('teachers.update', teacherToEdit.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowEditModal(false);
                setTeacherToEdit(null);
                resetForm();
                alert('Teacher updated successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };
    
    // Handle teacher deletion
    const handleDelete = () => {
        if (!teacherToDelete) return;
        
        destroy(route('teachers.destroy', teacherToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                setTeacherToDelete(null);
                alert('Teacher deleted successfully!');
            },
            onError: (errors) => {
                console.error('Error deleting teacher:', errors);
                alert('An error occurred while deleting the teacher.');
            }
        });
    };
    
    // Filter teachers based on search and filter values
    const filteredTeachers = teachers.filter(teacher => {
        return (
            (teacherSearch === '' || 
                teacher.name.toLowerCase().includes(teacherSearch.toLowerCase())) &&
            (teacherSchoolFilter === '' || 
                teacher.school === teacherSchoolFilter) &&
            (teacherSubjectFilter === '' || 
                teacher.subject === teacherSubjectFilter)
        );
    });
    
    // Get unique schools for filter dropdown
    const uniqueSchools = [...new Set(teachers.map(teacher => teacher.school))];
    
    // Get unique subjects for filter dropdown
    const uniqueSubjects = [...new Set(teachers.map(teacher => teacher.subject))];
    
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Teacher Management</h3>
                
                {/* Search and Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="teacherSearch" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            id="teacherSearch"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="Search teachers..."
                            value={teacherSearch}
                            onChange={(e) => setTeacherSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="teacherSchoolFilter" className="block text-sm font-medium text-gray-700 mb-1">School</label>
                        <select
                            id="teacherSchoolFilter"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={teacherSchoolFilter}
                            onChange={(e) => setTeacherSchoolFilter(e.target.value)}
                        >
                            <option value="">All Schools</option>
                            {uniqueSchools.map((school, index) => (
                                <option key={index} value={school}>{school}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="teacherSubjectFilter" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select
                            id="teacherSubjectFilter"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={teacherSubjectFilter}
                            onChange={(e) => setTeacherSubjectFilter(e.target.value)}
                        >
                            <option value="">All Subjects</option>
                            {uniqueSubjects.map((subject, index) => (
                                <option key={index} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end mb-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add New Teacher
                    </button>
                </div>
            </div>
            
            {/* Teachers Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredTeachers.map((teacher) => (
                                <tr key={teacher.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{teacher.school}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{teacher.subject}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{teacher.classes}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{teacher.students}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            teacher.status === 'Active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {teacher.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3"
                                            onClick={() => {
                                                setTeacherToEdit(teacher);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900"
                                            onClick={() => {
                                                setTeacherToDelete(teacher);
                                                setShowDeleteModal(true);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTeachers.length}</span> of <span className="font-medium">{teachers.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                                Previous
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add Teacher Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Add New Teacher</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowAddModal(false);
                                    resetForm();
                                }}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>
                                <div>
                                    <label htmlFor="school_id" className="block text-sm font-medium text-gray-700 mb-1">School</label>
                                    <select
                                        id="school_id"
                                        name="school_id"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.school_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select School</option>
                                        {schools.map((school) => (
                                            <option key={school.id} value={school.id}>{school.name}</option>
                                        ))}
                                    </select>
                                    {errors.school_id && <div className="text-red-500 text-sm mt-1">{errors.school_id}</div>}
                                </div>
                                <div>
                                    <label htmlFor="subject_specialty" className="block text-sm font-medium text-gray-700 mb-1">Subject Specialty</label>
                                    <input
                                        type="text"
                                        id="subject_specialty"
                                        name="subject_specialty"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.subject_specialty}
                                        onChange={handleChange}
                                    />
                                    {errors.subject_specialty && <div className="text-red-500 text-sm mt-1">{errors.subject_specialty}</div>}
                                </div>
                                <div>
                                    <label htmlFor="employment_status" className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                                    <select
                                        id="employment_status"
                                        name="employment_status"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.employment_status}
                                        onChange={handleChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="On Leave">On Leave</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {errors.employment_status && <div className="text-red-500 text-sm mt-1">{errors.employment_status}</div>}
                                </div>
                                <div>
                                    <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                                    <input
                                        type="text"
                                        id="qualifications"
                                        name="qualifications"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.qualifications}
                                        onChange={handleChange}
                                    />
                                    {errors.qualifications && <div className="text-red-500 text-sm mt-1">{errors.qualifications}</div>}
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Teacher'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Edit Teacher Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Edit Teacher</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setTeacherToEdit(null);
                                    resetForm();
                                }}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdate}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="edit-name"
                                        name="name"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="edit-email"
                                        name="email"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-school_id" className="block text-sm font-medium text-gray-700 mb-1">School</label>
                                    <select
                                        id="edit-school_id"
                                        name="school_id"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.school_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select School</option>
                                        {schools.map((school) => (
                                            <option key={school.id} value={school.id}>{school.name}</option>
                                        ))}
                                    </select>
                                    {errors.school_id && <div className="text-red-500 text-sm mt-1">{errors.school_id}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-subject_specialty" className="block text-sm font-medium text-gray-700 mb-1">Subject Specialty</label>
                                    <input
                                        type="text"
                                        id="edit-subject_specialty"
                                        name="subject_specialty"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.subject_specialty}
                                        onChange={handleChange}
                                    />
                                    {errors.subject_specialty && <div className="text-red-500 text-sm mt-1">{errors.subject_specialty}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-employment_status" className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                                    <select
                                        id="edit-employment_status"
                                        name="employment_status"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.employment_status}
                                        onChange={handleChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="On Leave">On Leave</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {errors.employment_status && <div className="text-red-500 text-sm mt-1">{errors.employment_status}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-qualifications" className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                                    <input
                                        type="text"
                                        id="edit-qualifications"
                                        name="qualifications"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.qualifications}
                                        onChange={handleChange}
                                    />
                                    {errors.qualifications && <div className="text-red-500 text-sm mt-1">{errors.qualifications}</div>}
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setTeacherToEdit(null);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Update Teacher'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Confirm Deletion</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setTeacherToDelete(null);
                                }}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to delete the teacher <span className="font-semibold">{teacherToDelete?.name}</span>? This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end">
                            <button 
                                type="button" 
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setTeacherToDelete(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="button" 
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                onClick={handleDelete}
                                disabled={processing}
                            >
                                {processing ? 'Deleting...' : 'Delete Teacher'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeachersTab;
