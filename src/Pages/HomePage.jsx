import React from 'react'
import PostCard from '../Components/Card/PostCard'
import CreatePost from '../Components/Card/CreatePost'
import CreateNew from '../Components/Card/CreateNew'

const HomePage = () => {
    return (
        <>
            <div className="flex justify-center items-center flex-col">

                {/* <CreatePost /> */}
                <CreateNew />
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