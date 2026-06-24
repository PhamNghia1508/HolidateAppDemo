import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Clock, Users, ChevronRight, Ticket } from "lucide-react";

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
    statusColor: "#F4D06F",
    statusBg: "#F4D06F20",
    accent: "#FF6848",
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
    statusColor: "#62C9A5",
    statusBg: "#62C9A520",
    accent: "#62C9A5",
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
    statusColor: "#78675B",
    statusBg: "#78675B20",
    accent: "#78675B",
  },
];

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF7EA 0%, #F6EDE1 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <div className="flex items-center justify-between pt-5 mb-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">
              Plan
            </div>
            <h1 className="text-[22px] font-black text-[#201B17] tracking-tight mt-0.5">Plan đã lưu</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocation("/create-plan")}
            className="h-[40px] px-4 rounded-[12px] font-bold text-[14px] text-white flex items-center gap-1"
            style={{
              background: "linear-gradient(135deg, #FF6848, #FF9A4A)",
              boxShadow: "0 4px 16px rgba(255,104,72,0.3)",
            }}
          >
            + Tạo mới
          </motion.button>
        </div>

        {/* Stats Chips — premium glass */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { value: "3", label: "Plan sẵn sàng", accent: "#62C9A5" },
            { value: "1", label: "Đang chờ vote", accent: "#F4D06F" },
            { value: "1", label: "Đã chốt", accent: "#62C9A5" },
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
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#78675B] opacity-60 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Plan List — mini event tickets */}
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
              className="relative overflow-hidden cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "20px",
                boxShadow: `0 4px 20px rgba(0,0,0,0.06), 0 0 30px ${plan.accent}08, inset 0 1px 0 rgba(255,255,255,0.4)`,
              }}
            >
              {/* Left accent stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[20px]" style={{ background: plan.accent }} />

              <div className="p-4 pl-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ background: plan.statusBg, color: plan.statusColor }}
                      >
                        {plan.status}
                      </span>
                      <span className="text-[11px] text-[#78675B]">{plan.group}</span>
                    </div>
                    <h3 className="text-[16px] font-bold text-[#201B17]">{plan.title}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#78675B] opacity-40" />
                </div>

                {/* Route line */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.accent }} />
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${plan.accent}40, transparent)` }} />
                  <Ticket className="w-3 h-3 text-[#78675B] opacity-40" />
                </div>

                <div className="flex items-center gap-4 text-[12px] text-[#78675B]">
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
                  <span className="px-3 py-1 rounded-full bg-[#62C9A5]/10 text-[#62C9A5] text-[11px] font-medium border border-[#62C9A5]/15">
                    {plan.mood}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
