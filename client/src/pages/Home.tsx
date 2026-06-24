import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import PageHeader from "@/components/PageHeader";
import { MapPin, Calendar, Vote, Heart, Sparkles, TrendingUp } from "lucide-react";

/* ============================================================
   HOME PAGE — Spatial AI Dashboard, Bento Grid, Ambient Glows
   ============================================================ */

const cardStagger = (i: number) => ({
  delay: 0.1 + i * 0.08,
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
});

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5">
      {/* Page Header */}
      <PageHeader
        label="GatherGo"
        title="Chào Nghĩa 👋"
        delay={0}
      />

      {/* Group Mood Pulse — Dark AI Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(0)}
        className="glass-dark p-3 mb-4 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-champagne" />
        </div>
        <div>
          <p className="text-label text-white">Today's Gather Pulse</p>
          <p className="text-[11px] text-mint/70">Nhóm đang hào hứng — 3 plan sẵn sàng</p>
        </div>
        <div className="ml-auto flex -space-x-1.5">
          <div className="w-6 h-6 rounded-full bg-mint/40 border border-white/30" />
          <div className="w-6 h-6 rounded-full bg-coral/40 border border-white/30" />
          <div className="w-6 h-6 rounded-full bg-champagne/40 border border-white/30" />
        </div>
      </motion.div>

      {/* Hero Card — Cinematic Dark with Ambient Glow */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={cardStagger(1)}
        whileHover={{ scale: 1.02, y: -2 }}
        className="ambient-glow-gold"
      >
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/plan-detail")}
          className="w-full rounded-3xl overflow-hidden mb-5 relative shadow-xl focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-2 focus:ring-offset-cream"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop bar"
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="glow-chip bg-white/10 text-white/80 mb-2">
              <Sparkles className="w-3 h-3 text-champagne" />
              Gợi ý hợp mood
            </div>
            <h2 className="text-hero text-white mt-1">Rooftop chill night</h2>
            <p className="text-body text-white/70 mt-1">18:30 • 3 điểm đến • 520k/người</p>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-label text-white border border-white/15">
                Hợp mood nhất
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-label text-white border border-white/15">
                Ảnh đẹp
              </span>
            </div>
          </div>
          {/* Floating vote chip */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-coral/90 backdrop-blur-md text-label text-white"
          >
            2 bạn đang vote
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Predictive Action Island — AI CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(2)}
      >
        <GlowButton
          onClick={() => setLocation("/create-plan")}
          icon={<Sparkles className="w-4 h-4" />}
          size="lg"
        >
          Tạo Gather mới
        </GlowButton>
      </motion.div>

      {/* Bento Grid — Asymmetric Spatial Layout */}
      <div className="bento-asymmetric mb-4">
        {/* Primary: Large feature card */}
        <GlassCard
          onClick={() => setLocation("/suggested")}
          ambient="mint"
          delay={0.1}
          className="p-5 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-mint/15 flex items-center justify-center mb-2">
            <MapPin className="w-5 h-5 text-mint" />
          </div>
          <p className="text-title text-ink">Gợi ý gần tôi</p>
          <p className="text-body text-clay mt-0.5">Quán hot gần bạn</p>
        </GlassCard>

        {/* Secondary: Compact */}
        <GlassCard
          onClick={() => setLocation("/plan")}
          ambient="coral"
          delay={0.2}
          className="p-3 cursor-pointer flex flex-col items-center justify-center text-center"
        >
          <div className="w-8 h-8 rounded-xl bg-coral/15 flex items-center justify-center mb-1">
            <Calendar className="w-4 h-4 text-coral" />
          </div>
          <p className="text-label text-ink">Plan</p>
          <p className="text-micro text-clay">2 sẵn</p>
        </GlassCard>
      </div>

      {/* Second Row: Two equal cards */}
      <div className="bento mb-4">
        <GlassCard
          onClick={() => setLocation("/vote")}
          delay={0.3}
          className="p-4 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-mint/15 flex items-center justify-center mb-2">
            <Vote className="w-5 h-5 text-mint" />
          </div>
          <p className="text-title text-ink">Join bằng mã</p>
          <p className="text-body text-clay mt-0.5">Vào plan bạn gửi</p>
        </GlassCard>

        <GlassCard
          onClick={() => setLocation("/memories")}
          ambient="gold"
          delay={0.4}
          className="p-4 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-coral/15 flex items-center justify-center mb-2">
            <Heart className="w-5 h-5 text-coral" />
          </div>
          <p className="text-title text-ink">Kỷ niệm</p>
          <p className="text-body text-clay mt-0.5">Đêm rooftop</p>
        </GlassCard>
      </div>

      {/* Pet Status — Floating AI notification */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 rounded-2xl px-4 py-3 border border-white/50 backdrop-blur-md bg-white/40"
      >
        <div className="w-2 h-2 rounded-full bg-mint animate-pulse" />
        <p className="text-body text-mint">
          GoPet đang vui vì bạn vừa lưu kỷ niệm.
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
