import React from 'react'
import PostCard from '../Components/Card/PostCard'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllBookMarksQuery } from '../features/bookmark/BookMarkServices'

const Bookmark = () => {
  const { data, isLoading, } = useGetAllBookMarksQuery()
  console.log(data);
  return (

    <div className="flex justify-center items-center flex-col">
      {/* {data.length < 1 && <h1>No bookmarks added yet</h1>} */}
      {/* {isLoading ? <PostLoader /> : data?.map(postData => <PostCard postData={postData.post} key={postData._id} />)} */}

    </div>
  )
}

export default Bookmark