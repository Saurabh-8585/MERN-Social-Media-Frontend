import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_USER,
    }),
    tagTypes: ['User'],

    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            providesTags: ['User'],
        }),

        followUser: builder.mutation({
            query: (id) => ({
                url: `/follow/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['User']
        }),

        unFollowUser: builder.mutation({
            query: (id) => ({
                url: `/unfollow/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: ({ user, username, email, about, selectedFile }) => {
                const formData = new FormData();
                formData.append('email', email);
                formData.append('about', about);
                formData.append('username', username);
                formData.append('file', selectedFile);
                return {
                    url: `/update/${user}`,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                    },
                }
            },
            invalidatesTags: ['User']
        }),


    })
})

export const { useGetProfileQuery, useFollowUserMutation, useUnFollowUserMutation, useUpdateUserMutation } = UserApi