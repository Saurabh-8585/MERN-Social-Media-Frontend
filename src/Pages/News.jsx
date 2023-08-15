import React from 'react';
import LoadingSpinner from '../Components/Loader/LoadingSpinner';
import { useGetNewsFeedQuery } from '../features/news/newsService';

const News = () => {
    const { data: newsData, error, isLoading } = useGetNewsFeedQuery();

    return (
        <div className={`flex justify-center items-center flex-col mt-1 w-full max-w-3xl m-auto ${isLoading ? 'h-screen' : 'h-full'}`}>
            <h1 className="text-3xl font-bold mb-5 text-purple-500">Snapia News</h1>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 md:p-0 mb-20">
                {isLoading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md">
                        An error occurred while fetching news data:
                    </div>
                ) : (
                    newsData.items.result.map((item) => (
                        <div key={item.uuid} className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-md w-full">
                            {item.main_image && (
                                <img
                                    src={item.main_image.original_url}
                                    alt={item.title}
                                    className="mt-3 w-full rounded-md"
                                />
                            )}
                            <h2 className="text-lg font-semibold dark:text-gray-50">{item.title}</h2>
                            <p className="text-gray-600  dark:text-gray-50 text-sm">{item.publisher}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-500 hover:underline"
                            >
                                Read More
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default News;
