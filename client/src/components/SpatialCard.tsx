import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SpatialCardProps {
  children: ReactNode;
  className?: string;
  glow?: "sage" | "coral" | "none";
  onClick?: () => void;
  delay?: number;
}

export default function SpatialCard({ children, className = "", glow = "sage", onClick, delay = 0 }: SpatialCardProps) {
  const glowClass = glow === "sage" ? "glow-shadow" : glow === "coral" ? "glow-coral" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      }}
      whileHover={{
        scale: 1.02,
        y: -3,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
      whileTap={{
        scale: 0.96,
        transition: { type: "spring", stiffness: 500, damping: 15 },
      }}
      onClick={onClick}
      className={`spatial-card ${glowClass} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
