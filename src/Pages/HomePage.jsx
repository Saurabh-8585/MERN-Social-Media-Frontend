import PostCard from '../Components/Card/PostCard'
import CreateNewPost from '../Components/Card/CreateNewPost'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllPostsQuery } from '../features/post/PostServices'


const HomePage = () => {
    const { data, isLoading } = useGetAllPostsQuery();


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
                    />)}


            </div>
        </>
    )
}

export default HomePage