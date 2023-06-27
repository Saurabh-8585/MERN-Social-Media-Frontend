import { toast } from "react-hot-toast";
import { useDeletePostMutation, useDislikePostMutation, useLikePostMutation } from "../features/post/PostServices";
import { useAddToBookMarkMutation, useRemoveFromBookMarkMutation } from "../features/bookmark/BookMarkServices";

const useHandlePostActions = (isCurrentUserAuthor) => {

    const user = sessionStorage.getItem('user');

    const [likePost] = useLikePostMutation();
    const [dislike] = useDislikePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [addBookMark] = useAddToBookMarkMutation();
    const [removeBookMark] = useRemoveFromBookMarkMutation()





    const handleLike = async (PostID) => {
        if (user) {
            const likePostResponse = await likePost(PostID)
            if (likePostResponse.error) {
                toast.error(likePostResponse.error);
            }
        }
        else {
            toast.error('Please login to like the post');
        }

    }

    const handleRemoveLike = async (PostID) => {
        if (user) {

            const likePostResponse = await dislike(PostID)
            if (likePostResponse.error) {
                toast.error(likePostResponse.error);
            }
        }
        else {
            toast.error('Please login to like post');
        }

    }

    const handleDelete = async (PostID,commentID) => {
        if (user) {
            if (isCurrentUserAuthor) {

                let response = deletePost(PostID, commentID);
                toast.promise(response, {
                    loading: 'Deleting...',
                    success: 'Deleted',
                    error: 'Failed to delete post',
                });
                await response

            }
            else {
                toast.error('You are not authorized to delete this post');
            }
        }
        else {
            toast.error('Please login to add bookmark');
        }

    }
    const handleAddBookMark = async (PostID) => {
        if (user) {
            const response = await addBookMark(PostID);
            if (response.error) {
                toast.error(response.error.data.message);
                console.log(response.error);
            }
            else {
                toast.success(response.data.message);
            }
        }
        else {
            toast.error('Please login to add bookmark');
        }
    }

    const removeFromBookmark = async (bookmarkId) => {

        let response = removeBookMark(bookmarkId);
        toast.promise(response, {
            loading: 'Removing...',
            success: 'Removed',
            error: 'Failed to Removed bookmark',
        });
        await response

    }



    return { handleLike, handleRemoveLike, handleDelete, handleAddBookMark, removeFromBookmark };
}

export default useHandlePostActions