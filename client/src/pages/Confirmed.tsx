import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarBlank, ShareNetwork, Check, ArrowLeft, CaretRight, X } from "@phosphor-icons/react";
import Confetti from "@/components/Confetti";
import { getPlanById } from "@/data/mockData";

const BLUE = "#C8371E";
const T1 = "#1A0E07";

const getMembersByGroup = (group: string) => {
  if (group === "couple") {
    return [
      { initial: "N", name: "Nghĩa" },
      { initial: "L", name: "Linh" },
    ];
  }
  if (group === "family") {
    return [
      { initial: "B", name: "Ba Nghĩa" },
      { initial: "M", name: "Mẹ Linh" },
    ];
  }
  if (group === "company") {
    return [
      { initial: "T", name: "Trưởng nhóm" },
      { initial: "H", name: "HR" },
      { initial: "K", name: "Kế toán" },
      { initial: "D", name: "Dev Team" },
    ];
  }
  return [
    { initial: "N", name: "Nghĩa" },
    { initial: "L", name: "Linh" },
    { initial: "M", name: "Minh" },
    { initial: "A", name: "An" },
  ];
};

const getDresscode = (mood: string) => {
  switch (mood) {
    case "Chill": return { color: "Đen / Bạc", bg: "bg-slate-900", text: "text-white", border: "border-slate-700", icon: "✨" };
    case "Lãng mạn": return { color: "Trắng / Đỏ", bg: "bg-red-50", text: "text-red-900", border: "border-red-200", icon: "🍷" };
    case "Nghệ thuật": return { color: "Beige / Nâu", bg: "bg-stone-50", text: "text-stone-900", border: "border-stone-200", icon: "🎨" };
    case "Vui nhộn": return { color: "Sặc sỡ / Denim", bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-200", icon: "🎪" };
    case "Thư giãn": return { color: "Trắng / Pastel", bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200", icon: "🌿" };
    case "Ăn ngon": return { color: "Thoải mái / Freesize", bg: "bg-orange-50", text: "text-orange-900", border: "border-orange-200", icon: "🍜" };
    case "Nhẹ nhàng": return { color: "Trắng / Kem", bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200", icon: "🌼" };
    case "Gắn kết": return { color: "Đồng phục gia đình", bg: "bg-indigo-50", text: "text-indigo-900", border: "border-indigo-200", icon: "👨‍👩‍👧‍👦" };
    default: return { color: "Tự do / Casual", bg: "bg-slate-50", text: "text-slate-900", border: "border-slate-200", icon: "👕" };
  }
};

function ShareCard({ onClose, groupParam, planId }: { onClose: () => void, groupParam: string, planId: number }) {
  const groupMembers = getMembersByGroup(groupParam);
  const plan = getPlanById(groupParam, planId) || getPlanById(groupParam, 1)!;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[9999] px-6"
      style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm rounded-none border border-slate-900 bg-white"
        style={{ boxShadow: "12px 12px 0px rgba(15,23,42,0.1)" }}
      >
        {/* The shareable card preview */}
        <div className="relative overflow-hidden p-8">
          
          {/* Brand */}
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">GatherGo</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">2026</span>
          </div>

          {/* Big plan name */}
          <div className="relative z-10 mb-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Hành Trình Đã Chốt</p>
            <h2 className="font-serif text-4xl text-slate-900 leading-none tracking-tight mb-3">{plan.title}</h2>
            <p className="font-serif italic text-[15px] text-slate-600">Thứ bảy, {plan.time} · {plan.stops} · {plan.cost}</p>
          </div>

          {/* Avatar strip */}
          <div className="flex items-center gap-2 mb-8">
            {groupMembers.map((m, i) => (
              <div key={i} className="w-10 h-10 rounded-none flex items-center justify-center font-serif text-xl text-slate-900 border border-slate-200 bg-white">
                {m.initial}
              </div>
            ))}
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-2">{groupMembers.length} Thành Viên</span>
          </div>

          {/* Tagline */}
          <div className="relative z-10 border-t border-slate-200 pt-6">
            <p className="font-serif italic text-lg text-slate-900 leading-snug">
              "Kỷ niệm đẹp nhất là những khoảnh khắc bên nhau."
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 p-4 border-t border-slate-900 bg-slate-50">
          <button className="flex-1 h-12 rounded-none font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-wi-primary transition-colors">
            <ShareNetwork className="w-4 h-4" weight="bold" /> Chia sẻ
          </button>
          <button onClick={onClose}
            className="w-12 h-12 rounded-none flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-100 transition-colors">
            <X weight="bold" className="w-4 h-4 text-slate-900" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}



export default function Confirmed() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const groupParam = searchParams.get("group") || "friends";
  const planIdParam = searchParams.get("planId");
  const planId = planIdParam ? parseInt(planIdParam, 10) : 1;

  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [phase, setPhase] = useState(0);
  const [showShareCard, setShowShareCard] = useState(false);

  const planObj = getPlanById(groupParam, planId);
  const plan = planObj ? {
    title: planObj.title,
    meta: `Thứ bảy, ${planObj.time} · Còn 2 ngày 14 giờ`,
    stopsCount: planObj.timeline.length
  } : {
    title: "Kế hoạch",
    meta: "Đang tải...",
    stopsCount: 3
  };

  const mood = planObj?.mood || "Chill";
  const dressCode = getDresscode(mood);

  const groupMembers = getMembersByGroup(groupParam);

  useEffect(() => {
    const t1 = setTimeout(() => setConfettiTrigger(true), 400);
    const t2 = setTimeout(() => setPhase(1), 700);
    const t3 = setTimeout(() => setPhase(2), 1100);
    const t4 = setTimeout(() => setConfettiTrigger(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden relative pb-24">
      <Confetti trigger={confettiTrigger} />

      <AnimatePresence>
        {showShareCard && <ShareCard onClose={() => setShowShareCard(false)} groupParam={groupParam} planId={planId} />}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: "spring" }} className="pt-8 px-6 mb-8 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Thành Công</div>
          <h1 className="font-serif text-4xl text-slate-900 leading-none tracking-tight">Kế hoạch đã chốt</h1>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => window.history.length > 1 ? window.history.back() : setLocation("/home")}
          className="w-10 h-10 rounded-none flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm relative z-10">
          <ArrowLeft className="w-5 h-5 text-slate-900" weight="light" />
        </motion.button>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-start px-6 pb-8 relative z-10">

        {/* Success Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
          className="relative flex items-center justify-center mt-2 mb-8">
          <div className="w-20 h-20 rounded-none flex items-center justify-center border border-slate-900 bg-white"
            style={{ boxShadow: "8px 8px 0px rgba(15,23,42,0.1)" }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <Check className="w-8 h-8 text-slate-900" weight="bold" />
            </motion.div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 24 }}
          className="text-center mb-10 w-full">
          <h2 className="font-serif text-[42px] text-slate-900 leading-none tracking-tight mb-4">
            Đã chốt xong!
          </h2>
          <p className="font-serif italic text-lg text-slate-600">
            {plan.title}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {plan.meta}
            </p>
          </div>
        </motion.div>

        {/* Avatar stack */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="w-full border border-slate-200 rounded-none p-6 mb-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-900">Sẵn sàng</p>
                <div className="w-2 h-2 rounded-none bg-slate-900 animate-pulse" />
              </div>
              <div className="flex items-center justify-around">
                {groupMembers.map((m, i) => (
                  <motion.div key={m.name}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.12, type: "spring" }}
                    className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-none flex items-center justify-center font-serif text-2xl text-slate-900 border border-slate-300">
                      {m.initial}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{m.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary card */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 380, damping: 28 }}
          className="w-full rounded-none p-6 mb-8 bg-white border border-slate-200 shadow-sm relative z-10">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: groupMembers.length.toString(), label: "người", icon: "👥" },
              { value: plan.stopsCount.toString(), label: "điểm", icon: "📍" },
              { value: "1h", label: "nhắc", icon: "⏰" },
            ].map((s, i) => (
              <div key={i}>
                <span className="text-xl mb-2 block">{s.icon}</span>
                <p className="font-serif text-2xl text-slate-900">{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200 text-center">
            <p className="font-serif italic text-sm text-slate-600">
              GatherGo sẽ nhắc cả nhóm trước giờ đi.
            </p>
          </div>
        </motion.div>

        {/* Vibe Check & Dresscode Widget */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 380, damping: 28 }}
              className={`w-full rounded-none p-5 mb-8 border ${dressCode.bg} ${dressCode.border} relative overflow-hidden shadow-sm z-10`}
              style={{ backdropFilter: "blur(10px)" }}>
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-white/40 pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${dressCode.text} opacity-70`}>Vibe Check</div>
                  <div className={`font-serif text-xl ${dressCode.text} leading-tight`}>
                    Dress Code: {dressCode.color}
                  </div>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-white/50 text-2xl border ${dressCode.border}`}>
                  {dressCode.icon}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }} className="w-full space-y-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setLocation(`/plan-detail?state=confirmed&group=${groupParam}&planId=${planId}`)}
            className="w-full h-14 rounded-none font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-wi-primary transition-colors">
            Xem chi tiết <CaretRight className="w-4 h-4" weight="bold" />
          </motion.button>

          {/* Share moment button */}
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setShowShareCard(true)}
            className="w-full h-14 rounded-none font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-200 text-slate-900 hover:border-slate-900 transition-colors">
            <ShareNetwork className="w-4 h-4" weight="bold" /> Chia sẻ khoảnh khắc
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}
