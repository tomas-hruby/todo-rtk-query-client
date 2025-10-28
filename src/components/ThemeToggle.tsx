import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleTheme } from "../store/appSlice";
import { selectTheme } from "../store/selectors";
import { Button } from "./Button";

export const ThemeToggle = React.memo(() => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      onClick={handleToggleTheme}
      variant="dark"
      size="md"
      className="p-2"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      <span className="text-lg font-bold">
        {theme === "light" ? "🌙" : "☀"}
      </span>
    </Button>
  );
});

ThemeToggle.displayName = "ThemeToggle";
