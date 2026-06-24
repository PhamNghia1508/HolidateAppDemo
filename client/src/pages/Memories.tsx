import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Sparkles, Heart, Plus, Camera } from "lucide-react";

export default function Memories() {
  const [, setLocation] = useLocation();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto pb-24 px-6">
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          className="text-[26px] font-bold text-ink mb-2"
        >
          Memory Vault
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[14px] text-muted-foreground mb-5"
        >
          Ký ức của chuyến đi được gom lại thành album, note và recap.
        </motion.p>

        {/* Album Grid with hover effects */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3 mb-5"
        >
          {[
            { icon: MapPin, color: "bg-sage/20", iconColor: "text-sage" },
            { icon: Heart, color: "bg-coral/20", iconColor: "text-coral" },
            { icon: Camera, color: "bg-yellow/20", iconColor: "text-yellow" },
            { icon: MapPin, color: "bg-sage/20", iconColor: "text-sage" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`h-[100px] rounded-[16px] ${item.color} flex items-center justify-center cursor-pointer`}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center"
              >
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Memory Title Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white rounded-[16px] p-4 border border-border/30 mb-4 cursor-pointer"
        >
          <h3 className="text-[16px] font-bold text-ink mb-1">Đêm rooftop đầu hè</h3>
          <p className="text-[12px] text-muted-foreground">12 ảnh • 3 địa điểm • 4 người</p>
        </motion.div>

        {/* AI Recap with sparkle animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-sage-light/30 rounded-[16px] p-4 mb-4"
        >
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
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between bg-white rounded-[16px] p-4 border border-border/30 mb-4"
        >
          {[
            { value: "3", label: "Stops" },
            { value: "4", label: "People" },
            { value: "520k", label: "Each" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center"
            >
              <p className="text-[16px] font-bold text-ink">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note + FAB */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-between"
        >
          <p className="text-[13px] text-sage">Lần sau săn hoàng hôn.</p>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center shadow-lg shadow-coral/20"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
