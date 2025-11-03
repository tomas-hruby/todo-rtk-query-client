import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectCurrentTasks,
  selectCurrentLoading,
  selectTaskStats,
} from "../store/selectors";
import { handleAsyncError, clearErrorMessage } from "../store/actions";
import {
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
} from "../services/todoApi";
import { Task } from "../types";

interface BulkActionsProps {}

export const BulkActions = React.memo<BulkActionsProps>(() => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectCurrentTasks);
  const loading = useAppSelector(selectCurrentLoading);
  const { allCompleted } = useAppSelector(selectTaskStats);

  const [completeTask] = useCompleteTaskMutation();
  const [incompleteTask] = useIncompleteTaskMutation();

  const handleCompleteAllTasks = useCallback(async () => {
    try {
      const incompleteTasks = tasks.filter((task: Task) => !task.completed);
      await Promise.all(
        incompleteTasks.map((task: Task) => completeTask(task.id).unwrap())
      );
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to complete all tasks"));
    }
  }, [tasks, completeTask, dispatch]);

  const handleIncompleteAllTasks = useCallback(async () => {
    try {
      const completedTasks = tasks.filter((task: Task) => task.completed);
      await Promise.all(
        completedTasks.map((task: Task) => incompleteTask(task.id).unwrap())
      );
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(
        handleAsyncError(error, "Failed to mark all tasks as incomplete")
      );
    }
  }, [tasks, incompleteTask, dispatch]);

  const handleToggleAll = useCallback(
    async (checked: boolean) => {
      if (checked) {
        handleCompleteAllTasks();
      } else {
        handleIncompleteAllTasks();
      }
    },
    [handleCompleteAllTasks, handleIncompleteAllTasks]
  );

  const hasTask = tasks.length > 0;
  return (
    <div className="px-4 pb-4">
      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="checkbox"
          checked={allCompleted}
          onChange={(e) => handleToggleAll(e.target.checked)}
          disabled={loading || !hasTask}
          className="mt-1 h-5 w-5 text-custom-accent bg-custom-background border-custom-border rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-accent focus-visible:ring-opacity-50 disabled:opacity-50"
          aria-label="Toggle all tasks completion status"
        />
        <span className="text-custom-primary-text font-medium text-sm sm:text-base">
          Toggle all tasks
        </span>
      </label>
    </div>
  );
});

BulkActions.displayName = "BulkActions";
