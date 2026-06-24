import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Calendar, Heart, Share2, Check, Clock, MapPin, Users } from "lucide-react";
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
        background: "radial-gradient(ellipse at 50% 30%, rgba(98,201,165,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,104,72,0.05) 0%, transparent 50%), linear-gradient(180deg, #FFF7EA 0%, #F6EDE1 100%)",
      }}
    >
      <Confetti trigger={confettiTrigger} />

      <div className="flex-1 overflow-y-auto pb-28 px-5 relative z-10">
        {/* Header */}
        <div className="pt-5 mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">
            Confirmed
          </div>
        </div>

        {/* Success Section — Cinematic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="flex flex-col items-center mt-4 mb-8"
        >
          {/* Glowing success orb */}
          <div className="relative w-28 h-28 mb-5">
            <motion.div
              className="absolute inset-0 rounded-full bg-[#62C9A5]/25 blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-2 rounded-full bg-[#62C9A5]/20 blur-lg" />
            <div className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0F2D25, #62C9A5)" }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Check className="w-14 h-14 text-white" strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>

          <Heart className="w-5 h-5 text-[#FF6848] mb-2" />
          <h1 className="text-[28px] font-black text-[#201B17] tracking-tight mb-2">Plan đã chốt!</h1>
          <p className="text-[14px] text-[#78675B]">Rooftop chill night • Thứ bảy, 18:30</p>
        </motion.div>

        {/* Premium Event Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
          className="dark-hero-card p-5 mb-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#F4D06F]" />
            <span className="text-[13px] font-semibold text-[#F4D06F]">Thứ bảy, 18:30</span>
            <div className="ml-auto w-2 h-2 rounded-full bg-[#62C9A5] animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <Users className="w-4 h-4 text-[#62C9A5] mx-auto mb-1" />
              <p className="text-[18px] font-black text-white">3</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#62C9A5]/60">người</p>
            </div>
            <div className="text-center">
              <MapPin className="w-4 h-4 text-[#62C9A5] mx-auto mb-1" />
              <p className="text-[18px] font-black text-white">3</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#62C9A5]/60">điểm đến</p>
            </div>
            <div className="text-center">
              <Clock className="w-4 h-4 text-[#62C9A5] mx-auto mb-1" />
              <p className="text-[18px] font-black text-white">1h</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#62C9A5]/60">nhắc trước</p>
            </div>
          </div>
          <div className="rounded-[12px] p-3 text-center bg-[#62C9A5]/15 border border-[#62C9A5]/20">
            <p className="text-[13px] text-[#62C9A5] font-medium">GatherGo sẽ nhắc nhóm trước giờ đi.</p>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 mb-3 gradient-cta"
        >
          Xem lịch trình
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="w-full h-[48px] rounded-[16px] font-semibold text-[16px] text-[#FF6848] flex items-center justify-center gap-2 border border-[#FF6848]/30 bg-white/50 backdrop-blur-md"
        >
          <Share2 className="w-4 h-4" />
          Mời thêm bạn
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
