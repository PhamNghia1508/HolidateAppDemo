import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Clock, Users, ChevronRight } from "lucide-react";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";
const WARN = "#F59E0B";

const savedPlans = [
  { id: 1, title: "Rooftop chill night", time: "Thứ bảy, 18:30", stops: "3 điểm đến", cost: "520k/người", group: "Bạn bè", mood: "Chill", status: "Chờ vote", accent: BLUE },
  { id: 2, title: "Food tour Quận 1", time: "Chủ nhật, 17:00", stops: "4 điểm đến", cost: "380k/người", group: "Gia đình", mood: "Ăn ngon", status: "Đã chốt", accent: "#22C55E" },
  { id: 3, title: "Picnic công viên", time: "Thứ năm, 15:00", stops: "2 điểm đến", cost: "260k/người", group: "Người yêu", mood: "Nhẹ nhàng", status: "Nháp", accent: T3 },
];

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 420, damping: 32 });

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <div className="flex items-center justify-between pt-6 mb-5">
        <div>
          <div className="page-label mb-1">Plan</div>
          <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Plan đã lưu</h1>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/create-plan")}
          className="h-9 px-4 rounded-xl font-semibold text-[13px] premium-cta-mint flex items-center gap-1">
          + Tạo mới
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { value: "3", label: "Plan sẵn sàng", color: BLUE },
          { value: "1", label: "Đang chờ vote", color: WARN },
          { value: "1", label: "Đã chốt", color: "#22C55E" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={S(i)} className="rounded-2xl p-3 text-center"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <p className="text-[22px] font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wide mt-0.5" style={{ color: T3 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Plan List — clean cards, no confusing dividers */}
      <div className="space-y-3">
        {savedPlans.map((plan, i) => (
          <motion.button key={plan.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(i + 3)}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation(plan.status === "Chờ vote" ? "/vote" : "/plan-detail")}
            className="w-full text-left rounded-2xl relative overflow-hidden"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: plan.accent }} />
            <div className="p-4 pl-5">
              {/* Status + Group row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ background: `${plan.accent}15`, color: plan.accent, border: `1px solid ${plan.accent}30` }}>
                    {plan.status}
                  </span>
                  <span className="text-[11px]" style={{ color: T3 }}>{plan.group}</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: T3 }} />
              </div>

              {/* Title */}
              <h3 className="text-[17px] font-bold mb-2.5" style={{ color: T1 }}>{plan.title}</h3>

              {/* Metadata row — clean, no decorative dividers */}
              <div className="flex items-center gap-4 text-[12px]" style={{ color: T3 }}>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{plan.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{plan.stops}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{plan.cost}</span>
                </div>
              </div>

              {/* Mood tag */}
              <div className="mt-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{ background: "rgba(59,130,246,0.08)", color: BLUE, border: `1px solid rgba(59,130,246,0.15)` }}>
                  {plan.mood}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
