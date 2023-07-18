import React, { useRef, useState } from 'react'
import Avatar from '../assets/Avatar.png'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineSend } from 'react-icons/ai'
const SingleChat = () => {
    const { id } = useParams()
    const [message, setMessage] = useState('')
    const messageRef = useRef()
    const sendMessage = () => {
        if (message.trim() === '') {
            messageRef.current.focus();
        } else {
            alert(messageRef);
        }
    }
    return (
        <div className="flex justify-center items-center flex-col mt-10  w-full max-w-3xl m-auto p-5">
            <div className="flex justify-between items-center gap-5 p-5 w-full border ">
                <Link to='/messages'>
                    <FaArrowLeft className='text-xl text-purple-600' />
                </Link>
                <Link to={`/profile/${id}`}>
                    <span className=' font-semibold text-gray-600'>Guest</span>
                </Link>
                <Link to={`/profile/${id}`}>

                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        // src={data?.userImage?.url ? data.userImage.url : Avatar}
                        src={Avatar}
                        alt='Post_Photo'
                    />
                </Link>
            </div>
            <div className="flex justify-between items-center gap-5 p-5 w-full border ">

                <input
                    type="text"
                    placeholder="Message..."
                    ref={messageRef}
                    value={message}
                    autoFocus
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-primary text-body-color placeholder-body-color focus:border-purple-500 active:border-purple-500 w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]"
                />
                <button
                    className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 font-bold py-3 px-5 md:px-8 rounded-full  float-right shadow-md  ease-linear transition-all duration-150 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white"

                    onClick={sendMessage}
                >
                    <AiOutlineSend className='text-xl' />
                </button>
            </div>
        </div>
    )
}

export default SingleChat