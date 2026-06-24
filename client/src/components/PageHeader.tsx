import { motion } from "framer-motion";

/* ============================================================
   PAGE HEADER — Unicorn-standard micro-label + hero heading
   ============================================================ */

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  delay?: number;
}

export default function PageHeader({ label, title, subtitle, delay = 0 }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      className="pt-5 mb-5"
    >
      <div className="premium-label">{label}</div>
      <h1 className="premium-heading mt-0.5">{title}</h1>
      {subtitle && (
        <p className="text-body text-clay mt-1">{subtitle}</p>
      )}
    </motion.div>
  );
}
