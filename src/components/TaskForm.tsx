import React, { useState } from "react";

interface TaskFormProps {
  onCreateTask: (text: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onCreateTask(taskText.trim());
      setTaskText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
    >
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task..."
        className="flex-1 bg-custom-background border border-custom-border rounded-lg px-4 py-3 text-custom-primary-text placeholder-custom-secondary-text focus:outline-none focus:ring-2 focus:ring-custom-accent focus:border-transparent transition-all text-sm sm:text-base"
        required
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-custom-button-dark hover:bg-custom-button-dark-hover text-custom-primary-text font-medium px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-button-dark focus:ring-opacity-50 text-sm sm:text-base"
      >
        Add Task
      </button>
    </form>
  );
};
