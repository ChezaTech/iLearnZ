import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowLeftCircleIcon,
    BellAlertIcon,
    BellSlashIcon,
    CheckCircleIcon,
    XMarkIcon,
    EyeIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

export default function Notifications({ auth, notifications }) {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    
    // Filter notifications based on active tab
    const filteredNotifications = notifications.filter(notification => {
        if (activeTab === 'all') return true;
        if (activeTab === 'unread') return !notification.read;
        if (activeTab === 'read') return notification.read;
        return true;
    });
    
    // Toggle notification selection
    const toggleNotificationSelection = (id) => {
        if (selectedNotifications.includes(id)) {
            setSelectedNotifications(selectedNotifications.filter(notificationId => notificationId !== id));
        } else {
            setSelectedNotifications([...selectedNotifications, id]);
        }
    };
    
    // Select all notifications
    const selectAllNotifications = () => {
        if (selectedNotifications.length === filteredNotifications.length) {
            setSelectedNotifications([]);
        } else {
            setSelectedNotifications(filteredNotifications.map(notification => notification.id));
        }
    };
    
    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            // Today - show time
            return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (diffDays === 1) {
            // Yesterday
            return 'Yesterday';
        } else if (diffDays < 7) {
            // Within a week
            return `${diffDays} days ago`;
        } else {
            // More than a week
            return date.toLocaleDateString();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <Link 
                        href={route('teacher.dashboard')} 
                        className="mr-3 p-1 rounded-full hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeftCircleIcon className="h-5 w-5 text-gray-600" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                        Notifications
                    </h2>
                </div>
            }
        >
            <Head title="Notifications" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Tabs and Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            activeTab === 'all' 
                                                ? 'bg-[#1e5091] text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('unread')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            activeTab === 'unread' 
                                                ? 'bg-[#1e5091] text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Unread
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('read')}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            activeTab === 'read' 
                                                ? 'bg-[#1e5091] text-white' 
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        Read
                                    </button>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={selectAllNotifications}
                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                                    >
                                        {selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0
                                            ? 'Deselect All'
                                            : 'Select All'
                                        }
                                    </button>
                                    {selectedNotifications.length > 0 && (
                                        <>
                                            <button
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 flex items-center"
                                            >
                                                <EyeIcon className="h-4 w-4 mr-1" />
                                                Mark as Read
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 flex items-center"
                                            >
                                                <TrashIcon className="h-4 w-4 mr-1" />
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Notifications List */}
                            {filteredNotifications.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredNotifications.map((notification) => (
                                        <div 
                                            key={notification.id} 
                                            className={`border rounded-lg p-4 ${
                                                notification.read ? 'bg-white' : 'bg-blue-50'
                                            } ${
                                                selectedNotifications.includes(notification.id) ? 'border-[#1e5091]' : 'border-gray-200'
                                            }`}
                                        >
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 mr-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedNotifications.includes(notification.id)}
                                                        onChange={() => toggleNotificationSelection(notification.id)}
                                                        className="h-4 w-4 text-[#1e5091] border-gray-300 rounded focus:ring-[#1e5091]"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-base font-medium text-gray-900">
                                                                {notification.title}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {notification.content}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs text-gray-500">
                                                                {formatDate(notification.created_at)}
                                                            </span>
                                                            {notification.type && (
                                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                    notification.type === 'announcement' 
                                                                        ? 'bg-purple-100 text-purple-800' 
                                                                        : notification.type === 'assessment' 
                                                                            ? 'bg-red-100 text-red-800' 
                                                                            : 'bg-green-100 text-green-800'
                                                                }`}>
                                                                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {notification.actions && (
                                                        <div className="mt-3 flex space-x-2">
                                                            {notification.actions.map((action, index) => (
                                                                <Link
                                                                    key={index}
                                                                    href={action.url}
                                                                    className="inline-flex items-center px-3 py-1 bg-[#1e5091] text-white rounded-md text-xs font-medium hover:bg-[#1e5091]/90 transition-all"
                                                                >
                                                                    {action.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <BellSlashIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {activeTab === 'all' 
                                            ? "You don't have any notifications yet." 
                                            : activeTab === 'unread' 
                                                ? "You don't have any unread notifications." 
                                                : "You don't have any read notifications."
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Announcements</h4>
                                        <p className="text-xs text-gray-500">Receive notifications for school and class announcements</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input 
                                            type="checkbox" 
                                            name="toggle-announcements" 
                                            id="toggle-announcements" 
                                            defaultChecked 
                                            className="sr-only"
                                        />
                                        <label 
                                            htmlFor="toggle-announcements" 
                                            className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                        >
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-0"></span>
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-4 checked:translate-x-full"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Assessment Reminders</h4>
                                        <p className="text-xs text-gray-500">Receive reminders for upcoming assessments and due dates</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input 
                                            type="checkbox" 
                                            name="toggle-assessments" 
                                            id="toggle-assessments" 
                                            defaultChecked 
                                            className="sr-only"
                                        />
                                        <label 
                                            htmlFor="toggle-assessments" 
                                            className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                        >
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-0"></span>
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-4 checked:translate-x-full"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Class Updates</h4>
                                        <p className="text-xs text-gray-500">Receive notifications when new students join or leave your classes</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input 
                                            type="checkbox" 
                                            name="toggle-class-updates" 
                                            id="toggle-class-updates" 
                                            defaultChecked 
                                            className="sr-only"
                                        />
                                        <label 
                                            htmlFor="toggle-class-updates" 
                                            className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                        >
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-0"></span>
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-4 checked:translate-x-full"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                                        <p className="text-xs text-gray-500">Receive email notifications in addition to in-app notifications</p>
                                    </div>
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                                        <input 
                                            type="checkbox" 
                                            name="toggle-email" 
                                            id="toggle-email" 
                                            defaultChecked={false}
                                            className="sr-only"
                                        />
                                        <label 
                                            htmlFor="toggle-email" 
                                            className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                                        >
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-0"></span>
                                            <span className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform translate-x-4 checked:translate-x-full"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
