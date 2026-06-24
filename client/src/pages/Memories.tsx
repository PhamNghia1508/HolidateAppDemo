import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import PageHeader from "@/components/PageHeader";
import { Sparkles, Plus, Star, Clock, MapPin, Zap } from "lucide-react";

export default function Memories() {
  const [, setLocation] = useLocation();

  const memories = [
    { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop", caption: "Rooftop", size: "large" },
    { img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop", caption: "Party", size: "small" },
    { img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300&h=200&fit=crop", caption: "Dinner", size: "small" },
    { img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=300&h=200&fit=crop", caption: "Night", size: "large" },
  ];

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5">
      <PageHeader
        label="Kỷ niệm"
        title="Memory Vault"
        subtitle="Kỷ ức của chuyến đi được gom lại thành album, note và recap."
      />

      {/* Memory Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-dark p-3 mb-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-champagne/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-champagne" />
        </div>
        <div>
          <p className="text-label text-white">Vibe captured</p>
          <p className="text-[11px] text-mint/70">12 kỷ niệm • 48 ảnh • 5 streak</p>
        </div>
        <div className="ml-auto text-[20px] font-black text-champagne">87</div>
      </motion.div>

      {/* Editorial Album Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5" style={{ gridAutoRows: "minmax(0, 1fr)" }}>
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-[20px] overflow-hidden cursor-pointer shadow-lg relative ${m.size === "large" ? "h-[140px]" : "h-[110px]"}`}
          >
            <img src={m.img} alt={m.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3">
              <span className="text-[11px] font-semibold text-white/90">{m.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Title */}
      <GlassCard delay={0.4} className="p-4 mb-3">
        <h3 className="text-title text-ink">Đêm rooftop đầu hè</h3>
        <p className="text-body text-clay">12 ảnh • 3 địa điểm • 4 người</p>
      </GlassCard>

      {/* AI Recap */}
      <GlassCard dark delay={0.5} className="p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-champagne" />
          </motion.div>
          <span className="text-[11px] font-semibold text-champagne bg-champagne/15 px-2 py-0.5 rounded-full">AI recap</span>
          <span className="text-[11px] text-mint/70">Tạo từ Gather đã chốt</span>
        </div>
        <p className="text-body text-white/90 leading-relaxed">
          Một buổi tối chill đúng nghĩa — cả nhóm ăn nhẹ, ngắm thành phố và kịp sẵn vài tấm ảnh đẹp.
        </p>
      </GlassCard>

      {/* Stats */}
      <GlassCard delay={0.6} className="p-4 mb-5">
        <div className="flex items-center justify-between">
          {[
            { icon: MapPin, value: "3", label: "Stops" },
            { icon: Star, value: "4", label: "People" },
            { icon: Clock, value: "520k", label: "Each" },
          ].map((s, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center mb-1">
                <s.icon className="w-4 h-4 text-mint" />
              </div>
              <p className="text-[16px] font-black text-ink">{s.value}</p>
              <p className="text-micro text-clay">{s.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Note + FAB */}
      <div className="flex items-center justify-between">
        <p className="text-body text-mint">Lần sau săn hoàng hôn.</p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full text-white flex items-center justify-center gradient-cta focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-2 focus:ring-offset-cream"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
