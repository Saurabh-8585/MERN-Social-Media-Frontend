import { useState } from 'react';
import { FiImage } from 'react-icons/fi';

const CreatePost = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Function to handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // Perform further actions with the selected file, such as uploading it to a server
        console.log('Selected file:', file);
    };


    return (
        <>
            <div className="">
                <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-800 w-[20.5rem]  md:w-[40rem] p-2 rounded-xl border max-w-xl flex flex-col ">
                    <div className="flex flex-wrap lg:flex-nowrap ">
                        <div className="m-2 w-10 py-1 ">
                            <img
                                className="inline-block h-10 w-10 rounded-full"
                                src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                                alt=""
                            />
                        </div>
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
                    <div className="flex">
                        {/* <div className="w-10" /> */}
                        <div className="w-full lg:w-64 px-1">
                            <div className="flex items-center">

                                <div className="flex-1 text-center py-2 m-2">
                                    <label htmlFor="fileInput" className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-purple-300">
                                        <FiImage className="text-center text-xl" />
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleFileSelect}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="flex-1 ">
                            <button className="bg-purple-500 mt-5 hover:bg-purple-600 text-white font-bold py-2 px-5 md:px-8 rounded-full mr-8 float-right shadow-md">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;