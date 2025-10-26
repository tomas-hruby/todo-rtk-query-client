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

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3 text-custom-secondary-text">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-custom-accent"></div>
          <span className="text-lg">
            Loading tasks... (This may take up to 3 seconds)
          </span>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-custom-primary-text mb-2">
          No tasks found
        </h3>
        <p className="text-custom-secondary-text">
          Create your first task above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
};
