import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostApi = createApi({
    reducerPath: 'PostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_POST,
    }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => ({
                url: '/posts',
                method: 'GET',
            }),
            providesTags: ['Posts'],
        }),

        getSinglePost: builder.query({
            query: (id) => ({
                url: `/post/${id}`,
                method: 'GET',
            }),
            // providesTags: ['Posts'],
        }),

        createPost: builder.mutation({
            query: (postData) => {
                const formData = new FormData();
                formData.append('content', postData.content);
                formData.append('file', postData.image);

                return {
                    url: '/new',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                    },
                };
            },

            invalidatesTags: ['Posts']
        }),

        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/delete/${postId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['Posts'],


        }),

        editPost: builder.mutation({
            query: (postData) => {
                const formData = new FormData();
                formData.append('content', postData.editedContent);
                formData.append('file', postData.image);

                return {
                    url: `/edit/${postData.PostID}`,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                    },
                };
            },

            invalidatesTags: ['Posts']
        }),

        likePost: builder.mutation({
            query: (id) => ({
                url: '/like',
                method: 'POST',
                body: { id },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['Posts']
        }),

        dislikePost: builder.mutation({
            query: (id) => ({
                url: `/dislike/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['Posts']
        })

    }),
});

export const { useGetAllPostsQuery, useGetSinglePostQuery, useCreatePostMutation, useEditPostMutation, useDeletePostMutation, useLikePostMutation, useDislikePostMutation } = PostApi;
