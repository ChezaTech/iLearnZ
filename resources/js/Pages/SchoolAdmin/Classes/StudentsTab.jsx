import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { 
    UserPlusIcon, 
    UserMinusIcon, 
    MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

export default function StudentsTab({ classData, availableStudents }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState(classData.students || []);
    const [availableStudentsList, setAvailableStudentsList] = useState(availableStudents || []);

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setSelectedStudents([]);
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
            await axios.post(`/classes/${classData.id}/add-students`, {
                student_ids: selectedStudents
            });
            
            // Refresh the student lists
            const enrolledResponse = await axios.get(`/classes/${classData.id}/students`);
            setEnrolledStudents(enrolledResponse.data);
            
            const availableResponse = await axios.get(`/classes/${classData.id}/available-students`);
            setAvailableStudentsList(availableResponse.data);
            
            setSelectedStudents([]);
            closeAddModal();
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
            await axios.delete(`/classes/${classData.id}/remove-student/${studentId}`);
            
            // Refresh the student lists
            const enrolledResponse = await axios.get(`/classes/${classData.id}/students`);
            setEnrolledStudents(enrolledResponse.data);
            
            const availableResponse = await axios.get(`/classes/${classData.id}/available-students`);
            setAvailableStudentsList(availableResponse.data);
        } catch (error) {
            console.error('Error removing student:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredStudents = enrolledStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Students Enrolled</h3>
                <button 
                    onClick={openAddModal}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    disabled={isLoading}
                >
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    Add Students
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
                        placeholder="Search students by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => removeStudentFromClass(student.id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Remove Student"
                                            disabled={isLoading}
                                        >
                                            <UserMinusIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    No students enrolled in this class yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Students Modal */}
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
                                        <UserPlusIcon className="h-5 w-5 mr-2" />
                                        Add Students to Class
                                    </Dialog.Title>
                                    
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 mb-4">
                                            Select students to add to this class:
                                        </p>
                                        
                                        <div className="max-h-60 overflow-y-auto border rounded-md">
                                            {availableStudentsList.length > 0 ? (
                                                availableStudentsList.map((student) => (
                                                    <div 
                                                        key={student.id} 
                                                        className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${
                                                            selectedStudents.includes(student.id) ? 'bg-blue-50' : ''
                                                        }`}
                                                        onClick={() => toggleStudentSelection(student.id)}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            checked={selectedStudents.includes(student.id)}
                                                            onChange={() => {}}
                                                        />
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900">{student.name}</p>
                                                            <p className="text-sm text-gray-500">{student.email}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-4 text-center text-gray-500">
                                                    No available students to add.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={closeAddModal}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            onClick={addStudentsToClass}
                                            disabled={selectedStudents.length === 0 || isLoading}
                                        >
                                            {isLoading ? 'Adding...' : 'Add Selected Students'}
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
