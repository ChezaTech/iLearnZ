import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { router } from '@inertiajs/react';

const ReportsTab = () => {
    // State for managing reports
    const [selectedReportType, setSelectedReportType] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [currentReport, setCurrentReport] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedReports, setGeneratedReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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
    
    // Scheduled reports
    const scheduledReports = [
        { id: 1, name: 'Monthly School Performance', frequency: 'Monthly', nextRun: '2023-04-01', recipients: 'All School Admins' },
        { id: 2, name: 'Quarterly District Comparison', frequency: 'Quarterly', nextRun: '2023-06-30', recipients: 'District Officials' },
        { id: 3, name: 'Weekly Attendance Summary', frequency: 'Weekly', nextRun: '2023-03-20', recipients: 'School Admins, Teachers' }
    ];
    
    // Fetch generated reports from the API
    useEffect(() => {
        fetchReports();
    }, []);
    
    // Fetch reports from the API
    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/reports', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });
            if (response.data && response.data.reports) {
                setGeneratedReports(response.data.reports);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching reports:', err);
            setError('Failed to load reports. Please try again later.');
            setLoading(false);
            setGeneratedReports([
                { id: 1, name: 'School Performance Q1 2023', type: 'School Performance Report', generated: '2023-03-15', size: '2.4 MB' },
                { id: 2, name: 'Teacher Effectiveness Feb 2023', type: 'Teacher Effectiveness Report', generated: '2023-03-05', size: '1.8 MB' },
                { id: 3, name: 'Student Progress Summary', type: 'Student Progress Report', generated: '2023-03-10', size: '3.2 MB' },
                { id: 4, name: 'Resource Allocation Analysis', type: 'Resource Utilization Report', generated: '2023-02-28', size: '1.5 MB' }
            ]);
        }
    };
    
    // Handle report generation
    const handleGenerateReport = async () => {
        if (!selectedReportType || !dateRange.start || !dateRange.end) {
            alert('Please select a report type and date range');
            return;
        }
        
        setIsGenerating(true);
        
        try {
            const reportType = reportTypes.find(r => r.id === parseInt(selectedReportType));
            
            const response = await axios.post('/reports/generate', {
                report_type: reportType.name,
                start_date: dateRange.start,
                end_date: dateRange.end
            }, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data && response.data.success) {
                setGeneratedReports([response.data.report, ...generatedReports]);
                setIsGenerating(false);
                setShowGenerateModal(false);
                setSelectedReportType('');
                setDateRange({ start: '', end: '' });
                
                alert('Report generated successfully!');
            } else {
                throw new Error('Failed to generate report');
            }
        } catch (err) {
            console.error('Error generating report:', err);
            setIsGenerating(false);
            alert('Failed to generate report. Please try again later.');
        }
    };
    
    // Handle viewing a report
    const handleViewReport = async (report) => {
        try {
            if (report.file_path) {
                setCurrentReport(report);
                setShowViewModal(true);
                return;
            }
            
            const response = await axios.get(`/reports/${report.id}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                }
            });
            if (response.data && response.data.report) {
                setCurrentReport(response.data.report);
                setShowViewModal(true);
            } else {
                throw new Error('Failed to fetch report details');
            }
        } catch (err) {
            console.error('Error viewing report:', err);
            alert('Failed to load report details. Please try again later.');
        }
    };
    
    // Handle downloading a report
    const handleDownloadReport = (report) => {
        const downloadUrl = `/reports/${report.id}/download`;
        window.open(downloadUrl, '_blank');
    };
    
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };
    
    // Refresh reports list
    const refreshReports = () => {
        fetchReports();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Reports</h2>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center"
                    onClick={() => setShowGenerateModal(true)}
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Generate New Report
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Report Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reportTypes.map((report) => (
                        <div key={report.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                            <h4 className="font-medium text-gray-800 mb-2">{report.name}</h4>
                            <p className="text-sm text-gray-500 mb-3">{report.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">Last Generated: {report.lastGenerated}</span>
                                <button 
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    onClick={() => {
                                        setSelectedReportType(report.id.toString());
                                        setShowGenerateModal(true);
                                    }}
                                >
                                    Generate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Performance Trends</h3>
                    <div className="flex space-x-2">
                        <button className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                            Last 6 Months
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                            Year to Date
                        </button>
                    </div>
                </div>
                
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={performanceTrendData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="attendance" stroke="#3B82F6" activeDot={{ r: 8 }} name="Attendance Rate %" />
                            <Line type="monotone" dataKey="completion" stroke="#10B981" name="Assignment Completion %" />
                            <Line type="monotone" dataKey="passing" stroke="#F59E0B" name="Passing Rate %" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Generated Reports</h3>
                    <button 
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        onClick={refreshReports}
                        disabled={loading}
                    >
                        <svg className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Refresh
                    </button>
                </div>
                
                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Loading reports...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : generatedReports.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No reports have been generated yet.</p>
                        <button 
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                            onClick={() => setShowGenerateModal(true)}
                        >
                            Generate Your First Report
                        </button>
                    </div>
                ) : (
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Report Name</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Generated</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {generatedReports.map((report) => (
                                    <tr key={report.id}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{report.name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.type}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(report.generated || report.created_at)}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.size}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button 
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                                onClick={() => handleViewReport(report)}
                                            >
                                                View
                                            </button>
                                            <button 
                                                className="text-green-600 hover:text-green-900"
                                                onClick={() => handleDownloadReport(report)}
                                            >
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
                            {scheduledReports.map((report) => (
                                <tr key={report.id}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{report.name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.frequency}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.nextRun}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{report.recipients}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Generate Report Modal */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Generate New Report</h3>
                            <button 
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => setShowGenerateModal(false)}
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                            <select
                                id="report-type"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={selectedReportType}
                                onChange={(e) => setSelectedReportType(e.target.value)}
                                required
                            >
                                <option value="">Select Report Type</option>
                                {reportTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                id="start-date"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                id="end-date"
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2"
                                onClick={() => setShowGenerateModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={handleGenerateReport}
                                disabled={isGenerating}
                            >
                                {isGenerating ? 'Generating...' : 'Generate Report'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* View Report Modal */}
            {showViewModal && currentReport && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">{currentReport.name}</h3>
                            <button 
                                className="text-gray-400 hover:text-gray-500"
                                onClick={() => {
                                    setShowViewModal(false);
                                    setCurrentReport(null);
                                }}
                            >
                                <span className="text-2xl">&times;</span>
                            </button>
                        </div>
                        
                        <div className="mb-4">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Report Type</p>
                                    <p className="font-medium">{currentReport.type}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Generated On</p>
                                    <p className="font-medium">{currentReport.generated || currentReport.created_at}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Date Range</p>
                                    <p className="font-medium">{currentReport.start_date} to {currentReport.end_date}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">File Size</p>
                                    <p className="font-medium">{currentReport.size}</p>
                                </div>
                            </div>
                        </div>
                        
                        {currentReport.file_path ? (
                            <div className="mb-4 border rounded-md overflow-hidden">
                                <iframe 
                                    src={`/reports/${currentReport.id}?embed=true`}
                                    className="w-full h-96"
                                    title={currentReport.name}
                                ></iframe>
                            </div>
                        ) : (
                            <div className="mb-4 p-4 bg-gray-100 rounded-md">
                                <p className="text-gray-500 text-center">Preview not available. Please download the report to view it.</p>
                            </div>
                        )}
                        
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md mr-2"
                                onClick={() => {
                                    setShowViewModal(false);
                                    setCurrentReport(null);
                                }}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                                onClick={() => handleDownloadReport(currentReport)}
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsTab;
