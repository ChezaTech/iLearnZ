import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

// Import Tab Components
import OverviewTab from './Components/OverviewTab';
import SchoolsTab from './Components/SchoolsTab';
import TeachersTab from './Components/TeachersTab';
import StudentsTab from './Components/StudentsTab';
import DistrictsTab from './Components/DistrictsTab';
import ResourcesTab from './Components/ResourcesTab';
import ReportsTab from './Components/ReportsTab';

// No need for axios since we're using data passed directly from the controller

export default function SuperAdminDashboard({ auth, initialSchools, initialTeachers, initialStudents, initialDistricts, initialResources, initialEvents }) {
    // Use Inertia page props to get the latest data
    const { props } = usePage();
    const [activeTab, setActiveTab] = useState('overview');
    // Use the schools from page props if available, otherwise use initialSchools
    const [schools, setSchools] = useState(props.initialSchools || initialSchools || []);
    const [teachers, setTeachers] = useState(initialTeachers || []);
    const [students, setStudents] = useState(initialStudents || []);
    const [districts, setDistricts] = useState(initialDistricts || []);
    const [resources, setResources] = useState(initialResources || []);
    const [events, setEvents] = useState(initialEvents || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Calculate stats based on the data passed from the controller
    const [stats, setStats] = useState({
        totalSchools: 0,
        totalTeachers: 0,
        totalStudents: 0,
        totalDistricts: 0,
        onlineSchools: 0,
        hybridSchools: 0,
        offlineSchools: 0
    });
    
    // Update schools when page props change (after Inertia form submissions)
    useEffect(() => {
        if (props.initialSchools) {
            setSchools(props.initialSchools);
        }
    }, [props.initialSchools]);
    
    // Calculate stats when component mounts or data changes
    useEffect(() => {
        // Calculate stats based on the data
        const onlineSchoolsCount = schools.filter(school => school.connectivity === 'Online').length;
        const hybridSchoolsCount = schools.filter(school => school.connectivity === 'Hybrid').length;
        const offlineSchoolsCount = schools.filter(school => school.connectivity === 'Offline').length;
        
        setStats({
            totalSchools: schools.length,
            totalTeachers: teachers.length,
            totalStudents: students.length,
            totalDistricts: districts.length,
            onlineSchools: onlineSchoolsCount,
            hybridSchools: hybridSchoolsCount,
            offlineSchools: offlineSchoolsCount
        });
    }, [schools, teachers, students, districts]);
    
    // Search and filter states
    const [schoolSearch, setSchoolSearch] = useState('');
    const [schoolTypeFilter, setSchoolTypeFilter] = useState('');
    const [schoolDistrictFilter, setSchoolDistrictFilter] = useState('');
    const [schoolConnectivityFilter, setSchoolConnectivityFilter] = useState('');
    
    // Districts tab search and filter states
    const [districtSearch, setDistrictSearch] = useState('');
    const [districtRegionFilter, setDistrictRegionFilter] = useState('');
    
    // Teachers tab search and filter states
    const [teacherSearch, setTeacherSearch] = useState('');
    const [teacherSchoolFilter, setTeacherSchoolFilter] = useState('');
    const [teacherSubjectFilter, setTeacherSubjectFilter] = useState('');
    
    // Students tab search and filter states
    const [studentSearch, setStudentSearch] = useState('');
    const [studentSchoolFilter, setStudentSchoolFilter] = useState('');
    const [studentPerformanceFilter, setStudentPerformanceFilter] = useState('');
    
    // Resources tab search and filter states
    const [resourceSearch, setResourceSearch] = useState('');
    const [resourceTypeFilter, setResourceTypeFilter] = useState('');
    const [resourceLocationFilter, setResourceLocationFilter] = useState('');
    
    // Filter schools based on search and filter values
    const filteredSchools = schools.filter(school => {
        return (
            (schoolSearch === '' || 
                school.name.toLowerCase().includes(schoolSearch.toLowerCase())) &&
            (schoolDistrictFilter === '' || 
                school.district === schoolDistrictFilter) &&
            (schoolTypeFilter === '' || 
                school.type === schoolTypeFilter) &&
            (schoolConnectivityFilter === '' || 
                school.connectivity === schoolConnectivityFilter)
        );
    });
    
    // Filter districts based on search and filter values
    const filteredDistricts = districts.filter(district => {
        return (
            (districtSearch === '' || 
                district.name.toLowerCase().includes(districtSearch.toLowerCase())) &&
            (districtRegionFilter === '' || 
                district.region === districtRegionFilter)
        );
    });
    
    // Filter teachers based on search and filter values
    const filteredTeachers = teachers.filter(teacher => {
        return (
            (teacherSearch === '' || 
                teacher.name.toLowerCase().includes(teacherSearch.toLowerCase())) &&
            (teacherSchoolFilter === '' || 
                teacher.school === teacherSchoolFilter) &&
            (teacherSubjectFilter === '' || 
                teacher.subject === teacherSubjectFilter)
        );
    });
    
    // Filter students based on search and filter values
    const filteredStudents = students.filter(student => {
        return (
            (studentSearch === '' || 
                student.name.toLowerCase().includes(studentSearch.toLowerCase())) &&
            (studentSchoolFilter === '' || 
                student.school === studentSchoolFilter) &&
            (studentPerformanceFilter === '' || 
                student.performance === studentPerformanceFilter)
        );
    });
    
    // Filter resources based on search and filter values
    const filteredResources = resources.filter(resource => {
        return (
            (resourceSearch === '' || 
                resource.name.toLowerCase().includes(resourceSearch.toLowerCase())) &&
            (resourceTypeFilter === '' || 
                resource.type === resourceTypeFilter) &&
            (resourceLocationFilter === '' || 
                resource.location === resourceLocationFilter)
        );
    });

    // Calculate school type data based on fetched schools
    const schoolTypeData = [
        { name: 'Primary', value: schools.filter(school => school.type === 'Primary').length },
        { name: 'Secondary', value: schools.filter(school => school.type === 'Secondary').length },
        { name: 'Combined', value: schools.filter(school => school.type === 'Combined').length }
    ];

    // Calculate connectivity data based on fetched schools
    const connectivityData = [
        { name: 'Online', value: stats.onlineSchools },
        { name: 'Hybrid', value: stats.hybridSchools },
        { name: 'Offline', value: stats.offlineSchools }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Calculate district data based on fetched data
    const districtData = districts.map(district => {
        const districtSchools = schools.filter(school => school.district === district.name).length;
        const districtTeachers = teachers.filter(teacher => 
            schools.find(school => school.name === teacher.school && school.district === district.name)
        ).length;
        const districtStudents = students.filter(student => 
            schools.find(school => school.name === student.school && school.district === district.name)
        ).length;
        
        return {
            name: district.name,
            schools: districtSchools,
            teachers: districtTeachers,
            students: districtStudents
        };
    });
    
    // Performance trend data over 6 months
    const performanceTrendData = [
        { month: 'Oct', attendance: 92, completion: 85, passing: 78 },
        { month: 'Nov', attendance: 94, completion: 87, passing: 80 },
        { month: 'Dec', attendance: 91, completion: 84, passing: 76 },
        { month: 'Jan', attendance: 95, completion: 88, passing: 82 },
        { month: 'Feb', attendance: 96, completion: 90, passing: 84 },
        { month: 'Mar', attendance: 97, completion: 92, passing: 86 }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Super Admin Dashboard</h2>}
        >
            <Head title="Super Admin Dashboard" />
            
            {/* Show loading state */}
            {loading ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                <span className="ml-3 text-gray-700">Loading dashboard data...</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="text-red-500">
                                <p>Error loading dashboard data: {error}</p>
                                <button 
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => window.location.reload()}
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/* Dashboard Tabs */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                            <div className="flex overflow-x-auto">
                                <button 
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Overview
                                </button>
                                <button 
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'schools' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('schools')}
                                >
                                    Schools
                                </button>
                                <button 
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'teachers' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('teachers')}
                                >
                                    Teachers
                                </button>
                                <button 
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'students' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('students')}
                                >
                                    Students
                                </button>
                                <button 
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'districts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('districts')}
                                >
                                    Districts
                                </button>
                                <button 
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('resources')}
                                >
                                    Resources
                                </button>
                                <button 
                                    className={`px-4 py-3 text-sm font-medium ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    onClick={() => setActiveTab('reports')}
                                >
                                    Reports
                                </button>
                            </div>
                        </div>
                        
                        {/* Tab Content */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            {/* Overview Tab */}
                            {activeTab === 'overview' && (
                                <OverviewTab 
                                    stats={stats}
                                    schools={schools}
                                    teachers={teachers}
                                    students={students}
                                    districts={districts}
                                    resources={resources}
                                    events={events}
                                    schoolTypeData={schoolTypeData}
                                    connectivityData={connectivityData}
                                    performanceTrendData={performanceTrendData}
                                />
                            )}
                            
                            {/* Schools Tab */}
                            {activeTab === 'schools' && (
                                <SchoolsTab 
                                    schools={schools}
                                    filteredSchools={filteredSchools}
                                    schoolSearch={schoolSearch}
                                    setSchoolSearch={setSchoolSearch}
                                    schoolTypeFilter={schoolTypeFilter}
                                    setSchoolTypeFilter={setSchoolTypeFilter}
                                    schoolDistrictFilter={schoolDistrictFilter}
                                    setSchoolDistrictFilter={setSchoolDistrictFilter}
                                    schoolConnectivityFilter={schoolConnectivityFilter}
                                    setSchoolConnectivityFilter={setSchoolConnectivityFilter}
                                    districts={districts}
                                />
                            )}

                            {/* Districts Tab */}
                            {activeTab === 'districts' && (
                                <DistrictsTab 
                                    districts={districts}
                                    filteredDistricts={filteredDistricts}
                                    districtSearch={districtSearch}
                                    setDistrictSearch={setDistrictSearch}
                                    districtRegionFilter={districtRegionFilter}
                                    setDistrictRegionFilter={setDistrictRegionFilter}
                                    districtData={districtData}
                                />
                            )}

                            {/* Teachers Tab */}
                            {activeTab === 'teachers' && (
                                <TeachersTab 
                                    teachers={teachers}
                                    filteredTeachers={filteredTeachers}
                                    teacherSearch={teacherSearch}
                                    setTeacherSearch={setTeacherSearch}
                                    teacherSchoolFilter={teacherSchoolFilter}
                                    setTeacherSchoolFilter={setTeacherSchoolFilter}
                                    teacherSubjectFilter={teacherSubjectFilter}
                                    setTeacherSubjectFilter={setTeacherSubjectFilter}
                                    schools={schools}
                                />
                            )}

                            {/* Students Tab */}
                            {activeTab === 'students' && (
                                <StudentsTab 
                                    students={students}
                                    filteredStudents={filteredStudents}
                                    studentSearch={studentSearch}
                                    setStudentSearch={setStudentSearch}
                                    studentSchoolFilter={studentSchoolFilter}
                                    setStudentSchoolFilter={setStudentSchoolFilter}
                                    studentPerformanceFilter={studentPerformanceFilter}
                                    setStudentPerformanceFilter={setStudentPerformanceFilter}
                                    schools={schools}
                                />
                            )}

                            {/* Resources Tab */}
                            {activeTab === 'resources' && (
                                <ResourcesTab 
                                    resources={resources}
                                    filteredResources={filteredResources}
                                    resourceSearch={resourceSearch}
                                    setResourceSearch={setResourceSearch}
                                    resourceTypeFilter={resourceTypeFilter}
                                    setResourceTypeFilter={setResourceTypeFilter}
                                    resourceLocationFilter={resourceLocationFilter}
                                    setResourceLocationFilter={setResourceLocationFilter}
                                />
                            )}

                            {/* Reports Tab */}
                            {activeTab === 'reports' && (
                                <ReportsTab 
                                    performanceTrendData={performanceTrendData}
                                    schools={schools}
                                    districts={districts}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
