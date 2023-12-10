import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Guest({ children }) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') || 'on');

    useEffect(() => {
        if (darkMode === 'on') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', darkMode);
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', darkMode);
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            <div className="w-full max-w-sm p-4 md:bg-white md:border md:border-gray-200 rounded-lg md:shadow sm:p-6 md:p-8 md:dark:bg-gray-800 md:dark:border-gray-700 mt-5">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-6 uppercase text-center">
                    {route().current().replace('.', ' ')}
                </h5>
                {children}
            </div>
        </div>
    );
}
