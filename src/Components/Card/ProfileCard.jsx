import React, { useState } from 'react'
import { AiFillEdit, AiOutlineUserDelete, AiOutlineUserAdd, AiOutlineLink, AiOutlineInfoCircle, AiOutlineShareAlt } from 'react-icons/ai'
import getCurrentUser from '../../utils/CurrentUser';
import { Link } from 'react-router-dom';
import Avtar from '../../assets/Avatar.png';
import useHandleUsersAction from '../../hooks/useHandleUsersAction';
import { MdLocationCity } from 'react-icons/md';
import UserListPopUp from '../Modal/UserListPopUp';
import PopUp from '../Modal/PopUp';
import { FaUserTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
const ProfileCard = ({ userInfo, totalPosts, userId }) => {

    const user = getCurrentUser(sessionStorage.getItem('user'))
    const { follow, isFollowing, unFollow } = useHandleUsersAction({ userInfo, user })

    const [showFollowingModal, setShowFollowingModal] = useState(false);

    const [showFollowerModal, setShowFollowerModal] = useState(false);

    const [showUnFollowPopUp, setShowUnFollowPopUp] = useState(false);


    const handleShareProfile = async () => {
        const data = {
            text: `${userInfo.username} on snapia`,
            title: 'snapia',
            url: `${process.env.REACT_APP_URL}/profile/${userId}`,
        };
        if (userInfo?.userImage?.url !== undefined) {

            const imageBlob = await fetch(userInfo?.userImage?.urll).then((response) => response.blob());
            data.files = [new File([imageBlob], 'post_image.jpg', { type: 'image/jpeg' })];
        }

        if (navigator.share && navigator.canShare(data)) {
            navigator.share(data);

        } else {
            toast.error("Browser does not support sharing");
        }
    };



    return (
        <>
            <div className="p-5 flex items-center justify-center w-full" id='profile'>
                <div className="bg-white dark:bg-gray-800 border-gray-300 p-4 rounded-xl border w-full max-w-xl shadow-sm">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between">
                        <div className="flex items-center justify-start flex-col md:flex-row">
                            <img
                                className="h-24 w-24 rounded-full border mb-2"
                                src={userInfo?.userImage?.url ? userInfo?.userImage?.url : Avtar}
                                alt="User_Profile"
                            />
                            <div className="ml-4">
                                <span className="text-2xl font-bold block dark:text-gray-400 text-center md:text-left">
                                    {userInfo?.username}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block text-md text-center md:text-left">
                                    @{userInfo?.username}
                                </span>
                                {userInfo?.about && <span className="text-gray-500 dark:text-gray-400 font-normal flex items-center gap-2">
                                    <AiOutlineInfoCircle className='ml-0.5 text-xl' />
                                    {userInfo?.about}
                                </span>}
                                {userInfo?.website && (
                                    <span className="hover:text-blue-800 text-gray-500  dark:text-gray-400 font-normal flex items-center gap-2 cursor-pointer break-all"
                                        onClick={() => window.open(userInfo.website, "_blank")}>
                                        <AiOutlineLink className='text-xl' />
                                        {userInfo?.website}
                                    </span>
                                )}


                                {userInfo?.location &&
                                    <span className="text-gray-500 dark:text-gray-400 font-normal flex items-center gap-2">
                                        <MdLocationCity className='ml-0.5 text-xl' />
                                        {userInfo?.location}
                                    </span>
                                }
                            </div>
                        </div>
                        <div className=" flex justify-end mt-3  items-end md:mt-4   md:ml-0 ">
                            {user === userInfo?._id ?
                                <Link to='/settings' className="text-purple-500 hover:text-purple-300 font-medium border-purple-500 border-2 rounded-xl px-3 mt-3 flex justify-around items-center gap-2 py-1">
                                    Edit
                                    <AiFillEdit />
                                </Link>
                                :
                                isFollowing ?
                                    <button
                                        className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 font-bold py-2 px-5  rounded-full shadow-md flex items-center justify-between gap-3 w-full"
                                        type="submit"
                                        onClick={() => setShowUnFollowPopUp(true)}
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
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center  md:gap-4 gap-3">
                        <div className="flex items-center cursor-pointer hover:text-purple-500" onClick={() => setShowFollowerModal(true)}>
                            <span className="font-medium">{userInfo?.followers.length}</span>
                            <span className="ml-1">Followers</span>
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-purple-500" onClick={() => setShowFollowingModal(true)}>
                            <span className="font-medium">{userInfo?.following.length}</span>
                            <span className="ml-1">Following</span>
                        </div>
                        <a href='#post' className="flex items-center cursor-pointer hover:text-purple-500">
                            <span className="font-medium">{totalPosts}</span>
                            <span className="ml-1">Posts</span>
                        </a>
                        <div className="flex items-center cursor-pointer hover:text-purple-500" onClick={handleShareProfile}>
                            {/* <span className="font-medium">{totalPosts }</span> */}
                            <span className="ml-1"><AiOutlineShareAlt className='text-lg' /></span>
                        </div>

                        {/* {user !== userInfo?._id &&
                            <Link to={`/messages/${userInfo?._id}`} className="flex items-center cursor-pointer hover:text-purple-500">
                                <span className="ml-1">Message</span>
                            </Link>
                        } */}

                    </div>
                </div>
            </div>
            {showFollowingModal && (
                <UserListPopUp users={userInfo.following} onClose={() => setShowFollowingModal(false)} text='Following' />
            )}
            {showFollowerModal && (
                <UserListPopUp users={userInfo.followers} onClose={() => setShowFollowerModal(false)} text='Followers' />
            )}
            {showUnFollowPopUp && (
                <PopUp
                    onClose={() => setShowUnFollowPopUp(false)}
                    handleClick={() => unFollow(userInfo?._id)}
                    btnMessage='Unfollow'
                    btnColor='red'
                    message={`Are you sure you want to unfollow ${userInfo.username}?`}
                    icon={<FaUserTimes className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 mt-4" />}
                />
            )}
        </>

    )
}

export default ProfileCard