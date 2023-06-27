import React from 'react'
import PostCard from '../Components/Card/PostCard'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllBookMarksQuery } from '../features/bookmark/BookMarkServices'
import { BsBookmarkPlus } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import useHandlePostActions from '../hooks/useHandlePostActions'
const Bookmark = () => {
  const { data, isLoading, } = useGetAllBookMarksQuery()
 
  const { removeFromBookmark } = useHandlePostActions({})



  return (

    <div className="flex justify-center items-center flex-col">
      {!isLoading && data.length < 1 &&
        <div className="p-5 flex items-center justify-center w-full ">
          <div className="bg-white dark:bg-gray-800  text-lg p-4 rounded-xl  w-full max-w-xl ">
            <img
              src="https://img.freepik.com/free-vector/computer-user-human-character-program-windows_1284-63445.jpg?w=740&t=st=1687531407~exp=1687532007~hmac=4fca4b34f720e749446eecb9e436ced9666cb4c83f5f005d43b364a15fd713f8"
              alt="No bookmarks"
              className="w-full h-auto mx-auto mb-4"
              style={{ maxWidth: '100%' }}
            />
            <NavLink to="/" className='flex justify-center items-center'>
              <button className="bg-purple-500 hover:shadow-md hover:bg-purple-600 font-bold py-4 px-5 md:px-8 rounded-full shadow-sm border text-white flex justify-between items-center gap-3">
                Add New Bookmark
                <BsBookmarkPlus className="text-white font-extrabold text-2xl cursor-pointer" />
              </button>
            </NavLink>
          </div>
        </div>
      }


      {isLoading ? <PostLoader /> :
        data?.map((bookmarks) =>
          <PostCard
            key={bookmarks._id}
            author={bookmarks.post.author}
            content={bookmarks.post.content}
            postImage={bookmarks.post.postImage}
            createdAt={bookmarks.post.createdAt}
            postId={bookmarks.post._id}
            likes={bookmarks.post.likes}
            bookmarkID={bookmarks._id}
            removeFromBookMark={removeFromBookmark}
          />

        )}




    </div>
  )
}

export default Bookmark