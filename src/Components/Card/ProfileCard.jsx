import React, { useMemo, useState } from 'react'
import { AiFillEdit, AiOutlineUserDelete, AiOutlineUserAdd } from 'react-icons/ai'
import getCurrentUser from '../../utils/CurrentUser';
import { useFollowUserMutation, useUnFollowUserMutation } from '../../features/user/UserServices';
import { profileDate } from '../../utils/DateFormatter';
import { toast } from 'react-hot-toast';
import LikeByModal from '../Modal/LikeByModal';
const ProfileCard = ({ userInfo, totalPosts }) => {

    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const formattedCreationDate = profileDate(userInfo?.createdAt);
    const userProfileImage = "https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg";

    const user = getCurrentUser(sessionStorage.getItem('user'))
    const isAuthor = user === userInfo?._id
    const [followUser,] = useFollowUserMutation()
    const [unFollowUser, { isError, isLoading, data, }] = useUnFollowUserMutation()
    const follow = (userID) => {
        if (user) {
            const a = followUser(userID);
        }
        else {
            toast.error('Please login')
        }
    }
    const unfollow = (userID) => {
        if (user) {
            const a = unFollowUser(userID)
            console.log({ isError, isLoading, data, });
        }
        else {
            toast.error('Please login')
        }

    }

    const isFollowing = useMemo(() => {
        if (userInfo && userInfo.followers) {
            return userInfo.followers.some((follower) => follower._id === user);
        }
        return false;
    }, [userInfo, user]);


    return (
        <>
            <div className="p-5 flex items-center justify-center w-full">
                <div className="bg-white dark:bg-gray-800 border-gray-300 p-4 rounded-xl border w-full max-w-xl shadow-sm hover:shadow-md">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between">
                        <div className="flex items-center justify-start">
                            <img
                                className="h-24 w-24 rounded-full border"
                                src={userProfileImage}
                                alt="User_Profile"
                            />
                            <div className="ml-4">
                                <span className="text-2xl font-bold block">
                                    {userInfo?.username}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    @{userInfo?.username}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    Created On {formattedCreationDate}
                                </span>
                            </div>
                        </div>
                        <div className=" flex justify-end items-end ml-36 md:ml-0">
                            {isAuthor ?
                                <button className="text-purple-400 hover:text-purple-300 font-medium border-purple-500 border-2 rounded-xl px-3 mt-3 flex justify-around items-center gap-2">
                                    Edit
                                    <AiFillEdit />
                                </button>
                                :
                                isFollowing ?
                                    <button
                                        className="bg-purple-500  hover:bg-purple-600 text-white font-bold py-2 px-3  rounded-full shadow-md flex items-center justify-between gap-3 "
                                        type="submit"
                                        onClick={() => unfollow(userInfo?._id)}
                                    >Unfollow
                                        <AiOutlineUserDelete className='text-xl font-bold' />
                                    </button>
                                    : <button
                                        className="bg-purple-500  hover:bg-purple-600 text-white font-bold py-2 px-3  rounded-full shadow-md flex items-center justify-between gap-3 "
                                        type="submit"
                                        onClick={() => follow(userInfo?._id)}
                                    >Follow
                                        <AiOutlineUserAdd className='text-xl font-bold' />
                                    </button>}
                        </div>
                    </div>
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-4" />
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center gap-4">
                        <div className="flex items-center cursor-pointer" onClick={() => setShowFollowerModal(true)}>
                            <span className="font-medium">{userInfo?.followers.length}</span>
                            <span className="ml-1">Followers</span>
                        </div>
                        <div className="flex items-center cursor-pointer" onClick={() => setShowFollowingModal(true)}>
                            <span className="font-medium">{userInfo?.following.length}</span>
                            <span className="ml-1">Following</span>
                        </div>
                        <div className="flex items-center cursor-pointer">
                            <span className="font-medium">{totalPosts || 0}</span>
                            <span className="ml-1">Posts</span>
                        </div>
                        {/* <div className="flex items-center cursor-pointer">

                        </div> */}
                    </div>
                </div>
            </div>
            {showFollowingModal && (
                <LikeByModal users={userInfo.following} onClose={() => setShowFollowingModal(false)}  text='Following'/>
            )}
            {showFollowerModal && (
                <LikeByModal users={userInfo.followers} onClose={() => setShowFollowerModal(false)} text='Followers' />
            )}
        </>

    )
}

export default ProfileCard