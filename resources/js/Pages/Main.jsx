import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/Custom/AuthLayout';
import { useState } from 'react';
import axios from 'axios';
import SaveAnswer from '@/Components/Custom/SaveAnswer';

export default function Dashboard({ auth }) {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState(null);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(false);
    const [lastMessage, setLastMessage] = useState("");

    const prompt = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSent(true);
        setError(false);
        setLastMessage(message);

        try {
            const { data } = await axios.post(route('generator.store'), {
                prompt: message
            });

            setResponse(data)
            setIsLoading(false)
        } catch (err) {
            console.log(err);
            setIsLoading(false)
            setError(true)
        }
    }

    const situations = [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fugit quibusdam, cumque culpa explicabo at recusandae id nobis esse odio doloribus corrupti quis nostrum excepturi voluptas deleniti dolorum maxime soluta?',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fugit quibusdam, cumque culpa explicabo at recusandae id nobis esse odio doloribus corrupti quis nostrum excepturi voluptas deleniti dolorum maxime soluta?',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fugit quibusdam, cumque culpa explicabo at recusandae id nobis esse odio doloribus corrupti quis nostrum excepturi voluptas deleniti dolorum maxime soluta?',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fugit quibusdam, cumque culpa explicabo at recusandae id nobis esse odio doloribus corrupti quis nostrum excepturi voluptas deleniti dolorum maxime soluta?',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fugit quibusdam, cumque culpa explicabo at recusandae id nobis esse odio doloribus corrupti quis nostrum excepturi voluptas deleniti dolorum maxime soluta?',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut fugit quibusdam, cumque culpa explicabo at recusandae id nobis esse odio doloribus corrupti quis nostrum excepturi voluptas deleniti dolorum maxime soluta?',
    ]

    const [isCopied, setIsCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(response);
        setIsCopied(true);

        let timer = setTimeout(() => {
            setIsCopied(false);
            clearTimeout(timer);
        }, 3000);
    }

    return (
        <AuthLayout
            user={auth.user}
            header={
                <>
                    <h1 className="text-2xl font-bold uppercase">Crime prediction bot</h1>
                    <p className="leading-relaxed text-base">Describe your situation and the Bot will try to identify which crime could be apply in a given situation.</p>
                </>
            }
        >
            <Head title="Bot" />
            <div>
                <form onSubmit={prompt} className='w-full'>
                    <div className="w-full mb-4 border border-zinc-200 rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:border-zinc-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-zinc-800">
                            <label for="message" className="sr-only">Your Situation</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="w-full px-0 text-sm text-zinc-900 bg-white border-0 dark:bg-zinc-800 focus:ring-0 dark:text-white dark:placeholder-zinc-400"
                                placeholder="Write a situation..."
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-end px-3 py-2 border-t dark:border-zinc-600">
                            {isLoading ? (
                                <button disabled type="button" className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 inline-flex items-center">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                    </svg>
                                    Loading...
                                </button>
                            ) : (
                                <button type="submit" className="text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800 inline-flex items-center">
                                    Prompt
                                    <i className="fa fa-paper-plane ml-2"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </form>
                {isSent ? (
                    <div className='block p-6 bg-white border border-zinc-200 rounded-lg shadow hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700'>
                        {isLoading ? (
                            <div className='flex justify-center items-center p-10'>
                                <div role="status">
                                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-lime-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <p className='whitespace-pre-wrap'>{
                                !error
                                    ? response
                                    : <span className='text-red-600 dark:text-red-300'>Something went wrong! Please try again.</span>
                                }
                            </p>
                        )}
                        {!isLoading && (
                            <div className='p-2 mt-5 flex gap-4 justify-end'>
                                <SaveAnswer situation={lastMessage} response={response} />
                                <button onClick={copy}>
                                    <i className={`fas ${isCopied ? "fa-clipboard-check" : "fa-clipboard"}`}></i>
                                </button>
                                <button>
                                    <i className="fa fa-volume-high"></i>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs mt-5'>
                        {situations.map((situation, index) => (
                            <div key={index} onClick={() => setMessage(situation)} className='bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:cursor-pointer'>
                                <p>{situation}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </AuthLayout>
    );
}
