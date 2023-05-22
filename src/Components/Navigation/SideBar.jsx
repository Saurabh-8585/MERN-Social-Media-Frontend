import React from 'react';
import { FiHome, FiHash, FiBell, FiMail, FiBookmark, FiUser } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

const Sidebar = () => {
    return (
        <>
          <Navbar/>
            <nav className="fixed bottom-0 left-0 lg:fixed  lg:top-10 lg:bottom-0 lg:w-24 lg:h-full lg:flex lg:flex-col bg-white border-t border-2 w-screen ">
                <ul className="flex justify-around py-2 lg:flex-col lg:justify-start lg:items-center lg:h-screen lg:gap-6 ">
                    <li >
                        <NavLink
                            exact
                            to="/"
                            activeClassName="text-purple-500"
                            className="text-gray-700 hover:text-purple-500 ur-500 flex flex-col md:flex-r items-center justify-center lg:mt-10"
                        >
                            <FiHome className='lg:text-3xl text-xl' />
                            <span className="lg:text-md lg:mt-1 text-xs">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/explore"
                            activeClassName="text-purple-500"
                            className="text-gray-700 hover:text-purple-500 flex flex-col items-center justify-center"
                        >
                            <FiHash className='lg:text-3xl text-xl' />
                            <span className="lg:text-md lg:mt-1 text-xs">Explore</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/notifications"
                            activeClassName="text-purple-500"
                            className="text-gray-700 hover:text-purple-500 flex flex-col items-center justify-center"
                        >
                            <FiBell className='lg:text-3xl text-xl' />
                            <span className="lg:text-md lg:mt-1 text-xs">Notifications</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/messages"
                            activeClassName="text-purple-500"
                            className="text-gray-700 hover:text-purple-500 flex flex-col items-center justify-center"
                        >
                            <FiMail className='lg:text-3xl text-xl' />
                            <span className="lg:text-md lg:mt-1 text-xs">Messages</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bookmarks"
                            activeClassName="text-purple-500"
                            className="text-gray-700 hover:text-purple-500 flex flex-col items-center justify-center"
                        >
                            <FiBookmark className='lg:text-3xl text-xl' />
                            <span className="lg:text-md lg:mt-1 text-xs">Bookmarks</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/profile"
                            activeClassName="text-purple-500"
                            className="text-gray-700 hover:text-purple-500 flex flex-col items-center justify-center"
                        >
                            <FiUser className='lg:text-3xl text-xl' />
                            <span className="lg:text-md lg:mt-1 text-xs">Profile</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;
