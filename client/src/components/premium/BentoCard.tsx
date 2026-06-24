import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  glow?: "sage" | "coral" | "lavender" | "gold" | "none";
  delay?: number;
  interactive?: boolean;
  onClick?: () => void;
}

const glowMap = {
  sage: "rgba(74,124,89,0.15)",
  coral: "rgba(231,111,81,0.15)",
  lavender: "rgba(180,140,220,0.15)",
  gold: "rgba(233,196,106,0.15)",
  none: "transparent",
};

export default function BentoCard({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
  glow = "sage",
  delay = 0,
  interactive = true,
  onClick,
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !interactive) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
      whileHover={interactive ? { scale: 1.02, y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } } : {}}
      whileTap={interactive ? { scale: 0.97 } : {}}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.08), 0 0 80px ${glowMap[glow]}, inset 0 1px 0 rgba(255,255,255,0.4)`,
      }}
      className={`premium-glass-card ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
