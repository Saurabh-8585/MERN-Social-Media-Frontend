import React from 'react'
import { FaSignInAlt } from 'react-icons/fa'
const Navbar = () => {
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-md lg:shadow-none px-4 py-4 flex items-center justify-between z-10">
                <div className="flex items-center">
                    <div className="justify-start mr-6">
                        <div className="lg:text-3xl text-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-2">
                            Vibe
                        </div>
                    </div>
                  
                </div>
                <input
                    type="search"
                    placeholder="Search"
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none w-3/4 md:w-2/4 ml-5"/>
                <div>
                    <button className="md:flex items-center justify-center px-4 py-2 text-white font-medium rounded-md bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 hidden mr-10">
                        <FaSignInAlt className="mr-2" />
                        Sign In
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Navbar