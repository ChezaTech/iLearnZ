import React, { useState } from 'react';

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically save the settings to the backend
        console.log('Saving settings:', formData);
        // Add API call here
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">School Settings</h3>
                <button 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    onClick={handleSubmit}
                >
                    Save Changes
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">School Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                                School Name
                            </label>
                            <input
                                type="text"
                                id="schoolName"
                                name="schoolName"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.schoolName}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-1">
                                Principal Name
                            </label>
                            <input
                                type="text"
                                id="principal"
                                name="principal"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.principal}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="schoolHours" className="block text-sm font-medium text-gray-700 mb-1">
                                School Hours
                            </label>
                            <input
                                type="text"
                                id="schoolHours"
                                name="schoolHours"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.schoolHours}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="p-6 border-b border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Academic Settings</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700 mb-1">
                                Current Academic Year
                            </label>
                            <input
                                type="text"
                                id="academicYear"
                                name="academicYear"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.academicYear}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="terms" className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Terms
                            </label>
                            <select
                                id="terms"
                                name="terms"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.terms}
                                onChange={handleChange}
                            >
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="gradingSystem" className="block text-sm font-medium text-gray-700 mb-1">
                                Grading System
                            </label>
                            <select
                                id="gradingSystem"
                                name="gradingSystem"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.gradingSystem || 'percentage'}
                                onChange={handleChange}
                            >
                                <option value="percentage">Percentage (0-100)</option>
                                <option value="letter">Letter Grade (A-F)</option>
                                <option value="gpa">GPA (0-4)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="passingGrade" className="block text-sm font-medium text-gray-700">
                                Passing Grade
                            </label>
                            <input
                                type="number"
                                id="passingGrade"
                                name="passingGrade"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.passingGrade || 50}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                                System Language
                            </label>
                            <select
                                id="language"
                                name="language"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.language || 'english'}
                                onChange={handleChange}
                            >
                                <option value="english">English</option>
                                <option value="french">French</option>
                                <option value="spanish">Spanish</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                                Timezone
                            </label>
                            <select
                                id="timezone"
                                name="timezone"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.timezone || 'CAT'}
                                onChange={handleChange}
                            >
                                <option value="CAT">Central Africa Time (CAT)</option>
                                <option value="EAT">East Africa Time (EAT)</option>
                                <option value="GMT">Greenwich Mean Time (GMT)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="enableNotifications" className="block text-sm font-medium text-gray-700">
                                Enable Email Notifications
                            </label>
                            <input
                                id="enableNotifications"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={formData.enableNotifications}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="enableSMS" className="block text-sm font-medium text-gray-700">
                                Enable SMS Notifications
                            </label>
                            <input
                                id="enableSMS"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={formData.enableSMS}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="enableParentAccess" className="block text-sm font-medium text-gray-700">
                                Enable Parent Portal Access
                            </label>
                            <input
                                id="enableParentAccess"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={formData.enableParentAccess}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="enableStudentAccess" className="block text-sm font-medium text-gray-700">
                                Enable Student Portal Access
                            </label>
                            <input
                                id="enableStudentAccess"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={formData.enableStudentAccess}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
