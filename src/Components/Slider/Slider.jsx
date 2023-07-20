import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import Avatar from '../../assets/Avatar.png'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { useGetAllUsersQuery } from '../../features/user/UserServices';
import LoadingSpinner from '../Loader/LoadingSpinner'
import { Link, } from 'react-router-dom';
import getCurrentUser from '../../utils/CurrentUser';




const Slider = () => {
    const { data, isLoading } = useGetAllUsersQuery()
    const userID = getCurrentUser(sessionStorage.getItem('user'))
    const filterUser = data?.filter((user) => user._id !== userID).sort(() => Math.random() - 0.5)
    console.log(filterUser);
    return (
        isLoading ? <LoadingSpinner /> :
            <>
                {/* for large screen */}
                <span className='text-gray-600 text-md text-left font-semibold mt-2'>Suggested for you</span>
                <div className="hidden lg:flex flex-col justify-center items-center my-10 ml-10 w-full max-w-4xl ">
                    <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        className="w-full max-w-4xl h-[450px] "
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation={true} modules={[Navigation]}
                    >
                        {
                            filterUser?.map(userData => (
                                <SwiperSlide key={userData._id}>
                                    <div className="flex flex-col items-center rounded-2xl p-5 bg-white border shadow-md dark:bg-navy-800 dark:text-white dark:shadow-none w-fit h-fit">
                                        <img className="h-32 w-32 rounded-full" src={userData?.userImage ? userData.userImage.url : Avatar} alt="user" />
                                        <Link to={`/profile/${userData._id}`} onClick={() => window.scroll(0, 0)} className="mt-10 flex flex-col items-center">
                                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                                {userData.username}
                                            </h4>
                                        </Link>
                                        <Link to={`/profile/${userData._id}`} onClick={() => window.scroll(0, 0)} className="mt-6 mb-3 flex gap-10">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData?.postCount}</p>
                                                <p className="text-sm font-normal text-gray-600">Posts</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-center" >
                                                <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData?.followers?.length}</p>
                                                <p className="text-sm font-normal text-gray-600">Followers</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-center" >
                                                <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData?.following?.length}</p>
                                                <p className="text-sm font-normal text-gray-600">Following</p>
                                            </div>
                                        </Link>
                                        <Link to={`/profile/${userData._id}`} onClick={() => window.scroll(0, 0)}>

                                            <button
                                                className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500  ease-linear transition-all duration-150 font-bold py-3 px-5  rounded-full shadow-md flex items-center justify-around gap-3 w-fit mt-2">
                                                View
                                                <HiOutlineUserCircle className='text-xl font-bold' />
                                            </button>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>

                {/* for mobile */}

                <div className="lg:hidden flex max-w-xl w-full overflow-hidden  mt-10 mb-20">
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        loop={true}
                        className="w-[290px] h-[400px] "
                    >
                        {
                            filterUser?.map(userData => (
                                <SwiperSlide key={userData._id}>
                                    <div className="flex flex-col items-center rounded-[18px] h-full p-5 bg-white border-2
                                      shadow-md dark:bg-navy-800 dark:text-white dark:shadow-none w-full">
                                        <img className="h-32 w-32 rounded-full" src={userData.userImage ? userData.userImage : Avatar} alt="user" />
                                        <Link to={`/profile/${userData._id}`} onClick={() => window.scroll(0, 0)} className="mt-10 flex flex-col items-center">
                                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                                {userData.username}
                                            </h4>
                                        </Link>
                                        <Link to={`/profile/${userData._id}`} onClick={() => window.scroll(0, 0)} className="mt-6 mb-3 flex gap-14">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData?.postCount}</p>
                                                <p className="text-sm font-normal text-gray-600">Posts</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-center" >
                                                <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData?.followers?.length}</p>
                                                <p className="text-sm font-normal text-gray-600">Followers</p>
                                            </div>
                                            <div className="flex flex-col items-center justify-center" >
                                                <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData?.following?.length}</p>
                                                <p className="text-sm font-normal text-gray-600">Following</p>
                                            </div>
                                        </Link>
                                        <Link to={`/profile/${userData._id}`} onClick={() => window.scroll(0, 0)}>

                                            <button
                                                className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 font-bold py-3 px-5  rounded-full shadow-md flex items-center justify-around gap-3 w-fit mt-2 ease-linear transition-all duration-150">
                                                View
                                                <HiOutlineUserCircle className='text-xl font-bold' />
                                            </button>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div >
            </>

    )
}
export default Slider