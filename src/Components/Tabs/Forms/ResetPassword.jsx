import { useForm } from 'react-hook-form'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useResetPasswordMutation } from '../../../features/auth/AuthServices'
import { toast } from 'react-hot-toast'

const ResetPassword = () => {



    const [resetPassword] = useResetPasswordMutation()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (info) => {
        const response = await resetPassword({ oldPassword: info.password, newPassword: info.new_password })
        if (response.data) {
            toast.success(response.data.message);
        }
        if (response.error) {
            toast.error(response.error.data.message);
        }
    }
    return (
        <>
            <h1 className="text-4xl font-bold text-center mb-8 text-purple-500">Reset Password</h1>

            <form className='flex flex-col justify-center' onSubmit={handleSubmit(onSubmit)}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        name="floating_password"

                        type="password"
                        autoComplete="current-password"
                        id="password"
                        {...register('password', {
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*[!@#$%^&*()_\-+=<>?])(?=.*\d).+$/,
                                message: 'Password must contain at least 1 special symbol and 1 digit',
                            },
                        })}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"

                    />
                    <label
                        htmlFor="floating_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-500 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Old Password
                    </label>
                    <span className="text-red-500 text-xs mt-1 lg:w-80 w-60 break-keep">{errors.password && errors.password.message}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="floating_new_password"
                        autoComplete='new-password'
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-500 peer"
                        id="new_password"
                        {...register('new_password', {
                            required: 'Password is required',
                            pattern: {
                                value: /^(?=.*[!@#$%^&*()_\-+=<>?])(?=.*\d).+$/,
                                message: 'Password must contain at least 1 special symbol and 1 digit',
                            },
                        })}
                    />
                    <label
                        htmlFor="floating_new_password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-500 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        New Password
                    </label>
                    <span className="text-red-500 text-xs mt-1 lg:w-80 w-60 break-keep">{errors.new_password && errors.new_password.message}</span>
                </div>
                <button
                    type="submit"
                    className="border border-purple-500 text-purple-500 hover:bg-purple-600 hover:text-white flex  justify-center gap-4  items-center font-bold py-2 px-4  ease-linear transition-all duration-150 rounded-lg"
                >
                    <span className='text-lg font-semibold '> Reset</span>
                    <RiLockPasswordLine className='text-2xl font-bold' />
                </button>
            </form>
        </>
    )
}

export default ResetPassword