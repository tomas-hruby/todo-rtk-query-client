import React from "react";

interface ClearCompletedProps {
  completedCount: number;
  loading: boolean;
  onDeleteCompleted: () => void;
}

export const ClearCompleted = React.memo<ClearCompletedProps>(({
  completedCount,
  loading,
  onDeleteCompleted,
}) => {
  if (completedCount === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 pt-4 border-t border-custom-border">
      <button
        onClick={onDeleteCompleted}
        disabled={loading}
        className="w-full px-4 py-3 rounded-lg text-sm sm:text-base font-medium bg-custom-button-dark hover:bg-custom-button-dark-hover text-custom-primary-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label={`Delete ${completedCount} completed task${
          completedCount !== 1 ? "s" : ""
        }`}
      >
        Clear {completedCount} completed task
        {completedCount !== 1 ? "s" : ""}
      </button>
    </div>
  );
});

ClearCompleted.displayName = "ClearCompleted";