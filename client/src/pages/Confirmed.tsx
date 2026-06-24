import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Calendar, Heart, Share2, Check, Clock, MapPin, Users } from "lucide-react";
import Confetti from "@/components/Confetti";

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

export default function Confirmed() {
  const [, setLocation] = useLocation();
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setConfettiTrigger(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <Confetti trigger={confettiTrigger} />

      <div className="pt-6 mb-4">
        <div className="page-label mb-1">Confirmed</div>
      </div>

      {/* Success badge */}
      <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center mt-4 mb-8">
        <div className="relative w-28 h-28 mb-5">
          <motion.div className="absolute inset-0 rounded-full blur-xl"
            style={{ background: "rgba(59,130,246,0.18)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
          <div className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", border: `2px solid rgba(59,130,246,0.25)`, boxShadow: "0 8px 32px rgba(59,130,246,0.18)" }}>
            <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Check className="w-14 h-14" style={{ color: BLUE }} strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>
        <Heart className="w-5 h-5 mb-2" style={{ color: "#F87171" }} />
        <h1 className="text-[30px] font-black mb-2" style={{ color: T1 }}>Plan đã chốt!</h1>
        <p className="text-[13px]" style={{ color: T2 }}>Rooftop chill night • Thứ bảy, 18:30</p>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
        className="rounded-2xl p-5 mb-5"
        style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" style={{ color: BLUE }} />
          <span className="text-[14px] font-semibold" style={{ color: BLUE_BRIGHT }}>Thứ bảy, 18:30</span>
          <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: Users, value: "3", label: "người" },
            { icon: MapPin, value: "3", label: "điểm đến" },
            { icon: Clock, value: "1h", label: "nhắc trước" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className="w-4 h-4 mx-auto mb-1" style={{ color: BLUE }} />
              <p className="text-[20px] font-black" style={{ color: T1 }}>{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: T3 }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3 text-center" style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.15)` }}>
          <p className="text-[13px] font-medium" style={{ color: BLUE_BRIGHT }}>GatherGo sẽ nhắc nhóm trước giờ đi.</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-3">
        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/plan-detail")} className="w-full h-[52px] premium-cta">
          Xem lịch trình
        </motion.button>
      </motion.div>
      <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
        className="w-full h-[48px] rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2"
        style={{ background: SURF, border: `1px solid ${BORDER}`, color: T2, boxShadow: SHADOW }}>
        <Share2 className="w-4 h-4" /> Mời thêm bạn
      </motion.button>

      <BottomNav />
    </div>
  );
}
