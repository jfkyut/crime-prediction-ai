import AuthLayout from "@/Layouts/Custom/AuthLayout"
import { Head, Link } from "@inertiajs/react"

const Index = ({ auth, answers }) => {

    return (
        <AuthLayout
            user={auth.user}
            header={
                <>
                    <h1 className="text-2xl font-bold uppercase">Save answers</h1>
                </>
            }
        >
            <Head title="Saved answers" />
            {answers.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {answers.data.map((answer, index) => (
                        <div key={index} className="w-full flex justify-center items-center">
                            <div className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg h-[150px] w-[300px] border dark:border-zinc-700">
                                <p className="break-words overflow-hidden h-[70%]">{answer.description}</p>
                                <div className="h-[30%] flex items-end">
                                    <Link href={route('answer.show', answer.id)} className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 inline-flex items-center">
                                        <i className="fa fa-eye mr-1"></i>
                                        Read full
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="min-h-[20vh] flex justify-center items-center text-2xl font-bold uppercase">empty</div>
            )}


        </AuthLayout>
    )
}

export default Index
