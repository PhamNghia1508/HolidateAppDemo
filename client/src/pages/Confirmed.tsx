import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import PageHeader from "@/components/PageHeader";
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
    <div className="flex-1 overflow-y-auto pb-32 px-5">
      <Confetti trigger={confettiTrigger} />

      <PageHeader label="Confirmed" title="" delay={0} />

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
            className="absolute inset-0 rounded-full bg-mint/25 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-2 rounded-full bg-mint/20 blur-lg" />
          <div className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(var(--emerald)), hsl(var(--mint)))" }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Check className="w-14 h-14 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>
        </div>

        <Heart className="w-5 h-5 text-coral mb-2" />
        <h1 className="text-hero text-ink mb-2">Plan đã chốt!</h1>
        <p className="text-body text-clay">Rooftop chill night • Thứ bảy, 18:30</p>
      </motion.div>

      {/* Premium Event Summary Card */}
      <GlassCard dark delay={0.2} className="p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-champagne" />
          <span className="text-body text-champagne font-semibold">Thứ bảy, 18:30</span>
          <div className="ml-auto w-2 h-2 rounded-full bg-mint animate-pulse" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: Users, value: "3", label: "người" },
            { icon: MapPin, value: "3", label: "điểm đến" },
            { icon: Clock, value: "1h", label: "nhắc trước" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className="w-4 h-4 text-mint mx-auto mb-1" />
              <p className="text-[18px] font-black text-white">{s.value}</p>
              <p className="text-micro text-mint/60">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3 text-center bg-mint/15 border border-mint/20">
          <p className="text-body text-mint font-medium">GatherGo sẽ nhắc nhóm trước giờ đi.</p>
        </div>
      </GlassCard>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-3"
      >
        <GlowButton onClick={() => setLocation("/plan-detail")}>
          Xem lịch trình
        </GlowButton>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="w-full h-[48px] rounded-2xl font-semibold text-[16px] text-coral flex items-center justify-center gap-2 border border-coral/30 bg-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-2 focus:ring-offset-cream"
      >
        <Share2 className="w-4 h-4" />
        Mời thêm bạn
      </motion.button>

      <BottomNav />
    </div>
  );
}
