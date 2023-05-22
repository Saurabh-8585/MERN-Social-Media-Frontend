import React from 'react'
import PostCard from '../Components/Card/PostCard'
import CreatePost from '../Components/Card/CreatePost'

const HomePage = () => {
    return (
        <>
            <div className="flex justify-center items-center flex-col">
                <CreatePost/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </div>
        </>
    )
}

export default HomePage