import React, { useState } from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export const TaskItem = React.memo<TaskItemProps>(({
  task,
  onUpdate,
  onDelete,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleUpdate = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div
      className={`rounded-lg border border-custom-border bg-custom-surface p-3 transition-all duration-200 hover:bg-custom-background sm:p-4 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggleComplete(task.id, e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-custom-border bg-custom-background text-custom-accent focus:ring-2 focus:ring-custom-accent sm:h-5 sm:w-5"
          aria-label={`Mark task "${task.text}" as ${task.completed ? "incomplete" : "complete"}`}
        />

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
                className="w-full bg-custom-background border border-custom-border rounded-lg px-3 py-2 text-custom-primary-text placeholder-custom-secondary-text focus:outline-none focus:ring-2 focus:ring-custom-accent focus:border-transparent text-sm sm:text-base"
                autoFocus
                aria-label="Edit task description"
              />
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  onClick={handleUpdate}
                  className="rounded-lg bg-custom-price-up px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600 sm:text-base"
                  aria-label="Save task changes"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-custom-border bg-custom-background px-4 py-2 text-sm font-medium text-custom-secondary-text transition-colors hover:bg-custom-border sm:text-base"
                  aria-label="Cancel editing"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <span
                  className={`text-base sm:text-lg leading-relaxed ${
                    task.completed
                      ? "line-through text-custom-secondary-text"
                      : "text-custom-primary-text"
                  }`}
                >
                  {task.text}
                </span>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-custom-button-dark hover:bg-custom-button-dark-hover text-custom-primary-text px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                    aria-label={`Edit task: ${task.text}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="bg-custom-price-down hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                    aria-label={`Delete task: ${task.text}`}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs text-custom-secondary-text sm:flex-row sm:flex-wrap sm:gap-4">
                <span>Created: {formatDate(task.createdDate)}</span>
                {task.completedDate && <span>Completed: {formatDate(task.completedDate)}</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

TaskItem.displayName = 'TaskItem';
