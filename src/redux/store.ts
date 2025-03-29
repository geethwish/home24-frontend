import { configureStore } from "@reduxjs/toolkit";
import themeReducers from "./slices/themeSettings.slice";

export const store = configureStore({
  reducer: {
    themeSettings: themeReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
