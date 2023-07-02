import React, { useState } from 'react'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useResetPasswordMutation } from '../../features/auth/AuthServices'
import getCurrentUser from '../../utils/CurrentUser'

const ResetPassword = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const user = getCurrentUser(sessionStorage.getItem('user'))
    const [resetPassword, { data, isLoading, isError }] = useResetPasswordMutation()
    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await resetPassword(user, oldPassword, newPassword )
        if (response.data) {
            console.log(response.data);
        }
        if (response.error) {
            console.log(response.error);
        }
        console.log({ data, isLoading, isError });
    }
    return (
        <>
            <h1 className="text-4xl font-bold text-center mb-8 text-purple-500">Reset Password</h1>

            <form className='flex flex-col justify-center' onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="floating_password"
                        autoComplete='new-password'
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        autoFocus
                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-500 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Old Password
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="floating_new_password"
                        autoComplete='new-password'
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label
                        htmlFor="floating_new_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-500 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        New Password
                    </label>
                </div>
                <button
                    type="submit"
                    className="text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800 flex justify-center items-center gap-4 "
                >
                    <span className='text-lg font-semibold '> Reset</span>
                    <RiLockPasswordLine className='text-2xl font-bold' />
                </button>
            </form>
        </>
    )
}

export default ResetPassword