// https://jsonplaceholder.typicode.com/posts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ConversationApi = createApi({
    reducerPath: 'ConversationApi',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_CONVERSATION,
    }),

    tagTypes: ['conversation'],
    endpoints: (builder) => ({

        getConversation: builder.query({
            query: (userId) => ({
                url: `/${userId}`,
                method: 'GET',
            }),
            providesTags: ['conversation']
        }),

        postConversation: builder.mutation({
            query: (senderId, receiverId) => ({
                url: '/',
                method: 'POST',
                body: { senderId, receiverId }
            }),
            invalidatesTags: ['conversation']
        }),

    }),
});

export const { useGetConversationQuery, usePostConversationMutation } = ConversationApi;
