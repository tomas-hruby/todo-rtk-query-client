import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "../services/todoApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
