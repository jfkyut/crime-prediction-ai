import { useState } from "react";
import Modal from "../Modal";
import TextInput from "../TextInput";
import { router } from "@inertiajs/react";

const SaveAnswer = ({ situation, response }) => {

    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState("");

    const saveAnswer = (e) => {
        e.preventDefault();

        router.post(route('answer.store'), {
            situation: situation,
            response: response,
            description: description
        });
    }

    const reset = () => {
        let timer = setTimeout(() => {
            setShowModal(false);
            setDescription("");
            clearTimeout(timer);
        }, 1000)
    }

    return (
        <>
            <button onClick={() => setShowModal(true)} title="Save">
                <i className="fas fa-save"></i>
            </button>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div class="relative bg-white rounded-lg shadow dark:bg-zinc-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-zinc-600">
                        <h3 class="text-xl font-semibold text-zinc-900 dark:text-white">
                            Add description
                        </h3>
                    </div>
                    <div class="p-4 md:p-5 space-y-4">
                        <TextInput
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <form onSubmit={saveAnswer} class="flex items-center p-4 md:p-5 border-t border-zinc-200 rounded-b dark:border-zinc-600">
                        <button onClick={reset} data-modal-hide="default-modal" type="submit" class="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800">Save</button>
                        <button onClick={() => setShowModal(false)} data-modal-hide="default-modal" type="button" class="ms-3 text-zinc-500 bg-white hover:bg-zinc-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-zinc-200 text-sm font-medium px-5 py-2.5 hover:text-zinc-900 focus:z-10 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-500 dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-zinc-600">Cancel</button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default SaveAnswer
