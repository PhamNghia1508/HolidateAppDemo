import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, Sparkles } from "lucide-react";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.07)";

const plans = [
  {
    id: 1, tag: "Hợp mood nhất", title: "Rooftop chill night",
    time: "18:30", stops: "3 điểm đến", cost: "520k/người",
    desc: "Hợp nhóm thích chill và chụp ảnh", mood: "Chill",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=240&fit=crop",
  },
  {
    id: 2, tag: "Tiết kiệm nhất", title: "Food tour gần trung tâm",
    time: "19:00", stops: "4 điểm đến", cost: "450k/người",
    desc: "Nhiều món, chi phí dễ chịu", mood: "Ăn ngon",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=240&fit=crop",
  },
  {
    id: 3, tag: "Nhẹ nhàng", title: "Picnic + boardgame",
    time: "15:30", stops: "2 điểm đến", cost: "260k/người",
    desc: "Ít di chuyển, hợp buổi nhẹ nhàng", mood: "Nhẹ nhàng",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=240&fit=crop",
  },
];

export default function Suggested() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-20 relative" style={{ background: BG }}>
      {/* Header with back navigation */}
      <div className="sticky top-0 z-20 px-5 pt-5 pb-3"
        style={{ background: "rgba(241,245,251,0.90)", backdropFilter: "blur(20px)" }}>
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
        <p className="text-[13px] mb-4" style={{ color: T2 }}>3 gợi ý được tối ưu theo mood, ngân sách và thời gian của nhóm.</p>

        {plans.map((plan, index) => (
          <motion.div key={plan.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.06 + index * 0.1, type: "spring", stiffness: 400, damping: 30 }}
            whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
            className="rounded-2xl overflow-hidden mb-4 cursor-pointer"
            style={{ border: `1px solid ${BORDER}`, boxShadow: SHADOW }}
            onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}>
            <div className="relative h-[148px] overflow-hidden">
              <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.70), rgba(15,23,42,0.25) 55%, transparent)" }} />
              {index === 0 && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: BLUE, boxShadow: "0 2px 8px rgba(59,130,246,0.40)" }}>
                  <Sparkles className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Best Match</span>
                </div>
              )}
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{plan.tag}</span>
                <h3 className="text-[20px] font-black text-white mt-0.5 tracking-tight">{plan.title}</h3>
              </div>
            </div>
            <div className="p-4" style={{ background: SURF }}>
              <p className="text-[12px] mb-1" style={{ color: T3 }}>{plan.time} • {plan.stops} • {plan.cost}</p>
              <p className="text-[13px] mb-3" style={{ color: T2 }}>{plan.desc}</p>
              {/* Consistent CTA: all plans use same blue button style */}
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-full text-[12px] font-semibold"
                  style={{ background: "rgba(59,130,246,0.08)", color: BLUE, border: `1px solid rgba(59,130,246,0.18)` }}>
                  {plan.mood}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote"); }}
                  className="px-4 py-1.5 rounded-full text-[12px] font-bold"
                  style={{ background: BLUE, color: "#FFFFFF", boxShadow: "0 2px 8px rgba(59,130,246,0.25)" }}>
                  {plan.id === 1 ? "Xem chi tiết" : "Bình chọn"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
