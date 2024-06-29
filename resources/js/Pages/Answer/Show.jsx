import AuthLayout from "@/Layouts/Custom/AuthLayout";
import { Head } from "@inertiajs/react";
import DeleteAnswer from "@/Components/Custom/DeleteAnswer";

const Show = ({ auth, answer }) => {
    return (
        <AuthLayout
            user={auth.user}
            header={
                <h1 className="text-2xl font-bold uppercase break-words">{answer.description}</h1>
            }
        >
            <Head title={answer.description} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-[30%]">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 w-full">
                                Content
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Situation
                            </th>
                            <td className="px-6 py-4">
                                {answer.situation}
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Response
                            </th>
                            <td className="px-6 py-4">
                                {answer.response}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="mt-5">
                {/* <button className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 inline-flex items-center">
                    <i className="fa fa-download mr-2"></i>
                    Save offline
                </button> */}
                <DeleteAnswer answer={answer} />
            </div>

        </AuthLayout>
    )
}

export default Show
