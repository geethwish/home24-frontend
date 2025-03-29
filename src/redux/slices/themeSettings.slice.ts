import { createSlice } from "@reduxjs/toolkit";

interface ThemeSettingsState {
  isMenuCollapsed: boolean;
}

const initialState: ThemeSettingsState = {
  isMenuCollapsed: false,
};

const themeSettingsSlice = createSlice({
  name: "themeSettings",
  initialState,
  reducers: {
    toggleMenuCollapse(state) {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },
  },
});

export const { toggleMenuCollapse } = themeSettingsSlice.actions;

export default themeSettingsSlice.reducer;
