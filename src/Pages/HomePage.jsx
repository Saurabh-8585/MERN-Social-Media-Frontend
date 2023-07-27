    import PostCard from '../Components/Card/PostCard'
    import CreateNewPost from '../Components/Card/CreateNewPost'
    import PostLoader from '../Components/Loader/PostLoader'
    import { useGetAllPostsQuery } from '../features/post/PostServices'

    import Slider from '../Components/Slider/Slider'
    import { useEffect } from 'react'
    import toast from 'react-hot-toast'
    import { useGoogleAuthQuery } from '../features/auth/AuthServices'



    const HomePage = () => {
        const { data, isLoading } = useGetAllPostsQuery();
        const { data: googleResponse } = useGoogleAuthQuery()
       
        useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            console.log({googleResponse},1);
            if (code && !googleResponse) {
                const newUrl = window.location.origin + window.location.pathname;
                window.history.pushState({}, '', newUrl);
            }
        }, [googleResponse]);
        useEffect(() => {
            console.log({googleResponse},2);
            if (googleResponse?.user?.message) {
                console.log(googleResponse.user.message);
                toast.success(googleResponse.user.message);
                sessionStorage.setItem('user', googleResponse.user.token);
            }
        }, [googleResponse]);
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

                    <Slider />
                </div>
            </>
        )
    }

    export default HomePage