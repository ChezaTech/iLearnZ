import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

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
const StyledInput = ({ label, id, type = 'text', value, onChange, error, autoComplete, isFocused, ...props }) => {
    return (
        <div className="mb-4">
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
                autoComplete={autoComplete}
                autoFocus={isFocused}
                className="w-full rounded-lg border-0 px-4 py-3 text-sm transition duration-200 focus:ring-2 focus:ring-opacity-50"
                style={{
                    backgroundColor: '#F9FAFB',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    outline: 'none',
                    borderColor: error ? '#EF4444' : '#D1D5DB',
                    color: colors.text,
                    focusRing: colors.primary,
                }}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

// Custom styled radio button component
const StyledRadio = ({ label, name, value, checked, onChange }) => {
    return (
        <label className="flex cursor-pointer items-center rounded-lg px-4 py-3 transition duration-200 hover:bg-gray-50">
            <div className="relative mr-3 flex h-5 w-5 items-center justify-center">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="peer absolute h-0 w-0 opacity-0"
                />
                <div className="h-5 w-5 rounded-full border-2 border-gray-300 peer-checked:border-0"></div>
                <div 
                    className="absolute h-3 w-3 scale-0 rounded-full transition duration-200 peer-checked:scale-100"
                    style={{ backgroundColor: colors.primary }}
                ></div>
            </div>
            <span className="text-sm font-medium" style={{ color: colors.text }}>{label}</span>
        </label>
    );
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        user_type: 'parent',
        phone_number: '',
    });
    
    const [formStep, setFormStep] = useState(1);
    const totalSteps = 2;

    const nextStep = () => {
        if (formStep < totalSteps) {
            setFormStep(formStep + 1);
        }
    };

    const prevStep = () => {
        if (formStep > 1) {
            setFormStep(formStep - 1);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                    Create Your Account
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    Join iLearnZ and start your learning journey today!
                </p>
            </div>
            
            {/* Progress bar */}
            <div className="mb-8">
                <div className="relative mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div 
                        className="h-full rounded-full transition-all duration-300 ease-in-out" 
                        style={{
                            width: `${(formStep / totalSteps) * 100}%`,
                            backgroundColor: colors.primary
                        }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Account Details</span>
                    <span>User Type</span>
                </div>
            </div>

            <form onSubmit={submit}>
                {formStep === 1 && (
                    <div className="space-y-4 transition-all duration-300">
                        <StyledInput
                            label="Full Name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            autoComplete="name"
                            isFocused={true}
                            required
                        />

                        <StyledInput
                            label="Email Address"
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            autoComplete="username"
                            required
                        />

                        <StyledInput
                            label="Password"
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            autoComplete="new-password"
                            required
                        />

                        <StyledInput
                            label="Confirm Password"
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                            required
                        />
                        
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={nextStep}
                                className="rounded-lg px-6 py-3 text-sm font-medium text-white transition duration-200 hover:opacity-90"
                                style={{ backgroundColor: colors.primary }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {formStep === 2 && (
                    <div className="space-y-6 transition-all duration-300">
                        <div>
                            <h3 className="mb-4 text-lg font-medium" style={{ color: colors.primary }}>
                                Choose Account Type
                            </h3>
                            
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div 
                                    className={`cursor-pointer overflow-hidden rounded-xl border-2 p-4 transition duration-200 ${data.user_type === 'parent' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    onClick={() => setData('user_type', 'parent')}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="font-medium" style={{ color: colors.text }}>Parent Account</h4>
                                        <StyledRadio
                                            name="user_type"
                                            value="parent"
                                            checked={data.user_type === 'parent'}
                                            onChange={() => setData('user_type', 'parent')}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Manage your children's profiles and monitor their progress
                                    </p>
                                </div>
                                
                                <div 
                                    className={`cursor-pointer overflow-hidden rounded-xl border-2 p-4 transition duration-200 ${data.user_type === 'student' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    onClick={() => setData('user_type', 'student')}
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="font-medium" style={{ color: colors.text }}>Student Account</h4>
                                        <StyledRadio
                                            name="user_type"
                                            value="student"
                                            checked={data.user_type === 'student'}
                                            onChange={() => setData('user_type', 'student')}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        For students who will be using the platform directly
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {data.user_type === 'parent' && (
                            <StyledInput
                                label="Phone Number"
                                id="phone_number"
                                type="tel"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                error={errors.phone_number}
                                required
                            />
                        )}
                        
                        <div className="mt-6 flex justify-between">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
                            >
                                Back
                            </button>
                            
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg px-6 py-3 text-sm font-medium text-white transition duration-200 hover:opacity-90 disabled:opacity-70"
                                style={{ backgroundColor: colors.primary }}
                            >
                                {data.user_type === 'parent' ? 'Register as Parent' : 'Register as Student'}
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link
                        href={route('login')}
                        className="text-sm font-medium transition duration-200"
                        style={{ color: colors.primary }}
                    >
                        Already have an account? Sign in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
