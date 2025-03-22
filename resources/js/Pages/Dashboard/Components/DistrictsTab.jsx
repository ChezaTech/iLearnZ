import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Helper function for route generation
const route = (name, params = {}) => {
    if (name === "districts.store") {
        return "/districts";
    } else if (name === "districts.update") {
        // Make sure we're handling both object and primitive ID cases
        const id = typeof params === "object" ? params.id : params;
        return `/districts/${id}`;
    } else if (name === "districts.destroy") {
        // Make sure we're handling both object and primitive ID cases
        const id = typeof params === "object" ? params.id : params;
        return `/districts/${id}`;
    }
    return "/";
};

const DistrictsTab = ({
    districts: initialDistricts,
    filteredDistricts,
    districtSearch,
    setDistrictSearch,
    districtRegionFilter,
    setDistrictRegionFilter,
    districtData: externalDistrictData,
    schools = [],
    teachers = [],
    students = [],
}) => {
    // State for districts list and modals
    const [districts, setDistricts] = useState(initialDistricts || []);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [districtToEdit, setDistrictToEdit] = useState(null);
    const [districtToDelete, setDistrictToDelete] = useState(null);

    // Update districts when initialDistricts changes
    useEffect(() => {
        console.log("Initial districts from props:", initialDistricts);
        setDistricts(initialDistricts || []);
        console.log("Final District Data:", districtData);
    }, [initialDistricts]);

    // Use Inertia form handling
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        name: "",
        region: "",
        province: "",
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Reset form data function
    const resetForm = () => {
        reset();
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("districts.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setShowAddModal(false);
                resetForm();
                alert("District created successfully!");
            },
            onError: (errors) => {
                console.error("Validation errors:", errors);
            },
        });
    };

    // Open edit modal and populate form with district data
    const handleEditClick = (district) => {
        console.log("Editing district:", district);
        console.log("District properties:", Object.keys(district));
        console.log("District JSON:", JSON.stringify(district, null, 2));

        setDistrictToEdit(district);
        setData({
            name: district.name || "",
            region: district.region ? district.region : "",
            province: district.province ? district.province : "",
        });
        setShowEditModal(true);
    };

    // Handle district update
    const handleUpdate = (e) => {
        e.preventDefault();

        if (!districtToEdit) return;

        // Get the district ID from the table row data attribute
        const districtRow = document.querySelector(
            `tr[data-district-id="${districtToEdit.name}"]`
        );
        const districtId = districtRow
            ? districtRow.getAttribute("data-district-id")
            : null;

        console.log("Updating district with name:", districtToEdit.name);
        console.log("District ID from DOM:", districtId);
        console.log("Form data being sent:", data);

        // If we can't find the ID, try to use the name as a fallback
        const idToUse = districtId || districtToEdit.name;
        console.log("Using ID for update:", idToUse);

        put(route("districts.update", idToUse), {
            data,
            preserveScroll: true,
            onSuccess: (response) => {
                console.log("Update success response:", response);
                // Update the districts state with the new data if available
                if (response?.props?.initialDistricts) {
                    setDistricts(response.props.initialDistricts);
                }
                setShowEditModal(false);
                setDistrictToEdit(null);
                resetForm();
                alert("District updated successfully!");
            },
            onError: (errors) => {
                console.error("Validation errors:", errors);
            },
        });
    };

    // Open delete confirmation modal
    const handleDeleteClick = (district) => {
        setDistrictToDelete(district);
        setShowDeleteModal(true);
    };

    // Handle district deletion
    const handleDelete = () => {
        if (!districtToDelete) return;

        // Get the district ID from the table row data attribute
        const districtRow = document.querySelector(
            `tr[data-district-id="${districtToDelete.name}"]`
        );
        const districtId = districtRow
            ? districtRow.getAttribute("data-district-id")
            : null;

        console.log("Deleting district with name:", districtToDelete.name);
        console.log("District ID from DOM:", districtId);

        // If we can't find the ID, try to use the name as a fallback
        const idToUse = districtId || districtToDelete.name;
        console.log("Using ID for delete:", idToUse);

        destroy(route("districts.destroy", idToUse), {
            preserveScroll: true,
            onSuccess: (response) => {
                console.log("Delete success response:", response);
                // Update the districts state with the new data if available
                if (response?.props?.initialDistricts) {
                    setDistricts(response.props.initialDistricts);
                }
                setShowDeleteModal(false);
                setDistrictToDelete(null);
                alert('District deleted successfully!');
            },
            onError: (errors) => {
                console.error("Error deleting district:", errors);
                alert("An error occurred while deleting the district.");
            },
        });
    };

    const computedDistricts = districts.map((district) => ({
        id: district.id,
        name: district.name,
        region: district.region,
        province: district.province,
        schools: schools.filter((school) => school.district === district.name)
            .length,
        teachers: teachers.filter((teacher) =>
            schools.find(
                (school) =>
                    school.name === teacher.school &&
                    school.district === district.name
            )
        ).length,
        students: students.filter((student) =>
            schools.find(
                (school) =>
                    school.name === student.school &&
                    school.district === district.name
            )
        ).length,
    }));

    // Calculate district data based on fetched data
    const districtData = externalDistrictData
        ? computedDistricts.map((district) => {
              const external = externalDistrictData.find(
                  (ext) => ext.name === district.name
              );
              return {
                  ...district,
                  // Only override region and province if external has them
                  region: external?.region || district.region,
                  province: external?.province || district.province,
                  // Use external counts only if they exist; otherwise, keep computed counts
                  schools:
                      external && external.schools !== undefined
                          ? external.schools
                          : district.schools,
                  teachers:
                      external && external.teachers !== undefined
                          ? external.teachers
                          : district.teachers,
                  students:
                      external && external.students !== undefined
                          ? external.students
                          : district.students,
              };
          })
        : computedDistricts;

    return (
        <>
            <div className="bg-white p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    District Management
                </h3>

                {/* Action Buttons */}
                <div className="flex justify-end mb-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add New District
                    </button>
                </div>

                {/* Districts Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Region
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Province
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Schools
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Teachers
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Students
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {districtData.map((district) => (
                                    <tr
                                        key={district.id}
                                        data-district-id={district.name}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {district.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {district.region}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {district.province}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {district.schools}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {district.teachers}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {district.students}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                                onClick={() =>
                                                    handleEditClick(district)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900"
                                                onClick={() =>
                                                    handleDeleteClick(district)
                                                }
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
                                Showing <span className="font-medium">1</span>{" "}
                                to{" "}
                                <span className="font-medium">
                                    {districtData.length}
                                </span>{" "}
                                of{" "}
                                <span className="font-medium">
                                    {districtData.length}
                                </span>{" "}
                                results
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                    disabled
                                >
                                    Previous
                                </button>
                                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* District Statistics Chart */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    District Statistics
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={districtData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="schools"
                                fill="#8884d8"
                                name="Schools"
                            />
                            <Bar
                                dataKey="teachers"
                                fill="#82ca9d"
                                name="Teachers"
                            />
                            <Bar
                                dataKey="students"
                                fill="#ffc658"
                                name="Students (x10)"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Add District Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Add New District</h3>
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
                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                    <input
                                        type="text"
                                        id="region"
                                        name="region"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.region}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.region && <div className="text-red-500 text-sm mt-1">{errors.region}</div>}
                                </div>
                                <div>
                                    <label htmlFor="connectivity" className="block text-sm font-medium text-gray-700 mb-1">Connectivity (%)</label>
                                    <input
                                        type="number"
                                        id="connectivity"
                                        name="connectivity"
                                        min="0"
                                        max="100"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.connectivity}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.connectivity && <div className="text-red-500 text-sm mt-1">{errors.connectivity}</div>}
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
                                    {processing ? 'Saving...' : 'Save District'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Edit District Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Edit District</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => {
                                    setShowEditModal(false);
                                    setDistrictToEdit(null);
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
                                    <label htmlFor="edit-region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                    <input
                                        type="text"
                                        id="edit-region"
                                        name="region"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.region}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.region && <div className="text-red-500 text-sm mt-1">{errors.region}</div>}
                                </div>
                                <div>
                                    <label htmlFor="edit-connectivity" className="block text-sm font-medium text-gray-700 mb-1">Connectivity (%)</label>
                                    <input
                                        type="number"
                                        id="edit-connectivity"
                                        name="connectivity"
                                        min="0"
                                        max="100"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        value={data.connectivity}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.connectivity && <div className="text-red-500 text-sm mt-1">{errors.connectivity}</div>}
                                </div>
                            </div>
                            
                            <div className="flex justify-end">
                                <button 
                                    type="button" 
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setDistrictToEdit(null);
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
                                    {processing ? 'Saving...' : 'Update District'}
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
                                    setDistrictToDelete(null);
                                }}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to delete the district <span className="font-semibold">{districtToDelete?.name}</span>? This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end">
                            <button 
                                type="button" 
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium mr-2"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDistrictToDelete(null);
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
                                {processing ? 'Deleting...' : 'Delete District'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Districts Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teachers</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connectivity</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {districtData.map((district) => (
                                <tr key={district.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{district.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{district.region}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{district.schools}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{district.teachers}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{district.students}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            district.connectivity > 75
                                                ? 'bg-green-100 text-green-800' 
                                                : district.connectivity > 50
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : district.connectivity > 25
                                                        ? 'bg-yellow-100 text-yellow-800' 
                                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                            {district.connectivity}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => handleEditClick(district)}>Edit</button>
                                        <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteClick(district)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{districtData.length}</span> of <span className="font-medium">{districtData.length}</span> results
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

export default DistrictsTab;
