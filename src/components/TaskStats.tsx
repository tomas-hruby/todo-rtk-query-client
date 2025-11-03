import React from "react";
import { useAppSelector } from "../store/hooks";
import { selectTaskStats } from "../store/selectors";

interface TaskStatsProps {}

export const TaskStats = React.memo<TaskStatsProps>(() => {
  const { totalCount, completedCount } = useAppSelector(selectTaskStats);
  const remainingCount = totalCount - completedCount;

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
        Total:{" "}
        <span className="text-custom-accent inline-block min-w-[1.5rem] text-center">
          {totalCount}
        </span>
      </span>
      <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
        Completed:{" "}
        <span className="text-custom-price-up inline-block min-w-[1.5rem] text-center">
          {completedCount}
        </span>
      </span>
      <span className="bg-custom-background px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-custom-border">
        Remaining:{" "}
        <span className="text-custom-price-down inline-block min-w-[1.5rem] text-center">
          {remainingCount}
        </span>
      </span>
    </div>
  );
});

TaskStats.displayName = "TaskStats";
