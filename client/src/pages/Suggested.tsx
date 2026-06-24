import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";

const plans = [
  {
    id: 1,
    tag: "Hợp mood nhất",
    title: "Rooftop chill night",
    time: "18:30",
    stops: "3 điểm đến",
    cost: "520k/người",
    desc: "Hợp nhóm thích chill và chụp ảnh",
    mood: "Chill",
    cta: "Xem chi tiết",
    bg: "bg-sage",
    textColor: "text-white",
  },
  {
    id: 2,
    tag: "Tiết kiệm",
    title: "Food tour gần trung tâm",
    time: "19:00",
    stops: "4 điểm đến",
    cost: "450k/người",
    desc: "Nhiều món, chi phí dễ chịu",
    mood: "Ăn ngon",
    cta: "Bình chọn",
    bg: "bg-white",
    textColor: "text-ink",
  },
  {
    id: 3,
    tag: "Nhẹ nhàng",
    title: "Picnic + boardgame",
    time: "15:30",
    stops: "2 điểm đến",
    cost: "260k/người",
    desc: "Ít đi chuyển, hợp buổi nhẹ nhàng",
    mood: "Nhẹ nhàng",
    cta: "Bình chọn",
    bg: "bg-white",
    textColor: "text-ink",
  },
];

export default function Suggested() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col max-w-md mx-auto">
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

        {/* Title */}
        <h1 className="text-[26px] font-bold text-ink mb-2">Chọn lịch trình hợp gu</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          3 gợi ý được tối ưu theo mood, ngân sách và thời gian của nhóm.
        </p>

        {/* Plan Cards */}
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${plan.bg} rounded-[20px] p-5 mb-4 border ${plan.id === 1 ? "" : "border-border/30"}`}
          >
            <span className={`text-[11px] font-semibold tracking-wider uppercase ${plan.id === 1 ? "text-white/70" : "text-coral"}`}>
              {plan.tag}
            </span>
            <h3 className={`text-[20px] font-bold mt-1 mb-2 ${plan.textColor}`}>{plan.title}</h3>
            <p className={`text-[13px] ${plan.id === 1 ? "text-white/80" : "text-muted-foreground"} mb-1`}>
              {plan.time} • {plan.stops} • {plan.cost}
            </p>
            <p className={`text-[13px] ${plan.id === 1 ? "text-white/80" : "text-muted-foreground"} mb-3`}>
              {plan.desc}
            </p>
            <div className="flex gap-2">
              <span className={`px-3 py-1.5 rounded-full text-[12px] font-medium border ${
                plan.id === 1
                  ? "bg-white/20 text-white border-white/30"
                  : "bg-sage/10 text-sage border-sage/30"
              }`}>
                {plan.mood}
              </span>
              <button
                onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold ${
                  plan.id === 1
                    ? "bg-coral text-white"
                    : "bg-white text-sage border border-sage/30"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
