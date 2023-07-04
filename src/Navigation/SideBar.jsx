import React from 'react';
import { FiHome, FiBookmark, FiMail, FiUser, FiSettings } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import getCurrentUser from '../utils/CurrentUser';

const Sidebar = () => {
    const user = sessionStorage.getItem('user')
    const profileId = getCurrentUser(user)

    return (
        <>
            <Navbar />
            <nav className="fixed z-30 bottom-0 left-0 lg:fixed lg:top-10 lg:bottom-0 lg:w-1/4 lg:h-full lg:flex lg:flex-col bg-white dark:bg-gray-800 border-gray-300 lg:dark:border-white lg:border-r-2 border-t-2 w-full ">
                <ul className="flex justify-around py-4 lg:flex-col lg:justify-start lg:items-center lg:h-screen lg:gap-8 lg:py-2 lg:mt-10">
                    <li className='lg:w-3/4'>
                        <NavLink
                          
                            to="/"
                            className="text-gray-700 hover:text-purple-500 flex items-center justify-between lg:mt-10"
                        >
                            <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-10">Home</span>
                            <FiHome className='dark:text-white lg:text-3xl text-xl lg:mr-10' />
                        </NavLink>
                    </li>

                    <li className='lg:w-3/4'>
                        <NavLink
                            to="/bookmarks"
                            className="text-gray-700 hover:text-purple-500 flex items-center w-full justify-between"
                        >
                            <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-10 lg:text-left">Bookmarks</span>
                            <FiBookmark className='lg:text-3xl text-xl lg:mr-10 dark:text-white' />
                        </NavLink>
                    </li>
                    <li className='lg:w-3/4'>
                        <NavLink
                            to="/messages"
                            className="text-gray-700 hover:text-purple-500 flex items-center justify-between"
                        >
                            <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-10">Messages</span>
                            <FiMail className='dark:text-white lg:text-3xl text-xl lg:mr-10' />
                        </NavLink>
                    </li>

                    <li className='lg:w-3/4'>

                        <NavLink
                            to={`/profile/${profileId}`}
                            className="text-gray-700 hover:text-purple-500 flex items-center justify-between"
                        >
                            <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-10">Profile</span>
                            <VscAccount className='lg:text-3xl text-xl lg:mr-10 dark:text-white' />
                        </NavLink>
                    </li>
                    <li className='lg:w-3/4'>

                        <NavLink
                            to={`/settings`}
                            className="text-gray-700 hover:text-purple-500 flex items-center justify-between"
                        >
                            <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-10">Settings</span>
                            <FiSettings className='lg:text-3xl text-xl lg:mr-10 dark:text-white' />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;

