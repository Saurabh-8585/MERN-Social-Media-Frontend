import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FaRegCommentAlt } from 'react-icons/fa'
import { FiBookmark } from 'react-icons/fi'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import jwtDecode from 'jwt-decode';
import { useDeletePostMutation, useEditPostMutation } from '../../features/post/PostServices'
import { MdOutlineCancel, MdOutlineSaveAs } from 'react-icons/md'
import { DayFormatter, TimeFormatter } from '../../utils/DateFormatter'

const PostCard = ({ postData }) => {
    const [isEditing, setIsEditing] = useState(false);

    const [editedContent, setEditedContent] = useState(postData.content);

    const [deletePost] = useDeletePostMutation()

    const [editPost] = useEditPostMutation()

    const isEdited = postData.createdAt === postData.updatedAt;

    let postDay = DayFormatter(postData.createdAt)
    let postTime = TimeFormatter(postData.createdAt)

    let EditedPostDay = DayFormatter(postData.updatedAt)
    let EditedPostTime = TimeFormatter(postData.updatedAt)

    const user = sessionStorage.getItem('user')



    const isCurrentUserAuthor = useMemo(() => {
        if (user) {
            const decodedToken = jwtDecode(user);
            return decodedToken.userId === postData.author._id;
        }
        console.log(1);
        return false;

    }, [user, postData.author._id]);
   
    const handleLike = async () => {

    }

    const handleDelete = async (postId) => {
        if (isCurrentUserAuthor) {
            try {
                deletePost(postId)
                toast.success('Post deleted successfully')
            } catch (error) {

            }
        }
        else {
            toast.error('You are not authorized to delete this post');
        }

    }
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(postData.content);
    };
    const handleEdit = async () => {
        if (isCurrentUserAuthor) {
            setIsEditing(true);

        } else {
            toast.error('You are not authorized to edit this post');
        }
    };
    const handleSaveEdit = (postInfo) => {
        const newData = { ...postInfo, editedContent }
        console.log(newData);
        setIsEditing(false);
        try {
            editPost(newData)
            toast.success('Post edited successfully');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong try again')
        }
    };

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
                    {/* {!isEdited && <p className="text-gray-500 dark:text-white block text-md leading-snug mt-1 ml-3">edited</p>} */}
                    {isEditing ? (
                        <textarea
                            className="bg-transparent text-gray-800  text-lg w-full outline-none mt-2"
                            rows={2}
                            cols={50}
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            autoFocus
                        />
                    ) : (
                        <p className="text-black dark:text-white block text-lg leading-snug mt-2 ml-3">{postData.content}</p>
                    )}

                    {postData.postImage?.url && <img
                        className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                        src={postData.postImage?.url}
                        alt='Post_Photo'
                    />
                    }

                    <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                        {postDay} {postTime}
                    </p>
                    {!isEdited && <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                        Modified on   {EditedPostDay} {EditedPostTime}
                    </p>}
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-2">
                        {!isEditing &&
                            <>
                                <div className="flex items-center mr-4">
                                    {<AiOutlineHeart className='text-purple-400  hover:text-red-500 text-xl cursor-pointer' onClick={handleLike} />}
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
                            </>}
                        {(isCurrentUserAuthor && user) && (
                            <>
                                {isEditing ? (
                                    <>
                                        <div className="flex items-center mr-6 justify-center">
                                            <MdOutlineSaveAs
                                                className="text-purple-400 hover:text-purple-300 font-bold text-2xl cursor-pointer"
                                                onClick={() => handleSaveEdit(postData)}
                                            />

                                        </div>
                                        <div className="flex items-center mr-6 justify-center">
                                            <MdOutlineCancel
                                                className="text-red-500 hover:text-red-300 text-xl cursor-pointer"
                                                onClick={handleCancelEdit}
                                            />

                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center mr-6 justify-center">
                                            <AiOutlineEdit
                                                className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer"
                                                onClick={handleEdit}
                                            />
                                        </div>
                                        <div className="flex items-center mr-6 justify-center">
                                            <AiOutlineDelete
                                                className="text-purple-400 hover:text-red-500 text-xl cursor-pointer hover:"
                                                onClick={() => handleDelete(postData._id)}
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default PostCard