import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Heart, Sparkles, Trophy, Star, PawPrint } from "lucide-react";
import SpatialCard from "@/components/SpatialCard";
import SpringButton from "@/components/SpringButton";
import MagicalParticles from "@/components/MagicalParticles";

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number }[]>([]);
  const [sparkId, setSparkId] = useState(0);

  const feedPet = () => {
    const oldEnergy = energy;
    const newEnergy = Math.min(100, oldEnergy + 15);
    setEnergy(newEnergy);
    setIsHappy(true);

    // Spawn sparkles at the end of the energy bar
    const newSparks = Array.from({ length: 5 }, (_, i) => ({
      id: sparkId + i,
      x: oldEnergy + (newEnergy - oldEnergy) * (i / 5),
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setSparkId((prev) => prev + 5);
    setTimeout(() => setSparks((prev) => prev.filter((s) => !newSparks.find((n) => n.id === s.id))), 800);
    setTimeout(() => setIsHappy(false), 1500);
  };

  // Auto-ear wiggle every few seconds
  const [earWiggle, setEarWiggle] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 1500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 25%, #E0F0F8 45%, #f3eee8 70%, #e8ddd3 100%)",
      }}
    >
      {/* Magical particles layer */}
      <MagicalParticles />

      {/* Sky background */}
      <div className="absolute top-0 left-0 right-0 h-[50%]" style={{
        background: "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 40%, #E0F0F8 70%, transparent 100%)"
      }} />

      {/* Sun with glow */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-yellow/20 blur-xl" />
      <div className="absolute top-12 right-12 w-12 h-12 rounded-full bg-yellow/40 blur-md" />

      {/* Clouds with float animation */}
      <motion.div
        className="absolute top-8 left-[-20px] w-24 h-10 rounded-full bg-white/40"
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-16 right-[-10px] w-28 h-12 rounded-full bg-white/30"
        animate={{ x: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

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
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[26px] font-bold text-ink mb-1"
        >
          GoPet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[14px] text-muted-foreground mb-5"
        >
          Mỗi chuyến đi hoàn thành giúp GoPet lớn lên.
        </motion.p>

        {/* Floating Island */}
        <div className="relative mb-5">
          {/* Island shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-4 bg-black/10 rounded-full blur-md" />

          {/* Island with CSS floating animation */}
          <div className="island-bob">
            <div className="rounded-[24px] overflow-hidden border border-white/50 backdrop-blur-md spatial-card"
              style={{
                background: "linear-gradient(180deg, #f3eee8 0%, #e8ddd3 100%)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08), 0 0 80px rgba(74,124,89,0.08)",
              }}
            >
              {/* Grass top with inner glow */}
              <div className="h-3 bg-gradient-to-b from-sage/40 to-transparent" />

              <div className="p-5 pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[13px] font-medium text-sage">Level 3</span>
                  <div className="flex gap-1">
                    {[1,2,3].map((i) => (
                      <Star key={i} className="w-3 h-3 text-yellow fill-yellow" />
                    ))}
                  </div>
                </div>

                {/* Cute Cat SVG with breathing animation */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={isHappy ? { y: [0, -20, -10, -20, 0], rotate: [0, -10, 10, -10, 0] } : { y: [0, -8, 0] }}
                    transition={isHappy ? { duration: 0.8 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 relative"
                  >
                    <div className="pet-breathe w-full h-full">
                      <svg viewBox="0 0 120 120" className="w-full h-full">
                        {/* Body */}
                        <ellipse cx="60" cy="80" rx="35" ry="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                        {/* Head */}
                        <circle cx="60" cy="52" r="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                        {/* Ears with wiggle class */}
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
                    </div>
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
            </div>
          </div>
        </div>

        {/* Energy with SpatialCard + sparkles */}
        <SpatialCard glow="coral" className="mb-5">
          <div className="p-5">
            <h3 className="text-[16px] font-bold text-ink mb-1">Đói bụng</h3>
            <p className="text-[13px] text-muted-foreground mb-3">
              Hoàn thành plan, lưu ảnh và recap để tăng năng lượng cho Mimi.
            </p>
            <div className="relative w-full h-4 bg-white/80 rounded-full overflow-hidden border border-white/60">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #e76f51, #f4a261, #e9c46a)",
                  boxShadow: "0 0 12px rgba(231,111,81,0.5), 0 0 24px rgba(244,162,97,0.3)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${energy}%` }}
                transition={{ duration: 1.5, type: "spring", stiffness: 60 }}
              />
              {/* Sparkles at the bar edge */}
              <AnimatePresence>
                {sparks.map((s) => (
                  <div
                    key={s.id}
                    className="energy-spark"
                    style={{ left: `${s.x}%`, top: 0 }}
                  />
                ))}
              </AnimatePresence>
            </div>
            <p className="text-[12px] text-muted-foreground mt-2 text-right">
              {energy}% — {energy < 100 ? "Cần thêm kỷ niệm" : "Mimi no nê rồi!"}
            </p>
          </div>
        </SpatialCard>

        {/* Rewards with SpatialCard */}
        <SpatialCard glow="sage" className="mb-5">
          <div className="p-5">
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
                  whileTap={!reward.locked ? { scale: 0.95 } : {}}
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
        </SpatialCard>

        {/* CTA with SpringButton */}
        <SpringButton onClick={feedPet} data-testid="button-feed-pet">
          <PawPrint className="w-4 h-4" />
          Cho Mimi ăn kỷ niệm
        </SpringButton>
      </div>

      <BottomNav />
    </div>
  );
}
