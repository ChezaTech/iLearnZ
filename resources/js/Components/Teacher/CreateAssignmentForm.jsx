import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { CalendarIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CreateAssignmentForm({ show, onClose, classes, subjects }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        instructions: '',
        class_id: '',
        subject_id: '',
        due_date: '',
        available_from: new Date().toISOString().split('T')[0], // Today's date
        max_score: 100,
        allow_late_submissions: false,
        attachment: null,
    });

    const [filteredSubjects, setFilteredSubjects] = useState([]);

    // Reset form when modal is closed
    useEffect(() => {
        if (!show) {
            reset();
            clearErrors();
        }
    }, [show]);

    // Filter subjects based on selected class
    useEffect(() => {
        if (data.class_id && classes && subjects) {
            const selectedClass = classes.find(c => c.id.toString() === data.class_id.toString());
            if (selectedClass && selectedClass.subjects) {
                setFilteredSubjects(selectedClass.subjects);
                // If current subject is not in the filtered list, reset it
                if (data.subject_id && !selectedClass.subjects.some(s => s.id.toString() === data.subject_id.toString())) {
                    setData('subject_id', '');
                }
            } else {
                setFilteredSubjects([]);
            }
        } else {
            setFilteredSubjects([]);
        }
    }, [data.class_id, classes, subjects]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('assignments.store'), {
            onSuccess: () => {
                reset();
                onClose();
                // Show success message
                if (window.flash) {
                    window.flash('success', 'Assignment created successfully!');
                }
            },
        });
    };

    const handleFileChange = (e) => {
        setData('attachment', e.target.files[0]);
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="2xl">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-[#1e5091] flex items-center">
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        Create New Assignment
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <InputLabel htmlFor="title" value="Assignment Title" />
                            <TextInput
                                id="title"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="class_id" value="Class" />
                            <select
                                id="class_id"
                                className="mt-1 block w-full border-gray-300 focus:border-[#1e5091] focus:ring focus:ring-[#1e5091] focus:ring-opacity-50 rounded-md shadow-sm"
                                value={data.class_id}
                                onChange={(e) => setData('class_id', e.target.value)}
                                required
                            >
                                <option value="">Select a class</option>
                                {classes && classes.map((classItem) => (
                                    <option key={classItem.id} value={classItem.id}>
                                        {classItem.name} ({classItem.grade_level}-{classItem.section})
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.class_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="subject_id" value="Subject" />
                            <select
                                id="subject_id"
                                className="mt-1 block w-full border-gray-300 focus:border-[#1e5091] focus:ring focus:ring-[#1e5091] focus:ring-opacity-50 rounded-md shadow-sm"
                                value={data.subject_id}
                                onChange={(e) => setData('subject_id', e.target.value)}
                                required
                                disabled={!data.class_id || filteredSubjects.length === 0}
                            >
                                <option value="">Select a subject</option>
                                {filteredSubjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.subject_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="max_score" value="Maximum Score" />
                            <TextInput
                                id="max_score"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.max_score}
                                onChange={(e) => setData('max_score', e.target.value)}
                                required
                                min="0"
                            />
                            <InputError message={errors.max_score} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="available_from" value="Available From" />
                            <div className="relative">
                                <TextInput
                                    id="available_from"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.available_from}
                                    onChange={(e) => setData('available_from', e.target.value)}
                                    required
                                />
                                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <InputError message={errors.available_from} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="due_date" value="Due Date" />
                            <div className="relative">
                                <TextInput
                                    id="due_date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    required
                                />
                                <CalendarIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <InputError message={errors.due_date} className="mt-2" />
                        </div>

                        <div className="flex items-center mt-6">
                            <input
                                id="allow_late_submissions"
                                type="checkbox"
                                className="rounded border-gray-300 text-[#1e5091] shadow-sm focus:border-[#1e5091] focus:ring focus:ring-[#1e5091] focus:ring-opacity-50"
                                checked={data.allow_late_submissions}
                                onChange={(e) => setData('allow_late_submissions', e.target.checked)}
                            />
                            <label htmlFor="allow_late_submissions" className="ml-2 text-sm text-gray-600">
                                Allow late submissions
                            </label>
                        </div>

                        <div>
                            <InputLabel htmlFor="attachment" value="Attachment (Optional)" />
                            <input
                                id="attachment"
                                type="file"
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#1e5091]/10 file:text-[#1e5091] hover:file:bg-[#1e5091]/20"
                                onChange={handleFileChange}
                            />
                            <p className="mt-1 text-xs text-gray-500">Max file size: 10MB</p>
                            <InputError message={errors.attachment} className="mt-2" />
                        </div>
                    </div>

                    <div className="mb-4">
                        <InputLabel htmlFor="instructions" value="Instructions" />
                        <textarea
                            id="instructions"
                            className="mt-1 block w-full border-gray-300 focus:border-[#1e5091] focus:ring focus:ring-[#1e5091] focus:ring-opacity-50 rounded-md shadow-sm"
                            rows="5"
                            value={data.instructions}
                            onChange={(e) => setData('instructions', e.target.value)}
                            required
                        ></textarea>
                        <InputError message={errors.instructions} className="mt-2" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={onClose} disabled={processing}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Assignment'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
