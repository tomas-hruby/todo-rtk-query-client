import React from "react";

export const Footer = React.memo(() => {
  return (
    <footer className="bg-custom-surface border-t border-custom-border mt-auto">
      <p className="text-sm text-custom-secondary-text text-center py-3">
        © 2025 Tomáš Hrubý.
      </p>
    </footer>
  );
});

Footer.displayName = "Footer";
