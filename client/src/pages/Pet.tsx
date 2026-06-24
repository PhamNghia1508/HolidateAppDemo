import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Heart, Zap, Star, Trophy, MapPin, Camera, Lock, Crown } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number }[]>([]);
  const [sparkId, setSparkId] = useState(0);
  const [earWiggle, setEarWiggle] = useState(false);
  const [gatherCount] = useState(12);
  const [photoCount] = useState(48);
  const [level] = useState(3);

  const feedPet = () => {
    const oldEnergy = energy;
    const newEnergy = Math.min(100, oldEnergy + 15);
    setEnergy(newEnergy);
    setIsHappy(true);
    const newSparks = Array.from({ length: 5 }, (_, i) => ({
      id: sparkId + i,
      x: oldEnergy + (newEnergy - oldEnergy) * (i / 5),
    }));
    setSparks((prev) => [...prev, ...newSparks]);
    setSparkId((prev) => prev + 5);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 },
    }),
  };

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,35,30,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.06) 0%, transparent 50%), radial-gradient(ellipse at 20% 60%, rgba(243,211,122,0.08) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between pt-5 mb-5"
        >
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
              GoPet Ecosystem
            </div>
            <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">Mimi</h1>
          </div>
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/40">
            <Zap className="w-4 h-4 text-[#F3D37A]" />
            <span className="text-[13px] font-bold text-[#231F1B]">Lv {level}</span>
          </div>
        </motion.div>

        {/* Hero Pet Card — 3D Stage */}
        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div
            className="premium-glass-card p-6 flex flex-col items-center relative"
            style={{
              boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 0 80px rgba(243,211,122,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            {/* 3D Stage */}
            <div className="relative mb-4">
              {/* Platform shadow */}
              <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-[120px] h-[16px] rounded-[50%] bg-black/10 blur-md" />
              
              {/* Glow ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(243,211,122,0.2) 0%, rgba(180,140,220,0.08) 50%, transparent 70%)",
                  filter: "blur(20px)",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating pet */}
              <motion.div
                animate={isHappy ? { y: [0, -25, -10, -20, 0], rotate: [0, -12, 12, -8, 0] } : { y: [0, -10, 0] }}
                transition={isHappy ? { duration: 0.7, ease: "easeOut" } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="w-32 h-32 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F3D37A]/20 via-[#B48CDC]/10 to-[#5FB3C0]/20 blur-xl" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-sm border border-white/70 shadow-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent" />
                    <div className="pet-breathe w-24 h-24">
                      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
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
                        <motion.g
                          animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }}
                          transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.8, 0.85, 1] }}
                        >
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
                  {isHappy && [...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                      style={{ background: ["#F3D37A", "#FF6B4A", "#B48CDC", "#4a7c59"][i % 4] }}
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
                </div>
              </motion.div>

              {/* Level badge */}
              <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-white/70 backdrop-blur-md px-2 py-1 rounded-full border border-white/50 shadow-sm">
                <Star className="w-3 h-3 text-[#F3D37A] fill-[#F3D37A]" />
                <span className="text-[11px] font-bold text-[#231F1B]">{level}</span>
              </div>
            </div>

            {/* Name & status */}
            <div className="text-center">
              <h2 className="text-[20px] font-black text-[#231F1B] tracking-tight">Mimi</h2>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-[13px] text-[#7B6658] mt-0.5"
              >
                {isHappy ? "😻 Yay! Cảm ơn bạn!" : "🐱 Đang vui • Muốn thêm kỷ niệm"}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[
            { label: "GATHER", value: gatherCount, icon: <MapPin className="w-4 h-4" />, color: "#4a7c59" },
            { label: "PHOTOS", value: photoCount, icon: <Camera className="w-4 h-4" />, color: "#FF6B4A" },
            { label: "STREAK", value: "5d", icon: <Star className="w-4 h-4" />, color: "#F3D37A" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={2 + i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -2, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              className="premium-glass-card p-3.5 flex flex-col items-center text-center"
              style={{ boxShadow: `0 4px 16px rgba(0,0,0,0.04), 0 0 30px ${stat.color}10` }}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1.5" style={{ background: `${stat.color}15` }}>
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
              <div className="text-[24px] font-black tracking-tight" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60 mt-0.5">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Energy + Progress Row */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {/* Energy Bar Card */}
          <motion.div
            custom={5}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div
              className="premium-glass-card p-4 h-full"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04), 0 0 40px rgba(255,107,74,0.08)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
                    Năng lượng
                  </div>
                  <div className="text-[14px] font-bold text-[#231F1B] mt-0.5">Đói bụng</div>
                </div>
                <div className="text-[18px] font-black text-[#FF6B4A]">{energy}%</div>
              </div>
              <div className="relative w-full h-2.5 bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #FF6B4A, #FF8A4C, #F3D37A)",
                    boxShadow: "0 0 10px rgba(255,107,74,0.4)",
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
              <p className="text-[11px] text-[#7B6658] mt-2">
                {energy < 100 ? "Cần thêm kỷ niệm để Mimi lớn" : "Mimi no nê rồi! 😻"}
              </p>
            </div>
          </motion.div>

          {/* Circular Progress */}
          <motion.div
            custom={6}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="premium-glass-card p-4 flex flex-col items-center justify-center"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}
          >
            <div className="relative w-[60px] h-[60px]">
              <svg width="60" height="60" className="transform -rotate-90">
                <circle cx="30" cy="30" r="26" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="4" />
                <motion.circle
                  cx="30" cy="30" r="26"
                  fill="none"
                  stroke="#FF6B4A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={163}
                  initial={{ strokeDashoffset: 163 }}
                  animate={{ strokeDashoffset: 163 - (energy / 100) * 163 }}
                  transition={{ duration: 1.5, delay: 0.3, type: "spring", stiffness: 60 }}
                  style={{ filter: "drop-shadow(0 0 4px rgba(255,107,74,0.4))" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[14px] font-black text-[#231F1B]">{energy}%</span>
              </div>
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60 mt-2">
              Energy
            </div>
          </motion.div>
        </div>

        {/* Rewards Grid */}
        <motion.div
          custom={7}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-4"
        >
          <div
            className="premium-glass-card p-4"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
                  Phần thưởng
                </div>
                <div className="text-[14px] font-bold text-[#231F1B] mt-0.5">Mở khóa tiếp theo</div>
              </div>
              <div className="text-[11px] font-medium text-[#4a7c59] bg-[#4a7c59]/10 px-2.5 py-1 rounded-full">
                Level {level}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Heart className="w-4 h-4" />, label: "Nhãn dán", locked: false, unlockAt: 1, color: "#FF6B4A", bg: "#FF6B4A15" },
                { icon: <Star className="w-4 h-4" />, label: "Mũ len", locked: false, unlockAt: 2, color: "#F3D37A", bg: "#F3D37A15" },
                { icon: <Trophy className="w-4 h-4" />, label: "Huy hiệu", locked: true, unlockAt: 5, color: "#7B6658", bg: "#7B665810" },
                { icon: <Crown className="w-4 h-4" />, label: "Vương miện", locked: true, unlockAt: 8, color: "#7B6658", bg: "#7B665810" },
                { icon: <Zap className="w-4 h-4" />, label: "Aura vàng", locked: true, unlockAt: 10, color: "#7B6658", bg: "#7B665810" },
              ].map((reward, i) => (
                <motion.div
                  key={reward.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                  whileHover={!reward.locked ? { scale: 1.08, y: -4, transition: { type: "spring", stiffness: 400, damping: 15 } } : {}}
                  whileTap={!reward.locked ? { scale: 0.95 } : {}}
                  className="flex flex-col items-center rounded-[14px] p-2.5 relative"
                  style={{
                    background: reward.locked ? "rgba(123,102,88,0.06)" : reward.bg,
                    opacity: reward.locked ? 0.5 : 1,
                  }}
                >
                  <motion.div
                    animate={!reward.locked ? { rotate: [0, 6, -6, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="mb-1"
                    style={{ color: reward.color }}
                  >
                    {reward.icon}
                  </motion.div>
                  <span className="text-[10px] font-semibold text-[#231F1B] text-center leading-tight">{reward.label}</span>
                  {reward.locked && (
                    <>
                      <Lock className="absolute top-1.5 right-1.5 w-2.5 h-2.5 text-[#7B6658]" />
                      <span className="text-[8px] text-[#7B6658] mt-0.5">Lv {reward.unlockAt}</span>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          custom={8}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mb-5"
        >
          <div
            className="premium-glass-card p-4"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 40px rgba(180,140,220,0.08), inset 0 1px 0 rgba(255,255,255,0.4)" }}
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60 mb-3">
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
                  className={`flex-1 flex flex-col items-center rounded-[12px] p-2.5 border ${
                    badge.active
                      ? "bg-gradient-to-br from-[#F3D37A]/15 to-[#FF6B4A]/10 border-[#F3D37A]/20"
                      : "bg-white/30 border-white/30 opacity-50"
                  }`}
                >
                  <badge.icon
                    className={`w-4 h-4 mb-1 ${badge.active ? "text-[#F3D37A]" : "text-[#7B6658]"}`}
                  />
                  <span className="text-[10px] font-semibold text-[#231F1B] text-center leading-tight">{badge.label}</span>
                  <span className="text-[8px] text-[#7B6658]">{badge.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={9}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={feedPet}
            className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A4C 50%, #F3D37A 100%)",
              boxShadow: "0 8px 32px rgba(255,107,74,0.35), 0 0 60px rgba(255,107,74,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <PawPrint className="w-5 h-5" />
            Cho Mimi ăn kỷ niệm
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
