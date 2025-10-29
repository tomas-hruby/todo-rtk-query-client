import React from "react";
import { TaskStats } from "./TaskStats";
import { FilterButtons } from "./FilterButtons";
import { TaskList } from "./TaskList";
import { BulkActions } from "./BulkActions";
import { ClearCompleted } from "./ClearCompleted";
import { FilterType, Task } from "../types";

interface TaskManagerProps {
  tasks: Task[];
  loading: boolean;
  filter: FilterType;
  totalCount: number;
  completedCount: number;
  allCompleted: boolean;
  onFilterChange: (filter: FilterType) => void;
  onUpdateTask: (id: string, text: string) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  onToggleAll: (checked: boolean) => void;
  onDeleteCompleted: () => void;
}

export const TaskManager = React.memo<TaskManagerProps>(
  ({
    tasks,
    loading,
    filter,
    totalCount,
    completedCount,
    allCompleted,
    onFilterChange,
    onUpdateTask,
    onDeleteTask,
    onToggleComplete,
    onToggleAll,
    onDeleteCompleted,
  }) => {
    return (
      <section className="bg-custom-surface rounded-xl shadow-xl border border-custom-border">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
            <TaskStats
              totalCount={totalCount}
              completedCount={completedCount}
            />
            <FilterButtons
              currentFilter={filter}
              onFilterChange={onFilterChange}
            />
          </div>

          <BulkActions
            allCompleted={allCompleted}
            loading={loading}
            hasTask={tasks.length > 0}
            onToggleAll={onToggleAll}
          />

          <TaskList
            tasks={tasks}
            loading={loading}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onToggleComplete={onToggleComplete}
          />

          <ClearCompleted
            completedCount={completedCount}
            loading={loading}
            onDeleteCompleted={onDeleteCompleted}
          />
        </div>
      </section>
    );
  }
);

TaskManager.displayName = "TaskManager";
