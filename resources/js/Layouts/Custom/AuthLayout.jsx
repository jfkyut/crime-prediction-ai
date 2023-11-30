import SideBar from "@/Components/Custom/SideBar"

const AuthLayout = ({ user, children }) => {
    return (
        <>
            <SideBar />
            <div className="sm:ml-64">
                <div className="fixed right-[5%] top-2">
                    <div className="text-zinc-700 dark:text-zinc-300 border dark:border-zinc-700 px-4 py-2 rounded-md max-w-[120px] sm:max-w-[150px] md:max-w-[250px] lg:max-w-[300px] truncate">{user.email}</div>
                </div>
                <main className="dark:bg-zinc-900 min-h-screen text-zinc-600 dark:text-zinc-300 px-[5%] py-24">
                    {children}
                </main>
                <footer></footer>
            </div>
        </>
    )
}

export default AuthLayout
