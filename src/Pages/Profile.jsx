import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetProfileQuery } from '../features/user/UserServices';
import PostLoader from '../Components/Loader/PostLoader';
import ProfileLoader from '../Components/Loader/ProfileLoader'
import ProfileCard from '../Components/Card/ProfileCard';
import PostCard from '../Components/Card/PostCard';
import { useGetSingleUserPostsQuery } from '../features/post/PostServices';
const Profile = () => {

  const { id } = useParams()
  console.log(id);


  const { data, isLoading } = useGetProfileQuery(id)

  const { data: userPosts, isLoading: postLoading } = useGetSingleUserPostsQuery(id)

  const userInfo = data?.userInfo;
  console.log({ userInfo });


  return (


    isLoading ?
      <>
        <ProfileLoader />
        <PostLoader />
      </>
      :
      <>
        <ProfileCard userInfo={userInfo} totalPosts={userPosts?.post?.length} />


        <div className='flex justify-center items-center px-5'>
          <div className="flex items-center max-w-xl w-full">
            <hr className="flex-grow border border-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">Posts</span>
            <hr className="flex-grow border border-gray-300" />
          </div>
        </div>

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
      </>




  )
}

export default Profile