import React from 'react'
import {AiOutlineHeart, AiOutlineShareAlt} from 'react-icons/ai'
import {FaRegCommentAlt} from 'react-icons/fa'
import { FiBookmark } from 'react-icons/fi'
const PostCard = () => {
    return (
        <>
            <div className="p-5 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-800 p-4 rounded-xl border max-w-xl">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <img
                                className="h-11 w-11 rounded-full"
                                src="https://res.cloudinary.com/dsxjhas6t/image/upload/v1652433208/sapphire/150_x5gbob.jpg"
                                alt=''
                            />
                            <div className="ml-1.5 text-sm leading-tight">
                                <span className="text-black dark:text-white font-bold block ">
                                    Visualize Value
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 font-normal block">
                                    @visualizevalue
                                </span>
                            </div>
                        </div>
                       {/* {<FaRegCommentAlt/>} */}
                    </div>
                    <p className="text-black dark:text-white block text-xl leading-snug mt-3">
                        “No one ever made a decision because of a number. They need a story.” —
                        Daniel Kahneman
                    </p>
                    <img
                        className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
                        src="https://pbs.twimg.com/media/EpkuplDXEAEjbFc?format=jpg&name=medium"
                        alt=''
                    />
                    <p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
                        10:05 AM · Dec 19, 2020
                    </p>
                    <div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1" />
                    <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-center items-center gap-2">
                        <div className="flex items-center mr-4">
                          {<AiOutlineHeart className='text-purple-400 hover:text-purple-300 text-xl'/>}
                            <span className="ml-2">615</span>
                        </div>
                        <div className="flex items-center mr-4 ">
                           {<FaRegCommentAlt className='text-purple-400 hover:text-purple-300 text-xl'/>}
                            <span className="ml-2">93 </span>
                        </div>
                        <div className="flex items-center mr-4 justify-center">
                           {<FiBookmark className='text-purple-400 hover:text-purple-300 text-xl'/>}
                        </div>
                        <div className="flex items-center mr-6 justify-center">
                           {<AiOutlineShareAlt className='text-purple-400 hover:text-purple-300 text-xl'/>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PostCard