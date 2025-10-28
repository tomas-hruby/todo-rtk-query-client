import { RootState } from "./index";
import { todoApi } from "../services/todoApi";
import { Task } from "../types";

export const selectFilter = (state: RootState) => {
  return state.app.filter;
};

export const selectErrorMessage = (state: RootState) => {
  return state.app.errorMessage;
};

export const selectAllTasksData = (state: RootState) => {
  const allTasksQuery = todoApi.endpoints.getAllTasks.select(undefined)(state);
  return allTasksQuery.data || [];
};

export const selectCompletedTasksData = (state: RootState) => {
  const completedTasksQuery = todoApi.endpoints.getCompletedTasks.select(undefined)(state);
  return completedTasksQuery.data || [];
};

export const selectAllTasksLoading = (state: RootState) => {
  const allTasksQuery = todoApi.endpoints.getAllTasks.select(undefined)(state);
  return allTasksQuery.isLoading;
};

export const selectCompletedTasksLoading = (state: RootState) => {
  const completedTasksQuery = todoApi.endpoints.getCompletedTasks.select(undefined)(state);
  return completedTasksQuery.isLoading;
};

export const selectCurrentTasks = (state: RootState) => {
  const filter = selectFilter(state);
  
  if (filter === "completed") {
    return selectCompletedTasksData(state);
  } else {
    return selectAllTasksData(state);
  }
};

export const selectCurrentLoading = (state: RootState) => {
  const filter = selectFilter(state);
  
  if (filter === "completed") {
    return selectCompletedTasksLoading(state);
  } else {
    return selectAllTasksLoading(state);
  }
};

export const selectTaskStats = (state: RootState) => {
  const tasks = selectCurrentTasks(state);
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
};

export const selectDisplayErrorMessage = (state: RootState) => {
  const appErrorMessage = selectErrorMessage(state);
  
  if (appErrorMessage) {
    return appErrorMessage;
  }

  const filter = selectFilter(state);
  let apiError;
  
  if (filter === "completed") {
    const completedTasksQuery = todoApi.endpoints.getCompletedTasks.select(undefined)(state);
    apiError = completedTasksQuery.error;
  } else {
    const allTasksQuery = todoApi.endpoints.getAllTasks.select(undefined)(state);
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
