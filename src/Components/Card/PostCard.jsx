import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'
import { FiBookmark } from 'react-icons/fi'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import jwtDecode from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux'
import { deleteUserPost } from '../../features/post/postSlice'

const PostCard = ({ postData }) => {
    let postDay = new Date(postData.createdAt).toLocaleDateString('en-us',
        {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    let postTime = new Date(postData.createdAt).toLocaleTimeString('en-US');
    const user = sessionStorage.getItem('user')
    const dispatch = useDispatch();
    const isCurrentUserAuthor = () => {
        if (user) {
            const decodedToken = jwtDecode(user);
            return decodedToken.userId === postData.author._id;
        }
        return false;
    };
    useEffect(() => {
        isCurrentUserAuthor()
    }, [])
    const handleLike = async () => {

    }
    const handleEdit = async () => {
        if (isCurrentUserAuthor()) {

        }
        else {
            toast.error('You are not authorized to edit this post');
        }
    }
    const handleDelete = async (postId) => {
        console.log(postId);
        if (isCurrentUserAuthor()) {
            dispatch(deleteUserPost(postId))
        }
        else {
            toast.error('You are not authorized to delete this post');
        }

    }

    return (
        <>
            <div className="p-5 flex items-center justify-center  w-full">
                <div className="bg-white dark:bg-gray-800 border-gray-300  p-4 rounded-xl border w-full max-w-xl">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <img
                                className="h-11 w-11 rounded-full"
                                src="https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg"
                                alt=''
                            />
                            <div className="ml-1.5 text-sm leading-tight">
                                <span className="text-black dark:text-white font-bold block ">
                                    {postData.author.username}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    @{postData.author.username}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-black dark:text-white block text-lg  leading-snug mt-3 ml-3">
                        {postData.content}
                    </p>
                    {postData.postImage?.url && <img
                        className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                        src={postData.postImage?.url}
                        alt='Post_Photo'
                    />
                    }
                    <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                        {postDay} {postTime}
                    </p>
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-2">
                        <div className="flex items-center mr-4">
                            {<AiOutlineHeart className='text-purple-400 hover:text-purple-300 text-xl cursor-pointer' onClick={handleLike} />}
                            <span className="ml-2">615</span>
                        </div>
                        <div className="flex items-center mr-4 ">
                            {<FaRegCommentAlt className='text-purple-400 hover:text-purple-300 text-xl cursor-pointer' />}
                            <span className="ml-2">93 </span>
                        </div>
                        <div className="flex items-center mr-4 justify-center">
                            {<FiBookmark className='text-purple-400 hover:text-purple-300 text-xl cursor-pointer' />}
                        </div>
                        <div className="flex items-center mr-6 justify-center">
                            {<AiOutlineShareAlt className='text-purple-400 hover:text-purple-300 text-xl cursor-pointer' />}
                        </div>
                        {isCurrentUserAuthor() && (
                            <>
                                <div className="flex items-center mr-6 justify-center">
                                    <AiOutlineEdit className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer" onClick={() => handleEdit(postData._id)} />
                                </div>
                                <div className="flex items-center mr-6 justify-center">
                                    <AiOutlineDelete className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer" onClick={() => handleDelete(postData._id)} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default PostCard