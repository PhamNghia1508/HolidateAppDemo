import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 flex flex-col px-6 py-4 overflow-hidden relative">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-sm font-medium text-[#FAFAFA]">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-[#FAFAFA]" />
          <div className="w-1 h-1 rounded-full bg-[#FAFAFA]" />
          <div className="w-4 h-2 rounded-sm border border-[#FAFAFA] bg-[#FAFAFA]" />
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4 relative z-10">
        <div className="page-label">GatherGo</div>
      </div>

      {/* Hero with image */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[260px] rounded-2xl overflow-hidden mb-6 shadow-2xl"
      >
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop"
          alt="Friends gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/40 to-transparent" />

        {/* Floating stats */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 px-3 py-2 rounded-xl backdrop-blur-xl bg-[#121214]/80 border border-white/10 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-[#00E5A8]" />
            <span className="text-xs font-semibold text-[#FAFAFA]">3 plan sẵn sàng</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-12 right-4 px-3 py-2 rounded-xl backdrop-blur-xl bg-[#121214]/80 border border-white/10 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-[#00E5A8]" />
            <span className="text-xs font-semibold text-[#FAFAFA]">4 bạn đang vote</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-8 px-3 py-2 rounded-xl backdrop-blur-xl bg-[#121214]/80 border border-white/10 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-[#00E5A8]" />
            <span className="text-xs font-semibold text-[#FAFAFA]">Đã lưu kỷ niệm</span>
          </div>
        </motion.div>

        {/* Avatar stack */}
        <div className="absolute bottom-4 right-6 flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#00E5A8]/30 border-2 border-[#09090B]" />
          <div className="w-8 h-8 rounded-full bg-[#A1A1AA]/30 border-2 border-[#09090B]" />
          <div className="w-8 h-8 rounded-full bg-[#71717A]/30 border-2 border-[#09090B]" />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-display text-[#FAFAFA] leading-[1.05] mb-3">
          Plan đi chơi{" "}
          <span className="block mt-1">
            cùng nhau,{" "}
            <span className="text-[#00E5A8]">dễ hơn bao giờ hết</span>
          </span>
        </h1>

        <p className="text-lead text-[#A1A1AA] leading-relaxed mb-6">
          Chọn nhóm, mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </p>

        {/* Pills */}
        <div className="flex gap-3 mb-8">
          {["Gợi ý nhanh", "Vote cùng nhóm", "Lưu kỷ niệm"].map((text, i) => (
            <span
              key={text}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                i === 0
                  ? "bg-[#FAFAFA] text-[#09090B] border-[#FAFAFA]"
                  : "bg-[#121214] text-[#00E5A8] border-white/10"
              }`}
            >
              {text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/home")}
          className="w-full h-[56px] premium-cta"
        >
          Bắt đầu tạo Gather
        </motion.button>

        <p className="text-center text-body text-[#71717A] mt-4">
          Không feed công khai. Không chat lòng vòng.
        </p>
      </motion.div>

      {/* Home indicator */}
      <div className="flex justify-center mt-auto mb-2">
        <div className="w-[120px] h-[4px] rounded-full bg-[#3F3F46]" />
      </div>
    </div>
  );
}
