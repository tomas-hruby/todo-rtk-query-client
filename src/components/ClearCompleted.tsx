import React from "react";
import { Button } from "./Button";

interface ClearCompletedProps {
  completedCount: number;
  loading: boolean;
  onDeleteCompleted: () => void;
}

export const ClearCompleted = React.memo<ClearCompletedProps>(
  ({ completedCount, loading, onDeleteCompleted }) => {
    if (completedCount === 0) {
      return null;
    }

    return (
      <div className="px-4 sm:px-6 pt-4 border-t border-custom-border">
        <Button
          onClick={onDeleteCompleted}
          disabled={loading}
          variant="dark"
          size="lg"
          fullWidth={true}
          aria-label={`Delete ${completedCount} completed task${
            completedCount !== 1 ? "s" : ""
          }`}
        >
          Clear {completedCount} completed task
          {completedCount !== 1 ? "s" : ""}
        </Button>
      </div>
    );
  }
);

ClearCompleted.displayName = "ClearCompleted";
