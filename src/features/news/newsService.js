import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com';
const apiKey = process.env.REACT_APP_NEWS_KEY;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers) {
        headers.set('X-RapidAPI-Key', apiKey);
        headers.set('X-RapidAPI-Host', 'apidojo-yahoo-finance-v1.p.rapidapi.com');
        return headers;
    },
});


export const NewsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery,
    endpoints: (builder) => ({
        getNewsFeed: builder.query({
            query: () => 'stock/v2/get-newsfeed?category=generalnews&region=IN',
        }),
    }),
});

export const { useGetNewsFeedQuery } = NewsApi;