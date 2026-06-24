import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Vote, Heart, Sparkles, TrendingUp } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #FFF7EA 0%, #F6EDE1 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <div className="flex items-center justify-between pt-5 mb-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#78675B] opacity-60">
              GatherGo
            </div>
            <h1 className="text-[22px] font-black text-[#201B17] tracking-tight mt-0.5">
              Chào Nghĩa <span className="text-[20px]">👋</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#62C9A5] bg-[#62C9A5]/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-[#62C9A5]/15">
              1 plan đang chờ vote
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#62C9A5] to-[#0F2D25]" />
          </div>
        </div>

        {/* Group Mood Pulse */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dark-hero-card p-3 mb-4 flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-[#F4D06F]/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#F4D06F]" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-white">Today's Gather Pulse</p>
            <p className="text-[11px] text-[#62C9A5]/70">Nhóm đang hào hứng — 3 plan sẵn sàng</p>
          </div>
          <div className="ml-auto flex -space-x-1.5">
            <div className="w-6 h-6 rounded-full bg-[#62C9A5]/40 border border-white/30" />
            <div className="w-6 h-6 rounded-full bg-[#FF6848]/40 border border-white/30" />
            <div className="w-6 h-6 rounded-full bg-[#F4D06F]/40 border border-white/30" />
          </div>
        </motion.div>

        {/* Hero Card — Dark Cinematic */}
        <motion.div
          whileHover={{ scale: 1.02, y: -2 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full rounded-[28px] overflow-hidden mb-5 relative cursor-pointer shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop bar"
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F1A]/90 via-[#071F1A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="glow-chip bg-white/10 text-white/80 mb-2">
              <Sparkles className="w-3 h-3 text-[#F4D06F]" />
              Gợi ý hợp mood
            </div>
            <h2 className="text-[24px] font-black text-white tracking-tight">Rooftop chill night</h2>
            <p className="text-[13px] text-white/70 mt-1">18:30 • 3 điểm đến • 520k/người</p>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-medium text-white border border-white/15">
                Hợp mood nhất
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-medium text-white border border-white/15">
                Ảnh đẹp
              </span>
            </div>
          </div>
          {/* Floating vote chip */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FF6848]/90 backdrop-blur-md text-[10px] font-semibold text-white"
          >
            2 bạn đang vote
          </motion.div>
        </motion.div>

        {/* Premium CTA */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/create-plan")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 mb-6 gradient-cta"
        >
          <Sparkles className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Tạo Gather mới</span>
        </motion.button>

        {/* Bento — varied sizes */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {/* Large card spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLocation("/suggested")}
            className="premium-glass-card p-4 cursor-pointer col-span-2"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 40px rgba(98,201,165,0.08), inset 0 1px 0 rgba(255,255,255,0.4)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#62C9A5]/15 flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5 text-[#62C9A5]" />
            </div>
            <p className="text-[14px] font-bold text-[#201B17]">Gợi ý gần tôi</p>
            <p className="text-[12px] text-[#78675B]">Quán hot gần bạn</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLocation("/plan")}
            className="premium-glass-card p-3 cursor-pointer flex flex-col items-center justify-center text-center"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 30px rgba(255,104,72,0.08)" }}
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF6848]/15 flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-[#FF6848]" />
            </div>
            <p className="text-[12px] font-bold text-[#201B17]">Plan</p>
            <p className="text-[10px] text-[#78675B]">2 sẵn</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLocation("/vote")}
            className="premium-glass-card p-4 cursor-pointer"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#62C9A5]/15 flex items-center justify-center mb-2">
              <Vote className="w-5 h-5 text-[#62C9A5]" />
            </div>
            <p className="text-[14px] font-bold text-[#201B17]">Join bằng mã</p>
            <p className="text-[12px] text-[#78675B]">Vào plan bạn gửi</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLocation("/memories")}
            className="premium-glass-card p-4 cursor-pointer"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 40px rgba(244,208,111,0.08), inset 0 1px 0 rgba(255,255,255,0.4)" }}
          >
            <div className="w-9 h-9 rounded-xl bg-[#FF6848]/15 flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-[#FF6848]" />
            </div>
            <p className="text-[14px] font-bold text-[#201B17]">Kỷ niệm</p>
            <p className="text-[12px] text-[#78675B]">Đêm rooftop</p>
          </motion.div>
        </div>

        {/* Pet status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 rounded-[16px] px-4 py-3 border border-white/50 backdrop-blur-md bg-white/40"
        >
          <div className="w-2 h-2 rounded-full bg-[#62C9A5] animate-pulse" />
          <p className="text-[13px] text-[#62C9A5]">
            GoPet đang vui vì bạn vừa lưu kỷ niệm.
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
