import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { PlusIcon, PencilIcon, TrashIcon, UserPlusIcon, UserIcon, AcademicCapIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

export default function GradesTab({ grades, teachers, students }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isStudentsModalOpen, setIsStudentsModalOpen] = useState(false);
    const [currentGrade, setCurrentGrade] = useState(null);
    const [availableStudents, setAvailableStudents] = useState([]);
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        grade_level: '',
        section: '',
        teacher_id: '',
        max_students: 40,
        academic_year: new Date().getFullYear().toString(),
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
    });
    
    const openAddModal = () => {
        reset();
        setIsAddModalOpen(true);
    };
    
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        reset();
    };
    
    const openEditModal = (grade) => {
        setCurrentGrade(grade);
        setData({
            name: grade.name,
            grade_level: grade.grade_level,
            section: grade.section || '',
            teacher_id: grade.teacher_id || '',
            max_students: grade.max_students || 40,
            academic_year: grade.academic_year || new Date().getFullYear().toString(),
            start_date: grade.start_date || new Date().toISOString().split('T')[0],
            end_date: grade.end_date || '',
        });
        setIsEditModalOpen(true);
    };
    
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentGrade(null);
        reset();
    };
    
    const openStudentsModal = async (grade) => {
        setCurrentGrade(grade);
        setIsLoading(true);
        
        try {
            // Get enrolled students
            const enrolledResponse = await axios.get(`/classes/${grade.id}/students`);
            setEnrolledStudents(enrolledResponse.data);
            
            // Get available students (not enrolled in this class)
            const availableResponse = await axios.get(`/classes/${grade.id}/available-students`);
            setAvailableStudents(availableResponse.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setIsLoading(false);
            setIsStudentsModalOpen(true);
        }
    };
    
    const closeStudentsModal = () => {
        setIsStudentsModalOpen(false);
        setCurrentGrade(null);
        setAvailableStudents([]);
        setEnrolledStudents([]);
        setSelectedStudents([]);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/classes', {
            onSuccess: () => {
                closeAddModal();
                window.location.reload();
            }
        });
    };
    
    const handleUpdate = (e) => {
        e.preventDefault();
        post(`/classes/${currentGrade.id}`, {
            _method: 'PUT',
            onSuccess: () => {
                closeEditModal();
                window.location.reload();
            }
        });
    };
    
    const handleDelete = (grade) => {
        if (confirm(`Are you sure you want to delete ${grade.name}?`)) {
            post(`/classes/${grade.id}`, {
                _method: 'DELETE',
                onSuccess: () => {
                    window.location.reload();
                }
            });
        }
    };
    
    const toggleStudentSelection = (studentId) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter(id => id !== studentId));
        } else {
            setSelectedStudents([...selectedStudents, studentId]);
        }
    };
    
    const addStudentsToClass = async () => {
        if (selectedStudents.length === 0) return;
        
        setIsLoading(true);
        
        try {
            await axios.post(`/classes/${currentGrade.id}/add-students`, {
                student_ids: selectedStudents
            });
            
            // Refresh the student lists
            const enrolledResponse = await axios.get(`/classes/${currentGrade.id}/students`);
            setEnrolledStudents(enrolledResponse.data);
            
            const availableResponse = await axios.get(`/classes/${currentGrade.id}/available-students`);
            setAvailableStudents(availableResponse.data);
            
            setSelectedStudents([]);
        } catch (error) {
            console.error('Error adding students:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const removeStudentFromClass = async (studentId) => {
        if (!confirm('Are you sure you want to remove this student from the class?')) return;
        
        setIsLoading(true);
        
        try {
            await axios.delete(`/classes/${currentGrade.id}/remove-student/${studentId}`);
            
            // Refresh the student lists
            const enrolledResponse = await axios.get(`/classes/${currentGrade.id}/students`);
            setEnrolledStudents(enrolledResponse.data);
            
            const availableResponse = await axios.get(`/classes/${currentGrade.id}/available-students`);
            setAvailableStudents(availableResponse.data);
        } catch (error) {
            console.error('Error removing student:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const filteredGrades = grades ? grades.filter(grade => 
        grade.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        grade.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Manage Grades</h3>
                <button 
                    onClick={openAddModal}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New Grade
                </button>
            </div>
            
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search grades by name or teacher"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Score</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredGrades.map((grade) => (
                            <tr key={grade.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{grade.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.students}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.teacher}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${grade.averageScore >= 85 ? 'bg-green-100 text-green-800' : 
                                            grade.averageScore >= 75 ? 'bg-blue-100 text-blue-800' : 
                                            grade.averageScore >= 65 ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'}`}>
                                            {grade.averageScore}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => openStudentsModal(grade)}
                                        className="text-green-600 hover:text-green-900 mr-3"
                                        title="Manage Students"
                                    >
                                        <UserPlusIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => openEditModal(grade)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                        title="Edit Grade"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete Grade"
                                        onClick={() => handleDelete(grade)}
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Grade Performance Overview</h4>
                <div className="h-80 bg-white p-6 rounded-lg shadow-md">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={filteredGrades}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="averageScore" name="Average Score" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            {/* Add Grade Modal */}
            <Transition appear show={isAddModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeAddModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                                    >
                                        <AcademicCapIcon className="h-5 w-5 mr-2" />
                                        Add New Grade
                                    </Dialog.Title>
                                    
                                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Grade Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                required
                                            />
                                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="grade_level" className="block text-sm font-medium text-gray-700">Grade Level</label>
                                            <input
                                                type="text"
                                                id="grade_level"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.grade_level}
                                                onChange={e => setData('grade_level', e.target.value)}
                                                required
                                                placeholder="e.g. Form 1, Grade 5, etc."
                                            />
                                            {errors.grade_level && <div className="text-red-500 text-xs mt-1">{errors.grade_level}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section (Optional)</label>
                                            <input
                                                type="text"
                                                id="section"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.section}
                                                onChange={e => setData('section', e.target.value)}
                                                placeholder="e.g. A, B, Red, Blue, etc."
                                            />
                                            {errors.section && <div className="text-red-500 text-xs mt-1">{errors.section}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">Teacher (Optional)</label>
                                            <select
                                                id="teacher_id"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.teacher_id}
                                                onChange={e => setData('teacher_id', e.target.value)}
                                            >
                                                <option value="">Select a teacher</option>
                                                {teachers && teachers.map(teacher => (
                                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                ))}
                                            </select>
                                            {errors.teacher_id && <div className="text-red-500 text-xs mt-1">{errors.teacher_id}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="academic_year" className="block text-sm font-medium text-gray-700">Academic Year</label>
                                            <input
                                                type="text"
                                                id="academic_year"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.academic_year}
                                                onChange={e => setData('academic_year', e.target.value)}
                                                required
                                            />
                                            {errors.academic_year && <div className="text-red-500 text-xs mt-1">{errors.academic_year}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                            <input
                                                type="date"
                                                id="start_date"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.start_date}
                                                onChange={e => setData('start_date', e.target.value)}
                                                required
                                            />
                                            {errors.start_date && <div className="text-red-500 text-xs mt-1">{errors.start_date}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                                            <input
                                                type="date"
                                                id="end_date"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.end_date}
                                                onChange={e => setData('end_date', e.target.value)}
                                            />
                                            {errors.end_date && <div className="text-red-500 text-xs mt-1">{errors.end_date}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="max_students" className="block text-sm font-medium text-gray-700">Maximum Students</label>
                                            <input
                                                type="number"
                                                id="max_students"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.max_students}
                                                onChange={e => setData('max_students', e.target.value)}
                                                min="1"
                                            />
                                            {errors.max_students && <div className="text-red-500 text-xs mt-1">{errors.max_students}</div>}
                                        </div>
                                        
                                        <div className="mt-6 flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                onClick={closeAddModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                disabled={processing}
                                            >
                                                {processing ? 'Creating...' : 'Create Grade'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            
            {/* Edit Grade Modal */}
            <Transition appear show={isEditModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                                    >
                                        <PencilIcon className="h-5 w-5 mr-2" />
                                        Edit Grade: {currentGrade?.name}
                                    </Dialog.Title>
                                    
                                    <form onSubmit={handleUpdate} className="mt-4 space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Grade Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                required
                                            />
                                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="grade_level" className="block text-sm font-medium text-gray-700">Grade Level</label>
                                            <input
                                                type="text"
                                                id="grade_level"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.grade_level}
                                                onChange={e => setData('grade_level', e.target.value)}
                                                required
                                                placeholder="e.g. Form 1, Grade 5, etc."
                                            />
                                            {errors.grade_level && <div className="text-red-500 text-xs mt-1">{errors.grade_level}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section (Optional)</label>
                                            <input
                                                type="text"
                                                id="section"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.section}
                                                onChange={e => setData('section', e.target.value)}
                                                placeholder="e.g. A, B, Red, Blue, etc."
                                            />
                                            {errors.section && <div className="text-red-500 text-xs mt-1">{errors.section}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">Teacher (Optional)</label>
                                            <select
                                                id="teacher_id"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.teacher_id}
                                                onChange={e => setData('teacher_id', e.target.value)}
                                            >
                                                <option value="">Select a teacher</option>
                                                {teachers && teachers.map(teacher => (
                                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                ))}
                                            </select>
                                            {errors.teacher_id && <div className="text-red-500 text-xs mt-1">{errors.teacher_id}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="academic_year" className="block text-sm font-medium text-gray-700">Academic Year</label>
                                            <input
                                                type="text"
                                                id="academic_year"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.academic_year}
                                                onChange={e => setData('academic_year', e.target.value)}
                                                required
                                            />
                                            {errors.academic_year && <div className="text-red-500 text-xs mt-1">{errors.academic_year}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                            <input
                                                type="date"
                                                id="start_date"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.start_date}
                                                onChange={e => setData('start_date', e.target.value)}
                                                required
                                            />
                                            {errors.start_date && <div className="text-red-500 text-xs mt-1">{errors.start_date}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                                            <input
                                                type="date"
                                                id="end_date"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.end_date}
                                                onChange={e => setData('end_date', e.target.value)}
                                            />
                                            {errors.end_date && <div className="text-red-500 text-xs mt-1">{errors.end_date}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="max_students" className="block text-sm font-medium text-gray-700">Maximum Students</label>
                                            <input
                                                type="number"
                                                id="max_students"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.max_students}
                                                onChange={e => setData('max_students', e.target.value)}
                                                min="1"
                                            />
                                            {errors.max_students && <div className="text-red-500 text-xs mt-1">{errors.max_students}</div>}
                                        </div>
                                        
                                        <div className="mt-6 flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                onClick={closeEditModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                disabled={processing}
                                            >
                                                {processing ? 'Updating...' : 'Update Grade'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            
            {/* Manage Students Modal */}
            <Transition appear show={isStudentsModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeStudentsModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                                    >
                                        <UserIcon className="h-5 w-5 mr-2" />
                                        Manage Students: {currentGrade?.name}
                                    </Dialog.Title>
                                    
                                    <div className="mt-4">
                                        <ul>
                                            {availableStudents.map((student) => (
                                                <li key={student.id} className="py-2">
                                                    <div className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`student-${student.id}`}
                                                            checked={selectedStudents.includes(student.id)}
                                                            onChange={() => toggleStudentSelection(student.id)}
                                                        />
                                                        <label htmlFor={`student-${student.id}`} className="ml-2">{student.name}</label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={closeStudentsModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={addStudentsToClass}
                                        >
                                            Add Students
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
