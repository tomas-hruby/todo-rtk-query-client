import React, { useState, useCallback } from "react";
import { Button } from "./Button";
import { useCreateTaskMutation } from "../services/todoApi";
import { useAppDispatch } from "../store/hooks";
import { handleAsyncError, clearErrorMessage } from "../store/actions";

interface TaskCreationSectionProps {}

export const TaskCreationSection = React.memo<TaskCreationSectionProps>(() => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useAppDispatch();
  const [createTask] = useCreateTaskMutation();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      handleCreateTask(taskText.trim());
      setTaskText("");
    }
  };

  return (
    <section className="bg-custom-surface rounded-xl shadow-xl border border-custom-border">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-custom-primary-text">
          Add New Task
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
        >
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 bg-custom-background border border-custom-border rounded-lg px-4 py-3 text-custom-primary-text placeholder-custom-secondary-text focus:outline-none focus:ring-2 focus:ring-custom-accent focus:border-transparent text-sm sm:text-base"
            required
            aria-label="Task description"
          />
          <Button
            type="submit"
            variant="dark"
            size="lg"
            fullWidth={true}
            className="sm:w-auto"
            disabled={!taskText.trim()}
            aria-label="Add new task"
          >
            Add Task
          </Button>
        </form>
      </div>
    </section>
  );
});

TaskCreationSection.displayName = "TaskCreationSection";
