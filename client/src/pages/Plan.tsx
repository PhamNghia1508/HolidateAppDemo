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
    accent: "#00E5A8",
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
    accent: "#00E5A8",
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
    accent: "#71717A",
  },
];

const cardStagger = (i: number) => ({
  delay: i * 0.08,
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
});

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      <div className="ambient-mint-blur top-32 left-1/2 -translate-x-1/2" />

      {/* Header */}
      <div className="flex items-center justify-between pt-6 mb-5">
        <div>
          <div className="page-label mb-1">Plan</div>
          <h1 className="text-heading text-[#FAFAFA] tracking-tight font-black">Plan đã lưu</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/create-plan")}
          className="h-[36px] px-4 rounded-xl font-semibold text-[13px] text-[#09090B] flex items-center gap-1 premium-cta-mint"
        >
          + Tạo mới
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { value: "3", label: "Plan sẵn sàng", accent: "#00E5A8" },
          { value: "1", label: "Đang chờ vote", accent: "#F5C542" },
          { value: "1", label: "Đã chốt", accent: "#00E5A8" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={cardStagger(i)}
            className="obsidian-card p-3 text-center"
          >
            <p className="text-[22px] font-black" style={{ color: stat.accent }}>{stat.value}</p>
            <p className="text-micro text-[#71717A] mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Plan List */}
      <div className="space-y-3">
        {savedPlans.map((plan, i) => (
          <motion.button
            key={plan.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cardStagger(i + 3)}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation(plan.status === "Chờ vote" ? "/vote" : "/plan-detail")}
            className="obsidian-card w-full text-left relative overflow-hidden"
          >
            {/* Left accent stripe */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{ background: plan.accent }}
            />

            <div className="p-4 pl-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-label px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${plan.accent}15`,
                        color: plan.accent,
                        border: `1px solid ${plan.accent}25`,
                      }}
                    >
                      {plan.status}
                    </span>
                    <span className="text-label text-[#71717A]">{plan.group}</span>
                  </div>
                  <h3 className="text-title text-[#FAFAFA]">{plan.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-[#52525B]" />
              </div>

              {/* Route line */}
              <div className="flex items-center gap-1 mb-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: plan.accent }} />
                <div
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(90deg, ${plan.accent}40, transparent)` }}
                />
                <Ticket className="w-3 h-3 text-[#52525B]" />
              </div>

              <div className="flex items-center gap-4 text-body text-[#71717A]">
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
                <span className="px-3 py-1 rounded-full bg-[#00E5A8]/10 text-[#00E5A8] text-label border border-[#00E5A8]/15">
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
