import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden relative"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,35,30,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.08) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      {/* Floating blobs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#FF6B4A]/15 blur-[80px]" />
      <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-[#4a7c59]/10 blur-[60px]" />
      <div className="absolute bottom-20 right-0 w-50 h-50 rounded-full bg-[#F3D37A]/15 blur-[70px]" />

      {/* Status bar */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-sm font-medium text-[#231F1B]">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-[#231F1B]" />
          <div className="w-1 h-1 rounded-full bg-[#231F1B]" />
          <div className="w-4 h-2 rounded-sm border border-[#231F1B] bg-[#231F1B]" />
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4 relative z-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
          GatherGo
        </div>
      </div>

      {/* Hero with image */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[260px] rounded-[28px] overflow-hidden mb-6 shadow-2xl"
      >
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop"
          alt="Friends gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10231E]/70 via-[#10231E]/20 to-transparent" />

        {/* Floating stats */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-[#FF6B4A]" />
            <span className="text-xs font-semibold text-[#231F1B]">3 plan sẵn sàng</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-12 right-4 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-[#4a7c59]" />
            <span className="text-xs font-semibold text-[#231F1B]">4 bạn đang vote</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-8 px-3 py-2 rounded-xl backdrop-blur-xl bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-[#F3D37A]" />
            <span className="text-xs font-semibold text-[#231F1B]">Đã lưu kỷ niệm</span>
          </div>
        </motion.div>

        {/* Avatar stack */}
        <div className="absolute bottom-4 right-6 flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-[#4a7c59]/50 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-[#FF6B4A]/50 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-[#F3D37A]/50 border-2 border-white" />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-[28px] font-black text-[#231F1B] leading-[1.2] mb-3 tracking-tight">
          Plan đi chơi cùng nhau,{" "}
          <span className="bg-gradient-to-r from-[#FF6B4A] to-[#F3D37A] bg-clip-text text-transparent">
            dễ hơn bao giờ hết
          </span>
        </h1>

        <p className="text-[15px] text-[#7B6658] leading-relaxed mb-6">
          Chọn nhóm, mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </p>

        {/* Pills */}
        <div className="flex gap-3 mb-8">
          {["Gợi ý nhanh", "Vote cùng nhóm", "Lưu kỷ niệm"].map((text, i) => (
            <span
              key={text}
              className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${
                i === 0
                  ? "bg-[#10231E] text-white border-[#10231E]/50 shadow-md"
                  : "bg-white/70 text-[#4a7c59] border-white/60 shadow-sm"
              }`}
            >
              {text}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/home")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A4C 50%, #F3D37A 100%)",
            boxShadow: "0 8px 32px rgba(255,107,74,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          Bắt đầu tạo Gather
        </motion.button>

        <p className="text-center text-[13px] text-[#7B6658] mt-4">
          Không feed công khai. Không chat lòng vòng.
        </p>
      </motion.div>

      {/* Home indicator */}
      <div className="flex justify-center mt-auto mb-2">
        <div className="w-[120px] h-[4px] rounded-full bg-[#231F1B]/20" />
      </div>
    </div>
  );
}
