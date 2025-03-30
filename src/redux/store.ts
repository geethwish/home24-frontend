import { configureStore } from "@reduxjs/toolkit";
import themeReducers from "./slices/themeSettings.slice";
import userReducer from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    themeSettings: themeReducers,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
