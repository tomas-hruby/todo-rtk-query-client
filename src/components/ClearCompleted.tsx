import React, { useCallback } from "react";
import { Button } from "./Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectCurrentTasks,
  selectCurrentLoading,
  selectTaskStats,
} from "../store/selectors";
import { handleAsyncError, clearErrorMessage } from "../store/actions";
import { useDeleteTaskMutation } from "../services/todoApi";
import { Task } from "../types";

interface ClearCompletedProps {}

export const ClearCompleted = React.memo<ClearCompletedProps>(() => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectCurrentTasks);
  const loading = useAppSelector(selectCurrentLoading);
  const { completedCount } = useAppSelector(selectTaskStats);

  const [deleteTask] = useDeleteTaskMutation();

  const handleDeleteCompletedTasks = useCallback(async () => {
    try {
      const completedTasksToDelete = tasks.filter(
        (task: Task) => task.completed
      );
      await Promise.all(
        completedTasksToDelete.map((task: Task) => deleteTask(task.id).unwrap())
      );
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to delete completed tasks"));
    }
  }, [tasks, deleteTask, dispatch]);
  if (completedCount === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 pt-4 border-t border-custom-border">
      <Button
        onClick={handleDeleteCompletedTasks}
        disabled={loading}
        variant="dark"
        size="lg"
        fullWidth={true}
        aria-label={`Delete ${completedCount} completed task${
          completedCount !== 1 ? "s" : ""
        }`}
      >
        Clear {completedCount} completed task
        {completedCount !== 1 ? "s" : ""}
      </Button>
    </div>
  );
});

ClearCompleted.displayName = "ClearCompleted";
