import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Heart, Zap, Star, Trophy, MapPin, Camera, Lock, Crown, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 },
  }),
};

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number }[]>([]);
  const [sparkId, setSparkId] = useState(0);
  const [earWiggle, setEarWiggle] = useState(false);
  const [gatherCount] = useState(12);
  const [photoCount] = useState(48);
  const [level] = useState(3);
  const [memoriesUntilLevel] = useState(2);

  const feedPet = () => {
    const newEnergy = Math.min(100, energy + 15);
    setEnergy(newEnergy);
    setIsHappy(true);
    const newSparks = Array.from({ length: 8 }, (_, i) => ({
      id: sparkId + i,
      x: energy + (newEnergy - energy) * (i / 8),
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setSparkId((prev) => prev + 8);
    setTimeout(() => setSparks((prev) => prev.filter((s) => !newSparks.find((n) => n.id === s.id))), 800);
    setTimeout(() => setIsHappy(false), 1500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEarWiggle(true);
      setTimeout(() => setEarWiggle(false), 1500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF7EA 0%, #F6EDE1 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between pt-5 mb-4"
        >
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">
              GoPet Ecosystem
            </div>
            <h1 className="text-[26px] font-black text-[#201B17] tracking-tight mt-0.5">Mimi</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#0F2D25] px-3 py-1.5 rounded-full border border-[#62C9A5]/20">
              <Zap className="w-3.5 h-3.5 text-[#F4D06F]" />
              <span className="text-[12px] font-bold text-white">Lv {level}</span>
            </div>
          </div>
        </motion.div>

        {/* === PET ROOM — Dark Cinematic Stage === */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div className="pet-room p-6 flex flex-col items-center relative">
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: ["#F4D06F", "#62C9A5", "#FFB6A3", "#F4D06F", "#62C9A5", "#FFB6A3"][i],
                  left: `${15 + i * 14}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2.5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Stage */}
            <div className="relative mb-5 w-full flex flex-col items-center">
              {/* Mint back glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(98,201,165,0.15) 0%, rgba(244,208,111,0.08) 40%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Platform shadow */}
              <div className="pet-platform" />

              {/* Glass Orb */}
              <motion.div
                animate={isHappy ? { y: [0, -30, -12, -25, 0], rotate: [0, -8, 8, -5, 0] } : { y: [0, -12, 0] }}
                transition={isHappy ? { duration: 0.8, ease: "easeOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-40 h-40 relative">
                  <div className="pet-orb absolute inset-0" />
                  <div className="absolute inset-3 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                    <div className="pet-breathe w-28 h-28">
                      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
                        <ellipse cx="60" cy="80" rx="35" ry="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                        <circle cx="60" cy="52" r="28" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                        <g className={earWiggle ? "ear-left" : ""} style={{ transformOrigin: "32px 14px" }}>
                          <path d="M38 30 L32 14 L48 26 Z" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                        </g>
                        <g className={earWiggle ? "ear-right" : ""} style={{ transformOrigin: "88px 14px" }}>
                          <path d="M82 30 L88 14 L72 26 Z" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2.5" />
                        </g>
                        <path d="M40 28 L36 18 L46 26 Z" fill="#e8b4b8" />
                        <path d="M80 28 L84 18 L74 26 Z" fill="#e8b4b8" />
                        <motion.g animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.8, 0.85, 1] }}>
                          <circle cx="50" cy="48" r="5" fill="#2d3436" />
                          <circle cx="70" cy="48" r="5" fill="#2d3436" />
                        </motion.g>
                        <circle cx="52" cy="46" r="1.5" fill="white" />
                        <circle cx="72" cy="46" r="1.5" fill="white" />
                        <ellipse cx="60" cy="58" rx="3" ry="2" fill="#e8b4b8" />
                        <path d="M56 62 Q60 66 64 62" stroke="#d4a574" strokeWidth="2" fill="none" />
                        <line x1="35" y1="55" x2="20" y2="52" stroke="#d4a574" strokeWidth="1.5" />
                        <line x1="35" y1="60" x2="18" y2="60" stroke="#d4a574" strokeWidth="1.5" />
                        <line x1="85" y1="55" x2="100" y2="52" stroke="#d4a574" strokeWidth="1.5" />
                        <line x1="85" y1="60" x2="102" y2="60" stroke="#d4a574" strokeWidth="1.5" />
                        <ellipse cx="42" cy="95" rx="8" ry="6" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2" />
                        <ellipse cx="78" cy="95" rx="8" ry="6" fill="#f8e8d8" stroke="#d4a574" strokeWidth="2" />
                        <path d="M92 75 Q105 65 102 50" stroke="#d4a574" strokeWidth="2.5" fill="none" className="pet-tail" />
                        <circle cx="40" cy="55" r="4" fill="#e8b4b8" opacity="0.5" />
                        <circle cx="80" cy="55" r="4" fill="#e8b4b8" opacity="0.5" />
                      </svg>
                    </div>
                  </div>
                  {/* Sparkles on happy */}
                  <AnimatePresence>
                    {isHappy && [...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full"
                        style={{ background: ["#F4D06F", "#FF6848", "#62C9A5", "#FFB6A3"][i % 4] }}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos((i * Math.PI * 2) / 12) * 80,
                          y: Math.sin((i * Math.PI * 2) / 12) * 80,
                          scale: [0, 1.5, 0],
                          opacity: [1, 1, 0],
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Level badge */}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                <Star className="w-3 h-3 text-[#F4D06F] fill-[#F4D06F]" />
                <span className="text-[11px] font-bold text-white">{level}</span>
              </div>
            </div>

            {/* Name & status */}
            <div className="text-center relative z-10">
              <h2 className="text-[22px] font-black text-white tracking-tight">Mimi</h2>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[13px] text-[#62C9A5] mt-0.5"
              >
                {isHappy ? "😻 Mimi no nê! Cảm ơn bạn!" : "🐱 Đang vui — muốn thêm kỷ niệm"}
              </motion.p>
            </div>

            {/* Feed CTA inside stage */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={feedPet}
              className="mt-4 h-[40px] px-5 rounded-full font-semibold text-[14px] text-white flex items-center gap-2 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FF6848, #FF9A4A)",
                boxShadow: "0 4px 20px rgba(255,104,72,0.4), 0 0 30px rgba(255,104,72,0.15)",
              }}
            >
              <PawPrint className="w-4 h-4" />
              Cho Mimi ăn kỷ niệm
            </motion.button>
          </div>
        </motion.div>

        {/* === Emotion Progression === */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div className="dark-hero-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF6848] animate-pulse" />
                <span className="text-[13px] font-bold text-[#FFB6A3]">Đói bụng</span>
              </div>
              <span className="text-[18px] font-black text-[#F4D06F]">{energy}%</span>
            </div>
            <div className="relative w-full h-3 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #FF6848, #FF9A4A, #F4D06F)",
                  boxShadow: "0 0 12px rgba(255,104,72,0.5)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${energy}%` }}
                transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
              />
              <AnimatePresence>
                {sparks.map((s) => (
                  <div key={s.id} className="energy-spark" style={{ left: `${s.x}%`, top: 0 }} />
                ))}
              </AnimatePresence>
            </div>
            <p className="text-[12px] text-white/60 mt-2">
              Cần thêm <span className="text-[#F4D06F] font-bold">{memoriesUntilLevel} kỷ niệm</span> để Mimi lên Level {level + 1}
            </p>
          </div>
        </motion.div>

        {/* === Asymmetric Bento Stats === */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {/* Gather — small */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="premium-glass-card p-3 flex flex-col items-center text-center"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04), 0 0 30px rgba(98,201,165,0.08)" }}
          >
            <div className="w-7 h-7 rounded-full bg-[#62C9A5]/15 flex items-center justify-center mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#62C9A5]" />
            </div>
            <div className="text-[22px] font-black text-[#62C9A5]">{gatherCount}</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">Gather</div>
          </motion.div>

          {/* Photos — small */}
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="premium-glass-card p-3 flex flex-col items-center text-center"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04), 0 0 30px rgba(255,104,72,0.08)" }}
          >
            <div className="w-7 h-7 rounded-full bg-[#FF6848]/15 flex items-center justify-center mb-1">
              <Camera className="w-3.5 h-3.5 text-[#FF6848]" />
            </div>
            <div className="text-[22px] font-black text-[#FF6848]">{photoCount}</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">Photos</div>
          </motion.div>

          {/* Streak — small */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="premium-glass-card p-3 flex flex-col items-center text-center"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04), 0 0 30px rgba(244,208,111,0.1)" }}
          >
            <div className="w-7 h-7 rounded-full bg-[#F4D06F]/15 flex items-center justify-center mb-1">
              <Star className="w-3.5 h-3.5 text-[#F4D06F]" />
            </div>
            <div className="text-[22px] font-black text-[#F4D06F]">5d</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">Streak</div>
          </motion.div>
        </div>

        {/* Energy Ring + Next Unlock row */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {/* Circular Energy Ring */}
          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="premium-glass-card p-4 flex flex-col items-center justify-center"
          >
            <div className="relative w-[72px] h-[72px]">
              <svg width="72" height="72" className="transform -rotate-90">
                <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="5" />
                <motion.circle
                  cx="36" cy="36" r="30"
                  fill="none"
                  stroke="#FF6848"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={188}
                  initial={{ strokeDashoffset: 188 }}
                  animate={{ strokeDashoffset: 188 - (energy / 100) * 188 }}
                  transition={{ duration: 1.5, delay: 0.3, type: "spring", stiffness: 60 }}
                  style={{ filter: "drop-shadow(0 0 6px rgba(255,104,72,0.5))" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[16px] font-black text-[#201B17]">{energy}%</span>
              </div>
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60 mt-2">Energy</div>
          </motion.div>

          {/* Next Unlock Card */}
          <motion.div
            custom={7}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -2 }}
            className="dark-hero-card p-4 flex flex-col items-center justify-center text-center"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#62C9A5] opacity-60 mb-2">Mở khóa tiếp</div>
            <div className="text-[26px] font-black text-[#F4D06F] mb-1">👑</div>
            <div className="text-[13px] font-bold text-white">Tiny Crown</div>
            <div className="text-[10px] text-[#62C9A5]/60 mt-1">Còn {memoriesUntilLevel} kỷ niệm</div>
            <div className="w-full h-1 bg-black/20 rounded-full mt-2 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#F4D06F] to-[#FF6848]" style={{ width: `${(2 - memoriesUntilLevel) / 2 * 100}%` }} />
            </div>
          </motion.div>
        </div>

        {/* === Rewards Grid === */}
        <motion.div
          custom={8}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div className="premium-glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">
                Phần thưởng
              </div>
              <div className="text-[11px] font-medium text-[#62C9A5] bg-[#62C9A5]/10 px-2.5 py-1 rounded-full">
                Level {level}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Heart className="w-4 h-4" />, label: "Nhãn dán", locked: false, unlockAt: 1, color: "#FF6848" },
                { icon: <Star className="w-4 h-4" />, label: "Mũ len", locked: false, unlockAt: 2, color: "#F4D06F" },
                { icon: <Trophy className="w-4 h-4" />, label: "Huy hiệu", locked: true, unlockAt: 5, color: "#78675B" },
                { icon: <Crown className="w-4 h-4" />, label: "Vương miện", locked: true, unlockAt: 8, color: "#78675B" },
                { icon: <Zap className="w-4 h-4" />, label: "Aura vàng", locked: true, unlockAt: 10, color: "#78675B" },
                { icon: <Sparkles className="w-4 h-4" />, label: "Star dust", locked: true, unlockAt: 12, color: "#78675B" },
              ].map((reward, i) => (
                <motion.div
                  key={reward.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                  whileHover={!reward.locked ? { scale: 1.08, y: -4, transition: { type: "spring", stiffness: 400, damping: 15 } } : {}}
                  whileTap={!reward.locked ? { scale: 0.95 } : {}}
                  className={`reward-charm ${reward.locked ? "locked" : "unlocked"}`}
                >
                  <motion.div
                    animate={!reward.locked ? { rotate: [0, 6, -6, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="mb-1"
                    style={{ color: reward.color }}
                  >
                    {reward.icon}
                  </motion.div>
                  <span className="text-[10px] font-semibold text-[#201B17] text-center leading-tight">{reward.label}</span>
                  {reward.locked && (
                    <>
                      <Lock className="absolute top-1.5 right-1.5 w-2.5 h-2.5 text-[#78675B]" />
                      <span className="text-[8px] text-[#78675B] mt-0.5">Lv {reward.unlockAt}</span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* === Achievements === */}
        <motion.div
          custom={9}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-5"
        >
          <div className="premium-glass-card p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60 mb-3">
              Thành tích gần đây
            </div>
            <div className="flex gap-2">
              {[
                { icon: Trophy, label: "First Gather", desc: "Tạo plan đầu", active: true },
                { icon: Heart, label: "Social Star", desc: "Vote 5 lần", active: true },
                { icon: Camera, label: "Photographer", desc: "12 ảnh", active: false },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`flex-1 flex flex-col items-center rounded-[14px] p-2.5 border ${
                    badge.active
                      ? "bg-gradient-to-br from-[#F4D06F]/15 to-[#FF6848]/10 border-[#F4D06F]/20"
                      : "bg-white/30 border-white/30 opacity-50"
                  }`}
                >
                  <badge.icon className={`w-4 h-4 mb-1 ${badge.active ? "text-[#F4D06F]" : "text-[#78675B]"}`} />
                  <span className="text-[10px] font-semibold text-[#201B17] text-center leading-tight">{badge.label}</span>
                  <span className="text-[8px] text-[#78675B]">{badge.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
