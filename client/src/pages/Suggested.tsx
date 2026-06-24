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
    bg: "bg-gradient-to-br from-sage to-sage/80",
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          className="text-[26px] font-bold text-ink mb-2"
        >
          Chọn lịch trình hợp gu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[14px] text-muted-foreground mb-5"
        >
          3 gợi ý được tối ưu theo mood, ngân sách và thời gian của nhóm.
        </motion.p>

        {/* Plan Cards with staggered animation */}
        <motion.div variants={container} initial="hidden" animate="show">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={item}
              whileHover={{ scale: 1.02, y: -3, transition: { type: "spring", stiffness: 400 } }}
              whileTap={{ scale: 0.98 }}
              className={`${plan.bg} rounded-[20px] p-5 mb-4 border ${plan.id === 1 ? "" : "border-border/30"} cursor-pointer relative overflow-hidden`}
              onClick={() => plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote")}
            >
              {/* Best match badge animation */}
              {plan.id === 1 && (
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}

              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative text-[11px] font-semibold tracking-wider uppercase ${plan.id === 1 ? "text-white/70" : "text-coral"}`}
              >
                {plan.tag}
              </motion.span>
              <h3 className={`relative text-[20px] font-bold mt-1 mb-2 ${plan.textColor}`}>
                {plan.title}
              </h3>
              <p className={`relative text-[13px] ${plan.id === 1 ? "text-white/80" : "text-muted-foreground"} mb-1`}>
                {plan.time} • {plan.stops} • {plan.cost}
              </p>
              <p className={`relative text-[13px] ${plan.id === 1 ? "text-white/80" : "text-muted-foreground"} mb-3`}>
                {plan.desc}
              </p>
              <div className="relative flex gap-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium border ${
                    plan.id === 1
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-sage/10 text-sage border-sage/30"
                  }`}
                >
                  {plan.mood}
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    plan.id === 1 ? setLocation("/plan-detail") : setLocation("/vote");
                  }}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-semibold ${
                    plan.id === 1
                      ? "bg-coral text-white"
                      : "bg-white text-sage border border-sage/30"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
