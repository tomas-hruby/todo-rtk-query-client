import React, { useState } from "react";
import { Task } from "../types";
import { Button } from "./Button";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export const TaskItem = React.memo<TaskItemProps>(
  ({ task, onUpdate, onDelete, onToggleComplete }) => {
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
        className={`rounded-lg border border-custom-border bg-custom-surface p-3 hover:bg-custom-background sm:p-4 ${
          task.completed ? "opacity-75" : ""
        }`}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-custom-border bg-custom-background text-custom-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-accent focus-visible:ring-opacity-50 sm:h-5 sm:w-5"
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
                  <Button
                    onClick={handleUpdate}
                    variant="success"
                    size="md"
                    aria-label="Save task changes"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="secondary"
                    size="md"
                    aria-label="Cancel editing"
                  >
                    Cancel
                  </Button>
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
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="dark"
                      size="sm"
                      aria-label={`Edit task: ${task.text}`}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(task.id)}
                      variant="danger"
                      size="sm"
                      aria-label={`Delete task: ${task.text}`}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-xs text-custom-secondary-text sm:flex-row sm:flex-wrap sm:gap-4">
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
  }
);

TaskItem.displayName = "TaskItem";
