import React from "react";
import { useAppDispatch } from "../store/hooks";
import { clearErrorMessage } from "../store/actions";
import { Button } from "./Button";

interface ErrorBannerProps {
  errorMessage: string;
  currentQueryError: any;
  onRetry: () => void;
}

export const ErrorBanner = React.memo<ErrorBannerProps>(
  ({ errorMessage, currentQueryError, onRetry }) => {
    const dispatch = useAppDispatch();

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
                onClick={onRetry}
                variant="dark"
                size="sm"
                aria-label="Retry loading data"
              >
                Retry
              </Button>
            )}
            <button
              onClick={() => dispatch(clearErrorMessage())}
              className="text-custom-error-text hover:text-custom-primary-text font-bold text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-custom-accent focus:ring-opacity-50"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }
);

ErrorBanner.displayName = "ErrorBanner";
