import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdOutlineImage, MdOutlineImageNotSupported } from 'react-icons/md';
import { RiMapPin2Line, RiCloseLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { useCreatePostMutation } from '../../features/post/PostServices';
import Location from '../Modal/Location';
import { RiGeminiFill } from "react-icons/ri";
import { lengths, styles, tones } from '../../Constants/AIPostWriter';

const AIGenerationModal = ({ onClose, onGeneratePost }) => {
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedTone, setSelectedTone] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [shortIdea, setShortIdea] = useState('');

    const handleGeneratePost = () => {
        if (!selectedStyle || !selectedTone || !selectedLength || !shortIdea) {
            toast.error('Please select all options and provide a short idea');
            return;
        }
        onGeneratePost(selectedStyle, selectedTone, selectedLength, shortIdea);
        onClose();
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg max-w-md w-[90%] text-sm leading-tight">
                <h2 className="text-xl  text-black dark:text-white font-bold block mb-4">Generate Post with AI</h2>

                {/* Short Idea Input */}
                <div className="mb-5">
                    <h3 className="text-md text-black dark:text-white font-bold block">Short Idea</h3>
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md "
                        placeholder="Enter a short idea for the post"
                        value={shortIdea}
                        onChange={(e) => setShortIdea(e.target.value)}
                    />
                </div>

                {/* Style Dropdown */}
                <div className="mb-5">
                    <h3 className="text-md text-black dark:text-white font-bold block">Post Style</h3>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedStyle}
                        onChange={(e) => setSelectedStyle(e.target.value)}
                    >
                        <option value="">Select a style</option>
                        {styles.map((style, index) => (
                            <option key={index} value={style}>
                                {style}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tone Dropdown */}
                <div className="mb-5">
                    <h3 className="text-md text-black dark:text-white font-bold block">Post Tone</h3>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedTone}
                        onChange={(e) => setSelectedTone(e.target.value)}
                    >
                        <option value="">Select a tone</option>
                        {tones.map((tone, index) => (
                            <option key={index} value={tone}>
                                {tone}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Length Dropdown */}
                <div className="mb-5">
                    <h3 className="text-md text-black dark:text-white font-bold block">Post Length</h3>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedLength}
                        onChange={(e) => setSelectedLength(e.target.value)}
                    >
                        <option value="">Select length</option>
                        {lengths.map((length, index) => (
                            <option key={index} value={length}>
                                {length}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-purple-500 text-white px-4 py-2 rounded-full"
                        onClick={handleGeneratePost}
                    >
                        Generate Post
                    </button>
                    <button
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const CreateNewPost = () => {
    const [showModal, setShowModal] = useState(false);
    const [showAIModal, setShowAIModal] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');
    const [createPost] = useCreatePostMutation();
    const [postLocation, setPostLocation] = useState('');

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
            return toast.error('Add some text or generate content');
        }

        const createPostToast = toast.loading('Posting...');
        try {
            const data = { content: content, image: selectedFile, postLocation };

            const response = await createPost(data);
            if (response.error) {
                toast.error(response.error, { id: createPostToast });
            } else {
                toast.success('Posted', { id: createPostToast });
            }

            setContent('');
            setImage(null);
            setSelectedFile(null);
            setPostLocation('');
        } catch (error) {
            console.log(error);
            toast.error('Failed to create post');
        }
    };

    const addLocation = () => {
        if (!user) {
            return toast.error('Please login to add post');
        }
        setShowModal(true);
    };

    const handleGeneratePost = async (style, tone, length, shortIdea) => {
        if (!user) {
            return toast.error('Please login to add a post');
        }
        const createAICaptionToast = toast.loading('Generating...');

        const reqData = {
            style: style,
            tone: tone,
            length: length,
            shortIdea: shortIdea,
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_POST}/generate_post_with_ai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
                body: JSON.stringify(reqData),

            });

            const data = await res.json();
            if (res.ok) {
                toast.success('Generated', { id: createAICaptionToast });
                setContent(data.data)
                setShowAIModal(false)

            } else {
                console.error('Error generating post:', data.message);
                throw new Error(data.message || 'Failed to generate post');
            }
        } catch (error) {
            console.error('Error in handleGeneratePost:', error);
            toast.error('Failed to generate caption', { id: createAICaptionToast });

        }
    };


    return (
        <>
            <div className="p-5 flex items-center justify-center w-full">
                <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-800 p-4 rounded-xl w-full max-w-xl shadow-sm hover:shadow-md">
                    <form onSubmit={addPost}>
                        <div className="flex flex-col">
                            <textarea
                                className="bg-transparent text-gray-600 font-medium text-lg w-full outline-none dark:text-gray-50"
                                rows={3}
                                placeholder="What's happening?"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            {postLocation && (
                                <span className="flex items-center px-4 py-2 text-xs rounded-full text-white bg-purple-500 mt-2">
                                    <RiMapPin2Line className="mr-2" />
                                    {postLocation}
                                    <button
                                        className="ml-4 text-lg"
                                        onClick={() => setPostLocation('')}
                                    >
                                        <RiCloseLine />
                                    </button>
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2 mt-4 justify-end">
                            {/* Image Button */}
                            {!image ? (
                                <label
                                    htmlFor="fileInput"
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white cursor-pointer hover:bg-purple-400"
                                    title="Add Photo"
                                >
                                    <MdOutlineImage className="text-xl" />
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </label>
                            ) : (
                                <div
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-purple-500 text-purple-500 bg-transparent cursor-pointer hover:text-purple-400"
                                    title="Remove Photo"
                                    onClick={() => {
                                        setImage(null);
                                        setSelectedFile(null);
                                    }}
                                >
                                    <MdOutlineImageNotSupported className="text-xl" />
                                </div>
                            )}

                            {/* Location Button */}
                            <button
                                type="button"
                                className="flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full hover:bg-purple-400"
                                onClick={addLocation}
                                title="Add Location"
                            >
                                <RiMapPin2Line className="text-xl" />
                            </button>

                            {/* AI Generation Button */}
                            <button
                                type="button"
                                className="flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full hover:bg-purple-400"
                                onClick={() => setShowAIModal(true)}
                                title="Generate Post with AI"
                            >
                                <RiGeminiFill className="text-xl" />
                            </button>

                            {/* Post Button */}
                            <button
                                type="submit"
                                className="flex items-center justify-center w-10 h-10 bg-purple-500 text-white rounded-full hover:bg-purple-400"
                                title="Post"
                            >
                                <FiSend className="text-xl" />
                            </button>
                        </div>
                    </form>
                    {image && (
                        <img
                            className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                            src={image}
                            alt="Uploaded"
                        />
                    )}
                </div>
            </div>

            {showAIModal && (
                <AIGenerationModal
                    onClose={() => setShowAIModal(false)}
                    onGeneratePost={handleGeneratePost}
                />
            )}

            {showModal && (
                <Location
                    onClose={() => setShowModal(false)}
                    setPostLocation={setPostLocation}
                    postLocation={postLocation}
                />
            )}
        </>
    );
};

export default CreateNewPost;
