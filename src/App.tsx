import React, { useState } from "react";
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

function App() {
  const [filter, setFilter] = useState<"all" | "completed">("all");

  const {
    data: allTasks,
    isLoading: isLoadingAll,
    error: allTasksError,
  } = useGetAllTasksQuery(undefined, {
    skip: filter !== "all",
  });

  const {
    data: completedTasks,
    isLoading: isLoadingCompleted,
    error: completedTasksError,
  } = useGetCompletedTasksQuery(undefined, {
    skip: filter !== "completed",
  });

  const [createTask] = useCreateTaskMutation();
  const [updateTaskText] = useUpdateTaskTextMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [completeTask] = useCompleteTaskMutation();
  const [incompleteTask] = useIncompleteTaskMutation();

  const tasks = filter === "completed" ? completedTasks || [] : allTasks || [];
  const loading = filter === "completed" ? isLoadingCompleted : isLoadingAll;
  const error = filter === "completed" ? completedTasksError : allTasksError;

  const handleCreateTask = (text: string) => {
    createTask({ text }).catch((error) => {
      console.error("Failed to create task:", error);
    });
  };

  const handleUpdateTask = (id: string, text: string) => {
    updateTaskText({ id, text }).catch((error) => {
      console.error("Failed to update task:", error);
    });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id).catch((error) => {
      console.error("Failed to delete task:", error);
    });
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    if (completed) {
      completeTask(id).catch((error) => {
        console.error("Failed to complete task:", error);
      });
    } else {
      incompleteTask(id).catch((error) => {
        console.error("Failed to incomplete task:", error);
      });
    }
  };

  const handleFilterChange = (newFilter: "all" | "completed") => {
    setFilter(newFilter);
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  const errorMessage = error
    ? "status" in error
      ? `API Error: ${error.status}`
      : error.message || "An unexpected error occurred"
    : null;

  return (
    <div className="min-h-screen bg-custom-background text-custom-primary-text">
      <header className="bg-custom-header shadow-lg border-b border-custom-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-custom-primary-text">
            Todo App
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {errorMessage && (
          <div className="bg-custom-error-bg border border-custom-price-down text-custom-error-text p-4 rounded-lg flex justify-between items-center">
            <span>{errorMessage}</span>
          </div>
        )}

        <section className="bg-custom-surface rounded-xl shadow-xl border border-custom-border">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-custom-primary-text">
              Add New Task
            </h2>
            <TaskForm onCreateTask={handleCreateTask} />
          </div>
        </section>

        <section className="bg-custom-surface rounded-xl shadow-xl border border-custom-border">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-3">
                <span className="bg-custom-background px-4 py-2 rounded-full text-sm font-medium border border-custom-border">
                  Total:{" "}
                  <span className="text-custom-accent">{totalCount}</span>
                </span>
                <span className="bg-custom-background px-4 py-2 rounded-full text-sm font-medium border border-custom-border">
                  Completed:{" "}
                  <span className="text-custom-price-up">{completedCount}</span>
                </span>
                <span className="bg-custom-background px-4 py-2 rounded-full text-sm font-medium border border-custom-border">
                  Remaining:{" "}
                  <span className="text-custom-price-down">
                    {totalCount - completedCount}
                  </span>
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleFilterChange("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === "all"
                      ? "bg-custom-button-dark text-custom-primary-text"
                      : "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border"
                  }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => handleFilterChange("completed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === "completed"
                      ? "bg-custom-button-dark text-custom-primary-text"
                      : "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border"
                  }`}
                >
                  Completed Only
                </button>
              </div>
            </div>

            <TaskList
              tasks={tasks}
              loading={loading}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
