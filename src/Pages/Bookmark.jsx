import  { useEffect } from 'react'
import PostCard from '../Components/Card/PostCard'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllBookMarksQuery } from '../features/bookmark/BookMarkServices'
import { BsBookmarkPlus } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import useHandlePostActions from '../hooks/useHandlePostActions'
import PostNotFound from '../Components/Card/PostNotFound'
const Bookmark = () => {
  const { data, isLoading, } = useGetAllBookMarksQuery()

  const { removeFromBookmark } = useHandlePostActions()
  const navigate = useNavigate()

  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (

    <div className="flex justify-center items-center flex-col">
      {!isLoading && data.length < 1 &&
        <PostNotFound
          message='Add New BookMark'
          icon={<BsBookmarkPlus className="text-white font-extrabold text-2xl cursor-pointer" />}
          handleClick={() => navigate('/')}
        />
      }


      {isLoading ? <PostLoader /> :
        data?.map((bookmarks) =>
          <PostCard
            key={bookmarks._id}
            author={bookmarks.post?.author}
            content={bookmarks.post?.content}
            postImage={bookmarks.post?.postImage}
            createdAt={bookmarks.post?.createdAt}
            postId={bookmarks.post?._id}
            likes={bookmarks.post?.likes}
            bookmarkID={bookmarks._id}
            removeFromBookMark={removeFromBookmark}
          />

        )}




    </div>
  )
}

export default Bookmark