import { useLocation } from "wouter";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, MapPin, Clock, Users, ShareNetwork, Wallet, Car, ArrowRight, Heart } from "@phosphor-icons/react";
import { useToast } from "@/hooks/use-toast";
import { triggerHeartBurst, triggerConfettiExplosion } from "@/components/premium/ParticleEffects";
import { VoteSheet } from "@/components/premium/VoteSheet";

import { EmptyState } from "@/components/premium/EmptyState";
import { getPlanById } from "@/data/mockData";

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 420, damping: 32 });

export default function PlanDetail() {
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll({ container: containerRef });
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const { toast } = useToast();
  const [showVote, setShowVote] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const isConfirmed = searchParams.get("state") === "confirmed";
  const isCompleted = searchParams.get("state") === "completed";
  const groupParam = searchParams.get("group") || "friends";
  const planIdParam = searchParams.get("planId");
  const planId = planIdParam ? parseInt(planIdParam, 10) : 1;
  
  const plan = getPlanById(groupParam, planId);
  if (!plan) {
    return (
      <div className="flex-1 flex flex-col pt-12 pb-24 px-6 bg-slate-50 relative h-full items-center justify-center">
        <EmptyState 
          icon={<MapPin className="w-8 h-8 text-slate-400" />}
          title="Không tìm thấy kế hoạch"
          description="Kế hoạch này không tồn tại hoặc đã bị xóa."
          actionLabel="Quay lại Trang Chủ"
          onAction={() => setLocation("/home")}
        />
        <BottomNav />
      </div>
    );
  }
  
  const timeline = plan.timeline;

  return (
    <motion.main 
      ref={containerRef} 
      className="flex-1 overflow-y-auto pb-24 relative"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, info) => {
        if (info.offset.x > 100) {
          setLocation("/suggested");
        }
      }}
    >
      {/* Floating Header */}
      <div className="fixed top-0 left-0 right-0 z-30 px-6 pt-6 pb-3 flex items-center justify-between pointer-events-none">
        <motion.button aria-label="Quay lại" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} 
          transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1 }}
          onClick={() => window.history.length > 1 ? window.history.back() : setLocation("/home")}
          className="w-12 h-12 rounded-none flex items-center justify-center bg-white border border-slate-200 text-slate-900 shadow-sm pointer-events-auto hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" weight="light" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1 }}
          onClick={(e) => {
            triggerHeartBurst(e.clientX, e.clientY);
            toast({ title: "Đã lưu lịch trình", description: "Bạn có thể xem lại trong mục Kỷ niệm." });
          }}
          aria-label="Lưu" className="w-12 h-12 rounded-none flex items-center justify-center bg-white border border-slate-200 text-slate-900 shadow-sm pointer-events-auto hover:bg-slate-50 transition-colors">
          <Heart className="w-5 h-5" weight="light" />
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[45vh] min-h-[350px] overflow-hidden">
        <motion.img 
          style={{ y }}
          src={plan.img} 
          alt="Rooftop" 
          className="w-full h-[120%] object-cover absolute top-0 -mt-10" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="flex items-center gap-2 mb-4">
            {["Chill", "Hoàng hôn"].map(t => (
              <span key={t} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-900 bg-white shadow-sm">
                {t}
              </span>
            ))}
          </div>
          
          <h1 className="font-serif text-[40px] leading-[1.1] text-white mb-2 tracking-tight">{plan.title}</h1>
          <p className="text-sm uppercase tracking-widest font-bold text-white/80">{plan.desc}</p>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="grid grid-cols-3 divide-x divide-slate-200 border-b border-slate-200 bg-white">
        {[
          { label: "Thời gian", value: timeline[0]?.time, icon: Clock },
          { label: "Chi phí", value: plan.cost, icon: Wallet },
          { label: "Phương tiện", value: plan.transport, icon: Car },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center justify-center py-6">
            <s.icon className="w-5 h-5 text-slate-400 mb-3" weight="light" />
            <p className="font-serif text-2xl text-slate-900 mb-1 leading-none">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="px-6 py-10 bg-[#F8F9FA]">
        <div className="max-w-md mx-auto">
          <h2 className="font-serif text-2xl text-slate-900 mb-8">Lịch trình chi tiết</h2>
          
          <div className="space-y-0 relative">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-10 pb-10">
                {i < timeline.length - 1 && (
                  <div className="absolute top-2 left-[7px] bottom-[-8px] w-[2px] bg-slate-200" />
                )}
                <div className="absolute top-1 left-0">
                  <div className="w-4 h-4 rounded-none bg-white border-[3px] border-slate-800 relative z-10" />
                </div>
                <div>
                  <p className="text-sm font-bold text-wi-primary mb-1 tracking-wide">{item.time}</p>
                  <p className="font-serif text-2xl text-slate-900 leading-tight mb-2">{item.title}</p>
                  <p className="text-base text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white border border-slate-200 mt-4 shadow-sm">
            <p className="text-sm font-serif italic text-slate-600 leading-relaxed text-center">
              "Có thể điều chỉnh thêm bớt thời gian tùy hứng. Quan trọng là vui."
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-[68px] left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-40">
        {isCompleted ? (
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1 }}
            onClick={() => setLocation(`/memories?group=${groupParam}`)}
            className="w-full h-14 rounded-none bg-emerald-600 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-emerald-700 transition-colors">
            Xem lại Kỷ Niệm
            <ArrowRight weight="bold" />
          </motion.button>
        ) : isConfirmed ? (
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1 }}
            onClick={(e) => {
              triggerConfettiExplosion(e.clientX, e.clientY);
              toast({ title: "Sẵn sàng lên đường!", description: "Đang mở bảng điều khiển hành trình." });
              setTimeout(() => setLocation(`/live?group=${groupParam}&planId=${planId}`), 1200);
            }}
            className="w-full h-14 rounded-none bg-slate-900 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-wi-primary transition-colors">
            <MapPin className="w-5 h-5" weight="fill" /> Bắt đầu hành trình
          </motion.button>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17, mass: 1 }}
            onClick={(e) => {
              setShowVote(true);
            }}
            className="w-full h-14 rounded-none bg-slate-900 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-wi-primary transition-colors">
            Chọn Plan Này
            <ArrowRight weight="bold" />
          </motion.button>
        )}
      </div>

      {showVote && (
        <VoteSheet 
          groupParam={groupParam} 
          planId={planId} 
          onClose={() => setShowVote(false)} 
          onComplete={() => {
            setShowVote(false);
            setLocation(`/confirmed?group=${groupParam}&planId=${planId}`);
          }} 
        />
      )}

      <BottomNav />
    </motion.main>
  );
}
