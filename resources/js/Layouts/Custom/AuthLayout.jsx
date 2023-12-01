import SideBar from "@/Components/Custom/SideBar"

const AuthLayout = ({ user, children, header }) => {
    return (
        <>
            <SideBar user={user} />
            <div className="sm:ml-64 relative dark:bg-zinc-900 min-h-screen text-zinc-600 dark:text-zinc-300 px-[5%] py-24">
                <header className="mb-10">
                    {header}
                </header>
                <main>
                    <div className="fixed right-[5%] top-5">
                        <div className="text-zinc-700 dark:text-zinc-300 border dark:border-zinc-700 px-4 py-2 rounded-md max-w-[120px] sm:max-w-[150px] md:max-w-[250px] lg:max-w-[300px] truncate">{user.email}</div>
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
