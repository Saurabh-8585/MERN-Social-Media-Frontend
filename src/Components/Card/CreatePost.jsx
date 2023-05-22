import { FiMessageCircle, FiHash, FiImage, FiSmile } from 'react-icons/fi';

const CreatePost = () => {
    return (
        <>
            <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-800 p-4 rounded-xl border max-w-xl flex flex-col">
                <div className="flex flex-wrap lg:flex-nowrap">
                    <div className="m-2 w-10 py-1">
                        <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                            alt=""
                        />
                    </div>
                    <div className="flex-1 px-2 pt-2 mt-2">
                        <textarea
                            className="bg-transparent text-gray-400 font-medium text-lg w-full outline-none"
                            rows={2}
                            cols={50}
                            placeholder="What's happening?"
                            defaultValue={""}
                        />
                    </div>
                </div>
                {/*middle creat tweet below icons*/}
                <div className="flex flex-wrap lg:flex-nowrap">
                    <div className="w-10" />
                    <div className="w-full lg:w-64 px-2">
                        <div className="flex items-center">
                            <div className="flex-1 text-center px-1 py-1 m-2">
                                <span className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-purple-300">
                                    <FiMessageCircle className="text-center text-xl" />
                                </span>
                            </div>
                            <div className="flex-1 text-center py-2 m-2">
                                <span className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-purple-300">
                                    <FiHash className="text-center text-xl" />
                                </span>
                            </div>
                            <div className="flex-1 text-center py-2 m-2">
                                <span className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-purple-300">
                                    <FiImage className="text-center text-xl" />
                                </span>
                            </div>
                            <div className="flex-1 text-center py-2 m-2">
                                <span className="mt-1 group flex items-center text-purple-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:text-purple-300">
                                    <FiSmile className="text-center text-xl" />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 ">
                        <button className="bg-purple-500 mt-5 hover:bg-purple-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
                            Tweet
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
