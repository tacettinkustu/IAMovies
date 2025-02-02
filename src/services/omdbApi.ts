import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, OMDB_API_BASE_URL } from "../utils/config";

export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: OMDB_API_BASE_URL }),

  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ search = "Pokemon", page = 1, year, type }: { search?: string; page?: number; year?: string; type?: string }) => {
        search = search.trim();
        let url = `?s=${encodeURIComponent(search)}&apikey=${API_KEY}&page=${page}`;
        if (year) url += `&y=${year}`;
        if (type) url += `&type=${type}`;
        return url;
      },
    }),

    getMovieDetails: builder.query({
      query: (imdbID: string) => `?i=${imdbID}&apikey=${API_KEY}&plot=full`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieDetailsQuery } = omdbApi;
