import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSinglePostQuery } from '../features/post/PostServices';
import PostLoader from '../Components/Loader/PostLoader';
import PostCard from '../Components/Card/PostCard';
import AddComment from '../Components/Card/AddComment';
// import CommentList from '../Components/CommentList';
import PostNotFound from '../Components/Card/PostNotFound';
import { MdOutlinePostAdd } from 'react-icons/md';
import Comments from '../Components/Card/Comments';
const SinglePost = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetSinglePostQuery(id)
    const newData = { ...data }
    const navigate = useNavigate()
    const [sortedComments, setSortedComments] = useState([]);

    const handleSortComments = (e) => {
        const option = e.target.value;

        setSortedComments(prevComments => {
            const commentsCopy = [...prevComments];

            if (option === 'old') {
                commentsCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            } else {
                commentsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }

            return commentsCopy;
        });
    };

    useEffect(() => {
        if (newData.post?.comments) {
            setSortedComments(newData.post.comments);
            handleSortComments({ target: { value: 'recent' } });
        }
    }, [newData.post?.comments]);
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div className="flex justify-center items-center flex-col mt-10 gap-5">
            {isLoading ?

                <PostLoader /> :
                <>
                    {
                        data?.post == null ? <PostNotFound
                            message='Post Not Found'
                            icon={<MdOutlinePostAdd className="text-white font-extrabold text-2xl cursor-pointer" />}
                            handleClick={() => {
                                window.scroll(0, 0)
                                navigate('/')
                            }} />
                            :

                            <>
                                <PostCard
                                    key={newData.post?._id}
                                    author={newData.post?.author}
                                    content={newData.post?.content}
                                    createdAt={newData.post?.createdAt}
                                    likes={newData.post?.likes}
                                    comments={newData.post?.comments}
                                    postImage={newData.post?.postImage}
                                    updatedAt={newData.post?.updatedAt}
                                    postId={newData.post?._id}

                                />

                                <AddComment postId={id} />

                                {sortedComments && sortedComments.length !== 0 ?
                                    <>
                                        <div className="flex items-center justify-around  w-full max-w-xl  ">
                                            <label htmlFor="sort-comment" className="mr-2 text-gray-700 font-medium">
                                                Filter
                                            </label>
                                            <select
                                                id="sort-comment"
                                                className="border border-gray-300 px-3 py-2 rounded-md bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"

                                                onChange={handleSortComments}
                                            >
                                                <option value="recent" key="recent">
                                                    Most Recent
                                                </option>
                                                <option value="old" key="old">
                                                    Oldest
                                                </option>
                                            </select>
                                        </div>
                                        <div className='mb-10 mt-2 p-5 md:p-0 flex justify-center flex-col m-auto w-full max-w-xl items-center'>
                                            {sortedComments.map(comment => (
                                                <Comments comment={comment} postId={newData.post?._id} postAuthor={newData.post?.author._id} key={comment._id} />
                                            ))}
                                        </div>
                                    </>
                                    : <PostNotFound
                                        message='Add new comment'
                                        icon={<MdOutlinePostAdd className="text-white font-extrabold text-2xl cursor-pointer" />}
                                        handleClick={() => window.scroll(0, 0)} />

                                }
                            </>
                    }
                </>
            }

        </div >
    )
}

export default SinglePost