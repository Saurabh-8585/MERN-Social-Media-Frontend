import React, { useState } from "react";
import { RiStickyNoteFill } from 'react-icons/ri'
import { AiOutlineForm, AiFillLike } from 'react-icons/ai';
import PostCard from "../../Card/PostCard";
import PostNotFound from "../../Card/PostNotFound";
import { MdOutlinePostAdd } from "react-icons/md";

export default function PostLikeTab({ userPosts, filteredLikedPost, allPostLoading }) {
    const [openTab, setOpenTab] = useState(1);
    console.log( filteredLikedPost );
    return (
        <>
            <div className="flex flex-wrap w-full max-w-xl mb-10 p-4 md:p-0">
                <div className="w-full">
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                        <li className="mr-2 last:mr-0 flex-auto text-center cursor-pointer  ">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 1
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white border border-purple-500")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"

                                role="tablist"
                            >
                                <span className="hidden md:inline-block align-middle mr-5">Posts</span>
                                <RiStickyNoteFill className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>
                        <li className=" mr-2 last:mr-0 flex-auto text-center cursor-pointer ">
                            <div
                                className={
                                    'text-xs font-bold uppercase px-2 py-3 shadow-lg rounded-2xl block leading-normal ' +
                                    (openTab === 2
                                        ? "text-white bg-purple-500"
                                        : "text-purple-500 bg-white border border-purple-500")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <span className="hidden md:inline-block align-middle mr-5">Likes</span>
                                <AiFillLike className=" text-xl inline-block align-middle mr-1" />
                            </div>
                        </li>

                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-2xl dark:bg-gray-800 h-auto ">
                        <div className="py-5 flex-auto border rounded-xl">
                            <div className="tab-content tab-space dark:bg-gray-800 ">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
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
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}