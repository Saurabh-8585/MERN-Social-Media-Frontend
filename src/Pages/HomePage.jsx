import PostCard from '../Components/Card/PostCard'
import CreateNewPost from '../Components/Card/CreateNewPost'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllPostsQuery } from '../features/post/PostServices'
import Slider from '../Components/Slider/Slider'



const HomePage = () => {
    const { data, isLoading } = useGetAllPostsQuery();
    let picture = 'https://lh3.googleusercontent.com/a/AAcHTtehBfE9I4H2PgFwx_GZKqUoaXYXpPYw-2EUOjnpFsNg=s96-c'
    console.log();
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

                <Slider />
            </div>
        </>
    )
}

export default HomePage