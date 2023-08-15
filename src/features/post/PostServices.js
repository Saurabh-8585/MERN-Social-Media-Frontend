import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostApi = createApi({
    reducerPath: 'PostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_POST,
    }),
    tagTypes: ['Posts', 'SinglePost', 'Comments'],
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
            providesTags: ['SinglePost',]
        }),


        getSingleUserPosts: builder.query({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET',
            }),
            providesTags: ['Posts',]
        }),

        createPost: builder.mutation({
            query: ({ content, image, postLocation }) => {
                const formData = new FormData();
                formData.append('content', content);
                formData.append('postLocation', postLocation);
                formData.append('file', image);

                return {
                    url: '/new',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                    },
                };
            },
            invalidatesTags: ['Posts'],
        }),


        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/delete/${postId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['SinglePost', 'Posts',]
        }),

        editPost: builder.mutation({
            query: ({ PostID, editedContent }) => ({
                url: `/edit/${PostID}`,
                method: 'PUT',
                body: { content: editedContent },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),

            invalidatesTags: ['Posts', 'SinglePost']
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
            invalidatesTags: ['Posts', 'SinglePost']
        }),

        dislikePost: builder.mutation({
            query: (id) => ({
                url: `/dislike/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['Posts', 'SinglePost']
        }),

        addComment: builder.mutation({
            query: ({ postId, comment }) => ({
                url: `/comment/${postId}`,
                method: 'POST',
                body: { content: comment },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                }
            }),
            invalidatesTags: ['SinglePost','Posts']
        }),

        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `/comment/delete/${postId}/${commentId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                }
            }),
            invalidatesTags: ['SinglePost','Posts']
        }),

        editComment: builder.mutation({
            query: ({ postId, commentId, commentText }) => ({
                url: `/comment/edit/${postId}/${commentId}`,
                method: 'PUT',
                body: { content: commentText },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                }
            }),
            invalidatesTags: ['SinglePost','Posts']
        }),
    }),

});

export const {
    useGetAllPostsQuery,
    useGetSinglePostQuery,
    useGetSingleUserPostsQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useDislikePostMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useEditCommentMutation,
} = PostApi;
