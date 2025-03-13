import React from 'react';

const ResourcesTab = ({ resources, resourceSearch, setResourceSearch, resourceTypeFilter, 
                       setResourceTypeFilter, resourceLocationFilter, setResourceLocationFilter }) => {
    
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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Add New Resource
                    </button>
                </div>
            </div>
            
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
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
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
