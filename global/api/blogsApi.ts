import { Blogs } from "@/types/blogs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../toolkit/baseQuery";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aladdincreative-001-site1.btempurl.com/api/v1/Category/",
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query<Blogs[], void>({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),
    }),
    getBlogsById: builder.query<Blogs, void>({
      query: (id) => ({
        url: `GetById`,
        method: "GET",
        params: { id },
      }),
    }),
    updateBlog: builder.mutation<Blogs, void>({
      query: (body) => ({
        url: `Update`,
        method: "POST",
        body,
        formData: true,
      }),
    }),
    addBlog: builder.mutation<Blogs, void>({
      query: (body) => ({
        url: `Create`,
        method: "POST",
        body,
        formData: true,
      }),
    }),
    deleteBlog: builder.mutation<any, void>({
      query: (id) => ({
        url: `Delete`,
        method: "Delete",
        params: { id },
      }),
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
