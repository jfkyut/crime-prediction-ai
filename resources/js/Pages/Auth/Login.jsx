import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

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
                        placeholder="name@company.com"
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
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <div className='flex justify-between w-full'>
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-lime-700 hover:underline dark:text-lime-500 text-sm"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                    </label>
                </div>

                <div className="flex items-center mt-4">

                    <PrimaryButton disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
                <div class="flex items-center mt-4 text-sm font-medium text-gray-500 dark:text-gray-300 whitespace-pre-wrap">
                    Not registered? <Link href={route('register')} class="text-lime-700 hover:underline dark:text-lime-500">Create account</Link>
                </div>
            </form>
        </GuestLayout>
    );
}
