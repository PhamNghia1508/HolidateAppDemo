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
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      <Confetti trigger={confettiTrigger} />

      <div className="ambient-mint-blur top-32 left-1/2 -translate-x-1/2" />

      {/* Header */}
      <div className="pt-6 mb-4">
        <div className="page-label mb-1">Confirmed</div>
      </div>

      {/* Success Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center mt-4 mb-8"
      >
        {/* Success orb */}
        <div className="relative w-28 h-28 mb-5">
          <motion.div
            className="absolute inset-0 rounded-full bg-[#00E5A8]/15 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-2 rounded-full bg-[#00E5A8]/10 blur-lg" />
          <div
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #121214, #00E5A8)" }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Check className="w-14 h-14 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>

        <Heart className="w-5 h-5 text-[#FF4D6D] mb-2" />
        <h1 className="text-hero text-[#FAFAFA] mb-2">Plan đã chốt!</h1>
        <p className="text-body text-[#A1A1AA]">Rooftop chill night • Thứ bảy, 18:30</p>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 30 }}
        className="obsidian-card-elevated p-5 mb-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-[#00E5A8]" />
          <span className="text-body text-[#00E5A8] font-semibold">Thứ bảy, 18:30</span>
          <div className="ml-auto w-2 h-2 rounded-full bg-[#00E5A8] animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: Users, value: "3", label: "người" },
            { icon: MapPin, value: "3", label: "điểm đến" },
            { icon: Clock, value: "1h", label: "nhắc trước" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className="w-4 h-4 text-[#00E5A8] mx-auto mb-1" />
              <p className="text-[18px] font-black text-[#FAFAFA]">{s.value}</p>
              <p className="text-micro text-[#71717A]">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3 text-center bg-[#00E5A8]/10 border border-[#00E5A8]/20">
          <p className="text-body text-[#00E5A8] font-medium">GatherGo sẽ nhắc nhóm trước giờ đi.</p>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-3"
      >
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full h-[52px] premium-cta"
        >
          Xem lịch trình
        </motion.button>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="w-full h-[48px] rounded-2xl font-semibold text-[16px] text-[#A1A1AA] flex items-center justify-center gap-2 border border-white/10 bg-[#121214]"
      >
        <Share2 className="w-4 h-4" />
        Mời thêm bạn
      </motion.button>

      <BottomNav />
    </div>
  );
}
