import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SpringButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "gradient" | "outline" | "ghost";
  fullWidth?: boolean;
  disabled?: boolean;
  "data-testid"?: string;
}

export default function SpringButton({
  children,
  onClick,
  className = "",
  variant = "gradient",
  fullWidth = true,
  disabled = false,
  "data-testid": testId,
}: SpringButtonProps) {
  const baseStyle =
    "relative font-semibold text-[16px] overflow-hidden flex items-center justify-center gap-2";
  const sizeStyle = fullWidth ? "w-full h-[52px]" : "px-6 h-[48px]";
  const radiusStyle = "rounded-[14px]";

  const variantStyles = {
    gradient: "text-white shadow-lg",
    outline: "border border-white/60 backdrop-blur-md bg-white/60",
    ghost: "bg-transparent",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      whileHover={{
        scale: 1.03,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{
        scale: 0.94,
        transition: { type: "spring", stiffness: 600, damping: 12 },
      }}
      className={`${baseStyle} ${sizeStyle} ${radiusStyle} ${variantStyles[variant]} ${className}`}
      style={
        variant === "gradient"
          ? {
              background: "linear-gradient(135deg, #e76f51 0%, #f4a261 100%)",
              boxShadow: "0 8px 32px rgba(231,111,81,0.3), 0 0 60px rgba(231,111,81,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
            }
          : undefined
      }
    >
      {children}
    </motion.button>
  );
}
