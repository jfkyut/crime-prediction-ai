import AuthLayout from "@/Layouts/Custom/AuthLayout";
import { Head, router, Link } from "@inertiajs/react";
import { useState } from "react";
import DeleteKnowledge from "@/Components/Custom/DeleteKnowledge";

const Index = ({ auth, knowledgeList }) => {

    const [newFile, setNewFile] = useState("");

    const uploadTxt = (e) => {
        e.preventDefault();

        router.post(route('knowledge.store'), {
            knowledge: newFile
        })
    }

    return (
        <AuthLayout user={auth.user}>
            <Head title={"Knowledge"} />
            <form
                onSubmit={uploadTxt}
                className="max-w-sm"
                encType="multipart/form-data"
            >
                <div class="mb-3">
                    <label
                        for="formFile"
                        class="mb-2 inline-block text-neutral-700 dark:text-neutral-200">Text file
                    </label>
                    <div className="flex gap-2">
                        <input
                            class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            type="file"
                            id="formFile"
                            accept="text/plain"
                            onChange={(e) => setNewFile(e.target.files[0])}
                        />
                        <button
                            type="submit"
                            class="inline-block rounded bg-lime-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            Upload
                        </button>
                    </div>
                </div>
            </form>

            {knowledgeList.length > 0 ? (
                <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {knowledgeList.map((knowledge, index) => (
                        <div className="bg-zinc-800 p-4 h-12 max-w-lg text-xs rounded flex justify-between" key={index}>
                            <span className="truncate">
                                {knowledge.name}
                            </span>
                            <div className="flex items-center">
                                <Link href="" className="text-blue-500 hover:underline p-2">Edit</Link>
                                <DeleteKnowledge knowledge={knowledge} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="min-h-[50vh] flex justify-center items-center text-2xl font-bold uppercase">No knowledge files</div>
            )}

        </AuthLayout>
    )
}

export default Index
