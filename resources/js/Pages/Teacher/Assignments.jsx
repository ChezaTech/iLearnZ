import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeftIcon, 
    PlusIcon, 
    ClipboardDocumentCheckIcon,
    ClockIcon,
    UserGroupIcon,
    DocumentTextIcon,
    TrashIcon,
    PencilIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Assignments({ auth, classData, subject, assignments }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        instructions: '',
        due_date: '',
        available_from: new Date().toISOString().split('T')[0], // Today's date
        total_points: 100,
        is_graded: true,
        allow_late_submissions: false,
        file: null,
    });

    const handleFileChange = (e) => {
        setData('file', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingAssignment) {
            // Handle update
            post(route('teacher.class.assignments.update', { 
                classId: classData.id, 
                subjectId: subject.id,
                assignmentId: editingAssignment.id 
            }), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setShowCreateModal(false);
                    setEditingAssignment(null);
                },
            });
        } else {
            // Handle create
            post(route('teacher.class.assignments.create', { 
                classId: classData.id, 
                subjectId: subject.id 
            }), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setShowCreateModal(false);
                },
            });
        }
    };

    const openEditModal = (assignment) => {
        setEditingAssignment(assignment);
        setData({
            title: assignment.title,
            description: assignment.description || '',
            instructions: assignment.instructions || '',
            due_date: assignment.due_date ? new Date(assignment.due_date).toISOString().split('T')[0] : '',
            available_from: assignment.available_from ? new Date(assignment.available_from).toISOString().split('T')[0] : '',
            total_points: assignment.total_points || 100,
            is_graded: assignment.is_graded || false,
            allow_late_submissions: assignment.allow_late_submissions || false,
            file: null, // Can't pre-fill file input
        });
        setShowCreateModal(true);
    };

    const handleDelete = (assignmentId) => {
        if (confirm('Are you sure you want to delete this assignment?')) {
            // Implement delete functionality
        }
    };

    // Filter assignments based on search and status
    const filteredAssignments = assignments.filter(assignment => {
        const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (assignment.description && assignment.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        if (filterStatus === 'all') return matchesSearch;
        
        const now = new Date();
        const dueDate = assignment.due_date ? new Date(assignment.due_date) : null;
        
        if (filterStatus === 'active' && dueDate && dueDate >= now) return matchesSearch;
        if (filterStatus === 'past' && dueDate && dueDate < now) return matchesSearch;
        if (filterStatus === 'needs_grading' && assignment.submissions_count > 0) return matchesSearch;
        
        return false;
    });

    // Get counts for the sidebar
    const assignmentCounts = {
        all: assignments.length,
        active: assignments.filter(a => {
            const dueDate = a.due_date ? new Date(a.due_date) : null;
            return dueDate && dueDate >= new Date();
        }).length,
        past: assignments.filter(a => {
            const dueDate = a.due_date ? new Date(a.due_date) : null;
            return dueDate && dueDate < new Date();
        }).length,
        needs_grading: assignments.filter(a => a.submissions_count > 0).length,
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <Link href={route('teacher.class.show', classData.id)} className="mr-4">
                        <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                        {subject.name} Assignments - {classData.name}
                    </h2>
                </div>
            }
        >
            <Head title={`${subject.name} Assignments - ${classData.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="md:w-1/4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Assignment Status</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('all')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'all' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                                                All Assignments
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {assignmentCounts.all}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('active')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'active' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <ClockIcon className="h-5 w-5 mr-2" />
                                                Active
                                                <span className="ml-auto bg-green-200 text-green-800 rounded-full px-2 py-0.5 text-xs">
                                                    {assignmentCounts.active}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('needs_grading')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'needs_grading' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                                Needs Grading
                                                <span className="ml-auto bg-yellow-200 text-yellow-800 rounded-full px-2 py-0.5 text-xs">
                                                    {assignmentCounts.needs_grading}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('past')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'past' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <DocumentTextIcon className="h-5 w-5 mr-2" />
                                                Past Due
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {assignmentCounts.past}
                                                </span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:w-3/4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">
                                            {filterStatus === 'all' ? 'All Assignments' : 
                                             filterStatus === 'active' ? 'Active Assignments' :
                                             filterStatus === 'needs_grading' ? 'Assignments Needing Grading' : 'Past Assignments'}
                                        </h3>
                                        <button
                                            onClick={() => {
                                                setEditingAssignment(null);
                                                reset();
                                                setShowCreateModal(true);
                                            }}
                                            className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-md text-sm font-medium hover:bg-[#1e5091]/90"
                                        >
                                            <PlusIcon className="h-5 w-5 mr-2" />
                                            Create Assignment
                                        </button>
                                    </div>

                                    {/* Search */}
                                    <div className="mb-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10"
                                                placeholder="Search assignments..."
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assignments List */}
                                    {filteredAssignments.length > 0 ? (
                                        <div className="space-y-4">
                                            {filteredAssignments.map((assignment) => {
                                                // Determine status and style based on due date and submissions
                                                const now = new Date();
                                                const dueDate = assignment.due_date ? new Date(assignment.due_date) : null;
                                                
                                                let status = 'active';
                                                let bgColor = 'blue';
                                                let statusText = 'Active';
                                                
                                                if (dueDate && dueDate < now) {
                                                    status = 'past';
                                                    bgColor = 'gray';
                                                    statusText = 'Past Due';
                                                } else if (assignment.submissions_count && assignment.submissions_count > 0) {
                                                    status = 'needs_grading';
                                                    bgColor = 'yellow';
                                                    statusText = `Needs Grading (${assignment.submissions_count})`;
                                                }
                                                
                                                // Format dates
                                                const formattedDueDate = dueDate 
                                                    ? dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                    : 'No due date';
                                                
                                                const availableFrom = assignment.available_from 
                                                    ? new Date(assignment.available_from).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                    : 'Immediately';
                                                
                                                return (
                                                    <div key={assignment.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                                        <div className="p-4">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex items-start">
                                                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-${bgColor}-100 flex items-center justify-center text-${bgColor}-600`}>
                                                                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <h4 className="text-lg font-medium text-gray-900">{assignment.title}</h4>
                                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${bgColor}-100 text-${bgColor}-800`}>
                                                                                {statusText}
                                                                            </span>
                                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                                {assignment.total_points} points
                                                                            </span>
                                                                            {assignment.is_graded && (
                                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                                    Graded
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => openEditModal(assignment)}
                                                                        className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                    >
                                                                        <PencilIcon className="h-5 w-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(assignment.id)}
                                                                        className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600"
                                                                    >
                                                                        <TrashIcon className="h-5 w-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            
                                                            {assignment.description && (
                                                                <p className="mt-2 text-sm text-gray-600">{assignment.description}</p>
                                                            )}
                                                            
                                                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                                                                <div className="flex items-center">
                                                                    <ClockIcon className="h-4 w-4 mr-1" />
                                                                    <span>Due: {formattedDueDate}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <UserGroupIcon className="h-4 w-4 mr-1" />
                                                                    <span>
                                                                        {assignment.submissions_count || 0} submissions / 
                                                                        {assignment.graded_count || 0} graded
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="mt-4 flex justify-end">
                                                                <Link
                                                                    href={route('teacher.class.assignments.show', { 
                                                                        classId: classData.id, 
                                                                        subjectId: subject.id,
                                                                        assignmentId: assignment.id
                                                                    })}
                                                                    className="inline-flex items-center px-3 py-1.5 bg-[#1e5091] text-white rounded-md text-sm hover:bg-[#1e5091]/90"
                                                                >
                                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                                    {status === 'needs_grading' ? 'Grade Submissions' : 'View Details'}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <ClipboardDocumentCheckIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments found</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {searchQuery 
                                                    ? `No results for "${searchQuery}". Try a different search term.` 
                                                    : `Get started by creating your first assignment.`}
                                            </p>
                                            <div className="mt-6">
                                                <button
                                                    onClick={() => {
                                                        setEditingAssignment(null);
                                                        reset();
                                                        setShowCreateModal(true);
                                                    }}
                                                    className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-md text-sm font-medium hover:bg-[#1e5091]/90"
                                                >
                                                    <PlusIcon className="h-5 w-5 mr-2" />
                                                    Create Assignment
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Assignment Modal */}
            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingAssignment ? 'Edit Assignment' : 'Create Assignment'}
                    </h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData('description', e.target.value)}
                                rows={2}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="instructions" value="Instructions" />
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={data.instructions}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData('instructions', e.target.value)}
                                rows={4}
                                required
                            />
                            <InputError message={errors.instructions} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="available_from" value="Available From" />
                                <TextInput
                                    id="available_from"
                                    type="date"
                                    name="available_from"
                                    value={data.available_from}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('available_from', e.target.value)}
                                    required
                                />
                                <InputError message={errors.available_from} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="due_date" value="Due Date" />
                                <TextInput
                                    id="due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.due_date} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="total_points" value="Total Points" />
                                <TextInput
                                    id="total_points"
                                    type="number"
                                    name="total_points"
                                    value={data.total_points}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('total_points', e.target.value)}
                                    min="1"
                                    required
                                />
                                <InputError message={errors.total_points} className="mt-2" />
                            </div>

                            <div className="flex flex-col justify-end mt-1">
                                <div className="flex items-center mt-2">
                                    <input
                                        id="is_graded"
                                        type="checkbox"
                                        name="is_graded"
                                        checked={data.is_graded}
                                        onChange={(e) => setData('is_graded', e.target.checked)}
                                        className="rounded border-gray-300 text-[#1e5091] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <label htmlFor="is_graded" className="ml-2 text-sm text-gray-600">
                                        This assignment is graded
                                    </label>
                                </div>
                                
                                <div className="flex items-center mt-2">
                                    <input
                                        id="allow_late_submissions"
                                        type="checkbox"
                                        name="allow_late_submissions"
                                        checked={data.allow_late_submissions}
                                        onChange={(e) => setData('allow_late_submissions', e.target.checked)}
                                        className="rounded border-gray-300 text-[#1e5091] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <label htmlFor="allow_late_submissions" className="ml-2 text-sm text-gray-600">
                                        Allow late submissions
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="file" value="Attachment (Optional)" />
                            <input
                                id="file"
                                type="file"
                                name="file"
                                className="mt-1 block w-full text-gray-700"
                                onChange={handleFileChange}
                            />
                            <InputError message={errors.file} className="mt-2" />
                            {editingAssignment && editingAssignment.file_path && !data.file && (
                                <p className="text-xs text-gray-600 mt-1">
                                    Current file: {editingAssignment.file_path.split('/').pop()}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditingAssignment(null);
                                }}
                                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-[#1e5091] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#1e5091]/90 focus:bg-[#1e5091]/90 active:bg-[#1e5091]/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                {processing ? 'Saving...' : (editingAssignment ? 'Update Assignment' : 'Create Assignment')}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
