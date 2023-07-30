import React from 'react';

const ProfileCardSkeleton = () => {
    return (
        <div className="p-5 flex items-center justify-center w-full">
            <div className="bg-white dark:bg-gray-800 border-gray-300 p-4 rounded-xl border w-full max-w-xl shadow-sm animate-pulse">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between">
                    <div className="flex items-center justify-start flex-col md:flex-row">
                        <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-gray-300 mb-2 md:mb-0"></div>
                        <div className="md:ml-4">
                            <div className="h-8 w-40 md:w-60 rounded-full bg-gray-300 mb-2"></div>
                            <div className="h-6 w-28 md:w-40 rounded-full bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="flex justify-end items-end md:mt-4 md:ml-0">
                        <button className="bg-gray-300 text-white hover:bg-white hover:text-gray-300 border-gray-300 border-2 rounded-xl px-3 mt-3 md:mt-0 flex justify-around items-center gap-2 py-1 animate-pulse">
                            Loading
                        </button>
                    </div>
                </div>
                <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-4" />
                <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center md:gap-4 gap-1">
                    <div className="h-6 w-20 md:w-28 rounded-full bg-gray-300"></div>
                    <div className="h-6 w-20 md:w-28 rounded-full bg-gray-300"></div>
                    <div className="h-6 w-20 md:w-28 rounded-full bg-gray-300"></div>
                    <div className="h-6 w-20 md:w-28 rounded-full bg-gray-300"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCardSkeleton;
