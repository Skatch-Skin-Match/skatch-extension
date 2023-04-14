import { createDate } from "@/components/utils/helper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { authAPI } from "./authApiSlice";
import {
  AuthInitialState,
  formatResponse,
  IsOpenNewTab,
  LoginApiResponse,
  UpdateApiResponse,
  UpdateConfigNoLoginResponse,
  UpdateProfilePicResponse,
} from "./type";
const initialState: AuthInitialState = {
  //   isLoggedIn: false,
  userData: {
    id: "",
    email: "",
    strategy: "",
    // firstName: "",
    profilePicture: "",
  },
  token: "",
  configData: {
    presetColor: [
      {
        id: 1,
        colorCode: "#F0D3C5",
        colorName: "fair",
        hsv: ["20°, 18%, 94%"],
      },
      {
        id: 2,
        colorCode: "#E3B38D",
        colorName: "medium",
        hsv: ["27°, 38%, 89%"],
      },
      {
        id: 3,
        colorCode: "#A96C4F",
        colorName: "brown",
        hsv: ["19°, 53%, 66%"],
      },
      {
        id: 4,
        colorCode: "#704733",
        colorName: "black",
        hsv: ["20°, 54%, 44%"],
      },
    ],
    selectedColor: {
      id: 3,
      colorCode: "#A96C4F",
      colorName: "brown",
      hsv: ["19°, 53%, 66%"],
    },
    history: [],
  },
  openNewTab: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<LoginApiResponse>) => {
      const { token, configData, userData } = payload.data;

      if (token) {
        state.token = token;
        // state.isLoggedIn = true;
      }
      if (userData) {
        state.userData = userData;
      }
      if (!configData) {
        state.configData = initialState.configData;
      }
      state.configData = configData; //configData;
    },

    logout: (state) => {
      chrome.storage.local.clear();
      state.configData = initialState.configData;
      state.token = initialState.token;
      state.userData = initialState.userData;
      //   state.isLoggedIn = initialState.isLoggedIn;
    },
    updateUser: (state, { payload }: PayloadAction<UpdateApiResponse>) => {
      const { configData } = payload.data;

      if (configData) {
        state.configData = configData;
      }
    },
    profilePicture: (state, { payload }: PayloadAction<UpdateProfilePicResponse>) => {
      state.userData.profilePicture = payload.profilePicture;
    },
    updateConfigNoLogin: (state, { payload }: PayloadAction<UpdateConfigNoLoginResponse>) => {
      state.configData = payload;
    },
    isOpenNewTab: (state, { payload }: PayloadAction<IsOpenNewTab>) => {
      state.openNewTab = payload.openNewTab;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authAPI.endpoints.loginUser.matchFulfilled, (state, payload) => {
        authSlice.caseReducers.setUser(state, payload);
      })
      .addMatcher(authAPI.endpoints.registerUser.matchFulfilled, (state, payload) => {
        authSlice.caseReducers.setUser(state, payload);
      })
      .addMatcher(authAPI.endpoints.updateConfig.matchFulfilled, (state, payload) => {
        authSlice.caseReducers.updateUser(state, payload);
      })
      .addMatcher(authAPI.endpoints.getUserData.matchFulfilled, (state, payload) => {
        authSlice.caseReducers.updateUser(state, payload);
      });
  },
});
export const selectAuth = (state: RootState) => state.auth;
export const { setUser, logout, profilePicture, updateUser, updateConfigNoLogin, isOpenNewTab } =
  authSlice.actions;
export default authSlice.reducer;
