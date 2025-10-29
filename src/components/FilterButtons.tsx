import React from "react";
import { Button } from "./Button";
import { FilterType } from "../types";

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterButtons = React.memo<FilterButtonsProps>(
  ({ currentFilter, onFilterChange }) => {
    return (
      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          onClick={() => onFilterChange("all")}
          variant={currentFilter === "all" ? "dark" : "secondary"}
          size="md"
          className="flex-1 sm:flex-none"
          aria-label="Show all tasks"
        >
          All Tasks
        </Button>
        <Button
          onClick={() => onFilterChange("incomplete")}
          variant={currentFilter === "incomplete" ? "dark" : "secondary"}
          size="md"
          className="flex-1 sm:flex-none"
          aria-label="Show incomplete tasks only"
        >
          Incomplete
        </Button>
        <Button
          onClick={() => onFilterChange("completed")}
          variant={currentFilter === "completed" ? "dark" : "secondary"}
          size="md"
          className="flex-1 sm:flex-none"
          aria-label="Show completed tasks only"
        >
          Completed
        </Button>
      </div>
    );
  }
);

FilterButtons.displayName = "FilterButtons";
