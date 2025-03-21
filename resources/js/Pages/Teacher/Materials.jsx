import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ArrowLeftIcon, 
    PlusIcon, 
    DocumentIcon, 
    PhotoIcon, 
    VideoCameraIcon,
    DocumentTextIcon,
    LinkIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Materials({ auth, classData, subject, materials }) {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');

    const { data, setData, post, processing, progress, errors, reset } = useForm({
        title: '',
        description: '',
        type: 'document',
        file: null,
        url: '',
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
            
            // Auto-detect type based on file extension
            const extension = file.name.split('.').pop().toLowerCase();
            if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
                setData('type', 'image');
            } else if (['mp4', 'mov', 'avi', 'webm'].includes(extension)) {
                setData('type', 'video');
            } else if (['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt'].includes(extension)) {
                setData('type', 'document');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teacher.class.materials.upload', { classId: classData.id, subjectId: subject.id }), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setShowUploadModal(false);
            },
        });
    };

    const handleMaterialSelection = (materialId) => {
        if (selectedMaterials.includes(materialId)) {
            setSelectedMaterials(selectedMaterials.filter(id => id !== materialId));
        } else {
            setSelectedMaterials([...selectedMaterials, materialId]);
        }
    };

    const handleBatchDelete = () => {
        if (confirm('Are you sure you want to delete the selected materials?')) {
            // Implement batch delete functionality
        }
    };

    // Filter materials based on search and type
    const filteredMaterials = materials.filter(material => {
        const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             (material.description && material.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = filterType === 'all' || material.type === filterType;
        return matchesSearch && matchesType;
    });

    // Group materials by type for the sidebar
    const materialCounts = {
        all: materials.length,
        document: materials.filter(m => m.type === 'document').length,
        image: materials.filter(m => m.type === 'image').length,
        video: materials.filter(m => m.type === 'video').length,
        link: materials.filter(m => m.type === 'link').length,
    };

    // Get icon based on material type
    const getIcon = (type) => {
        switch (type) {
            case 'document':
                return <DocumentTextIcon className="h-8 w-8 text-blue-500" />;
            case 'image':
                return <PhotoIcon className="h-8 w-8 text-green-500" />;
            case 'video':
                return <VideoCameraIcon className="h-8 w-8 text-red-500" />;
            case 'link':
                return <LinkIcon className="h-8 w-8 text-purple-500" />;
            default:
                return <DocumentIcon className="h-8 w-8 text-gray-500" />;
        }
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
                        {subject.name} Materials - {classData.name}
                    </h2>
                </div>
            }
        >
            <Head title={`${subject.name} Materials - ${classData.name}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="md:w-1/4">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Material Types</h3>
                                    <ul className="space-y-2">
                                        <li>
                                            <button 
                                                onClick={() => setFilterType('all')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterType === 'all' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <DocumentIcon className="h-5 w-5 mr-2" />
                                                All Materials
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {materialCounts.all}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterType('document')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterType === 'document' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <DocumentTextIcon className="h-5 w-5 mr-2" />
                                                Documents
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {materialCounts.document}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterType('image')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterType === 'image' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <PhotoIcon className="h-5 w-5 mr-2" />
                                                Images
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {materialCounts.image}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterType('video')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterType === 'video' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <VideoCameraIcon className="h-5 w-5 mr-2" />
                                                Videos
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {materialCounts.video}
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => setFilterType('link')}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-center ${filterType === 'link' ? 'bg-[#1e5091] text-white' : 'hover:bg-gray-100'}`}
                                            >
                                                <LinkIcon className="h-5 w-5 mr-2" />
                                                Links
                                                <span className="ml-auto bg-gray-200 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                                                    {materialCounts.link}
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
                                            {filterType === 'all' ? 'All Materials' : 
                                             filterType === 'document' ? 'Documents' :
                                             filterType === 'image' ? 'Images' :
                                             filterType === 'video' ? 'Videos' : 'Links'}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <button
                                                onClick={() => setShowUploadModal(true)}
                                                className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-md text-sm font-medium hover:bg-[#1e5091]/90"
                                            >
                                                <PlusIcon className="h-5 w-5 mr-2" />
                                                Upload Material
                                            </button>
                                            {selectedMaterials.length > 0 && (
                                                <button
                                                    onClick={handleBatchDelete}
                                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                                                >
                                                    <TrashIcon className="h-5 w-5 mr-2" />
                                                    Delete Selected
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Search */}
                                    <div className="mb-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10"
                                                placeholder="Search materials..."
                                            />
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Materials Grid */}
                                    {filteredMaterials.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {filteredMaterials.map((material) => (
                                                <div 
                                                    key={material.id} 
                                                    className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                                                        selectedMaterials.includes(material.id) ? 'ring-2 ring-[#1e5091]' : ''
                                                    }`}
                                                >
                                                    <div className="p-4">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-shrink-0">
                                                                {getIcon(material.type)}
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedMaterials.includes(material.id)}
                                                                    onChange={() => handleMaterialSelection(material.id)}
                                                                    className="rounded border-gray-300 text-[#1e5091] shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                                />
                                                            </div>
                                                        </div>
                                                        <h4 className="text-base font-medium text-gray-900 mt-2">{material.title}</h4>
                                                        {material.description && (
                                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{material.description}</p>
                                                        )}
                                                        <div className="mt-3 flex justify-between items-center">
                                                            <span className="text-xs text-gray-500">
                                                                {new Date(material.created_at).toLocaleDateString()}
                                                            </span>
                                                            <a
                                                                href={material.type === 'link' ? material.url : material.file_path}
                                                                target="_blank"
                                                                className="text-sm text-[#1e5091] hover:text-[#ffb81c]"
                                                            >
                                                                {material.type === 'link' ? 'Visit' : 'Download'}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <DocumentIcon className="h-12 w-12 text-gray-400 mx-auto" />
                                            <h3 className="mt-2 text-sm font-medium text-gray-900">No materials found</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {searchQuery 
                                                    ? `No results for "${searchQuery}". Try a different search term.` 
                                                    : `Get started by uploading your first ${filterType === 'all' ? 'material' : filterType}.`}
                                            </p>
                                            <div className="mt-6">
                                                <button
                                                    onClick={() => setShowUploadModal(true)}
                                                    className="inline-flex items-center px-4 py-2 bg-[#1e5091] text-white rounded-md text-sm font-medium hover:bg-[#1e5091]/90"
                                                >
                                                    <PlusIcon className="h-5 w-5 mr-2" />
                                                    Upload Material
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

            {/* Upload Material Modal */}
            <Modal show={showUploadModal} onClose={() => setShowUploadModal(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Material</h2>
                    
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
                            <InputLabel htmlFor="description" value="Description (Optional)" />
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div className="mb-4">
                            <InputLabel htmlFor="type" value="Material Type" />
                            <select
                                id="type"
                                name="type"
                                value={data.type}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData('type', e.target.value)}
                                required
                            >
                                <option value="document">Document</option>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                                <option value="link">Link</option>
                            </select>
                            <InputError message={errors.type} className="mt-2" />
                        </div>

                        {data.type === 'link' ? (
                            <div className="mb-4">
                                <InputLabel htmlFor="url" value="URL" />
                                <TextInput
                                    id="url"
                                    type="url"
                                    name="url"
                                    value={data.url}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('url', e.target.value)}
                                    required
                                />
                                <InputError message={errors.url} className="mt-2" />
                            </div>
                        ) : (
                            <div className="mb-4">
                                <InputLabel htmlFor="file" value="File" />
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    className="mt-1 block w-full text-gray-700"
                                    onChange={handleFileChange}
                                    required
                                />
                                <InputError message={errors.file} className="mt-2" />
                                {progress && (
                                    <div className="mt-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-[#1e5091] h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">{progress.percentage}% uploaded</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end mt-6">
                            <button
                                type="button"
                                onClick={() => setShowUploadModal(false)}
                                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 bg-[#1e5091] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#1e5091]/90 focus:bg-[#1e5091]/90 active:bg-[#1e5091]/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                {processing ? 'Uploading...' : 'Upload Material'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
