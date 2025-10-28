import React, { useEffect, useCallback } from "react";
import "./index.css";
import {
  useGetAllTasksQuery,
  useGetCompletedTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskTextMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
} from "./services/todoApi";
import { Header } from "./components/Header";
import { ErrorBanner } from "./components/ErrorBanner";
import { TaskCreationSection } from "./components/TaskCreationSection";
import { TaskManager } from "./components/TaskManager";
import { Footer } from "./components/Footer";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setFilter } from "./store/appSlice";
import { handleAsyncError, clearErrorMessage } from "./store/actions";
import {
  selectFilter,
  selectCurrentTasks,
  selectCurrentLoading,
  selectTaskStats,
  selectDisplayErrorMessage,
} from "./store/selectors";
import { Task } from "./types";
import { FilterType } from "./components/FilterButtons";

function App() {
  const dispatch = useAppDispatch();

  // Redux state
  const filter = useAppSelector(selectFilter);
  const tasks = useAppSelector(selectCurrentTasks);
  const loading = useAppSelector(selectCurrentLoading);
  const { totalCount, completedCount, allCompleted } =
    useAppSelector(selectTaskStats);
  const errorMessage = useAppSelector(selectDisplayErrorMessage);

  // RTK Query hooks
  const { error: allTasksError, refetch: refetchAllTasks } =
    useGetAllTasksQuery(undefined, {
      skip: filter !== "all",
    });

  const { error: completedTasksError, refetch: refetchCompletedTasks } =
    useGetCompletedTasksQuery(undefined, {
      skip: filter !== "completed",
    });

  const currentQueryError =
    filter === "all" ? allTasksError : completedTasksError;

  const [createTask] = useCreateTaskMutation();
  const [updateTaskText] = useUpdateTaskTextMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [incompleteTask] = useIncompleteTaskMutation();

  const handleRefreshData = useCallback(async () => {
    try {
      if (filter === "all") {
        await refetchAllTasks().unwrap();
      } else {
        await refetchCompletedTasks().unwrap();
      }
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to refresh data"));
    }
  }, [filter, refetchAllTasks, refetchCompletedTasks, dispatch]);

  useEffect(() => {
    if (currentQueryError) {
      const errorMessage =
        filter === "all"
          ? "Failed to load tasks"
          : "Failed to load completed tasks";
      dispatch(handleAsyncError(currentQueryError, errorMessage));
    }
  }, [currentQueryError, filter, dispatch]);

  const handleCreateTask = useCallback(
    async (text: string) => {
      try {
        await createTask({ text }).unwrap();
        dispatch(clearErrorMessage());
      } catch (error) {
        dispatch(handleAsyncError(error, "Failed to create task"));
      }
    },
    [createTask, dispatch]
  );

  const handleUpdateTask = useCallback(
    async (id: string, text: string) => {
      try {
        await updateTaskText({ id, text }).unwrap();
        dispatch(clearErrorMessage());
      } catch (error) {
        dispatch(handleAsyncError(error, "Failed to update task"));
      }
    },
    [updateTaskText, dispatch]
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      try {
        await deleteTask(id).unwrap();
        dispatch(clearErrorMessage());
      } catch (error) {
        dispatch(handleAsyncError(error, "Failed to delete task"));
      }
    },
    [deleteTask, dispatch]
  );

  const handleToggleComplete = useCallback(
    async (id: string, completed: boolean) => {
      try {
        if (completed) {
          await completeTask(id).unwrap();
        } else {
          await incompleteTask(id).unwrap();
        }
        dispatch(clearErrorMessage());
      } catch (error) {
        const action = completed ? "complete" : "mark as incomplete";
        dispatch(handleAsyncError(error, `Failed to ${action} task`));
      }
    },
    [completeTask, incompleteTask, dispatch]
  );

  const handleFilterChange = useCallback(
    (newFilter: FilterType) => {
      dispatch(setFilter(newFilter));
    },
    [dispatch]
  );

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

  return (
    <div className="min-h-screen bg-custom-background text-custom-primary-text flex flex-col">
      <Header />

      {errorMessage && (
        <ErrorBanner
          errorMessage={errorMessage}
          currentQueryError={currentQueryError}
          onRetry={handleRefreshData}
        />
      )}

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <TaskCreationSection onCreateTask={handleCreateTask} />

        <TaskManager
          tasks={tasks}
          loading={loading}
          filter={filter}
          totalCount={totalCount}
          completedCount={completedCount}
          allCompleted={allCompleted}
          onFilterChange={handleFilterChange}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onToggleAll={handleToggleAll}
          onDeleteCompleted={handleDeleteCompletedTasks}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App;
