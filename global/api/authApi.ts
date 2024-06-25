import { Blogs } from "@/types/blogs";
import { Category } from "@/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aladdincreative-001-site1.btempurl.com/api/v1/User/",
    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYmxvZ2FkbWluIiwibmJmIjoxNzE5MjI1OTY0LCJleHAiOjE3MTkyMjk1NjQsImlzcyI6IllvdXJJc3N1ZXJIZXJlIiwiYXVkIjoiWW91ckF1ZGllbmNlSGVyZSJ9.OHyzYFWGSSP_SBl24wrk3mN4jRjTEAuuFCDiI8d0gH4",
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Login: builder.mutation<any, any>({
      query: (body) => ({
        url: `Login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = authApi;
