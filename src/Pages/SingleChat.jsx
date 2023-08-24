import React, { useRef, useState, useEffect } from 'react';
import Avatar from '../assets/Avatar.png';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineSend } from 'react-icons/ai';
import getCurrentUser from '../utils/CurrentUser';
import { useGetConversationQuery, usePostConversationMutation } from '../features/conversation/ConversationService';
import { useGetMessageQuery, usePostMessageMutation } from '../features/message/MessageService';
import { getTimeAgo } from '../utils/DateFormatter';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast'
import { useGetProfileQuery } from '../features/user/UserServices';

const SingleChat = () => {
    const { id } = useParams();
    const [sendingMessage, setSendingMessage] = useState('');
    const socketRef = useRef();
    const messageRef = useRef();
    const scrollRef = useRef();
    const currentUser = getCurrentUser(sessionStorage.getItem('user'));
    const { data: userProfile } = useGetProfileQuery(id)
    const { data: conversationData, isLoading: conversationLoading } = useGetConversationQuery({ currentUser, id });
    const [postConversation] = usePostConversationMutation()
    const { data: messageData, isLoading: isMessageLoading } = useGetMessageQuery(conversationData?.[0]?._id);
    const [messages, setMessages] = useState([]);
    const [postMessage] = usePostMessageMutation();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [pickerVisible, setPickerVisible] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [isTyping, setIsTyping] = useState(false);
    const [isSenderTyping, setIsSenderTyping] = useState(false);


    useEffect(() => {
        setupSocket();
        // return () => {
        //     socketRef.current.disconnect();
        // };
    }, []);

    useEffect(() => {
        if (!conversationLoading && !conversationData) {
            postConversation({ senderId: currentUser, receiverId: id })
        }
    }, [conversationLoading, conversationData])

    useEffect(() => {
        if (!isMessageLoading && messageData) {
            setMessages(messageData);

        }
    }, [messageData, isMessageLoading]);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
        }
    }, [arrivalMessage]);

    const setupSocket = () => {
        // socketRef.current = io(process.env.REACT_APP_BACKEND_URL);   
        // socketRef.current = io('ws://localhost:5000');
        // socketRef.current = io('wss://snapia-backend.vercel.app');
        socketRef.current = io('https://snapia-backend.vercel.app');
        socketRef.current.on('getMessage', ({ senderId, text }) => {
            setArrivalMessage({
                sender: senderId,
                text,
                createdAt: Date.now(),
            });
        });
        socketRef.current.emit('addUser', currentUser);
        socketRef.current.on('getUsers', users => setOnlineUsers(users))
        socketRef.current.on('userTyping', ({ senderId, isTyping }) => {
            if (senderId === id) {
                setIsSenderTyping(isTyping);
            }
        });


    };
    const sendMessage = async () => {
        pickerVisible && setPickerVisible(false)
        socketRef.current.emit('userTyping', { senderId: currentUser, isTyping: false })
        socketRef.current.emit('sendMessage', {
            senderId: currentUser,
            receiverId: id,
            text: sendingMessage,
        });

        if (sendingMessage.trim() === '') {
            messageRef.current.focus();

        } else {
            const msgData = {
                conversationId: conversationData[0]._id,
                sender: currentUser,
                text: sendingMessage,
            };

            const response = await postMessage(msgData);
            if (response.error) {
                toast.error('Something went wrong please try again')
            }
            setSendingMessage('');
        }
        setIsTyping(false);
    };
    // const scrollToBottom = () => {
    //     if (scrollRef.current) {
    //         const inputBoxHeight = 15 + 3 * 2;
    //         const scrollPosition = scrollRef.current.offsetTop - inputBoxHeight;

    //         window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    //     }
    // };
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });

        }
    };

    useEffect(() => {
        scrollToBottom();


        const handleResize = () => {
            scrollToBottom();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [messages]);

    const handleInputFocus = () => {
        scrollToBottom();
    };
    const handleOnChange = (e) => {
        const messageText = e.target.value;
        scrollToBottom()
        setSendingMessage(messageText);
        if (messageText.trim() !== '' && !isTyping) {
            socketRef.current.emit('userTyping', { senderId: currentUser, isTyping: true });
            setIsTyping(true);
        } else if (messageText.trim() === '' && isTyping) {
            socketRef.current.emit('userTyping', { senderId: currentUser, isTyping: false });
            setIsTyping(false);
        }
    };



    return (
        <div className="flex justify-center items-center flex-col md:max-w-3xl border h-auto min-h-[80vh] max-h-full w-full m-auto relative">
            <div className="flex justify-between items-center gap-5 px-5 py-2 fixed top-[75px] border z-10 bg-gray-50 dark:bg-gray-700  md:max-w-3xl w-full">
                <Link to="/messages">
                    <FaArrowLeft className="text-xl text-purple-600" />
                </Link>
                <Link to={`/profile/${id}`} className='flex flex-col'>
                    <span className="font-semibold text-gray-600 font-mono dark:text-gray-50">{userProfile?.userInfo?.username} </span>
                    {isSenderTyping && <span className='text-purple-400 text-center font-semibold'>Typing...</span>}


                </Link>
                <Link to={`/profile/${id}`} className='flex flex-col items-center justify-center gap-3'>
                    <img className="w-12 h-12 rounded-full mr-4" src={userProfile?.userInfo?.userImage?.url ? userProfile?.userInfo?.userImage?.url : Avatar} alt="Post_Photo" />
                    <span className={`px-3 py-1  text-base rounded-3xl ${onlineUsers.includes(id) ? 'text-green-600' : 'text-red-600  '}  mr-3`}>
                        {onlineUsers.includes(id) ? 'Online' : 'Offline'}
                    </span>
                </Link>
            </div>
            <div className="flex flex-col p-5 md:max-w-3xl w-full mb-20    justify-center items-center overflow-y-scroll">
                {!isMessageLoading &&
                    messages &&
                    messages.map((messageItem) => (
                        <React.Fragment key={messageItem._id}>
                            <div
                                className={`rounded-lg p-2  mt-2 max-w-[200px] break-words ${messageItem.sender === currentUser
                                    ? 'bg-purple-500 text-white self-end'
                                    : 'bg-gray-200 text-black self-start'
                                    }`}
                            >
                                <span>{messageItem.text}</span>
                            </div>
                            <span
                                ref={scrollRef}
                                className={` ${messageItem.sender === currentUser ? 'self-end' : 'self-start'
                                    }  text-gray-800 mb-5 dark:text-gray-50`}
                            >
                                {getTimeAgo(messageItem.createdAt)}
                            </span>
                        </React.Fragment>
                    ))}
            </div>
            <div id='message' className="flex gap-3 py-5 w-full max-w-3xl border px-2 items-center bg-gray-50 dark:bg-gray-700 fixed bottom-0  z-20" >
                <div className=" flex-grow " onClick={() => pickerVisible && setPickerVisible(false)}>
                    <input
                        type="text"
                        placeholder="Message..."
                        ref={messageRef}
                        autoFocus
                        onFocus={handleInputFocus}
                        value={sendingMessage}
                        onChange={handleOnChange}
                        className="border-primary text-body-color placeholder-body-color focus:border-purple-500 active:border-purple-500 w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]  z-0"
                    />
                </div>
                <button
                    className="bg-purple-500 text-white hover:bg-white hover:text-purple-500 border border-purple-500 font-bold rounded-full w-fit h-fit py-3 px-3 shadow-md ease-linear transition-all duration-150 disabled:border-gray-300 disabled:text-gray-400 disabled:bg-white"
                    onClick={sendMessage}
                >
                    <AiOutlineSend className="text-md" />
                </button>
            </div>

        </div >
    );
};

export default SingleChat;
