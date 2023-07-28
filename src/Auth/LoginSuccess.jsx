import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import getCurrentUser from '../utils/CurrentUser';

const LoginSuccess = () => {
    let navigate = useNavigate()
    const currentUser = getCurrentUser(sessionStorage.getItem('user'))
    const getGoogleProfile = async () => {
        try {
            const userInfo = await fetch(`${process.env.REACT_APP_AUTH}/login/success`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });

            if (userInfo.ok) {
                const response = await userInfo.json();
                if (response.user.token) {
                    toast.success(response.user.message)
                    sessionStorage.setItem('user', response.user.token);
                    navigate('/')
                }
            }

        } catch (error) {
            console.log({ error });
            toast.error('Something went wrong')
        }
    };
    useEffect(() => {
        window.scroll(0, 0)

        currentUser ? navigate('/') : getGoogleProfile();

    }, []);
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-6xl" />
                </div>
                <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Login Success</h2>
                <p className="text-center text-gray-600 text-lg mb-4">Logging into your account...</p>
            </div>
        </div>
    )
}

export default LoginSuccess