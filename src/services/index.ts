import { Joke } from "@/types/jokes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const APIService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getJokes: builder.query<Joke[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/?_page=${page}&_limit=${limit}`,
    }),
    getJoke: builder.query<Joke, { joke: string }>({
      query: ({ joke }) => `/${joke}`,
    }),
    deleteJoke: builder.mutation<{}, { joke: number }>({
      query({ joke }) {
        return {
          url: `/${joke}`,
          method: "DELETE",
        };
      },
    }),
    updateJoke: builder.mutation<Joke, { joke: Partial<Joke> }>({
      query({ joke }) {
        const { id, ...body } = joke;
        return {
          url: `/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),
    createJoke: builder.mutation<Joke, { joke: Partial<Joke> }>({
      query({ joke }) {
        const { id, ...body } = joke;
        return {
          url: "/",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetJokesQuery,
  useGetJokeQuery,
  useCreateJokeMutation,
  useDeleteJokeMutation,
  useUpdateJokeMutation,
  endpoints,
} = APIService;
