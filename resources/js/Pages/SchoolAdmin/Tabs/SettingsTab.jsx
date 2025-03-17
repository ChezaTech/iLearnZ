import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusIcon, PencilIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';

export default function SettingsTab({ settings }) {
    const [formData, setFormData] = useState(settings || {
        schoolName: '',
        principal: '',
        address: '',
        phone: '',
        email: '',
        schoolHours: '',
        academicYear: '',
        terms: 3,
        gradingSystem: 'percentage',
        passingGrade: 50,
        language: 'english',
        timezone: 'CAT',
        enableNotifications: true,
        enableSMS: false,
        enableParentAccess: true,
        enableStudentAccess: true
    });
    
    // State for school admins management
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    // State for new admin form
    const [showNewAdminForm, setShowNewAdminForm] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        name: '',
        email: '',
        admin_role: 'school_admin',
        password: '',
        password_confirmation: ''
    });
    
    // State for existing user selection
    const [showExistingUserForm, setShowExistingUserForm] = useState(false);
    const [existingUsers, setExistingUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch school admins and school data on component mount
    useEffect(() => {
        fetchSchoolAdmins();
        
        // If settings is not provided, fetch school data from the authenticated user
        if (!settings || Object.keys(settings).length === 0) {
            fetchSchoolData();
        }
    }, []);
    
    // Function to fetch school admins
    const fetchSchoolAdmins = async () => {
        setLoading(true);
        try {
            // Get the school_id from the authenticated user if not provided in settings
            const userResponse = await axios.get('/api/user');
            const schoolId = settings?.id || userResponse.data.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                setLoading(false);
                return;
            }
            
            const response = await axios.get(`/api/schools/${schoolId}/admins`);
            setAdmins(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching school admins:', err);
            setError('Failed to load school administrators. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch school data if not provided in props
    const fetchSchoolData = async () => {
        try {
            const userResponse = await axios.get('/api/user');
            const schoolId = userResponse.data.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                return;
            }
            
            const schoolResponse = await axios.get(`/api/schools/${schoolId}`);
            const schoolData = schoolResponse.data;
            
            // Update formData with school data
            setFormData({
                ...formData,
                schoolName: schoolData.name || '',
                principal: schoolData.principal_name || '',
                address: schoolData.address || '',
                phone: schoolData.phone || '',
                email: schoolData.email || '',
                schoolHours: schoolData.school_hours || '',
            });
        } catch (err) {
            console.error('Error fetching school data:', err);
            setError('Failed to load school data. Please try again.');
        }
    };

    // Function to search for existing users
    const searchExistingUsers = async () => {
        if (!searchTerm) return;
        
        try {
            // Get the school_id from the authenticated user if not provided in settings
            const userResponse = await axios.get('/api/user');
            const schoolId = settings?.id || userResponse.data.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                return;
            }
            
            const response = await axios.get(`/admins/existing-users?search=${searchTerm}&school_id=${schoolId}`);
            setExistingUsers(response.data);
        } catch (err) {
            console.error('Error searching users:', err);
            setError('Failed to search for users. Please try again.');
        }
    };

    // Function to add an existing user as admin
    const addExistingUserAsAdmin = async () => {
        if (!selectedUser) return;
        
        try {
            // Get the school_id from the authenticated user if not provided in settings
            const userResponse = await axios.get('/api/user');
            const schoolId = settings?.id || userResponse.data.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                return;
            }
            
            const response = await axios.post('/admins/add-existing', {
                user_id: selectedUser.id,
                school_id: schoolId,
                admin_role: 'school_admin'
            });
            
            setAdmins([...admins, response.data.admin]);
            setSuccess('Administrator added successfully!');
            setShowExistingUserForm(false);
            setSelectedUser(null);
            setSearchTerm('');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error adding admin:', err);
            setError('Failed to add administrator. Please try again.');
        }
    };

    // Function to create a new admin
    const createNewAdmin = async (e) => {
        e.preventDefault();
        
        if (newAdmin.password !== newAdmin.password_confirmation) {
            setError('Passwords do not match');
            return;
        }
        
        try {
            // Get the school_id from the authenticated user if not provided in settings
            const userResponse = await axios.get('/api/user');
            const schoolId = settings?.id || userResponse.data.school_id;
            
            if (!schoolId) {
                setError('Could not determine school ID. Please try again later.');
                return;
            }
            
            const response = await axios.post('/admins/create-new', {
                ...newAdmin,
                school_id: schoolId
            });
            
            setAdmins([...admins, response.data.admin]);
            setSuccess('New administrator created successfully!');
            setShowNewAdminForm(false);
            setNewAdmin({
                name: '',
                email: '',
                admin_role: 'school_admin',
                password: '',
                password_confirmation: ''
            });
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error creating admin:', err);
            setError('Failed to create administrator. Please try again.');
        }
    };

    // Function to delete an admin
    const deleteAdmin = async (adminId) => {
        if (!confirm('Are you sure you want to remove this administrator?')) return;
        
        try {
            await axios.delete(`/admins/${adminId}`);
            setAdmins(admins.filter(admin => admin.id !== adminId));
            setSuccess('Administrator removed successfully!');
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error deleting admin:', err);
            setError('Failed to remove administrator. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Get the school_id from the authenticated user if not provided in settings
            const userResponse = await axios.get('/api/user');
            const schoolId = settings?.id || userResponse.data.school_id;
            
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
                school_hours: formData.schoolHours,
                // If you need to update other fields like district_id, type, connectivity_status
                // you would need to include them here
            };
            
            // Update school settings
            const response = await axios.put(`/schools/${schoolId}`, schoolData);
            
            setSuccess('School settings updated successfully!');
            setError(null);
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error updating school settings:', err);
            setError('Failed to update school settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* School Settings Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">School Settings</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolName">
                                School Name
                            </label>
                            <input
                                id="schoolName"
                                name="schoolName"
                                type="text"
                                value={formData.schoolName}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principal">
                                Principal
                            </label>
                            <input
                                id="principal"
                                name="principal"
                                type="text"
                                value={formData.principal}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                Address
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schoolHours">
                                School Hours
                            </label>
                            <input
                                id="schoolHours"
                                name="schoolHours"
                                type="text"
                                value={formData.schoolHours}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <button 
                                type="submit" 
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* School Administrators Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">School Administrators</h2>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => setShowNewAdminForm(true)}
                                className="bg-green-600 text-white px-3 py-1 rounded flex items-center text-sm hover:bg-green-700 transition-colors"
                            >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                New Admin
                            </button>
                            <button 
                                onClick={() => setShowExistingUserForm(true)}
                                className="bg-blue-600 text-white px-3 py-1 rounded flex items-center text-sm hover:bg-blue-700 transition-colors"
                            >
                                <UserPlusIcon className="h-4 w-4 mr-1" />
                                Add Existing User
                            </button>
                        </div>
                    </div>
                    
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : admins.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No administrators found. Add one to get started.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {admins.map((admin) => (
                                        <tr key={admin.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{admin.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button 
                                                    onClick={() => deleteAdmin(admin.id)}
                                                    className="text-red-600 hover:text-red-900 ml-2"
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
                </div>
            </div>
            
            {/* New Admin Form Modal */}
            {showNewAdminForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Create New Administrator</h3>
                        <form onSubmit={createNewAdmin}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={newAdmin.name}
                                    onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={newAdmin.password_confirmation}
                                    onChange={(e) => setNewAdmin({...newAdmin, password_confirmation: e.target.value})}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowNewAdminForm(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Existing User Form Modal */}
            {showExistingUserForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add Existing User as Administrator</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                                Search User
                            </label>
                            <div className="flex">
                                <input
                                    id="search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter name or email"
                                />
                                <button
                                    type="button"
                                    onClick={searchExistingUsers}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition-colors"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                        
                        {existingUsers.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Select User
                                </label>
                                <div className="max-h-40 overflow-y-auto border rounded">
                                    {existingUsers.map(user => (
                                        <div 
                                            key={user.id}
                                            className={`p-2 cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? 'bg-blue-100' : ''}`}
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-gray-600">{user.email}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowExistingUserForm(false);
                                    setSelectedUser(null);
                                    setSearchTerm('');
                                    setExistingUsers([]);
                                }}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={addExistingUserAsAdmin}
                                disabled={!selectedUser}
                                className={`px-4 py-2 rounded ${!selectedUser ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}
                            >
                                Add as Administrator
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
