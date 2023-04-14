import { setupListeners } from "@rtk-incubator/rtk-query";
import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "./modules/auth/slices/authApiSlice";
import { api } from "./api";
import authReducer from "./modules/auth/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(api.middleware, authAPI.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
