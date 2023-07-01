import React from 'react'
import { AiOutlineLogin } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const Navbar = () => {
    const isLogin = sessionStorage.getItem('user');
    const navigate = useNavigate()
    const handleSignOut = () => {
        sessionStorage.removeItem('user')
        toast.success('Sign out successfully')
        navigate('/')
    }
    return (
        <>
            <nav className="fixed bg-white dark:bg-gray-800 border-gray-300 dark:border-white top-0 left-0 right-0  shadow-md  border-b  lg:shadow-none px-4 py-4 flex items-center justify-between z-50  ">
                <div className="flex items-center">
                    <div className="justify-start mr-6 lg:ml-32">
                        <Link className="lg:text-3xl text-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg p-2" to='/'>
                            Snapia
                        </Link>
                    </div>

                </div>
                <input
                    type="search"
                    placeholder="Search.."
                    className="border border-purple-300 rounded-md px-2 py-1 focus:outline-none focus:border-purple-500 w-3/4 md:w-2/4 ml-5"
                />

                {isLogin ?
                    <button className="md:flex items-center justify-center px-4 py-2 text-white font-medium rounded-md bg-purple-500 hover:bg-purple-600 focus:outline-none   hidden mr-10" onClick={handleSignOut}>
                        <FiLogOut className="mr-2 font-bold " />
                        Sign Out
                    </button>

                    : <Link to='/SignIn'>
                        <button className="md:flex items-center justify-center px-4 py-2 text-white font-medium rounded-md bg-purple-500 hover:bg-purple-600 focus:outline-none hidden mr-10 ">
                            <AiOutlineLogin className="mr-2 font-bold" />
                            Sign In
                        </button>
                    </Link>}
            </nav>
        </>
    )
}

export default Navbar