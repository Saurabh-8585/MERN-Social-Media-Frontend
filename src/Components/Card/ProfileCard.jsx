import React from 'react'
import { getTimeAgo } from '../../utils/DateFormatter';

const ProfileCard = ({ userInfo, totalPosts }) => {
    const userProfileImage = "https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg";

    return (
        <>
            <div className="p-5 flex items-center justify-center w-full">
                <div className="bg-white dark:bg-gray-800 border-gray-300 p-4 rounded-xl border w-full max-w-xl shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div >
                                <div className="flex items-center">
                                    <img
                                        className="h-24 w-24 rounded-full border mr-4"
                                        src={userProfileImage}
                                        alt="User_Profile"
                                    />
                                    <div>
                                        <span className="text-2xl font-bold block">{userInfo?.username}</span>
                                        <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                            @{userInfo?.username}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                            Created  {userInfo?.createdAt && getTimeAgo(userInfo?.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div >
                            <button className="text-purple-400 hover:text-purple-300 font-medium">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-4" />
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-6">
                        <div className="flex items-center mr-4 cursor-pointer">
                            <span className="font-medium">{userInfo?.followers.length}</span>
                            <span className="ml-1">Followers</span>
                        </div>
                        <div className="flex items-center mr-4 cursor-pointer">
                            <span className="font-medium">{userInfo?.following.length}</span>
                            <span className="ml-1">Following</span>
                        </div>
                        <div className="flex items-center mr-4 cursor-pointer">
                            <span className="font-medium">{totalPosts || 0}</span>
                            <span className="ml-1">Posts</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ProfileCard