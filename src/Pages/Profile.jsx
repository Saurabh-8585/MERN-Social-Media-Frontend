import React from 'react'
import { useParams } from 'react-router-dom';
import PostLoader from '../Components/Loader/PostLoader';
import { useGetUserInfoQuery } from '../features/user/UserServices';
import { useGetAllPostsQuery } from '../features/post/PostServices';

const Profile = () => {

  const { id } = useParams()
  console.log(id);

  const { data, isLoading, isError, error } = useGetAllPostsQuery()
  if (isLoading) {
    return <PostLoader />
  }

  if (isError) {
    console.log(error);
  }

  console.log(data);

  return (
    <>
    </>

  )
}

export default Profile