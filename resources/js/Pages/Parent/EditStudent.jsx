import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

// Playful color palette
const colors = {
    primary: '#4F46E5', // Indigo
    secondary: '#06B6D4', // Cyan
    accent: '#8B5CF6', // Purple
    success: '#10B981', // Emerald
    warning: '#F59E0B', // Amber
    background: '#F3F4F6', // Light gray
    card: '#FFFFFF',
    text: '#1F2937',
    textLight: '#6B7280',
};

// Custom styled input component
const StyledInput = ({ label, id, type = 'text', value, onChange, error, className = '', ...props }) => {
    return (
        <div className={className}>
            <label 
                htmlFor={id} 
                className="mb-2 block text-sm font-medium"
                style={{ color: colors.text }}
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border-gray-300 px-4 py-3 text-sm shadow-sm transition duration-200 focus:border-indigo-500 focus:ring-indigo-500"
                style={{
                    color: colors.text,
                }}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

// Custom styled select component
const StyledSelect = ({ label, id, value, onChange, error, options, className = '', ...props }) => {
    return (
        <div className={className}>
            <label 
                htmlFor={id} 
                className="mb-2 block text-sm font-medium"
                style={{ color: colors.text }}
            >
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="w-full rounded-lg border-gray-300 px-4 py-3 text-sm shadow-sm transition duration-200 focus:border-indigo-500 focus:ring-indigo-500"
                style={{
                    color: colors.text,
                }}
                {...props}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default function EditStudent({ auth, student }) {
    const { data, setData, put, processing, errors } = useForm({
        name: student.user.name || '',
        email: student.user.email || '',
        grade_level: student.grade_level || '',
        date_of_birth: student.date_of_birth || '',
        gender: student.gender || '',
        emergency_contact: student.emergency_contact || '',
        medical_information: student.medical_information || '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(route('parent.students.update', student.id));
    };

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const gradeLevelOptions = [
        { value: 'Grade 1', label: 'Grade 1' },
        { value: 'Grade 2', label: 'Grade 2' },
        { value: 'Grade 3', label: 'Grade 3' },
        { value: 'Grade 4', label: 'Grade 4' },
        { value: 'Grade 5', label: 'Grade 5' },
        { value: 'Grade 6', label: 'Grade 6' },
        { value: 'Grade 7', label: 'Grade 7' },
        { value: 'Grade 8', label: 'Grade 8' },
        { value: 'Grade 9', label: 'Grade 9' },
        { value: 'Grade 10', label: 'Grade 10' },
        { value: 'Grade 11', label: 'Grade 11' },
        { value: 'Grade 12', label: 'Grade 12' },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Student: {student.user.name}
                </h2>
            }
        >
            <Head title={`Edit Student: ${student.user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Student Information</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Update the student's information below.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <StyledInput
                                        label="Full Name"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={errors.name}
                                        required
                                    />

                                    <StyledInput
                                        label="Email Address"
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        error={errors.email}
                                        required
                                    />
                                </div>

                                <div className="mt-8 mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Student Details</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <StyledSelect
                                        label="Grade Level"
                                        id="grade_level"
                                        value={data.grade_level}
                                        onChange={(e) => setData('grade_level', e.target.value)}
                                        error={errors.grade_level}
                                        options={gradeLevelOptions}
                                        required
                                    />

                                    <StyledInput
                                        label="Date of Birth"
                                        id="date_of_birth"
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        error={errors.date_of_birth}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <StyledSelect
                                        label="Gender"
                                        id="gender"
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        error={errors.gender}
                                        options={genderOptions}
                                        required
                                    />

                                    <StyledInput
                                        label="Emergency Contact"
                                        id="emergency_contact"
                                        value={data.emergency_contact}
                                        onChange={(e) => setData('emergency_contact', e.target.value)}
                                        error={errors.emergency_contact}
                                    />
                                </div>

                                <div>
                                    <StyledInput
                                        label="Medical Information (Optional)"
                                        id="medical_information"
                                        value={data.medical_information}
                                        onChange={(e) => setData('medical_information', e.target.value)}
                                        error={errors.medical_information}
                                        as="textarea"
                                        rows={4}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <a
                                        href={route('parent.dashboard')}
                                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </a>
                                    
                                    <PrimaryButton
                                        className="rounded-lg px-6 py-3 text-sm font-medium"
                                        disabled={processing}
                                        style={{ backgroundColor: colors.primary }}
                                    >
                                        Update Student
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
