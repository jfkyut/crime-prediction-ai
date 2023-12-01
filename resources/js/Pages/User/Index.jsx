import DeleteUser from "@/Components/Custom/DeleteUser";
import AuthLayout from "@/Layouts/Custom/AuthLayout";
import { Head, router, Link } from "@inertiajs/react";

const Index = ({ auth, users }) => {

    return (
        <AuthLayout
            user={auth.user}
            header={<h1 className="text-2xl font-bold uppercase">Manage users</h1>}
        >
            <Head title="Manage users" />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
                    <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user, index) => (
                            <tr className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-600">
                                <th scope="row" className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                                    {user.email}
                                </th>
                                <td className="px-6 py-4">
                                    {user.is_admin !== 0 ? "Admin" : "Standard"}
                                </td>
                                <td className="px-6 py-4 flex gap-2 items-end">
                                    {user.is_admin === 0 && (
                                        <>
                                            <Link href={route('user.promote', user.id)} method="put" as="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Promote</Link>
                                            <DeleteUser user={user} />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.links.length > 3 && (
                <nav aria-label="Page navigation example" className="my-5">
                    <ul class="inline-flex -space-x-px text-sm">
                        {users.links.map((link, index) => (
                            <Link key={index}>
                                <a href={link.url} class="flex items-center justify-center px-3 h-8 leading-tight text-zinc-500 bg-white border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white" dangerouslySetInnerHTML={{ __html: link.label }}></a>
                            </Link>
                        ))}
                    </ul>
                </nav>
            )}

        </AuthLayout>
    )
}

export default Index
