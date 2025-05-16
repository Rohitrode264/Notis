import React from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }
  

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "success" | "warning" | "danger";
  icon?: React.ReactNode;
  disabled?: boolean;
}

const variantClasses = {
  primary: "bg-gradient-to-br from-gray-800 via-gray-900 hover:bg-gray-600 hover:duration-400 cursor-pointer",
  success: "bg-gradient-to-br from-blue-800 via-gray-900 hover:bg-blue-700 hover:duration-400 cursor-pointer",
  warning: "bg-yellow-500 hover:bg-yellow-600 hover:duration-400 cursor-pointer",
  danger: "bg-gradient-to-br from-red-800 via-gray-900 hover:bg-red-700 hover:duration-400 cursor-pointer",
};

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  icon,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 text-sm text-white px-3 py-1.5 rounded-md transition duration-200",
        variantClasses[variant],
        disabled ? "opacity-50 cursor-not-allowed" : ""
      )}
    >
      {icon}
      {label}
    </button>
  );
};

export default ActionButton;
