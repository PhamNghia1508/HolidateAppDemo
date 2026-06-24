import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Heart, Sparkles, ArrowRight, Bell } from "lucide-react";

const BG = "#F7F5F0";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)";

// Warm Mimi colors (matches Pet.tsx)
const MIMI_BODY = "#FFD4A8";
const MIMI_STROKE = "#FDBA74";
const MIMI_EYE = "#1A0800";
const MIMI_NOSE = "#FB923C";

// Tiny Mimi for hero corner — use div, never button inside button
function TinyMimi({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      onClick={e => { e.stopPropagation(); onClick(); }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      whileTap={{ scale: 0.88 }}
      className="absolute bottom-3 left-3 cursor-pointer"
      style={{ zIndex: 5 }}>
      <svg viewBox="0 0 44 44" width="40" height="40">
        <ellipse cx="22" cy="30" rx="13" ry="10" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="1.5" />
        <circle cx="22" cy="19" r="11" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="1.5" />
        <path d="M13 13 L10 5 L18 11 Z" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="1.5" />
        <path d="M31 13 L34 5 L26 11 Z" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="1.5" />
        <circle cx="18" cy="18" r="2.2" fill={MIMI_EYE} />
        <circle cx="26" cy="18" r="2.2" fill={MIMI_EYE} />
        <circle cx="18.8" cy="17.2" r="0.9" fill="white" />
        <circle cx="26.8" cy="17.2" r="0.9" fill="white" />
        <ellipse cx="22" cy="22" rx="1.5" ry="1" fill={MIMI_NOSE} />
        <path d="M20 24 Q22 26 24 24" stroke={MIMI_NOSE} strokeWidth="0.9" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="21" r="2.5" fill="#FCA5A5" opacity="0.45" />
        <circle cx="28" cy="21" r="2.5" fill="#FCA5A5" opacity="0.45" />
      </svg>
    </motion.div>
  );
}

const S = (i: number) => ({ delay: 0.05 + i * 0.05, type: "spring" as const, stiffness: 420, damping: 32 });

export default function Home() {
  const [, setLocation] = useLocation();
  const [showMimiTooltip, setShowMimiTooltip] = useState(false);
  const [tooltipKey, setTooltipKey] = useState(0);

  const handleMimiTap = () => {
    setTooltipKey(k => k + 1);
    setShowMimiTooltip(true);
    setTimeout(() => setShowMimiTooltip(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-5 relative" style={{ background: BG }}>

      {/* Header — word-by-word greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-3">
        <div className="page-label mb-1">GatherGo</div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-black tracking-tight" style={{ color: T1 }}>
              {["Chào", " Nghĩa", " 👋"].map((word, i) => (
                <motion.span key={word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.14, type: "spring", stiffness: 450, damping: 28 }}
                  style={{ display: "inline" }}>
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="text-[13px] mt-0.5 font-medium" style={{ color: T3 }}>Thứ Ba, 24 tháng 6</p>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            whileTap={{ scale: 0.90 }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative mt-1"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <Bell className="w-4 h-4" style={{ color: T2 }} />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#EF4444", border: "1.5px solid white" }} />
          </motion.button>
        </div>
      </motion.div>

      {/* Urgency banner */}
      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
        whileTap={{ scale: 0.98 }} onClick={() => setLocation("/vote")}
        className="w-full text-left urgency-banner p-3.5 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.15)" }}>
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className="text-[18px]">⚡</span>
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-white">Vote đang chờ bạn</p>
          <p className="text-[11px] text-white/60 mt-0.5">Linh và Minh đã đồng ý — còn bạn và An</p>
        </div>
        <ArrowRight className="w-4 h-4 text-white/60 flex-shrink-0" />
      </motion.button>

      {/* Hero card with tiny Mimi in corner */}
      <motion.div initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={S(2)}
        whileHover={{ scale: 1.01 }} className="mb-4">
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setLocation("/plan-detail")}
          className="w-full rounded-3xl overflow-hidden relative focus:outline-none"
          style={{ boxShadow: "0 6px 28px rgba(0,0,0,0.12)" }}>
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop bar" className="w-full h-[220px] object-cover" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.28) 50%, transparent 100%)" }} />

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit mb-2"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.20)" }}>
              <Sparkles className="w-3 h-3 text-white/80" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Gợi ý hợp mood</span>
            </div>
            <h2 className="text-[26px] font-black text-white tracking-tight leading-tight">Rooftop chill night</h2>
            <p className="text-[12px] mt-1 text-white/60">Thứ bảy, 18:30 · 3 điểm đến · 520k/người</p>
            <div className="flex gap-2 mt-2.5">
              {["Hợp mood nhất", "Ảnh đẹp"].map(t => (
                <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white"
                  style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.18)" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Live vote badge */}
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-3.5 right-3.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5"
            style={{ background: "rgba(255,255,255,0.95)", color: T1, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
            2 bạn đang vote
          </motion.div>

          {/* Tiny Mimi corner */}
          <div className="absolute bottom-0 left-0">
            <TinyMimi onClick={handleMimiTap} />
            <AnimatePresence>
              {showMimiTooltip && (
                <motion.div key={tooltipKey}
                  initial={{ opacity: 0, y: 4, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="absolute bottom-[52px] left-2 px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap"
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: T1,
                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                    backdropFilter: "blur(12px)",
                  }}>
                  🐾 Mình nhớ bạn!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(3)} className="mb-5">
        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/create-plan")}
          className="w-full h-[54px] premium-cta-mint flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" /> Tạo Gather mới
        </motion.button>
      </motion.div>

      {/* Bento grid */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(4)}>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: T3 }}>Khám phá</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { label: "Gợi ý gần tôi", sub: "12 quán hot hôm nay", icon: MapPin, path: "/suggested", color: "#3B82F6" },
            { label: "Plan của tôi", sub: "3 plan sẵn sàng", icon: Calendar, path: "/plan", color: "#8B5CF6" },
          ].map(({ label, sub, icon: Icon, path, color }, i) => (
            <motion.button key={path}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(5 + i)}
              whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.96 }}
              onClick={() => setLocation(path)}
              className="rounded-2xl text-left p-4 card" style={{ background: SURF }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${color}12` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <p className="text-[14px] font-bold leading-tight" style={{ color: T1 }}>{label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: T3 }}>{sub}</p>
            </motion.button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Kỷ niệm", sub: "12 chuyến đi cùng nhau", icon: Heart, path: "/memories", color: "#F97316" },
            { label: "GoPet", sub: "Mimi đang vui ✨", icon: "🐾", path: "/pet", isEmoji: true },
          ].map(({ label, sub, icon, path, color, isEmoji }: any, i) => (
            <motion.button key={path}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(7 + i)}
              whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.96 }}
              onClick={() => setLocation(path)}
              className="rounded-2xl text-left p-4 card" style={{ background: SURF }}>
              {isEmoji ? (
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-[22px]"
                  style={{ background: "rgba(59,130,246,0.08)" }}>
                  {icon}
                </motion.div>
              ) : (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${color}12` }}>
                  <Heart className="w-5 h-5" style={{ color }} />
                </div>
              )}
              <p className="text-[14px] font-bold leading-tight" style={{ color: T1 }}>{label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: T3 }}>{sub}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mimi ambient strip */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 mt-4"
        style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
        <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          className="text-[20px]">🐾</motion.span>
        <p className="text-[13px] font-medium" style={{ color: BLUE_BRIGHT }}>
          Mimi đang vui vì bạn vừa lưu kỷ niệm.
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
