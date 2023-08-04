import  { useState } from 'react';
import { FiHome, FiBookmark, FiMail, FiSettings, FiLogOut } from 'react-icons/fi';
import { VscAccount } from 'react-icons/vsc';
import { Link, NavLink, useNavigate, } from 'react-router-dom';
import Navbar from './Navbar';
import getCurrentUser from '../utils/CurrentUser';
import { toast } from 'react-hot-toast';
import { AiOutlineLogin } from 'react-icons/ai';
import { MdNewspaper } from 'react-icons/md';
import PopUp from '../Components/Modal/PopUp';

const Sidebar = () => {
    const profileId = getCurrentUser(sessionStorage.getItem('user'))
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleSignOut = async () => {
        try {
            const userLogout = await fetch(`${process.env.REACT_APP_AUTH}/logout`);
            if (userLogout.status === 200) {
                sessionStorage.removeItem('user');
                toast.success('Sign out successfully');
                navigate('/signin');
            } else {
                toast.error('Something went wrong')
                throw new Error('Sign out failed');
            }
        } catch (error) {

            toast.error('Sign out failed');
        }
    };

    return (
        <>
            <Navbar handleSignOut={handleSignOut} />
            <aside className="fixed z-20 bottom-0 left-0 lg:fixed lg:top-10 lg:bottom-0 lg:w-1/4 lg:h-full lg:flex lg:flex-col bg-white dark:bg-gray-800 border-gray-300 lg:dark:border-white lg:border-r-2 border-t-2 w-full ">
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
                            to="/news"
                            className="text-gray-700 hover:text-purple-500 flex items-center w-full justify-between"
                        >
                            <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-10 lg:text-left">News</span>
                            <MdNewspaper className='lg:text-3xl text-xl lg:mr-10 dark:text-white' />
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
                            to='/profile'
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

                    {profileId ?
                        <li className='lg:w-3/4 lg:border lg:border-purple-500 lg:mt-10 lg:text-purple-500 ease-linear transition-all duration-150 lg:p-3  lg:hover:bg-purple-500 lg:hover:text-white
                        lg:rounded-full'>
                            <Link
                                className=" flex items-center justify-between gap-2"
                                onClick={() => setShowModal(true)}
                            >
                                <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-6">Sign out</span>
                                <FiLogOut className='lg:text-3xl text-xl lg:mr-6 dark:text-white hover:text-purple-500' />
                            </Link>
                        </li>
                        :
                        <li className='lg:w-3/4 lg:border lg:border-purple-500 lg:mt-10 lg:text-purple-500 ease-linear transition-all duration-150 lg:p-3  lg:hover:bg-purple-500 lg:hover:text-white
                        lg:rounded-full'>
                            <Link
                                to={`/signin`}
                                className=" flex items-center justify-between gap-2"
                            >
                                <span className="dark:text-white lg:text-xl lg:font-semibold text-start lg:mt-1 hidden lg:inline lg:ml-6">Sign In</span>
                                <AiOutlineLogin className='lg:text-3xl text-xl lg:mr-6 dark:text-white hover:text-purple-500' />
                            </Link>
                        </li>
                    }

                    {showModal && (
                        <PopUp
                            onClose={() => setShowModal(false)}
                            handleClick={async () => await handleSignOut()}
                            btnMessage='Logout'
                            message='Are you sure you want to logout? '
                            btnColor='red'
                            icon={<FiLogOut className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 mt-4" />}
                        />
                    )}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;

