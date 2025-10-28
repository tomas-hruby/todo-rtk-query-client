import React from "react";

interface TaskStatsProps {
  totalCount: number;
  completedCount: number;
}

export const TaskStats = React.memo<TaskStatsProps>(({
  totalCount,
  completedCount,
}) => {
  const remainingCount = totalCount - completedCount;

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
        Total: <span className="text-custom-accent">{totalCount}</span>
      </span>
      <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
        Completed:{" "}
        <span className="text-custom-price-up">{completedCount}</span>
      </span>
      <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
        Remaining:{" "}
        <span className="text-custom-price-down">{remainingCount}</span>
      </span>
    </div>
  );
});

TaskStats.displayName = "TaskStats";