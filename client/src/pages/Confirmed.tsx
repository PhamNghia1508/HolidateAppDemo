import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Calendar, Heart, Share2, Check } from "lucide-react";
import Confetti from "@/components/Confetti";

export default function Confirmed() {
  const [, setLocation] = useLocation();
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiTrigger(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, rgba(74,124,89,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.06) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <Confetti trigger={confettiTrigger} />

      <div className="flex-1 overflow-y-auto pb-28 px-5 relative z-10">
        {/* Header */}
        <div className="pt-5 mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
            Confirmed
          </div>
        </div>

        {/* Success Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center mt-6 mb-8"
        >
          {/* Glowing success orb */}
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute inset-0 rounded-full bg-[#4a7c59]/20 blur-xl animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-[#65C6A2]/30 blur-lg" />
            <div className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4a7c59, #65C6A2)" }}
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>

          <Heart className="w-5 h-5 text-[#FF6B4A] mb-2" />
          <h1 className="text-[26px] font-black text-[#231F1B] tracking-tight mb-2">Plan đã chốt!</h1>
          <p className="text-[14px] text-[#7B6658]">Rooftop chill night • Thứ bảy, 18:30</p>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
          className="premium-glass-card p-5 mb-5"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 40px rgba(74,124,89,0.1), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <Calendar className="w-5 h-5 text-[#4a7c59] mx-auto mb-1" />
              <p className="text-[18px] font-black text-[#231F1B]">3</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7B6658] opacity-60">người</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[18px] font-black text-[#231F1B]">3</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7B6658] opacity-60">điểm đến</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[18px] font-black text-[#231F1B]">1h</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7B6658] opacity-60">nhắc trước</p>
            </div>
          </div>
          <div className="rounded-[12px] p-3 text-center backdrop-blur-sm bg-[#4a7c59]/10 border border-[#4a7c59]/15">
            <p className="text-[13px] text-[#4a7c59] font-medium">GatherGo sẽ nhắc nhóm trước giờ đi.</p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 relative overflow-hidden mb-3"
          style={{
            background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A4C 50%, #F3D37A 100%)",
            boxShadow: "0 8px 32px rgba(255,107,74,0.35), 0 0 60px rgba(255,107,74,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          Xem lịch trình
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="w-full h-[48px] rounded-[16px] font-semibold text-[16px] text-[#FF6B4A] flex items-center justify-center gap-2 border border-[#FF6B4A]/30 bg-white/50 backdrop-blur-md"
        >
          <Share2 className="w-4 h-4" />
          Mời thêm bạn
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
