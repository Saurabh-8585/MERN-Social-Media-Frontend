const Loader = () => {
    return (
        <div className="p-5 flex items-center justify-center w-full">
            <div className="bg-gray-200 dark:bg-gray-800 animate-pulse p-4 rounded-xl border w-full max-w-xl">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="h-11 w-11 rounded-full bg-gray-300"></div>
                        <div className="ml-1.5">
                            <div className="h-4 bg-gray-300 w-24 mb-1"></div>
                            <div className="h-3 bg-gray-300 w-16"></div>
                        </div>
                    </div>
                </div>
                <div className="block text-lg leading-snug mt-3 ml-3">
                    <div className="h-4 bg-gray-300 w-4/5 mb-1"></div>
                    <div className="h-3 bg-gray-300 w-full"></div>
                    <div className="h-3 bg-gray-300 w-4/6 mt-2"></div>
                </div>
                <div className="mt-2 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-300 h-48"></div>
                <div className="text-gray-400 text-base py-1 my-0.5">
                    <div className="h-3 bg-gray-300 w-16"></div>
                </div>
                <div className="border-gray-300 dark:border-gray-600 border border-b-0 my-1"></div>
                <div className="text-gray-400 flex mt-3 justify-center items-center gap-2">
                    <div className="flex items-center mr-4">
                        <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                        <span className="ml-2"></span>
                    </div>
                    <div className="flex items-center mr-4">
                        <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                        <span className="ml-2"></span>
                    </div>
                    <div className="flex items-center mr-4">
                        <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex items-center mr-6">
                        <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const PostLoader = () => {
    return (
        <>
            <Loader />
            <Loader />
            <Loader />
            <Loader />

        </>
    )
}

export default PostLoader