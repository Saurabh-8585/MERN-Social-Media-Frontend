import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAddNewPasswordMutation } from '../features/auth/AuthServices';
import { useNavigate, useParams } from 'react-router-dom';
const NewPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { id, token } = useParams()
    const [addNewPassword] = useAddNewPasswordMutation()
    const navigate = useNavigate()
    const onSubmit = async (info) => {
        const response = await addNewPassword({ newPassword: info.password, id, token })
        if (response.error) {
            toast.error(response.error.data.message)
        }
        else {
            toast.success(response.data.message)
        }
        navigate('/signin')
    };

    return (
        <div className="flex justify-center mt-28">
            <div className="h-[90%] w-full md:w-3/4 m-4 dark:bg-gray-800 dark:text-white">
                <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
                    <h1 className="font-bold text-3xl text-purple-500 dark:text-purple-400">Reset Password</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
                        <div className="flex flex-col">
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[!@#$%^&*()_\-+=<>?])(?=.*\d).+$/,
                                        message: 'Password must contain at least 1 special symbol and 1 digit',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'Password cannot exceed 14 characters',
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long',
                                    }
                                })}
                                className={`bg-white dark:bg-gray-700 border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-purple-500 focus:placeholder:text-purple-600 text-black dark:text-white dark:placeholder:text-gray-300 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.password ? 'border-red-500 animate-shake' : ''}`}
                            />
                            <span className="text-red-500 text-xs ml-2 mt-1 lg:w-80 w-60 break-keep">{errors.password && errors.password.message}</span>
                        </div>
                    </div>
                    <div className="text-center mt-7">
                        <button className="uppercase px-16 md:px-[80px] lg:px-[105px] py-2 rounded-md bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 font-medium shadow-md hover:shadow-lg" type="submit">
                            Reset Password
                            
                        </button>
                    </div>
                </form>

            </div>
        </div>



    );
};

export default NewPassword