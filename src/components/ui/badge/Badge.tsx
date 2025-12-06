type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant; // Light or solid variant
  size?: BadgeSize; // Badge size
  color?: BadgeColor; // Badge color
  startIcon?: React.ReactNode; // Icon at the start
  endIcon?: React.ReactNode; // Icon at the end
  children: React.ReactNode; // Badge content
}

const Badge: React.FC<BadgeProps> = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  // Define size styles
  const sizeStyles = {
    sm: "text-theme-xs", // Smaller padding and font size
    md: "text-sm", // Default padding and font size
  };

  // Define color styles for variants
  const variants = {
    light: {
      primary:
        "bg-brand-50 text-brand-500 darkx:bg-brand-500/15 darkx:text-brand-400",
      success:
        "bg-success-50 text-success-600 darkx:bg-success-500/15 darkx:text-success-500",
      error:
        "bg-error-50 text-error-600 darkx:bg-error-500/15 darkx:text-error-500",
      warning:
        "bg-warning-50 text-warning-600 darkx:bg-warning-500/15 darkx:text-orange-400",
      info: "bg-blue-light-50 text-blue-light-500 darkx:bg-blue-light-500/15 darkx:text-blue-light-500",
      light: "bg-gray-100 text-gray-700 darkx:bg-white/5 darkx:text-white/80",
      darkx: "bg-gray-500 text-white darkx:bg-white/5 darkx:text-white",
    },
    solid: {
      primary: "bg-brand-500 text-white darkx:text-white",
      success: "bg-success-500 text-white darkx:text-white",
      error: "bg-error-500 text-white darkx:text-white",
      warning: "bg-warning-500 text-white darkx:text-white",
      info: "bg-blue-light-500 text-white darkx:text-white",
      light: "bg-gray-400 darkx:bg-white/5 text-white darkx:text-white/80",
      darkx: "bg-gray-700 text-white darkx:text-white",
    },
  };

  // Get styles based on size and color variant
  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
