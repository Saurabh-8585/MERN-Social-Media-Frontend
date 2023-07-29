import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';
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

        if (!isLoading && !isError) {
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

            {!isError ?
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex items-center justify-center mb-6">
                        {isLoading ? <FaSpinner className='text-purple-500 text-6xl login_loading' /> : <FaCheckCircle className="text-green-500 text-6xl" />}
                    </div>
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">SignIn Success</h2>
                    <p className="text-center text-gray-600 text-lg mb-4">Signing into your account...</p>
                </div>

                : <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-6">
                        {<MdOutlineReportGmailerrorred className="text-red-500 text-6xl" />}
                    </div>
                    <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">SignIn Failed</h2>
                    <Link to='/signin' className="text-center text-gray-600 underline text-lg mb-4">SignIn with email & password </Link>
                </div>
            }
        </div>
    )
}

export default LoginSuccess