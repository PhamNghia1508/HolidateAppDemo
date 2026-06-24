import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PremiumButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "gradient" | "glass" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
}

export default function PremiumButton({
  children,
  onClick,
  variant = "gradient",
  size = "md",
  fullWidth = true,
  disabled = false,
  className = "",
  "data-testid": testId,
}: PremiumButtonProps) {
  const sizeClasses = {
    sm: "h-[40px] text-[14px] px-4",
    md: "h-[52px] text-[16px] px-6",
    lg: "h-[56px] text-[18px] px-8",
  };

  const variantStyles = {
    gradient: {
      className: "text-white font-bold",
      style: {
        background: "linear-gradient(135deg, #e76f51 0%, #f4a261 50%, #e9c46a 100%)",
        boxShadow: "0 8px 32px rgba(231,111,81,0.35), 0 0 60px rgba(231,111,81,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
      },
    },
    glass: {
      className: "text-ink font-semibold bg-white/50 backdrop-blur-xl border border-white/60",
      style: {
        boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)",
      },
    },
    ghost: {
      className: "text-muted-foreground font-medium",
      style: {},
    },
    outline: {
      className: "text-ink font-semibold bg-white/30 backdrop-blur-md border border-white/50",
      style: {
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      },
    },
  };

  const v = variantStyles[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      whileHover={disabled ? {} : { scale: 1.03, y: -2, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      whileTap={disabled ? {} : { scale: 0.94, transition: { type: "spring", stiffness: 600, damping: 12 } }}
      className={`relative overflow-hidden rounded-[16px] flex items-center justify-center gap-2
        ${sizeClasses[size]} ${fullWidth ? "w-full" : ""}
        ${v.className} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}`}
      style={v.style}
    >
      {/* Shine effect */}
      {!disabled && variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
      )}
      {children}
    </motion.button>
  );
}
