import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Tab } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    BookOpenIcon, 
    DocumentTextIcon, 
    AcademicCapIcon, 
    CogIcon, 
    ClipboardDocumentCheckIcon,
    QuestionMarkCircleIcon,
    ArrowLeftIcon,
    CheckCircleIcon,
    PlusIcon,
    FolderIcon,
    TrashIcon,
    PencilIcon,
    DocumentIcon,
    FilmIcon,
    MusicalNoteIcon,
    PhotoIcon,
    ArchiveBoxIcon,
    FolderPlusIcon,
    XMarkIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

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
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('all');
    const [showNewFolderModal, setShowNewFolderModal] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef(null);

    // Fetch materials on component mount
    useEffect(() => {
        fetchMaterials();
        fetchCategories();
    }, []);

    // Extract unique categories from materials
    useEffect(() => {
        if (materials.length > 0) {
            const uniqueCategories = [...new Set(materials.map(material => material.category).filter(Boolean))];
            // Merge with existing categories and remove duplicates
            const mergedCategories = [...new Set([...categories, ...uniqueCategories])];
            if (JSON.stringify(mergedCategories) !== JSON.stringify(categories)) {
                setCategories(mergedCategories);
            }
        }
    }, [materials]);

    // Fetch materials from the server
    const fetchMaterials = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route('classes.subjects.materials.index', {
                class: classData.id,
                subject: subject.id
            }));
            
            if (response.data.success) {
                setMaterials(response.data.materials);
            }
        } catch (error) {
            console.error('Error fetching materials:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories from the server
    const fetchCategories = async () => {
        try {
            const response = await axios.get(route('classes.subjects.materials.getCategories', {
                class: classData.id,
                subject: subject.id
            }));
            
            if (response.data.success) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Filter materials based on category and search query
    const filteredMaterials = materials.filter(material => {
        const matchesCategory = currentCategory === 'all' || material.category === currentCategory;
        const matchesSearch = searchQuery === '' || 
            material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (material.description && material.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (material.tags && material.tags.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesCategory && matchesSearch;
    });

    // Handle file selection
    const handleFileSelect = (e) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle material selection for bulk actions
    const toggleMaterialSelection = (materialId) => {
        if (selectedMaterials.includes(materialId)) {
            setSelectedMaterials(selectedMaterials.filter(id => id !== materialId));
        } else {
            setSelectedMaterials([...selectedMaterials, materialId]);
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        if (selectedMaterials.length === 0) return;
        
        if (confirm(`Are you sure you want to delete ${selectedMaterials.length} selected materials?`)) {
            try {
                const response = await axios.post(route('classes.subjects.materials.batchDelete', {
                    class: classData.id,
                    subject: subject.id
                }), {
                    material_ids: selectedMaterials
                });
                
                if (response.data.success) {
                    fetchMaterials();
                    setSelectedMaterials([]);
                    setShowBulkActions(false);
                }
            } catch (error) {
                console.error('Error deleting materials:', error);
            }
        }
    };

    // Handle creating a new category folder
    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        
        try {
            const response = await axios.post(route('classes.subjects.materials.storeCategory', {
                class: classData.id,
                subject: subject.id
            }), {
                name: newFolderName.trim()
            });
            
            if (response.data.success) {
                // Update categories with the response from server
                setCategories(response.data.categories);
                setCurrentCategory(newFolderName.trim());
                setNewFolderName('');
                setShowNewFolderModal(false);
            }
        } catch (error) {
            console.error('Error creating folder:', error);
            alert('Failed to create folder. Please try again.');
        }
    };

    // Get icon based on material type
    const getMaterialIcon = (type, className = "h-6 w-6") => {
        switch (type) {
            case 'document':
                return <DocumentIcon className={className} />;
            case 'video':
                return <FilmIcon className={className} />;
            case 'audio':
                return <MusicalNoteIcon className={className} />;
            case 'image':
                return <PhotoIcon className={className} />;
            case 'archive':
                return <ArchiveBoxIcon className={className} />;
            case 'lesson':
                return <DocumentTextIcon className={className} />;
            case 'book':
                return <BookOpenIcon className={className} />;
            default:
                return <DocumentIcon className={className} />;
        }
    };

    // Format file size
    const formatFileSize = (bytes) => {
        if (!bytes) return 'Unknown size';
        
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    };

    // Get file extension from path
    const getFileExtension = (path) => {
        if (!path) return '';
        return path.split('.').pop().toUpperCase();
    };

    return (
        <div className="space-y-6">
            {/* Header with search and actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                <h3 className="text-lg font-medium text-gray-900">Learning Materials</h3>
                
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search materials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-8 pr-4 py-2 text-sm"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => setShowNewFolderModal(true)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <FolderPlusIcon className="h-4 w-4 mr-1" />
                        New Folder
                    </button>
                    
                    {selectedMaterials.length > 0 ? (
                        <button
                            onClick={handleBulkDelete}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            Delete Selected ({selectedMaterials.length})
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <PlusIcon className="h-4 w-4 mr-1" />
                            Add Material
                        </button>
                    )}
                </div>
            </div>
            
            {/* Category tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                    <button
                        onClick={() => setCurrentCategory('all')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                            currentCategory === 'all'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        All Materials
                    </button>
                    
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setCurrentCategory(category)}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                currentCategory === category
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-center">
                                <FolderIcon className="h-4 w-4 mr-1" />
                                {category}
                            </div>
                        </button>
                    ))}
                </nav>
            </div>
            
            {/* Materials grid or empty state */}
            {loading ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <div className="animate-pulse flex justify-center">
                        <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Loading materials...</h3>
                </div>
            ) : filteredMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMaterials.map((material) => (
                        <div 
                            key={material.id} 
                            className={`bg-white shadow rounded-lg p-4 border ${
                                selectedMaterials.includes(material.id) 
                                    ? 'border-indigo-500 ring-2 ring-indigo-200' 
                                    : 'border-gray-200 hover:border-gray-300'
                            } transition-all duration-200`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getMaterialIcon(material.type)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{material.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{material.description || 'No description'}</p>
                                        
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {material.tags && material.tags.split(',').map((tag, index) => (
                                                <span 
                                                    key={index} 
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-3 flex items-center text-xs text-gray-500">
                                            <span className="bg-gray-100 px-2 py-1 rounded">
                                                {getFileExtension(material.file_path)}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <span>{formatFileSize(material.file_size)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col space-y-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedMaterials.includes(material.id)}
                                        onChange={() => toggleMaterialSelection(material.id)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    
                                    <button
                                        onClick={() => {
                                            setCurrentMaterial(material);
                                            setShowEditModal(true);
                                        }}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <PencilIcon className="h-4 w-4" />
                                    </button>
                                    
                                    <button
                                        onClick={async () => {
                                            if (confirm('Are you sure you want to delete this material?')) {
                                                try {
                                                    await axios.delete(route('classes.subjects.materials.destroy', {
                                                        class: classData.id,
                                                        subject: subject.id,
                                                        material: material.id
                                                    }));
                                                    fetchMaterials();
                                                } catch (error) {
                                                    console.error('Error deleting material:', error);
                                                }
                                            }
                                        }}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            
                            {material.file_path && (
                                <div className="mt-3 flex justify-between">
                                    <a 
                                        href={`/storage/${material.file_path}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        View Material
                                    </a>
                                    
                                    <a 
                                        href={`/storage/${material.file_path}`} 
                                        download
                                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        Download
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No materials found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchQuery 
                            ? 'Try adjusting your search or category filter.' 
                            : 'Get started by adding learning materials for this subject.'}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <PlusIcon className="h-4 w-4 mr-1" />
                            Add Material
                        </button>
                    )}
                </div>
            )}
            
            {/* Edit Material Modal */}
            {showEditModal && currentMaterial && (
                <EditMaterialModal 
                    showEditModal={showEditModal} 
                    setShowEditModal={setShowEditModal} 
                    material={currentMaterial} 
                    subject={subject} 
                    classData={classData} 
                    fetchMaterials={fetchMaterials} 
                    categories={categories} 
                />
            )}
            
            {/* New Folder Modal */}
            {showNewFolderModal && (
                <NewFolderModal 
                    showNewFolderModal={showNewFolderModal} 
                    setShowNewFolderModal={setShowNewFolderModal} 
                    newFolderName={newFolderName} 
                    setNewFolderName={setNewFolderName} 
                    handleCreateFolder={handleCreateFolder} 
                />
            )}
            
            {/* Upload Material Modal */}
            {showUploadModal && (
                <UploadMaterialModal 
                    showUploadModal={showUploadModal} 
                    setShowUploadModal={setShowUploadModal} 
                    subject={subject} 
                    classData={classData} 
                    fetchMaterials={fetchMaterials} 
                    categories={categories} 
                />
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
    // Initialize form data with all fields as their native types
    const { data, setData, put, processing, errors } = useForm({
        name: subject.name || '',
        code: subject.code || '',
        description: subject.description || '',
        teacher_id: subject.pivot.teacher_id || '',
        schedule: subject.pivot.schedule || '',
        notes: subject.pivot.notes || '',
        book_ids: subject.books.map(book => book.id) || [],
        category: subject.category || '',
    });

    // State for selected days and times
    const [selectedDays, setSelectedDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false
    });
    
    const [dayTimes, setDayTimes] = useState({
        Monday: '08:00',
        Tuesday: '08:00',
        Wednesday: '08:00',
        Thursday: '08:00',
        Friday: '08:00',
        Saturday: '08:00',
        Sunday: '08:00'
    });

    // Parse existing schedule on component mount
    useEffect(() => {
        if (subject.pivot.schedule) {
            const newSelectedDays = { ...selectedDays };
            const newDayTimes = { ...dayTimes };
            
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const scheduleItems = subject.pivot.schedule.split(',').map(item => item.trim());
            
            scheduleItems.forEach(item => {
                days.forEach(day => {
                    if (item.includes(day)) {
                        newSelectedDays[day] = true;
                        
                        const timeMatch = item.match(/(\d{1,2}:\d{2}(?:\s*[AP]M)?)/);
                        if (timeMatch) {
                            newDayTimes[day] = timeMatch[1];
                        }
                    }
                });
            });
            
            setSelectedDays(newSelectedDays);
            setDayTimes(newDayTimes);
        }
    }, [subject.pivot.schedule]);

    const [selectedBooks, setSelectedBooks] = useState(subject.books.map(book => book.id) || []);
    const [successMessage, setSuccessMessage] = useState('');

    // Toggle day selection
    const toggleDay = (day) => {
        setSelectedDays({
            ...selectedDays,
            [day]: !selectedDays[day]
        });
        
        // Update schedule string whenever days change
        updateScheduleString({
            ...selectedDays,
            [day]: !selectedDays[day]
        }, dayTimes);
    };

    // Update time for a day
    const updateDayTime = (day, time) => {
        setDayTimes({
            ...dayTimes,
            [day]: time
        });
        
        // Update schedule string whenever times change
        updateScheduleString(selectedDays, {
            ...dayTimes,
            [day]: time
        });
    };

    // Create schedule string from selected days and times
    const updateScheduleString = (days, times) => {
        const scheduleItems = [];
        
        Object.keys(days).forEach(day => {
            if (days[day]) {
                scheduleItems.push(`${day} ${times[day]}`);
            }
        });
        
        const scheduleString = scheduleItems.join(', ');
        setData('schedule', scheduleString);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');

        // Create form data with schedule as string and selected books
        const formData = {
            name: data.name,
            code: data.code,
            description: data.description,
            teacher_id: data.teacher_id,
            schedule: data.schedule, // Already a string
            notes: data.notes,
            book_ids: selectedBooks,
            category: data.category,
        };

        put(route('classes.subjects.update', { class: classData.id, subject: subject.id }), formData, {
            onSuccess: () => {
                setSuccessMessage('Subject updated successfully!');
                
                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            },
            preserveScroll: true,
        });
    };

    const handleBookSelection = (e) => {
        const options = e.target.options;
        const selectedValues = [];
        
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(parseInt(options[i].value));
            }
        }
        
        setSelectedBooks(selectedValues);
    };

    return (
        <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Settings</h3>
            
            {successMessage && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                    {successMessage}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subject Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700">Subject Code</label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={data.code}
                            onChange={e => setData('code', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.code && <div className="text-red-500 text-xs mt-1">{errors.code}</div>}
                    </div>
                    <div>
                        <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700">Teacher</label>
                        <select
                            id="teacher_id"
                            name="teacher_id"
                            value={data.teacher_id}
                            onChange={e => setData('teacher_id', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                            ))}
                        </select>
                        {errors.teacher_id && <div className="text-red-500 text-xs mt-1">{errors.teacher_id}</div>}
                    </div>
                    <div>
                        <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                        <div className="space-y-3 border border-gray-200 rounded-md p-4">
                            <p className="text-sm text-gray-500 mb-2">Select days and set specific times for each day</p>
                            
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <div key={day} className="flex items-center space-x-4">
                                    <div className="w-28">
                                        <label className="inline-flex items-center">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedDays[day]} 
                                                onChange={(e) => toggleDay(day)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">{day}</span>
                                        </label>
                                    </div>
                                    
                                    {selectedDays[day] && (
                                        <div className="flex-1">
                                            <input
                                                type="time"
                                                value={dayTimes[day]}
                                                onChange={(e) => updateDayTime(day, e.target.value)}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {errors.schedule && <div className="text-red-500 text-xs mt-1">{errors.schedule}</div>}
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select a category</option>
                            {subject.categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="books" className="block text-sm font-medium text-gray-700">Books</label>
                        <select
                            id="books"
                            name="books"
                            multiple
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            style={{ height: '150px' }}
                            onChange={handleBookSelection}
                            value={selectedBooks}
                        >
                            {books.map((book) => (
                                <option 
                                    key={book.id} 
                                    value={book.id}
                                >
                                    {book.title} by {book.author}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                            Hold Ctrl (or Cmd) to select multiple books
                        </p>
                        {errors.book_ids && <div className="text-red-500 text-xs mt-1">{errors.book_ids}</div>}
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Any additional notes about this subject..."
                        ></textarea>
                        {errors.notes && <div className="text-red-500 text-xs mt-1">{errors.notes}</div>}
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Upload Material Modal Component
function UploadMaterialModal({ showUploadModal, setShowUploadModal, subject, classData, fetchMaterials, categories }) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState(null);
    
    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setSelectedFile(null);
            return;
        }
        
        // Check file size (50MB max)
        if (file.size > 50 * 1024 * 1024) {
            setFileError('File size exceeds 50MB limit');
            setSelectedFile(null);
            return;
        }
        
        // Check file type
        const allowedTypes = [
            'application/pdf', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
            'application/vnd.openxmlformats-officedocument.presentationml.presentation', // pptx
            'text/plain',
            'video/mp4',
            'audio/mpeg',
            'application/zip',
            'image/jpeg',
            'image/png'
        ];
        
        if (!allowedTypes.includes(file.type)) {
            setFileError('File type not supported. Please upload PDF, DOCX, PPTX, TXT, MP4, MP3, ZIP, JPG, or PNG files.');
            setSelectedFile(null);
            return;
        }
        
        setFileError(null);
        setSelectedFile(file);
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isUploading) return;
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate required fields
        const title = formData.get('title');
        const type = formData.get('type');
        const file = formData.get('file');
        
        if (!title || !type) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (!file && !formData.get('url')) {
            alert('Please upload a file or provide a URL');
            return;
        }
        
        setIsUploading(true);
        setUploadProgress(0);
        
        try {
            await axios.post(
                route('classes.subjects.materials.store', {
                    class: classData.id,
                    subject: subject.id
                }),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    }
                }
            );
            
            setShowUploadModal(false);
            fetchMaterials();
            
            // Reset form
            form.reset();
            setSelectedFile(null);
            
        } catch (error) {
            console.error('Error uploading material:', error);
            alert('Error uploading material. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Upload Material</h3>
                        <button
                            onClick={() => setShowUploadModal(false)}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <form id="upload-material-form" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="e.g. Chapter 1 Notes"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="Provide a brief description of this material"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                    Material Type *
                                </label>
                                <select
                                    name="type"
                                    id="type"
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select type</option>
                                    <option value="document">Document</option>
                                    <option value="video">Video</option>
                                    <option value="audio">Audio</option>
                                    <option value="image">Image</option>
                                    <option value="lesson">Lesson</option>
                                    <option value="book">Book</option>
                                    <option value="archive">Archive</option>
                                </select>
                            </div>
                            
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                                <p className="mt-1 text-xs text-gray-500">
                                    Select a category to organize your materials
                                </p>
                            </div>
                            
                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    placeholder="e.g. homework, chapter 1, important"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Upload File
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PDF, DOCX, PPTX, TXT, MP4, MP3, ZIP, JPG, PNG up to 50MB
                                        </p>
                                        
                                        {selectedFile && (
                                            <div className="mt-2 text-sm text-gray-900">
                                                Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                                            </div>
                                        )}
                                        
                                        {fileError && (
                                            <div className="mt-2 text-sm text-red-600">
                                                {fileError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                    Or External URL
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="url"
                                        name="url"
                                        id="url"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="https://example.com/resource"
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    You can either upload a file or provide an external URL
                                </p>
                            </div>
                        </div>
                        
                        {isUploading && (
                            <div className="mt-4">
                                <div className="relative pt-1">
                                    <div className="flex mb-2 items-center justify-between">
                                        <div>
                                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                                Uploading
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-indigo-600">
                                                {uploadProgress}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                        <div
                                            style={{ width: `${uploadProgress}%` }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowUploadModal(false)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUploading || (fileError && !formData?.get('url'))}
                                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                                    isUploading || (fileError && !formData?.get('url'))
                                        ? 'bg-indigo-300 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                }`}
                            >
                                {isUploading ? 'Uploading...' : 'Upload Material'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Edit Material Modal Component
function EditMaterialModal({ showEditModal, setShowEditModal, material, subject, classData, fetchMaterials, categories }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [file, setFile] = useState(null);
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const fileInputRef = useRef(null);

    // Initialize form with material data when modal opens
    useEffect(() => {
        if (material && showEditModal) {
            setTitle(material.title || '');
            setDescription(material.description || '');
            setType(material.type || 'document');
            setCategory(material.category || '');
            setTags(material.tags || '');
            setAuthor(material.author || '');
            setPublisher(material.publisher || '');
            setPublicationYear(material.publication_year || '');
            setFile(null);
            setUploadProgress(0);
            setError('');
        }
    }, [material, showEditModal]);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file size (max 50MB)
            if (selectedFile.size > 50 * 1024 * 1024) {
                setError('File size exceeds the maximum limit of 50MB.');
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('type', type);
            formData.append('category', category);
            formData.append('tags', tags);
            formData.append('author', author);
            formData.append('publisher', publisher);
            formData.append('publication_year', publicationYear);
            
            if (file) {
                formData.append('file', file);
            }

            // Use axios to upload the file with progress tracking
            const response = await axios.post(
                route('classes.subjects.materials.update', {
                    class: classData.id,
                    subject: subject.id,
                    material: material.id
                }),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-HTTP-Method-Override': 'PUT'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    }
                }
            );

            if (response.data.success) {
                // Reset form and close modal
                setTitle('');
                setDescription('');
                setType('document');
                setCategory('');
                setTags('');
                setFile(null);
                setAuthor('');
                setPublisher('');
                setPublicationYear('');
                setUploadProgress(0);
                setShowEditModal(false);
                
                // Refresh the materials list
                fetchMaterials();
            }
        } catch (error) {
            console.error('Error updating material:', error);
            setError(error.response?.data?.error || 'An error occurred while updating the material.');
        } finally {
            setIsUploading(false);
        }
    };

    // Handle adding a new category
    const handleAddCategory = () => {
        if (newCategory.trim()) {
            setCategory(newCategory.trim());
            setNewCategory('');
        }
    };

    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${showEditModal ? 'block' : 'hidden'}`}>
            <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Edit Material</h3>
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Material Type *
                            </label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                required
                            >
                                <option value="document">Document</option>
                                <option value="book">Book</option>
                                <option value="lesson">Lesson</option>
                                <option value="video">Video</option>
                                <option value="audio">Audio</option>
                                <option value="image">Image</option>
                                <option value="archive">Archive</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <div className="flex items-center space-x-2">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Add new category"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddCategory}
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="e.g. math, algebra, equations"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                                Author
                            </label>
                            <input
                                type="text"
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
                                Publisher
                            </label>
                            <input
                                type="text"
                                id="publisher"
                                value={publisher}
                                onChange={(e) => setPublisher(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="publicationYear" className="block text-sm font-medium text-gray-700">
                                Publication Year
                            </label>
                            <input
                                type="number"
                                id="publicationYear"
                                value={publicationYear}
                                onChange={(e) => setPublicationYear(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Replace File (Optional)
                            </label>
                            <div className="mt-1 flex items-center">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <ArrowUpTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
                                    Select File
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <span className="ml-3 text-sm text-gray-500">
                                    {file ? file.name : 'No file selected (keep existing file)'}
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Supported file types: PDF, DOCX, PPTX, TXT, MP4, MP3, ZIP, images, etc. (Max 50MB)
                            </p>
                        </div>
                    </div>

                    {isUploading && (
                        <div className="mb-4">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                                            Uploading
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-indigo-600">
                                            {uploadProgress}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                    <div
                                        style={{ width: `${uploadProgress}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-300"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setShowEditModal(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isUploading ? 'Updating...' : 'Update Material'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// New Folder Modal Component
function NewFolderModal({ showNewFolderModal, setShowNewFolderModal, newFolderName, setNewFolderName, handleCreateFolder }) {
    return (
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${showNewFolderModal ? 'block' : 'hidden'}`}>
            <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Create New Folder</h3>
                    <button
                        onClick={() => setShowNewFolderModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateFolder();
                }}>
                    <div className="mb-4">
                        <label htmlFor="folderName" className="block text-sm font-medium text-gray-700">
                            Folder Name
                        </label>
                        <input
                            type="text"
                            id="folderName"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter folder name"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Folders help you organize materials by category.
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setShowNewFolderModal(false)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Folder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
