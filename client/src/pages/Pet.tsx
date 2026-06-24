import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Heart, Zap, Star, Trophy, MapPin, Camera, Lock, Crown, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const SURF2 = "#F0F5FF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";
const DANGER = "#EF4444";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, type: "spring" as const, stiffness: 300, damping: 25 } }),
};

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);
  const [earWiggle, setEarWiggle] = useState(false);
  const [sparkId, setSparkId] = useState(0);
  const [gatherCount] = useState(12);
  const [photoCount] = useState(48);
  const [level] = useState(3);
  const [memoriesUntilLevel] = useState(2);

  const feedPet = () => {
    setEnergy(e => Math.min(100, e + 15));
    setIsHappy(true);
    setSparkId(id => id + 1);
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
    <div className="flex-1 overflow-y-auto pb-20 px-5" style={{ background: BG }}>
      {/* Header */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible"
        className="flex items-center justify-between pt-6 mb-4">
        <div>
          <div className="page-label mb-0.5">GoPet Ecosystem</div>
          <h1 className="text-[26px] font-black tracking-tight" style={{ color: T1 }}>Mimi</h1>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.20)`, boxShadow: SHADOW }}>
          <Zap className="w-3.5 h-3.5" style={{ color: BLUE }} />
          <span className="text-[12px] font-bold" style={{ color: T1 }}>Lv {level}</span>
        </div>
      </motion.div>

      {/* Pet Stage */}
      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="mb-4">
        <div className="rounded-3xl p-6 flex flex-col items-center relative overflow-hidden"
          style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          {/* Ambient light */}
          <div className="absolute top-0 left-0 right-0 h-40 rounded-t-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%)" }} />

          <div className="relative mb-5 w-full flex flex-col items-center">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(20px)" }} />

            {/* Cat */}
            <motion.div
              animate={isHappy ? { y: [0, -28, -12, -22, 0], rotate: [0, -8, 8, -5, 0] } : { y: [0, -10, 0] }}
              transition={isHappy ? { duration: 0.8 } : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10">
              <div className="w-40 h-40 relative">
                <div className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(145deg, #F0F5FF, #E8F0FE)", border: `1.5px solid rgba(59,130,246,0.18)`, boxShadow: "0 8px 32px rgba(59,130,246,0.12), inset 0 1px 2px rgba(255,255,255,0.80)" }} />
                <div className="absolute inset-3 rounded-full flex items-center justify-center">
                  <div className="w-28 h-28">
                    <svg viewBox="0 0 120 120" className="w-full h-full">
                      <ellipse cx="60" cy="80" rx="35" ry="28" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="2.5" />
                      <circle cx="60" cy="52" r="28" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="2.5" />
                      <path d="M38 30 L32 14 L48 26 Z" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="2.5" />
                      <path d="M82 30 L88 14 L72 26 Z" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="2.5" />
                      <path d="M40 28 L36 18 L46 26 Z" fill="#BFDBFE" />
                      <path d="M80 28 L84 18 L74 26 Z" fill="#BFDBFE" />
                      <motion.g animate={{ scaleY: [1, 0.1, 1, 1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.8, 0.85, 1] }}>
                        <circle cx="50" cy="48" r="5" fill={T1} />
                        <circle cx="70" cy="48" r="5" fill={T1} />
                      </motion.g>
                      <circle cx="52" cy="46" r="1.5" fill="white" />
                      <circle cx="72" cy="46" r="1.5" fill="white" />
                      <ellipse cx="60" cy="58" rx="3" ry="2" fill="#93C5FD" />
                      <path d="M56 62 Q60 66 64 62" stroke="#93C5FD" strokeWidth="2" fill="none" />
                      <line x1="35" y1="55" x2="20" y2="52" stroke="#BFDBFE" strokeWidth="1.5" />
                      <line x1="35" y1="60" x2="18" y2="60" stroke="#BFDBFE" strokeWidth="1.5" />
                      <line x1="85" y1="55" x2="100" y2="52" stroke="#BFDBFE" strokeWidth="1.5" />
                      <line x1="85" y1="60" x2="102" y2="60" stroke="#BFDBFE" strokeWidth="1.5" />
                      <ellipse cx="42" cy="95" rx="8" ry="6" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="2" />
                      <ellipse cx="78" cy="95" rx="8" ry="6" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="2" />
                      <path d="M92 75 Q105 65 102 50" stroke="#BFDBFE" strokeWidth="2.5" fill="none" />
                      <circle cx="40" cy="55" r="4" fill="#93C5FD" opacity="0.35" />
                      <circle cx="80" cy="55" r="4" fill="#93C5FD" opacity="0.35" />
                    </svg>
                  </div>
                </div>
                {/* Sparkles */}
                <AnimatePresence>
                  {isHappy && [...Array(10)].map((_, i) => (
                    <motion.div key={`spark-${sparkId}-${i}`} className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                      style={{ background: [BLUE, "#8B5CF6", "#F59E0B", BLUE][i % 4] }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{ x: Math.cos((i * Math.PI * 2) / 10) * 70, y: Math.sin((i * Math.PI * 2) / 10) * 70, scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
                      transition={{ duration: 0.75, ease: "easeOut" }} />
                  ))}
                </AnimatePresence>
                {/* Level badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: BORDER, boxShadow: SHADOW }}>
                  <Star className="w-3 h-3 fill-current" style={{ color: BLUE }} />
                  <span className="text-[11px] font-bold" style={{ color: T1 }}>{level}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <h2 className="text-[22px] font-black tracking-tight" style={{ color: T1 }}>Mimi</h2>
          <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}
            className="text-[13px] mt-0.5" style={{ color: T2 }}>
            {isHappy ? "Mimi no nê! Cảm ơn bạn!" : "Đang vui — muốn thêm kỷ niệm"}
          </motion.p>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={feedPet}
            className="mt-4 h-[40px] px-5 rounded-full font-semibold text-[14px] flex items-center gap-2 premium-cta-mint">
            <PawPrint className="w-4 h-4" /> Cho Mimi ăn kỷ niệm
          </motion.button>
        </div>
      </motion.div>

      {/* Energy bar */}
      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="mb-4">
        <div className="rounded-2xl p-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: DANGER }} />
              <span className="text-[13px] font-bold" style={{ color: DANGER }}>Đói bụng</span>
            </div>
            <span className="text-[18px] font-black" style={{ color: BLUE }}>{energy}%</span>
          </div>
          <div className="progress-track">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${BLUE_BRIGHT}, ${BLUE})` }}
              initial={{ width: "0%" }} animate={{ width: `${energy}%` }}
              transition={{ duration: 1.2, type: "spring", stiffness: 60 }} />
          </div>
          <p className="text-[12px] mt-2" style={{ color: T3 }}>
            Cần thêm <span style={{ color: BLUE, fontWeight: 700 }}>{memoriesUntilLevel} kỷ niệm</span> để Mimi lên Level {level + 1}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {[
          { icon: MapPin, value: gatherCount, label: "Gather" },
          { icon: Camera, value: photoCount, label: "Photos" },
          { icon: Star, value: "5d", label: "Streak" },
        ].map(({ icon: Icon, value, label }, i) => (
          <motion.div key={label} custom={3 + i} variants={cardVariants} initial="hidden" animate="visible"
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
            className="rounded-2xl p-3 flex flex-col items-center text-center"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1" style={{ background: "rgba(59,130,246,0.10)" }}>
              <Icon className="w-3.5 h-3.5" style={{ color: BLUE }} />
            </div>
            <div className="text-[22px] font-black" style={{ color: BLUE }}>{value}</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: T3 }}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Energy ring + Unlock */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible"
          className="rounded-2xl p-4 flex flex-col items-center justify-center"
          style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="relative w-[72px] h-[72px]">
            <svg width="72" height="72" className="transform -rotate-90">
              <circle cx="36" cy="36" r="30" fill="none" stroke="#E2E8F0" strokeWidth="5" />
              <motion.circle cx="36" cy="36" r="30" fill="none" stroke={BLUE} strokeWidth="5" strokeLinecap="round"
                strokeDasharray={188} initial={{ strokeDashoffset: 188 }}
                animate={{ strokeDashoffset: 188 - (energy / 100) * 188 }}
                transition={{ duration: 1.5, delay: 0.3, type: "spring", stiffness: 60 }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16px] font-black" style={{ color: T1 }}>{energy}%</span>
            </div>
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] mt-2" style={{ color: T3 }}>Energy</div>
        </motion.div>

        <motion.div custom={7} variants={cardVariants} initial="hidden" animate="visible"
          className="rounded-2xl p-4 flex flex-col items-center justify-center text-center"
          style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.15)` }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: T3 }}>Mở khóa tiếp</div>
          <div className="text-[26px] mb-1">👑</div>
          <div className="text-[13px] font-bold" style={{ color: T1 }}>Tiny Crown</div>
          <div className="text-[10px] mt-1" style={{ color: T3 }}>Còn {memoriesUntilLevel} kỷ niệm</div>
          <div className="w-full h-1 rounded-full mt-2 overflow-hidden" style={{ background: "#E2E8F0" }}>
            <div className="h-full rounded-full" style={{ width: `${(2 - memoriesUntilLevel) / 2 * 100}%`, background: BLUE }} />
          </div>
        </motion.div>
      </div>

      {/* Rewards */}
      <motion.div custom={8} variants={cardVariants} initial="hidden" animate="visible" className="mb-4">
        <div className="rounded-2xl p-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="flex items-center justify-between mb-3">
            <div className="page-label">Phần thưởng</div>
            <div className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: SURF2, color: BLUE, border: `1px solid rgba(59,130,246,0.20)` }}>Level {level}</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <Heart className="w-4 h-4" />, label: "Nhãn dán", locked: false },
              { icon: <Star className="w-4 h-4" />, label: "Mũ len", locked: false },
              { icon: <Trophy className="w-4 h-4" />, label: "Huy hiệu", locked: true, unlockAt: 5 },
              { icon: <Crown className="w-4 h-4" />, label: "Vương miện", locked: true, unlockAt: 8 },
              { icon: <Zap className="w-4 h-4" />, label: "Aura", locked: true, unlockAt: 10 },
              { icon: <Sparkles className="w-4 h-4" />, label: "Star dust", locked: true, unlockAt: 12 },
            ].map((r, i) => (
              <motion.div key={r.label}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
                whileHover={!r.locked ? { scale: 1.08, y: -4 } : {}}
                className="relative flex flex-col items-center rounded-2xl p-2.5 border"
                style={{
                  background: r.locked ? "#F8FAFC" : SURF2,
                  borderColor: r.locked ? BORDER : "rgba(59,130,246,0.20)",
                  opacity: r.locked ? 0.55 : 1,
                }}>
                <div className="mb-1" style={{ color: r.locked ? T3 : BLUE }}>{r.icon}</div>
                <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: T1 }}>{r.label}</span>
                {r.locked && <>
                  <Lock className="absolute top-1.5 right-1.5 w-2.5 h-2.5" style={{ color: T3 }} />
                  <span className="text-[8px] mt-0.5" style={{ color: T3 }}>Lv {r.unlockAt}</span>
                </>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div custom={9} variants={cardVariants} initial="hidden" animate="visible" className="mb-5">
        <div className="rounded-2xl p-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="page-label mb-3">Thành tích gần đây</div>
          <div className="flex gap-2">
            {[
              { icon: Trophy, label: "First Gather", desc: "Tạo plan đầu", active: true },
              { icon: Heart, label: "Social Star", desc: "Vote 5 lần", active: true },
              { icon: Camera, label: "Photographer", desc: "12 ảnh", active: false },
            ].map((b, i) => (
              <motion.div key={b.label}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex-1 flex flex-col items-center rounded-2xl p-2.5 border"
                style={{
                  background: b.active ? SURF2 : "#F8FAFC",
                  borderColor: b.active ? "rgba(59,130,246,0.20)" : BORDER,
                  opacity: b.active ? 1 : 0.5,
                }}>
                <b.icon className="w-4 h-4 mb-1" style={{ color: b.active ? BLUE : T3 }} />
                <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: T1 }}>{b.label}</span>
                <span className="text-[8px]" style={{ color: T3 }}>{b.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
