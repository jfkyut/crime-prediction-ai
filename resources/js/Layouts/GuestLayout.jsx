import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-zinc-100 dark:bg-zinc-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-zinc-500" />
                </Link>
            </div>

            <div className="w-full max-w-sm p-4 bg-white border border-zinc-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-zinc-800 dark:border-zinc-700 mt-5">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-6">
                    {route().current('login')
                        ? "Sign in to our platform"
                        : route().current('register')
                            ? "Sign up to our platform"
                            : route().current('password.request')
                                ? "Forgot password"
                                : route().current()
                    }
                </h5>
                {children}
            </div>
        </div>
    );
}
