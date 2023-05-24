import React from 'react'
import PostCard from '../Components/Card/PostCard'
import CreateNewPost from '../Components/Card/CreateNewPost'

const HomePage = () => {
    return (
        <>
            <div className="flex justify-center items-center flex-col">

                {/* <CreatePost /> */}
                <CreateNewPost />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </>
    )
}

export default HomePage