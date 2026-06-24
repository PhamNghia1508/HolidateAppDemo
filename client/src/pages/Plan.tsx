import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Clock, Users, ChevronRight } from "lucide-react";

const savedPlans = [
  {
    id: 1,
    title: "Rooftop chill night",
    time: "Thứ bảy, 18:30",
    stops: "3 điểm đến",
    cost: "520k/người",
    group: "Bạn bè",
    mood: "Chill",
    status: "Chờ vote",
    statusColor: "#F3D37A",
    statusBg: "#F3D37A20",
  },
  {
    id: 2,
    title: "Food tour Quận 1",
    time: "Chủ nhật, 17:00",
    stops: "4 điểm đến",
    cost: "380k/người",
    group: "Gia đình",
    mood: "Ăn ngon",
    status: "Đã chốt",
    statusColor: "#4a7c59",
    statusBg: "#4a7c5920",
  },
  {
    id: 3,
    title: "Picnic công viên",
    time: "Thứ năm, 15:00",
    stops: "2 điểm đến",
    cost: "260k/người",
    group: "Người yêu",
    mood: "Nhẹ nhàng",
    status: "Nháp",
    statusColor: "#7B6658",
    statusBg: "#7B665820",
  },
];

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 80% 10%, rgba(16,35,30,0.06) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <div className="flex items-center justify-between pt-5 mb-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
              Plan
            </div>
            <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">Plan đã lưu</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation("/create-plan")}
            className="h-[40px] px-4 rounded-[12px] font-bold text-[14px] text-white flex items-center gap-1"
            style={{
              background: "linear-gradient(135deg, #FF6B4A, #FF8A4C)",
              boxShadow: "0 4px 16px rgba(255,107,74,0.3)",
            }}
          >
            + Tạo mới
          </motion.button>
        </div>

        {/* Stats Chips */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { value: "3", label: "Plan sẵn sàng", accent: "#4a7c59" },
            { value: "1", label: "Đang chờ vote", accent: "#F3D37A" },
            { value: "1", label: "Đã chốt", accent: "#4a7c59" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 }}
              className="premium-glass-card p-3 text-center"
              style={{
                boxShadow: `0 4px 16px rgba(0,0,0,0.04), 0 0 30px ${stat.accent}10`,
              }}
            >
              <p className="text-[22px] font-black" style={{ color: stat.accent }}>{stat.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7B6658] opacity-60 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Plan List */}
        <div className="space-y-3">
          {savedPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.02, y: -2, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLocation(plan.status === "Chờ vote" ? "/vote" : "/plan-detail")}
              className="premium-glass-card p-4 cursor-pointer"
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: plan.statusBg, color: plan.statusColor }}
                    >
                      {plan.status}
                    </span>
                    <span className="text-[11px] text-[#7B6658]">{plan.group}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#231F1B]">{plan.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-[#7B6658] opacity-50" />
              </div>
              <div className="flex items-center gap-4 text-[12px] text-[#7B6658]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{plan.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{plan.stops}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{plan.cost}</span>
                </div>
              </div>
              <div className="mt-2">
                <span className="px-3 py-1 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] text-[11px] font-medium border border-[#4a7c59]/15">
                  {plan.mood}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
