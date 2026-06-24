import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  delay?: number;
}

export default function ProgressRing({
  value,
  max = 100,
  size = 80,
  strokeWidth = 6,
  color = "#4a7c59",
  label,
  delay = 0,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      className="premium-glass-card p-4 flex flex-col items-center justify-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Animated progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.3, type: "spring", stiffness: 60 }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[18px] font-black text-ink">{value}%</span>
        </div>
      </div>
      {label && (
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground opacity-60 mt-2">
          {label}
        </div>
      )}
    </motion.div>
  );
}
