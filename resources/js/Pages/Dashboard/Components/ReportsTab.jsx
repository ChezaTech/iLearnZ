import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsTab = () => {
    // Performance trend data over 6 months
    const performanceTrendData = [
        { month: 'Oct', attendance: 92, completion: 85, passing: 78 },
        { month: 'Nov', attendance: 94, completion: 87, passing: 80 },
        { month: 'Dec', attendance: 91, completion: 84, passing: 76 },
        { month: 'Jan', attendance: 95, completion: 88, passing: 82 },
        { month: 'Feb', attendance: 96, completion: 90, passing: 84 },
        { month: 'Mar', attendance: 97, completion: 92, passing: 86 }
    ];
    
    // Report types
    const reportTypes = [
        { id: 1, name: 'School Performance Report', description: 'Detailed analysis of academic performance across all schools', lastGenerated: '2023-03-01' },
        { id: 2, name: 'Teacher Effectiveness Report', description: 'Evaluation of teaching methods and student outcomes by teacher', lastGenerated: '2023-03-05' },
        { id: 3, name: 'Resource Utilization Report', description: 'Analysis of educational resource usage and distribution', lastGenerated: '2023-02-28' },
        { id: 4, name: 'Student Progress Report', description: 'Tracking of student academic progress and attendance', lastGenerated: '2023-03-10' },
        { id: 5, name: 'District Comparison Report', description: 'Comparative analysis of performance metrics across districts', lastGenerated: '2023-02-25' }
    ];
    
    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance Trends</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={performanceTrendData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} name="Attendance %" />
                            <Line type="monotone" dataKey="completion" stroke="#82ca9d" name="Assignment Completion %" />
                            <Line type="monotone" dataKey="passing" stroke="#ffc658" name="Passing Rate %" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Available Reports</h3>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Generate New Report
                    </button>
                </div>
                
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Report Name</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Generated</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {reportTypes.map((report) => (
                                <tr key={report.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{report.name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.description}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.lastGenerated}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                        <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                                        <button className="text-purple-600 hover:text-purple-900">Share</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Scheduled Reports</h3>
                
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Report Name</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Frequency</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Next Run</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Recipients</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Monthly Performance Summary</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Monthly</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2023-04-01</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">All Administrators</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Weekly Attendance Report</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Weekly</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2023-03-17</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">School Administrators</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Quarterly Resource Allocation</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Quarterly</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">2023-06-30</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">District Officials</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ReportsTab;
