import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "dark";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-custom-accent hover:bg-blue-600 text-white",
  secondary:
    "bg-custom-background text-custom-secondary-text hover:bg-custom-border border border-custom-border",
  success: "bg-custom-price-up hover:bg-green-600 text-white",
  danger: "bg-custom-price-down hover:bg-red-600 text-white",
  dark: "bg-custom-button-dark hover:bg-custom-button-dark-hover text-custom-primary-text",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1 text-xs sm:text-sm",
  md: "px-4 py-2 text-sm sm:text-base",
  lg: "px-6 py-3 text-sm sm:text-base",
};

export const Button = React.memo<ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
    disabled,
    ...props
  }) => {
    const baseStyles =
      "font-medium rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-accent focus-visible:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";
    const variantClass = variantStyles[variant];
    const sizeClass = sizeStyles[size];
    const widthClass = fullWidth ? "w-full" : "w-auto";

    const combinedClassName =
      `${baseStyles} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim();

    return (
      <button className={combinedClassName} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
