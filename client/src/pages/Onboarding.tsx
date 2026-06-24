import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const floatItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
  };

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden">
      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-4"
      >
        <span className="text-sm font-medium text-ink">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-ink" />
          <div className="w-1 h-1 rounded-full bg-ink" />
          <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
        </div>
      </motion.div>

      {/* Brand */}
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="text-sm font-medium text-sage mb-6"
      >
        GatherGo
      </motion.p>

      {/* Hero visual with floating animations */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative w-full h-[270px] rounded-3xl bg-gradient-to-br from-sage-light/70 to-sage-light/30 overflow-hidden mb-8 flex items-center justify-center"
      >
        {/* Animated route map */}
        <svg viewBox="0 0 342 270" className="absolute inset-0 w-full h-full">
          <motion.path
            d="M50 180 Q120 100 200 60 Q280 20 320 50"
            stroke="#4a7c59"
            strokeWidth="2"
            strokeDasharray="8 6"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <motion.circle cx="50" cy="180" r="14" fill="#e8f5e9" stroke="#4a7c59" strokeWidth="2"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: "spring" }} />
          <motion.circle cx="200" cy="60" r="14" fill="#fff3e0" stroke="#e76f51" strokeWidth="2"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.0, type: "spring" }} />
          <motion.circle cx="320" cy="50" r="14" fill="#fce4ec" stroke="#e76f51" strokeWidth="2"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }} />
        </svg>

        {/* Floating bubbles with continuous animation */}
        <motion.div
          variants={floatItem}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 left-6 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-black/5"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-coral" />
            <span className="text-sm font-medium text-ink">3 plan sẵn sàng</span>
          </div>
        </motion.div>

        <motion.div
          variants={floatItem}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-24 right-6 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-black/5"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-sage" />
            <span className="text-sm font-medium text-ink">4 bạn đang vote</span>
          </div>
        </motion.div>

        <motion.div
          variants={floatItem}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-16 left-12 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-black/5"
        >
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-yellow" />
            <span className="text-sm font-medium text-ink">Đã lưu kỷ niệm</span>
          </div>
        </motion.div>

        {/* Avatar stack with bounce */}
        <motion.div
          variants={floatItem}
          className="absolute top-32 left-16 flex -space-x-2"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
            className="w-10 h-10 rounded-full bg-sage/30 border-2 border-white"
          />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            className="w-10 h-10 rounded-full bg-coral/30 border-2 border-white"
          />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
            className="w-10 h-10 rounded-full bg-yellow/30 border-2 border-white"
          />
        </motion.div>
      </motion.div>

      {/* Text content with stagger */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h1
          variants={item}
          className="text-[28px] font-bold text-ink leading-[1.2] mb-3"
        >
          Plan đi chơi cùng nhau,{" "}
          <span className="text-coral">dễ hơn bao giờ hết</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-[15px] text-muted-foreground leading-relaxed mb-6"
        >
          Chọn nhóm, mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </motion.p>

        {/* Pills with bounce */}
        <motion.div variants={item} className="flex gap-3 mb-8">
          {["Gợi ý nhanh", "Vote cùng nhóm", "Lưu kỷ niệm"].map((text, i) => (
            <motion.span
              key={text}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-default ${
                i === 0
                  ? "bg-sage text-white"
                  : "bg-white text-sage border border-sage/20"
              }`}
            >
              {text}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA with pulse effect */}
        <motion.div variants={item}>
          <motion.button
            onClick={() => setLocation("/home")}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors overflow-hidden"
            data-testid="button-start"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Bắt đầu tạo Gather</span>
          </motion.button>
        </motion.div>

        <motion.p
          variants={item}
          className="text-center text-[13px] text-muted-foreground mt-4"
        >
          Không feed công khai. Không chat lòng vòng.
        </motion.p>
      </motion.div>

      {/* Home indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center mt-auto mb-2"
      >
        <div className="w-[120px] h-[4px] rounded-full bg-ink/30" />
      </motion.div>
    </div>
  );
}
