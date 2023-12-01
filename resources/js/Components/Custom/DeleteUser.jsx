import { useState } from "react"
import Modal from "../Modal"
import { Link } from "@inertiajs/react";

const DeleteUser = ({ user }) => {
    const [confirmDeletion, setConfirmDeletion] = useState(false);

    return (
        <>
            <button onClick={() => setConfirmDeletion(true)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
            <Modal show={confirmDeletion} onClose={() => setConfirmDeletion(false)}>
                <div class="relative bg-white rounded-lg shadow dark:bg-zinc-700">
                    <button onClick={() => setConfirmDeletion(false)} type="button" class="absolute top-3 end-2.5 text-zinc-400 bg-transparent hover:bg-zinc-200 hover:text-zinc-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-zinc-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-zinc-400 w-12 h-12 dark:text-zinc-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-zinc-500 dark:text-zinc-400">Are you sure you want to delete user "{user.email}"?</h3>
                        <Link
                            href={route('user.destroy', user.id)}
                            method="delete"
                            as="button"
                            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                            Yes, I'm sure
                        </Link>
                        <button onClick={() => setConfirmDeletion(false)} data-modal-hide="popup-modal" type="button" class="text-zinc-500 bg-white hover:bg-zinc-100 focus:ring-4 focus:outline-none focus:ring-zinc-200 rounded-lg border border-zinc-200 text-sm font-medium px-5 py-2.5 hover:text-zinc-900 focus:z-10 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-500 dark:hover:text-white dark:hover:bg-zinc-600 dark:focus:ring-zinc-600">No, cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteUser
