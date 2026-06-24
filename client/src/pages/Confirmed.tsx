import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Share2, Check, ArrowLeft, ChevronRight, X } from "lucide-react";
import Confetti from "@/components/Confetti";

const BLUE = "#3B82F6";
const T1 = "#0F172A";

const groupMembers = [
  { initial: "N", name: "Nghĩa", color: "#3B82F6" },
  { initial: "L", name: "Linh", color: "#8B5CF6" },
  { initial: "M", name: "Minh", color: "#F59E0B" },
  { initial: "A", name: "An", color: "#22C55E" },
];

// Share card modal
function ShareCard({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-end justify-center z-[9999] px-4 pb-6"
      style={{ background: "rgba(0,0,0,0.60)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.50)" }}
      >
        {/* The shareable card preview */}
        <div className="relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #0B0F1E 0%, #1E3A8A 50%, #0B1830 100%)",
            padding: "32px 24px 28px",
          }}>
          {/* Stars */}
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 1.5 + Math.random(),
              height: 1.5 + Math.random(),
              borderRadius: "50%", background: "white",
              animation: `star-twinkle ${2 + Math.random() * 3}s ${Math.random() * 3}s ease-in-out infinite`,
              opacity: 0.3 + Math.random() * 0.5,
            }} />
          ))}

          {/* Brand */}
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <span className="text-[12px]">🐾</span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.45)" }}>GatherGo</span>
          </div>

          {/* Big plan name */}
          <div className="relative z-10 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.40)" }}>Đã chốt plan</p>
            <h2 className="text-[32px] font-black text-white leading-tight tracking-tight">Rooftop chill night</h2>
            <p className="text-[14px] mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>Thứ bảy, 18:30 · 3 điểm đến · 520k/người</p>
          </div>

          {/* Avatar strip */}
          <div className="flex items-center gap-2 relative z-10 mb-5">
            {groupMembers.map((m, i) => (
              <div key={i} className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-[13px]"
                style={{ background: `${m.color}CC`, border: "2px solid rgba(255,255,255,0.25)", marginLeft: i > 0 ? -8 : 0 }}>
                {m.initial}
              </div>
            ))}
            <span className="text-[12px] font-semibold ml-2" style={{ color: "rgba(255,255,255,0.60)" }}>4 người tham gia</span>
          </div>

          {/* Tagline */}
          <div className="relative z-10 border-t border-white/10 pt-4">
            <p className="text-[13px] font-medium italic" style={{ color: "rgba(255,255,255,0.45)" }}>
              "Kỷ niệm đẹp nhất là những khoảnh khắc bên nhau 🌙"
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 p-4" style={{ background: "#FFFFFF" }}>
          <button className="flex-1 h-12 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 premium-cta-mint">
            <Share2 className="w-4 h-4" /> Chia sẻ
          </button>
          <button onClick={onClose}
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "#F1F5F9" }}>
            <X className="w-4 h-4" style={{ color: "#475569" }} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Starfield
