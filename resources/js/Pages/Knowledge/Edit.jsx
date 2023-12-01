import AuthLayout from "@/Layouts/Custom/AuthLayout"
import { Head, router } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import PrimaryButton from "@/Components/PrimaryButton"

const Edit = ({ auth, knowledge, oldContent }) => {

    const [content, setContent] = useState(oldContent)

    const update = (e) => {
        e.preventDefault();

        router.put(route('knowledge.update', knowledge.id), {
            knowledge: content
        });
    }

    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current !== null) {
            textAreaRef.current.focus();
        }
    }, [])
    return (
        <AuthLayout user={auth.user}>
            <Head title={"Edit knowledge"} />
            <form onSubmit={update}>
                <label for="knowledge" class="block mb-2 font-medium text-zinc-900 dark:text-white text-xl">Edit "{knowledge.name}"</label>
                <textarea
                    ref={textAreaRef}
                    id="knowledge"
                    rows="15"
                    class="block p-2.5 w-full text-sm text-zinc-900 bg-zinc-50 rounded-lg border border-zinc-300 focus:ring-lime-500 focus:border-lime-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-lime-500 dark:focus:border-lime-500"
                    placeholder="Write your thoughts here..."
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <div className="my-4">
                    <PrimaryButton>
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    )
}

export default Edit
