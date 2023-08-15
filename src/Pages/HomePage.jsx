import PostCard from '../Components/Card/PostCard'
import CreateNewPost from '../Components/Card/CreateNewPost'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllPostsQuery } from '../features/post/PostServices'
import Slider from '../Components/Slider/Slider'
import { useNavigate } from 'react-router-dom'



const HomePage = () => {
    const { data, isLoading } = useGetAllPostsQuery();
    const navigate = useNavigate()
    const navigateToProfile = (id) => {
        navigate(`/profile/${id}`)
        window.scroll(0, 0)
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col">

                <CreateNewPost />
                {isLoading ? <PostLoader /> : data?.map(postData =>
                    <PostCard
                        key={postData._id}
                        author={postData.author}
                        content={postData.content}
                        createdAt={postData.createdAt}
                        updatedAt={postData.updatedAt}
                        postId={postData._id}
                        postImage={postData.postImage}
                        likes={postData.likes}
                        comments={postData.comments}
                        location={postData.location}
                    />)}

                <Slider navigateToProfile={navigateToProfile}/>
            </div>
        </>
    )
}

export default HomePage