import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Calendar, Heart, Share2, Check } from "lucide-react";
import SpatialCard from "@/components/SpatialCard";
import SpringButton from "@/components/SpringButton";
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
      style={{ background: "linear-gradient(180deg, #f3eee8 0%, #e8e0d6 100%)" }}
    >
      {/* Confetti */}
      <Confetti trigger={confettiTrigger} />

      {/* Background celebration */}
      <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-coral/40" />
      <div className="absolute top-20 right-16 w-2 h-2 rounded-full bg-yellow/40" />
      <div className="absolute top-40 left-20 w-4 h-4 rounded-full bg-sage/30" />
      <div className="absolute top-60 right-8 w-2 h-2 rounded-full bg-coral/30" />

      <div className="flex-1 overflow-y-auto pb-24 px-6 relative z-10">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </div>

        {/* Success Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center mt-8 mb-8"
        >
          {/* Check circle with glow */}
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, #4a7c59, #2a9d8f)" }}
          >
            <div className="absolute inset-0 rounded-full animate-ping bg-sage/30" />
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Check className="w-12 h-12 text-white relative z-10" strokeWidth={2.5} />
            </motion.div>
          </div>

          <Heart className="w-5 h-5 text-coral mb-2" />
          <h1 className="text-[26px] font-bold text-ink mb-2">Plan đã chốt!</h1>
          <p className="text-[14px] text-muted-foreground">Rooftop chill night • Thứ bảy, 18:30</p>
        </motion.div>

        {/* Summary - SpatialCard */}
        <SpatialCard glow="sage" className="mb-5">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-center flex-1">
                <Calendar className="w-5 h-5 text-sage mx-auto mb-1" />
                <p className="text-[16px] font-bold text-ink">3</p>
                <p className="text-[11px] text-muted-foreground">người</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-[16px] font-bold text-ink">3</p>
                <p className="text-[11px] text-muted-foreground">điểm đến</p>
              </div>
              <div className="text-center flex-1">
                <p className="text-[16px] font-bold text-ink">1h</p>
                <p className="text-[11px] text-muted-foreground">nhắc trước</p>
              </div>
            </div>
            <div className="rounded-[12px] p-3 text-center backdrop-blur-sm bg-sage/10">
              <p className="text-[13px] text-sage font-medium">GatherGo sẽ nhắc nhóm trước giờ đi.</p>
            </div>
          </div>
        </SpatialCard>

        {/* CTAs */}
        <SpringButton onClick={() => setLocation("/plan-detail")} data-testid="button-view-itinerary">
          Xem lịch trình
        </SpringButton>

        <SpringButton
          variant="outline"
          onClick={() => {}}
          className="mt-3 text-coral"
          data-testid="button-invite"
        >
          <Share2 className="w-4 h-4" />
          Mời thêm bạn
        </SpringButton>
      </div>

      <BottomNav />
    </div>
  );
}
