import React from "react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-16 h-16 bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6"
      >
        {icon}
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 30 }}
        className="font-serif text-2xl text-slate-900 mb-2 leading-tight"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 400, damping: 30 }}
        className="text-slate-500 mb-8 max-w-[260px] leading-relaxed italic font-serif"
      >
        {description}
      </motion.p>
      
      {actionLabel && onAction && (
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="h-12 px-8 bg-slate-900 text-white font-bold text-xs uppercase tracking-[0.1em] rounded-none hover:bg-slate-800 transition-colors"
        >
          {actionLabel}
        </motion.button>
      )}
    </div>
  );
}
