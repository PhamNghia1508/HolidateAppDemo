import { motion } from "framer-motion";

/* ============================================================
   STAT PILL — Micro-stat with ambient glow
   ============================================================ */

interface StatPillProps {
  value: string;
  label: string;
  color?: "mint" | "coral" | "champagne" | "clay";
  delay?: number;
}

export default function StatPill({ value, label, color = "mint", delay = 0 }: StatPillProps) {
  const colorMap = {
    mint: "bg-mint/10 text-mint border-mint/15",
    coral: "bg-coral/10 text-coral border-coral/15",
    champagne: "bg-champagne/10 text-champagne border-champagne/15",
    clay: "bg-clay/10 text-clay border-clay/15",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      className={`glass p-3 text-center ${colorMap[color]}`}
    >
      <p className="text-[22px] font-black">{value}</p>
      <p className="stat-label">{label}</p>
    </motion.div>
  );
}
