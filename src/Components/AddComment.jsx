import React, { useState } from 'react'
import useHandleCommentActions from '../hooks/useHandleCommentActions';

const AddComment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const { handleAddComment } = useHandleCommentActions()
    const addComment = () => {

        handleAddComment(postId,comment)
        setComment('');
    };
    return (
        <div className=" flex flex-row items-center justify-center w-full max-w-xl gap-3 px-5 md:px-1">
            <div className="flex-grow items-start">
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                />
            </div>
            <button
                onClick={addComment}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-2 md:px-8 rounded-xl shadow-md"
            >
                Post
            </button>
        </div>

    )
}

export default AddComment