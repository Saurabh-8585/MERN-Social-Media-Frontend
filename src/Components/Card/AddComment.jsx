import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useAddCommentMutation } from '../../features/post/PostServices';

const AddComment = ({ postId }) => {

    const [comment, setComment] = useState('');
    const user = sessionStorage.getItem('user');
    const [addComment] = useAddCommentMutation()

    const handleAddComment = async () => {
        if (user) {


            if (comment) {
                const addCommentToast = toast.loading('Adding Comment...');
                try {
                    const response = await addComment({ postId, comment }); // Pass postId and comment as arguments
                    if (response.error) {
                        toast.error(response.error, { id: addCommentToast });
                    } else {
                        toast.success('Comment Added', { id: addCommentToast });
                        setComment('');
                    }
                } catch (error) {
                    toast.error('Failed to add comment', { id: addCommentToast });
                }

            }
            else { toast.error('Please add a comment') }
        } else { 
        toast.error('Please login to comment');
        }
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
                onClick={handleAddComment}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-2 md:px-8 rounded-xl shadow-md"
            >
                Post
            </button>
        </div>

    )
}

export default AddComment