function Starfield() {
  const stars = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 0.8 + Math.random() * 2,
    duration: 2 + Math.random() * 5,
    delay: Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.65,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size,
          borderRadius: "50%", background: "white",
          animation: `star-twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          opacity: s.opacity,
        }} />
      ))}
    </div>
  );
}

export default function Confirmed() {
  const [, setLocation] = useLocation();
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [phase, setPhase] = useState(0);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setConfettiTrigger(true), 400);
    const t2 = setTimeout(() => setPhase(1), 700);
    const t3 = setTimeout(() => setPhase(2), 1100);
    const t4 = setTimeout(() => setConfettiTrigger(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="flex-1 flex flex-col relative overflow-x-hidden"
      style={{ background: "linear-gradient(165deg, #090E1C 0%, #1A3A7E 50%, #090E1C 100%)", minHeight: "100vh" }}>
      <Confetti trigger={confettiTrigger} />
      <Starfield />

      <AnimatePresence>
        {showShareCard && <ShareCard onClose={() => setShowShareCard(false)} />}
      </AnimatePresence>

      {/* Back */}
      <div className="flex items-center gap-3 pt-8 px-5 mb-2 relative z-10">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLocation("/vote")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.16)" }}>
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>
        <div className="page-label" style={{ color: "rgba(255,255,255,0.35)" }}>Confirmed</div>
      </div>

      {/* Ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.28, 0.50, 0.28] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[14%] left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.40) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-5 pb-8 relative z-10">

        {/* Success orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
          className="relative flex items-center justify-center mt-6 mb-5">
          {[1, 0.55, 0.28].map((opacity, i) => (
            <motion.div key={i}
              animate={{ scale: [1, 1.45 + i * 0.22, 1], opacity: [opacity * 0.45, 0, opacity * 0.45] }}
              transition={{ duration: 2.8 + i * 0.5, repeat: Infinity, ease: "easeOut", delay: i * 0.45 }}
              className="absolute rounded-full"
              style={{
                width: 120 + i * 55, height: 120 + i * 55,
                background: `radial-gradient(circle, rgba(59,130,246,${opacity * 0.45}) 0%, transparent 70%)`,
              }} />
          ))}
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.28), rgba(139,92,246,0.28))",
              border: "2px solid rgba(255,255,255,0.22)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(59,130,246,0.35)",
            }}>
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
              <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        {/* Headline — BIG */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }}
          className="text-center mb-5 w-full">
          <h1 className="font-black text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(42px, 13vw, 56px)" }}>
            Plan đã chốt!
          </h1>
          <p className="text-[15px] mt-2 font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
            Rooftop chill night · Thứ bảy, 18:30
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-3"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <Calendar className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[13px] font-semibold text-white/80">Còn 2 ngày 14 giờ nữa</span>
          </motion.div>
        </motion.div>

        {/* Avatar stack — bounce in one by one */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-full rounded-2xl p-4 mb-4"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)" }}>
              <p className="page-label mb-3.5" style={{ color: "rgba(255,255,255,0.35)" }}>Cả nhóm đã ready 🎉</p>
              <div className="flex items-center justify-around">
                {groupMembers.map((m, i) => (
                  <motion.div key={m.name}
                    initial={{ opacity: 0, scale: 0.4, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.12, type: "spring", stiffness: 380, damping: 18 }}
                    className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                      className="w-13 h-13 rounded-full flex items-center justify-center font-bold text-white text-[17px]"
                      style={{
                        width: 52, height: 52,
                        background: `${m.color}CC`,
                        border: "2.5px solid rgba(255,255,255,0.30)",
                        boxShadow: `0 6px 20px ${m.color}60`,
                      }}>
                      {m.initial}
                    </motion.div>
                    <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>{m.name}</span>
                    <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.22 }}>
                      <span className="text-[13px]">✅</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary card */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 380, damping: 28 }}
          className="w-full rounded-2xl p-5 mb-5"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)" }}>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { value: "4", label: "người tham gia", emoji: "👥" },
              { value: "3", label: "điểm đến", emoji: "📍" },
              { value: "1h", label: "nhắc trước", emoji: "⏰" },
            ].map((s, i) => (
              <div key={i}>
                <span className="text-[22px]">{s.emoji}</span>
                <p className="text-[24px] font-black text-white mt-1">{s.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.38)" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl p-2.5 text-center"
            style={{ background: "rgba(59,130,246,0.18)", border: "1px solid rgba(59,130,246,0.30)" }}>
            <p className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.72)" }}>
              GatherGo sẽ nhắc cả nhóm trước giờ đi.
            </p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }} className="w-full space-y-3">
          <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.97 }}
            onClick={() => setLocation("/plan-detail")}
            className="w-full h-[54px] rounded-[14px] font-bold text-[16px] flex items-center justify-center gap-2"
            style={{ background: "#FFFFFF", color: T1, boxShadow: "0 4px 24px rgba(0,0,0,0.22)" }}>
            Xem lịch trình <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Share moment button */}
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowShareCard(true)}
            className="w-full h-[50px] premium-cta-ghost flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Chia sẻ khoảnh khắc này
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
