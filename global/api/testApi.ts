import { Blogs } from "@/types/blogs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../toolkit/baseQuery";

export const testApi = createApi({
  reducerPath: "testApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products",
  }),
  endpoints: (builder) => ({
    getAllBlogs: builder.query<any, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    getBlogsById: builder.query<any, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogsByIdQuery,
} = testApi;
