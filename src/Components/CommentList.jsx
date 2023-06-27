import { getTimeAgo } from "../utils/DateFormatter";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineSave, AiOutlineHeart, AiFillAlert } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'
import useHandleCommentActions from "../hooks/useHandleCommentActions";

const CommentList = ({ comments, postId }) => {
    const sortedComments = [...comments].sort((a, b) => {
        const createdAtA = new Date(a.createdAt);
        const createdAtB = new Date(b.createdAt);
        return createdAtB - createdAtA;
    });

    const { handleDeleteComment } = useHandleCommentActions()


    return (
        <div className='mt-5 p-5 flex justify-center flex-col m-auto w-full items-center'>
            {sortedComments.map((comment) => (
                <div className="max-w-xl w-full bg-white dark:bg-gray-800 border-gray-300 border px-3 py-4 rounded-xl mb-5 shadow-sm" key={comment._id} >
                    <div className="flex items-center mb-6">
                        <img
                            src="https://randomuser.me/api/portraits/men/97.jpg"
                            alt="Avatar"
                            className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                            <div className="text-lg font-medium text-gray-800">{comment.user.username}</div>
                            <div className="text-gray-500">Commented {getTimeAgo(comment.createdAt)}</div>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed mb-2 break-words">
                        {comment.text}
                    </p>
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-2" />
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-2">
                        <div className="flex items-center mr-4 justify-center">
                            <AiOutlineHeart
                                className="text-purple-400 text-xl cursor-pointer hover:text-red-500"
                            />
                        </div>
                        <div className="flex items-center mr-4 justify-center">
                            <AiOutlineEdit
                                className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer"
                            />
                        </div>
                        <div className="flex items-center mr-4 justify-center">
                            <AiOutlineDelete
                                className="text-purple-400  text-xl cursor-pointer hover:text-red-500"
                                onClick={() => handleDeleteComment(postId, comment._id)}
                            />
                        </div>
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