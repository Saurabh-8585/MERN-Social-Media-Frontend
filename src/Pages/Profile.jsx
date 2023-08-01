import { useParams } from 'react-router-dom';
import { useGetProfileQuery } from '../features/user/UserServices';
import PostLoader from '../Components/Loader/PostLoader';
import ProfileLoader from '../Components/Loader/ProfileLoader'
import ProfileCard from '../Components/Card/ProfileCard';
import PostNotFound from '../Components/Card/PostNotFound';
import PostCard from '../Components/Card/PostCard';
import { useGetSingleUserPostsQuery } from '../features/post/PostServices';
import Slider from '../Components/Slider/Slider';
import getCurrentUser from '../utils/CurrentUser';
import CreateNewPost from '../Components/Card/CreateNewPost'
import { MdOutlinePostAdd } from 'react-icons/md';
import { useEffect } from 'react';
import { VscAccount } from 'react-icons/vsc';
const Profile = () => {

  const user = getCurrentUser(sessionStorage.getItem('user'))
  const { id } = useParams()
  const userId = id ? id : user

  const { data, isLoading: profileLoading } = useGetProfileQuery(userId)

  const { data: userPosts, isLoading: postLoading } = useGetSingleUserPostsQuery(userId)

  const userInfo = data?.userInfo;
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (

    <div className="flex justify-center items-center flex-col ">
      {
        profileLoading ? <ProfileLoader />

          : postLoading ? <PostLoader />

            :
            !userInfo ?
              <PostNotFound
                message='User not Found'
                icon={<VscAccount className="text-white font-extrabold text-2xl cursor-pointer" />}
                
                 />
              :
              <>
                <ProfileCard userInfo={userInfo} totalPosts={userPosts?.post?.length} />


                {((user === id) || (!id && user)) ?

                  <CreateNewPost />
                  : userPosts?.post?.length === 0 &&
                  <PostNotFound
                    message='Not Posted Yet'
                    icon={<MdOutlinePostAdd className="text-white font-extrabold text-2xl cursor-pointer" />
                    }
                  />
                }
                <div id='post' className='w-full'>
                  {
                    userPosts?.post?.map(postData =>
                      <PostCard

                        key={postData._id}
                        author={postData.author}
                        content={postData.content}
                        createdAt={postData.createdAt}
                        updatedAt={postData.updatedAt}
                        postId={postData._id}
                        postImage={postData.postImage}
                        likes={postData.likes}
                        comments={postData.comments}
                        location={postData.location}


                      />)
                  }
                </div>
                <Slider />

              </>
      }
    </div>



  )
}

export default Profile



// < div className = 'flex justify-center items-center px-5' >
//   <div className="flex items-center max-w-xl w-full">
//     <hr className="flex-grow border border-gray-300" />
//     <span className="mx-4 text-gray-500 font-medium">Posts</span>
//     <hr className="flex-grow border border-gray-300" />
//   </div>
//         </ >