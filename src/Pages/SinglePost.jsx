import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSinglePostQuery } from '../features/post/PostServices';
import PostLoader from '../Components/Loader/PostLoader';
import PostCard from '../Components/Card/PostCard';
import AddComment from '../Components/AddComment';
import CommentList from '../Components/CommentList';
const SinglePost = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetSinglePostQuery(id)
    const newData = { ...data }

    return (
        <div className="flex justify-center items-center flex-col mt-10">
            {isLoading ?

                <PostLoader /> :
                <>
                    {data.length < 1 && <h1>No Post found</h1>}
                    <PostCard
                        key={newData.post._id}
                        author={newData.post.author}
                        content={newData.post.content}
                        createdAt={newData.post.createdAt}
                        likes={newData.post.likes}
                        comments={newData.post.comments}
                        updatedAt={newData.post.updatedAt}
                        postId={newData.post._id}

                    />

                    <AddComment postId={id} />
                    <CommentList comments={newData.post.comments} postId={newData.post._id} />
                </>
            }

        </div>
    )
}

export default SinglePost