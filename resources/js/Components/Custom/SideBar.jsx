import { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";

const SideBar = ({ user }) => {

    const [openSideBar, setOpenSideBar] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            // Check if the clicked element is outside the sidebar
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setOpenSideBar(false);
            }
        };

        // Attach the event listener to the document body
        document.addEventListener("click", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const openSide = (e) => {
        e.stopPropagation()
        setOpenSideBar(true)
    }

    // theme

    const darkModeToggleRef = useRef(null);
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

    const toggleTheme = (e) => {
        if (e.target.checked) {
            setDarkMode("on");
        } else {
            setDarkMode("off")
        }
    }

    return (
        <>
            <button onClick={openSide} data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed z-10">
                <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                ref={sidebarRef}
                id="sidebar-multi-level-sidebar"
                className={`${!openSideBar && "-translate-x-full"} fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0`}
                aria-label="Sidebar">

                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
                    <div className="p-2 mb-5">
                        <h5 id="drawer-navigation-label" class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">AI Crime Bot</h5>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href={route('dashboard')}
                                className={`
                                    ${route().current('dashboard') && "bg-gray-200 dark:bg-gray-700"}
                                    flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
                                <i className="fa fa-robot text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                <span className="ms-3">Crime bot</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('answer.index')}
                                className={`${route().current('answer.index') && "bg-gray-200 dark:bg-gray-700"}
                                    flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
                                <i className="fa fa-list text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                <span className="ms-3">Saved answers</span>
                            </Link>
                        </li>
                    </ul>

                    {user.is_admin !== 0 && (
                        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <Link
                                    href={route('knowledge.index')}
                                    className={`${route().current('knowledge.index') && "bg-gray-200 dark:bg-gray-700"}
                                    flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
                                    <i className="fa fa-file text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                    <span className="ms-3">Knowledge files</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route('user.index')}
                                    className={`${route().current('user.index') && "bg-gray-200 dark:bg-gray-700"}
                                    flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
                                    <i className="fa fa-users text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                    <span className="ms-3">Manage users</span>
                                </Link>
                            </li>
                        </ul>
                    )}

                    {/* border top here */}
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        {user.has_password !== 0 && (
                            <>
                                <li>
                                    <Link
                                        href={route('profile.email')}
                                        className={`${route().current('profile.email') && "bg-gray-200 dark:bg-gray-700"} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
                                        <i className="fa fa-at text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                        <span className="ms-3">Edit email</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('profile.password')}
                                        className={`${route().current('profile.password') && "bg-gray-200 dark:bg-gray-700"} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
                                        <i className="fa fa-lock text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                        <span className="ms-3">Change password</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                href={route('profile.delete')}
                                className={`${route().current('profile.delete') && "bg-gray-200 dark:bg-gray-700"}
                                    flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}>
                                <i className="fa fa-trash text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                <span className="ms-3">Delete account</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('logout')} as="button" method="POST" className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white group w-full">
                                <i className="fa fa-sign-out text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                <span className="ms-3">Logout</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <div href={route('knowledge.index')} className="flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white group">
                                <div>
                                    <i className="fa fa-moon text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                                    <span className="ms-3">Dark mode</span>
                                </div>
                                <div>
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input
                                            ref={darkModeToggleRef}
                                            type="checkbox"
                                            class="sr-only peer"
                                            onChange={toggleTheme}
                                            checked={darkMode === 'on' ? true : false}
                                        />
                                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 dark:peer-focus:ring-lime-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-600"></div>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar
