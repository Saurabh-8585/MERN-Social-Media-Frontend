// https://jsonplaceholder.typicode.com/posts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthApi = createApi({
    reducerPath: 'AuthApi',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_AUTH,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
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

        googleAuth: builder.query({
            query: (code) => ({
                url: `/login/success?code=${code}`,
                method: 'GET',
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
        }),

        resetPassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: '/reset',
                method: 'PUT',
                body: { oldPassword, newPassword },
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
        }),

        forgotPassword: builder.mutation({
            query: ({ email }) => ({
                url: 'forgot/password',
                method: 'POST',
                body: { email }
            }
            )
        }),
        addNewPassword: builder.mutation({
            query: ({ newPassword, id, token }) => ({
                url: `new/password/${id}/${token}`,
                method: 'PUT',
                body: { newPassword }
            }
            )
        })

    }),
});

export const {
    useUserSignInMutation,
    useUserSignUpMutation,
    useResetPasswordMutation,
    useForgotPasswordMutation,
    useAddNewPasswordMutation,
    useGoogleAuthQuery
} = AuthApi;
