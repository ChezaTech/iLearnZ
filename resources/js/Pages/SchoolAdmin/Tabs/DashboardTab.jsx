import React from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
    AcademicCapIcon, UsersIcon, BookOpenIcon, ChartBarIcon
} from '@heroicons/react/24/outline';

export default function DashboardTab({ stats, events, resources, recentReportCards }) {
    const attendanceData = [
        { name: 'Mon', attendance: 95 },
        { name: 'Tue', attendance: 92 },
        { name: 'Wed', attendance: 88 },
        { name: 'Thu', attendance: 90 },
        { name: 'Fri', attendance: 85 },
    ];

    const gradeDistributionData = [
        { name: 'A', count: 45 },
        { name: 'B', count: 85 },
        { name: 'C', count: 70 },
        { name: 'D', count: 35 },
        { name: 'F', count: 15 },
    ];

    return (
        <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <UsersIcon className="h-8 w-8" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Students</p>
                            <p className="text-3xl font-semibold text-gray-900">{stats.totalStudents}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <AcademicCapIcon className="h-8 w-8" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Teachers</p>
                            <p className="text-3xl font-semibold text-gray-900">{stats.totalTeachers}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <BookOpenIcon className="h-8 w-8" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Classes</p>
                            <p className="text-3xl font-semibold text-gray-900">{stats.totalClasses}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                            <ChartBarIcon className="h-8 w-8" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Avg. Attendance</p>
                            <p className="text-3xl font-semibold text-gray-900">{stats.averageAttendance}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Attendance</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={attendanceData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={gradeDistributionData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Events and Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                <p className="text-xs text-gray-500">{event.date} | {event.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Resources</h3>
                    <div className="space-y-4">
                        {resources.map((resource) => (
                            <div key={resource.id} className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                                    <p className="text-xs text-gray-500">{resource.type}</p>
                                </div>
                                <a href={resource.downloadUrl} className="text-sm text-blue-600 hover:text-blue-800">Download</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Report Cards */}
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Report Cards</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentReportCards.map((card) => (
                                <tr key={card.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{card.student}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.grade}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{card.term}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            card.average >= 85 ? 'bg-green-100 text-green-800' : 
                                            card.average >= 70 ? 'bg-blue-100 text-blue-800' : 
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {card.average}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <a href="#" className="text-blue-600 hover:text-blue-900">View</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
