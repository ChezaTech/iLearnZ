import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { 
    BookOpenIcon, 
    PlusIcon, 
    PencilIcon, 
    TrashIcon, 
    MagnifyingGlassIcon,
    DocumentTextIcon,
    LinkIcon
} from '@heroicons/react/24/outline';

export default function SubjectsTab({ classData, availableTeachers, books }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isReadingMaterialModalOpen, setIsReadingMaterialModalOpen] = useState(false);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [subjects, setSubjects] = useState(classData.subjects || []);
    const [selectedBooks, setSelectedBooks] = useState([]);

    // Form for adding/editing subjects
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
        description: '',
        teacher_id: '',
        schedule: '',
        notes: '',
    });

    // Form for adding reading materials
    const readingMaterialForm = useForm({
        title: '',
        description: '',
        url: '',
        file: null,
        type: 'link', // 'link', 'file', 'book'
        author: '',
        publisher: '',
        publication_year: '',
        book_ids: [],
    });

    const openAddModal = () => {
        reset();
        setSelectedBooks([]);
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        reset();
        setSelectedBooks([]);
    };

    const openEditModal = (subject) => {
        setCurrentSubject(subject);
        setData({
            name: subject.name,
            code: subject.code,
            description: subject.description || '',
            teacher_id: subject.teacher_id || '',
            schedule: subject.schedule || '',
            notes: subject.notes || '',
        });
        setSelectedBooks(subject.books.map(book => book.id));
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentSubject(null);
        reset();
        setSelectedBooks([]);
    };

    const openReadingMaterialModal = (subject) => {
        setCurrentSubject(subject);
        readingMaterialForm.reset();
        setIsReadingMaterialModalOpen(true);
    };

    const closeReadingMaterialModal = () => {
        setIsReadingMaterialModalOpen(false);
        setCurrentSubject(null);
        readingMaterialForm.reset();
    };

    const toggleBookSelection = (bookId) => {
        if (selectedBooks.includes(bookId)) {
            setSelectedBooks(selectedBooks.filter(id => id !== bookId));
        } else {
            setSelectedBooks([...selectedBooks, bookId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Add book_ids to the form data
        const formData = {
            ...data,
            book_ids: selectedBooks
        };
        
        post(`/classes/${classData.id}/subjects`, {
            onSuccess: async () => {
                closeAddModal();
                // Refresh subjects list
                try {
                    const response = await axios.get(`/classes/${classData.id}/subjects`);
                    setSubjects(response.data);
                } catch (error) {
                    console.error('Error fetching subjects:', error);
                } finally {
                    setIsLoading(false);
                }
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Add book_ids to the form data
        const formData = {
            ...data,
            book_ids: selectedBooks,
            _method: 'PUT'
        };
        
        post(`/classes/${classData.id}/subjects/${currentSubject.id}`, formData, {
            onSuccess: async () => {
                closeEditModal();
                // Refresh subjects list
                try {
                    const response = await axios.get(`/classes/${classData.id}/subjects`);
                    setSubjects(response.data);
                } catch (error) {
                    console.error('Error fetching subjects:', error);
                } finally {
                    setIsLoading(false);
                }
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    const handleDelete = (subject) => {
        if (confirm(`Are you sure you want to delete ${subject.name}?`)) {
            setIsLoading(true);
            
            post(`/classes/${classData.id}/subjects/${subject.id}`, {
                _method: 'DELETE',
                onSuccess: async () => {
                    // Refresh subjects list
                    try {
                        const response = await axios.get(`/classes/${classData.id}/subjects`);
                        setSubjects(response.data);
                    } catch (error) {
                        console.error('Error fetching subjects:', error);
                    } finally {
                        setIsLoading(false);
                    }
                },
                onError: () => {
                    setIsLoading(false);
                }
            });
        }
    };

    const handleReadingMaterialSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', readingMaterialForm.data.title);
        formData.append('description', readingMaterialForm.data.description);
        formData.append('type', readingMaterialForm.data.type);
        
        if (readingMaterialForm.data.type === 'link') {
            formData.append('url', readingMaterialForm.data.url);
        } else if (readingMaterialForm.data.type === 'file') {
            formData.append('file', readingMaterialForm.data.file);
        } else if (readingMaterialForm.data.type === 'book') {
            readingMaterialForm.data.book_ids.forEach(bookId => {
                formData.append('book_ids[]', bookId);
            });
        }
        
        if (readingMaterialForm.data.author) {
            formData.append('author', readingMaterialForm.data.author);
        }
        
        if (readingMaterialForm.data.publisher) {
            formData.append('publisher', readingMaterialForm.data.publisher);
        }
        
        if (readingMaterialForm.data.publication_year) {
            formData.append('publication_year', readingMaterialForm.data.publication_year);
        }
        
        axios.post(`/classes/${classData.id}/subjects/${currentSubject.id}/reading-materials`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            closeReadingMaterialModal();
            // Refresh subjects list
            return axios.get(`/classes/${classData.id}/subjects`);
        })
        .then(response => {
            setSubjects(response.data);
        })
        .catch(error => {
            console.error('Error adding reading material:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const filteredSubjects = subjects.filter(subject => 
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        subject.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Subjects</h3>
                <button 
                    onClick={openAddModal}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                    disabled={isLoading}
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Subject
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
                        placeholder="Search subjects by name or code"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Books</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSubjects.length > 0 ? (
                            filteredSubjects.map((subject) => (
                                <tr key={subject.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{subject.name}</div>
                                        {subject.description && (
                                            <div className="text-xs text-gray-500 truncate max-w-xs">{subject.description}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subject.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {subject.teacher ? subject.teacher.name : 'Not Assigned'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {subject.books && subject.books.length > 0 ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {subject.books.length} book(s)
                                            </span>
                                        ) : (
                                            'None'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {subject.schedule || 'Not Set'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => openReadingMaterialModal(subject)}
                                            className="text-green-600 hover:text-green-900 mr-3"
                                            title="Add Reading Material"
                                            disabled={isLoading}
                                        >
                                            <DocumentTextIcon className="h-5 w-5" />
                                        </button>
                                        <button 
                                            onClick={() => openEditModal(subject)}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                            title="Edit Subject"
                                            disabled={isLoading}
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button 
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete Subject"
                                            onClick={() => handleDelete(subject)}
                                            disabled={isLoading}
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                    No subjects assigned to this class yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Subject Modal */}
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
                                        <BookOpenIcon className="h-5 w-5 mr-2" />
                                        Add New Subject
                                    </Dialog.Title>
                                    
                                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subject Name</label>
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
                                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Subject Code</label>
                                            <input
                                                type="text"
                                                id="code"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.code}
                                                onChange={e => setData('code', e.target.value)}
                                                required
                                                placeholder="e.g. MATH101, SCI202, etc."
                                            />
                                            {errors.code && <div className="text-red-500 text-xs mt-1">{errors.code}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea
                                                id="description"
                                                rows={3}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.description}
                                                onChange={e => setData('description', e.target.value)}
                                            />
                                            {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">Assign Teacher</label>
                                            <select
                                                id="teacher_id"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.teacher_id}
                                                onChange={e => setData('teacher_id', e.target.value)}
                                            >
                                                <option value="">Select a teacher</option>
                                                {availableTeachers.map(teacher => (
                                                    <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                                                ))}
                                            </select>
                                            {errors.teacher_id && <div className="text-red-500 text-xs mt-1">{errors.teacher_id}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Schedule</label>
                                            <input
                                                type="text"
                                                id="schedule"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.schedule}
                                                onChange={e => setData('schedule', e.target.value)}
                                                placeholder="e.g. Mon, Wed, Fri 10:00 AM - 11:00 AM"
                                            />
                                            {errors.schedule && <div className="text-red-500 text-xs mt-1">{errors.schedule}</div>}
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                                            <textarea
                                                id="notes"
                                                rows={2}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                value={data.notes}
                                                onChange={e => setData('notes', e.target.value)}
                                            />
                                            {errors.notes && <div className="text-red-500 text-xs mt-1">{errors.notes}</div>}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Books</label>
                                            <div className="max-h-40 overflow-y-auto border rounded-md">
                                                {books.length > 0 ? (
                                                    books.map((book) => (
                                                        <div 
                                                            key={book.id} 
                                                            className={`flex items-center p-2 border-b cursor-pointer hover:bg-gray-50 ${
                                                                selectedBooks.includes(book.id) ? 'bg-blue-50' : ''
                                                            }`}
                                                            onClick={() => toggleBookSelection(book.id)}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                                checked={selectedBooks.includes(book.id)}
                                                                onChange={() => {}}
                                                            />
                                                            <div className="ml-3">
                                                                <p className="text-sm font-medium text-gray-900">{book.title}</p>
                                                                <p className="text-xs text-gray-500">{book.author} - {book.category}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-gray-500">
                                                        No books available.
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
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                disabled={processing || isLoading}
                                            >
                                                {processing || isLoading ? 'Saving...' : 'Save Subject'}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
