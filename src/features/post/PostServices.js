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

        createPost: builder.mutation({
            query: ({ content, image }) => {
                const formData = new FormData();
                formData.append('content', content);
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
            invalidatesTags: ['Posts', 'SinglePost']
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
            invalidatesTags: ['Posts','SinglePost']
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
            query: ({ id, content }) => ({
                url: `/comment/${id}`,
                method: 'POST',
                body: { content },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                }
            }),
            invalidatesTags: ['SinglePost']
        }),

        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `/comment/delete/${postId}/${commentId}`,
                method: 'DELETE',
                // body: { commentId },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                }
            }),
            invalidatesTags: ['SinglePost']
        }),

        likeComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: '/like/comment',
                method: 'POST',
                body: { postId, commentId },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['SinglePost']
        }),


    }),

});

export const {
    useGetAllPostsQuery,
    useGetSinglePostQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useDislikePostMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useLikeCommentMutation

} = PostApi;
