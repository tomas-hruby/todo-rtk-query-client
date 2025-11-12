import React, { useCallback } from "react";
import { Button } from "./Button";
import { FilterType } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setFilter } from "../store/appSlice";
import { selectFilter } from "../store/selectors";

interface FilterButtonsProps {}

export const FilterButtons = React.memo<FilterButtonsProps>(() => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);

  const handleFilterChange = useCallback(
    (filter: FilterType) => {
      dispatch(setFilter(filter));
    },
    [dispatch]
  );
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <Button
        onClick={() => handleFilterChange("all")}
        variant={currentFilter === "all" ? "dark" : "secondary"}
        size="md"
        className="flex-1 sm:flex-none"
        aria-label="Show all tasks"
      >
        All Tasks
      </Button>
      <Button
        onClick={() => handleFilterChange("incomplete")}
        variant={currentFilter === "incomplete" ? "dark" : "secondary"}
        size="md"
        className="flex-1 sm:flex-none"
        aria-label="Show incomplete tasks only"
      >
        Incomplete
      </Button>
      <Button
        onClick={() => handleFilterChange("completed")}
        variant={currentFilter === "completed" ? "dark" : "secondary"}
        size="md"
        className="flex-1 sm:flex-none"
        aria-label="Show completed tasks only"
      >
        Completed
      </Button>
    </div>
  );
});

FilterButtons.displayName = "FilterButtons";
