import { AppDispatch } from "./index";
import { setErrorMessage, clearError } from "./appSlice";

export const handleAsyncError =
  (error: any, defaultMessage: string) => (dispatch: AppDispatch) => {
    let message = defaultMessage;

    // Handle RTK Query errors
    if (error?.data) {
      // Server returned an error response
      if (typeof error.data === "string") {
        message = `${defaultMessage}: ${error.data}`;
      } else if (error.data.message) {
        message = `${defaultMessage}: ${error.data.message}`;
      } else {
        message = `${defaultMessage} (Server Error ${error.status || ""})`;
      }
    } else if (error?.status) {
      // HTTP status error
      message = `${defaultMessage} (HTTP ${error.status})`;
    } else if (error?.message) {
      // General error with message
      message = error.message.includes(defaultMessage)
        ? error.message
        : `${defaultMessage}: ${error.message}`;
    }

    console.error(defaultMessage, error);
    dispatch(setErrorMessage(message));
  };

export const clearErrorMessage = () => (dispatch: AppDispatch) => {
  dispatch(clearError());
};
