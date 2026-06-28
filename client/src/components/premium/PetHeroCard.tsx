import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Star } from "@phosphor-icons/react";

interface PetHeroCardProps {
  isHappy: boolean;
  energy: number;
  earWiggle: boolean;
}

export default function PetHeroCard({ isHappy, energy, earWiggle }: PetHeroCardProps) {
  const [happyBurst, setHappyBurst] = useState(false);

  useEffect(() => {
    if (isHappy) {
      setHappyBurst(true);
      setTimeout(() => setHappyBurst(false), 1200);
    }
  }, [isHappy]);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* 3D Stage platform */}
      <div className="relative">
        {/* Platform shadow */}
        <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-[140px] h-[20px] rounded-[50%] bg-black/15 blur-lg" />
        
        {/* Glow ring behind pet */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(233,196,106,0.2) 0%, rgba(180,140,220,0.1) 50%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating pet container */}
        <motion.div
          animate={isHappy ? { y: [0, -25, -10, -20, 0], rotate: [0, -12, 12, -8, 0] } : { y: [0, -10, 0] }}
          transition={isHappy ? { duration: 0.7, ease: "easeOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          {/* 3D Pet Showcase */}
          <div className="w-36 h-36 relative">
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow/20 via-lavender/10 to-cyan/20 blur-xl" />
            
            {/* Pet circular stage */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-sm border border-white/60 shadow-lg flex items-center justify-center overflow-hidden">
              {/* Inner highlight */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent" />
              
              {/* Cute Cat SVG - enhanced */}
              <div className="pet-breathe w-28 h-28">
                <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
                  {/* Body */}
                  <ellipse cx="60" cy="80" rx="35" ry="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                  {/* Head */}
                  <circle cx="60" cy="52" r="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                  {/* Ears with wiggle */}
                  <g className={earWiggle ? "ear-left" : ""} style={{ transformOrigin: "32px 14px" }}>
                    <path d="M38 30 L32 14 L48 26 Z" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                  </g>
                  <g className={earWiggle ? "ear-right" : ""} style={{ transformOrigin: "88px 14px" }}>
                    <path d="M82 30 L88 14 L72 26 Z" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                  </g>
                  {/* Inner ears */}
                  <path d="M40 28 L36 18 L46 26 Z" fill="#e8b4b8" />
                  <path d="M80 28 L84 18 L74 26 Z" fill="#e8b4b8" />
                  {/* Eyes - animated blink */}
                  <motion.g
                    animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.8, 0.85, 1] }}
                  >
                    <circle cx="50" cy="48" r="5" fill="#2d3436" />
                    <circle cx="70" cy="48" r="5" fill="#2d3436" />
                  </motion.g>
                  {/* Eye highlights */}
                  <circle cx="52" cy="46" r="1.5" fill="white" />
                  <circle cx="72" cy="46" r="1.5" fill="white" />
                  {/* Nose */}
                  <ellipse cx="60" cy="58" rx="3" ry="2" fill="#e8b4b8" />
                  {/* Mouth */}
                  <path d="M56 62 Q60 66 64 62" stroke="#d4a574" strokeWidth="2" fill="none" />
                  {/* Whiskers */}
                  <line x1="35" y1="55" x2="20" y2="52" stroke="#d4a574" strokeWidth="1.5" />
                  <line x1="35" y1="60" x2="18" y2="60" stroke="#d4a574" strokeWidth="1.5" />
                  <line x1="85" y1="55" x2="100" y2="52" stroke="#d4a574" strokeWidth="1.5" />
                  <line x1="85" y1="60" x2="102" y2="60" stroke="#d4a574" strokeWidth="1.5" />
                  {/* Paws */}
                  <ellipse cx="42" cy="95" rx="8" ry="6" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2" />
                  <ellipse cx="78" cy="95" rx="8" ry="6" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2" />
                  {/* Tail */}
                  <path d="M92 75 Q105 65 102 50" stroke="#d4a574" strokeWidth="2.5" fill="none" className="pet-tail" />
                  {/* Blush */}
                  <circle cx="40" cy="55" r="4" fill="#e8b4b8" opacity="0.5" />
                  <circle cx="80" cy="55" r="4" fill="#e8b4b8" opacity="0.5" />
                </svg>
              </div>
            </div>
            
            {/* Happy burst particles */}
            {happyBurst && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                    style={{
                      background: ["#e9c46a", "#e76f51", "#b48cdc", "#4a7c59"][i % 4],
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 8) * 60,
                      y: Math.sin((i * Math.PI * 2) / 8) * 60,
                      scale: [0, 1.2, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </div>
        </motion.div>

        {/* Level badge */}
        <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-white/70 backdrop-blur-md px-2 py-1 rounded-none border border-white/50 shadow-sm">
          <Star className="w-3 h-3 text-yellow fill-yellow" />
          <span className="text-[11px] font-bold text-ink">3</span>
        </div>
      </div>

      {/* Name & status */}
      <div className="mt-4 text-center">
        <h2 className="text-[22px] font-black text-ink tracking-tight">Mimi</h2>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-[13px] text-muted-foreground mt-0.5"
        >
          {isHappy ? "😻 Yay! Cảm ơn bạn!" : "🐱 Đang vui • Muốn thêm kỷ niệm"}
        </motion.p>
      </div>
    </motion.div>
  );
}
