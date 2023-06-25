import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const LikeByModal = ({ users, onClose }) => {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'
                    }`}
                onClick={closeModal}
            >
                <div className="bg-white w-80 px-4 pb-4 rounded-lg h-1/2 lg:h-5/6 overflow-y-scroll">
                    <div className="flex items-center justify-between bg-white fixed w-72 h-20 border-b border-gray-400">
                        <h2 className="text-lg font-bold">Liked By</h2>
                        <div className="bg-red-600 rounded-xl font-semibold hover:bg-red-400">
                            <IoCloseSharp
                                className="text-white cursor-pointer"
                                size={24}
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-24">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex justify-between items-center border border-gray-300 w-full rounded-md px-2 py-1"
                            >
                                <img
                                    src="https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg"
                                    alt={user.username}
                                    className="w-16 h-16 rounded-full mb-2"
                                />
                                <span className="text-sm">{user.username}</span>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default LikeByModal;
