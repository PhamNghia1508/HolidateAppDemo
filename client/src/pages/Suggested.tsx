import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Sparkle, CaretRight, Ghost } from "@phosphor-icons/react";

import { getPlansByGroup } from "@/data/mockData";

export default function Suggested() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const groupParam = searchParams.get("group") || "friends";
  const plans = getPlansByGroup(groupParam);

  return (
    <main className="flex-1 overflow-y-auto pb-24 relative">

      {/* Header */}
      <header className="sticky top-0 z-30 px-5 pt-5 pb-3 border-b border-slate-200/60 shadow-sm backdrop-blur-md bg-[#F8F9FA]/80">
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLocation("/create-plan")}
            className="w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0 bg-wi-surface border-none shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-wi-t1">
            <ArrowLeft className="w-5 h-5" weight="bold" />
          </motion.button>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-0.5">Gợi ý AI</div>
            <h1 className="font-serif text-2xl text-slate-900 leading-none">Chọn lịch trình</h1>
          </div>
        </div>
      </header>

      <div className="mt-4">
        {plans.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-5 mt-12 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 mb-6 rounded-none bg-slate-100 flex items-center justify-center text-slate-300">
               <Ghost className="w-10 h-10" weight="duotone" />
             </div>
             <h2 className="font-serif text-2xl text-slate-900 mb-2">Không tìm thấy lịch trình</h2>
             <p className="font-serif italic text-sm text-slate-500 mb-8 max-w-[240px]">GatherGo AI chưa tìm thấy lịch trình nào khớp với yêu cầu của nhóm này. Vui lòng thử lại với thiết lập khác.</p>
             
             <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setLocation(`/create-plan?group=${groupParam}`)}
              className="h-[54px] px-8 bg-slate-900 rounded-none flex items-center justify-center text-white shadow-md">
              <span className="font-bold text-sm tracking-[0.2em] uppercase">Quay lại tạo Plan</span>
             </motion.button>
          </motion.div>
        ) : (
          <>
            <div className="px-5 mb-8">
              <h2 className="font-serif text-3xl leading-tight text-slate-900 mb-2">Lựa chọn hàng đầu</h2>
              <p className="text-sm text-slate-500 font-medium">Được tinh chỉnh dựa trên mood, ngân sách và thời gian của bạn.</p>
            </div>

            {plans.map((plan, index) => {
              const isBest = index === 0;
          return (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative bg-white cursor-pointer shadow-sm ${isBest ? 'mb-12 border border-slate-200' : 'mb-8 border border-slate-200'}`}
              onClick={() => setLocation(`/plan-detail?group=${groupParam}&planId=${plan.id}`)}>
              
              {/* Image Section - Edge to Edge */}
              <div className="relative w-full overflow-hidden" style={{ height: isBest ? "480px" : "320px" }}>
                <motion.img 
                  whileHover={{ scale: 1.05 }} transition={{ duration: 1.5, ease: "easeOut" }}
                  src={plan.img} alt={plan.title} className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

                {/* Tags over image */}
                <div className="absolute top-5 left-5 flex gap-2">
                  {isBest && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md text-wi-primary rounded-none shadow-sm">
                      <Sparkle className="w-3.5 h-3.5" weight="fill" />
                      <span className="text-xs font-bold uppercase tracking-[0.15em]">Lựa chọn số 1</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-md text-white rounded-none">
                    <span className="text-xs font-bold uppercase tracking-[0.15em]">{plan.matchScore}% Phù Hợp</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-5 right-5 text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-2 block">{plan.tag}</span>
                  <h3 className={`font-serif leading-[1.1] ${isBest ? "text-4xl" : "text-3xl"}`}>{plan.title}</h3>
                </div>
              </div>

              {/* Editorial Content Below Image */}
              <div className="px-5 py-6 bg-white">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-slate-800 font-medium mb-1">
                      <span className="font-bold text-slate-900">{plan.time}</span> • {plan.stops} • {plan.cost}
                    </p>
                    <p className="text-base text-slate-500 font-serif italic">{plan.desc}</p>
                  </div>
                  <div className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 tracking-wide uppercase">
                    {plan.mood}
                  </div>
                </div>

                {isBest && (
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Chỉ số phù hợp</span>
                      <span className="text-sm font-serif italic text-wi-primary">{plan.matchScore}% Tương đồng</span>
                    </div>
                    <div className="h-[2px] w-full bg-slate-100 relative">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${plan.matchScore}%` }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-slate-900" />
                    </div>
                  </div>
                )}

                <button
                  onClick={(e) => { e.stopPropagation(); setLocation(`/plan-detail?group=${groupParam}&planId=${plan.id}`); }}
                  className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-bold tracking-[0.1em] uppercase transition-colors rounded-none ${
                    isBest 
                      ? "bg-slate-900 text-white hover:bg-wi-primary" 
                      : "bg-transparent border border-slate-900 text-slate-900 hover:bg-slate-50"
                  }`}>
                  {plan.id === 1 ? "Khám phá chuyến đi" : "Xem chi tiết"}
                  <CaretRight className="w-4 h-4" weight="bold" />
                </button>
              </div>
            </motion.div>
          );
        })}

        {/* Swipe hint */}
        <div className="flex flex-col items-center justify-center gap-3 pb-8 pt-4 opacity-50">
          <div className="w-[1px] h-8 bg-slate-400" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Cuộn để xem tiếp</span>
        </div>
      </>
      )}
      </div>

      <BottomNav />
    </main>
  );
}
