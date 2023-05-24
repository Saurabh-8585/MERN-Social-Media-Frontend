import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can perform your form submission logic here
  };
  const password = watch('password');
  // const confirmPassword = watch('confirmPassword');
  return (
    <div className="flex justify-center">
      <div className="h-[90%] w-full md:w-3/4 m-4">
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
          <h1 className="font-bold text-3xl text-purple-500  m-2">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
            <div className="flex flex-col">
              <input
                type="text"
                autoFocus
                placeholder="Full Name"
                autoComplete="name"
                {...register('fullName', {
                  required: 'Full Name is required',
                })}
                className={`bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.fullName ? 'border-red-500 animate-shake' : ''
                  }`}
              />
              <span className="text-red-500 text-xs ml-2 mt-1">
                {errors.fullName && errors.fullName.message}
              </span>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Username"
                autoComplete="username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 6,
                    message: 'Username must be at least 6 characters long',
                  },
                })}
                className={`bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.username ? 'border-red-500 animate-shake' : ''
                  }`}
              />
              <span className="text-red-500 text-xs ml-2 mt-1">
                {errors.username && errors.username.message}
              </span>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email',
                  },
                })}
                autoComplete="email"
                className={`bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.email ? 'border-red-500 animate-shake' : ''
                  }`} />

              <span className="text-red-500 ml-2 mt-1 text-xs">{errors.email && errors.email.message}</span>
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[!@#$%^&*()_\-+=<>?])(?=.*\d).+$/,
                    message: 'Password must contain at least 1 special symbol and 1 digit',
                  },
                })}
                className={`bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.password ? 'border-red-500 animate-shake' : ''
                  }`}
              />
              <span className="text-red-500 text-xs ml-2 mt-1 lg:w-80 w-60 break-keep">
                {errors.password && errors.password.message}
              </span>
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className={`bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.confirmPassword ? 'border-red-500 animate-shake' : ''
                  }`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs ml-2 mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>


            {/* Additional fields can be added here */}
          </div>
          <div className="text-center mt-7">
            <button className="uppercase px-[5.4rem] md:w-72 lg:w-[340px] py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600 font-medium shadow-md hover:shadow-lg" type='submit'>
              Sign Up
            </button>
          </div>
        </form>
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
            to="/SignIn"
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
