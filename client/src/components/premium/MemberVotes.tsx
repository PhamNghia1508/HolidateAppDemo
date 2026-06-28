import React from "react";
import { motion } from "framer-motion";

const T3 = "#9C8470";
const GREEN = "#3D6B4F";

export function MemberVotes({
  members, votedCount, totalCount, accentColor,
}: {
  members: { i: string; color: string }[];
  votedCount: number; totalCount: number; accentColor: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {members.map((m, idx) => {
        const voted = idx < votedCount;
        return (
          <motion.div key={idx}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05, type: "spring", stiffness: 500, damping: 24 }}
            className="relative w-7 h-7 rounded-none flex items-center justify-center text-xs font-bold text-white"
            style={{
              background: voted ? m.color : "rgba(26,14,7,0.10)",
              border: `1.5px solid ${voted ? "white" : "transparent"}`,
              color: voted ? "white" : T3,
              opacity: voted ? 1 : 0.55,
            }}>
            {m.i}
            {voted && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-none flex items-center justify-center"
                style={{ background: GREEN, border: "1.5px solid white" }}>
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <path d="M1 3l1.5 1.5L5 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
