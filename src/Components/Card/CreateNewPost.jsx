import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdOutlineImage, MdOutlineImageNotSupported } from 'react-icons/md';
import { RiMapPin2Line, RiCloseLine } from 'react-icons/ri';
import { useCreatePostMutation } from '../../features/post/PostServices'
import Location from '../Modal/Location';
const CreateNewPost = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [createPost] = useCreatePostMutation();
    const [postLocation, setPostLocation] = useState('')


    const user = sessionStorage.getItem('user');

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        }
        setSelectedFile(file);
    };


    const addPost = async (e) => {
        e.preventDefault();

        if (!user) {
            return toast.error('Please login to add a post');
        }

        if (!content) {
            return toast.error('Add some text');
        }

        const createPostToast = toast.loading('Posting...');
        try {
            const data = { content, image: selectedFile,postLocation };

            const response = await createPost(data);
            if (response.error) {
                toast.error(response.error, { id: createPostToast });
            }
            else {
                toast.success('Posted', { id: createPostToast });
            }

            setContent('');
            setImage(null);
            setSelectedFile(null)
            setPostLocation('')
        } catch (error) {
            console.log(error);
            toast.error('Failed to create post');
        }
    };



    return (
        <>
            <div className="p-5 flex items-center justify-center  w-full">
                <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-800 p-4 rounded-xl border w-full max-w-xl shadow-sm hover:shadow-md">
                    <form onSubmit={addPost}>
                        <div className="flex justify-between">
                            <div className="flex items-start flex-col justify-start">
                                <div className="flex-1 px-2 pt-2 my-4">
                                    <textarea
                                        className="bg-transparent text-gray-600 font-medium text-lg w-full outline-none"
                                        rows={3}
                                        cols={50}
                                        placeholder="What's happening?"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                {postLocation && <span className="px-4 py-2 w-fit flex items-center ml-5 text-base rounded-full text-white bg-purple-500">
                                    <RiMapPin2Line size={20} className="mr-2" />
                                    {postLocation}
                                    <button className="bg-transparent hover" onClick={()=>setPostLocation('')}>
                                        <RiCloseLine className="ml-4 text-lg" />
                                    </button>
                                </span>}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="w-full lg:w-64 px-1">
                                <div className="flex items-center">
                                    <div className="flex-1 text-center py-2 m-2">
                                        {!image ? (
                                            <>
                                                <label
                                                    title="Add Photo"
                                                    htmlFor="fileInput"
                                                    className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-purple-300 cursor-pointer"
                                                >
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
                                        ) : (
                                            <span
                                                title="Remove Photo"
                                                className="mt-1 group cursor-pointer flex items-center text-red-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-red-300"
                                                onClick={() => setImage(null)}
                                            >
                                                <MdOutlineImageNotSupported className="text-center text-xl" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <button
                                    className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 mt-5 font-bold py-2 px-3 md:px-6 rounded-full   shadow-md  ease-linear transition-all duration-150 flex items-center justify-around gap-2"
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                >
                                    Add
                                    <RiMapPin2Line className='text-md font-semibold' />
                                </button>
                            </div>
                            <div className="flex-1">
                                <button
                                    className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 mt-5 font-bold py-2 px-5 md:px-8 rounded-full  shadow-md  ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Post
                                </button>
                            </div>

                        </div>
                    </form>
                    {image && (
                        <img
                            className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 flex m-auto"
                            src={image}
                            alt="user_image"
                        />
                    )}
                </div>
            </div>
            {
                showModal &&
                <Location
                    onClose={() => setShowModal(false)}
                    setPostLocation={setPostLocation}
                    postLocation={postLocation}
                />

            }
        </>
    );
};

export default CreateNewPost;
