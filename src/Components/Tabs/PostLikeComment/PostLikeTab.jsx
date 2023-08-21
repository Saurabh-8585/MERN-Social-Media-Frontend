import { Tab, Tabs } from "../Tabs";
import PostCard from "../../Card/PostCard";
import PostNotFound from "../../Card/PostNotFound";
import { RiStickyNoteFill } from 'react-icons/ri'
import { AiFillLike, AiOutlineComment } from 'react-icons/ai';
import { MdOutlinePostAdd } from "react-icons/md";

export default function PostLikeTab({ userPosts, filteredLikedPost, filteredCommentedPost }) {

    return (
        <>
            <Tabs>
                <Tab label="Posts" icon={<RiStickyNoteFill />}>
                    <div className="py-4">
                        {
                            userPosts?.post?.length === 0 ?
                                <PostNotFound
                                    message='Not Posted Yet'
                                    icon={<MdOutlinePostAdd className="text-white font-extrabold text-2xl cursor-pointer" />
                                    }
                                />
                                : userPosts?.post.map(postData =>
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


                                    />)
                        }
                    </div>
                </Tab>
                <Tab label="Likes" icon={<AiFillLike />}>
                    <div className="py-4">

                        {
                            filteredLikedPost?.length === 0 ?
                                <PostNotFound
                                    message='No Liked Posts Yet'
                                    icon={<MdOutlinePostAdd className="text-white font-extrabold text-2xl cursor-pointer" />

                                    }
                                />
                                : filteredLikedPost?.map(postData =>
                                    <PostCard
                                        key={postData?._id}
                                        author={postData?.author}
                                        content={postData?.content}
                                        createdAt={postData?.createdAt}
                                        updatedAt={postData?.updatedAt}
                                        postId={postData?._id}
                                        postImage={postData?.postImage}
                                        likes={postData?.likes}
                                        comments={postData?.comments}
                                        location={postData?.location}
                                    />)
                        }
                    </div>
                </Tab>
                <Tab label="Comments" icon={<AiOutlineComment />}>
                    <div className="py-4">

                        {
                            filteredCommentedPost?.length === 0 ?
                                <PostNotFound
                                    message='No Commented Yet'
                                    icon={<MdOutlinePostAdd className="text-white font-extrabold text-2xl cursor-pointer" />

                                    }
                                />
                                : filteredCommentedPost?.map(postData =>
                                    <PostCard
                                        key={postData?._id}
                                        author={postData?.author}
                                        content={postData?.content}
                                        createdAt={postData?.createdAt}
                                        updatedAt={postData?.updatedAt}
                                        postId={postData?._id}
                                        postImage={postData?.postImage}
                                        likes={postData?.likes}
                                        comments={postData?.comments}
                                        location={postData?.location}
                                    />)
                        }
                    </div>
                </Tab>
            </Tabs>
        </>
    );
}