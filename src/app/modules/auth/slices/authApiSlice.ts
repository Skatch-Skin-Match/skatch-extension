import { setUserId, track } from "@amplitude/analytics-browser";
import { api } from "app/api";
import {
  AddProfilePicResponse,
  LoginApiRequest,
  LoginApiResponse,
  ProfileData,
  SignUpApiRequest,
  UpdateApiRequest,
  UpdateApiResponse,
} from "./type";

export const authAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query<UpdateApiResponse, void>({
      query: () => ({
        url: "/users/getuserdata",
        method: "get",
      }),
      providesTags: ["Users"],
      transformResponse: (response: UpdateApiResponse) => {
        if (response.data.userData && response.data.configData) {
          chrome.storage.local.set({ userData: response.data.userData }).then(() => {
            // console.log("");
          });
          chrome.storage.local.set({ configData: response.data.configData }).then(() => {
            // console.log("");
          });
        }
        return response;
      },
    }),
    loginUser: builder.mutation<LoginApiResponse, LoginApiRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "post",
        body,
      }),
      //   invalidatesTags: ["POSTS"],
      transformResponse: (response: LoginApiResponse) => {
        chrome.storage.local.set({ token: response.data.token }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ userData: response.data.userData }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ configData: response.data.configData }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ Toggle: true }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ openNewTab: false }).then(() => {
          // console.log("");
        });
        return response;
      },
    }),
    registerUser: builder.mutation<LoginApiResponse, SignUpApiRequest>({
      query: (body) => ({
        url: "/auth/signup",
        method: "post",
        body,
      }),
      transformResponse: (response: LoginApiResponse) => {
        chrome.storage.local.set({ token: response.data.token }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ userData: response.data.userData }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ configData: response.data.configData }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ Toggle: false }).then(() => {
          // console.log("");
        });
        chrome.storage.local.set({ openNewTab: false }).then(() => {
          // console.log("");
        });
        return response;
      },
    }),
    updateConfig: builder.mutation<UpdateApiResponse, UpdateApiRequest>({
      query: (body) => ({
        url: `/users/configupdate`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],

      transformResponse: (response: UpdateApiResponse) => {
        // console.log("isnieeee uodate", response);
        if (response.data.configData) {
          // chrome.storage.local.set({ userData: response.data.userData }).then(() => {
          //   // console.log("");
          // });
          chrome.storage.local.set({ configData: response.data.configData }).then(() => {
            // console.log("");
          });
        }
        return response;
      },
    }),

    addProfilePhoto: builder.mutation<AddProfilePicResponse, ProfileData>({
      query: (body) => ({
        url: "/users/profilepic",
        method: "post",
        body,
      }),
      invalidatesTags: ["Users"],

      transformResponse: (response: AddProfilePicResponse) => {
        console.log("addprofile pic response>>>>", response);
        return response;
      },
    }),
  }),
});
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateConfigMutation,
  useAddProfilePhotoMutation,
  useLazyGetUserDataQuery,
} = authAPI;

export const { getUserData } = authAPI.endpoints;
