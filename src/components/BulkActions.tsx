import React from "react";

interface BulkActionsProps {
  allCompleted: boolean;
  loading: boolean;
  hasTask: boolean;
  onToggleAll: (checked: boolean) => void;
}

export const BulkActions = React.memo<BulkActionsProps>(({
  allCompleted,
  loading,
  hasTask,
  onToggleAll,
}) => {
  return (
    <div className="px-4 pb-4">
      <label className="flex items-start gap-4 cursor-pointer">
        <input
          type="checkbox"
          checked={allCompleted}
          onChange={(e) => onToggleAll(e.target.checked)}
          disabled={loading || !hasTask}
          className="mt-1 h-5 w-5 text-custom-accent bg-custom-background border-custom-border rounded focus:ring-custom-accent focus:ring-2 disabled:opacity-50"
          aria-label="Toggle all tasks completion status"
        />
        <span className="text-custom-primary-text font-medium text-sm sm:text-base">
          Toggle all tasks
        </span>
      </label>
    </div>
  );
});

BulkActions.displayName = "BulkActions";