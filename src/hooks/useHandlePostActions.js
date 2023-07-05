import { toast } from "react-hot-toast";
import { useDeletePostMutation, useDislikePostMutation, useLikePostMutation } from "../features/post/PostServices";
import { useAddToBookMarkMutation, useRemoveFromBookMarkMutation } from "../features/bookmark/BookMarkServices";

const useHandlePostActions = (isCurrentUserAuthor) => {

    const user = sessionStorage.getItem('user');

    const [likePost] = useLikePostMutation();
    const [dislike] = useDislikePostMutation();
    const [deletePost, { isLoading, isError, isSuccess, error }] = useDeletePostMutation();
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

    const handleDelete = async (postId, commentId) => {
        if (user) {
            if (isCurrentUserAuthor) {
                try {
                    deletePost(postId, commentId);
                    if (isLoading) {
                        toast.loading('Deleting...');
                    }
                    if (isError) {
                        console.log(error);
                    }
                    if (isSuccess) {
                        toast.success('Deleted');
                    }
                } catch (error) {
                    toast.error('Failed to delete post');
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