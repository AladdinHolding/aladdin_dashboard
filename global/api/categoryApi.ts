import { Blogs } from "@/types/blogs";
import { Category } from "@/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aladdincreative-001-site1.btempurl.com/api/v1/Category/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('auth');
      if(token){
        headers.set(
          "Authorization",
          `Bearer ${token}`,
        );
        
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs", "Categories"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], any>({
      query: (languageCode) => ({
        url: "GetAll",
        method: "GET",
        params: {languageCode}
      }),
      providesTags: ["Categories"],
    }),
    getBlogsByCategoryId: builder.query<Blogs[], number>({
      query: (id) => ({
        url: `GetBlogsByCategoyId`,
        method: "GET",
        params: { id },
      }),
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query<Category, any>({
      query: ({ id, languageCode='' }) => ({
        url: `GetById`,
        method: "GET",
        params: { id, languageCode },
      }),
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: (body) => ({
        url: `Update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
    addCategory: builder.mutation<Category, Category>({
      query: (body) => ({
        url: `Create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<any, number>({
      query: (id) => ({
        url: `Delete`,
        method: "Delete",
        params: { id },
      }),
      invalidatesTags: ["Categories"],
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
