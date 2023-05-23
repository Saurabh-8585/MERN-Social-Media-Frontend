import React from 'react'
// import { AiFillGoogleCircle } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="flex justify-center ">
            <div className="h-[90%] w-full md:w-3/4 m-4">
                <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
                    <h1 className="font-semibold text-3xl text-gray-700 m-2">Log In</h1>

                </div>
                <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8 ">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Email"
                            className=" bg-gray-100 rounded-lg px-7 md:px-5 py-2 focus:border border-purple-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                        />
                    </div>
                    <div className="">
                        <input
                            type="password"
                            placeholder="Password"
                            className=" bg-gray-100 rounded-lg px-7 py-2 focus:border border-purple-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                        />
                    </div>
                    <div className="flex space-x-2 -ml-28 md:-ml-40  lg:-ml-52">
                        <input className="" type="checkbox" id="checkbox" name="checkbox" />
                        <h3 className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">
                            Remember Me
                        </h3>
                    </div>

                </div>

                <div className="text-center mt-7">
                    <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600  font-medium " >
                        login
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center mt-5 md:mt-4 space-y-6 md:space-y-8 ">
                    <div className="text-gray-700 font-semibold"> or </div>
                    <div className="flex gap-4">
                        <FcGoogle
                            name="logo-google"
                            className=" border p-2 text-center m-auto text-5xl rounded-md shadow-sm cursor-pointer hover:shadow-md"
                        />
                        <FaFacebookF
                            className=" border p-2 text-center m-auto text-5xl rounded-md shadow-sm cursor-pointer hover:shadow-md text-blue-900"
                            />
                    </div>
                </div>

                <div className="text-center my-6 flex flex-col">
                    <Link 
                        to='/forgot-password'
                        className="text-sm font-medium text-gray-600 hover:text-purple-500 m-1"
                    >
                        Forgot Password ?
                    </Link>
                    <Link
                        to='/register'
                        className="text-sm font-bold text-gray-500 hover:text-purple-500 m-1"
                    >
                        Not a User? Create New Account
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Login