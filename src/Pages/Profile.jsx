import { useParams } from 'react-router-dom';
import { useGetProfileQuery } from '../features/user/UserServices';
import PostLoader from '../Components/Loader/PostLoader';
import ProfileLoader from '../Components/Loader/ProfileLoader'
import ProfileCard from '../Components/Card/ProfileCard';
import PostNotFound from '../Components/Card/PostNotFound';
import { useGetAllPostsQuery, useGetSingleUserPostsQuery } from '../features/post/PostServices';
import getCurrentUser from '../utils/CurrentUser';
import CreateNewPost from '../Components/Card/CreateNewPost'
import { useEffect } from 'react';
import { VscAccount } from 'react-icons/vsc';
import PostLikeTab from '../Components/Tabs/PostLikeComment/PostLikeTab';

const Profile = () => {

  const user = getCurrentUser(sessionStorage.getItem('user'))
  const { id } = useParams()
  const userId = id ? id : user

  const { data, isLoading: profileLoading } = useGetProfileQuery(userId)
  const { data: allPostsData } = useGetAllPostsQuery();
  const { data: userPosts, isLoading: postLoading } = useGetSingleUserPostsQuery(userId)

  const userInfo = data?.userInfo;

  useEffect(() => {
    window.scrollTo(0, 0)
  
  }, [])

  const filteredLikedPost = allPostsData?.filter((posts) => posts?.likes?.find(likedUser => likedUser?._id === userId))
  const filteredCommentedPost = allPostsData?.filter(post => post?.comments?.find(comment => comment?.user._id === userId));
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
                <ProfileCard
                  userInfo={userInfo}
                  totalPosts={userPosts?.post?.length}
                  userId={userId}
                />

                {((user === id) || (!id && user)) &&
                  <CreateNewPost />
                }

                <div id='post' className='flex justify-center items-center flex-col w-full'>
                  <PostLikeTab
                    userPosts={userPosts}
                    filteredLikedPost={filteredLikedPost}
                    filteredCommentedPost={filteredCommentedPost}
                  />
                </div>

             
              </>
      }
    </div>



  )
}

export default Profile


