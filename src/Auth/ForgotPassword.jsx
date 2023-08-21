import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useForgotPasswordMutation } from '../features/auth/AuthServices';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isMailSent, setIsMailSent] = useState(false)
    const [forgotPassword] = useForgotPasswordMutation()

    const onSubmit = async (info) => {

        const response = await forgotPassword({ email: info.email })
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

                <div className="h-[90%] w-full md:w-3/4 m-4  dark:text-white ">
                    <div className="text-xl cursor-pointer flex flex-col justify-center items-center my-3 md:mt-0">
                        <h1 className="font-bold text-3xl text-purple-500 dark:text-purple-400 ">Forgot Password</h1>
                    </div>
                    <h6 className="text-sm font-medium text-gray-600 dark:text-gray-300  m-1 text-center">
                        Trouble Logging In?
                        <br />
                        <span>No problem, simply enter your email address</span>
                    </h6>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">

                            <div className="relative flex  flex-col rounded-xl  group md:w-fit w-3/4">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    id="email"
                                    autoFocus
                                    autoComplete="email"
                                    className={`outline-none bg-white dark:bg-gray-700 border rounded-xl flex flex-grow p-3  rounded-l-xl px-4 text-xs duration-300  md:w-72 lg:w-[340px] w-full ${errors.email ? 'border-red-500 animate-shake' : ''}`}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: 'Invalid email',
                                        },
                                    })}
                                />
                                <div className="absolute top-0  right-2 duration-300 rounded-xl bg-transparent p-2 group-focus-within:-top-2 group-focus-within:-right-2 group-focus-within:bg-purple-500">
                                    <FiMail className={`text-primary group-focus-within:text-white ${errors.email && 'text-red-500'}`} />
                                </div>
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