import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function SchoolAdminDashboard({ auth }) {
    const [stats, setStats] = useState({
        totalTeachers: 6,
        totalStudents: 120,
        totalClasses: 8,
        attendanceRate: 92,
        averageGrade: 78
    });

    const [events, setEvents] = useState([
        { id: 1, title: 'Annual Science Fair', date: '2025-03-15', type: 'academic' },
        { id: 2, title: 'Parent-Teacher Conference', date: '2025-04-05', type: 'meeting' },
        { id: 3, title: 'Inter-School Sports Tournament', date: '2025-05-10', type: 'sports' }
    ]);

    const [resources, setResources] = useState([
        { id: 1, name: 'Science Laboratory Kit', type: 'equipment', condition: 'good', quantity: 15 },
        { id: 2, name: 'Online Learning Platform Subscription', type: 'digital', condition: 'excellent', quantity: 1 }
    ]);

    const [recentReportCards, setRecentReportCards] = useState([
        { id: 1, student: 'Tendai Mutasa', grade: 'Form 5', term: 'First Term', average: 82.5 },
        { id: 2, student: 'Chipo Dziva', grade: 'Form 4', term: 'First Term', average: 88.75 }
    ]);

    const attendanceData = [
        { month: 'Jan', attendance: 94 },
        { month: 'Feb', attendance: 91 },
        { month: 'Mar', attendance: 93 },
        { month: 'Apr', attendance: 89 },
        { month: 'May', attendance: 92 },
        { month: 'Jun', attendance: 90 }
    ];

    const gradeDistribution = [
        { name: 'A', value: 25 },
        { name: 'B', value: 35 },
        { name: 'C', value: 30 },
        { name: 'D', value: 8 },
        { name: 'F', value: 2 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">School Admin Dashboard</h2>}
        >
            <Head title="School Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Teachers</h3>
                                <p className="text-3xl font-bold">{stats.totalTeachers}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Students</h3>
                                <p className="text-3xl font-bold">{stats.totalStudents}</p>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Classes</h3>
                                <p className="text-3xl font-bold">{stats.totalClasses}</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Attendance</h3>
                                <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
                            </div>
                            <div className="bg-red-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Avg. Grade</h3>
                                <p className="text-3xl font-bold">{stats.averageGrade}</p>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Attendance Trend</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart
                                            data={attendanceData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis domain={[80, 100]} />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">Grade Distribution</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={gradeDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {gradeDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Events and Resources */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Upcoming School Events</h3>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                                        Manage Events
                                    </button>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {events.map((event) => (
                                        <li key={event.id} className="py-3">
                                            <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                            <div className="text-sm text-gray-500">{`${event.date} | ${event.type}`}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Recent Report Cards</h3>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                                        View All
                                    </button>
                                </div>
                                <ul className="divide-y divide-gray-200">
                                    {recentReportCards.map((report) => (
                                        <li key={report.id} className="py-3">
                                            <div className="text-sm font-medium text-gray-900">{report.student}</div>
                                            <div className="text-sm text-gray-500">{`${report.grade} | ${report.term} | Average: ${report.average}`}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* School Resources */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">School Resources</h3>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                                    Manage Resources
                                </button>
                            </div>
                            <ul className="divide-y divide-gray-200">
                                {resources.map((resource) => (
                                    <li key={resource.id} className="py-3">
                                        <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                                        <div className="text-sm text-gray-500">{`Type: ${resource.type} | Condition: ${resource.condition} | Quantity: ${resource.quantity}`}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
