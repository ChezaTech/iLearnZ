import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    PlusIcon, 
    PencilIcon, 
    TrashIcon, 
    ArrowLeftIcon, 
    EyeIcon 
} from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';

export default function Index({ auth, class: classData, subjects, teachers, books }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter subjects based on search term
    const filteredSubjects = subjects.filter(subject => 
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (subject.teacher && subject.teacher.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditModal = (subject) => {
        setCurrentSubject(subject);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentSubject(null);
    };

    // Function to navigate to subject details
    const navigateToSubject = (classId, subjectId) => {
        window.location.href = route('classes.subjects.show', [classId, subjectId]);
    };

    return (
        <AuthenticatedLayout>
            <>
                <Head title={`Subjects for ${classData.name}`} />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Subjects for {classData.name}
                            </h2>
                            <div className="flex space-x-4">
                                <Link
                                    href={route('classes.show', classData.id)}
                                    className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300"
                                >
                                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                    Back to Class
                                </Link>
                                <button
                                    onClick={openAddModal}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Add Subject
                                </button>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                {/* Search Bar */}
                                <div className="mb-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Search subjects by name or teacher..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Subjects Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books</th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredSubjects.map((subject) => (
                                                <tr key={subject.id} style={{cursor: 'pointer'}} onClick={() => navigateToSubject(classData.id, subject.id)}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link
                                                            href={route('classes.subjects.show', [classData.id, subject.id])}
                                                            className="text-sm font-medium text-blue-600 hover:text-blue-900 flex items-center"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            {subject.name} <EyeIcon className="h-4 w-4 ml-1" />
                                                        </Link>
                                                        <div className="text-sm text-gray-500">{subject.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {subject.teacher ? subject.teacher.name : 'Not Assigned'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{subject.schedule || 'Not Scheduled'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {subject.books && subject.books.length > 0 
                                                                ? subject.books.map(book => book.title).join(', ') 
                                                                : 'No books assigned'}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-4 flex items-center whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('classes.subjects.show', [classData.id, subject.id])}
                                                            className="text-blue-600 hover:text-blue-900 mr-2"
                                                            title="View Subject"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openEditModal(subject);
                                                            }}
                                                            className="text-blue-600 hover:text-blue-900 mr-2"
                                                            title="Edit Subject"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </button>
                                                        <Link
                                                            href={route('classes.subjects.destroy', [classData.id, subject.id])}
                                                            method="delete"
                                                            as="button"
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Delete Subject"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredSubjects.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                        No subjects found. Add a new subject to get started.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Subject Modal */}
                <Transition show={isAddModalOpen} as={React.Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeAddModal}>
                        <div className="min-h-screen px-4 text-center">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Add New Subject
                                </Dialog.Title>
                                <div className="mt-4">
                                    <form>
                                        {/* Form fields for adding a subject */}
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subject Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    id="description"
                                                    name="description"
                                                    rows="3"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                ></textarea>
                                            </div>
                                            <div>
                                                <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">Teacher</label>
                                                <select
                                                    id="teacher_id"
                                                    name="teacher_id"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">Select a teacher</option>
                                                    {teachers.map((teacher) => (
                                                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Schedule</label>
                                                <input
                                                    type="text"
                                                    id="schedule"
                                                    name="schedule"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="e.g., Mon, Wed, Fri 10:00 AM - 11:30 AM"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="books" className="block text-sm font-medium text-gray-700">Books</label>
                                                <select
                                                    id="books"
                                                    name="books"
                                                    multiple
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    {books.map((book) => (
                                                        <option key={book.id} value={book.id}>{book.title} by {book.author}</option>
                                                    ))}
                                                </select>
                                                <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple books</p>
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
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            >
                                                Add Subject
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* Edit Subject Modal */}
                <Transition show={isEditModalOpen} as={React.Fragment}>
                    <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeEditModal}>
                        <div className="min-h-screen px-4 text-center">
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Edit Subject
                                </Dialog.Title>
                                <div className="mt-4">
                                    <form>
                                        {/* Form fields for editing a subject */}
                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Subject Name</label>
                                                <input
                                                    type="text"
                                                    id="edit-name"
                                                    name="name"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    defaultValue={currentSubject?.name}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                                                <textarea
                                                    id="edit-description"
                                                    name="description"
                                                    rows="3"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    defaultValue={currentSubject?.description}
                                                ></textarea>
                                            </div>
                                            <div>
                                                <label htmlFor="edit-teacher_id" className="block text-sm font-medium text-gray-700">Teacher</label>
                                                <select
                                                    id="edit-teacher_id"
                                                    name="teacher_id"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    defaultValue={currentSubject?.teacher_id}
                                                >
                                                    <option value="">Select a teacher</option>
                                                    {teachers.map((teacher) => (
                                                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="edit-schedule" className="block text-sm font-medium text-gray-700">Schedule</label>
                                                <input
                                                    type="text"
                                                    id="edit-schedule"
                                                    name="schedule"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="e.g., Mon, Wed, Fri 10:00 AM - 11:30 AM"
                                                    defaultValue={currentSubject?.schedule}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="edit-books" className="block text-sm font-medium text-gray-700">Books</label>
                                                <select
                                                    id="edit-books"
                                                    name="books"
                                                    multiple
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    {books.map((book) => (
                                                        <option 
                                                            key={book.id} 
                                                            value={book.id}
                                                            selected={currentSubject?.books?.some(b => b.id === book.id)}
                                                        >
                                                            {book.title} by {book.author}
                                                        </option>
                                                    ))}
                                                </select>
                                                <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple books</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                onClick={closeEditModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            >
                                                Update Subject
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        </AuthenticatedLayout>
    );
}
