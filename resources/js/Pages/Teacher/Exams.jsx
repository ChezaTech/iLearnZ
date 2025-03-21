import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeftIcon, 
    PlusIcon, 
    AcademicCapIcon,
    ClockIcon,
    UserGroupIcon,
    DocumentTextIcon,
    TrashIcon,
    PencilIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Exams({ auth, classData, subject, exams }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingExam, setEditingExam] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        instructions: '',
        exam_date: '',
        start_time: '',
        duration: 60, // Default 60 minutes
        total_points: 100,
        passing_score: 60,
        is_published: false,
        allow_retake: false,
        show_answers_after: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingExam) {
            // Handle update
            post(route('teacher.class.exams.update', { 
                classId: classData.id, 
                subjectId: subject.id,
                examId: editingExam.id 
            }), {
                onSuccess: () => {
                    reset();
                    setShowCreateModal(false);
                    setEditingExam(null);
                },
            });
        } else {
            // Handle create
            post(route('teacher.class.exams.create', { 
                classId: classData.id, 
                subjectId: subject.id 
            }), {
                onSuccess: () => {
                    reset();
                    setShowCreateModal(false);
                },
            });
        }
    };

    const openEditModal = (exam) => {
        setEditingExam(exam);
        setData({
            title: exam.title,
            description: exam.description || '',
            instructions: exam.instructions || '',
            exam_date: exam.exam_date ? new Date(exam.exam_date).toISOString().split('T')[0] : '',
            start_time: exam.start_time || '',
            duration: exam.duration || 60,
            total_points: exam.total_points || 100,
            passing_score: exam.passing_score || 60,
            is_published: exam.is_published || false,
            allow_retake: exam.allow_retake || false,
            show_answers_after: exam.show_answers_after || false,
        });
        setShowCreateModal(true);
    };

    const handleDelete = (examId) => {
        if (confirm('Are you sure you want to delete this exam?')) {
            // Implement delete functionality
        }
    };

    const handlePublishToggle = (exam) => {
        // Implement publish/unpublish functionality
    };

    // Filter exams based on search and status
    const filteredExams = exams.filter(exam => {
        const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (exam.description && exam.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        if (filterStatus === 'all') return matchesSearch;
        
        const now = new Date();
        const examDate = exam.exam_date ? new Date(exam.exam_date) : null;
        
        if (filterStatus === 'upcoming' && examDate && examDate >= now) return matchesSearch;
        if (filterStatus === 'past' && examDate && examDate < now) return matchesSearch;
        if (filterStatus === 'published' && exam.is_published) return matchesSearch;
        if (filterStatus === 'draft' && !exam.is_published) return matchesSearch;
        
        return false;
    });

    // Get counts for the sidebar
    const examCounts = {
        all: exams.length,
        upcoming: exams.filter(e => {
            const examDate = e.exam_date ? new Date(e.exam_date) : null;
            return examDate && examDate >= new Date();
        }).length,
        past: exams.filter(e => {
            const examDate = e.exam_date ? new Date(e.exam_date) : null;
            return examDate && examDate < new Date();
        }).length,
        published: exams.filter(e => e.is_published).length,
        draft: exams.filter(e => !e.is_published).length,
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
                        {subject.name} Exams - {classData.name}
                    </h2>
                </div>
            }
        >
            <Head title={`${subject.name} Exams - ${classData.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="md:w-1/4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Exam Status</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('all')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'all' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <AcademicCapIcon className="h-5 w-5 mr-2" />
                                                All Exams
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {examCounts.all}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('upcoming')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'upcoming' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <ClockIcon className="h-5 w-5 mr-2" />
                                                Upcoming
                                                <span className="ml-auto bg-green-200 text-green-800 rounded-full px-2 py-0.5 text-xs">
                                                    {examCounts.upcoming}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('published')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'published' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <CheckCircleIcon className="h-5 w-5 mr-2" />
                                                Published
                                                <span className="ml-auto bg-blue-200 text-blue-800 rounded-full px-2 py-0.5 text-xs">
                                                    {examCounts.published}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('draft')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'draft' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <DocumentTextIcon className="h-5 w-5 mr-2" />
                                                Drafts
                                                <span className="ml-auto bg-yellow-200 text-yellow-800 rounded-full px-2 py-0.5 text-xs">
                                                    {examCounts.draft}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterStatus('past')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterStatus === 'past' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <UserGroupIcon className="h-5 w-5 mr-2" />
                                                Past Exams
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {examCounts.past}
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
                                            {filterStatus === 'all' ? 'All Exams' : 
                                             filterStatus === 'upcoming' ? 'Upcoming Exams' :
                                             filterStatus === 'published' ? 'Published Exams' :
                                             filterStatus === 'draft' ? 'Draft Exams' : 'Past Exams'}
                                        </h3>
                                        <button
                                            onClick={() => {
                                                setEditingExam(null);
                                                reset();
                                                setShowCreateModal(true);
                                            }}
                                            className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-md text-sm font-medium hover:bg-[#1e5091]/90"
                                        >
                                            <PlusIcon className="h-5 w-5 mr-2" />
                                            Create Exam
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
                                                placeholder="Search exams..."
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Exams List */}
                                    {filteredExams.length > 0 ? (
                                        <div className="space-y-4">
                                            {filteredExams.map((exam) => {
                                                // Determine status and style based on exam date and published status
                                                const now = new Date();
                                                const examDate = exam.exam_date ? new Date(exam.exam_date) : null;
                                                
                                                let status = exam.is_published ? 'published' : 'draft';
                                                let bgColor = exam.is_published ? 'blue' : 'yellow';
                                                let statusText = exam.is_published ? 'Published' : 'Draft';
                                                
                                                if (examDate) {
                                                    if (examDate < now) {
                                                        status = 'past';
                                                        bgColor = 'gray';
                                                        statusText = 'Past';
                                                    } else if (examDate >= now && exam.is_published) {
                                                        status = 'upcoming';
                                                        bgColor = 'green';
                                                        statusText = 'Upcoming';
                                                    }
                                                }
                                                
                                                // Format dates
                                                const formattedExamDate = examDate 
                                                    ? examDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                    : 'No date set';
                                                
                                                return (
                                                    <div key={exam.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                                        <div className="p-4">
                                                            <div className="flex justify-between items-start">
                                                                <div className="flex items-start">
                                                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-${bgColor}-100 flex items-center justify-center text-${bgColor}-600`}>
                                                                        <AcademicCapIcon className="h-5 w-5" />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <h4 className="text-lg font-medium text-gray-900">{exam.title}</h4>
                                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${bgColor}-100 text-${bgColor}-800`}>
                                                                                {statusText}
                                                                            </span>
                                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                                {exam.total_points} points
                                                                            </span>
                                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                                                {exam.duration} min
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-2">
                                                                    <button
                                                                        onClick={() => handlePublishToggle(exam)}
                                                                        className={`p-1 rounded-full ${exam.is_published ? 'text-blue-500 hover:bg-blue-100' : 'text-yellow-500 hover:bg-yellow-100'}`}
                                                                        title={exam.is_published ? 'Unpublish' : 'Publish'}
                                                                    >
                                                                        {exam.is_published ? (
                                                                            <XCircleIcon className="h-5 w-5" />
                                                                        ) : (
                                                                            <CheckCircleIcon className="h-5 w-5" />
                                                                        )}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => openEditModal(exam)}
                                                                        className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                                    >
                                                                        <PencilIcon className="h-5 w-5" />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(exam.id)}
                                                                        className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600"
                                                                    >
                                                                        <TrashIcon className="h-5 w-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            
                                                            {exam.description && (
                                                                <p className="mt-2 text-sm text-gray-600">{exam.description}</p>
                                                            )}
                                                            
                                                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-500">
                                                                <div className="flex items-center">
                                                                    <ClockIcon className="h-4 w-4 mr-1" />
                                                                    <span>Date: {formattedExamDate}</span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <UserGroupIcon className="h-4 w-4 mr-1" />
                                                                    <span>
                                                                        {exam.submissions_count || 0} submissions / 
                                                                        {exam.graded_count || 0} graded
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="mt-4 flex justify-end">
                                                                <Link
                                                                    href={route('teacher.class.exams.show', { 
                                                                        classId: classData.id, 
                                                                        subjectId: subject.id,
                                                                        examId: exam.id
                                                                    })}
                                                                    className="inline-flex items-center px-3 py-1.5 bg-[#1e5091] text-white rounded-md text-sm hover:bg-[#1e5091]/90"
                                                                >
                                                                    <EyeIcon className="h-4 w-4 mr-1" />
                                                                    {status === 'past' ? 'View Results' : 'Manage Questions'}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No exams found</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {searchQuery 
                                                    ? `No results for "${searchQuery}". Try a different search term.` 
                                                    : `Get started by creating your first exam.`}
                                            </p>
                                            <div className="mt-6">
                                                <button
                                                    onClick={() => {
                                                        setEditingExam(null);
                                                        reset();
                                                        setShowCreateModal(true);
                                                    }}
                                                    className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-md text-sm font-medium hover:bg-[#1e5091]/90"
                                                >
                                                    <PlusIcon className="h-5 w-5 mr-2" />
                                                    Create Exam
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

            {/* Create/Edit Exam Modal */}
            <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingExam ? 'Edit Exam' : 'Create Exam'}
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
                                rows={3}
                                required
                            />
                            <InputError message={errors.instructions} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="exam_date" value="Exam Date" />
                                <TextInput
                                    id="exam_date"
                                    type="date"
                                    name="exam_date"
                                    value={data.exam_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('exam_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.exam_date} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="start_time" value="Start Time" />
                                <TextInput
                                    id="start_time"
                                    type="time"
                                    name="start_time"
                                    value={data.start_time}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('start_time', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_time} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <InputLabel htmlFor="duration" value="Duration (minutes)" />
                                <TextInput
                                    id="duration"
                                    type="number"
                                    name="duration"
                                    value={data.duration}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('duration', e.target.value)}
                                    min="1"
                                    required
                                />
                                <InputError message={errors.duration} className="mt-2" />
                            </div>

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

                            <div>
                                <InputLabel htmlFor="passing_score" value="Passing Score (%)" />
                                <TextInput
                                    id="passing_score"
                                    type="number"
                                    name="passing_score"
                                    value={data.passing_score}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('passing_score', e.target.value)}
                                    min="1"
                                    max="100"
                                    required
                                />
                                <InputError message={errors.passing_score} className="mt-2" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-center mt-2">
                                <input
                                    id="is_published"
                                    type="checkbox"
                                    name="is_published"
                                    checked={data.is_published}
                                    onChange={(e) => setData('is_published', e.target.checked)}
                                    className="rounded border-gray-300 text-[#1e5091] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <label htmlFor="is_published" className="ml-2 text-sm text-gray-600">
                                    Publish exam (visible to students)
                                </label>
                            </div>
                            
                            <div className="flex items-center mt-2">
                                <input
                                    id="allow_retake"
                                    type="checkbox"
                                    name="allow_retake"
                                    checked={data.allow_retake}
                                    onChange={(e) => setData('allow_retake', e.target.checked)}
                                    className="rounded border-gray-300 text-[#1e5091] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <label htmlFor="allow_retake" className="ml-2 text-sm text-gray-600">
                                    Allow students to retake exam
                                </label>
                            </div>
                            
                            <div className="flex items-center mt-2">
                                <input
                                    id="show_answers_after"
                                    type="checkbox"
                                    name="show_answers_after"
                                    checked={data.show_answers_after}
                                    onChange={(e) => setData('show_answers_after', e.target.checked)}
                                    className="rounded border-gray-300 text-[#1e5091] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <label htmlFor="show_answers_after" className="ml-2 text-sm text-gray-600">
                                    Show answers after completion
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setEditingExam(null);
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
                                {processing ? 'Saving...' : (editingExam ? 'Update Exam' : 'Create Exam')}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
