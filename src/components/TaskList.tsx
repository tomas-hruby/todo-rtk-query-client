import React from "react";
import { Task } from "../types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onUpdateTask: (id: string, text: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export const TaskList = React.memo<TaskListProps>(
  ({ tasks, loading, onUpdateTask, onDeleteTask, onToggleComplete }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-custom-secondary-text text-center sm:text-left">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-custom-accent"></div>
            <span className="text-base sm:text-lg">
              Loading tasks... (This may take up to 3 seconds)
            </span>
          </div>
        </div>
      );
    }

    if (tasks.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-4">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📝</div>
          <h3 className="text-lg sm:text-xl font-medium text-custom-primary-text mb-2">
            No tasks found
          </h3>
          <p className="text-sm sm:text-base text-custom-secondary-text">
            Create your first task above to get started!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-2 sm:space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    );
  }
);

TaskList.displayName = "TaskList";
