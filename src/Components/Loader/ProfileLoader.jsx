import React from 'react';

const ProfileCardSkeleton = () => {
    return (
        <div className="p-5 flex items-center justify-center w-full">
            <div className="bg-white dark:bg-gray-800 border-gray-300 p-4 rounded-xl border w-full max-w-xl shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div>
                            <div className="flex items-center">
                                <div className="animate-pulse">
                                    <div className="h-24 w-24 rounded-full border bg-gray-300 mr-4" />
                                    <div>
                                        <div className="h-6 bg-gray-300 w-40 rounded-full mb-2" />
                                        <div className="h-4 bg-gray-300 w-20 rounded-full" />
                                        <div className="h-4 bg-gray-300 w-24 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="text-purple-400 hover:text-purple-300 font-medium">
                            Edit Profile
                        </button>
                    </div>
                </div>
                <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-4" />
                <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-6">
                    <div className="flex items-center mr-4 cursor-pointer">
                        <div className="h-6 bg-gray-300 w-12 rounded-full" />
                        <div className="h-4 bg-gray-300 w-16 rounded-full mt-1" />
                    </div>
                    <div className="flex items-center mr-4 cursor-pointer">
                        <div className="h-6 bg-gray-300 w-12 rounded-full" />
                        <div className="h-4 bg-gray-300 w-16 rounded-full mt-1" />
                    </div>
                    <div className="flex items-center mr-4 cursor-pointer">
                        <div className="h-6 bg-gray-300 w-12 rounded-full" />
                        <div className="h-4 bg-gray-300 w-16 rounded-full mt-1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCardSkeleton;
