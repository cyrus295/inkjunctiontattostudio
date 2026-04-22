export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...rest
}) {
  const toneStyles = {
    primary: "bg-white text-slate-900 hover:bg-green-500 hover:text-white shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_25px_rgba(34,197,94,0.4)]",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 shadow-lg",
    outline: "border-2 border-white/20 text-white bg-transparent hover:bg-white hover:text-slate-900",
    green: "bg-green-600 text-white hover:bg-green-500 shadow-[0_4px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_4px_25px_rgba(34,197,94,0.5)]",
    blue: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_20px_rgba(37,99,235,0.3)]",
    red: "bg-red-600 text-white hover:bg-red-500 shadow-[0_4px_20px_rgba(220,38,38,0.3)]",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-full font-bold uppercase tracking-[0.1em] transition-all duration-500 active:scale-95 transform hover:-translate-y-1 ${toneStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
