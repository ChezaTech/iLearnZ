import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

// Helper function for route generation
const route = (name, params = {}) => {
    if (name === 'resources.store') {
        return '/resources';
    } else if (name === 'resources.update') {
        return `/resources/${params}`;
    } else if (name === 'resources.destroy') {
        return `/resources/${params}`;
    }
    return '/';
};

const ResourcesTab = ({ resources: initialResources, resourceSearch, setResourceSearch, resourceTypeFilter, 
                       setResourceTypeFilter, resourceLocationFilter, setResourceLocationFilter }) => {
    
    // State for resources list and modals
    const [resources, setResources] = useState(initialResources || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [resourceToEdit, setResourceToEdit] = useState(null);
    const [resourceToDelete, setResourceToDelete] = useState(null);
    
    // Update resources when initialResources changes
    useEffect(() => {
        setResources(initialResources || []);
    }, [initialResources]);
    
    // Use Inertia form handling
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        type: '',
        quantity: 1,
        location: '',
        status: 'Available'
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
        
        post(route('resources.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setShowAddModal(false);
                resetForm();
                alert('Resource created successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };
    
    // Open edit modal and populate form with resource data
    const handleEditClick = (resource) => {
        setResourceToEdit(resource);
        setData({
            name: resource.name || '',
            type: resource.type || '',
            quantity: resource.quantity || 1,
            location: resource.location || '',
            status: resource.status || 'Available'
        });
        setShowEditModal(true);
    };
    
    // Handle resource update
    const handleUpdate = (e) => {
        e.preventDefault();
        
        if (!resourceToEdit) return;
        
        put(route('resources.update', resourceToEdit.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowEditModal(false);
                setResourceToEdit(null);
                resetForm();
                alert('Resource updated successfully!');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };
    
    // Open delete confirmation modal
    const handleDeleteClick = (resource) => {
        setResourceToDelete(resource);
        setShowDeleteModal(true);
    };
    
    // Handle resource deletion
    const handleDelete = () => {
        if (!resourceToDelete) return;
        
        destroy(route('resources.destroy', resourceToDelete.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                setResourceToDelete(null);
                alert('Resource deleted successfully!');
            },
            onError: (errors) => {
                console.error('Error deleting resource:', errors);
                alert('An error occurred while deleting the resource.');
            }
        });
    };
    
    // Filter resources based on search and filter values
    const filteredResources = resources.filter(resource => {
        return (
            (resourceSearch === '' || 
                resource.name.toLowerCase().includes(resourceSearch.toLowerCase())) &&
            (resourceTypeFilter === '' || 
                resource.type === resourceTypeFilter) &&
            (resourceLocationFilter === '' || 
                resource.location === resourceLocationFilter)
        );
    });
    
    // Get unique resource types for filter dropdown
    const uniqueResourceTypes = [...new Set(resources.map(resource => resource.type))];
    
    // Get unique locations for filter dropdown
    const uniqueLocations = [...new Set(resources.map(resource => resource.location))];
    
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Resource Management</h3>
                
                {/* Search and Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label htmlFor="resourceSearch" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                        <input
                            type="text"
                            id="resourceSearch"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            placeholder="Search resources..."
                            value={resourceSearch}
                            onChange={(e) => setResourceSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="resourceTypeFilter" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            id="resourceTypeFilter"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={resourceTypeFilter}
                            onChange={(e) => setResourceTypeFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            {uniqueResourceTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="resourceLocationFilter" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <select
                            id="resourceLocationFilter"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            value={resourceLocationFilter}
                            onChange={(e) => setResourceLocationFilter(e.target.value)}
                        >
                            <option value="">All Locations</option>
                            {uniqueLocations.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end mb-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add New Resource
                    </button>
                </div>
            </div>
            
            {/* Add Resource Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Add New Resource</h3>
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
                            <div className="space-y-4 mb-4">
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
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <input
                                        type="text"
                                        id="type"
                                        name="type"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.type}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                                </div>
                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.location}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Limited">Limited</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                    {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
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
                                    {processing ? 'Saving...' : 'Save Resource'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Edit Resource Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Edit Resource</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setResourceToEdit(null);
                                    resetForm();
                                }}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdate}>
                            <div className="space-y-4 mb-4">
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
                                    <label htmlFor="edit-type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <input
                                        type="text"
                                        id="edit-type"
                                        name="type"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.type}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        id="edit-quantity"
                                        name="quantity"
                                        min="1"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input
                                        type="text"
                                        id="edit-location"
                                        name="location"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.location}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        id="edit-status"
                                        name="status"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.status}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Limited">Limited</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                    {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setResourceToEdit(null);
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
                                    {processing ? 'Saving...' : 'Update Resource'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Resources Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredResources.map((resource) => (
                                <tr key={resource.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{resource.type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{resource.quantity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{resource.location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            resource.status === 'Available' 
                                                ? 'bg-green-100 text-green-800' 
                                                : resource.status === 'Limited' 
                                                    ? 'bg-yellow-100 text-yellow-800' 
                                                    : 'bg-red-100 text-red-800'
                                        }`}>
                                            {resource.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEditClick(resource)}>Edit</button>
                                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteClick(resource)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredResources.length}</span> of <span className="font-medium">{resources.length}</span> results
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
        </>
    );
};

export default ResourcesTab;
