import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSinglePostQuery } from '../features/post/PostServices';
import PostLoader from '../Components/Loader/PostLoader';
import PostCard from '../Components/Card/PostCard';
import AddComment from '../Components/AddComment';
import CommentList from '../Components/CommentList';
import PostNotFound from '../Components/Card/PostNotFound';
import { MdOutlinePostAdd } from 'react-icons/md';
const SinglePost = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetSinglePostQuery(id)
    const newData = { ...data }

    const user = sessionStorage.getItem('user')
    return (
        <div className="flex justify-center items-center flex-col mt-10">
            {isLoading ?

                <PostLoader /> :
                <>
                    {
                        data?.post == null ? <PostNotFound message='Create New Post' icon={<MdOutlinePostAdd className="text-white font-extrabold text-2xl cursor-pointer" />} />
                            :

                            <>
                                <PostCard
                                    key={newData.post?._id}
                                    author={newData.post?.author}
                                    content={newData.post?.content}
                                    createdAt={newData.post?.createdAt}
                                    likes={newData.post?.likes}
                                    comments={newData.post?.comments}
                                    updatedAt={newData.post?.updatedAt}
                                    postId={newData.post?._id}

                                />

                                <AddComment postId={id} />

                                <CommentList
                                    comments={newData.post?.comments}
                                    postId={newData.post?._id}
                                    user={user}
                                    commentLikes={newData.post?.comments} />
                            </>
                    }
                </>
            }

        </div>
    )
}

export default SinglePost