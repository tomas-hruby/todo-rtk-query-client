import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearErrorMessage, handleAsyncError } from "../store/actions";
import { selectFilter, selectDisplayErrorMessage } from "../store/selectors";
import {
  useGetAllTasksQuery,
  useGetCompletedTasksQuery,
} from "../services/todoApi";
import { Button } from "./Button";

interface ErrorBannerProps {}

export const ErrorBanner = React.memo<ErrorBannerProps>(() => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const errorMessage = useAppSelector(selectDisplayErrorMessage);

  // RTK Query hooks for refresh functionality
  const { error: allTasksError, refetch: refetchAllTasks } =
    useGetAllTasksQuery(undefined, {
      skip: filter !== "all" && filter !== "incomplete",
    });

  const { error: completedTasksError, refetch: refetchCompletedTasks } =
    useGetCompletedTasksQuery(undefined, {
      skip: filter !== "completed",
    });

  const currentQueryError =
    filter === "completed" ? completedTasksError : allTasksError;

  const handleRefreshData = useCallback(async () => {
    try {
      if (filter === "completed") {
        await refetchCompletedTasks().unwrap();
      } else {
        await refetchAllTasks().unwrap();
      }
      dispatch(clearErrorMessage());
    } catch (error) {
      dispatch(handleAsyncError(error, "Failed to refresh data"));
    }
  }, [filter, refetchAllTasks, refetchCompletedTasks, dispatch]);

  useEffect(() => {
    if (currentQueryError) {
      let errorMessage = "Failed to load tasks";
      if (filter === "completed") {
        errorMessage = "Failed to load completed tasks";
      } else if (filter === "incomplete") {
        errorMessage = "Failed to load incomplete tasks";
      }
      dispatch(handleAsyncError(currentQueryError, errorMessage));
    }
  }, [currentQueryError, filter, dispatch]);

  if (!errorMessage) {
    return null;
  }

  return (
    <div
      className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl w-full px-4 sm:px-6"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="bg-custom-error-bg border border-custom-price-down text-custom-error-text p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 shadow-lg">
        <span className="text-sm sm:text-base">{errorMessage}</span>
        <div className="flex gap-2 w-full sm:w-auto justify-end sm:ml-4">
          {currentQueryError && (
            <Button
              onClick={handleRefreshData}
              variant="dark"
              size="sm"
              aria-label="Retry loading data"
            >
              Retry
            </Button>
          )}
          <button
            onClick={() => dispatch(clearErrorMessage())}
            className="text-custom-error-text hover:text-custom-primary-text font-bold text-lg sm:text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-custom-accent focus-visible:ring-opacity-50"
            aria-label="Close error message"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
});

ErrorBanner.displayName = "ErrorBanner";
