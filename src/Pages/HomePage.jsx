import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../Components/Card/PostCard'
import CreateNewPost from '../Components/Card/CreateNewPost'
import { getAllPosts, reset } from '../features/post/postSlice'
// import LoadingSpinner from '../Components/Spinner/LoadingSpinner'
import { toast } from 'react-hot-toast'
import PostLoader from '../Components/Loader/PostLoader'
const HomePage = () => {

    // const dispatch = useDispatch()


    // const { posts, isLoading, isError, message } = useSelector((state) => state.post);
    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message)
    //     }

    //     dispatch(getAllPosts())

    //     return () => {
    //         dispatch(reset())
    //     }
    // }, [, isError, message, dispatch])


    return (
        <>
            {/* <div className="flex justify-center items-center flex-col">
                <CreateNewPost />
                {posts &&
                    isLoading ? <PostLoader /> : posts.map(postData => <PostCard postData={postData} key={postData._id} />)}
            </div> */}
        </>
    )
}

export default HomePage