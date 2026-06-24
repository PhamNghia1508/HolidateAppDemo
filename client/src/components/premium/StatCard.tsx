import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: ReactNode;
  color?: "sage" | "coral" | "lavender" | "gold" | "cyan";
  delay?: number;
}

const colorMap = {
  sage: "text-sage",
  coral: "text-coral",
  lavender: "text-[#b48cdc]",
  gold: "text-yellow",
  cyan: "text-[#5fb3c0]",
};

const bgMap = {
  sage: "bg-sage/10",
  coral: "bg-coral/10",
  lavender: "bg-[#b48cdc]/10",
  gold: "bg-yellow/10",
  cyan: "bg-[#5fb3c0]/10",
};

export default function StatCard({ label, value, unit, icon, color = "sage", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.05, y: -2, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      whileTap={{ scale: 0.97 }}
      className="premium-glass-card p-4 flex flex-col items-center justify-center text-center"
    >
      {icon && (
        <div className={`w-8 h-8 rounded-full ${bgMap[color]} flex items-center justify-center mb-2`}>
          {icon}
        </div>
      )}
      <div className={`text-[28px] font-black tracking-tight ${colorMap[color]}`}>
        {value}
        {unit && <span className="text-[14px] font-semibold ml-0.5">{unit}</span>}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground opacity-60 mt-1">
        {label}
      </div>
    </motion.div>
  );
}
