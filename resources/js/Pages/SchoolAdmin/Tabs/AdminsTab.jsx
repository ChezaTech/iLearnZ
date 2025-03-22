import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    UserGroupIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function AdminsTab({ auth }) {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Form data for creating new admin
    const [newAdminData, setNewAdminData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        admin_role: "admin",
        school_id: auth.user.school_id,
    });

    // Form data for adding existing user as admin
    const [existingUserData, setExistingUserData] = useState({
        user_id: "",
        admin_role: "admin",
        school_id: auth.user.school_id,
    });

    // Load admins on component mount
    useEffect(() => {
        fetchAdmins();
    }, []);

    // Fetch admins from API
    const fetchAdmins = async () => {
        setLoading(true);
        try {
            console.log("Fetching admins for school ID:", auth.user.school_id);
            const response = await axios.get(
                `/api/schools/${auth.user.school_id}/admins`
            );
            console.log("Admins response:", response.data);
            setAdmins(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching admins:", err);
            setError(err.response?.data?.message || "Failed to load administrators");
            setLoading(false);
        }
    };

    // Search users
    const searchUsers = async (query) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        setSearchLoading(true);
        try {
            console.log("Searching users with query:", query);
            const response = await axios.get(`/api/users/search?q=${query}`);
            console.log("Search results:", response.data);
            setSearchResults(response.data);
            setSearchLoading(false);
        } catch (err) {
            console.error("Error searching users:", err);
            setError(err.response?.data?.message || "Failed to search users");
            setSearchLoading(false);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        searchUsers(query);
    };

    // Select user from search results
    const selectUser = (user) => {
        setSelectedUser(user);
        setExistingUserData({
            ...existingUserData,
            user_id: user.id,
        });
        setSearchResults([]);
        setSearchQuery("");
    };

    // Add existing user as admin
    const addExistingUserAsAdmin = async (e) => {
        e.preventDefault();
        try {
            console.log("Adding existing user as admin:", existingUserData);
            const response = await axios.post(
                "/api/schools/add-existing-admin",
                existingUserData
            );
            console.log("Add existing user response:", response.data);
            setAdmins([...admins, response.data.admin]);
            setSuccess("Administrator added successfully");
            setShowAddModal(false);
            setSelectedUser(null);
            setExistingUserData({
                user_id: "",
                admin_role: "admin",
                school_id: auth.user.school_id,
            });
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error("Error adding existing user as admin:", err);
            setError(
                err.response?.data?.message ||
                    "Failed to add user as administrator"
            );
            setTimeout(() => setError(null), 3000);
        }
    };

    // Create new admin
    const createNewAdmin = async (e) => {
        e.preventDefault();
        try {
            console.log("Creating new admin:", newAdminData);
            const response = await axios.post(
                "/api/schools/create-admin",
                newAdminData
            );
            console.log("Create new admin response:", response.data);
            setAdmins([...admins, response.data.admin]);
            setSuccess("Administrator created successfully");
            setShowCreateModal(false);
            setNewAdminData({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                admin_role: "admin",
                school_id: auth.user.school_id,
            });
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error("Error creating new admin:", err);
            setError(
                err.response?.data?.message ||
                    "Failed to create administrator"
            );
            setTimeout(() => setError(null), 3000);
        }
    };

    // Delete admin
    const deleteAdmin = async (adminId) => {
        if (
            !confirm(
                "Are you sure you want to remove this administrator? This action cannot be undone."
            )
        ) {
            return;
        }

        try {
            console.log("Deleting admin with ID:", adminId);
            await axios.delete(`/api/schools/admins/${adminId}`);
            setAdmins(admins.filter((admin) => admin.id !== adminId));
            setSuccess("Administrator removed successfully");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error("Error deleting admin:", err);
            setError(
                err.response?.data?.message ||
                    "Failed to remove administrator"
            );
            setTimeout(() => setError(null), 3000);
        }
    };

    // Filter admins based on search query
    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    School Administrators
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
                    >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Add Existing User
                    </button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center"
                    >
                        <PlusIcon className="h-5 w-5 mr-1" />
                        Create New Admin
                    </button>
                </div>
            </div>

            {/* Success and Error Messages */}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Search Box */}
            <div className="mb-6">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search administrators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Admins Table */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : admins.length === 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                    <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">
                        No administrators found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by adding administrators to your school.
                    </p>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
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
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Role
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
                            {filteredAdmins.map((admin) => (
                                <tr key={admin.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {admin.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {admin.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {admin.admin_role === "super_admin"
                                                ? "Super Admin"
                                                : "Admin"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => deleteAdmin(admin.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Existing User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">
                                Add Existing User as Admin
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setSelectedUser(null);
                                    setSearchQuery("");
                                    setSearchResults([]);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={addExistingUserAsAdmin}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="search-user"
                                >
                                    Search User
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="search-user"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        placeholder="Search by name or email"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        disabled={selectedUser !== null}
                                    />
                                    {searchLoading && (
                                        <div className="absolute right-3 top-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Search Results */}
                                {searchResults.length > 0 && !selectedUser && (
                                    <div className="mt-1 border rounded-md shadow-sm max-h-40 overflow-y-auto">
                                        {searchResults.map((user) => (
                                            <div
                                                key={user.id}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => selectUser(user)}
                                            >
                                                <div className="font-medium">
                                                    {user.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {user.email}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Selected User */}
                                {selectedUser && (
                                    <div className="mt-2 p-2 border rounded-md bg-blue-50">
                                        <div className="font-medium">
                                            {selectedUser.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {selectedUser.email}
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-1 text-xs text-red-600"
                                            onClick={() => {
                                                setSelectedUser(null);
                                                setSearchQuery("");
                                            }}
                                        >
                                            Clear Selection
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="admin-role"
                                >
                                    Admin Role
                                </label>
                                <select
                                    id="admin-role"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={existingUserData.admin_role}
                                    onChange={(e) =>
                                        setExistingUserData({
                                            ...existingUserData,
                                            admin_role: e.target.value,
                                        })
                                    }
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">
                                        Super Admin
                                    </option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setSelectedUser(null);
                                        setSearchQuery("");
                                        setSearchResults([]);
                                    }}
                                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                    disabled={!selectedUser}
                                >
                                    Add as Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Create New Admin Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">
                                Create New Administrator
                            </h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={createNewAdmin}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Full Name"
                                    value={newAdminData.name}
                                    onChange={(e) =>
                                        setNewAdminData({
                                            ...newAdminData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Email Address"
                                    value={newAdminData.email}
                                    onChange={(e) =>
                                        setNewAdminData({
                                            ...newAdminData,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Password"
                                    value={newAdminData.password}
                                    onChange={(e) =>
                                        setNewAdminData({
                                            ...newAdminData,
                                            password: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password-confirmation"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="password-confirmation"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Confirm Password"
                                    value={newAdminData.password_confirmation}
                                    onChange={(e) =>
                                        setNewAdminData({
                                            ...newAdminData,
                                            password_confirmation:
                                                e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="new-admin-role"
                                >
                                    Admin Role
                                </label>
                                <select
                                    id="new-admin-role"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={newAdminData.admin_role}
                                    onChange={(e) =>
                                        setNewAdminData({
                                            ...newAdminData,
                                            admin_role: e.target.value,
                                        })
                                    }
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">
                                        Super Admin
                                    </option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                >
                                    Create Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
