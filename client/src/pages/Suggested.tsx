import { useLocation } from "wouter";
import { motion } from "framer-motion";
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
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      <div className="ambient-mint-blur top-20 left-1/2 -translate-x-1/2" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="pt-6 mb-5"
      >
        <div className="page-label mb-1">Gợi ý</div>
        <h1 className="text-heading text-[#FAFAFA] tracking-tight font-black">Chọn lịch trình hợp gu</h1>
        <p className="text-body text-[#A1A1AA] mt-1">
          3 gợi ý được tối ưu theo mood, ngân sách và thời gian của nhóm.
        </p>
      </motion.div>

      {/* Plan Cards */}
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.12, type: "spring", stiffness: 400, damping: 30 }}
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl overflow-hidden mb-4 cursor-pointer relative border border-white/10"
          onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}
        >
          {/* Image header */}
          <div className="relative h-[150px] overflow-hidden">
            <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-[#09090B]/30 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-micro tracking-[0.2em] uppercase text-white/60">
                {plan.tag}
              </span>
              <h3 className="text-[20px] font-black text-white mt-0.5 tracking-tight">{plan.title}</h3>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 bg-[#121214]">
            <p className="text-body text-[#71717A] mb-1">
              {plan.time} • {plan.stops} • {plan.cost}
            </p>
            <p className="text-body text-[#71717A] mb-3">{plan.desc}</p>
            <div className="flex gap-2">
              <span className="px-3 py-1.5 rounded-full bg-[#00E5A8]/10 text-[#00E5A8] text-[12px] font-medium border border-[#00E5A8]/15">
                {plan.mood}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote");
                }}
                className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-[#09090B] shadow-sm"
                style={{
                  background: plan.highlight ? "#FAFAFA" : "#00E5A8",
                }}
              >
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
