import AuthLayout from "@/Layouts/Custom/AuthLayout";
import { Head } from "@inertiajs/react";

const Show = ({ auth, answer }) => {
    return (
        <AuthLayout
            user={auth.user}
            header={
                <h1 className="text-2xl font-bold uppercase break-words">{answer.description}</h1>
            }
        >
            <Head title={answer.description} />
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border dark:border-zinc-700">
                <div className="border-b pb-4 dark:border-zinc-700">
                    <button className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 inline-flex items-center">
                        <i className="fa fa-download mr-2"></i>
                        Save offline
                    </button>
                    <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 inline-flex items-center">
                        <i className="fa fa-trash mr-2"></i>
                        Delete
                    </button>
                </div>
                <div className="border-b py-4 dark:border-zinc-700">
                    <strong className="text-xl">Situation: </strong>
                    <span>{answer.situation}</span>
                </div>
                <div className="pt-4 dark:border-zinc-700">
                    <strong className="text-xl">Response: </strong>
                    <span>{answer.response}</span>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Show
