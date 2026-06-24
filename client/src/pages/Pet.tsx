import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Heart, Sparkles, PawPrint, Trophy } from "lucide-react";

export default function Pet() {
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
          GoPet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[14px] text-muted-foreground mb-5"
        >
          Mỗi chuyến đi hoàn thành giúp GoPet lớn lên.
        </motion.p>

        {/* Pet Card with floating animation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white rounded-[20px] p-5 border border-border/30 mb-5"
        >
          <p className="text-[13px] text-muted-foreground mb-3">Level 3</p>
          {/* Pet Illustration with bounce */}
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-28 rounded-full bg-sage/10 flex items-center justify-center"
            >
              <svg className="w-20 h-20" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#4a7c59" strokeWidth="2.5" />
                <circle cx="38" cy="45" r="4" fill="#4a7c59" />
                <circle cx="62" cy="45" r="4" fill="#4a7c59" />
                <ellipse cx="50" cy="55" rx="8" ry="4" fill="none" stroke="#4a7c59" strokeWidth="2" />
                <circle cx="28" cy="35" r="10" fill="#f5e6d3" stroke="#4a7c59" strokeWidth="2" />
                <circle cx="72" cy="35" r="10" fill="#f5e6d3" stroke="#4a7c59" strokeWidth="2" />
                <circle cx="28" cy="35" r="3" fill="#e76f51" />
                <circle cx="72" cy="35" r="3" fill="#e76f51" />
                <rect x="35" y="62" width="30" height="12" rx="6" fill="#4a7c59" />
              </svg>
            </motion.div>
          </div>
          <h3 className="text-[20px] font-bold text-ink text-center mb-1">GoPet</h3>
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[13px] text-muted-foreground text-center"
          >
            Đang vui • Muốn thêm kỷ niệm
          </motion.p>
        </motion.div>

        {/* Energy with animated progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[20px] p-5 border border-border/30 mb-5"
        >
          <h3 className="text-[16px] font-bold text-ink mb-2">Năng lượng kỷ niệm</h3>
          <p className="text-[13px] text-muted-foreground mb-3">
            Hoàn thành plan, lưu ảnh và recap để tăng năng lượng cho GoPet.
          </p>
          <div className="w-full h-3 bg-sage/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-coral to-coral/80 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-[12px] text-muted-foreground mt-2 text-right"
          >
            70% — Cần thêm 1 kỷ niệm
          </motion.p>
        </motion.div>

        {/* Rewards with hover effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[20px] p-5 border border-border/30 mb-5"
        >
          <h3 className="text-[16px] font-bold text-ink mb-3">Mở khóa tiếp theo</h3>
          <div className="flex gap-3">
            {[
              { icon: Heart, label: "Nhãn dán", locked: false },
              { icon: Sparkles, label: "Mũ len", locked: false },
              { icon: Trophy, label: "Huy hiệu", locked: true },
            ].map((reward, i) => (
              <motion.div
                key={reward.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={!reward.locked ? { scale: 1.1, y: -4 } : {}}
                className={`flex-1 flex flex-col items-center rounded-[12px] p-3 ${
                  reward.locked
                    ? "bg-muted/30 opacity-50"
                    : "bg-sage-light/30 cursor-pointer"
                }`}
              >
                <motion.div
                  animate={!reward.locked ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <reward.icon
                    className={`w-6 h-6 mb-1 ${
                      reward.locked ? "text-muted-foreground" : "text-sage"
                    }`}
                  />
                </motion.div>
                <span className="text-[12px] font-medium text-ink">{reward.label}</span>
                {reward.locked && (
                  <span className="text-[10px] text-muted-foreground">Level 5</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors flex items-center justify-center gap-2"
          >
            <PawPrint className="w-4 h-4" />
            Cho pet ăn kỷ niệm
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
