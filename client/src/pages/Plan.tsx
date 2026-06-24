import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import PageHeader from "@/components/PageHeader";
import StatPill from "@/components/StatPill";
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
    accent: "coral",
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
    accent: "mint",
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
    accent: "clay",
  },
];

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5">
      {/* Header */}
      <div className="flex items-center justify-between pt-5 mb-5">
        <PageHeader label="Plan" title="Plan đã lưu" />
        <GlowButton
          onClick={() => setLocation("/create-plan")}
          size="sm"
          icon={<span className="text-lg">+</span>}
        >
          Tạo mới
        </GlowButton>
      </div>

      {/* Stats */}
      <div className="bento-3 mb-5">
        <StatPill value="3" label="Plan sẵn sàng" color="mint" />
        <StatPill value="1" label="Đang chờ vote" color="champagne" delay={0.05} />
        <StatPill value="1" label="Đã chốt" color="mint" delay={0.1} />
      </div>

      {/* Plan List — Event Tickets */}
      <div className="space-y-3">
        {savedPlans.map((plan, i) => {
          const accentColor = plan.accent === "coral" ? "coral" : plan.accent === "mint" ? "mint" : "clay";
          return (
            <GlassCard
              key={plan.id}
              onClick={() => setLocation(plan.status === "Chờ vote" ? "/vote" : "/plan-detail")}
              delay={0.1 + i * 0.1}
              className="relative overflow-hidden cursor-pointer"
            >
              {/* Left accent stripe */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-${accentColor}`} />

              <div className="p-4 pl-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-label px-2.5 py-0.5 rounded-full bg-${accentColor}/10 text-${accentColor} border border-${accentColor}/15`}>
                        {plan.status}
                      </span>
                      <span className="text-label text-clay">{plan.group}</span>
                    </div>
                    <h3 className="text-title text-ink">{plan.title}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-clay opacity-40" />
                </div>

                {/* Route line */}
                <div className="flex items-center gap-1 mb-2">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor}`} />
                  <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, hsl(var(--${accentColor})/40), transparent)` }} />
                  <Ticket className="w-3 h-3 text-clay opacity-40" />
                </div>

                <div className="flex items-center gap-4 text-body text-clay">
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
                  <span className="px-3 py-1 rounded-full bg-mint/10 text-mint text-label border border-mint/15">
                    {plan.mood}
                  </span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
