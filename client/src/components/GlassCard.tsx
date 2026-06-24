import { motion } from "framer-motion";

/* ============================================================
   GLASS CARD — Unicorn Standard Glassmorphism 2.0
   Multi-layered depth, ambient glow, spring physics
   ============================================================ */

interface GlassCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  elevated?: boolean;
  dark?: boolean;
  ambient?: "mint" | "coral" | "gold" | "none";
  delay?: number;
  stagger?: number;
  tilt?: boolean;
}

export default function GlassCard({
  children,
  onClick,
  className = "",
  elevated = false,
  dark = false,
  ambient = "none",
  delay = 0,
  stagger = 0,
  tilt = false,
}: GlassCardProps) {
  const baseClass = dark
    ? "glass-dark"
    : elevated
    ? "glass-elevated"
    : "glass";

  const ambientClass = ambient === "mint"
    ? "ambient-glow"
    : ambient === "coral"
    ? "ambient-glow-coral"
    : ambient === "gold"
    ? "ambient-glow-gold"
    : "";

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: delay + stagger,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      whileHover={tilt || onClick ? { scale: 1.03, y: -3, rotateX: tilt ? 2 : 0 } : { scale: 1.02, y: -2 }}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      onClick={onClick}
      className={`${baseClass} ${ambientClass} ${className} focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-2 focus:ring-offset-cream`}
      style={tilt ? { perspective: 1000 } : undefined}
    >
      {children}
    </Component>
  );
}
