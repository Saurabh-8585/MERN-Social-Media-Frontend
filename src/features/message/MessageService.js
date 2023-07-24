import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const MessageApi = createApi({
    reducerPath: 'MessageApi',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_MESSAGE,
    }),

    tagTypes: ['message'],
    endpoints: (builder) => ({

        getMessage: builder.query({
            query: (conversationId) => ({
                url: `conversation/${conversationId}`,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
                method: 'GET',
            }),
            providesTags: ['message']
        }),

        postMessage: builder.mutation({
            query: (message) => ({
                url: '/',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
                body: { message }
            }),
            invalidatesTags: ['message']
        }),

    }),
});

export const { usePostMessageMutation, useGetMessageQuery } = MessageApi;
