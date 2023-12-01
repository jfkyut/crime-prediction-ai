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

    return (
        <>
            <button onClick={openSide} data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-zinc-500 rounded-lg sm:hidden hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600 fixed z-10">
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

                <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-50 dark:bg-zinc-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link href={route('dashboard')} className="flex items-center p-2 text-zinc-900 rounded-lg dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700 group">
                                <i className="fa fa-robot text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                                <span className="ms-3">Crime Bot</span>
                            </Link>
                        </li>
                    </ul>

                    {user.is_admin !== 0 && (
                        <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-zinc-200 dark:border-zinc-700">
                            <li>
                                <Link href={route('knowledge.index')} className="flex items-center p-2 text-zinc-900 transition duration-75 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white group">
                                    <i className="fa fa-file text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                                    <span className="ms-3">Knowledge files</span>
                                </Link>
                                <Link href={route('profile.email')} className="flex items-center p-2 text-zinc-900 transition duration-75 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white group">
                                    <i className="fa fa-users text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                                    <span className="ms-3">Manage users</span>
                                </Link>
                            </li>
                        </ul>
                    )}

                    {/* border top here */}
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-zinc-200 dark:border-zinc-700">
                        {user.social === null && (
                            <>
                                <li>
                                    <Link href={route('profile.email')} className="flex items-center p-2 text-zinc-900 transition duration-75 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white group">
                                        <i className="fa fa-at text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                                        <span className="ms-3">Edit email</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('profile.password')} className="flex items-center p-2 text-zinc-900 transition duration-75 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white group">
                                        <i className="fa fa-lock text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                                        <span className="ms-3">Change password</span>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link href={route('profile.delete')} className="flex items-center p-2 text-zinc-900 transition duration-75 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white group">
                                <i className="fa fa-trash text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                                <span className="ms-3">Delete account</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('logout')} as="button" method="POST" className="flex items-center p-2 text-zinc-900 transition duration-75 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 dark:text-white group w-full">
                                <i className="fa fa-sign-out text-zinc-500 transition duration-75 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"></i>
                                <span className="ms-3">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar
