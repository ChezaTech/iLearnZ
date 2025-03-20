import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Login({ status, canResetPassword, userTypes }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [activeUserType, setActiveUserType] = useState(userTypes && userTypes.length > 0 ? userTypes[0].type : null);

    const handleUserSelect = (email, password) => {
        setData({
            email,
            password,
            remember: data.remember,
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    useEffect(() => {
        if (userTypes && userTypes.length > 0 && !activeUserType) {
            setActiveUserType(userTypes[0].type);
        }
    }, [userTypes, activeUserType]);

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex flex-col md:flex-row gap-8 w-full">
                {/* Login Form */}
                <div className="w-full md:w-1/2">
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 block">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                {/* Login As Section */}
                <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Login As
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 border-b pb-3">
                        Select a user type and credentials to quickly access the system
                    </p>
                    
                    <div className="space-y-4">
                        {!userTypes || userTypes.length === 0 ? (
                            <div className="bg-yellow-50 text-yellow-600 p-4 rounded-lg border border-yellow-200">
                                <p className="font-medium">No demo users available</p>
                                <p className="text-sm">Please contact an administrator to set up demo accounts.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {userTypes.map((type, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setActiveUserType(activeUserType === type.type ? null : type.type)}
                                            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                                                activeUserType === type.type
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {type.type}
                                        </button>
                                    ))}
                                </div>

                                {activeUserType && (
                                    <div className="space-y-3">
                                        <h3 className="text-md font-medium text-gray-700">Select a user:</h3>
                                        <div className="grid gap-2">
                                            {userTypes
                                                .find(t => t.type === activeUserType)
                                                ?.users.map((user, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => handleUserSelect(user.email, user.password)}
                                                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                                                            data.email === user.email
                                                                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                                                                : 'border-gray-200 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="flex flex-col items-start">
                                                            <span className="font-medium">{user.name}</span>
                                                            <span className="text-sm text-gray-500">{user.email}</span>
                                                            {user.school && (
                                                                <span className="text-xs text-gray-400 mt-1">
                                                                    {user.school} {user.role ? `(${user.role})` : ''}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {data.email === user.email && (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
