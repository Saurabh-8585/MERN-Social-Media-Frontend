import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import { useDeleteUserMutation } from '../../features/user/UserServices';

const DeleteAccount = () => {
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const deleteUserAccount = async () => {
        const response = await deleteUser()
        if (response.data) {
            toast.success(response.data.message);
            navigate('/SignIn')

        }
        if (response.error) {
            toast.error(response.error.data.message);
        }
    }
    return (
        <>
            <div className="flex flex-col items-center mt-4 gap-3">
                <h2 className="text-xl font-bold mb-2 dark:text-white">Do you want to delete account?</h2>
                <button
                    className="border border-red-500 text-red-500 hover:bg-red-600 hover:text-white flex justify-around gap-3 items-center font-bold py-2 px-4 rounded ease-linear transition-all duration-150"
                    onClick={openModal}
                >
                    Delete Account
                    <FaTrash />
                </button>
            </div>
            <div>
                {isOpen && (
                    <div className="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-20 p-4"
                        onClick={closeModal}
                    >
                        <div className="flex flex-col flex-wrap  p-3  bg-white shadow-md hover:shadow-lg rounded-2xl ">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center flex-col gap-3">
                                    <FaTrash className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 mt-4" />
                                    <div className="flex flex-col ml-3">

                                        <p className="text-sm text-gray-600 leading-none mt-1">
                                            By deleting your account, you will lose all your data.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-around mt-5 gap-3">
                                <button className="flex-no-shrink border-purple-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-purple-500  rounded-full hover:bg-purple-500 hover:text-white ease-linear transition-all duration-150 w-fit"
                                    onClick={closeModal}>
                                    Close
                                </button>
                                <button className="flex-no-shrink  px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2  border-red-500 text-red-500 hover:bg-red-600 hover:text-white  rounded-full ease-linear transition-all duration-150 w-fit"

                                    onClick={deleteUserAccount}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DeleteAccount