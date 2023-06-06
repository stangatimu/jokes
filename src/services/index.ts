import { Joke } from "@/types/jokes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const APIService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getJokes: builder.query<Joke[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/?_page=${page}&_limit=${limit}`,
    }),
  }),
});

export const { useGetJokesQuery } = APIService;
