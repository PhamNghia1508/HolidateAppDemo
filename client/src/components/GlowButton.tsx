import { motion } from "framer-motion";

/* ============================================================
   GLOW BUTTON — Predictive Action Island
   AI-native glowing pill, shimmer sweep, spring physics
   ============================================================ */

interface GlowButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "gradient" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export default function GlowButton({
  children,
  onClick,
  className = "",
  variant = "gradient",
  size = "md",
  icon,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: "h-[40px] text-sm",
    md: "h-[52px] text-[16px]",
    lg: "h-[56px] text-[17px]",
  };

  const variantClasses = {
    gradient: "gradient-cta rounded-[16px] text-white",
    ghost: "rounded-[16px] text-coral bg-white/50 backdrop-blur-md border border-coral/30",
    dark: "glass-dark rounded-[16px] text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`w-full font-bold flex items-center justify-center gap-2 relative overflow-hidden ${sizeClasses[size]} ${variantClasses[variant]} ${className} focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-2 focus:ring-offset-cream`}
    >
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
