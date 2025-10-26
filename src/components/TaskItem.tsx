import React, { useState } from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
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
      className={`bg-custom-surface border border-custom-border rounded-lg p-3 sm:p-4 transition-all duration-200 hover:bg-custom-background ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={(e) => onToggleComplete(task.id, e.target.checked)}
          className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-custom-accent bg-custom-background border-custom-border rounded focus:ring-custom-accent focus:ring-2"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
                className="w-full bg-custom-background border border-custom-border rounded-lg px-3 py-2 text-custom-primary-text placeholder-custom-secondary-text focus:outline-none focus:ring-2 focus:ring-custom-accent focus:border-transparent text-sm sm:text-base"
                autoFocus
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleUpdate}
                  className="bg-custom-price-up hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-custom-background hover:bg-custom-border text-custom-secondary-text px-4 py-2 rounded-lg font-medium transition-colors border border-custom-border text-sm sm:text-base"
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
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="bg-custom-price-down hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs text-custom-secondary-text">
                <span>Created: {formatDate(task.createdDate)}</span>
                {task.completedDate && (
                  <span>Completed: {formatDate(task.completedDate)}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
