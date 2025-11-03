import React from "react";
import { TaskStats } from "./TaskStats";
import { FilterButtons } from "./FilterButtons";
import { TaskList } from "./TaskList";
import { BulkActions } from "./BulkActions";
import { ClearCompleted } from "./ClearCompleted";

interface TaskManagerProps {}

export const TaskManager = React.memo<TaskManagerProps>(() => {
  return (
    <section className="bg-custom-surface rounded-xl shadow-xl border border-custom-border">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <TaskStats />
          <FilterButtons />
        </div>

        <BulkActions />

        <TaskList />

        <ClearCompleted />
      </div>
    </section>
  );
});

TaskManager.displayName = "TaskManager";
