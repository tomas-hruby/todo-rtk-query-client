import React from "react";

export type FilterType = "all" | "completed" | "incomplete";

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterButtons = React.memo<FilterButtonsProps>(
  ({ currentFilter, onFilterChange }) => {
    return (
      <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={() => onFilterChange("all")}
          className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium ${
            currentFilter === "all"
              ? "bg-custom-button-dark text-custom-primary-text"
              : "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border"
          }`}
          aria-label="Show all tasks"
        >
          All Tasks
        </button>
        <button
          onClick={() => onFilterChange("incomplete")}
          className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium ${
            currentFilter === "incomplete"
              ? "bg-custom-button-dark text-custom-primary-text"
              : "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border"
          }`}
          aria-label="Show incomplete tasks only"
        >
          Incomplete
        </button>
        <button
          onClick={() => onFilterChange("completed")}
          className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium ${
            currentFilter === "completed"
              ? "bg-custom-button-dark text-custom-primary-text"
              : "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border"
          }`}
          aria-label="Show completed tasks only"
        >
          Completed
        </button>
      </div>
    );
  }
);

FilterButtons.displayName = "FilterButtons";
