import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUserSignUpMutation, useGoogleAuthMutation } from '../features/auth/AuthServices';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { FiMail, FiUser, FiLock } from 'react-icons/fi';
const Register = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [signUpUser] = useUserSignUpMutation()
  const [signInGoogle] = useGoogleAuthMutation()
  const onSubmit = async (info) => {
    try {
      const data = await signUpUser({ username: info.username, email: info.email, password: info.password }).unwrap();
      if (data.token) {
        toast.success(data.message);
        sessionStorage.setItem('user', data.token)
        navigate('/')
      }
      else {
        toast.error('Something went wrong, try again');
      }
    } catch (error) {
      if (error.status === 409) {
        toast.error('User Already Exists')
      }
      else {
        toast.error('Something wen wrong ,try again')
      }
    }
  };

  const handleCallBackResponse = async (response) => {
    const googleSignInToast = toast.loading('Signing in ...');
    try {
      const { email, picture, name } = jwtDecode(response.credential)
      let data = { email, picture, name };
      const userData = await signInGoogle(data)
      if (userData.error) {
        toast.error('Something went wrong, try again', { id: googleSignInToast });
      }
      sessionStorage.setItem('user', userData.data.token)
      toast.success(userData.data.message, { id: googleSignInToast })
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, try again', { id: googleSignInToast });
    }

  }


  useEffect(() => {
    /*global google */
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallBackResponse
      });
      google.accounts.id.renderButton(
        document.getElementById('singleDiv'),
        { theme: 'outlined', size: 'large' }
      );
      google.accounts.id.prompt();
    }

  }, []);


  const password = watch('password');
  return (
    <div className="flex justify-center mb-20">
      <div className="h-[90%] w-full md:w-3/4 m-4  dark:text-white">
        <div className="text-xl cursor-pointer flex flex-col justify-center items-center md:mt-0">
          <h1 className="font-bold text-3xl text-purple-500 dark:text-purple-400 m-2">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">

            <div className="relative flex  flex-col rounded-xl  group md:w-fit w-3/4">
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
                className={`outline-none bg-white dark:bg-gray-700 border rounded-xl flex flex-grow p-3  rounded-l-xl px-4 text-xs duration-300  md:w-72 lg:w-[340px] w-full ${errors.email ? 'border-red-500 animate-shake' : ''}`}
             
              />
              <div className="absolute top-0  right-2 duration-300 rounded-xl bg-transparent p-2 group-focus-within:-top-2 group-focus-within:-right-2 group-focus-within:bg-purple-500">
                <FiUser className={`text-primary group-focus-within:text-white ${errors.username && 'text-red-500'}`} />
              </div>
              <span className="text-red-500 text-xs ml-2 mt-1">
                {errors.username && errors.username.message}
              </span>
            </div>
            <div className="relative flex  flex-col rounded-xl  group md:w-fit w-3/4">
              <input
                type="text"
                placeholder="Email"
                id="email"
              
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
            <div className="relative flex  flex-col rounded-xl  group md:w-fit w-3/4">
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                id="password"
                className={`outline-none bg-white dark:bg-gray-700 border rounded-xl flex flex-grow p-3  rounded-l-xl px-4 text-xs duration-300  md:w-72 lg:w-[340px] w-full ${errors.password ? 'border-red-500 animate-shake' : ''}`}
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
              />
              <div className="absolute top-0  right-2 duration-300 rounded-xl bg-transparent p-2 group-focus-within:-top-2 group-focus-within:-right-2 group-focus-within:bg-purple-500">
                <FiLock className={`text-primary group-focus-within:text-white ${errors.password && 'text-red-500'}`} />
              </div>
              <span className="text-red-500 ml-2 mt-1 text-xs">{errors.password && errors.password.message}</span>
            </div>
            <div className="relative flex  flex-col rounded-xl  group md:w-fit w-3/4">
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete='new-password'
                {...register('confirmPassword', {
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className={`outline-none bg-white dark:bg-gray-700 border rounded-xl flex flex-grow p-3  rounded-l-xl px-4 text-xs duration-300  md:w-72 lg:w-[340px] w-full ${errors.password ? 'border-red-500 animate-shake' : ''}`}
          
              />
              <div className="absolute top-0  right-2 duration-300 rounded-xl bg-transparent p-2 group-focus-within:-top-2 group-focus-within:-right-2 group-focus-within:bg-purple-500">
                <FiLock className={`text-primary group-focus-within:text-white ${errors.confirmPassword && 'text-red-500'}`} />
              </div>
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
            <div id="singleDiv"></div>
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
