import { getTimeAgo } from "../utils/DateFormatter";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useDeleteCommentMutation, } from "../features/post/PostServices";
import { useState } from "react";
import getCurrentUser from "../utils/CurrentUser";
import  Avtar  from "../assets/Avatar.png";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import PopUp from "./Modal/PopUp";

const CommentList = ({ comments, postId, author }) => {
    const sortedComments = [...comments].sort((a, b) => {
        const createdAtA = new Date(a.createdAt);
        const createdAtB = new Date(b.createdAt);
        return createdAtB - createdAtA;
    });
    const [showModal, setShowModal] = useState(false);
    const [handleDeleteComment] = useDeleteCommentMutation();

    const removeComment = async (commentId) => {
        let data = { postId, commentId }
        const response = await handleDeleteComment(data);
        response.data ? toast.success(response.data.message) : toast.error(response.error.data.message)

    };


    const userId = getCurrentUser(sessionStorage.getItem('user'))

console.log({author});
    return (
        <div className='mt-5 p-5 flex justify-center flex-col m-auto w-full items-center'>
            {sortedComments.map((comment) => (
                <div className="max-w-xl w-full bg-white dark:bg-gray-800 border-gray-300 border px-3 py-4 rounded-xl mb-5 shadow-sm" key={comment._id} >
                    <Link to={`/profile/${comment.user._id}`} className="flex items-center mb-6">
                        <img
                            src={comment?.user?.userImage?.url ? comment?.user?.userImage?.url : Avtar}
                            alt="Avatar"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                            <div className="text-lg font-medium text-gray-800">{comment.user.username}</div>
                            <div className="text-gray-500">Commented {getTimeAgo(comment.createdAt)}</div>
                        </div>
                    </Link>
                    <p className="text-lg leading-relaxed mb-2 break-words">
                        {comment.text}
                    </p>
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-2" />

                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-2">
                        {userId === comment.user._id &&
                            <div className="flex items-center mr-4 justify-center">
                                <AiOutlineEdit
                                    className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer"
                                />
                            </div>
                        }

                        {(userId === author._id || userId === comment.user._id) &&
                            <div className="flex items-center mr-4 justify-center">
                                <AiOutlineDelete
                                    className="text-purple-400  text-xl cursor-pointer hover:text-red-500"
                                    onClick={() => removeComment(comment._id)}
                                />
                            </div>
                        }
                    </div>

                </div>

            ))}
        </div>
    );
};

export default CommentList;








// src = "https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg"

{/* <div className="flex justify-between items-center">
    <div>
        <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
            <i className="far fa-thumbs-up" /> Like
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-comment-alt" /> Reply
        </a>
    </div>
    <div className="flex items-center">
        <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
            <i className="far fa-flag" /> Report
        </a>
        <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-share-square" /> Share
        </a>
    </div>
</div> */}