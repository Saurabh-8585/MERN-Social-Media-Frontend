import React from 'react'
import { BsBookmarkPlus } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const PostNotFound = ({ message, icon }) => {
    return (
        <div className="flex items-center justify-center w-full ">
            <div className="bg-white dark:bg-gray-800  text-lg  rounded-xl  w-full max-w-xl ">
                <img
                    src="https://img.freepik.com/free-vector/computer-user-human-character-program-windows_1284-63445.jpg?w=740&t=st=1687531407~exp=1687532007~hmac=4fca4b34f720e749446eecb9e436ced9666cb4c83f5f005d43b364a15fd713f8"
                    alt="No bookmarks"
                    className="w-full h-auto mx-auto "
                    style={{ maxWidth: '100%' }}
                />
                <NavLink to="/" className='flex justify-center items-center mb-5'>
                    <button className="bg-purple-500 hover:shadow-md hover:bg-purple-600 font-bold py-4 px-5 md:px-8 rounded-full shadow-sm border text-white flex justify-between items-center gap-3">
                        {message}
                        {icon}
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default PostNotFound