import Avtar  from '../../assets/Avatar.png'
import { AiOutlineUserAdd } from 'react-icons/ai'

const UserCard = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center mt-10 mb-20 ">
                <div className="flex flex-col items-center rounded-2xl w-full mx-auto p-5 bg-white border shadow-md dark:bg-navy-800 dark:text-white dark:shadow-none  ">
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

        </>

    )
}

export default UserCard