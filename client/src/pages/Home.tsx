import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, CalendarBlank, Heart, Sparkle, ArrowRight, Bell, Lightning, PawPrint, Check, Compass, Ghost } from "@phosphor-icons/react";
import { getPlansByGroup } from "@/data/mockData";

// Warm Mimi colors
const MIMI_BODY = "#FFD4A8";
const MIMI_STROKE = "#FDBA74";
const MIMI_EYE = "#1A0800";
const MIMI_NOSE = "#FB923C";

function TinyMimi({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      onClick={e => { 
        e.stopPropagation(); 
        window.dispatchEvent(new Event('open-mimi'));
      }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      whileTap={{ scale: 0.88 }}
      className="absolute bottom-3 right-3 cursor-pointer"
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

const GROUPS = [
  { id: "friends", label: "Bạn bè" },
  { id: "family", label: "Gia đình" },
  { id: "couple", label: "Người yêu" },
  { id: "company", label: "Công ty" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [showMimiTooltip, setShowMimiTooltip] = useState(false);
  const [tooltipKey, setTooltipKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState("friends");

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeGroup]);

  const handleMimiTap = () => {
    setTooltipKey(k => k + 1);
    setShowMimiTooltip(true);
    setTimeout(() => setShowMimiTooltip(false), 2000);
  };

  const plans = getPlansByGroup(activeGroup);
  const upNext = plans[0];
  const pending = plans[1];

  return (
    <div className="flex-1 overflow-y-auto pb-24 relative">

      {/* Header — word-by-word greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-8 mb-6 px-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">GATHERGO 2026</div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-5xl text-slate-900 leading-none tracking-tight">
              {["Chào", " Nghĩa", "."].map((word, i) => (
                <motion.span key={word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.14, type: "spring", stiffness: 450, damping: 28 }}
                  style={{ display: "inline-block" }}>
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="font-serif italic text-base text-slate-500 mt-2">Thứ Ba, 24 tháng 6</p>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            whileTap={{ scale: 0.90 }}
            className="w-12 h-12 rounded-none flex items-center justify-center relative bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
            <Bell className="w-5 h-5 text-slate-900" weight="light" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-none bg-rose-500" />
          </motion.button>
        </div>
      </motion.div>

      {/* Group Selector */}
      <div className="px-6 mb-6 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 min-w-max pb-2">
          {GROUPS.map((g) => {
            const isActive = activeGroup === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className={`px-5 py-2.5 rounded-none font-serif text-sm transition-all shadow-sm ${
                  isActive ? "bg-slate-900 text-white border border-slate-900" : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="skeleton-journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 space-y-6">
             <div className="h-20 rounded-none shimmer-skeleton" />
             <div className="h-[280px] rounded-none shimmer-skeleton" />
          </motion.div>
        ) : plans.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="px-6 mt-8 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 mb-6 rounded-none bg-slate-100 flex items-center justify-center text-slate-300">
               <Ghost className="w-10 h-10" weight="duotone" />
             </div>
             <h2 className="font-serif text-2xl text-slate-900 mb-2">Chưa có lịch trình</h2>
             <p className="font-serif italic text-sm text-slate-500 mb-8 max-w-[240px]">Nhóm {GROUPS.find(g => g.id === activeGroup)?.label} chưa có kế hoạch nào sắp tới. Bắt đầu tạo ngay thôi!</p>
             
             <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setLocation(`/create-plan?group=${activeGroup}`)}
              className="h-[54px] px-8 bg-[#D84C35] rounded-none flex items-center justify-center text-white shadow-xl shadow-rose-500/20">
              <span className="font-bold text-sm tracking-[0.2em] uppercase">Tạo Gather Mới</span>
             </motion.button>
          </motion.div>
        ) : (
          <motion.div key="journey" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="relative mt-2">
            
            {/* UP NEXT WIDGET */}
            {upNext && (
              <div className="px-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-serif text-2xl text-slate-900">Sắp diễn ra</h2>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Còn 5 ngày</span>
                </div>
                
                <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
                  whileTap={{ scale: 0.98 }} onClick={() => setLocation(`/plan-detail?state=confirmed&group=${activeGroup}&planId=${upNext.id}`)}
                  className="w-full rounded-none overflow-hidden relative focus:outline-none border border-slate-200 bg-white group shadow-sm">
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <img src={upNext.img}
                      alt={upNext.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-none shadow-sm">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-900">ĐÃ CHỐT</span>
                    </div>
                  </div>
                  <div className="p-4 text-left bg-white">
                    <h3 className="font-serif text-2xl text-slate-900 leading-tight mb-1">{upNext.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <MapPin className="w-3 h-3" weight="fill" /> {upNext.stops} · {upNext.cost}
                    </p>
                  </div>
                </motion.button>
              </div>
            )}

            {/* ACTION REQUIRED WIDGET */}
            {pending && (
              <div className="px-6 mb-8">
                <h2 className="font-serif text-2xl text-slate-900 mb-3">Đang chờ bạn</h2>
                
                <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(2)}
                  whileTap={{ scale: 0.98 }} onClick={() => setLocation(`/plan-detail?group=${activeGroup}&planId=${pending.id}`)}
                  className="w-full text-left bg-white border border-slate-200 p-4 rounded-none flex items-center gap-4 hover:border-slate-400 transition-colors shadow-sm">
                  <div className="w-12 h-12 rounded-none flex items-center justify-center flex-shrink-0 bg-rose-50 text-rose-500 border border-rose-100">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Check className="w-6 h-6" weight="bold" />
                    </motion.div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-xl text-slate-900 leading-tight">Biểu quyết: {pending.title}</p>
                    <p className="font-serif italic text-sm text-slate-500 mt-1">
                      {activeGroup === "couple" ? "Bạn chưa vote" :
                       activeGroup === "family" ? "Ba và Mẹ đã vote" :
                       activeGroup === "company" ? "HR và Kế toán đã đồng ý" :
                       "Linh và Minh đã vote"}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" weight="light" />
                </motion.button>
              </div>
            )}

            {/* QUICK ACTIONS */}
            <div className="px-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(3)}
                  whileTap={{ scale: 0.96 }} onClick={() => setLocation(`/create-plan?group=${activeGroup}`)}
                  className="rounded-none text-left p-5 bg-white border border-slate-200 hover:border-slate-400 transition-colors shadow-sm">
                  <div className="w-10 h-10 rounded-none flex items-center justify-center mb-4 bg-slate-50 border border-slate-200">
                    <Sparkle className="w-5 h-5 text-slate-900" weight="light" />
                  </div>
                  <p className="font-serif text-lg text-slate-900">Gather Mới</p>
                </motion.button>

                <motion.button initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(4)}
                  whileTap={{ scale: 0.96 }} onClick={() => setLocation("/pet")}
                  className="rounded-none text-left p-5 bg-white border border-slate-200 hover:border-slate-400 transition-colors relative shadow-sm">
                  <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
                    className="w-10 h-10 rounded-none flex items-center justify-center mb-4 bg-slate-50 border border-slate-200 text-slate-900">
                    <PawPrint className="w-5 h-5" weight="light" />
                  </motion.div>
                  <p className="font-serif text-lg text-slate-900">Mimi</p>
                  <TinyMimi onClick={handleMimiTap} />
                  <AnimatePresence>
                    {showMimiTooltip && (
                      <motion.div key={tooltipKey}
                        initial={{ opacity: 0, y: 4, scale: 0.85 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        className="absolute bottom-[52px] right-2 px-3 py-2 rounded-none font-serif italic text-sm whitespace-nowrap bg-slate-900 text-white shadow-md">
                        Mình vui lắm!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
