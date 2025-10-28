import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterType = "all" | "completed" | "incomplete";
export type ThemeType = "light" | "dark";

interface AppState {
  filter: FilterType;
  errorMessage: string | null;
  theme: ThemeType;
}

const initialState: AppState = {
  filter: "all",
  errorMessage: null,
  theme: "dark",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setFilter, setErrorMessage, clearError, toggleTheme } =
  appSlice.actions;
export default appSlice.reducer;
