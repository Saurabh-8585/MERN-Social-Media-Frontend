import React, { useState } from 'react'

const PopUp = ({ onClose, icon, message, handleClick, btnMessage,btnColor, }) => {
    const [isOpen, setIsOpen] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
        onClose();
    };
    return (
        isOpen && (
            <div className="flex flex-col space-y-4 min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-20 p-4"
                onClick={closeModal}
            >
                <div className="flex flex-col flex-wrap items-center justify-center p-3  bg-white shadow-md hover:shadow-lg rounded-2xl lg:w-1/4 ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-col gap-3">
                            {icon}
                            <div className="flex flex-col lg:m-3 m-2">
                                <p className="text-md text-gray-600 leading-none mt-1 text-center">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-around mt-5 w-full gap-5">
                        <button className="flex-no-shrink border-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 text-red-500  rounded-full hover:bg-red-500 hover:text-white ease-linear transition-all duration-150 w-fit"
                            onClick={closeModal}>
                            Close
                        </button>
                        <button className={`flex-no-shrink  px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2  border-${btnColor}-500 text-${btnColor}-500 hover:bg-${btnColor}-600 hover:text-white  rounded-full ease-linear transition-all duration-150 w-fit`}
                            onClick={handleClick}
                        >
                           {btnMessage}
                        </button>
                    </div>
                </div>
            </div>
            )

    )
}

export default PopUp