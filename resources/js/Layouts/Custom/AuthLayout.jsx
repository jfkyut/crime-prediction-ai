import SideBar from "@/Components/Custom/SideBar"

const AuthLayout = ({ user, children, header }) => {
    return (
        <>
            <SideBar user={user} />
            <div className="bg-gray-800 h-14 sticky top-0 sm:hidden"></div>
            <div className="sm:ml-64 relative dark:bg-gray-900 min-h-screen text-gray-600 dark:text-gray-300 px-[5%] py-24">
                <header className="mb-10">
                    {header}
                </header>
                <main>
                    <div className="fixed right-[5%] top-2">
                        <div className="text-gray-700 dark:text-gray-300 border dark:border-gray-700 px-4 py-2 rounded-md max-w-[120px] sm:max-w-[150px] md:max-w-[250px] lg:max-w-[300px] truncate">{user.email}</div>
                    </div>
                    {children}
                </main>
                <footer>

                </footer>
            </div>
        </>
    )
}

export default AuthLayout
