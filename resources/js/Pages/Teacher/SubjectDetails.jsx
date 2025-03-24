import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowLeftIcon,
    BookOpenIcon,
    ClipboardDocumentCheckIcon,
    DocumentTextIcon,
    QuestionMarkCircleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function SubjectDetails({ auth, subject, materials, assessments, quizzes }) {
    const [activeTab, setActiveTab] = useState('materials');

    // Empty state components
    const EmptyState = ({ icon: Icon, title, description }) => (
        <div className="text-center py-12">
            <Icon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center">
                    <Link 
                        href={route('teacher.dashboard')} 
                        className="mr-3 p-1 rounded-full hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-[#1e5091]">
                        Subject Details
                    </h2>
                </div>
            }
        >
            <Head title={`Subject: ${subject.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Subject Header */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex items-center">
                                    <div className="h-16 w-16 rounded-full bg-[#1e5091]/20 flex items-center justify-center text-[#1e5091] text-xl font-bold">
                                        {subject.code ? subject.code.substring(0, 2) : subject.name.substring(0, 2)}
                                    </div>
                                    <div className="ml-4">
                                        <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
                                        <p className="text-gray-600">
                                            Code: {subject.code || 'N/A'} | 
                                            Teacher: {subject.teacher ? subject.teacher.name : 'Not assigned'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Link
                                        href="#"
                                        className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all"
                                    >
                                        Add Material
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200">
                            <nav className="flex -mb-px overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('materials')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                                        activeTab === 'materials'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Materials
                                </button>
                                <button
                                    onClick={() => setActiveTab('grades')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                                        activeTab === 'grades'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Grades
                                </button>
                                <button
                                    onClick={() => setActiveTab('assessments')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                                        activeTab === 'assessments'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Assessments
                                </button>
                                <button
                                    onClick={() => setActiveTab('quizzes')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                                        activeTab === 'quizzes'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Quizzes
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                                        activeTab === 'settings'
                                            ? 'border-[#1e5091] text-[#1e5091]'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Settings
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6">
                            {activeTab === 'materials' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-medium text-gray-900">Learning Materials</h3>
                                        <button className="inline-flex items-center px-3 py-1.5 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all">
                                            <DocumentTextIcon className="h-4 w-4 mr-1" />
                                            Upload Material
                                        </button>
                                    </div>
                                    
                                    {materials && materials.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {materials.map((material) => (
                                                <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                                                    <div className="flex items-start">
                                                        <div className="h-10 w-10 rounded bg-[#1e5091]/10 flex items-center justify-center text-[#1e5091]">
                                                            <DocumentTextIcon className="h-6 w-6" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <h4 className="font-medium text-gray-900">{material.title}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                                                            <div className="mt-2">
                                                                <a 
                                                                    href={material.file_url} 
                                                                    target="_blank"
                                                                    className="text-xs text-[#1e5091] hover:text-[#ffb81c]"
                                                                >
                                                                    Download
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <EmptyState
                                            icon={DocumentTextIcon}
                                            title="No materials yet"
                                            description="Upload learning materials for this subject to help your students learn."
                                        />
                                    )}
                                </div>
                            )}

                            {activeTab === 'grades' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Student Grades</h3>
                                    <EmptyState
                                        icon={BookOpenIcon}
                                        title="No grades available"
                                        description="Grade information will be available once assessments are graded."
                                    />
                                </div>
                            )}

                            {activeTab === 'assessments' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-medium text-gray-900">Assessments</h3>
                                        <button className="inline-flex items-center px-3 py-1.5 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all">
                                            <ClipboardDocumentCheckIcon className="h-4 w-4 mr-1" />
                                            Create Assessment
                                        </button>
                                    </div>
                                    
                                    {assessments && assessments.length > 0 ? (
                                        <div className="space-y-4">
                                            {assessments.map((assessment) => (
                                                <div key={assessment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{assessment.title}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">{assessment.description}</p>
                                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                                <span>Due: {new Date(assessment.due_date).toLocaleDateString()}</span>
                                                                <span className="mx-2">•</span>
                                                                <span>Points: {assessment.total_points}</span>
                                                            </div>
                                                        </div>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            assessment.status === 'published' ? 'bg-green-100 text-green-800' :
                                                            assessment.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <EmptyState
                                            icon={ClipboardDocumentCheckIcon}
                                            title="No assessments yet"
                                            description="Create assessments to evaluate student understanding of this subject."
                                        />
                                    )}
                                </div>
                            )}

                            {activeTab === 'quizzes' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-medium text-gray-900">Quizzes</h3>
                                        <button className="inline-flex items-center px-3 py-1.5 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all">
                                            <QuestionMarkCircleIcon className="h-4 w-4 mr-1" />
                                            Create Quiz
                                        </button>
                                    </div>
                                    
                                    {quizzes && quizzes.length > 0 ? (
                                        <div className="space-y-4">
                                            {quizzes.map((quiz) => (
                                                <div key={quiz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">{quiz.description}</p>
                                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                                <span>Questions: {quiz.question_count}</span>
                                                                <span className="mx-2">•</span>
                                                                <span>Time Limit: {quiz.time_limit} minutes</span>
                                                            </div>
                                                        </div>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            quiz.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <EmptyState
                                            icon={QuestionMarkCircleIcon}
                                            title="No quizzes yet"
                                            description="Create quizzes to test student knowledge and provide immediate feedback."
                                        />
                                    )}
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Subject Settings</h3>
                                    <form className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                    Subject Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    defaultValue={subject.name}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e5091] focus:ring-[#1e5091] sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                                    Subject Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    defaultValue={subject.code}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e5091] focus:ring-[#1e5091] sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">
                                                    Teacher
                                                </label>
                                                <select
                                                    id="teacher"
                                                    name="teacher"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e5091] focus:ring-[#1e5091] sm:text-sm"
                                                    defaultValue={subject.teacher_id || ''}
                                                >
                                                    <option value="">Select a teacher</option>
                                                    <option value="1">John Doe</option>
                                                    <option value="2">Jane Smith</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                                                    Schedule
                                                </label>
                                                <input
                                                    type="text"
                                                    name="schedule"
                                                    id="schedule"
                                                    defaultValue={subject.schedule || ''}
                                                    placeholder="e.g., Mon, Wed, Fri 10:00 AM - 11:00 AM"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e5091] focus:ring-[#1e5091] sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                defaultValue={subject.description || ''}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e5091] focus:ring-[#1e5091] sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="books" className="block text-sm font-medium text-gray-700">
                                                Required Books
                                            </label>
                                            <textarea
                                                id="books"
                                                name="books"
                                                rows={3}
                                                defaultValue={subject.books || ''}
                                                placeholder="List required textbooks and materials"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1e5091] focus:ring-[#1e5091] sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-lg text-sm font-medium hover:bg-[#1e5091]/90 transition-all"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
