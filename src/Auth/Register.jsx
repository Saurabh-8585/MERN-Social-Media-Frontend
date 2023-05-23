import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex justify-center">
      <div className="h-[90%] w-full md:w-3/4 m-4">
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
          <h1 className="font-semibold text-3xl text-gray-700 m-2">Sign Up</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
          <div className="">
            <input
              type="text"
              placeholder="Full Name"

              className=" bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
          </div>
          <div className="">
            <input
              type="text"
              placeholder="Username"
              className=" bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
          </div>
          <div className="">
            <input
              type="text"
              autocomplete="email"
              placeholder="Email"
              className=" bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
          </div>
          <div className="">
            <input
              type="password"
              
              placeholder="Password"
              className=" bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Confirm Password"
              className=" bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
          </div>

          {/* Additional fields can be added here */}
        </div>

        <div className="text-center mt-7">
          <button className="uppercase px-[5.4rem] md:w-72 lg:w-[340px] py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600 font-medium shadow-md hover:shadow-lg">
            Sign Up
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-5 md:mt-4 space-y-3 md:space-y-3">
          <div className="text-gray-700 font-semibold"> or </div>
          <div className="flex gap-4">
            <button className="px-4 md:px-[45px] lg:px-[70px] py-2 rounded-md text-gray-500 border flex items-center gap-6 hover:shadow-md shadow-sm" >
              <span>
                <FcGoogle
                  name="logo-google"
                  className="text-3xl"
                />
              </span>
              <span className='font-semibold'>
                Sign Up with Google
              </span>
            </button>
          </div>
        </div>

        <div className="text-center my-5 flex flex-col">
          <Link
            to="/login"
            className="text-sm font-bold text-gray-500 hover:text-purple-500 m-1"
          >
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
