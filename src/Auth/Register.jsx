import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUserSignUpMutation } from '../features/auth/AuthServices';

const Register = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [signUpUser] = useUserSignUpMutation()
  const onSubmit = async (info) => {
    try {
      const data = await signUpUser({ username: info.username, email: info.email, password: info.password }).unwrap();
      console.log(data);
      if (data.token) {
        toast.success(data.message);
        sessionStorage.setItem('user', data.token)
        navigate('/')
      }
      else {
        toast.error('Something went wrong, try again');
      }
    } catch (error) {
      console.log(error);
      if (error.status === 409) {
        toast.error('User Already Exists')
      }
      else {
        toast.error('Something wen wrong ,try again')
      }
    }
  };


  const password = watch('password');
  return (
    <div className="flex justify-center">
      <div className="h-[90%] w-full md:w-3/4 m-4 dark:bg-gray-800 dark:text-white">
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
          <h1 className="font-bold text-3xl text-purple-500 dark:text-purple-400 m-2">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
            <div className="flex flex-col">
              <input
                type="text"
                autoFocus
                placeholder="Username"
                autoComplete="username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 6,
                    message: 'Username must be at least 6 characters long',
                  },
                })}
                className={`bg-white dark:bg-gray-700 border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-purple-500 focus:placeholder:text-purple-600 text-black dark:text-white dark:placeholder:text-gray-300 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.username ? 'border-red-500 animate-shake' : ''}`}
              />
              <span className="text-red-500 text-xs ml-2 mt-1">
                {errors.username && errors.username.message}
              </span>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email',
                  },
                })}
                autoComplete="email"
                className={`bg-white dark:bg-gray-700 border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-purple-500 focus:placeholder:text-purple-600 text-black dark:text-white dark:placeholder:text-gray-300 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.email ? 'border-red-500 animate-shake' : ''}`}
              />
              <span className="text-red-500 ml-2 mt-1 text-xs">{errors.email && errors.email.message}</span>
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Password"
                autoComplete='new-password'
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[!@#$%^&*()_\-+=<>?])(?=.*\d).+$/,
                    message: 'Password must contain at least 1 special symbol and 1 digit',
                  },
                })}
                className={`bg-white dark:bg-gray-700 border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-purple-500 focus:placeholder:text-purple-600 text-black dark:text-white dark:placeholder:text-gray-300 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.password ? 'border-red-500 animate-shake' : ''}`}
              />
              <span className="text-red-500 text-xs ml-2 mt-1 lg:w-80 w-60 break-keep">
                {errors.password && errors.password.message}
              </span>
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete='new-password'
                {...register('confirmPassword', {
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className={`bg-white dark:bg-gray-700 border rounded-lg px-7 md:px-5 py-2 focus:border focus:outline-purple-500 focus:placeholder:text-purple-600 text-black dark:text-white dark:placeholder:text-gray-300 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] ${errors.confirmPassword ? 'border-red-500 animate-shake' : ''}`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs ml-2 mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="text-center mt-7">
            <button className="uppercase px-[5.4rem] md:w-72 lg:w-[340px] py-2 rounded-md bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150font-medium shadow-md hover:shadow-lg" type='submit'>
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex flex-col justify-center items-center mt-5 md:mt-4 space-y-3 md:space-y-3">
          <div className="text-gray-700 font-semibold dark:text-gray-300"> or </div>
          <div className="flex gap-4">
            <button className="px-4 md:px-[45px] lg:px-[70px]  py-1.5 rounded-md text-gray-500 dark:text-gray-900 dark:bg-white dark:hover:bg-gray-200 border flex items-center gap-6 hover:shadow-md shadow-sm">
              <span>
                <FcGoogle name="logo-google" className="text-3xl" />
              </span>
              <span className="font-semibold">Sign Up with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center my-5 flex flex-col">
          <Link
            to="/signin"
            className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-purple-500 m-1"
          >
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Register;
