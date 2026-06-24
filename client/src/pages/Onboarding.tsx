import { useLocation } from "wouter";
import { motion } from "framer-motion";
import SpatialCard from "@/components/SpatialCard";
import SpringButton from "@/components/SpringButton";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #f3eee8 0%, #e8ddd3 50%, #f3eee8 100%)",
      }}
    >
      {/* Decorative blurred blobs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-coral/20 blur-[80px]" />
      <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-sage/15 blur-[60px]" />
      <div className="absolute bottom-20 right-0 w-50 h-50 rounded-full bg-yellow/20 blur-[70px]" />

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
      <p className="text-sm font-medium text-sage mb-4 relative z-10">GatherGo</p>

      {/* Hero with image */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[240px] rounded-[24px] overflow-hidden mb-6 shadow-2xl shadow-sage/20"
      >
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop"
          alt="Friends gathering"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Floating stats cards - glassmorphism */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-4 px-3 py-2 rounded-xl backdrop-blur-md bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-coral" />
            <span className="text-xs font-semibold text-ink">3 plan sẵn sàng</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-12 right-4 px-3 py-2 rounded-xl backdrop-blur-md bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-sage" />
            <span className="text-xs font-semibold text-ink">4 bạn đang vote</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 left-8 px-3 py-2 rounded-xl backdrop-blur-md bg-white/80 border border-white/50 shadow-lg"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-6 rounded-full bg-yellow" />
            <span className="text-xs font-semibold text-ink">Đã lưu kỷ niệm</span>
          </div>
        </motion.div>

        {/* Avatar stack */}
        <div className="absolute bottom-4 right-6 flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-sage/50 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-coral/50 border-2 border-white" />
          <div className="w-8 h-8 rounded-full bg-yellow/50 border-2 border-white" />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1 className="text-[28px] font-bold text-ink leading-[1.2] mb-3">
          Plan đi chơi cùng nhau,{" "}
          <span className="bg-gradient-to-r from-coral to-amber-500 bg-clip-text text-transparent">
            dễ hơn bao giờ hết
          </span>
        </h1>

        <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
          Chọn nhóm, mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </p>

        {/* Pills - glassmorphism */}
        <div className="flex gap-3 mb-8">
          {["Gợi ý nhanh", "Vote cùng nhóm", "Lưu kỷ niệm"].map((text, i) => (
            <span
              key={text}
              className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${
                i === 0
                  ? "bg-sage/90 text-white border-sage/50 shadow-md shadow-sage/20"
                  : "bg-white/70 text-sage border-white/60 shadow-sm"
              }`}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Spring CTA */}
        <SpringButton onClick={() => setLocation("/home")} data-testid="button-start">
          Bắt đầu tạo Gather
        </SpringButton>

        <p className="text-center text-[13px] text-muted-foreground mt-4">
          Không feed công khai. Không chat lòng vòng.
        </p>
      </motion.div>

      {/* Home indicator */}
      <div className="flex justify-center mt-auto mb-2">
        <div className="w-[120px] h-[4px] rounded-full bg-ink/30" />
      </div>
    </div>
  );
}
