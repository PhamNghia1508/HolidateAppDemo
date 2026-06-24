import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Share2, Check, ArrowLeft, ChevronRight } from "lucide-react";
import Confetti from "@/components/Confetti";

const BLUE = "#3B82F6";
const T1 = "#0F172A";

const groupMembers = [
  { initial: "N", name: "Nghĩa", color: "#3B82F6" },
  { initial: "L", name: "Linh", color: "#8B5CF6" },
  { initial: "M", name: "Minh", color: "#F59E0B" },
  { initial: "A", name: "An", color: "#22C55E" },
];

export default function Confirmed() {
  const [, setLocation] = useLocation();
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setConfettiTrigger(true), 400);
    const t2 = setTimeout(() => setPhase(1), 700);
    const t3 = setTimeout(() => setPhase(2), 1100);
    const t4 = setTimeout(() => setConfettiTrigger(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="flex-1 flex flex-col relative overflow-x-hidden"
      style={{ background: "linear-gradient(165deg, #0F172A 0%, #1E3A8A 55%, #0C1445 100%)", minHeight: "100vh" }}>
      <Confetti trigger={confettiTrigger} />

      {/* Back */}
      <div className="flex items-center gap-3 pt-8 px-5 mb-2 relative z-10">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLocation("/vote")}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}>
          <ArrowLeft className="w-4 h-4 text-white" />
        </motion.button>
        <div className="page-label" style={{ color: "rgba(255,255,255,0.45)" }}>Confirmed</div>
      </div>

      {/* Ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start px-5 pb-8 relative z-10">

        {/* Success orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
          className="relative flex items-center justify-center mt-6 mb-6"
        >
          {/* Multiple glow rings */}
          {[1, 0.6, 0.3].map((opacity, i) => (
            <motion.div key={i}
              animate={{ scale: [1, 1.4 + i * 0.2, 1], opacity: [opacity * 0.5, 0, opacity * 0.5] }}
              transition={{ duration: 2.5 + i * 0.5, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
              className="absolute rounded-full"
              style={{
                width: `${120 + i * 50}px`, height: `${120 + i * 50}px`,
                background: `radial-gradient(circle, rgba(59,130,246,${opacity * 0.4}) 0%, transparent 70%)`,
              }} />
          ))}
          {/* Main circle */}
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(139,92,246,0.25))", border: "2px solid rgba(255,255,255,0.20)", backdropFilter: "blur(20px)" }}>
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
              <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 24 }}
          className="text-center mb-6 w-full">
          <h1 className="text-[38px] font-black text-white leading-tight tracking-tight">Plan đã chốt!</h1>
          <p className="text-[15px] mt-2 font-medium" style={{ color: "rgba(255,255,255,0.60)" }}>Rooftop chill night · Thứ bảy, 18:30</p>

          {/* Countdown badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.8 }}
            transition={{ type: "spring", stiffness: 350, damping: 24 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mt-3"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <Calendar className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[13px] font-semibold text-white/80">Còn 2 ngày 14 giờ nữa</span>
          </motion.div>
        </motion.div>

        {/* Avatar stack — who's coming */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-full rounded-2xl p-4 mb-4"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.13)", backdropFilter: "blur(20px)" }}>
              <p className="page-label mb-3" style={{ color: "rgba(255,255,255,0.40)" }}>Cả nhóm đã ready 🎉</p>
              <div className="flex items-center justify-around">
                {groupMembers.map((m, i) => (
                  <motion.div key={m.name}
                    initial={{ opacity: 0, scale: 0.5, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.1, type: "spring", stiffness: 400, damping: 20 }}
                    className="flex flex-col items-center gap-1.5">
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-[16px]"
                      style={{ background: `${m.color}CC`, border: "2px solid rgba(255,255,255,0.30)", boxShadow: `0 4px 16px ${m.color}60` }}>
                      {m.initial}
                    </motion.div>
                    <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.60)" }}>{m.name}</span>
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}>
                      <span className="text-[12px]">✅</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 380, damping: 28 }}
          className="w-full rounded-2xl p-5 mb-4"
          style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.13)", backdropFilter: "blur(20px)" }}>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { value: "4", label: "người tham gia", emoji: "👥" },
              { value: "3", label: "điểm đến", emoji: "📍" },
              { value: "1h", label: "nhắc trước", emoji: "⏰" },
            ].map((s, i) => (
              <div key={i}>
                <span className="text-[20px]">{s.emoji}</span>
                <p className="text-[22px] font-black text-white mt-1">{s.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.40)" }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl p-2.5 text-center" style={{ background: "rgba(59,130,246,0.18)", border: "1px solid rgba(59,130,246,0.30)" }}>
            <p className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>GatherGo sẽ nhắc cả nhóm trước giờ đi.</p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="w-full space-y-3">
          <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
            onClick={() => setLocation("/plan-detail")}
            className="w-full h-[54px] rounded-[14px] font-bold text-[16px] flex items-center justify-center gap-2"
            style={{ background: "#FFFFFF", color: T1, boxShadow: "0 4px 20px rgba(0,0,0,0.20)" }}>
            Xem lịch trình
            <ChevronRight className="w-4 h-4" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
            className="w-full h-[50px] premium-cta-ghost flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Mời thêm bạn
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
