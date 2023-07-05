import React, { useState } from 'react'
import { AiFillEdit, AiOutlineUserDelete, AiOutlineUserAdd } from 'react-icons/ai'
import getCurrentUser from '../../utils/CurrentUser';
import { profileDate } from '../../utils/DateFormatter';
import LikeByModal from '../Modal/LikeByModal';
import { Link } from 'react-router-dom';
import { Avtar } from '../../utils/Avtar';
import useHandleUsersAction from '../../hooks/useHandleUsersAction';
const ProfileCard = ({ userInfo, totalPosts }) => {

    const user = getCurrentUser(sessionStorage.getItem('user'))
    const { follow, isFollowing, unFollow } = useHandleUsersAction({ userInfo, user })
    const [showFollowingModal, setShowFollowingModal] = useState(false);
    const [showFollowerModal, setShowFollowerModal] = useState(false);
    const formattedCreationDate = profileDate(userInfo?.createdAt);
    const isAuthor = user === userInfo?._id





    return (
        <>
            <div className="p-5 flex items-center justify-center w-full">
                <div className="bg-white dark:bg-gray-800 border-gray-300 p-4 rounded-xl border w-full max-w-xl shadow-sm hover:shadow-md">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between">
                        <div className="flex items-center justify-start">
                            <img
                                className="h-24 w-24 rounded-full border"
                                src={userInfo?.userImage?.url ? userInfo?.userImage?.url : Avtar}
                                alt="User_Profile"
                            />
                            <div className="ml-4">
                                <span className="text-2xl font-bold block dark:text-gray-400">
                                    {userInfo?.username}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    @{userInfo?.username}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    {userInfo?.about}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    Created On {formattedCreationDate}
                                </span>
                            </div>
                        </div>
                        <div className=" flex justify-end   items-end mt-4  md:ml-0 ">
                            {isAuthor ?
                                <Link to='/settings' className="text-purple-500 hover:text-purple-300 font-medium border-purple-500 border-2 rounded-xl px-3 mt-3 flex justify-around items-center gap-2 py-1">
                                    Edit
                                    <AiFillEdit />
                                </Link>
                                :
                                isFollowing ?
                                    <button
                                        className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 font-bold py-2 px-5  rounded-full shadow-md flex items-center justify-between gap-3 w-full"
                                        type="submit"
                                        onClick={() => unFollow(userInfo?._id)}
                                    >Unfollow
                                        <AiOutlineUserDelete className='text-xl font-bold' />
                                    </button>
                                    : <button
                                        className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 font-bold py-2 px-5  rounded-full shadow-md flex items-center justify-between gap-3"
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

                    </div>
                </div>
            </div>
            {showFollowingModal && (
                <LikeByModal users={userInfo.following} onClose={() => setShowFollowingModal(false)} text='Following' />
            )}
            {showFollowerModal && (
                <LikeByModal users={userInfo.followers} onClose={() => setShowFollowerModal(false)} text='Followers' />
            )}
        </>

    )
}

export default ProfileCard