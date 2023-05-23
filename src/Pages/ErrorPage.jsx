import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex-col space-y-4 text-left px-6">
                    <div className="text-7xl font-bold text-purple-500">404</div>
                    <div className="text-stone-500 font-medium">
                        Oops, you still haven't found what you lookng for?
                    </div>
                    <div className="flex space-x-4 items-center justify-start">
                        <Link to="/">
                            <div className="bg-purple-500 px-4 py-2 text-white font-medium border-2   hover:scale-105 cursor-pointer rounded-lg">
                                <AiFillHome />
                            </div>
                        </Link>
                        <Link to="/">
                            <div className="text-sm font-medium text-stone-500 underline text-purple-500">
                                Back to Home Page
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ErrorPage