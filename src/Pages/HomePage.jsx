import PostCard from '../Components/Card/PostCard'
import CreateNewPost from '../Components/Card/CreateNewPost'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllPostsQuery } from '../features/post/PostServices'
const HomePage = () => {
  const { data, isError, isLoading } = useGetAllPostsQuery();;

    return (
        <>
            <div className="flex justify-center items-center flex-col">
                <CreateNewPost />
                {isLoading ? <PostLoader /> : data?.map(postData => <PostCard postData={postData} key={postData._id} />)}

            </div>
        </>
    )
}

export default HomePage