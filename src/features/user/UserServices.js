import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/user',
    }),
    tagTypes: ['User'],

    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: (id) => `/profile/${id}`,
            providesTags: ['User'],
        }),

        followUser: builder.mutation({
            query: (id) => ({
                url: `follow/${id}`,
                method: 'PUT',

            }),
            invalidatesTags: ['User'],
        })


    })
})

const { useGetUserInfoQuery, useFollowUserMutation } = UserApi;

export { useGetUserInfoQuery, useFollowUserMutation };