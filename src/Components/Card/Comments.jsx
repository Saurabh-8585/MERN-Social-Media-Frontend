import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useState } from "react";
import Avtar from "../../assets/Avatar.png";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"
import getCurrentUser from "../../utils/CurrentUser";
import { useDeleteCommentMutation, useEditCommentMutation } from "../../features/post/PostServices";
import { getTimeAgo } from '../../utils/DateFormatter';
import { MdOutlineCancel, MdOutlineSaveAs } from 'react-icons/md';
import PopUp from '../Modal/PopUp';
import { FaTrash } from 'react-icons/fa';
const Comments = ({ comment, postId, postAuthor }) => {
    const [handleDeleteComment] = useDeleteCommentMutation();
    const [handleEditComment] = useEditCommentMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteCmntPopUp, setShowDeleteCmmntPopUp] = useState(false);
    const [showSaveEditPopUp, setShowSaveEditPopUp] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.text);
    const userId = getCurrentUser(sessionStorage.getItem('user'))

    const removeComment = async (commentId) => {
        let data = { postId, commentId }
        const response = await handleDeleteComment(data);
        response.data ? toast.success(response.data.message) : toast.error(response.error.data.message)

    };

    const updateComment = async () => {
        if (editedContent) {
            if (editedContent !== comment.text) {

                let commentId = comment._id
                let data = { postId, commentId, commentText: editedContent }
                const response = await handleEditComment(data)
                if (response.error) {
                    toast.error(response.error.data.message)
                }
                else {
                    toast.success(response.data.message)
                }
            }
            else {
                toast.error('Previous comment is same')
            }
        }
        else {
            toast.error("Pleas add some text")
        }
        setIsEditing(false)
    }

    return (



        <div className="max-w-xl w-full bg-white dark:bg-gray-800 border-gray-300 border px-3 py-4 rounded-xl my-3 shadow-sm" key={comment._id} >
            <Link to={`/profile/${comment.user._id}`} className="flex items-center mb-6">
                <img
                    src={comment?.user?.userImage?.url ? comment?.user?.userImage?.url : Avtar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <div className="text-lg font-medium text-gray-800">{comment.user.username}</div>
                    <div className="text-gray-500">Commented {getTimeAgo(comment.createdAt)}</div>
                    {comment.createdAt !== comment.updatedAt && <span className="text-gray-500">(edited)</span>}
                </div>
            </Link>
            {isEditing ? (
                <textarea
                    className="bg-transparent text-gray-800  text-lg w-full outline-none mt-2"
                    rows={2}
                    cols={50}
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    autoFocus
                />


            ) : (
                <p className="text-lg leading-relaxed mb-2 break-words">
                    {comment.text}
                </p>
            )}
            <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-2" />

            <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-2">

                {userId && (
                    <>
                        {isEditing ? (
                            <>
                                <div className="flex items-center mr-6 justify-center">
                                    <MdOutlineSaveAs
                                        className="text-purple-400 hover:text-purple-300 font-bold text-2xl cursor-pointer"
                                        onClick={() => setShowSaveEditPopUp(true)}
                                    />

                                </div>
                                <div className="flex items-center mr-6 justify-center">
                                    <MdOutlineCancel
                                        className="text-red-500 hover:text-red-300 text-xl cursor-pointer"
                                        onClick={() => setIsEditing(false)}
                                    />

                                </div>
                            </>
                        ) : (
                            <>
                                {userId === comment.user._id &&
                                    <div className="flex items-center mr-4 justify-center">
                                        <AiOutlineEdit
                                            className="text-purple-400 hover:text-purple-300 text-xl cursor-pointer"
                                            onClick={() => setIsEditing(true)}
                                        />
                                    </div>
                                }

                                {(userId === postAuthor || userId === comment.user._id) &&
                                    <div className="flex items-center mr-4 justify-center">
                                        <AiOutlineDelete
                                            className="text-purple-400  text-xl cursor-pointer hover:text-red-500"
                                                onClick={() => setShowDeleteCmmntPopUp(true)}
                                        />
                                    </div>
                                }

                            </>
                        )}
                    </>
                )}
                {showDeleteCmntPopUp && (
                    <PopUp
                        onClose={() => setShowDeleteCmmntPopUp(false)}
                        handleClick={() => removeComment(comment._id)}
                        btnMessage='Delete'
                        btnColor='red'
                        message='Are you sure you want to delete this comment?'
                        icon={<FaTrash className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 mt-4" />}
                    />
                )}
                {showSaveEditPopUp && (
                    <PopUp
                        onClose={() => setShowSaveEditPopUp(false)}
                        handleClick={() => updateComment()}
                        btnMessage='Save'
                        btnColor='purple'
                        message='Do you want to save the changes?'
                        icon={<MdOutlineSaveAs className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 mt-4" />}
                    />
                )}
            </div>

        </div>



    )
}

export default Comments