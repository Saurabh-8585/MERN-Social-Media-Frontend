import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import PopUp from  '../../../Modal/PopUp';
import { useDeleteUserMutation } from '../../../../features/user/UserServices';

const DeleteAccount = () => {
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);

    const deleteUserAccount = async () => {
        const loadingToastId = toast.loading('Deleting...');
        const response = await deleteUser()
        if (response.data) {
            toast.success('Account deleted successfully', { id: loadingToastId });
            sessionStorage.removeItem('user')
            navigate('/signin')
        }
        if (response.error) {
            toast.error(response.error.data.message, { id: loadingToastId });
        }
    }
    return (
        <>
            <div className="flex flex-col items-center px-5 mt-4 gap-3">
                <h2 className="md:text-xl text-lg font-bold mb-2 dark:text-white">Do you want to delete account?</h2>
                <button
                    className="border border-red-500 text-red-500 hover:bg-red-600 hover:text-white flex justify-around gap-3 items-center font-bold py-2 px-4 rounded ease-linear transition-all duration-150"
                    onClick={() => setShowModal(true)}
                >
                    Delete Account
                    <FaTrash />
                </button>
            </div>
            
            {showModal && (
                <PopUp
                    onClose={() => setShowModal(false)}
                    handleClick={deleteUserAccount}
                    btnMessage='Delete'
                    btnColor='red'
                    message='By deleting your account, you will lose all your data.'
                    icon={<FaTrash className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50 mt-4" />}
                />
            )}

        </>
    )
}

export default DeleteAccount