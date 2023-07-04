import { getTimeAgo } from "../utils/DateFormatter";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave, AiOutlineHeart, AiFillAlert } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import useHandleCommentActions from "../hooks/useHandleCommentActions";
import { useDeleteCommentMutation, useLikeCommentMutation } from "../features/post/PostServices";
import { useMemo, useState } from "react";
import getCurrentUser from "../utils/CurrentUser";
import LikeByModal from "./Modal/LikeByModal";
import { Avtar } from "../utils/Avtar";
import { Link } from "react-router-dom";

const CommentList = ({ comments, postId, commentLikes }) => {
    const sortedComments = [...comments].sort((a, b) => {
        const createdAtA = new Date(a.createdAt);
        const createdAtB = new Date(b.createdAt);
        return createdAtB - createdAtA;
    });
    const [showModal, setShowModal] = useState(false);
    const [handleDeleteComment] = useDeleteCommentMutation();
    const [likeComment] = useLikeCommentMutation();
    console.log({ commentLikes });

    const removeComment = async (commentId) => {

        let data = { postId, commentId }
        const response = await handleDeleteComment(data);
        console.log('Response:', response.data);
    };

    const handleLikeComment = async (commentId) => {

        let data = { postId, commentId }
        const response = await likeComment(data);
        console.log('Response:', response.data);
    }
    const userId = getCurrentUser(sessionStorage.getItem('user'))

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
                        <div className="flex items-center mr-4 justify-center">
                            <AiOutlineHeart
                                className="text-purple-400 text-xl cursor-pointer hover:text-red-500"
                                onClick={() => handleLikeComment(comment._id)}
                            />
                            <span className="ml-2 font-medium cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >{comment.commentLikes.length} </span>
                        </div>
                        <div className="flex items-center mr-4 justify-center">
                            <AiOutlineEdit
                                className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer"
                            />
                        </div>
                        {userId == comment.user.toString() &&
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
            {showModal && (
                commentLikes.map(data => <LikeByModal users={data.commentLikes} onClose={() => setShowModal(false)} />)
            )}
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