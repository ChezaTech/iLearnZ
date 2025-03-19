import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { UserGroupIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export default function StudentManagement({ classes }) {
    const [selectedClass, setSelectedClass] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrade, setFilterGrade] = useState('');
    const [students, setStudents] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        if (classes && classes.length > 0) {
            // If no class is selected, default to the first one
            if (!selectedClass && classes[0]) {
                setSelectedClass(classes[0].id.toString());
            }
            
            // Get students from the selected class
            if (selectedClass) {
                const classObj = classes.find(c => c.id.toString() === selectedClass);
                if (classObj && classObj.students) {
                    setStudents(classObj.students);
                } else {
                    setStudents([]);
                }
            }
        }
    }, [selectedClass, classes]);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterGrade = (e) => {
        setFilterGrade(e.target.value);
    };

    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('asc');
        }
    };

    const filteredStudents = students
        .filter(student => {
            // Apply search filter
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                return student.name.toLowerCase().includes(searchLower) || 
                       (student.email && student.email.toLowerCase().includes(searchLower));
            }
            return true;
        })
        .filter(student => {
            // Apply grade filter
            if (filterGrade) {
                return student.grade_level === filterGrade;
            }
            return true;
        })
        .sort((a, b) => {
            // Apply sorting
            let comparison = 0;
            if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortBy === 'id') {
                comparison = a.id - b.id;
            } else if (sortBy === 'grade') {
                comparison = a.grade_level?.localeCompare(b.grade_level) || 0;
            }
            
            return sortDirection === 'asc' ? comparison : -comparison;
        });

    // Generate performance data (in a real app, this would come from the backend)
    const getPerformanceData = (student) => {
        // This is just a placeholder - in a real app, you'd calculate this from actual grades
        const randomPerformance = Math.floor(Math.random() * 30) + 70; // Random number between 70-99
        let color = 'green';
        if (randomPerformance < 80) color = 'yellow';
        if (randomPerformance < 75) color = 'red';
        
        return {
            percentage: randomPerformance,
            color: color
        };
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#1e5091]/10 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                    <UserGroupIcon className="h-5 w-5 mr-2" />
                    My Students
                </h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-48 pl-9 pr-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5091]"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-1 rounded-md hover:bg-gray-100"
                    >
                        <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
            </div>
            
            {showFilters && (
                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Class</label>
                            <select
                                className="w-full sm:w-auto px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5091]"
                                value={selectedClass}
                                onChange={handleClassChange}
                            >
                                {classes.map(classItem => (
                                    <option key={classItem.id} value={classItem.id}>
                                        {classItem.name} ({classItem.grade_level}-{classItem.section})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Grade Level</label>
                            <select
                                className="w-full sm:w-auto px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e5091]"
                                value={filterGrade}
                                onChange={handleFilterGrade}
                            >
                                <option value="">All Grades</option>
                                <option value="10">Grade 10</option>
                                <option value="11">Grade 11</option>
                                <option value="12">Grade 12</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th 
                                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => toggleSort('name')}
                                >
                                    <div className="flex items-center">
                                        Name
                                        {sortBy === 'name' && (
                                            <ChevronDownIcon 
                                                className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                                            />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => toggleSort('id')}
                                >
                                    <div className="flex items-center">
                                        ID
                                        {sortBy === 'id' && (
                                            <ChevronDownIcon 
                                                className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                                            />
                                        )}
                                    </div>
                                </th>
                                <th 
                                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => toggleSort('grade')}
                                >
                                    <div className="flex items-center">
                                        Grade
                                        {sortBy === 'grade' && (
                                            <ChevronDownIcon 
                                                className={`h-4 w-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} 
                                            />
                                        )}
                                    </div>
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Performance
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map(student => {
                                    const performance = getPerformanceData(student);
                                    return (
                                        <tr key={student.id}>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-[#1e5091]/20 flex items-center justify-center text-[#1e5091] font-medium">
                                                        {student.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                        <div className="text-xs text-gray-500">{student.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                                                STD-{String(student.id).padStart(3, '0')}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-600">
                                                {student.grade_level || 'N/A'}
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                                        <div 
                                                            className={`bg-${performance.color}-500 h-2.5 rounded-full`} 
                                                            style={{ width: `${performance.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="ml-2 text-xs font-medium text-gray-600">{performance.percentage}%</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 whitespace-nowrap text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <Link 
                                                        href={route('students.show', student.id)}
                                                        className="text-[#1e5091] hover:text-[#ffb81c]"
                                                    >
                                                        View
                                                    </Link>
                                                    <button 
                                                        className="text-[#1e5091] hover:text-[#ffb81c]"
                                                        onClick={() => window.location.href = route('students.grades', student.id)}
                                                    >
                                                        Grades
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-3 py-8 text-center text-sm text-gray-500">
                                        <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                        <p>No students found</p>
                                        <p className="text-xs mt-1">
                                            {searchTerm ? 'Try a different search term or clear filters' : 'This class has no students enrolled'}
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
