import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Sparkles, ChevronRight } from "lucide-react";

const BG = "#F7F5F0";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.05), 0 4px 20px rgba(0,0,0,0.06)";

const plans = [
  {
    id: 1, tag: "Hợp mood nhất", title: "Rooftop chill night",
    time: "18:30", stops: "3 điểm đến", cost: "520k/người",
    desc: "Hợp nhóm thích chill và chụp ảnh", mood: "Chill",
    matchScore: 92,
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=280&fit=crop",
  },
  {
    id: 2, tag: "Tiết kiệm nhất", title: "Food tour gần trung tâm",
    time: "19:00", stops: "4 điểm đến", cost: "450k/người",
    desc: "Nhiều món, chi phí dễ chịu", mood: "Ăn ngon",
    matchScore: 78,
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=240&fit=crop",
  },
  {
    id: 3, tag: "Nhẹ nhàng", title: "Picnic + boardgame",
    time: "15:30", stops: "2 điểm đến", cost: "260k/người",
    desc: "Ít di chuyển, hợp buổi nhẹ nhàng", mood: "Nhẹ nhàng",
    matchScore: 65,
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=240&fit=crop",
  },
];

export default function Suggested() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-24 relative" style={{ background: BG }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 pt-5 pb-3"
        style={{ background: "rgba(247,245,240,0.92)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLocation("/create-plan")}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <ArrowLeft className="w-4 h-4" style={{ color: T1 }} />
          </motion.button>
          <div>
            <div className="page-label">Gợi ý</div>
            <h1 className="text-[20px] font-black tracking-tight" style={{ color: T1 }}>Chọn lịch trình hợp gu</h1>
          </div>
        </div>
      </div>

      <div className="px-5">
        <p className="text-[13px] mb-4" style={{ color: T2 }}>3 gợi ý tối ưu theo mood, ngân sách và thời gian nhóm bạn.</p>

        {plans.map((plan, index) => {
          const isBest = index === 0;
          return (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 22, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.06 + index * 0.10, type: "spring", stiffness: 380, damping: 28 }}
              whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
              className="rounded-2xl overflow-hidden mb-4 cursor-pointer"
              style={{
                border: isBest ? `2px solid rgba(59,130,246,0.35)` : `1px solid ${BORDER}`,
                boxShadow: isBest
                  ? "0 0 0 4px rgba(59,130,246,0.07), 0 8px 36px rgba(59,130,246,0.16), 0 2px 8px rgba(0,0,0,0.06)"
                  : SHADOW,
              }}
              onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}>

              {/* Hero image — Best Match is taller */}
              <div className="relative overflow-hidden" style={{ height: isBest ? "200px" : "156px" }}>
                <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.75), rgba(15,23,42,0.22) 55%, transparent)" }} />

                {/* Best match badge — glowing */}
                {isBest && (
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0px rgba(59,130,246,0.40)", "0 0 0 6px rgba(59,130,246,0)", "0 0 0 0px rgba(59,130,246,0.40)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: BLUE, boxShadow: "0 2px 12px rgba(59,130,246,0.50)" }}>
                    <Sparkles className="w-3 h-3 text-white" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Best Match</span>
                  </motion.div>
                )}

                {/* AI match score */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.30)" }}>
                  <span className="text-[11px] font-bold text-white">{plan.matchScore}% hợp</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">{plan.tag}</span>
                  <h3 className={`font-black text-white mt-0.5 tracking-tight ${isBest ? "text-[22px]" : "text-[19px]"}`}>{plan.title}</h3>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4" style={{ background: SURF }}>
                <p className="text-[12px] mb-1" style={{ color: T3 }}>{plan.time} · {plan.stops} · {plan.cost}</p>
                <p className="text-[13px] mb-3" style={{ color: T2 }}>{plan.desc}</p>

                {/* Match bar for best */}
                {isBest && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold" style={{ color: T3 }}>Độ phù hợp nhóm</span>
                      <span className="text-[11px] font-bold" style={{ color: BLUE_BRIGHT }}>{plan.matchScore}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(59,130,246,0.10)" }}>
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${plan.matchScore}%` }}
                        transition={{ delay: 0.5, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                        className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${BLUE_BRIGHT}, ${BLUE})` }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[12px] font-semibold"
                    style={{ background: "rgba(59,130,246,0.08)", color: BLUE, border: `1px solid rgba(59,130,246,0.18)` }}>
                    {plan.mood}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote"); }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-bold ${isBest ? "premium-cta-mint" : ""}`}
                    style={isBest ? {} : { background: T1, color: "#FFFFFF", boxShadow: "0 2px 8px rgba(15,23,42,0.18)" }}>
                    {plan.id === 1 ? "Chọn plan này" : "Bình chọn"}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Swipe hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 pb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.15)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.15)" }} />
          <span className="text-[11px] ml-1" style={{ color: T3 }}>Cuộn xuống để xem thêm</span>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
