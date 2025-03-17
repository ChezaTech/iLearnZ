import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Tab } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    BookOpenIcon, 
    DocumentTextIcon, 
    AcademicCapIcon, 
    CogIcon, 
    ClipboardDocumentCheckIcon,
    QuestionMarkCircleIcon,
    ArrowLeftIcon 
} from '@heroicons/react/24/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Show({ auth, class: classData, subject, teachers, books }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <AuthenticatedLayout>
            <>
                <Head title={`${subject.name} - ${classData.name}`} />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                {subject.name} - {classData.name}
                            </h2>
                            <Link
                                href={route('classes.subjects.index', classData.id)}
                                className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300"
                            >
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                Back to Subjects
                            </Link>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                {/* Subject Information */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Subject Information</h3>
                                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Name</p>
                                            <p className="mt-1 text-sm text-gray-900">{subject.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Code</p>
                                            <p className="mt-1 text-sm text-gray-900">{subject.code || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Teacher</p>
                                            <p className="mt-1 text-sm text-gray-900">
                                                {subject.teacher && subject.teacher.length > 0 
                                                    ? subject.teacher[0].name 
                                                    : 'Not Assigned'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Description</p>
                                            <p className="mt-1 text-sm text-gray-900">{subject.description || 'No description available'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Schedule</p>
                                            <p className="mt-1 text-sm text-gray-900">{subject.pivot.schedule || 'Not Scheduled'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Grade Level</p>
                                            <p className="mt-1 text-sm text-gray-900">{subject.grade_level || classData.grade_level}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <Tab.Group onChange={setActiveTab}>
                                    <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-xl">
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow rounded-lg'
                                                        : 'hover:bg-white/[0.12] hover:text-gray-800'
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-center">
                                                <DocumentTextIcon className="h-5 w-5 mr-2" />
                                                Materials
                                            </div>
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow rounded-lg'
                                                        : 'hover:bg-white/[0.12] hover:text-gray-800'
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-center">
                                                <AcademicCapIcon className="h-5 w-5 mr-2" />
                                                Grades
                                            </div>
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow rounded-lg'
                                                        : 'hover:bg-white/[0.12] hover:text-gray-800'
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-center">
                                                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                                                Assessments
                                            </div>
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow rounded-lg'
                                                        : 'hover:bg-white/[0.12] hover:text-gray-800'
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-center">
                                                <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
                                                Quizzes
                                            </div>
                                        </Tab>
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full py-2.5 text-sm font-medium leading-5 text-gray-700',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow rounded-lg'
                                                        : 'hover:bg-white/[0.12] hover:text-gray-800'
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-center">
                                                <CogIcon className="h-5 w-5 mr-2" />
                                                Settings
                                            </div>
                                        </Tab>
                                    </Tab.List>
                                    <Tab.Panels className="mt-2">
                                        {/* Materials Tab */}
                                        <Tab.Panel className="p-3">
                                            <MaterialsTab subject={subject} classData={classData} />
                                        </Tab.Panel>

                                        {/* Grades Tab */}
                                        <Tab.Panel className="p-3">
                                            <GradesTab subject={subject} classData={classData} />
                                        </Tab.Panel>

                                        {/* Assessments Tab */}
                                        <Tab.Panel className="p-3">
                                            <AssessmentsTab subject={subject} classData={classData} />
                                        </Tab.Panel>

                                        {/* Quizzes Tab */}
                                        <Tab.Panel className="p-3">
                                            <QuizzesTab subject={subject} classData={classData} />
                                        </Tab.Panel>

                                        {/* Settings Tab */}
                                        <Tab.Panel className="p-3">
                                            <SettingsTab 
                                                subject={subject} 
                                                classData={classData} 
                                                teachers={teachers}
                                                books={books}
                                            />
                                        </Tab.Panel>
                                    </Tab.Panels>
                                </Tab.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </AuthenticatedLayout>
    );
}

// Materials Tab Component
function MaterialsTab({ subject, classData }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Learning Materials</h3>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    Add Material
                </button>
            </div>
            
            {subject.readingMaterials && subject.readingMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subject.readingMaterials.map((material) => (
                        <div key={material.id} className="bg-white shadow rounded-lg p-4 border border-gray-200">
                            <h4 className="font-medium text-gray-900">{material.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{material.description || 'No description'}</p>
                            {material.url && (
                                <a 
                                    href={material.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                    View Material
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No materials</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding learning materials for this subject.</p>
                </div>
            )}
        </div>
    );
}

// Grades Tab Component
function GradesTab({ subject, classData }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Student Grades</h3>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    Add Grade
                </button>
            </div>
            
            <div className="text-center py-8 bg-gray-50 rounded-lg">
                <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No grades recorded</h3>
                <p className="mt-1 text-sm text-gray-500">Start recording student grades for this subject.</p>
            </div>
        </div>
    );
}

// Assessments Tab Component
function AssessmentsTab({ subject, classData }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Assessments</h3>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    Create Assessment
                </button>
            </div>
            
            <div className="text-center py-8 bg-gray-50 rounded-lg">
                <ClipboardDocumentCheckIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments</h3>
                <p className="mt-1 text-sm text-gray-500">Create assessments to evaluate student progress.</p>
            </div>
        </div>
    );
}

// Quizzes Tab Component
function QuizzesTab({ subject, classData }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Quizzes</h3>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700">
                    Create Quiz
                </button>
            </div>
            
            <div className="text-center py-8 bg-gray-50 rounded-lg">
                <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No quizzes</h3>
                <p className="mt-1 text-sm text-gray-500">Create quizzes to test student knowledge.</p>
            </div>
        </div>
    );
}

// Settings Tab Component
function SettingsTab({ subject, classData, teachers, books }) {
    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Settings</h3>
            
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subject Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={subject.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Subject Code</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            defaultValue={subject.code}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">Teacher</label>
                        <select
                            id="teacher_id"
                            name="teacher_id"
                            defaultValue={subject.pivot.teacher_id}
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
                            defaultValue={subject.pivot.schedule}
                            placeholder="e.g., Mon, Wed, Fri 10:00 AM - 11:30 AM"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="3"
                            defaultValue={subject.description}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="books" className="block text-sm font-medium text-gray-700">Books</label>
                        <select
                            id="books"
                            name="books"
                            multiple
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ height: '150px' }}
                        >
                            {books.map((book) => (
                                <option 
                                    key={book.id} 
                                    value={book.id}
                                    selected={subject.books.some(b => b.id === book.id)}
                                >
                                    {book.title} by {book.author}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple books</p>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
