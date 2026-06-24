import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Sparkles, Plus, Star, Clock, MapPin } from "lucide-react";

export default function Memories() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,35,30,0.08) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(255,107,74,0.06) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5 relative z-10">
        {/* Header */}
        <div className="pt-5 mb-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
            Kỷ niệm
          </div>
          <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">Memory Vault</h1>
          <p className="text-[14px] text-[#7B6658] mt-1">
            Kỷ ức của chuyến đi được gom lại thành album, note và recap.
          </p>
        </div>

        {/* Album Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5" style={{ gridAutoRows: "minmax(0, 1fr)" }}>
          {[
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300&h=200&fit=crop",
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=300&h=200&fit=crop",
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="h-[120px] rounded-[20px] overflow-hidden cursor-pointer shadow-lg"
            >
              <img src={img} alt={`memory ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Memory Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="premium-glass-card p-4 mb-3"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <h3 className="text-[16px] font-bold text-[#231F1B]">Đêm rooftop đầu hè</h3>
          <p className="text-[12px] text-[#7B6658]">12 ảnh • 3 địa điểm • 4 người</p>
        </motion.div>

        {/* AI Recap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="premium-glass-card p-4 mb-3"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 40px rgba(243,211,122,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
            background: "rgba(255,248,239,0.7)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-[#F3D37A]" />
            </motion.div>
            <span className="text-[11px] font-semibold text-[#4a7c59] bg-[#4a7c59]/10 px-2 py-0.5 rounded-full">AI recap</span>
            <span className="text-[11px] text-[#7B6658]">Tạo từ Gather đã chốt</span>
          </div>
          <p className="text-[13px] text-[#231F1B] leading-relaxed">
            Một buổi tối chill đúng nghĩa — cả nhóm ăn nhẹ, ngắm thành phố và kịp sẵn vài tấm ảnh đẹp.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="premium-glass-card p-4 mb-5"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="flex items-center justify-between">
            {[
              { icon: MapPin, value: "3", label: "Stops" },
              { icon: Star, value: "4", label: "People" },
              { icon: Clock, value: "520k", label: "Each" },
            ].map((s, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <s.icon className="w-4 h-4 text-[#4a7c59] mb-1" />
                <p className="text-[16px] font-bold text-[#231F1B]">{s.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7B6658] opacity-60">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Note + FAB */}
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-[#4a7c59]">Lần sau săn hoàng hôn.</p>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #FF6B4A, #FF8A4C)",
              boxShadow: "0 4px 16px rgba(255,107,74,0.3)",
            }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
