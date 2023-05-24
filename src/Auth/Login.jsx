import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data); // You can perform your form submission logic here
    };

    return (
        <div className="flex justify-center">
            <div className="h-[90%] w-full md:w-3/4 m-4">
                <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
                    <h1 className="font-bold text-3xl text-purple-500 ">Sign In</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
                        <div className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Email"
                                id="email"
                                autoFocus
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
                        <div className="flex  flex-col ">
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[!@#$%^&*()_\-+=<>?])(?=.*\d).+$/,
                                        message:
                                            'Password must contain at least 1 special symbol and 1 digit',
                                    },
                                })}
                                className={`bg-white border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.password ? 'border-red-500 animate-shake' : ''
                                    }`} />

                            <span className="text-red-500  text-xs ml-2 mt-1 lg:w-80 w-60 break-keep     ">{errors.password && errors.password.message}</span>

                        </div>
                        <div className="flex space-x-2 -ml-28 md:-ml-40 lg:-ml-52">
                            <input
                                className=""
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                            />
                            <h3 className="text-sm font-semibold text-gray-400 -mt-1 cursor-pointer">
                                Remember Me
                            </h3>
                        </div>
                    </div>
                    <div className="text-center mt-7">
                        <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-purple-500 hover:bg-purple-600  font-medium shadow-md hover:shadow-lg" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="flex flex-col justify-center items-center mt-5 md:mt-4 space-y-3 md:space-y-3">
                    <div className="text-gray-700 font-semibold"> or </div>
                    <div className="flex gap-4 ">
                        <button className="px-6 md:px-[45px] lg:px-[70px] py-2 rounded-md text-gray-500 border flex items-center gap-6 hover:shadow-md shadow-sm">
                            <span>
                                <FcGoogle name="logo-google" className="text-3xl" />
                            </span>
                            <span className="font-semibold">Sign in with Google</span>
                        </button>
                    </div>
                </div>
                <div className="text-center my-6 flex flex-col">
                    <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-gray-600 hover:text-purple-500 m-1"
                    >
                        Forgot Password ?
                    </Link>
                    <Link
                        to="/SignUp"
                        className="text-sm font-bold text-gray-500 hover:text-purple-500 m-1"
                    >
                        Not a User? Create New Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
