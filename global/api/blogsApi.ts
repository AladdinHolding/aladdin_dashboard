import { Blogs } from "@/types/blogs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogs",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aladdincreative-001-site1.btempurl.com/api/v1/Blog/",
    prepareHeaders: (headers, { getState }) => {
      headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmxvZ2FkbWluIiwibmJmIjoxNzE4MTc4ODUwLCJleHAiOjE3MTgxODI0NTAsImlzcyI6IllvdXJJc3N1ZXJIZXJlIiwiYXVkIjoiWW91ckF1ZGllbmNlSGVyZSJ9.SKTnsSU3gd0M5norTPuBFa1wXR34tsGQz8ro4jDbLtc')
      return headers;
    },
  }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({
    getAllBlogs: builder.query<Blogs[], void>({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),
      providesTags:['Blogs']
    }),
    getBlogsById: builder.query<Blogs, void>({
      query: (id) => ({
        url: `GetById`,
        method: "GET",
        params: { id },
      }),
      providesTags:['Blogs']
    }),
    updateBlog: builder.mutation<any, any>({
      query: (body) => ({
        url: `Update`,
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags:['Blogs']
    }),
    addBlog: builder.mutation<any, any>({
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
