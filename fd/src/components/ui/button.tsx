import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...rest
}: ButtonProps) {
  const toneStyles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
    outline: "border border-slate-900 text-slate-900 bg-transparent hover:bg-slate-100",
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 ${toneStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
