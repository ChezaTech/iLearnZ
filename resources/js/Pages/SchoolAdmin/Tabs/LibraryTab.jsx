import React, { useState } from 'react';
import { 
    MagnifyingGlassIcon, 
    PlusIcon, 
    PencilIcon, 
    TrashIcon 
} from '@heroicons/react/24/outline';
import { 
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

export default function LibraryTab({ books }) {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredBooks = books ? books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">School Library</h3>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
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
                                        ${book.status === 'Available' ? 'bg-green-100 text-green-800' : 
                                        book.status === 'Limited' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-red-100 text-red-800'}`}>
                                        {book.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.copies}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
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
        </div>
    );
}
