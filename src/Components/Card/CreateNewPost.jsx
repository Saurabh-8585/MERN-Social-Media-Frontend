import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdOutlineImage, MdOutlineImageNotSupported } from 'react-icons/md';
import { useCreatePostMutation } from '../../features/post/PostServices'
import LoadingSpinner from '../Loader/LoadingSpinner';
const CreateNewPost = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [createPost, { isLoading, isError, error, isSuccess }] = useCreatePostMutation();



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

        try {
            const data = { content, image: selectedFile };

            const promise = createPost(data);
            toast.promise(promise, {
                loading: 'Posting...',
                success: 'Posted',
                error: 'Failed to create post',
            });

            const response = await promise;
            setContent('');
            setImage(null);
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
                            <img
                                className="h-11 w-11 rounded-full"
                                src="https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg"
                                alt=""
                            />
                            <div className="flex items-center">
                                <div className="flex-1 px-2 pt-2 my-4">
                                    <textarea
                                        className="bg-transparent text-gray-400 font-medium text-lg w-full outline-none"
                                        rows={2}
                                        cols={50}
                                        placeholder="What's happening?"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex">
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
                                    className="bg-purple-500 mt-5 hover:bg-purple-600 text-white font-bold py-2 px-5 md:px-8 rounded-full mr-8 float-right shadow-md"
                                    type="submit"
                                    onClick={addPost}
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

        </>
    );
};

export default CreateNewPost;
