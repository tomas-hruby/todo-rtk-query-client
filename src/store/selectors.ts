import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { todoApi } from "../services/todoApi";

export const selectFilter = (state: RootState) => state.app.filter;
export const selectErrorMessage = (state: RootState) => state.app.errorMessage;

export const selectAllTasks = todoApi.endpoints.getAllTasks.select(undefined);
export const selectCompletedTasks =
  todoApi.endpoints.getCompletedTasks.select(undefined);

export const selectCurrentTasks = createSelector(
  [selectFilter, selectAllTasks, selectCompletedTasks],
  (filter, allTasksResult, completedTasksResult) => {
    if (filter === "completed") {
      return completedTasksResult.data || [];
    }
    return allTasksResult.data || [];
  }
);

export const selectCurrentLoading = createSelector(
  [selectFilter, selectAllTasks, selectCompletedTasks],
  (filter, allTasksResult, completedTasksResult) => {
    if (filter === "completed") {
      return completedTasksResult.isLoading;
    }
    return allTasksResult.isLoading;
  }
);

export const selectCurrentError = createSelector(
  [selectFilter, selectAllTasks, selectCompletedTasks],
  (filter, allTasksResult, completedTasksResult) => {
    if (filter === "completed") {
      return completedTasksResult.error;
    }
    return allTasksResult.error;
  }
);

export const selectTaskStats = createSelector([selectCurrentTasks], (tasks) => {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task: any) => task.completed).length;
  const remainingCount = totalCount - completedCount;

  return {
    totalCount,
    completedCount,
    remainingCount,
    allCompleted: totalCount > 0 && completedCount === totalCount,
    hasCompleted: completedCount > 0,
  };
});

export const selectDisplayErrorMessage = createSelector(
  [selectErrorMessage, selectCurrentError],
  (appErrorMessage, queryError) => {
    if (appErrorMessage) return appErrorMessage;

    if (queryError) {
      return "status" in queryError
        ? `API Error: ${queryError.status}`
        : queryError.message || "An unexpected error occurred";
    }

    return null;
  }
);
