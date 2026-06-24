import { useState } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Heart, Sparkles, Trophy, Star, PawPrint } from "lucide-react";

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);

  const feedPet = () => {
    setEnergy((prev) => Math.min(100, prev + 15));
    setIsHappy(true);
    setTimeout(() => setIsHappy(false), 1500);
  };

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative"
      style={{
        background: "linear-gradient(180deg, #e8ddd3 0%, #d4c5b5 50%, #c8b8a4 100%)",
      }}
    >
      {/* Sky background */}
      <div className="absolute top-0 left-0 right-0 h-[45%]" style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #E0F0F8 70%, #f3eee8 100%)"
      }} />
      <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-yellow/30 blur-[2px]" />
      <div className="absolute top-12 left-12 w-2 h-2 rounded-full bg-white" />
      <div className="absolute top-20 right-24 w-3 h-1 rounded-full bg-white" />
      <div className="absolute top-16 left-20 w-4 h-1 rounded-full bg-white" />

      {/* Clouds */}
      <div className="absolute top-8 left-[-20px] w-20 h-8 rounded-full bg-white/40" />
      <div className="absolute top-14 right-[-10px] w-24 h-10 rounded-full bg-white/30" />

      <div className="flex-1 overflow-y-auto pb-24 px-6 relative z-10">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[26px] font-bold text-ink mb-1">GoPet</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          Mỗi chuyến đi hoàn thành giúp GoPet lớn lên.
        </p>

        {/* Floating Island */}
        <div className="relative mb-5">
          {/* Island shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-4 bg-black/10 rounded-full blur-md" />

          {/* Island */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-[24px] overflow-hidden border border-white/50 backdrop-blur-md"
            style={{
              background: "linear-gradient(180deg, #f3eee8 0%, #e8ddd3 100%)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
            }}
          >
            {/* Grass top */}
            <div className="h-3 bg-gradient-to-b from-sage/30 to-transparent" />

            <div className="p-5 pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-medium text-sage">Level 3</span>
                <div className="flex gap-1">
                  {[1,2,3].map((i) => (
                    <Star key={i} className="w-3 h-3 text-yellow fill-yellow" />
                  ))}
                </div>
              </div>

              {/* Cute Cat SVG */}
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={isHappy ? { y: [0, -20, -10, -20, 0], rotate: [0, -10, 10, -10, 0] } : { y: [0, -8, 0] }}
                  transition={isHappy ? { duration: 0.8 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 relative"
                >
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    {/* Body */}
                    <ellipse cx="60" cy="80" rx="35" ry="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                    {/* Head */}
                    <circle cx="60" cy="52" r="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                    {/* Ears */}
                    <path d="M38 30 L32 14 L48 26 Z" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                    <path d="M82 30 L88 14 L72 26 Z" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
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
                    {/* Tail with CSS animation */}
                    <path
                      d="M92 75 Q105 65 102 50"
                      stroke="#d4a574"
                      strokeWidth="2.5"
                      fill="none"
                      className="pet-tail"
                    />
                    {/* Blush */}
                    <circle cx="40" cy="55" r="4" fill="#e8b4b8" opacity="0.5" />
                    <circle cx="80" cy="55" r="4" fill="#e8b4b8" opacity="0.5" />
                  </svg>
                </motion.div>
              </div>

              <h3 className="text-[20px] font-bold text-ink text-center mb-1">Mimi</h3>
              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[13px] text-muted-foreground text-center"
              >
                {isHappy ? "😻 Yay! Cảm ơn bạn!" : "🐱 Đang vui • Muốn thêm kỷ niệm"}
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Energy */}
        <div className="rounded-[20px] p-5 border border-white/60 backdrop-blur-md bg-white/60 mb-5">
          <h3 className="text-[16px] font-bold text-ink mb-1">Đói bụng</h3>
          <p className="text-[13px] text-muted-foreground mb-3">
            Hoàn thành plan, lưu ảnh và recap để tăng năng lượng cho Mimi.
          </p>
          <div className="w-full h-4 bg-white/80 rounded-full overflow-hidden border border-white/60">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #e76f51, #f4a261, #e9c46a)",
                boxShadow: "0 0 8px rgba(231,111,81,0.4)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${energy}%` }}
              transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
            />
          </div>
          <p className="text-[12px] text-muted-foreground mt-2 text-right">
            {energy}% — {energy < 100 ? "Cần thêm kỷ niệm" : "Mimi no nê rồi!"}
          </p>
        </div>

        {/* Rewards */}
        <div className="rounded-[20px] p-5 border border-white/60 backdrop-blur-md bg-white/60 mb-5">
          <h3 className="text-[16px] font-bold text-ink mb-3">Mở khóa tiếp theo</h3>
          <div className="flex gap-3">
            {[
              { icon: Heart, label: "Nhãn dán", locked: false, color: "#e76f51" },
              { icon: Sparkles, label: "Mũ len", locked: false, color: "#e9c46a" },
              { icon: Trophy, label: "Huy hiệu", locked: true, color: "#b8b8b8" },
            ].map((reward, i) => (
              <motion.div
                key={reward.label}
                whileHover={!reward.locked ? { scale: 1.1, y: -4 } : {}}
                className="flex-1 flex flex-col items-center rounded-[14px] p-3 cursor-pointer"
                style={{
                  background: reward.locked
                    ? "rgba(184,184,184,0.2)"
                    : `rgba(${i === 0 ? '231,111,81' : i === 1 ? '233,196,106' : '74,124,89'}, 0.12)`,
                  opacity: reward.locked ? 0.5 : 1,
                }}
              >
                <motion.div
                  animate={!reward.locked ? { rotate: [0, 8, -8, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <reward.icon
                    className="w-6 h-6 mb-1"
                    style={{ color: reward.color }}
                  />
                </motion.div>
                <span className="text-[12px] font-medium text-ink">{reward.label}</span>
                {reward.locked && (
                  <span className="text-[10px] text-muted-foreground">Level 5</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.button
          onClick={feedPet}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="w-full h-[52px] rounded-[14px] font-semibold text-[16px] text-white shadow-lg overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #e76f51 0%, #f4a261 100%)",
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <PawPrint className="w-4 h-4" />
            Cho Mimi ăn kỷ niệm
          </span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
