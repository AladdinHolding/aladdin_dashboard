import { Blogs } from "@/types/blogs";
import { Category } from "@/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aladdincreative-001-site1.btempurl.com/api/v1/Category/",
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "GetAll",
        method: "GET",
      }),
    }),
    getBlogsByCategoryId: builder.query<Blogs[], void>({
      query: (id) => ({
        url: `GetBlogsByCategoyId`,
        method: "GET",
        params: { id },
      }),
    }),
    getCategoryById: builder.query<Category, void>({
      query: (id) => ({
        url: `GetById`,
        method: "GET",
        params: { id },
      }),
    }),
    updateCategory: builder.mutation<Category, void>({
      query: (body) => ({
        url: `Update`,
        method: "POST",
        body,
        formData: true,
      }),
    }),
    addCategory: builder.mutation<Category, void>({
      query: (body) => ({
        url: `Create`,
        method: "POST",
        body,
        formData: true,
      }),
    }),
    deleteCategory: builder.mutation<any, void>({
      query: (id) => ({
        url: `Delete`,
        method: "Delete",
        params: { id },
      }),
    }),
  }),
});


export const {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetBlogsByCategoryIdQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} = categoryApi;
