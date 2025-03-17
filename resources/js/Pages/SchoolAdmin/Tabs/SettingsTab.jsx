import React, { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import SchoolAdminController from '../../../Controllers/SchoolAdminController';
import axios from 'axios';

export default function SettingsTab({ settings = {} }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    // School settings form state
    const [formData, setFormData] = useState({
        schoolName: settings?.schoolName || 'Lusaka Primary School',
        principal: settings?.principal || 'Dr. Mulenga Chilufya',
        address: settings?.address || '123 Independence Avenue, Lusaka',
        phone: settings?.phone || '+260 211 123456',
        email: settings?.email || 'info@lusakaprimary.edu.zm',
        schoolHours: settings?.schoolHours || '8:00 AM - 3:00 PM',
    });
    
    // School admins state
    const [admins, setAdmins] = useState([]);
    
    // New admin form state
    const [showNewAdminForm, setShowNewAdminForm] = useState(false);
    const [newAdminName, setNewAdminName] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [newAdminRole, setNewAdminRole] = useState('admin');
    
    // Existing user form state
    const [showExistingUserForm, setShowExistingUserForm] = useState(false);
    const [existingUsers, setExistingUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [adminRole, setAdminRole] = useState('admin');
    
    // Fetch school admins and school data on component mount
    useEffect(() => {
        console.log('SettingsTab mounted with settings:', settings);
        
        // If settings is provided, use it directly
        if (settings && Object.keys(settings).length > 0) {
            console.log('Using provided settings:', settings);
            
            // Update formData with settings
            setFormData({
                schoolName: settings.schoolName || 'Lusaka Primary School',
                principal: settings.principal || 'Dr. Mulenga Chilufya',
                address: settings.address || '123 Independence Avenue, Lusaka',
                phone: settings.phone || '+260 211 123456',
                email: settings.email || 'info@lusakaprimary.edu.zm',
                schoolHours: settings.schoolHours || '8:00 AM - 3:00 PM',
            });
            
            // Get the current user to determine the school ID
            const fetchSchoolIdAndAdmins = async () => {
                try {
                    const userData = await SchoolAdminController.getCurrentUser();
                    console.log('Current user data:', userData);
                    
                    if (userData && userData.school_id) {
                        console.log('Fetching admins for school ID:', userData.school_id);
                        fetchAdminsForSchool(userData.school_id);
                    } else {
                        console.error('No school ID found in user data');
                    }
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
            };
            
            fetchSchoolIdAndAdmins();
        } else {
            // If no settings provided, fetch from API
            fetchSchoolData();
        }
    }, [settings]);
    
    // Function to fetch admins for a school
    const fetchAdminsForSchool = async (schoolId) => {
        try {
            console.log('Fetching admins for school ID:', schoolId);
            const adminsData = await SchoolAdminController.getSchoolAdmins(schoolId);
            console.log('Admins data:', adminsData);
            
            if (Array.isArray(adminsData)) {
                setAdmins(adminsData);
            } else {
                console.error('Admins data is not an array:', adminsData);
                setAdmins([]);
            }
        } catch (err) {
            console.error('Error fetching school admins:', err);
            // Set empty array if there's an error
            setAdmins([]);
        }
    };
    
    // Function to fetch school admins
    const fetchSchoolAdmins = async () => {
        setLoading(true);
        try {
            // Get the school_id from the authenticated user if not provided in settings
            const userData = await SchoolAdminController.getCurrentUser();
            console.log('Current user data:', userData);
            const schoolId = userData.school_id;
            console.log('School ID for admins:', schoolId);
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                setLoading(false);
                return;
            }
            
            const adminsData = await SchoolAdminController.getSchoolAdmins(schoolId);
            console.log('Admins data:', adminsData);
            setAdmins(adminsData);
            setError(null);
        } catch (err) {
            console.error('Error fetching school admins:', err);
            setError('Failed to load school administrators. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch school data from API
    const fetchSchoolData = async () => {
        setLoading(true);
        try {
            // Get the current user to determine the school ID
            const userData = await SchoolAdminController.getCurrentUser();
            console.log('Current user data:', userData);
            
            if (!userData || !userData.school_id) {
                console.error('No school ID found in user data');
                setError('Could not determine school ID. Please try again later.');
                setLoading(false);
                return;
            }
            
            const schoolId = userData.school_id;
            console.log('Fetching school data for school ID:', schoolId);
            
            // Fetch school data
            const schoolData = await SchoolAdminController.getSchool(schoolId);
            console.log('School data:', schoolData);
            
            // Update form data with school data
            setFormData({
                schoolName: schoolData.name || 'Lusaka Primary School',
                principal: schoolData.principal_name || 'Dr. Mulenga Chilufya',
                address: schoolData.address || '123 Independence Avenue, Lusaka',
                phone: schoolData.phone || '+260 211 123456',
                email: schoolData.email || 'info@lusakaprimary.edu.zm',
                schoolHours: schoolData.school_hours || '8:00 AM - 3:00 PM',
            });
            
            // Fetch admins for this school
            fetchAdminsForSchool(schoolId);
            
            setError(null);
        } catch (err) {
            console.error('Error fetching school data:', err);
            setError('Failed to load school data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle adding an existing user as an admin
    const handleAddExistingUser = async () => {
        if (!selectedUser) {
            setError('Please select a user to add as an admin');
            return;
        }
        
        setLoading(true);
        
        try {
            // Get the current user to determine the school ID
            const userData = await SchoolAdminController.getCurrentUser();
            const schoolId = userData.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                setLoading(false);
                return;
            }
            
            const adminData = {
                user_id: selectedUser.id,
                school_id: schoolId,
                admin_role: adminRole
            };
            
            console.log('Adding existing user as admin:', adminData);
            
            const response = await SchoolAdminController.addExistingUserAsAdmin(adminData);
            console.log('Add existing user response:', response);
            
            if (response.success) {
                // Add the new admin to the list
                setAdmins([...admins, response.admin]);
                
                // Reset form
                setSelectedUser(null);
                setAdminRole('admin');
                setSearchTerm('');
                setExistingUsers([]);
                
                setSuccess('Administrator added successfully!');
                setError(null);
                
                // Close modal
                setShowExistingUserForm(false);
            } else {
                setError(response.message || 'Failed to add administrator. Please try again.');
            }
        } catch (err) {
            console.error('Error adding admin:', err);
            setError('Failed to add administrator. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle creating a new admin
    const handleCreateNewAdmin = async () => {
        if (!newAdminName || !newAdminEmail || !newAdminPassword) {
            setError('Please fill in all fields');
            return;
        }
        
        setLoading(true);
        
        try {
            // Get the current user to determine the school ID
            const userData = await SchoolAdminController.getCurrentUser();
            const schoolId = userData.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                setLoading(false);
                return;
            }
            
            const adminData = {
                name: newAdminName,
                email: newAdminEmail,
                password: newAdminPassword,
                school_id: schoolId,
                admin_role: newAdminRole
            };
            
            console.log('Creating new admin:', adminData);
            
            const response = await SchoolAdminController.createNewAdmin(adminData);
            console.log('Create new admin response:', response);
            
            if (response.success) {
                // Add the new admin to the list
                setAdmins([...admins, response.admin]);
                
                // Reset form
                setNewAdminName('');
                setNewAdminEmail('');
                setNewAdminPassword('');
                setNewAdminRole('admin');
                
                setSuccess('Administrator created successfully!');
                setError(null);
                
                // Close modal
                setShowNewAdminForm(false);
            } else {
                setError(response.message || 'Failed to create administrator. Please try again.');
            }
        } catch (err) {
            console.error('Error creating admin:', err);
            setError('Failed to create administrator. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle deleting an admin
    const handleDeleteAdmin = async (adminId) => {
        if (!confirm('Are you sure you want to remove this administrator?')) {
            return;
        }
        
        setLoading(true);
        
        try {
            console.log('Deleting admin:', adminId);
            
            await SchoolAdminController.deleteAdmin(adminId);
            
            // Remove the admin from the list
            setAdmins(admins.filter(admin => admin.id !== adminId));
            
            setSuccess('Administrator removed successfully!');
            setError(null);
        } catch (err) {
            console.error('Error deleting admin:', err);
            setError('Failed to remove administrator. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle searching for existing users
    const handleSearchUsers = async () => {
        if (!searchTerm) {
            setError('Please enter a search term');
            return;
        }
        
        setLoading(true);
        
        try {
            // Get the current user to determine the school ID
            const userData = await SchoolAdminController.getCurrentUser();
            const schoolId = userData.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                setLoading(false);
                return;
            }
            
            console.log('Searching for users:', searchTerm, 'in school:', schoolId);
            
            const results = await SchoolAdminController.searchExistingUsers(searchTerm, schoolId);
            console.log('Search results:', results);
            
            setExistingUsers(results);
            setError(null);
        } catch (err) {
            console.error('Error searching users:', err);
            setError('Failed to search users. Please try again.');
            setExistingUsers([]);
        } finally {
            setLoading(false);
        }
    };
    
    // Function to search for existing users
    const searchExistingUsers = async () => {
        if (!searchTerm) return;
        
        try {
            // Get the school_id from the authenticated user if not provided in settings
            const userData = await SchoolAdminController.getCurrentUser();
            const schoolId = userData.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                return;
            }
            
            const usersData = await SchoolAdminController.searchExistingUsers(searchTerm, schoolId);
            setExistingUsers(usersData);
        } catch (err) {
            console.error('Error searching users:', err);
            setError('Failed to search for users. Please try again.');
        }
    };

    // Function to add an existing user as admin
    const addExistingUserAsAdmin = async (userData) => {
        setLoading(true);
        try {
            console.log('Adding existing user as admin:', userData);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create a new admin object
            const newAdmin = {
                id: Date.now(), // Use timestamp as a temporary ID
                name: userData.name,
                email: userData.email,
                role: userData.role || 'School Admin',
                status: 'Active'
            };
            
            // Add the new admin to the list
            setAdmins(prevAdmins => [...prevAdmins, newAdmin]);
            
            // Close the modal
            setShowExistingUserForm(false);
            
            // Show success message
            setSuccess('User added as administrator successfully!');
            setError(null);
        } catch (err) {
            console.error('Error adding existing user as admin:', err);
            setError('Failed to add user as administrator. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // Function to create a new admin
    const createNewAdmin = async (userData) => {
        setLoading(true);
        try {
            console.log('Creating new admin:', userData);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Create a new admin object
            const newAdmin = {
                id: Date.now(), // Use timestamp as a temporary ID
                name: userData.name,
                email: userData.email,
                role: userData.role || 'School Admin',
                status: 'Active'
            };
            
            // Add the new admin to the list
            setAdmins(prevAdmins => [...prevAdmins, newAdmin]);
            
            // Close the modal
            setShowNewAdminForm(false);
            
            // Show success message
            setSuccess('Administrator created successfully!');
            setError(null);
        } catch (err) {
            console.error('Error creating new admin:', err);
            setError('Failed to create administrator. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // Function to delete an admin
    const deleteAdmin = async (adminId) => {
        setLoading(true);
        try {
            console.log('Deleting admin with ID:', adminId);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Remove the admin from the list
            setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== adminId));
            
            // Show success message
            setSuccess('Administrator removed successfully!');
            setError(null);
        } catch (err) {
            console.error('Error deleting admin:', err);
            setError('Failed to remove administrator. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Get the school_id from the authenticated user
            const userData = await SchoolAdminController.getCurrentUser();
            console.log('Current user data for update:', userData);
            const schoolId = userData.school_id;
            console.log('School ID for update:', schoolId);
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                setLoading(false);
                return;
            }
            
            // Convert form data to match the expected format for the API
            const schoolData = {
                name: formData.schoolName,
                principal_name: formData.principal,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                school_hours: formData.schoolHours
            };
            
            console.log('Submitting school data:', schoolData);
            
            // Update school settings
            const response = await SchoolAdminController.updateSchoolSettings(schoolId, schoolData);
            console.log('Update response:', response);
            
            setSuccess('School settings updated successfully!');
            setError(null);
        } catch (err) {
            console.error('Error updating school settings:', err);
            setError('Failed to update school settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <span className="font-bold">Success:</span> {success}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Settings Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">School Settings</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolName">
                                School Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="schoolName"
                                name="schoolName"
                                type="text"
                                value={formData.schoolName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principal">
                                Principal
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="principal"
                                name="principal"
                                type="text"
                                value={formData.principal}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phone"
                                name="phone"
                                type="text"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolHours">
                                School Hours
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="schoolHours"
                                name="schoolHours"
                                type="text"
                                value={formData.schoolHours}
                                onChange={handleInputChange}
                                placeholder="e.g. 8:00 AM - 3:00 PM"
                            />
                        </div>
                        
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* School Admins Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">School Administrators</h2>
                        <div className="flex space-x-2">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center"
                                onClick={() => setShowNewAdminForm(true)}
                            >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                New Admin
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center"
                                onClick={() => setShowExistingUserForm(true)}
                            >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Add Existing
                            </button>
                        </div>
                    </div>
                    
                    {/* Admins Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="py-4 px-4 text-center">
                                            Loading administrators...
                                        </td>
                                    </tr>
                                ) : admins.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-4 px-4 text-center">
                                            No administrators found
                                        </td>
                                    </tr>
                                ) : (
                                    admins.map((admin) => (
                                        <tr key={admin.id}>
                                            <td className="py-2 px-4 border-b border-gray-200">{admin.name}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{admin.email}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">{admin.role}</td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {admin.status}
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                <button
                                                    className="text-red-600 hover:text-red-900 mr-2"
                                                    onClick={() => handleDeleteAdmin(admin.id)}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            {/* New Admin Form Modal */}
            {showNewAdminForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Create New Administrator</h3>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowNewAdminForm(false)}
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateNewAdmin();
                        }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    value={newAdminName}
                                    onChange={(e) => setNewAdminName(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    value={newAdminEmail}
                                    onChange={(e) => setNewAdminEmail(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    value={newAdminPassword}
                                    onChange={(e) => setNewAdminPassword(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                    Role
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="role"
                                    value={newAdminRole}
                                    onChange={(e) => setNewAdminRole(e.target.value)}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="school_admin">School Admin</option>
                                </select>
                            </div>
                            
                            <div className="flex items-center justify-end">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                    type="button"
                                    onClick={() => setShowNewAdminForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Create Admin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Add Existing User Form Modal */}
            {showExistingUserForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add Existing User as Admin</h3>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowExistingUserForm(false)}
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                                Search Users
                            </label>
                            <div className="flex">
                                <input
                                    className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by name or email"
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleSearchUsers}
                                >
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        
                        {existingUsers.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Select User
                                </label>
                                <div className="max-h-40 overflow-y-auto border rounded">
                                    {existingUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? 'bg-blue-100' : ''}`}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <div className="font-semibold">{user.name}</div>
                                            <div className="text-sm text-gray-600">{user.email}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="admin_role">
                                Admin Role
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="admin_role"
                                value={adminRole}
                                onChange={(e) => setAdminRole(e.target.value)}
                            >
                                <option value="admin">Admin</option>
                                <option value="school_admin">School Admin</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                type="button"
                                onClick={() => setShowExistingUserForm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleAddExistingUser}
                                disabled={!selectedUser}
                            >
                                Add as Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
