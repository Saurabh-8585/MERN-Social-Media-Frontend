import React, { useEffect, useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineImage } from 'react-icons/md';
import { useGetProfileQuery } from '../../features/user/UserServices';
import getCurrentUser from '../../utils/CurrentUser';
import { useForm } from 'react-hook-form';

const UpdateInfo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const user = getCurrentUser(sessionStorage.getItem('user'))
    const { data } = useGetProfileQuery(user)

    const [image, setImage] = useState(null);
    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
        setSelectedFile(file);
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (info) => {
        console.log(info);
    }

    return (
        <>
            <form className='flex flex-col justify-center' onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2 flex items-center justify-center">
                    <label htmlFor="photo" className="h-48 w-48 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer">
                        <input
                            type="file"
                            id="photo"
                            className="sr-only"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                        />
                        {image ? (
                            <img
                                src={image}
                                alt="UserPhoto"
                                className="h-48 w-48 rounded-full"
                            />
                        ) : (
                            <BiUserCircle className="h-32 w-32 text-gray-500" aria-hidden="true" />
                        )}
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_username"
                        id="floating_username"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer ${errors.username ? 'border-red-500 animate-shake' : ''}`}
                        defaultValue={data?.userInfo?.username}
                        {...register('username', {
                            required: 'Username is required',
                            minLength: {
                                value: 6,
                                message: 'Username must be at least 6 characters long',
                            },
                        })}
                    />
                    {errors.username && <span className="text-red-500 ml-2 mt-1 text-xs">{errors.username.message}</span>}
                    <label
                        htmlFor="floating_username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Username
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="email"
                        name="floating_email"
                        id="floating_email"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer ${errors.email ? 'border-red-500 animate-shake' : ''}`}
                        defaultValue={data?.userInfo?.email}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email',
                            },
                        })}
                        autoComplete="email"
                    />
                    <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                    {errors.email && <span className="text-red-500 ml-2 mt-1 text-xs">{errors.email.message}</span>}
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea
                        name="floating_textarea"
                        id="floating_textarea"
                        className="block pt-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer resize"
                        placeholder=" "
                        defaultValue={data?.userInfo?.email}
                    />
                    <label
                        htmlFor="floating_textarea"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        About
                    </label>
                </div>

                <button
                    type="submit"
                    className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800 flex justify-center items-center gap-4"
                >
                    <span className='text-lg font-semibold'> Save</span>
                    <AiOutlineSave className='text-2xl font-bold' />
                </button>
            </form>

        </>
    );
};

export default UpdateInfo;



{/* <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="floating_password"
                        id="floating_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        placeholder=" "
                        required=""
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="repeat_password"
                        id="floating_repeat_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        placeholder=" "
                        required=""
                    />
                    <label
                        htmlFor="floating_repeat_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Confirm password
                    </label>
                </div> */}