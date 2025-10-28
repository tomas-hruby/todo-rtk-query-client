import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleTheme } from "../store/appSlice";
import { selectTheme } from "../store/selectors";

export const ThemeToggle = React.memo(() => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 rounded-lg bg-custom-button-dark hover:bg-custom-button-dark-hover text-custom-primary-text focus:outline-none focus:ring-2 focus:ring-custom-accent focus:ring-opacity-50"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <span className="text-lg font-bold">
        {theme === "light" ? "🌙" : "☀"}
      </span>
    </button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
