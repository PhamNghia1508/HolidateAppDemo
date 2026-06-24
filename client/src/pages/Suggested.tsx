import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

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
  { id: 1, tag: "Hợp mood nhất", title: "Rooftop chill night", time: "18:30", stops: "3 điểm đến", cost: "520k/người", desc: "Hợp nhóm thích chill và chụp ảnh", mood: "Chill", cta: "Xem chi tiết", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=240&fit=crop", primary: true },
  { id: 2, tag: "Tiết kiệm", title: "Food tour gần trung tâm", time: "19:00", stops: "4 điểm đến", cost: "450k/người", desc: "Nhiều món, chi phí dễ chịu", mood: "Ăn ngon", cta: "Bình chọn", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=240&fit=crop", primary: false },
  { id: 3, tag: "Nhẹ nhàng", title: "Picnic + boardgame", time: "15:30", stops: "2 điểm đến", cost: "260k/người", desc: "Ít đi chuyển, hợp buổi nhẹ nhàng", mood: "Nhẹ nhàng", cta: "Bình chọn", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=240&fit=crop", primary: false },
];

export default function Suggested() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 420, damping: 35 }} className="pt-6 mb-5">
        <div className="page-label mb-1">Gợi ý</div>
        <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Chọn lịch trình hợp gu</h1>
        <p className="text-[13px] mt-1" style={{ color: T2 }}>3 gợi ý được tối ưu theo mood, ngân sách và thời gian của nhóm.</p>
      </motion.div>

      {plans.map((plan, index) => (
        <motion.div key={plan.id}
          initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.08 + index * 0.11, type: "spring", stiffness: 400, damping: 30 }}
          whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
          className="rounded-2xl overflow-hidden mb-4 cursor-pointer"
          style={{ border: `1px solid ${BORDER}`, boxShadow: SHADOW }}
          onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}>
          <div className="relative h-[148px] overflow-hidden">
            <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.70), rgba(15,23,42,0.25) 55%, transparent)" }} />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">{plan.tag}</span>
              <h3 className="text-[20px] font-black text-white mt-0.5 tracking-tight">{plan.title}</h3>
            </div>
          </div>
          <div className="p-4" style={{ background: SURF }}>
            <p className="text-[12px] mb-1" style={{ color: T3 }}>{plan.time} • {plan.stops} • {plan.cost}</p>
            <p className="text-[13px] mb-3" style={{ color: T2 }}>{plan.desc}</p>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded-full text-[12px] font-semibold"
                style={{ background: "rgba(59,130,246,0.08)", color: BLUE, border: `1px solid rgba(59,130,246,0.18)` }}>
                {plan.mood}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote"); }}
                className="px-4 py-1.5 rounded-full text-[12px] font-bold"
                style={{ background: plan.primary ? T1 : BLUE, color: "#FFFFFF", boxShadow: plan.primary ? "0 2px 8px rgba(15,23,42,0.20)" : "0 2px 8px rgba(59,130,246,0.25)" }}>
                {plan.cta}
              </button>
            </div>
          </div>
        </motion.div>
      ))}

      <BottomNav />
    </div>
  );
}
