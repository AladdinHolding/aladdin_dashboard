import { Blogs } from "@/types/blogs";
import { Category } from "@/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aladdincreative-001-site1.btempurl.com/api/v1/Category/",
    prepareHeaders: (headers, { getState }) => {
      headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmxvZ2FkbWluIiwibmJmIjoxNzE4MzYwMzQzLCJleHAiOjE3MTgzNjM5NDMsImlzcyI6IllvdXJJc3N1ZXJIZXJlIiwiYXVkIjoiWW91ckF1ZGllbmNlSGVyZSJ9.eQoCg5367YBsR8SdGtfwY94prmnS6JMvLG38gcfVOcA')
      return headers;
    },
  }),
  tagTypes: ['Blogs','Categories'],
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),
      providesTags: ['Categories'],
    }),
    getBlogsByCategoryId: builder.query<Blogs[], number>({
      query: (id) => ({
        url: `GetBlogsByCategoyId`,
        method: "GET",
        params: { id },
      }),
      providesTags: ['Categories'],
    }),
    getCategoryById: builder.query<Category, number>({
      query: (id) => ({
        url: `GetById`,
        method: "GET",
        params: { id },
      }),
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (body) => ({
        url: `Update`,
        method: "PUT",
        body,
      }),
      invalidatesTags:['Categories']
    }),
    addCategory: builder.mutation<Category, Category>({
      query: (body) => ({
        url: `Create`,
        method: "POST",
        body,
        
      }),
      invalidatesTags:['Categories']
    }),
    deleteCategory: builder.mutation<any, number>({
      query: (id) => ({
        url: `Delete`,
        method: "Delete",
        params: { id },
      }),
      invalidatesTags:['Categories']
    }),
  }), 
});

export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetBlogsByCategoryIdQuery,
  useGetCategoryByIdQuery,
} = categoryApi;