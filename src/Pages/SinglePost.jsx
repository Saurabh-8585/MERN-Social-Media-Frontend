import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSinglePostQuery } from '../features/post/PostServices';
import PostLoader from '../Components/Loader/PostLoader';
import PostCard from '../Components/Card/PostCard';
const SinglePost = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetSinglePostQuery(id)
    const newData = { ...data }


    return (
        <div className="flex justify-center items-center mt-32 flex-col">
            {isLoading ?
                
                <PostLoader /> :
                <PostCard
                    key={newData.post._id}
                    author={newData.post.author}
                    content={newData.post.content}
                    createdAt={newData.post.createdAt}
                    updatedAt={newData.post.updatedAt}
                    postId={newData.post._id}
                />
            }
        </div>
    )
}

export default SinglePost