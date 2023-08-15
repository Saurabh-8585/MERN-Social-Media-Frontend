import PostImage from '../../assets/PostSVG.svg'
const PostNotFound = ({ message, icon, handleClick }) => {

    return (
        <div className="flex items-center justify-center w-full mb-5">
            <div className="text-lg  rounded-xl  w-full max-w-xl ">
                <img
                    src={PostImage}
                    alt="Not Found"
                    className="w-full h-auto mx-auto "
                    style={{ maxWidth: '100%' }}
                />
                <div className='flex justify-center items-center mb-5'>
                    <button className="bg-purple-500 hover:shadow-md hover:bg-purple-600 font-bold py-4 px-5 md:px-8 rounded-full shadow-sm  text-white flex justify-between items-center gap-3"
                        onClick={handleClick}>
                        {message}
                        {icon}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostNotFound