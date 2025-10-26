import React, { useEffect } from "react";
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
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
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

function App() {
  const dispatch = useAppDispatch();

  // Redux state
  const filter = useAppSelector(selectFilter);
  const tasks = useAppSelector(selectCurrentTasks);
  const loading = useAppSelector(selectCurrentLoading);
  const { totalCount, completedCount, allCompleted } =
    useAppSelector(selectTaskStats);
  const errorMessage = useAppSelector(selectDisplayErrorMessage);

  // RTK Query hooks with error handling and refetch
  const { error: allTasksError, refetch: refetchAllTasks } =
    useGetAllTasksQuery(undefined, {
      skip: filter !== "all",
    });

  const { error: completedTasksError, refetch: refetchCompletedTasks } =
    useGetCompletedTasksQuery(undefined, {
      skip: filter !== "completed",
    });

  // Current query error based on filter
  const currentQueryError =
    filter === "all" ? allTasksError : completedTasksError;

  const [createTask] = useCreateTaskMutation();
  const [updateTaskText] = useUpdateTaskTextMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [incompleteTask] = useIncompleteTaskMutation();

  // Handler for refreshing data when queries fail
  const handleRefreshData = async () => {
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
  };

  // Handle query errors
  useEffect(() => {
    if (currentQueryError) {
      const errorMessage =
        filter === "all"
          ? "Failed to load tasks"
          : "Failed to load completed tasks";
      dispatch(handleAsyncError(currentQueryError, errorMessage));
    }
  }, [currentQueryError, filter, dispatch]);

  const handleCreateTask = async (text: string) => {
    try {
      await createTask({ text }).unwrap();
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to create task"));
    }
  };

  const handleUpdateTask = async (id: string, text: string) => {
    try {
      await updateTaskText({ id, text }).unwrap();
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to update task"));
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to delete task"));
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
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
  };

  const handleFilterChange = (newFilter: "all" | "completed") => {
    dispatch(setFilter(newFilter));
  };

  const handleCompleteAllTasks = async () => {
    try {
      const incompleteTasks = tasks.filter((task: any) => !task.completed);
      await Promise.all(
        incompleteTasks.map((task: any) => completeTask(task.id).unwrap())
      );
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to complete all tasks"));
    }
  };

  const handleIncompleteAllTasks = async () => {
    try {
      const completedTasks = tasks.filter((task: any) => task.completed);
      await Promise.all(
        completedTasks.map((task: any) => incompleteTask(task.id).unwrap())
      );
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(
        handleAsyncError(error, "Failed to mark all tasks as incomplete")
      );
    }
  };

  const handleDeleteCompletedTasks = async () => {
    try {
      const completedTasksToDelete = tasks.filter(
        (task: any) => task.completed
      );
      await Promise.all(
        completedTasksToDelete.map((task: any) => deleteTask(task.id).unwrap())
      );
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to delete completed tasks"));
    }
  };

  return (
    <div className="min-h-screen bg-custom-background text-custom-primary-text flex flex-col">
      <header className="bg-custom-surface shadow-lg border-b border-custom-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 text-custom-primary-text">
            Todo App
          </h1>
        </div>
      </header>

      {errorMessage && (
        <div 
          className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl w-full px-4 sm:px-6"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="bg-custom-error-bg border border-custom-price-down text-custom-error-text p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 shadow-lg">
            <span className="text-sm sm:text-base">{errorMessage}</span>
            <div className="flex gap-2 w-full sm:w-auto justify-end sm:ml-4">
              {currentQueryError && (
                <button
                  onClick={handleRefreshData}
                  className="bg-custom-button-dark hover:bg-custom-button-dark-hover text-custom-primary-text px-3 py-1 rounded text-sm font-medium transition-colors"
                  aria-label="Retry loading data"
                >
                  Retry
                </button>
              )}
              <button
                onClick={() => dispatch(clearErrorMessage())}
                className="text-custom-error-text hover:text-custom-primary-text font-bold text-lg sm:text-xl"
                aria-label="Close error message"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <section className="bg-custom-surface rounded-xl shadow-xl border border-custom-border">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-custom-primary-text">
              Add New Task
            </h2>
            <TaskForm onCreateTask={handleCreateTask} />
          </div>
        </section>

        <section className="bg-custom-surface rounded-xl shadow-xl border border-custom-border">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
                  Total:{" "}
                  <span className="text-custom-accent">{totalCount}</span>
                </span>
                <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
                  Completed:{" "}
                  <span className="text-custom-price-up">{completedCount}</span>
                </span>
                <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
                  Remaining:{" "}
                  <span className="text-custom-price-down">
                    {totalCount - completedCount}
                  </span>
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                    filter === "all"
                      ? "bg-custom-button-dark text-custom-primary-text"
                      : "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border"
                  }`}
                  aria-label="Show all tasks"
                >
                  All Tasks
                </button>
                <button
                  onClick={() => handleFilterChange("completed")}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                    filter === "completed"
                      ? "bg-custom-button-dark text-custom-primary-text"
                      : "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border"
                  }`}
                  aria-label="Show completed tasks only"
                >
                  Completed Only
                </button>
              </div>
            </div>

            <div className="px-4 pb-4">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allCompleted}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleCompleteAllTasks();
                    } else {
                      handleIncompleteAllTasks();
                    }
                  }}
                  disabled={loading || tasks.length === 0}
                  className="mt-1 h-5 w-5 text-custom-accent bg-custom-background border-custom-border rounded focus:ring-custom-accent focus:ring-2 disabled:opacity-50"
                  aria-label="Toggle all tasks completion status"
                />
                <span className="text-custom-primary-text font-medium text-sm sm:text-base">
                  Toggle all tasks
                </span>
              </label>
            </div>

            <TaskList
              tasks={tasks}
              loading={loading}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />

            {completedCount > 0 && (
              <div className="px-4 sm:px-6 pt-4 border-t border-custom-border">
                <button
                  onClick={handleDeleteCompletedTasks}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg text-sm sm:text-base font-medium bg-custom-button-dark hover:bg-custom-button-dark-hover text-custom-primary-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label={`Delete ${completedCount} completed task${completedCount !== 1 ? 's' : ''}`}
                >
                  Clear {completedCount} completed task
                  {completedCount !== 1 ? "s" : ""}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
