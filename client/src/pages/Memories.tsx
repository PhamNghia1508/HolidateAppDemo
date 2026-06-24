import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Sparkles, Plus, Star, Clock, MapPin } from "lucide-react";

export default function Memories() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative"
      style={{
        background: "linear-gradient(180deg, #f3eee8 0%, #e8e0d6 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-32 h-32 rounded-full bg-coral/10 blur-[50px]" />

      <div className="flex-1 overflow-y-auto pb-24 px-6 relative z-10">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[26px] font-bold text-ink mb-2">Memory Vault</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          Ký ức của chuyến đi được gom lại thành album, note và recap.
        </p>

        {/* Album Grid - with real images */}
        <div className="grid grid-cols-2 gap-3 mb-5">
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
              className="h-[110px] rounded-[16px] overflow-hidden cursor-pointer shadow-md"
            >
              <img src={img} alt={`memory ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        {/* Memory Title Card - Glassmorphism */}
        <div className="rounded-[16px] p-4 border border-white/60 backdrop-blur-md bg-white/60 mb-4">
          <h3 className="text-[16px] font-bold text-ink mb-1">Đêm rooftop đầu hè</h3>
          <p className="text-[12px] text-muted-foreground">12 ảnh • 3 địa điểm • 4 người</p>
        </div>

        {/* AI Recap with sparkle */}
        <div className="rounded-[16px] p-4 mb-4 border border-white/60 backdrop-blur-md bg-white/60">
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-sage" />
            </motion.div>
            <span className="text-[11px] font-semibold text-sage bg-sage/10 px-2 py-0.5 rounded-full">AI recap</span>
            <span className="text-[11px] text-muted-foreground">Tạo từ Gather đã chốt</span>
          </div>
          <p className="text-[13px] text-ink leading-relaxed">
            Một buổi tối chill đúng nghĩa — cả nhóm ăn nhẹ, ngắm thành phố và kịp sẵn vài tấm ảnh đẹp.
          </p>
        </div>

        {/* Stats - Glassmorphism */}
        <div className="flex items-center justify-between rounded-[16px] p-4 border border-white/60 backdrop-blur-md bg-white/60 mb-4">
          {[
            { icon: MapPin, value: "3", label: "Stops" },
            { icon: Star, value: "4", label: "People" },
            { icon: Clock, value: "520k", label: "Each" },
          ].map((s, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <s.icon className="w-4 h-4 text-sage mb-1" />
              <p className="text-[16px] font-bold text-ink">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Note + FAB */}
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-sage">Lần sau săn hoàng hôn.</p>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg shadow-coral/30"
            style={{
              background: "linear-gradient(135deg, #e76f51, #f4a261)",
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
