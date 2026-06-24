import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Vote, Heart, Sparkles, TrendingUp } from "lucide-react";

const cardStagger = (i: number) => ({
  delay: 0.08 + i * 0.06,
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
});

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      {/* Ambient mint blur */}
      <div className="ambient-mint-blur top-20 left-1/2 -translate-x-1/2" />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="pt-6 mb-5"
      >
        <div className="page-label mb-1">GatherGo</div>
        <h1 className="text-heading text-[#FAFAFA] tracking-tight font-black">
          Chào Nghĩa
        </h1>
      </motion.div>

      {/* Group Mood Pulse — Dark card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(0)}
        className="obsidian-card p-3 mb-4 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-[#00E5A8]/10 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-[#00E5A8]" />
        </div>
        <div>
          <p className="text-label text-[#FAFAFA]">Today's Gather Pulse</p>
          <p className="text-[11px] text-[#71717A]">Nhóm đang hào hứng — 3 plan sẵn sàng</p>
        </div>
        <div className="ml-auto flex -space-x-1.5">
          <div className="w-6 h-6 rounded-full bg-[#00E5A8]/20 border border-[#00E5A8]/30" />
          <div className="w-6 h-6 rounded-full bg-[#A1A1AA]/20 border border-[#A1A1AA]/30" />
          <div className="w-6 h-6 rounded-full bg-[#71717A]/20 border border-[#71717A]/30" />
        </div>
      </motion.div>

      {/* Hero Card — Cinematic with overlay */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={cardStagger(1)}
        whileHover={{ scale: 1.01, y: -1 }}
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full rounded-2xl overflow-hidden mb-5 relative shadow-xl focus:outline-none"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop bar"
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-white/80 mb-2 w-fit">
              <Sparkles className="w-3 h-3 text-[#00E5A8]" />
              Gợi ý hợp mood
            </div>
            <h2 className="text-hero text-white mt-1">Rooftop chill night</h2>
            <p className="text-body text-white/60 mt-1">18:30 • 3 điểm đến • 520k/người</p>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-label text-white border border-white/10">
                Hợp mood nhất
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-label text-white border border-white/10">
                Ảnh đẹp
              </span>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#00E5A8]/90 text-label text-[#09090B] font-semibold"
          >
            2 bạn đang vote
          </motion.div>
        </motion.button>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(2)}
        className="mb-5"
      >
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/create-plan")}
          className="w-full h-[52px] premium-cta-mint flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Tạo Gather mới
        </motion.button>
      </motion.div>

      {/* Bento Grid */}
      <div className="bento-asymmetric mb-3">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardStagger(3)}
          whileTap={{ scale: 0.97 }}
          onClick={() => setLocation("/suggested")}
          className="obsidian-card p-5 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00E5A8]/10 flex items-center justify-center mb-2">
            <MapPin className="w-5 h-5 text-[#00E5A8]" />
          </div>
          <p className="text-title text-[#FAFAFA]">Gợi ý gần tôi</p>
          <p className="text-body text-[#71717A] mt-0.5">Quán hot gần bạn</p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardStagger(4)}
          whileTap={{ scale: 0.97 }}
          onClick={() => setLocation("/plan")}
          className="obsidian-card p-3 flex flex-col items-center justify-center text-center"
        >
          <div className="w-8 h-8 rounded-xl bg-[#00E5A8]/10 flex items-center justify-center mb-1">
            <Calendar className="w-4 h-4 text-[#00E5A8]" />
          </div>
          <p className="text-label text-[#FAFAFA]">Plan</p>
          <p className="text-micro text-[#71717A]">2 sẵn</p>
        </motion.button>
      </div>

      <div className="bento mb-3">
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardStagger(5)}
          whileTap={{ scale: 0.97 }}
          onClick={() => setLocation("/vote")}
          className="obsidian-card p-4 text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-[#00E5A8]/10 flex items-center justify-center mb-2">
            <Vote className="w-5 h-5 text-[#00E5A8]" />
          </div>
          <p className="text-title text-[#FAFAFA]">Join bằng mã</p>
          <p className="text-body text-[#71717A] mt-0.5">Vào plan bạn gửi</p>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardStagger(6)}
          whileTap={{ scale: 0.97 }}
          onClick={() => setLocation("/memories")}
          className="obsidian-card p-4 text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-[#00E5A8]/10 flex items-center justify-center mb-2">
            <Heart className="w-5 h-5 text-[#00E5A8]" />
          </div>
          <p className="text-title text-[#FAFAFA]">Kỷ niệm</p>
          <p className="text-body text-[#71717A] mt-0.5">Đêm rooftop</p>
        </motion.button>
      </div>

      {/* Pet Status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/10 bg-[#121214]/80"
      >
        <div className="w-2 h-2 rounded-full bg-[#00E5A8] animate-pulse" />
        <p className="text-body text-[#00E5A8]">GoPet đang vui vì bạn vừa lưu kỷ niệm.</p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
