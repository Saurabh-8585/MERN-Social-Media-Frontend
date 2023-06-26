import { toast } from "react-hot-toast";
import { useDeletePostMutation, useDislikePostMutation, useLikePostMutation } from "../features/post/PostServices";
import { useAddToBookMarkMutation } from "../features/bookmark/BookMarkServices";

const useHandlePostActions = ({ user, isCurrentUserAuthor }) => {


    const [likePost] = useLikePostMutation();
    const [dislike] = useDislikePostMutation();
    const [deletePost] = useDeletePostMutation();
    const [addBookMark] = useAddToBookMarkMutation();


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

    const handleDelete = async (PostID) => {
        if (user) {
            if (isCurrentUserAuthor) {

                const response = await deletePost(PostID);
                if (response.error) {
                    toast.error(response.error.data.message);
                }
                else {
                    toast.success(response.data.message);
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
    const handleAddBookMark = async (PostID) => {
        if (user) {
            const response = await addBookMark(PostID);
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

    return { handleLike, handleRemoveLike, handleDelete, handleAddBookMark };
}

export default useHandlePostActions