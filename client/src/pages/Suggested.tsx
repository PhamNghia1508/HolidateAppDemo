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
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,35,30,0.06) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <div className="pt-5 mb-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
            Gợi ý
          </div>
          <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">Chọn lịch trình hợp gu</h1>
          <p className="text-[14px] text-[#7B6658] mt-1">
            3 gợi ý được tối ưu theo mood, ngân sách và thời gian của nhóm.
          </p>
        </div>

        {/* Plan Cards */}
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.15, type: "spring", stiffness: 300, damping: 24 }}
            whileHover={{ scale: 1.02, y: -3, transition: { type: "spring", stiffness: 400 } }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[24px] overflow-hidden mb-4 cursor-pointer relative shadow-lg border border-white/40"
            onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}
          >
            {/* Image header */}
            <div className="relative h-[150px] overflow-hidden">
              <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10231E]/70 via-[#10231E]/20 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70">
                  {plan.tag}
                </span>
                <h3 className="text-[20px] font-black text-white mt-0.5 tracking-tight">{plan.title}</h3>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 backdrop-blur-md bg-white/60">
              <p className="text-[13px] text-[#7B6658] mb-1">
                {plan.time} • {plan.stops} • {plan.cost}
              </p>
              <p className="text-[13px] text-[#7B6658] mb-3">{plan.desc}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#4a7c59]/10 text-[#4a7c59] text-[12px] font-medium border border-[#4a7c59]/15">
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
                      ? "linear-gradient(135deg, #FF6B4A, #FF8A4C)"
                      : "linear-gradient(135deg, #4a7c59, #65C6A2)",
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
