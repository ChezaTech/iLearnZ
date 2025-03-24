import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowLeftCircleIcon,
    QrCodeIcon,
    UserGroupIcon,
    KeyIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

export default function JoinClass({ auth }) {
    const [joinMethod, setJoinMethod] = useState('code');
    const [classCode, setClassCode] = useState('');
    const [scanning, setScanning] = useState(false);
    const [joinStatus, setJoinStatus] = useState(null); // null, 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to handle joining a class with a code
    const handleJoinWithCode = (e) => {
        e.preventDefault();
        
        // Validate class code
        if (!classCode.trim()) {
            setJoinStatus('error');
            setErrorMessage('Please enter a valid class code');
            return;
        }
        
        // Simulate joining a class (in a real app, this would be an API call)
        // For demo purposes, we'll just check if the code is 6 characters
        if (classCode.trim().length === 6) {
            setJoinStatus('success');
            setSuccessMessage(`Successfully joined class with code ${classCode}`);
        } else {
            setJoinStatus('error');
            setErrorMessage('Invalid class code. Please try again');
        }
    };

    // Function to toggle QR code scanning
    const toggleScanning = () => {
        setScanning(!scanning);
        if (joinStatus) {
            setJoinStatus(null);
            setErrorMessage('');
            setSuccessMessage('');
        }
    };

    // Function to simulate scanning a QR code
    const simulateScan = () => {
        // Simulate a successful scan after 2 seconds
        setTimeout(() => {
            setScanning(false);
            setJoinStatus('success');
            setSuccessMessage('Successfully joined Grade 10-B Mathematics');
        }, 2000);
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
                        Join a Class
                    </h2>
                </div>
            }
        >
            <Head title="Join Class" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-md mx-auto bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Join an Existing Class</h3>
                            
                            {/* Join Method Tabs */}
                            <div className="flex border-b border-gray-200 mb-6">
                                <button
                                    onClick={() => {
                                        setJoinMethod('code');
                                        setJoinStatus(null);
                                        setScanning(false);
                                    }}
                                    className={`py-2 px-4 text-sm font-medium border-b-2 ${
                                        joinMethod === 'code'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Join with Code
                                </button>
                                <button
                                    onClick={() => {
                                        setJoinMethod('qr');
                                        setJoinStatus(null);
                                    }}
                                    className={`py-2 px-4 text-sm font-medium border-b-2 ${
                                        joinMethod === 'qr'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Scan QR Code
                                </button>
                            </div>
                            
                            {/* Join with Code Form */}
                            {joinMethod === 'code' && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Enter the 6-digit class code provided by the class administrator or another teacher.
                                    </p>
                                    
                                    <form onSubmit={handleJoinWithCode}>
                                        <div className="mb-4">
                                            <label htmlFor="class-code" className="block text-sm font-medium text-gray-700 mb-1">
                                                Class Code
                                            </label>
                                            <div className="flex">
                                                <div className="relative flex-grow">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <KeyIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        id="class-code"
                                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1e5091] focus:border-[#1e5091] sm:text-sm"
                                                        placeholder="Enter 6-digit code"
                                                        value={classCode}
                                                        onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                                                        maxLength={6}
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1e5091] hover:bg-[#1e5091]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e5091]"
                                                >
                                                    Join
                                                </button>
                                            </div>
                                            <p className="mt-2 text-xs text-gray-500">
                                                Example: ABC123
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            )}
                            
                            {/* Scan QR Code */}
                            {joinMethod === 'qr' && (
                                <div className="text-center">
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-4">
                                            Scan the QR code displayed by the class administrator or another teacher.
                                        </p>
                                        
                                        {scanning ? (
                                            <div className="relative mx-auto w-64 h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    {/* Simulated camera view with scanning animation */}
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                        <div className="w-40 h-40 border-2 border-[#1e5091] relative">
                                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#1e5091]"></div>
                                                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#1e5091]"></div>
                                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#1e5091]"></div>
                                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#1e5091]"></div>
                                                            
                                                            {/* Scanning line animation */}
                                                            <div className="absolute top-0 left-0 w-full h-1 bg-[#1e5091]/50 animate-scan"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Cancel button */}
                                                <button
                                                    onClick={toggleScanning}
                                                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-white/80 text-gray-700 rounded-full text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="mx-auto w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                                                <div className="text-center">
                                                    <QrCodeIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                    <p className="mt-2 text-sm font-medium text-gray-900">
                                                        Ready to scan
                                                    </p>
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Position the QR code within the frame
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <button
                                        onClick={() => {
                                            toggleScanning();
                                            if (!scanning) {
                                                simulateScan();
                                            }
                                        }}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1e5091] hover:bg-[#1e5091]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e5091]"
                                    >
                                        {scanning ? 'Cancel Scan' : 'Start Camera'}
                                    </button>
                                </div>
                            )}
                            
                            {/* Status Messages */}
                            {joinStatus === 'success' && (
                                <div className="mt-6 rounded-md bg-green-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <CheckCircleIcon className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800">
                                                {successMessage}
                                            </p>
                                            <div className="mt-4">
                                                <Link
                                                    href={route('teacher.dashboard')}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    Go to Dashboard
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {joinStatus === 'error' && (
                                <div className="mt-6 rounded-md bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <XCircleIcon className="h-5 w-5 text-red-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-red-800">
                                                {errorMessage}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Help Section */}
                    <div className="mt-6 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Where to find the class code?</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Class codes can be obtained from the class administrator or another teacher who is already part of the class. They can find the code in the class settings.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">QR Code not scanning?</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Make sure the QR code is well-lit and positioned within the scanning frame. If you continue to have issues, try joining with the class code instead.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Still having trouble?</h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Contact your school administrator or the IT support team for assistance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for scanning animation */}
            <style jsx>{`
                @keyframes scan {
                    0% {
                        top: 0;
                    }
                    50% {
                        top: 100%;
                    }
                    100% {
                        top: 0;
                    }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
