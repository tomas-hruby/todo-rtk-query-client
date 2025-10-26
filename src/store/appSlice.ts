import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterType = "all" | "completed";

interface AppState {
  filter: FilterType;
  errorMessage: string | null;
  operationsInProgress: {
    [taskId: string]: string; // taskId -> operation type
  };
  bulkOperationInProgress: string | null; // bulk operation type
}

const initialState: AppState = {
  filter: "all",
  errorMessage: null,
  operationsInProgress: {},
  bulkOperationInProgress: null,
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
    setTaskOperation: (
      state,
      action: PayloadAction<{ taskId: string; operation: string | null }>
    ) => {
      if (action.payload.operation) {
        state.operationsInProgress[action.payload.taskId] =
          action.payload.operation;
      } else {
        delete state.operationsInProgress[action.payload.taskId];
      }
    },
    setBulkOperation: (state, action: PayloadAction<string | null>) => {
      state.bulkOperationInProgress = action.payload;
    },
    clearAllOperations: (state) => {
      state.operationsInProgress = {};
      state.bulkOperationInProgress = null;
    },
  },
});

export const {
  setFilter,
  setErrorMessage,
  clearError,
  setTaskOperation,
  setBulkOperation,
  clearAllOperations,
} = appSlice.actions;
export default appSlice.reducer;
