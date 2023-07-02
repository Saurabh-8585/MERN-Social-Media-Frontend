// https://jsonplaceholder.typicode.com/posts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
    reducerPath: 'AuthApi',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_AUTH,
    }),

    endpoints: (builder) => ({

        userSignIn: builder.mutation({
            query: (credentials) => ({
                url: '/signin',
                method: 'POST',
                body: credentials,
            }),


        }),
        userSignUp: builder.mutation({
            query: (credentials) => ({
                url: '/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        resetPassword: builder.mutation({
            query: ( id, oldPassword, newPassword ) => ({
                url: `/reset/${id}`,
                method: 'PUT',
                body: { oldPassword, newPassword },
            }),
        })
    }),
});

export const { useUserSignInMutation, useUserSignUpMutation,useResetPasswordMutation } = AuthApi;
