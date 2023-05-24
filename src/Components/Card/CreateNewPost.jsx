import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { MdOutlineImage, MdOutlineImageNotSupported } from 'react-icons/md'

const CreateNewPost = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setImage(URL.createObjectURL(file));
        console.log('Selected file:', file);
    };

    const addPost = () => {
        const fetchData = async () => {
            const req = await fetch('https://jsonplaceholder.typicode.com/todos')
            const res = await req.json()
            console.log(res);
        }
        const myPromise = fetchData();

        toast.promise(myPromise, {
            loading: 'Loading',
            success: 'Posted Successfully',
            error: 'Something went wrong',
        });
    }

    return (
        <>

            <div className="p-5 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
                    <div className="flex justify-between">
                        <img
                            className="h-11 w-11 rounded-full"
                            src="https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg"
                            alt=''
                        />
                        <div className="flex items-center">
                            <div className="flex-1 px-2 pt-2 my-4">
                                <textarea
                                    className="bg-transparent text-gray-400 font-medium text-lg w-full outline-none"
                                    rows={2}
                                    cols={50}
                                    placeholder="What's happening?"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                        {/* {<FaRegCommentAlt/>} */}
                    </div>

                    <div className="flex">
                        {/* <div className="w-10" /> */}
                        <div className="w-full lg:w-64 px-1">
                            <div className="flex items-center">

                                <div className="flex-1 text-center py-2 m-2">
                                    {!image ?
                                        <>
                                            <label title='Add Photo' htmlFor="fileInput" className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-purple-300 cursor-pointer">
                                                <MdOutlineImage className="text-center text-xl" />
                                            </label>
                                            <input
                                                id="fileInput"
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleFileSelect}
                                            />
                                        </>
                                        :
                                        <span title='Remove Photo' className="mt-1 group cursor-pointer flex items-center text-red-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-red-300" onClick={() => setImage(null)}>
                                            <MdOutlineImageNotSupported className="text-center text-xl" />
                                        </span>
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="flex-1 ">
                            <button className="bg-purple-500 mt-5 hover:bg-purple-600 text-white font-bold py-2 px-5 md:px-8 rounded-full mr-8 float-right shadow-md" onClick={addPost}>
                                Post
                            </button>
                        </div>
                    </div>
                    {image && <img
                        className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                        src={image}
                        alt='user_image'
                    />}
                    {/* <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                    10:05 AM · Dec 19, 2020
                </p>
                <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-2">
                    <div className="flex items-center mr-4">
                        {<AiOutlineHeart className='text-purple-400 hover:text-purple-300 text-xl' />}
                        <span className="ml-2">615</span>
                    </div>
                    <div className="flex items-center mr-4 ">
                        {<FaRegCommentAlt className='text-purple-400 hover:text-purple-300 text-xl' />}
                        <span className="ml-2">93 </span>
                    </div>
                    <div className="flex items-center mr-4 justify-center">
                        {<FiBookmark className='text-purple-400 hover:text-purple-300 text-xl' />}
                    </div>
                    <div className="flex items-center mr-6 justify-center">
                        {<AiOutlineShareAlt className='text-purple-400 hover:text-purple-300 text-xl' />}
                    </div>
                </div> */}
                </div>
            </div></>
    )
}

export default CreateNewPost