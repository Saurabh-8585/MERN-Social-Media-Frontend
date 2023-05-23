import React from 'react';
import { FiMessageCircle, FiHash, FiImage, FiSmile } from 'react-icons/fi';

const CreatePost = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-800 p-4 rounded-xl border max-w-2xl mx-auto lg:max-w-4xl xl:max-w-5xl">
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="m-2 w-12 lg:w-16 py-1">
          <img
            className="inline-block h-10 w-10 lg:h-16 lg:w-16 rounded-full"
            src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
            alt=""
          />
        </div>
        <div className="flex-1 px-2 pt-2 mt-2">
          <textarea
            className="bg-transparent text-gray-400 font-medium text-lg w-full outline-none resize-none"
            rows={2}
            placeholder="What's happening?"
            defaultValue={""}
          />
        </div>
      </div>
      {/* Middle create tweet icons */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center mr-4">
            <span className="group flex items-center text-purple-400 hover:text-purple-300">
              <FiMessageCircle className="text-xl" />
            </span>
          </div>
          <div className="flex items-center justify-center mr-4">
            <span className="group flex items-center text-purple-400 hover:text-purple-300">
              <FiHash className="text-xl" />
            </span>
          </div>
          <div className="flex items-center justify-center mr-4">
            <span className="group flex items-center text-purple-400 hover:text-purple-300">
              <FiImage className="text-xl" />
            </span>
          </div>
          <div className="flex items-center justify-center">
            <span className="group flex items-center text-purple-400 hover:text-purple-300">
              <FiSmile className="text-xl" />
            </span>
          </div>
        </div>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full">
          Tweet
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
