import { useState } from 'react'
import getCurrentUser from '../utils/CurrentUser';
import PostNotFound from '../Components/Card/PostNotFound';
import { useGetProfileQuery } from '../features/user/UserServices';
import { FaSearch, } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../assets/Avatar.png'
import { AiOutlineUserAdd } from 'react-icons/ai';


const Message = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([])
  const user = getCurrentUser(sessionStorage.getItem('user'));
  const navigate = useNavigate()
  const { data, isLoading } = useGetProfileQuery(user);
  const userData = data?.userInfo;
  const userFollowings = userData?.following || [];
  const userFollowers = userData?.followers || [];
  const combinedUsersArray = [...userFollowers, ...userFollowings];
  const uniqueUsersSet = new Set();
  const uniqueUsersArray = [];

  const isFollowing = (user, follower) => {
    return (
      user.following &&
      Array.isArray(user.following) &&
      user.following.some(followingUser => followingUser._id === follower._id)
    );
  };

  combinedUsersArray.forEach(user => {
    if (!uniqueUsersSet.has(user._id)) {
      uniqueUsersSet.add(user._id);
      if (!isFollowing(user, user)) {
        uniqueUsersArray.push(user);
      }
    }
  })




  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    let search = (e.target.value).toLowerCase().replace(/\s/g, '');
    const newFilteredData = combinedUsersArray.filter((user) =>
      user?.username.toLowerCase().replace(/\s/g, '').includes(search) ||
      (user?.about && user?.about.toLowerCase().replace(/\s/g, '').includes(search))
    );

    setFilteredData(newFilteredData)
  };



  return (
    <div className="flex justify-center items-center flex-col mt-10  w-full max-w-3xl m-auto border">
      <div className="flex justify-between items-center gap-5 p-5 w-full">
        <div className="relative flex items-center  w-full">
          <input
            type="text"
            placeholder="Your Friends..."
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500 transition-colors duration-300 w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          {searchTerm && (
            <ul className="absolute top-12 w-full bg-white border border-gray-300 rounded-md shadow-md">
              {filteredData.map((user) => (
                <Link to={`/messages/${user._id}`} key={user._id} onClick={() => setSearchTerm('')}>
                  <li className="md:px-10 px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between" >
                    <img
                      className="h-10 w-10 rounded-full border"
                      src={user?.userImage?.url ? user?.userImage?.url : Avatar}
                      alt="User_Profile"
                    />
                    <span className='text-gray-500 dark:text-gray-400 font-semibold text-start'>
                      {user.username}
                    </span>
                  </li>
                </Link>
              ))}
              {filteredData.length === 0 &&
                <li className="px-10 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between">
                  <img
                    className="h-10 w-10 rounded-full border"
                    src={Avatar}
                    alt="User_Profile"
                  />
                  <span className='text-gray-500 dark:text-gray-400 font-semibold text-start'>
                    User not found
                  </span>
                </li>
              }
            </ul>
          )}

        </div>
        <Link
          to={`/profile`}>
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={userData?.userImage?.url ? userData.userImage.url : Avatar}
            alt='Post_Photo'
          />
        </Link>

      </div>
      <div className="flex flex-col items-center justify-center w-full p-5 h-full">
        {
          !isLoading && uniqueUsersArray.length > 0 ? uniqueUsersArray.map(userList => (
            <Link
              to={`/messages/${userList._id}`} key={userList._id}
              class="flex items-center w-full py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none justify-between px-5 md:px-10">
              <img class="object-fill w-12 h-12 rounded-full"
                src={userList?.userImage?.url ? userList?.userImage?.url : Avatar} alt="username" />

              <span class="block ml-2 font-semibold text-gray-600">{userList.username}</span>



            </Link>

          ))
            : <PostNotFound message='Make new friends' icon={<AiOutlineUserAdd className='text-2xl'/>} handleClick={() => navigate('/')} />
        }
      </div>

    </div>
  )
}

export default Message




