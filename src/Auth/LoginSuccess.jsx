import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import getCurrentUser from '../utils/CurrentUser';
import { useGoogleAuthQuery } from '../features/auth/AuthServices';

const LoginSuccess = () => {
    let navigate = useNavigate()
    const currentUser = getCurrentUser(sessionStorage.getItem('user'))
    const { data, isLoading, isError, error } = useGoogleAuthQuery()
    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }

        if (!isLoading ) {
            console.log({data});
            toast.success(data.user.message);
            sessionStorage.setItem('user', data.user.token);
            navigate('/');
        }
        if (isError) {
            console.log({ error, isError });
        }
    }, [currentUser, data, isLoading, navigate, error, isError]);
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    {isLoading ? <FaSpinner className='text-purple-500 text-6xl login_loading' /> : <FaCheckCircle className="text-green-500 text-6xl" />}
                </div>
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Login Success</h2>
                <p className="text-center text-gray-600 text-lg mb-4">Logging into your account...</p>
            </div>
        </div>
    )
}

export default LoginSuccess