import React from "react";
import "../style/components/button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "ghost" | "icon";
  disabled?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "medium",
  variant = "ghost",
  disabled = false,
  className = "",
}) => {
  // Dynamically combine utility-based class names
  const classes = [
    "btn",
    `btn--${size}`,
    `btn--${variant}`,
    disabled ? "disabled" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};
