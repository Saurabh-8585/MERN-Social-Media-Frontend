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
                toast.error(likePostResponse.error.data.message);
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
                toast.error(likePostResponse.error.data.message);
            }
        }
        else {
            toast.error('Please login to like post');
        }

    }

    const handleDelete = async (postId, commentId) => {
        if (user) {
            if (isCurrentUserAuthor) {
                const deletePostToast = toast.loading('Deleting ...');
                let response = await deletePost(postId, commentId);
                if (response.error) {
                    toast.error(response.error.data.message, { id: deletePostToast });
                }
                else {
                    toast.success('Post Deleted', { id: deletePostToast });
                }

            } else {
                toast.error('You are not authorized to delete this post');
            }
        } else {
            toast.error('Please login to delete a post');
        }
    };
    const handleAddBookMark = async (PostID) => {
        if (user) {
            const addBookMarKToast = toast.loading('Saving ...');
            const response = await addBookMark(PostID);
            if (response.error) {
                toast.error(response.error.data.message, { id: addBookMarKToast });

            }
            else {
                toast.success('Saved to bookmarks', { id: addBookMarKToast });
            }
        }
        else {
            toast.error('Please login to add bookmark');
        }
    }

    const removeFromBookmark = async (bookmarkId) => {
        const removeBookMarkToast = toast.loading('Removing ...');
        let response = await removeBookMark(bookmarkId);
        if (response.error) {
            toast.error(response.error.data.message, { id: removeBookMarkToast });

        }
        else {
            toast.success('Removed from bookmarks', { id: removeBookMarkToast });
        }

    }



    return { handleLike, handleRemoveLike, handleDelete, handleAddBookMark, removeFromBookmark };
}

export default useHandlePostActions