import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const postApi = createApi({

    reducerPath: 'AuthApi',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_POST,
    }),

    endpoints: (builder) => ({

        GetAllPost: builder.query({
            query: () => ({
                url: '/getposts',
                method: 'GET'
            })
        }),

        CreatePost: builder.mutation({
            query: () => ({

                url: '/newpost',
                method: 'POST',
                body: {},
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
        }),

        DeletePost: builder.mutation({
            query: (postId) => ({
                url: `/deletepost/${postId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            })
        })

    }),
});