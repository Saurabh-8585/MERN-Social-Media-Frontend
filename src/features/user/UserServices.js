import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const UserApi = createApi({
    reducerPath: 'UserApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_USER,
    }),
    tagTypes: ['BookMarks'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (id) => ({
                url: `/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('user')}`,
                },
            }),
            providesTags: ['BookMarks'],
        }),

    })
})

export const { useGetProfileQuery} = UserApi