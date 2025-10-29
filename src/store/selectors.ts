import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { todoApi } from "../services/todoApi";
import { Task } from "../types";

export const selectFilter = (state: RootState) => {
  return state.app.filter;
};

export const selectTheme = (state: RootState) => {
  return state.app.theme;
};

export const selectErrorMessage = (state: RootState) => {
  return state.app.errorMessage;
};

const selectAllTasksQuery = todoApi.endpoints.getAllTasks.select(undefined);
const selectCompletedTasksQuery =
  todoApi.endpoints.getCompletedTasks.select(undefined);

export const selectAllTasksData = createSelector(
  [selectAllTasksQuery],
  (allTasksQuery) => allTasksQuery.data ?? []
);

export const selectCompletedTasksData = createSelector(
  [selectCompletedTasksQuery],
  (completedTasksQuery) => completedTasksQuery.data ?? []
);

export const selectAllTasksLoading = createSelector(
  [selectAllTasksQuery],
  (allTasksQuery) => allTasksQuery.isLoading
);

export const selectCompletedTasksLoading = createSelector(
  [selectCompletedTasksQuery],
  (completedTasksQuery) => completedTasksQuery.isLoading
);

export const selectCurrentTasks = createSelector(
  [selectFilter, selectAllTasksData, selectCompletedTasksData],
  (filter, allTasks, completedTasks) => {
    if (filter === "completed") {
      return completedTasks;
    } else if (filter === "incomplete") {
      return allTasks.filter((task: Task) => !task.completed);
    } else {
      return allTasks;
    }
  }
);

export const selectCurrentLoading = createSelector(
  [selectFilter, selectAllTasksLoading, selectCompletedTasksLoading],
  (filter, allTasksLoading, completedTasksLoading) => {
    if (filter === "completed") {
      return completedTasksLoading;
    } else if (filter === "incomplete") {
      // For incomplete tasks, we need all tasks data to filter
      return allTasksLoading;
    } else {
      return allTasksLoading;
    }
  }
);

export const selectTaskStats = createSelector([selectCurrentTasks], (tasks) => {
  const totalCount = tasks.length;
  const completedCount = tasks.filter((task: Task) => task.completed).length;
  const remainingCount = totalCount - completedCount;

  return {
    totalCount,
    completedCount,
    remainingCount,
    allCompleted: totalCount > 0 && completedCount === totalCount,
    hasCompleted: completedCount > 0,
  };
});

export const selectDisplayErrorMessage = (state: RootState) => {
  const appErrorMessage = selectErrorMessage(state);

  if (appErrorMessage) {
    return appErrorMessage;
  }

  const filter = selectFilter(state);
  let apiError;

  if (filter === "completed") {
    const completedTasksQuery =
      todoApi.endpoints.getCompletedTasks.select(undefined)(state);
    apiError = completedTasksQuery.error;
  } else if (filter === "incomplete") {
    const allTasksQuery =
      todoApi.endpoints.getAllTasks.select(undefined)(state);
    apiError = allTasksQuery.error;
  } else {
    const allTasksQuery =
      todoApi.endpoints.getAllTasks.select(undefined)(state);
    apiError = allTasksQuery.error;
  }

  if (apiError) {
    if ("status" in apiError) {
      return `API Error: ${apiError.status}`;
    } else {
      return apiError.message || "An unexpected error occurred";
    }
  }

  return null;
};
