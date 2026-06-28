import React from "react";
import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div className="w-full text-left rounded-none overflow-hidden focus:outline-none p-4 mb-3"
      style={{
        background: "#F9F4EA",
        border: "1px solid rgba(26,14,7,0.10)",
        boxShadow: "0 1px 3px rgba(26,14,7,0.06), 0 4px 16px rgba(26,14,7,0.06)",
      }}>
      <div className="flex items-start justify-between mb-4">
        <div className="h-5 w-2/3 bg-black/5 animate-pulse rounded-none" />
        <div className="h-4 w-4 bg-black/5 animate-pulse rounded-none" />
      </div>
      <div className="flex gap-2 items-center mb-4">
        <div className="h-1.5 w-1.5 bg-black/5 animate-pulse rounded-none" />
        <div className="h-4 w-12 bg-black/5 animate-pulse rounded-none" />
        <div className="h-px w-6 bg-black/5 animate-pulse rounded-none" />
        <div className="h-1.5 w-1.5 bg-black/5 animate-pulse rounded-none" />
        <div className="h-4 w-12 bg-black/5 animate-pulse rounded-none" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-black/5 animate-pulse rounded-none" />
        <div className="flex gap-1.5">
          <div className="h-7 w-7 bg-black/5 animate-pulse rounded-none" />
          <div className="h-7 w-7 bg-black/5 animate-pulse rounded-none" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Đang tải dữ liệu">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}>
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
}
