import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { decodeToken } from "../../utils/jwt";
import { UserToken } from "../../types";

interface UserState {
  isLoggedIn: boolean;
  userDetails: UserToken | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  userDetails: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      // Decode the token and extract user details
      const userDetails: UserToken | null = decodeToken(action.payload.token);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      state.userDetails = userDetails;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.userDetails = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.isLoggedIn = false;
      state.userDetails = null;
      state.loading = false;
      state.error = null;
    },
    validateToken: (state) => {
      const token = localStorage.getItem("authToken");
      console.log(token);

      const userDetails: UserToken | null = decodeToken(token ?? "");
      if (userDetails) {
        state.userDetails = userDetails;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        state.userDetails = null;
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, validateToken } =
  userSlice.actions;

export default userSlice.reducer;
