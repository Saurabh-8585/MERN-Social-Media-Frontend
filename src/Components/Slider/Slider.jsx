import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import { EffectCards, Navigation } from 'swiper/modules';
import { Avtar } from '../../utils/Avtar'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useGetAllUsersQuery } from '../../features/user/UserServices';

const MobileSlider = () => {
    return (
        <div className="lg:hidden">
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                loop={true}
                className="w-[290px] h-[400px] "
            >
                <SwiperSlide className='flex items-center justify-center rounded-lg'>
                    <div className="flex flex-col justify-center items-center  h-full w-full">
                        <div className="flex flex-col items-center rounded-2xl w-full h-full mx-auto p-5 bg-white border shadow-md dark:bg-navy-800 dark:text-white dark:shadow-none  ">
                            <img
                                className=" h-32 w-32 rounded-full"
                                src={Avtar}
                                alt="user"
                            />

                            <div className="mt-10 flex flex-col items-center">
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                    Adela Parkson
                                </h4>
                                <p className="text-base font-normal text-gray-600">Product Manager</p>
                            </div>
                            <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
                                    <p className="text-sm font-normal text-gray-600">Posts</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">9.7K</p>
                                    <p className="text-sm font-normal text-gray-600">Followers</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-navy-700 dark:text-white">434</p>
                                    <p className="text-sm font-normal text-gray-600">Following</p>
                                </div>
                            </div>
                            <button
                                className="bg-purple-500  hover:bg-purple-600 text-white font-bold py-3 px-5  rounded-full shadow-md flex items-center justify-around gap-3 w-fit mt-2"
                                type="submit"
                            // onClick={() => follow(userInfo?._id)}
                            >Follow
                                <AiOutlineUserAdd className='text-xl font-bold' />
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
const DesktopSlider = () => {
    return (
        <div className=" hidden lg:flex flex-col justify-center items-center mt-10 mb-10 ml-10 ">
            <Swiper
                effect="coverflow"
                grabCursor={true}
                className="w-full max-w-4xl h-[450px] "
                spaceBetween={50}
                slidesPerView={3}
                navigation={true} modules={[Navigation]}
            >
                <SwiperSlide>
                    <div className="flex flex-col items-center rounded-2xl p-5 bg-white border shadow-md dark:bg-navy-800 dark:text-white dark:shadow-none w-fit">
                        <img className="h-32 w-32 rounded-full" src={Avtar} alt="user" />
                        <div className="mt-10 flex flex-col items-center">
                            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                Adela Parkson
                            </h4>
                            <p className="text-base font-normal text-gray-600">Product Manager</p>
                        </div>
                        <div className="mt-6 mb-3 flex gap-14">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
                                <p className="text-sm font-normal text-gray-600">Posts</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold text-navy-700 dark:text-white">9.7K</p>
                                <p className="text-sm font-normal text-gray-600">Followers</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold text-navy-700 dark:text-white">434</p>
                                <p className="text-sm font-normal text-gray-600">Following</p>
                            </div>
                        </div>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-5 rounded-full shadow-md flex items-center justify-around gap-3 w-fit mt-2">
                            Follow
                            <AiOutlineUserAdd className="text-xl font-bold" />
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default function Slider() {
    const { data } = useGetAllUsersQuery()
    console.log({data});
    return (
        <>
            <MobileSlider />
            <DesktopSlider />
        </>
    )
}