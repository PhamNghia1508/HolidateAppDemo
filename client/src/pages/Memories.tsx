import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Sparkles, Plus, Star, Clock, MapPin, Zap } from "lucide-react";

export default function Memories() {
  const [, setLocation] = useLocation();

  const memories = [
    { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop", caption: "Rooftop", size: "large" },
    { img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop", caption: "Party", size: "small" },
    { img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300&h=200&fit=crop", caption: "Dinner", size: "small" },
    { img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=300&h=200&fit=crop", caption: "Night", size: "large" },
  ];

  const cardStagger = (i: number) => ({
    delay: i * 0.08,
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  });

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      <div className="ambient-mint-blur top-20 left-1/2 -translate-x-1/2" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="pt-6 mb-5"
      >
        <div className="page-label mb-1">Kỷ niệm</div>
        <h1 className="text-heading text-[#FAFAFA] tracking-tight font-black">Memory Vault</h1>
        <p className="text-body text-[#A1A1AA] mt-1">
          Kỷ ức của chuyến đi được gom lại thành album, note và recap.
        </p>
      </motion.div>

      {/* Memory Score */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(0)}
        className="obsidian-card-elevated p-3 mb-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-[#00E5A8]/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-[#00E5A8]" />
        </div>
        <div>
          <p className="text-label text-[#FAFAFA]">Vibe captured</p>
          <p className="text-[11px] text-[#71717A]">12 kỷ niệm • 48 ảnh • 5 streak</p>
        </div>
        <div className="ml-auto text-[20px] font-black text-[#00E5A8]">87</div>
      </motion.div>

      {/* Editorial Album Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5" style={{ gridAutoRows: "minmax(0, 1fr)" }}>
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cardStagger(i + 1)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-2xl overflow-hidden cursor-pointer shadow-lg relative ${m.size === "large" ? "h-[140px]" : "h-[110px]"}`}
          >
            <img src={m.img} alt={m.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-3">
              <span className="text-[11px] font-semibold text-white/90">{m.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(5)}
        className="obsidian-card p-4 mb-3"
      >
        <h3 className="text-title text-[#FAFAFA]">Đêm rooftop đầu hè</h3>
        <p className="text-body text-[#71717A]">12 ảnh • 3 địa điểm • 4 người</p>
      </motion.div>

      {/* AI Recap */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(6)}
        className="obsidian-card-elevated p-4 mb-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-[#00E5A8]" />
          </motion.div>
          <span className="text-[11px] font-semibold text-[#00E5A8] bg-[#00E5A8]/10 px-2 py-0.5 rounded-full border border-[#00E5A8]/20">AI recap</span>
          <span className="text-[11px] text-[#71717A]">Tạo từ Gather đã chốt</span>
        </div>
        <p className="text-body text-[#A1A1AA] leading-relaxed">
          Một buổi tối chill đúng nghĩa — cả nhóm ăn nhẹ, ngắm thành phố và kịp sẵn vài tấm ảnh đẹp.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(7)}
        className="obsidian-card p-4 mb-5"
      >
        <div className="flex items-center justify-between">
          {[
            { icon: MapPin, value: "3", label: "Stops" },
            { icon: Star, value: "4", label: "People" },
            { icon: Clock, value: "520k", label: "Each" },
          ].map((s, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#00E5A8]/10 flex items-center justify-center mb-1">
                <s.icon className="w-4 h-4 text-[#00E5A8]" />
              </div>
              <p className="text-[16px] font-black text-[#FAFAFA]">{s.value}</p>
              <p className="text-micro text-[#71717A]">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Note + FAB */}
      <div className="flex items-center justify-between">
        <p className="text-body text-[#00E5A8]">Lần sau săn hoàng hôn.</p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full text-[#09090B] flex items-center justify-center premium-cta-mint"
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
