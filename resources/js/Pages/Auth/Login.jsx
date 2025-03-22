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

            </div>
            </div>
        </GuestLayout>
    );
}
