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
        name: '',
        code: '',
        address: '',
        city: '',
        province: '',
        district_id: '',
        postal_code: '',
        phone: '',
        email: '',
        principal_name: '',
        type: '',
        connectivity_status: '',
        internet_provider: '',
        has_smartboards: false,
        student_count: 0,
        teacher_count: 0,
        school_hours: '',
    });
    
    // Districts state
    const [districts, setDistricts] = useState([]);
    
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
        
        // Fetch school districts
        fetchSchoolDistricts();
        
        // If settings is provided, use it directly
        if (settings && Object.keys(settings).length > 0) {
            console.log('Using provided settings:', settings);
            
            // Update formData with settings
            setFormData({
                name: settings.name || '',
                code: settings.code || '',
                address: settings.address || '',
                city: settings.city || '',
                province: settings.province || '',
                district_id: settings.district_id || '',
                postal_code: settings.postal_code || '',
                phone: settings.phone || '',
                email: settings.email || '',
                principal_name: settings.principal_name || '',
                type: settings.type || '',
                connectivity_status: settings.connectivity_status || '',
                internet_provider: settings.internet_provider || '',
                has_smartboards: settings.has_smartboards || false,
                student_count: settings.student_count || 0,
                teacher_count: settings.teacher_count || 0,
                school_hours: settings.school_hours || '',
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
    
    // Function to fetch school districts
    const fetchSchoolDistricts = async () => {
        try {
            const districtsData = await SchoolAdminController.getSchoolDistricts();
            console.log('Districts data:', districtsData);
            setDistricts(districtsData);
        } catch (err) {
            console.error('Error fetching school districts:', err);
            setError('Failed to load school districts. Please try again.');
        }
    };
    
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
            
            if (!schoolData) {
                setError('No school data found. Please try again later.');
                setLoading(false);
                return;
            }
            
            // Fetch actual teacher and student counts
            const teacherCount = await SchoolAdminController.getTeacherCount(schoolId);
            const studentCount = await SchoolAdminController.getStudentCount(schoolId);
            
            console.log('Actual teacher count:', teacherCount);
            console.log('Actual student count:', studentCount);
            
            // Update form data with school data
            setFormData({
                name: schoolData.name || '',
                code: schoolData.code || '',
                address: schoolData.address || '',
                city: schoolData.city || '',
                province: schoolData.province || '',
                district_id: schoolData.district_id || '',
                postal_code: schoolData.postal_code || '',
                phone: schoolData.phone || '',
                email: schoolData.email || '',
                principal_name: schoolData.principal_name || '',
                type: schoolData.type || '',
                connectivity_status: schoolData.connectivity_status || '',
                internet_provider: schoolData.internet_provider || '',
                has_smartboards: Boolean(schoolData.has_smartboards),
                student_count: studentCount || parseInt(schoolData.student_count || 0, 10),
                teacher_count: teacherCount || parseInt(schoolData.teacher_count || 0, 10),
                school_hours: schoolData.school_hours || '',
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
    
    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : 
                    type === 'number' ? parseInt(value, 10) || 0 : 
                    value
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
                name: formData.name,
                code: formData.code,
                address: formData.address,
                city: formData.city,
                province: formData.province,
                district_id: formData.district_id,
                postal_code: formData.postal_code,
                phone: formData.phone,
                email: formData.email,
                principal_name: formData.principal_name,
                type: formData.type,
                connectivity_status: formData.connectivity_status,
                internet_provider: formData.internet_provider,
                has_smartboards: formData.has_smartboards,
                student_count: formData.student_count,
                teacher_count: formData.teacher_count,
                school_hours: formData.school_hours
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
        <div className="container mx-auto px-4 py-8">
            {/* Success and Error Messages */}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{success}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccess(null)}>
                        <XMarkIcon className="h-6 w-6 text-green-500" />
                    </span>
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                        <XMarkIcon className="h-6 w-6 text-red-500" />
                    </span>
                </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* School Information Form */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">School Information</h2>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        School Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">
                                        School Code
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="code"
                                        name="code"
                                        type="text"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principal_name">
                                        Principal Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="principal_name"
                                        name="principal_name"
                                        type="text"
                                        value={formData.principal_name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        School Type
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="combined">Combined</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        {/* Contact Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Contact Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            </div>
                        </div>
                        
                        {/* Address Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Address Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4 md:col-span-2">
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                        City
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">
                                        Province
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="province"
                                        name="province"
                                        type="text"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district_id">
                                        District
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="district_id"
                                        name="district_id"
                                        value={formData.district_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select District</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postal_code">
                                        Postal Code
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="postal_code"
                                        name="postal_code"
                                        type="text"
                                        value={formData.postal_code}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Technical Information */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Technical Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="connectivity_status">
                                        Connectivity Status
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="connectivity_status"
                                        name="connectivity_status"
                                        value={formData.connectivity_status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="connected">Connected</option>
                                        <option value="disconnected">Disconnected</option>
                                        <option value="intermittent">Intermittent</option>
                                    </select>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="internet_provider">
                                        Internet Provider
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="internet_provider"
                                        name="internet_provider"
                                        type="text"
                                        value={formData.internet_provider}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="has_smartboards"
                                            checked={formData.has_smartboards}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700 text-sm font-bold">Has Smartboards</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        {/* School Statistics */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">School Statistics</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="student_count">
                                        Student Count
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="student_count"
                                        name="student_count"
                                        type="number"
                                        min="0"
                                        value={formData.student_count}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teacher_count">
                                        Teacher Count
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="teacher_count"
                                        name="teacher_count"
                                        type="number"
                                        min="0"
                                        value={formData.teacher_count}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                
                                <div className="mb-4 md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school_hours">
                                        School Hours
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="school_hours"
                                        name="school_hours"
                                        type="text"
                                        placeholder="e.g. 8:00 AM - 3:00 PM"
                                        value={formData.school_hours}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex items-center justify-end">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* School Administrators */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">School Administrators</h2>
                        <div className="flex space-x-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                                onClick={() => setShowExistingUserForm(true)}
                            >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Add Existing User
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                                onClick={() => setShowNewAdminForm(true)}
                            >
                                <PlusIcon className="h-4 w-4 mr-1" />
                                Create New Admin
                            </button>
                        </div>
                    </div>
                    
                    {/* Admins List */}
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
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.length > 0 ? (
                                    admins.map((admin) => (
                                        <tr key={admin.id}>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                {admin.name}
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                {admin.email}
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                {admin.admin_role || 'Admin'}
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteAdmin(admin.id)}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                                            No administrators found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Add Existing User Modal */}
                    {showExistingUserForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">Add Existing User as Admin</h3>
                                    <button onClick={() => setShowExistingUserForm(false)}>
                                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                                    </button>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchTerm">
                                        Search User
                                    </label>
                                    <div className="flex">
                                        <input
                                            className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="searchTerm"
                                            type="text"
                                            placeholder="Enter name or email"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                                            onClick={handleSearchUsers}
                                            disabled={loading}
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
                                                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                                        selectedUser && selectedUser.id === user.id ? 'bg-blue-100' : ''
                                                    }`}
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adminRole">
                                        Admin Role
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="adminRole"
                                        value={adminRole}
                                        onChange={(e) => setAdminRole(e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </div>
                                
                                <div className="flex items-center justify-end">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                        onClick={() => setShowExistingUserForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleAddExistingUser}
                                        disabled={loading || !selectedUser}
                                    >
                                        {loading ? 'Adding...' : 'Add Admin'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Create New Admin Modal */}
                    {showNewAdminForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold">Create New Admin</h3>
                                    <button onClick={() => setShowNewAdminForm(false)}>
                                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                                    </button>
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newAdminName">
                                        Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="newAdminName"
                                        type="text"
                                        value={newAdminName}
                                        onChange={(e) => setNewAdminName(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newAdminEmail">
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="newAdminEmail"
                                        type="email"
                                        value={newAdminEmail}
                                        onChange={(e) => setNewAdminEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newAdminPassword">
                                        Password
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="newAdminPassword"
                                        type="password"
                                        value={newAdminPassword}
                                        onChange={(e) => setNewAdminPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newAdminRole">
                                        Admin Role
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="newAdminRole"
                                        value={newAdminRole}
                                        onChange={(e) => setNewAdminRole(e.target.value)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </div>
                                
                                <div className="flex items-center justify-end">
                                    <button
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                        onClick={() => setShowNewAdminForm(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleCreateNewAdmin}
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating...' : 'Create Admin'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
