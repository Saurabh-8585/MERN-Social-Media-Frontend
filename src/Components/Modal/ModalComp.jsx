import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Modal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const userProfileImage = "https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg";

    return (
        <div className={`h-full w-full border border-red-500 flex justify-center items-center `} >
            <button
                type="button"
                onClick={openModal}
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
            >
                <FiX className="w-4 h-4 mr-2" />
                Connect wallet
            </button>

            {
                isOpen && (
                    <div
                        id="crypto-modal"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full h-full w-full border border-red-500 flex justify-center items-center"
                    >
                        <div className="relative w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                >
                                    <FiX aria-hidden="true" className="w-5 h-5" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div class="p-6">
                                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
                                    <ul class="my-4 space-y-3">
                                        <li>
                                            <Link to={`/profile/649e90a65fd7b77c2ec360e0`} class="flex items-center justify-between p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">

                                                {/* <span class="flex-1 ml-3 whitespace-nowrap">MetaMask</span> */}
                                                <img src={userProfileImage} className="w-12 h-12 rounded-full mr-3 " alt="" />
                                                <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Saurabh khatmode</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default Modal;
