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
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from 'react-icons/md'

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
        return () => {
            socketRef.current.disconnect();
        };
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
        socketRef.current = io(process.env.REACT_APP_SOCKET_URL);
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
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleEmojiClick = (emojiObject) => {
        setSendingMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const handleOnChange = (e) => {
       
        const messageText = e.target.value;
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
        <div className="flex justify-center items-center flex-col md:max-w-3xl border h-[80vh] w-full m-auto ">
            <div className="flex justify-between items-center gap-5 px-5 py-2  border z-10 bg-white fixed top-10 md:max-w-3xl w-full">
                <Link to="/messages">
                    <FaArrowLeft className="text-xl text-purple-600" />
                </Link>
                <Link to={`/profile/${id}`} className='flex flex-col'>
                    <span className="font-semibold text-gray-600 font-mono">{userProfile?.userInfo?.username} </span>
                    {isSenderTyping && <span className='text-purple-400 text-center font-semibold'>Typing...</span>}


                </Link>
                <Link to={`/profile/${id}`} className='flex flex-col items-center justify-center gap-3'>
                    <img className="w-12 h-12 rounded-full mr-4" src={userProfile?.userInfo?.userImage?.url ? userProfile?.userInfo?.userImage?.url : Avatar} alt="Post_Photo" />
                    <span className={`px-3 py-1  text-base rounded-3xl ${onlineUsers.includes(id) ? 'text-green-600' : 'text-red-600  '}  mr-3`}>
                        {onlineUsers.includes(id) ? 'Online' : 'Offline'}
                    </span>
                </Link>
            </div>
            <div className="flex flex-col p-5 md:max-w-3xl w-full mb-20  sticky bottom-10 justify-center items-center overflow-y-scroll">
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
                                    }  text-gray-800 mb-5`}
                            >
                                {getTimeAgo(messageItem.createdAt)}
                            </span>
                        </React.Fragment>
                    ))}
            </div>
            <div id='message' className="flex gap-3 py-5 w-full max-w-3xl border px-2 items-center bg-white fixed bottom-0 md:bottom-5" >
                <div className=" flex-grow " onClick={() => pickerVisible && setPickerVisible(false)}>
                    <input
                        type="text"
                        placeholder="Message..."
                        ref={messageRef}
                        value={sendingMessage}
                        autoFocus
                        onChange={handleOnChange}
                        className="border-primary text-body-color placeholder-body-color focus:border-purple-500 active:border-purple-500 w-full rounded-lg border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-[#F5F7FD]  z-0"
                    />
                </div>
                {/* {pickerVisible && (
                    <div className="absolute right-0 bottom-20 mt-12 bg-white z-50 w-fit h-fit">
                        <EmojiPicker emojiStyle={EmojiStyle.NATIVE} onEmojiClick={handleEmojiClick} />
                    </div>
                )}
                <button
                    className=" bg-transparent text-gray-400 hover:text-gray-600 focus:outline-none z-20 bg-white"
                    onClick={() => setPickerVisible(true)}
                >
                    <MdOutlineEmojiEmotions className="text-3xl" />
                </button> */}
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
