import React, { useMemo, useState } from 'react'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast'
import { DayFormatter, TimeFormatter } from '../../utils/DateFormatter'
import { useDeletePostMutation, useEditPostMutation } from '../../features/post/PostServices'
import { useAddToBookMarkMutation } from '../../features/bookmark/BookMarkServices';
import { FaRegCommentAlt } from 'react-icons/fa'
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineCancel, MdOutlineSaveAs, MdOutlineBookmarkAdd, MdBookmarkRemove } from 'react-icons/md'

const PostCard = ({ author, content, createdAt, updatedAt, postId, bookmarkID, removeFromBookMark, postImage }) => {

    const [isEditing, setIsEditing] = useState(false);

    const [editedContent, setEditedContent] = useState(content);

    const [deletePost, responseInfo] = useDeletePostMutation()

    const [editPost] = useEditPostMutation()

    const [addBookMark] = useAddToBookMarkMutation()

    const isEdited = createdAt === updatedAt;

    let postDay = DayFormatter(createdAt)
    let postTime = TimeFormatter(createdAt)

    let EditedPostDay = DayFormatter(updatedAt)
    let EditedPostTime = TimeFormatter(updatedAt)

    const user = sessionStorage.getItem('user')


    const isCurrentUserAuthor = useMemo(() => {
        if (user) {
            const decodedToken = jwtDecode(user);
            return decodedToken.userId === author._id;
        }
        console.log(1);
        return false;

    }, [user]);

    const handleLike = async () => {

    }



    const handleDelete = async (postId) => {
        if (user) {
            if (isCurrentUserAuthor) {

                const response = await deletePost(postId);
                toast.dismiss()
                if (response.error) {
                    toast.error(response.error.data.message);
                }
                else {
                    // toast.success(response.data.message);
                    console.log(1);
                }
            }
            else {
                toast.error('You are not authorized to delete this post');
            }
        }
        else {
            toast.error('Please login to add bookmark');
        }

    }
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(content);
    };
    const handleEdit = () => {
        if (isCurrentUserAuthor) {
            setIsEditing(true);

        } else {
            toast.error('You are not authorized to edit this post');
        }
    };
    const handleSaveEdit = async (PostID) => {
        if (user) {
            const newData = { PostID, editedContent };
            setIsEditing(false);

            const response = await editPost(newData)
            if (response.error) {
                toast.error(response.error.data.message);
            }
            else {
                toast.success(response.data.message);
            }

        }
        else {
            toast.error('Please login to edit post');
        }
    };

    const handleAddBookMark = async (postId) => {
        if (user) {
            const response = await addBookMark(postId);
            if (response.error) {
                toast.error(response.error.data.message);
            }
            else {
                toast.success(response.data.message);
            }
        }
        else {
            toast.error('Please login to add bookmark');
        }
    };

    const handleSharePost = async (postId) => {

        const data = {
            text: `${author.username} on snapia shared post about ${content}`,
            title: 'snapia',
            url: `http://localhost:3000/post/${postId}`,
            imageUrl: 'https://img.freepik.com/free-vector/computer-user-human-character-program-windows_1284-63445.jpg?w=740&t=st=1687531407~exp=1687532007~hmac=4fca4b34f720e749446eecb9e436ced9666cb4c83f5f005d43b364a15fd713f8'
        }
        if (navigator.canShare && navigator.canShare(data)) {
            navigator.share(data);
        }
        else {
            toast.error("browser not support")
        }
    }

    return (
        <>
            <div className="p-5 flex items-center justify-center   w-full">
                <div className="bg-white dark:bg-gray-800 border-gray-300  p-4 rounded-xl border w-full max-w-xl shadow-sm hover:shadow-md">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <img
                                className="h-11 w-11 rounded-full"
                                src="https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg"
                                alt=''
                            />
                            <div className="ml-1.5 text-sm leading-tight">
                                <span className="text-black dark:text-white font-bold block ">
                                    {author.username}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    @{author.username}
                                </span>
                            </div>
                        </div>
                    </div>
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
                        <p className="text-black dark:text-white block text-lg leading-snug mt-2 ml-3">{content}</p>
                    )}

                    {postImage?.url &&

                        <img
                            className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700 flex m-auto"
                            src={postImage?.url}
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
                        {
                            (removeFromBookMark && bookmarkID) &&
                            <div className="flex items-center mr-6 justify-center">

                                <button
                                    className="bg-white hover:bg-gray-50 font-bold py-2 px-5 md:px-8 rounded-full shadow-md border"
                                    title='remove'
                                    onClick={() => removeFromBookMark(bookmarkID)}
                                >
                                    <MdBookmarkRemove className='text-red-500 hover:text-red-300 text-xl cursor-pointer' />
                                </button>

                            </div>
                        }

                        {(!removeFromBookMark && !bookmarkID) &&
                            !isEditing &&
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
                                    {<MdOutlineBookmarkAdd className='text-purple-400 hover:text-purple-300 text-2xl cursor-pointer' onClick={() => handleAddBookMark(postId)} />}
                                </div>
                                <div className="flex items-center mr-6 justify-center">
                                    {<AiOutlineShareAlt className='text-purple-400 hover:text-purple-300 text-xl cursor-pointer' onClick={() => handleSharePost(postId)} />}
                                </div>

                            </>}
                        {(!removeFromBookMark && !bookmarkID) && (isCurrentUserAuthor && user) && (
                            <>
                                {isEditing ? (
                                    <>
                                        <div className="flex items-center mr-6 justify-center">
                                            <MdOutlineSaveAs
                                                className="text-purple-400 hover:text-purple-300 font-bold text-2xl cursor-pointer"
                                                onClick={() => handleSaveEdit(postId)}
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
                                                onClick={() => handleDelete(postId)}
                                            />
                                        </div>

                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div >

        </>
    )
}

export default PostCard