import {  Blogs } from "@/types/blogs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aladdincreative-001-site1.btempurl.com/api/v1/Blog/",
    prepareHeaders: (headers, { getState }) => {
      headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmxvZ2FkbWluIiwibmJmIjoxNzE4OTU1NjUzLCJleHAiOjE3MTg5NTkyNTMsImlzcyI6IllvdXJJc3N1ZXJIZXJlIiwiYXVkIjoiWW91ckF1ZGllbmNlSGVyZSJ9.wg30LO29l_Dbsy1nY0wjPVWUso38DoUa7mE4Dc88x8U')
      return headers;
    },
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getAllBlogs: builder.query<Blogs[], any>({
      query: (languageCode) => ({
        url: "GetAll",
        method: "GET",
        params: {languageCode}
      }),
      providesTags:['Blogs']
    }),
    getBlogsById: builder.query<Blogs, any>({
      query: ({id,languageCode}) => ({
        url: `GetById`,
        method: "GET",
        params: { id, languageCode },
      }),
    }),
    updateBlog: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `Update`,
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags:['Blogs']
    }),
    addBlog: builder.mutation<any, FormData>({
      query: (body) => ({
        url: `Create`,
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags:['Blogs']
    }),
    deleteBlog: builder.mutation<void, number>({
      query: (id) => ({
        url: `Delete`,
        method: "Delete",
        params: { id },
      }),
      invalidatesTags:['Blogs']
    }),
  }),
});

export const {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogsByIdQuery,
  useUpdateBlogMutation,
  useAddBlogMutation,
} = blogsApi;
