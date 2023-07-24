import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useForgotPasswordMutation } from '../features/auth/AuthServices';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isMailSent, setIsMailSent] = useState(false)
    const [forgotPassword] = useForgotPasswordMutation()

    const onSubmit = async (info) => {

        const response = await forgotPassword({ email: info.email })
        console.log({ response });
        if (response.error) {
            toast.error(response.error.data.message)
        }
        else {
            toast.success(response.data.message)
            setIsMailSent(true)
        }
    };
    return (
        <div className="flex justify-center items-center mt-20">

            {isMailSent ?
                <div className='flex flex-col justify-center items-center w-fit gap-5 mt-20'>

                    <h6 className=" font-medium text-gray-600 dark:text-gray-400  m-1 text-center text-lg">
                        An email has been sent to your registered email address
                        <br />
                        <span className='text-sm'>Please check your inbox and follow the steps to create a new password.</span>
                    </h6>
                    <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md bg-purple-500 text-white hover:bg-white hover:text-purple-500 flex justify-between gap-5  items-center border border-purple-500  ease-linear transition-all duration-150 font-medium shadow-md hover:shadow-lg"
                        onClick={() => window.open('https://mail.google.com/', '_blank')}>
                        Open Gmail
                        <AiOutlineMail className='text-2xl font-semibold' />
                    </button>
                </div>
                :

                <div className="h-[90%] w-full md:w-3/4 m-4 dark:bg-gray-800 dark:text-white ">
                    <div className="text-xl cursor-pointer flex flex-col justify-center items-center my-3 md:mt-0">
                        <h1 className="font-bold text-3xl text-purple-500 dark:text-purple-400 ">Forgot Password</h1>
                    </div>
                    <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400  m-1 text-center">
                        Trouble Logging In?
                        <br />
                        <span>No problem, simply enter your email address</span>
                    </h6>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">

                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    id="email"
                                    autoFocus
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email',
                                        },
                                    })}
                                    autoComplete="email"
                                    className={`bg-white dark:bg-gray-700 border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-purple-500 focus:placeholder:text-purple-600 text-black dark:text-white dark:first-letter:placeholder:text-gray-300 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.email ? 'border-red-500 animate-shake' : ''}`}
                                />
                                <span className="text-red-500 ml-2 mt-1 text-xs">{errors.email && errors.email.message}</span>
                            </div>

                        </div>
                        <div className="text-center mt-7">
                            <button className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 font-medium shadow-md hover:shadow-lg" type="submit">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            }


        </div>

    );
};

export default ForgotPassword