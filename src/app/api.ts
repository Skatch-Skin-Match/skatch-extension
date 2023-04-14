import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: process.env.NEXT_PUBLIC_DEV_URL,
    baseUrl: `${process.env.NEXT_PUBLIC_DEV_URL}`,

    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const token = (getState() as RootState).auth.token;
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["Auth", "Photos", "Favourite", "Users", "Login", "POSTS", "Post", "TopPost", "Topics"],

  endpoints: () => ({}),
});
