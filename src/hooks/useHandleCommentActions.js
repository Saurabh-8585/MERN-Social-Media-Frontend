import { toast } from "react-hot-toast";
import { useAddCommentMutation, useDeleteCommentMutation } from "../features/post/PostServices";

const useHandleCommentActions = () => {
    const user = sessionStorage.getItem('user');
    const [addComment] = useAddCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()


    const handleAddComment = async (id, content) => {
        if (user) {
            if (!content) {
                toast.error('Please add comment')
            }
            else {
                const data = { id, content }
                let response = addComment(data);
                toast.promise(response, {
                    loading: 'Posting...',
                    success: 'Posted',
                    error: 'Failed to post comment',
                });
                let r = await response
            }
        }
        else {
            toast.error('Please login to comment')
        }
    }
    const handleLikeComment = async (postId) => {

    }
    const handleRemoveLikeComment = async (postId) => {

    }
    const handleDeleteComment = async (postId, commentId) => {
        console.log({ postId, commentId },2);
        if (user) {
            let response = deleteComment(postId, commentId);
            toast.promise(response, {
                loading: 'Deleting...',
                success: 'Deleted',
                error: 'Failed to delete comment',
            });
            await response
        }
        else {
            toast.error('Please login to comment')
        }
    }
    return (
        { handleAddComment, handleDeleteComment }
    )
}

export default useHandleCommentActions;