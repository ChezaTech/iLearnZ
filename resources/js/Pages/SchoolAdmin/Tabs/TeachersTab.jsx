import React, { useState } from 'react';
import { 
    MagnifyingGlassIcon, 
    PlusIcon, 
    PencilIcon, 
    TrashIcon,
    XMarkIcon,
    KeyIcon
} from '@heroicons/react/24/outline';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SchoolAdminController from '@/Controllers/SchoolAdminController';

export default function TeachersTab({ teachers, existingUsers }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const [createNewUser, setCreateNewUser] = useState(true);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        employment_status: 'Active',
        existing_user_id: '',
        qualification: '',
        years_of_experience: '',
    });
    
    const passwordForm = useForm({
        password: '',
        password_confirmation: '',
    });
    
    const filteredTeachers = teachers ? teachers.filter(teacher => 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (teacher.subject && teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : [];

    const openAddModal = () => {
        reset();
        setCreateNewUser(true);
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        reset();
    };

    const openEditModal = (teacher) => {
        setCurrentTeacher(teacher);
        setData({
            name: teacher.name,
            email: teacher.email,
            subject: teacher.subject || '',
            employment_status: teacher.status || 'Active',
            qualification: teacher.qualification || '',
            years_of_experience: teacher.years_of_experience || '',
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentTeacher(null);
        reset();
    };

    const openPasswordModal = (teacher) => {
        setCurrentTeacher(teacher);
        passwordForm.reset();
        setIsPasswordModalOpen(true);
    };

    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setCurrentTeacher(null);
        passwordForm.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Use SchoolAdminController for validation
        try {
            // Perform any client-side validation if needed
            if (createNewUser && (!data.name || !data.email)) {
                alert('Please fill in all required fields');
                return;
            } else if (!createNewUser && !data.existing_user_id) {
                alert('Please select a user');
                return;
            }
            
            // Submit the form using Inertia
            post('/teachers', {
                onSuccess: () => {
                    closeAddModal();
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        
        // Use SchoolAdminController for validation
        try {
            // Perform any client-side validation if needed
            if (!data.name || !data.email || !data.subject) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Submit the form using Inertia
            put(`/teachers/${currentTeacher.id}`, {
                onSuccess: () => {
                    closeEditModal();
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        
        // Use SchoolAdminController for validation
        try {
            // Perform any client-side validation if needed
            if (!passwordForm.data.password || !passwordForm.data.password_confirmation) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (passwordForm.data.password !== passwordForm.data.password_confirmation) {
                alert('Passwords do not match');
                return;
            }
            
            // Submit the form using Inertia
            passwordForm.post(`/teachers/${currentTeacher.id}/reset-password`, {
                onSuccess: () => {
                    closePasswordModal();
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    const handleDelete = (teacher) => {
        if (confirm(`Are you sure you want to delete ${teacher.name}?`)) {
            try {
                // Submit the delete request using Inertia
                post(`/teachers/${teacher.id}`, {
                    _method: 'DELETE',
                    onSuccess: () => {
                        window.location.reload();
                    }
                });
            } catch (error) {
                console.error('Error deleting teacher:', error);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Manage Teachers</h3>
                <button 
                    onClick={openAddModal}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New Teacher
                </button>
            </div>
            
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search teachers by name or subject"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTeachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.subject || 'Not specified'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${teacher.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                        teacher.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800'}`}>
                                        {teacher.status || 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => openEditModal(teacher)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => openPasswordModal(teacher)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <KeyIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(teacher)}
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

            {/* Add Teacher Modal */}
            <Modal show={isAddModalOpen} onClose={closeAddModal}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Add New Teacher</h2>
                        <button onClick={closeAddModal} className="text-gray-400 hover:text-gray-500">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div className="flex items-center mb-4">
                                <input
                                    id="create-new"
                                    type="radio"
                                    checked={createNewUser}
                                    onChange={() => setCreateNewUser(true)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="create-new" className="ml-2 block text-sm text-gray-900">
                                    Create new user
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="existing-user"
                                    type="radio"
                                    checked={!createNewUser}
                                    onChange={() => setCreateNewUser(false)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="existing-user" className="ml-2 block text-sm text-gray-900">
                                    Select existing user
                                </label>
                            </div>
                        </div>

                        {createNewUser ? (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                </div>
                            </>
                        ) : (
                            <div className="mb-4">
                                <label htmlFor="existing_user_id" className="block text-sm font-medium text-gray-700">Select User</label>
                                <select
                                    id="existing_user_id"
                                    value={data.existing_user_id}
                                    onChange={e => setData('existing_user_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select a user</option>
                                    {existingUsers && existingUsers.map(user => (
                                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                    ))}
                                </select>
                                {errors.existing_user_id && <div className="text-red-500 text-xs mt-1">{errors.existing_user_id}</div>}
                            </div>
                        )}

                        <div className="mb-4">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject Specialty</label>
                            <input
                                type="text"
                                id="subject"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                            {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
                            <input
                                type="text"
                                id="qualification"
                                value={data.qualification}
                                onChange={e => setData('qualification', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.qualification && <div className="text-red-500 text-xs mt-1">{errors.qualification}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="years_of_experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                            <input
                                type="number"
                                id="years_of_experience"
                                value={data.years_of_experience}
                                onChange={e => setData('years_of_experience', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                min="0"
                            />
                            {errors.years_of_experience && <div className="text-red-500 text-xs mt-1">{errors.years_of_experience}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="employment_status" className="block text-sm font-medium text-gray-700">Employment Status</label>
                            <select
                                id="employment_status"
                                value={data.employment_status}
                                onChange={e => setData('employment_status', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            {errors.employment_status && <div className="text-red-500 text-xs mt-1">{errors.employment_status}</div>}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={closeAddModal}
                                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Edit Teacher Modal */}
            <Modal show={isEditModalOpen} onClose={closeEditModal}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Edit Teacher</h2>
                        <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-500">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="edit-name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="edit-email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="edit-subject" className="block text-sm font-medium text-gray-700">Subject Specialty</label>
                            <input
                                type="text"
                                id="edit-subject"
                                value={data.subject}
                                onChange={e => setData('subject', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                            {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="edit-qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
                            <input
                                type="text"
                                id="edit-qualification"
                                value={data.qualification}
                                onChange={e => setData('qualification', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            {errors.qualification && <div className="text-red-500 text-xs mt-1">{errors.qualification}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="edit-years_of_experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                            <input
                                type="number"
                                id="edit-years_of_experience"
                                value={data.years_of_experience}
                                onChange={e => setData('years_of_experience', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                min="0"
                            />
                            {errors.years_of_experience && <div className="text-red-500 text-xs mt-1">{errors.years_of_experience}</div>}
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700">Employment Status</label>
                            <select
                                id="edit-status"
                                value={data.employment_status}
                                onChange={e => setData('employment_status', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="On Leave">On Leave</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            {errors.employment_status && <div className="text-red-500 text-xs mt-1">{errors.employment_status}</div>}
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Password Reset Modal */}
            <Modal show={isPasswordModalOpen} onClose={closePasswordModal}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Reset Password</h2>
                        <button onClick={closePasswordModal} className="text-gray-400 hover:text-gray-500">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={handlePasswordReset}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="password"
                                value={passwordForm.data.password}
                                onChange={e => passwordForm.setData('password', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                            {passwordForm.errors.password && <div className="text-red-500 text-xs mt-1">{passwordForm.errors.password}</div>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                value={passwordForm.data.password_confirmation}
                                onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                required
                            />
                            {passwordForm.errors.password_confirmation && <div className="text-red-500 text-xs mt-1">{passwordForm.errors.password_confirmation}</div>}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={closePasswordModal}
                                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {passwordForm.processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
