import React, { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Avtar } from '../../utils/Avtar';

const LikeByModal = ({ users, onClose, text }) => {
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
                <div className="bg-white  shadow dark:bg-gray-700 w-80 px-4 pb-4 rounded-lg h-1/2 lg:h-5/6 overflow-y-scroll">
                    <div className="flex items-center justify-between bg-white fixed w-72 h-20 border-b border-gray-400">
                        <h2 className="text-lg font-bold">{text}</h2>
                        <div className="bg-red-600 rounded-xl font-semibold hover:bg-red-400">
                            <IoCloseSharp
                                className="text-white cursor-pointer"
                                size={24}
                                onClick={closeModal}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-24 ">
                        {
                            users.length < 1 ?
                                <div
                                    className="flex justify-between items-center border border-gray-300 w-full rounded-md px-2 py-1"
                                >
                                    <img
                                        src={Avtar}
                                        alt='followers'
                                        className="w-16 h-16 rounded-full mb-2 border border-gray-300"
                                    />
                                    <span className="text-sm font-medium ">No users found</span>
                                </div>
                                : users.map((user) => (
                                    <Link to={`/profile/${user._id}`}
                                        key={user.id}
                                        className="flex justify-between items-center border border-gray-300 w-full rounded-md px-2 py-1"
                                    >
                                        <img
                                            src={user?.userImage?.url ? user?.userImage?.url : Avtar}
                                            alt={user.username}
                                            className="w-16 h-16 rounded-full mb-2 border border-gray-300"
                                        />
                                        <span className="text-sm font-medium ">{user.username}</span>
                                    </Link>
                                ))}
                    </div>

                </div>
            </div>
        </>
    );
};

export default LikeByModal;
