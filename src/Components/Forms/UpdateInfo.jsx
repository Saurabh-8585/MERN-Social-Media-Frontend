import React, { useEffect, useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { MdOutlineImage } from 'react-icons/md';
import { useGetProfileQuery, useUpdateUserMutation } from '../../features/user/UserServices';
import getCurrentUser from '../../utils/CurrentUser';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const UpdateInfo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const user = getCurrentUser(sessionStorage.getItem('user'))
    const { data } = useGetProfileQuery(user)
    const [updateUser, { isError, error, data: data1, isLoading }] = useUpdateUserMutation()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        about: ''
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (data?.userInfo) {
            setUserData({
                username: data.userInfo.username,
                email: data.userInfo.email,
                about: data.userInfo.about,
                userImage: data.userInfo.userImage.url
            });
        }
    }, [data]);

    const handleOnchange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

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




    const onSubmit = async (e) => {
        e.preventDefault()
        const { username, email, about } = userData;
        const data = { user, username, email, about, selectedFile }
        // console.log(data);
        const response = await updateUser(data);
        if (response.error) {
            toast.error(response.error);
        }
        else {
            toast.success(response.data.message);
        }

    }

    return (
        <>
            <form className='flex flex-col justify-center' onSubmit={onSubmit}>
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
                        name="username"
                        id="username"
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer'
                        value={userData.username}
                        onChange={handleOnchange}

                    />

                    <label
                        htmlFor="username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Username
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer'
                        value={userData.email}
                        onChange={handleOnchange}

                        autoComplete="email"
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>

                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea
                        name="about"
                        id="about"
                        className="block pt-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer resize"
                        placeholder=" "
                        value={userData?.about}
                        onChange={handleOnchange}
                    />
                    <label
                        htmlFor="about"
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
;



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