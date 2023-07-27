import PostCard from '../Components/Card/PostCard'
import CreateNewPost from '../Components/Card/CreateNewPost'
import PostLoader from '../Components/Loader/PostLoader'
import { useGetAllPostsQuery } from '../features/post/PostServices'

import Slider from '../Components/Slider/Slider'
import { useEffect } from 'react'
import toast from 'react-hot-toast'



const HomePage = () => {
    const { data, isLoading } = useGetAllPostsQuery();

    const getGoogleProfile = async (code) => {
        try {
            const userInfo = await fetch(`${process.env.REACT_APP_AUTH}/login/success?code=${code}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            });

            if (userInfo.ok) {
                const data = await userInfo.json();
                console.log(data);
                toast.success(data.user.message)
                sessionStorage.setItem('user', data.user.token);

            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            getGoogleProfile(code);
            const newUrl = window.location.origin + window.location.pathname;
            window.history.pushState({}, '', newUrl);
        }

    }, []);
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