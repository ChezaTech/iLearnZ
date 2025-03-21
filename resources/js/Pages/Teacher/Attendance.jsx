import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function Attendance({ auth, classData, students, attendanceRecords, date }) {
    const [selectedDate, setSelectedDate] = useState(date || new Date().toISOString().split('T')[0]);
    
    const { data, setData, post, processing, errors } = useForm({
        date: selectedDate,
        attendanceData: students.map(student => ({
            student_id: student.id,
            status: attendanceRecords[student.id] ? attendanceRecords[student.id].status : 'present',
            remarks: attendanceRecords[student.id] ? attendanceRecords[student.id].remarks : '',
        })),
    });

    const handleStatusChange = (studentId, status) => {
        const updatedAttendanceData = data.attendanceData.map(item => {
            if (item.student_id === studentId) {
                return { ...item, status };
            }
            return item;
        });
        
        setData('attendanceData', updatedAttendanceData);
    };

    const handleRemarksChange = (studentId, remarks) => {
        const updatedAttendanceData = data.attendanceData.map(item => {
            if (item.student_id === studentId) {
                return { ...item, remarks };
            }
            return item;
        });
        
        setData('attendanceData', updatedAttendanceData);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setData('date', e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teacher.class.attendance.mark', classData.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route('teacher.class.show', classData.id)} className="mr-4">
                        <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                        Attendance: {classData.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Attendance - ${classData.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">
                                    Mark Attendance
                                </h3>
                                <div className="flex items-center">
                                    <label htmlFor="date" className="mr-2 text-sm text-gray-600">Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Student
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Remarks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {students.map((student, index) => {
                                                const attendanceData = data.attendanceData.find(item => item.student_id === student.id);
                                                return (
                                                    <tr key={student.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="h-10 w-10 rounded-full bg-[#1e5091]/10 flex items-center justify-center text-[#1e5091] font-medium">
                                                                    {student.name.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                                    <div className="text-sm text-gray-500">{student.student_id_number || 'No ID'}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleStatusChange(student.id, 'present')}
                                                                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                                                                        attendanceData.status === 'present'
                                                                            ? 'bg-green-100 text-green-800 font-medium'
                                                                            : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                                                                    }`}
                                                                >
                                                                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                                                                    Present
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleStatusChange(student.id, 'absent')}
                                                                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                                                                        attendanceData.status === 'absent'
                                                                            ? 'bg-red-100 text-red-800 font-medium'
                                                                            : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                                                                    }`}
                                                                >
                                                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                                                    Absent
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleStatusChange(student.id, 'late')}
                                                                    className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                                                                        attendanceData.status === 'late'
                                                                            ? 'bg-yellow-100 text-yellow-800 font-medium'
                                                                            : 'bg-gray-100 text-gray-700 hover:bg-yellow-50'
                                                                    }`}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    Late
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="text"
                                                                value={attendanceData.remarks}
                                                                onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                                                                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                                                                placeholder="Add remarks (optional)"
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <Link
                                        href={route('teacher.class.show', classData.id)}
                                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 mr-3"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-[#1e5091] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#1e5091]/90 focus:bg-[#1e5091]/90 active:bg-[#1e5091]/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        {processing ? 'Saving...' : 'Save Attendance'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
