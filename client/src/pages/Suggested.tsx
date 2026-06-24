import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import SpatialCard from "@/components/SpatialCard";
import SpringButton from "@/components/SpringButton";

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
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=240&fit=crop",
    highlight: true,
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
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=240&fit=crop",
    highlight: false,
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
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=240&fit=crop",
    highlight: false,
  },
];

export default function Suggested() {
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

        {/* Title */}
        <h1 className="text-[26px] font-bold text-ink mb-2">Chọn lịch trình hợp gu</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          3 gợi ý được tối ưu theo mood, ngân sách và thời gian của nhóm.
        </p>

        {/* Plan Cards with images */}
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.15, type: "spring", stiffness: 300, damping: 24 }}
            whileHover={{ scale: 1.02, y: -3, transition: { type: "spring", stiffness: 400 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[20px] overflow-hidden mb-4 cursor-pointer relative shadow-md border border-white/40"
            onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}
          >
            {/* Image header */}
            <div className="relative h-[140px] overflow-hidden">
              <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-white/80">
                  {plan.tag}
                </span>
                <h3 className="text-[20px] font-bold text-white mt-0.5">{plan.title}</h3>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 backdrop-blur-md bg-white/70">
              <p className="text-[13px] text-muted-foreground mb-1">
                {plan.time} • {plan.stops} • {plan.cost}
              </p>
              <p className="text-[13px] text-muted-foreground mb-3">{plan.desc}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-full bg-sage/10 text-sage text-[12px] font-medium border border-sage/20">
                  {plan.mood}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote");
                  }}
                  className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-white shadow-sm"
                  style={{
                    background: plan.highlight
                      ? "linear-gradient(135deg, #e76f51, #f4a261)"
                      : "linear-gradient(135deg, #4a7c59, #2a9d8f)",
                  }}
                >
                  {plan.cta}
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
