import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/Avatar.png'
const UserCard = ({ userData }) => {
    return (
        <div className="flex flex-col items-center rounded-2xl p-5 bg-white border shadow-md dark:bg-navy-800 dark:text-white dark:shadow-none w-fit h-fit">
            <img className="h-32 w-32 rounded-full" src={userData?.userImage ? userData.userImage : Avatar} alt="user" />
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
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-navy-700 dark:text-white">{userData?.followers?.length}</p>
                    <p className="text-sm font-normal text-gray-600">Followers</p>
                </div>
                <div className="flex flex-col items-center justify-center">
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
    );
};

export default UserCard;
