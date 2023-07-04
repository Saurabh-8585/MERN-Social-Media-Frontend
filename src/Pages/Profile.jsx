import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetProfileQuery } from '../features/user/UserServices';
import PostLoader from '../Components/Loader/PostLoader';
import ProfileLoader from '../Components/Loader/ProfileLoader'
import ProfileCard from '../Components/Card/ProfileCard';
import PostCard from '../Components/Card/PostCard';
import { useGetSingleUserPostsQuery } from '../features/post/PostServices';
import TabsRender from '../Components/Tabs/UserTab';
import Slider from '../Components/Slider/Slider';
const Profile = () => {

  const { id } = useParams()


  const { data, isLoading: profileLoading } = useGetProfileQuery(id)

  const { data: userPosts, isLoading: postLoading } = useGetSingleUserPostsQuery(id)

  const userInfo = data?.userInfo;


  return (

    <div className="flex justify-center items-center flex-col">
      {
        profileLoading ? <ProfileLoader />

          : postLoading ? <PostLoader />

            :
            <>
              <ProfileCard userInfo={userInfo} totalPosts={userPosts?.post?.length} />
              {userPosts?.post?.length === 0 && <span className='text-gray-800 text-md text-left font-bold mt-2'>Not posted yet</span>}
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
                  />)
              }
              <Slider />

            </>}
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