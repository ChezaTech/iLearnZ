import React, { useState, useEffect } from 'react';
import { 
    MagnifyingGlassIcon, 
    PlusIcon, 
    PencilIcon, 
    TrashIcon 
} from '@heroicons/react/24/outline';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import { useForm } from '@inertiajs/react';

export default function LibraryTab({ books }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        author: '',
        isbn: '',
        publication_year: '',
        category: '',
        copies: 1,
        school_id: null
    });
    
    useEffect(() => {
        // Get the current user to determine the school ID
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('/user');
                setData('school_id', response.data.school_id);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };
        
        fetchCurrentUser();
    }, []);
    
    const filteredBooks = books ? books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const openAddModal = () => {
        reset();
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        reset();
    };

    const openEditModal = (book) => {
        setEditingBook(book);
        setData({
            title: book.title,
            author: book.author,
            isbn: book.isbn || '',
            publication_year: book.publication_year || '',
            category: book.category || '',
            copies: book.copies || 1,
            school_id: book.school_id
        });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingBook(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/books', {
            onSuccess: () => {
                closeAddModal();
                window.location.reload();
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        put(`/books/${editingBook.id}`, {
            onSuccess: () => {
                closeEditModal();
                window.location.reload();
            }
        });
    };

    const handleDelete = (bookId) => {
        if (confirm('Are you sure you want to delete this book?')) {
            axios.delete(`/books/${bookId}`)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error deleting book:', error);
                    alert('Failed to delete book. Please try again.');
                });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">School Library</h3>
                <button 
                    onClick={openAddModal}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add New Book
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
                        placeholder="Search books by title, author, or category"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Copies</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBooks.map((book) => (
                            <tr key={book.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${book.is_borrowed ? 'bg-red-100 text-red-800' : 
                                        book.copies <= 2 ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-green-100 text-green-800'}`}>
                                        {book.is_borrowed ? 'Borrowed' : book.copies <= 2 ? 'Limited' : 'Available'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.copies}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button 
                                        onClick={() => openEditModal(book)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(book.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Books by Category</h4>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={(() => {
                                        const categories = {};
                                        filteredBooks.forEach(book => {
                                            if (categories[book.category]) {
                                                categories[book.category]++;
                                            } else {
                                                categories[book.category] = 1;
                                            }
                                        });
                                        return Object.keys(categories).map(key => ({
                                            name: key,
                                            value: categories[key]
                                        }));
                                    })()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={60}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    <Cell fill="#0088FE" />
                                    <Cell fill="#00C49F" />
                                    <Cell fill="#FFBB28" />
                                    <Cell fill="#FF8042" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Borrows</h4>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-3">
                            <div className="text-sm font-medium text-gray-900">Science Encyclopedia</div>
                            <div className="text-sm text-gray-500">Borrowed by: John Mulenga (Grade 5)</div>
                            <div className="text-xs text-gray-400">Due date: 2025-04-01</div>
                        </li>
                        <li className="py-3">
                            <div className="text-sm font-medium text-gray-900">English Grammar Guide</div>
                            <div className="text-sm text-gray-500">Borrowed by: Mary Zulu (Grade 4)</div>
                            <div className="text-xs text-gray-400">Due date: 2025-03-25</div>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Overdue Books</h4>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-3">
                            <div className="text-sm font-medium text-gray-900">History of Zambia</div>
                            <div className="text-sm text-gray-500">Borrowed by: David Phiri (Grade 5)</div>
                            <div className="text-xs text-red-500">Due date: 2025-03-10 (Overdue)</div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Add Book Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Book</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        required
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>
                                
                                <div>
                                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                                    <input
                                        type="text"
                                        id="author"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.author}
                                        onChange={e => setData('author', e.target.value)}
                                        required
                                    />
                                    {errors.author && <div className="text-red-500 text-xs mt-1">{errors.author}</div>}
                                </div>
                                
                                <div>
                                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
                                    <input
                                        type="text"
                                        id="isbn"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.isbn}
                                        onChange={e => setData('isbn', e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="publication_year" className="block text-sm font-medium text-gray-700">Publication Year</label>
                                    <input
                                        type="number"
                                        id="publication_year"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.publication_year}
                                        onChange={e => setData('publication_year', e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="copies" className="block text-sm font-medium text-gray-700">Number of Copies</label>
                                    <input
                                        type="number"
                                        id="copies"
                                        min="1"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.copies}
                                        onChange={e => setData('copies', e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {processing ? 'Adding...' : 'Add Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            {/* Edit Book Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Book</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        id="edit-title"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        required
                                    />
                                    {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                </div>
                                
                                <div>
                                    <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700">Author</label>
                                    <input
                                        type="text"
                                        id="edit-author"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.author}
                                        onChange={e => setData('author', e.target.value)}
                                        required
                                    />
                                    {errors.author && <div className="text-red-500 text-xs mt-1">{errors.author}</div>}
                                </div>
                                
                                <div>
                                    <label htmlFor="edit-isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
                                    <input
                                        type="text"
                                        id="edit-isbn"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.isbn}
                                        onChange={e => setData('isbn', e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="edit-publication_year" className="block text-sm font-medium text-gray-700">Publication Year</label>
                                    <input
                                        type="number"
                                        id="edit-publication_year"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.publication_year}
                                        onChange={e => setData('publication_year', e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        type="text"
                                        id="edit-category"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="edit-copies" className="block text-sm font-medium text-gray-700">Number of Copies</label>
                                    <input
                                        type="number"
                                        id="edit-copies"
                                        min="1"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        value={data.copies}
                                        onChange={e => setData('copies', e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {processing ? 'Updating...' : 'Update Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
