import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';

// Helper function for route generation (since we don't have Laravel's route() helper in JS)
const route = (name, params = {}) => {
    if (name === 'schools.store') {
        return '/schools';
    } else if (name === 'schools.destroy') {
        return `/schools/${params}`;
    }
    return '/';
};

const SchoolsTab = ({ schools: initialSchools, schoolSearch, setSchoolSearch, schoolTypeFilter, setSchoolTypeFilter, 
                      schoolDistrictFilter, setSchoolDistrictFilter, schoolConnectivityFilter, 
                      setSchoolConnectivityFilter, districts }) => {
    const [schools, setSchools] = useState(initialSchools || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [schoolToDelete, setSchoolToDelete] = useState(null);
    
    // Update schools when initialSchools changes (after Inertia page refresh)
    useEffect(() => {
        setSchools(initialSchools || []);
    }, [initialSchools]);
    // Use Inertia form handling
    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        district_id: '',
        type: '',
        connectivity_status: 'Online'
    });
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    
    // Reset form data function - using Inertia's reset
    const resetForm = () => {
        reset();
    };
    
    // Handle form submission using Inertia
    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('schools.store'), {
            preserveScroll: true,
            onSuccess: () => {
                // Close the modal and reset the form
                setShowAddModal(false);
                resetForm();
                // Show success message
                alert('School created successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };
    
    // Handle school deletion using Inertia
    const handleDelete = () => {
        if (!schoolToDelete) return;
        
        destroy(route('schools.destroy', schoolToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Close the modal and reset state
                setShowDeleteModal(false);
                setSchoolToDelete(null);
                // Show success message
                alert('School deleted successfully!');
            },
            onError: (errors) => {
                console.error('Error deleting school:', errors);
                alert('An error occurred while deleting the school.');
            }
        });
    };
    
    // Filter schools based on search and filter values
    const filteredSchools = schools.filter(school => {
        return (
            (schoolSearch === '' || 
                school.name.toLowerCase().includes(schoolSearch.toLowerCase())) &&
            (schoolDistrictFilter === '' || 
                school.district === schoolDistrictFilter) &&
            (schoolTypeFilter === '' || 
                school.type === schoolTypeFilter) &&
            (schoolConnectivityFilter === '' || 
                school.connectivity === schoolConnectivityFilter)
        );
    });
    
    // Get unique districts for filter dropdown
    const uniqueDistricts = [...new Set(schools.map(school => school.district))];
    
    // Get unique school types for filter dropdown
    const uniqueSchoolTypes = [...new Set(schools.map(school => school.type))];
    
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">School Management</h3>
                
                {/* Search and Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label htmlFor="schoolSearch" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            id="schoolSearch"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="Search schools..."
                            value={schoolSearch}
                            onChange={(e) => setSchoolSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="schoolTypeFilter" className="block text-sm font-medium text-gray-700 mb-1">School Type</label>
                        <select
                            id="schoolTypeFilter"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={schoolTypeFilter}
                            onChange={(e) => setSchoolTypeFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            {uniqueSchoolTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="schoolDistrictFilter" className="block text-sm font-medium text-gray-700 mb-1">District</label>
                        <select
                            id="schoolDistrictFilter"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={schoolDistrictFilter}
                            onChange={(e) => setSchoolDistrictFilter(e.target.value)}
                        >
                            <option value="">All Districts</option>
                            {uniqueDistricts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="schoolConnectivityFilter" className="block text-sm font-medium text-gray-700 mb-1">Connectivity</label>
                        <select
                            id="schoolConnectivityFilter"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={schoolConnectivityFilter}
                            onChange={(e) => setSchoolConnectivityFilter(e.target.value)}
                        >
                            <option value="">All Connectivity</option>
                            <option value="Online">Online</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Offline">Offline</option>
                        </select>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end mb-4">
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add New School
                    </button>
                </div>
            </div>
            
            {/* Schools Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teachers</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connectivity</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSchools.map((school) => (
                                <tr key={school.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{school.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{school.district}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{school.type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{school.students}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{school.teachers}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            school.connectivity === 'Online' 
                                                ? 'bg-green-100 text-green-800' 
                                                : school.connectivity === 'Hybrid' 
                                                    ? 'bg-yellow-100 text-yellow-800' 
                                                    : 'bg-red-100 text-red-800'
                                        }`}>
                                            {school.connectivity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                        <button 
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => {
                                                setSchoolToDelete(school);
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
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredSchools.length}</span> of <span className="font-medium">{schools.length}</span> results
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium">Previous</button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium">Next</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add School Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New School</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
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
                                    <label htmlFor="district_id" className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <select
                                        id="district_id"
                                        name="district_id"
                                        value={data.district_id}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="">Select District</option>
                                        {districts.map(district => (
                                            <option key={district.id} value={district.id}>{district.name}</option>
                                        ))}
                                    </select>
                                    {errors.district_id && <p className="text-red-500 text-xs mt-1">{errors.district_id}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">School Type</label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Primary">Primary</option>
                                        <option value="Secondary">Secondary</option>
                                        <option value="Combined">Combined</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="connectivity_status" className="block text-sm font-medium text-gray-700 mb-1">Connectivity Status</label>
                                    <select
                                        id="connectivity_status"
                                        name="connectivity_status"
                                        value={data.connectivity_status}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        required
                                    >
                                        <option value="Online">Online</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Offline">Offline</option>
                                    </select>
                                    {errors.connectivity_status && <p className="text-red-500 text-xs mt-1">{errors.connectivity_status}</p>}
                                </div>
                                
                                {/* Student and teacher counts will be managed automatically */}
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        onClick={() => {
                                            setShowAddModal(false);
                                            resetForm();
                                        }}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                                        disabled={processing}
                                    >
                                        {processing ? 'Saving...' : 'Save School'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Delete Confirmation Modal */}
            {showDeleteModal && schoolToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
                            <p className="text-gray-700 mb-6">
                                Are you sure you want to delete <span className="font-semibold">{schoolToDelete.name}</span>? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSchoolToDelete(null);
                                    }}
                                    disabled={processing}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
                                    onClick={handleDelete}
                                    disabled={processing}
                                >
                                    {processing ? 'Deleting...' : 'Delete School'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default SchoolsTab;
