import {createApi,fetchBaseQuery} from  '@reduxjs/toolkit/query/react'

export const postsApi=createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"https://jsonplaceholder.typicode.com/"
    }),
    endpoints : (builder)=>({
        getAllposts: builder.query({
            query: ()=> 'posts',
        }),

        getAllPostsComments: builder.query({
          query: ()=> 'posts/1/comments',
        })
    })
})

export const {useGetAllpostsQuery,useGetAllPostsCommentsQuery }=postsApi

