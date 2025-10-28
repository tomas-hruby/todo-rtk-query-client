import React from "react";

interface HeaderProps {}

export const Header = React.memo<HeaderProps>(() => {
  return (
    <header className="bg-custom-surface shadow-lg border-b border-custom-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 text-custom-primary-text">
          Todo App
        </h1>
      </div>
    </header>
  );
});

Header.displayName = "Header";