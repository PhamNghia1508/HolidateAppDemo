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
    statusColor: "#e9c46a",
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
    statusColor: "#b8b8b8",
  },
];

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative"
      style={{ background: "linear-gradient(180deg, #f3eee8 0%, #e8e0d6 100%)" }}
    >
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[26px] font-bold text-ink">Plan đã lưu</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation("/create-plan")}
            className="px-4 py-2 rounded-full text-white text-[13px] font-semibold shadow-md"
            style={{ background: "linear-gradient(135deg, #4a7c59, #2a9d8f)" }}
          >
            + Tạo mới
          </motion.button>
        </div>

        {/* Stats - Glassmorphism */}
        <div className="flex gap-3 mb-5">
          {[
            { value: "3", label: "Plan sẵn sàng", color: "#4a7c59" },
            { value: "1", label: "Đang chờ vote", color: "#e9c46a" },
            { value: "1", label: "Đã chốt", color: "#4a7c59" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex-1 rounded-[16px] p-3 border border-white/60 text-center backdrop-blur-md bg-white/60"
            >
              <p className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-[12px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Plan List */}
        <div className="space-y-3">
          {savedPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => setLocation(plan.status === "Chờ vote" ? "/vote" : "/plan-detail")}
              className="rounded-[16px] p-4 border border-white/60 cursor-pointer backdrop-blur-md bg-white/60 shadow-sm"
              data-testid={`plan-card-${plan.id}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-full"
                      style={{ background: plan.statusColor }}
                    >
                      {plan.status}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{plan.group}</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-ink">{plan.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
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
                <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-[11px] font-medium">
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
