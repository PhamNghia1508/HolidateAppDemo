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
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden bg-[#09090B]">
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between pt-6 mb-4"
        >
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60">
              GoPet Ecosystem
            </div>
            <h1 className="text-[26px] font-black text-[#FAFAFA] tracking-tight mt-0.5">Mimi</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#00E5A8]/10 px-3 py-1.5 rounded-full border border-[#00E5A8]/20">
              <Zap className="w-3.5 h-3.5 text-[#00E5A8]" />
              <span className="text-[12px] font-bold text-[#FAFAFA]">Lv {level}</span>
            </div>
          </div>
        </motion.div>

        {/* Pet Room — Dark Stage */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div className="obsidian-card-elevated p-6 flex flex-col items-center relative overflow-hidden">
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: ["#00E5A8", "#FAFAFA", "#71717A", "#00E5A8", "#FAFAFA", "#71717A"][i],
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
                  background: "radial-gradient(circle, rgba(0,229,168,0.08) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Platform shadow */}
              <div className="absolute bottom-0 w-32 h-3 rounded-full bg-black/40 blur-md" />

              {/* Glass Orb */}
              <motion.div
                animate={isHappy ? { y: [0, -30, -12, -25, 0], rotate: [0, -8, 8, -5, 0] } : { y: [0, -12, 0] }}
                transition={isHappy ? { duration: 0.8, ease: "easeOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-40 h-40 relative">
                  <div className="absolute inset-0 rounded-full bg-[#18181B]/80 border border-white/10" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)" }} />
                  <div className="absolute inset-3 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                    <div className="w-28 h-28">
                      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
                        <ellipse cx="60" cy="80" rx="35" ry="28" fill="#27272A" stroke="#52525B" strokeWidth="2.5" />
                        <circle cx="60" cy="52" r="28" fill="#27272A" stroke="#52525B" strokeWidth="2.5" />
                        <g className={earWiggle ? "ear-left" : ""} style={{ transformOrigin: "32px 14px" }}>
                          <path d="M38 30 L32 14 L48 26 Z" fill="#27272A" stroke="#52525B" strokeWidth="2.5" />
                        </g>
                        <g className={earWiggle ? "ear-right" : ""} style={{ transformOrigin: "88px 14px" }}>
                          <path d="M82 30 L88 14 L72 26 Z" fill="#27272A" stroke="#52525B" strokeWidth="2.5" />
                        </g>
                        <path d="M40 28 L36 18 L46 26 Z" fill="#3F3F46" />
                        <path d="M80 28 L84 18 L74 26 Z" fill="#3F3F46" />
                        <motion.g animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.8, 0.85, 1] }}>
                          <circle cx="50" cy="48" r="5" fill="#FAFAFA" />
                          <circle cx="70" cy="48" r="5" fill="#FAFAFA" />
                        </motion.g>
                        <circle cx="52" cy="46" r="1.5" fill="#09090B" />
                        <circle cx="72" cy="46" r="1.5" fill="#09090B" />
                        <ellipse cx="60" cy="58" rx="3" ry="2" fill="#3F3F46" />
                        <path d="M56 62 Q60 66 64 62" stroke="#52525B" strokeWidth="2" fill="none" />
                        <line x1="35" y1="55" x2="20" y2="52" stroke="#52525B" strokeWidth="1.5" />
                        <line x1="35" y1="60" x2="18" y2="60" stroke="#52525B" strokeWidth="1.5" />
                        <line x1="85" y1="55" x2="100" y2="52" stroke="#52525B" strokeWidth="1.5" />
                        <line x1="85" y1="60" x2="102" y2="60" stroke="#52525B" strokeWidth="1.5" />
                        <ellipse cx="42" cy="95" rx="8" ry="6" fill="#27272A" stroke="#52525B" strokeWidth="2" />
                        <ellipse cx="78" cy="95" rx="8" ry="6" fill="#27272A" stroke="#52525B" strokeWidth="2" />
                        <path d="M92 75 Q105 65 102 50" stroke="#52525B" strokeWidth="2.5" fill="none" className="pet-tail" />
                        <circle cx="40" cy="55" r="4" fill="#3F3F46" opacity="0.5" />
                        <circle cx="80" cy="55" r="4" fill="#3F3F46" opacity="0.5" />
                      </svg>
                    </div>
                  </div>
                  {/* Sparkles on happy */}
                  <AnimatePresence>
                    {isHappy && [...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full"
                        style={{ background: ["#00E5A8", "#FAFAFA", "#A1A1AA", "#00E5A8"][i % 4] }}
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
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#09090B]/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                <Star className="w-3 h-3 text-[#00E5A8] fill-[#00E5A8]" />
                <span className="text-[11px] font-bold text-[#FAFAFA]">{level}</span>
              </div>
            </div>

            {/* Name & status */}
            <div className="text-center relative z-10">
              <h2 className="text-[22px] font-black text-[#FAFAFA] tracking-tight">Mimi</h2>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[13px] text-[#00E5A8] mt-0.5"
              >
                {isHappy ? "Mimi no nê! Cảm ơn bạn!" : "Đang vui — muốn thêm kỷ niệm"}
              </motion.p>
            </div>

            {/* Feed CTA inside stage */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={feedPet}
              className="mt-4 h-[40px] px-5 rounded-full font-semibold text-[14px] text-[#09090B] flex items-center gap-2 premium-cta-mint"
            >
              <PawPrint className="w-4 h-4" />
              Cho Mimi ăn kỷ niệm
            </motion.button>
          </div>
        </motion.div>

        {/* Emotion Progression */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div className="obsidian-card-elevated p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
                <span className="text-[13px] font-bold text-[#FF4D6D]">Đói bụng</span>
              </div>
              <span className="text-[18px] font-black text-[#00E5A8]">{energy}%</span>
            </div>
            <div className="progress-track">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #FF4D6D, #00E5A8)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${energy}%` }}
                transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
              />
            </div>
            <p className="text-[12px] text-[#71717A] mt-2">
              Cần thêm <span className="text-[#00E5A8] font-bold">{memoriesUntilLevel} kỷ niệm</span> để Mimi lên Level {level + 1}
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Bento Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="obsidian-card p-3 flex flex-col items-center text-center"
          >
            <div className="w-7 h-7 rounded-full bg-[#00E5A8]/10 flex items-center justify-center mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#00E5A8]" />
            </div>
            <div className="text-[22px] font-black text-[#00E5A8]">{gatherCount}</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60">Gather</div>
          </motion.div>

          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="obsidian-card p-3 flex flex-col items-center text-center"
          >
            <div className="w-7 h-7 rounded-full bg-[#00E5A8]/10 flex items-center justify-center mb-1">
              <Camera className="w-3.5 h-3.5 text-[#00E5A8]" />
            </div>
            <div className="text-[22px] font-black text-[#00E5A8]">{photoCount}</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60">Photos</div>
          </motion.div>

          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="obsidian-card p-3 flex flex-col items-center text-center"
          >
            <div className="w-7 h-7 rounded-full bg-[#00E5A8]/10 flex items-center justify-center mb-1">
              <Star className="w-3.5 h-3.5 text-[#00E5A8]" />
            </div>
            <div className="text-[22px] font-black text-[#00E5A8]">5d</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60">Streak</div>
          </motion.div>
        </div>

        {/* Energy Ring + Next Unlock row */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="obsidian-card p-4 flex flex-col items-center justify-center"
          >
            <div className="relative w-[72px] h-[72px]">
              <svg width="72" height="72" className="transform -rotate-90">
                <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                <motion.circle
                  cx="36" cy="36" r="30"
                  fill="none"
                  stroke="#00E5A8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={188}
                  initial={{ strokeDashoffset: 188 }}
                  animate={{ strokeDashoffset: 188 - (energy / 100) * 188 }}
                  transition={{ duration: 1.5, delay: 0.3, type: "spring", stiffness: 60 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[16px] font-black text-[#FAFAFA]">{energy}%</span>
              </div>
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60 mt-2">Energy</div>
          </motion.div>

          <motion.div
            custom={7}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03, y: -2 }}
            className="obsidian-card-elevated p-4 flex flex-col items-center justify-center text-center"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60 mb-2">Mở khóa tiếp</div>
            <div className="text-[26px] font-black text-[#00E5A8] mb-1">👑</div>
            <div className="text-[13px] font-bold text-[#FAFAFA]">Tiny Crown</div>
            <div className="text-[10px] text-[#71717A] mt-1">Còn {memoriesUntilLevel} kỷ niệm</div>
            <div className="w-full h-1 bg-[#18181B] rounded-full mt-2 overflow-hidden">
              <div className="h-full rounded-full bg-[#00E5A8]" style={{ width: `${(2 - memoriesUntilLevel) / 2 * 100}%` }} />
            </div>
          </motion.div>
        </div>

        {/* Rewards Grid */}
        <motion.div
          custom={8}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div className="obsidian-card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60">
                Phần thưởng
              </div>
              <div className="text-[11px] font-medium text-[#00E5A8] bg-[#00E5A8]/10 px-2.5 py-1 rounded-full border border-[#00E5A8]/20">
                Level {level}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Heart className="w-4 h-4" />, label: "Nhãn dán", locked: false, unlockAt: 1 },
                { icon: <Star className="w-4 h-4" />, label: "Mũ len", locked: false, unlockAt: 2 },
                { icon: <Trophy className="w-4 h-4" />, label: "Huy hiệu", locked: true, unlockAt: 5 },
                { icon: <Crown className="w-4 h-4" />, label: "Vương miện", locked: true, unlockAt: 8 },
                { icon: <Zap className="w-4 h-4" />, label: "Aura vàng", locked: true, unlockAt: 10 },
                { icon: <Sparkles className="w-4 h-4" />, label: "Star dust", locked: true, unlockAt: 12 },
              ].map((reward, i) => (
                <motion.div
                  key={reward.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                  whileHover={!reward.locked ? { scale: 1.08, y: -4 } : {}}
                  whileTap={!reward.locked ? { scale: 0.95 } : {}}
                  className={`relative flex flex-col items-center rounded-2xl p-2.5 border ${
                    reward.locked
                      ? "bg-[#18181B] border-white/10 opacity-50"
                      : "bg-[#00E5A8]/10 border-[#00E5A8]/20"
                  }`}
                >
                  <motion.div
                    animate={!reward.locked ? { rotate: [0, 6, -6, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="mb-1"
                    style={{ color: reward.locked ? "#52525B" : "#00E5A8" }}
                  >
                    {reward.icon}
                  </motion.div>
                  <span className="text-[10px] font-semibold text-[#FAFAFA] text-center leading-tight">{reward.label}</span>
                  {reward.locked && (
                    <>
                      <Lock className="absolute top-1.5 right-1.5 w-2.5 h-2.5 text-[#52525B]" />
                      <span className="text-[8px] text-[#52525B] mt-0.5">Lv {reward.unlockAt}</span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          custom={9}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-5"
        >
          <div className="obsidian-card p-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#71717A] opacity-60 mb-3">
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
                      ? "bg-[#00E5A8]/10 border-[#00E5A8]/20"
                      : "bg-[#18181B] border-white/10 opacity-50"
                  }`}
                >
                  <badge.icon className={`w-4 h-4 mb-1 ${badge.active ? "text-[#00E5A8]" : "text-[#52525B]"}`} />
                  <span className="text-[10px] font-semibold text-[#FAFAFA] text-center leading-tight">{badge.label}</span>
                  <span className="text-[8px] text-[#71717A]">{badge.desc}</span>
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
