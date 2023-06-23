import React from 'react'
import PostCard from '../Components/Card/PostCard'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllBookMarksQuery, useRemoveFromBookMarkMutation } from '../features/bookmark/BookMarkServices'
import { toast } from 'react-hot-toast'

const Bookmark = () => {
  const { data, isLoading, } = useGetAllBookMarksQuery()
  const [removeBookMark] = useRemoveFromBookMarkMutation()



  const removeFromBookmark = async (bookmarkId) => {
    const response = await removeBookMark(bookmarkId);
    if (response.error) {
      toast.error(response.error.data.message);
    }
    else {
      toast.success(response.data.message);
    }
  }

  return (

    <div className="flex justify-center items-center flex-col">
      {/* {data.length < 1 && <h1>No bookmarks added yet</h1>} */}


      {isLoading ? <PostLoader /> :
        data?.map((bookmarks) =>
          <PostCard
            key={bookmarks._id}
            author={bookmarks.post.author}
            content={bookmarks.post.content}
            createdAt={bookmarks.post.createdAt}
            updatedAt={bookmarks.post.updatedAt}
            postId={bookmarks.post._id}
            bookmarkID={bookmarks._id}
            removeFromBookMark={removeFromBookmark}
          />

        )}




    </div>
  )
}

export default Bookmark