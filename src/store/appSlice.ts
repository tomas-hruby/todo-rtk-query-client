import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterType = "all" | "completed";

interface AppState {
  filter: FilterType;
  errorMessage: string | null;
}

const initialState: AppState = {
  filter: "all",
  errorMessage: null,
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
  },
});

export const { setFilter, setErrorMessage, clearError } = appSlice.actions;
export default appSlice.reducer;
