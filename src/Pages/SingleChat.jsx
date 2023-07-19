import React, { useRef, useState, useEffect, useReducer } from 'react';
import Avatar from '../assets/Avatar.png';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineSend } from 'react-icons/ai';
import getCurrentUser from '../utils/CurrentUser';
import { useGetConversationQuery } from '../features/conversation/ConversationService';
import { useGetMessageQuery, usePostMessageMutation } from '../features/message/MessageService';
import { getTimeAgo } from '../utils/DateFormatter';
import { io } from 'socket.io-client'

const SingleChat = () => {
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const socket = useRef(io("ws://localhost:8900"));
    const messageRef = useRef();
    const scrollRef = useRef();
    const user = getCurrentUser(sessionStorage.getItem('user'));
    const { data } = useGetConversationQuery(id)
    const { data: msg, isLoading } = useGetMessageQuery(data && data[0]._id)
    const [postMsg] = usePostMessageMutation()
    const sendMessage = async () => {

        if (message.trim() === '') {
            messageRef.current.focus();
        }
        else {
            const msgData = {
                conversationId: data[0]._id,
                sender: user,
                text: message
            }
            try {
                const response = await postMsg(msgData)
                if (response.data) {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
            setMessage('');
        }
    };

    useEffect(() => {
        socket.current.emit('addUser',user )
        socket.current.on('getUsers',allUsers=>{
            console.log(allUsers);
        })

    }, [])
    // useEffect(() => {
    //     socket?.on("welcome", callbackMsg => {
    //         console.log(callbackMsg);
    //     })
    // }, [socket])
console.log({socket});
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [msg]);

    return (
        <div className="flex justify-center items-center flex-col  w-full max-w-3xl m-auto p-5">
            <div className="flex justify-between items-center gap-5 p-5 w-full border" >
                <Link to="/messages">
                    <FaArrowLeft className="text-xl text-purple-600" />
                </Link>
                <Link to={`/profile/${id}`}>
                    <span className="font-semibold text-gray-600">Guest</span>
                </Link>
                <Link to={`/profile/${id}`}>
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src={Avatar}
                        alt="Post_Photo"
                    />
                </Link>
            </div>
            <div
                id="message-container"
                className="flex flex-col p-5 w-full border h-[50vh] overflow-y-auto"
            >
                {!isLoading && msg?.map((messageItem) => (
                    <>
                        <div
                            key={messageItem._id}

                            className={`rounded-lg p-2 mt-2 ${messageItem.sender === user
                                ? 'bg-purple-500 text-white self-end'
                                : 'bg-gray-200 text-black self-start'
                                }`}
                        >
                            <span>{messageItem.text}</span>
                        </div>
                        <span ref={scrollRef} className={` ${messageItem.sender === user
                            ? ' self-end bg-red-600'
                            : ' self-start bg-red-600'
                            }text-gray-800`}>
                            {getTimeAgo(messageItem.createdAt)}
                        </span>
                    </>
                ))}
            </div>




            <div className="flex justify-between items-center gap-5 p-5 w-full border">
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
                    className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 font-bold py-3 px-5 md:px-8 rounded-full float-right shadow-md ease-linear transition-all duration-150 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white"
                    onClick={sendMessage}
                >
                    <AiOutlineSend className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default SingleChat;
