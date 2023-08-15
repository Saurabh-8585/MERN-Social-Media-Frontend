import  { useState } from 'react';
import { AiOutlineLogin } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { Link, } from 'react-router-dom';
import { useGetAllUsersQuery } from '../features/user/UserServices'
import Avatar from '../assets/Avatar.png';
import getCurrentUser from '../utils/CurrentUser';
import PopUp from '../Components/Modal/PopUp';
import Switcher from '../utils/Switcher';
const Navbar = ({ handleSignOut }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([])
    const [showModal, setShowModal] = useState(false);
    const { data } = useGetAllUsersQuery()
    const isUser = getCurrentUser(sessionStorage.getItem('user'))

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        let search = (e.target.value).toLowerCase().replace(/\s/g, '');
        const newFilteredData = data.filter((user) =>
            user?.username.toLowerCase().replace(/\s/g, '').includes(search) ||
            (user?.about && user?.about.toLowerCase().replace(/\s/g, '').includes(search))
        );
        setFilteredData(newFilteredData)
    };

    return (
        <>
            <nav className="fixed bg-white dark:bg-gray-800 border-gray-300 dark:border-white top-0 left-0 right-0  shadow-md  border-b  lg:shadow-none px-2 py-4 flex items-center justify-around z-50">
                <div className="flex items-center">
                    <div className="justify-start mr-6 lg:ml-32">
                        <Link
                            className="lg:text-3xl text-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg p-2"
                            to="/"
                        >
                            Snapia
                        </Link>
                    </div>
                </div>

                <div className="relative flex items-center md:w-1/2 w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 transition-colors duration-300 w-full"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-500" />
                    </div>
                          
                    {searchTerm && (
                        <ul className="absolute top-12 w-full bg-white border border-gray-300 dark:bg-gray-800 rounded-md shadow-md">
                            {filteredData.map((user) => (
                                <Link to={`/profile/${user._id}`} key={user._id} onClick={() => setSearchTerm('')}>
                                    <li className="md:px-10 px-2 py-2 hover:bg-gray-100 hover:dark:bg-gray-500 cursor-pointer flex items-center justify-between" >
                                        <img
                                            className="h-10 w-10 rounded-full border"
                                            src={user?.userImage?.url ? user?.userImage?.url : Avatar}
                                            alt="User_Profile"
                                        />
                                        <span className='text-gray-500 dark:text-gray-400 font-semibold text-start'>
                                            {user.username}
                                        </span>
                                    </li>
                                </Link>
                            ))}
                            {filteredData.length === 0 &&
                                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                                    <img
                                        className="h-10 w-10 rounded-full border"
                                        src={Avatar}
                                        alt="User_Profile"
                                    />
                                    <span className='text-gray-500 dark:text-gray-400 font-semibold text-start'>
                                        User not found
                                    </span>
                                </li>
                            }
                        </ul>
                    )}
                </div>

                <Switcher />
                {isUser ? (
                    <button
                        className="md:flex items-center justify-center px-4 py-2  font-medium rounded-md bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 focus:outline-none hidden"
                        onClick={() => setShowModal(true)}
                    >
                        <FiLogOut className="mr-2 font-bold " />
                        Sign Out
                    </button>
                ) : (
                    <Link to="/signin">
                            <button className="md:flex items-center justify-center px-4 py-2  font-medium rounded-md bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 focus:outline-none hidden  ">
                            <AiOutlineLogin className="mr-2 font-bold" />
                            Sign In
                        </button>
                    </Link>
                )}
            </nav>
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
        </>
    );
};

export default Navbar;
