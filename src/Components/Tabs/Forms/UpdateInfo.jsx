import React, { useEffect, useState } from 'react';
import { AiOutlineSave } from 'react-icons/ai';
import { BiImageAdd } from 'react-icons/bi';
import { MdOutlineHideImage, MdOutlineImage, MdOutlineLocationOn } from 'react-icons/md';
import { useGetProfileQuery, useUpdateUserMutation } from '../../../features/user/UserServices';
import getCurrentUser from '../../../utils/CurrentUser';
import { toast } from 'react-hot-toast';
import Avtar from '../../../assets/Avatar.png';

const UpdateInfo = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const user = getCurrentUser(sessionStorage.getItem('user'))
    const { data } = useGetProfileQuery(user)
    const [updateUser] = useUpdateUserMutation()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        about: '',
        userImageId: '',
        location: '',
        website: ''
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (data?.userInfo) {
            setUserData({
                username: data.userInfo?.username,
                email: data.userInfo?.email,
                about: data.userInfo?.about,
                location: data.userInfo?.location,
                website: data.userInfo?.website,
                userImageId: data.userInfo?.userImage?.public_id
            });
            setImage(data.userInfo?.userImage?.url)
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

    const handleRemovePhoto = () => {
        setImage(null)
        setSelectedFile(null);
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const { username, email, about, location, website } = userData;

        if (!username || !email) {
            toast.error('Username and email are mandatory')
        }
        else {
            const updateProfileToast = toast.loading('Updating...');


            const data = { user, username, email, about, selectedFile, image, location, website }
            const response = await updateUser(data);
            if (response.error) {
                toast.error(response.error, { id: updateProfileToast });
            }
            else {
                toast.success(response.data.message, { id: updateProfileToast });
            }
        }

    }

    const getLocation = () => {
        const loadingToastId = toast.loading('Fetching location...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        toast.error('Error fetching location');
                    }
                    const data = await response.json();
                    console.log({data});
                    const location = `${data?.address?.['ISO3166-2-lvl4'].toUpperCase()} ,${data?.address?.state_district}`;
                    setUserData({ ...userData, location });
                    toast.success(`Location fetched successfully! `, { id: loadingToastId });
                } catch (error) {
                    toast.error('Error while fetching location', { id: loadingToastId });
                }
            },
            (error) => {
                toast.error('Error while getting geolocation', { id: loadingToastId });
            }
        );
    };

    return (
        <>
            <form className='flex flex-col justify-center' onSubmit={onSubmit}>

                <div className=" my-5 flex items-center justify-around flex-wrap gap-4">
                    {image ?
                        <>
                            <img
                                src={image}
                                alt="UserPhoto"
                                className="h-48 w-48 rounded-full border p-1"
                            />
                            <div className="flex justify-center items-center flex-row  gap-4">

                                <label className="text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-around gap-3 cursor-pointer">
                                    <span className="text-lg font-semibold hidden md:block">Change</span>
                                    <MdOutlineImage className="text-2xl font-bold" />
                                    <input
                                        type="file"

                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                    />
                                </label>
                                <button
                                    className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex justify-center items-center gap-4"
                                    onClick={handleRemovePhoto}
                                >
                                    <span className='text-lg font-semibold hidden md:block'> Remove</span>
                                    <MdOutlineHideImage className='text-2xl font-bold' />
                                </button>

                            </div>
                        </>
                        : <>
                            <div className="flex justify-center items-center flex-col md:flex-md gap-4">
                                <img
                                    src={Avtar}
                                    alt="UserPhoto"
                                    className="h-48 w-48 rounded-full"
                                />

                                <label className="text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex items-center justify-around gap-3">
                                    <span className="text-lg font-semibold hidden md:block cursor-pointer">Upload</span>
                                    <BiImageAdd className="text-2xl font-bold" />
                                    <input
                                        type="file"

                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                    />
                                </label>
                            </div>
                        </>
                    }
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="username"
                        
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
                <div className="flex  mb-6">
                    <input
                        type="text"
                        name="location"
                        placeholder='Country, City'
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        value={userData?.location}
                        onChange={handleOnchange}
                    />

                    <button
                        type="button"
                        className="border border-purple-500 text-purple-500 hover:bg-purple-600 hover:text-white flex items-center font-bold py-2 px-3 ease-linear transition-all duration-150 rounded-full gap-2"
                        onClick={getLocation}
                    >   <span className='text-lg font-semibold'> Get</span>
                        <MdOutlineLocationOn className="text-2xl font-bold  " />
                    </button>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="website"

                        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer'
                        value={userData.website}
                        onChange={handleOnchange}

                        autoComplete="email"
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Website
                    </label>

                </div>
                <button
                    type="submit"
                    className="border border-purple-500 text-purple-500 hover:bg-purple-600 hover:text-white flex justify-center gap-4 items-center font-bold py-2 px-4  ease-linear transition-all duration-150 rounded-lg"
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