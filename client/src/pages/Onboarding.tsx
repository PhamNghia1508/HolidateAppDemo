import { useLocation } from "wouter";
import { motion } from "framer-motion";
import GlowButton from "@/components/GlowButton";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 flex flex-col px-6 py-4 overflow-hidden relative">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-sm font-medium text-ink">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-ink" />
          <div className="w-1 h-1 rounded-full bg-ink" />
          <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4 relative z-10">
        <div className="premium-label">GatherGo</div>
      </div>

      {/* Hero with image */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[260px] rounded-3xl overflow-hidden mb-6 shadow-2xl"
      >
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop"
          alt="Friends gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-emerald/30 to-transparent" />

        {/* Floating stats */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-coral" />
            <span className="text-xs font-semibold text-ink">3 plan sẵn sàng</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-12 right-4 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-mint" />
            <span className="text-xs font-semibold text-ink">4 bạn đang vote</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-8 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-champagne" />
            <span className="text-xs font-semibold text-ink">Đã lưu kỷ niệm</span>
          </div>
        </motion.div>

        {/* Glowing path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <motion.path
            d="M 80 40 Q 160 80 280 60"
            stroke="url(#glowPath)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4 6"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="glowPath" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--coral))" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(var(--champagne))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--mint))" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Avatar stack */}
        <div className="absolute bottom-4 right-6 flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-mint/50 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-coral/50 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-champagne/50 border-2 border-white" />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-display text-ink leading-[1.05] mb-3">
          Plan đi chơi{" "}
          <span className="block mt-1">
            cùng nhau,{" "}
            <span className="bg-gradient-to-r from-coral to-champagne bg-clip-text text-transparent">
              dễ hơn bao giờ hết
            </span>
          </span>
        </h1>

        <p className="text-lead text-clay leading-relaxed mb-6">
          Chọn nhóm, mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </p>

        {/* Pills */}
        <div className="flex gap-3 mb-8">
          {["Gợi ý nhanh", "Vote cùng nhóm", "Lưu kỷ niệm"].map((text, i) => (
            <span
              key={text}
              className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${
                i === 0
                  ? "bg-emerald-deep text-white border-emerald-deep/50 shadow-md"
                  : "bg-white/70 text-mint border-white/60 shadow-sm"
              }`}
            >
              {text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <GlowButton onClick={() => setLocation("/home")} size="lg">
          Bắt đầu tạo Gather
        </GlowButton>

        <p className="text-center text-body text-clay mt-4">
          Không feed công khai. Không chat lòng vòng.
        </p>
      </motion.div>

      {/* Home indicator */}
      <div className="flex justify-center mt-auto mb-2">
        <div className="w-[120px] h-[4px] rounded-full bg-ink/20" />
      </div>
    </div>
  );
}
