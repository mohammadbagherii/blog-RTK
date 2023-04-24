import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    tagTypes:["BLOG","USER"],
    baseQuery : fetchBaseQuery({baseUrl:'http://localhost:9000'}),

    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => "/blogs",
            providesTags: (result=[] ,error,arg) => [
                'BLOG',
                ...result.map(({id})=> ({type:'BLOG',id}))
            ]
        }),
        getBlog: builder.query({
            query: (initialBlogId) => `/blogs/${initialBlogId}`,
            providesTags:(result,error,arg) =>[{type:"BLOG",id:arg}]
        }),
        addNewBlog: builder.mutation({
            query: (initialBlog) => ({
                url:'/blogs',
                method:'POST',
                body:initialBlog
            }),
            invalidatesTags:['BLOG']
        }),
        editBlog: builder.mutation({
            query: blog => ({
                url:`/blogs/${blog.id}`,
                method:'PUT',
                body:blog
            }),
            invalidatesTags:(result,error,arg) =>[{type:"BLOG",id:arg.id}]
        }),
        deleteBlog:builder.mutation({
            query:(blogId) => ({
                url:`/blogs/${blogId}`,
                method:'DELETE',
            }),
            invalidatesTags:['BLOG']
        }),
        addReaction : builder.mutation({
            query:({blog , reaction})=>({
                url:`/blogs/${blog.id}`,
                method:'PUT',
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.blogId }]
        })
    })
})

export const {useGetBlogsQuery,useGetBlogQuery,useAddNewBlogMutation,useEditBlogMutation,useDeleteBlogMutation,useAddReactionMutation} = apiSlice