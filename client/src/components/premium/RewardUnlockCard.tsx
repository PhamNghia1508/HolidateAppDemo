import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Trophy, Crown, Lock, Star } from "lucide-react";
import { ReactNode } from "react";

interface Reward {
  icon: ReactNode;
  label: string;
  locked: boolean;
  unlockAt: number;
  color: string;
  bgColor: string;
}

interface RewardUnlockCardProps {
  currentLevel: number;
  delay?: number;
}

const rewards: Reward[] = [
  { icon: <Heart className="w-5 h-5" />, label: "Nhãn dán", locked: false, unlockAt: 1, color: "#e76f51", bgColor: "rgba(231,111,81,0.12)" },
  { icon: <Sparkles className="w-5 h-5" />, label: "Mũ len", locked: false, unlockAt: 2, color: "#e9c46a", bgColor: "rgba(233,196,106,0.12)" },
  { icon: <Trophy className="w-5 h-5" />, label: "Huy hiệu", locked: true, unlockAt: 5, color: "#b8b8b8", bgColor: "rgba(184,184,184,0.15)" },
  { icon: <Crown className="w-5 h-5" />, label: "Vương miện", locked: true, unlockAt: 8, color: "#b8b8b8", bgColor: "rgba(184,184,184,0.15)" },
  { icon: <Star className="w-5 h-5" />, label: "Aura vàng", locked: true, unlockAt: 10, color: "#b8b8b8", bgColor: "rgba(184,184,184,0.15)" },
];

export default function RewardUnlockCard({ currentLevel, delay = 0 }: RewardUnlockCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 25 }}
      className="premium-glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground opacity-60">
            Phần thưởng
          </div>
          <div className="text-[16px] font-bold text-ink mt-0.5">Mở khóa tiếp theo</div>
        </div>
        <div className="text-[12px] font-medium text-sage bg-sage/10 px-2.5 py-1 rounded-full">
          Level {currentLevel}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {rewards.map((reward, i) => (
          <motion.div
            key={reward.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.1 + i * 0.05, type: "spring", stiffness: 400, damping: 20 }}
            whileHover={!reward.locked ? { scale: 1.08, y: -4, transition: { type: "spring", stiffness: 400, damping: 15 } } : {}}
            whileTap={!reward.locked ? { scale: 0.95 } : {}}
            className="flex flex-col items-center rounded-[16px] p-3 relative"
            style={{
              background: reward.locked ? "rgba(184,184,184,0.1)" : reward.bgColor,
              opacity: reward.locked ? 0.5 : 1,
            }}
          >
            <motion.div
              animate={!reward.locked ? { rotate: [0, 6, -6, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="mb-1.5"
              style={{ color: reward.color }}
            >
              {reward.icon}
            </motion.div>
            <span className="text-[11px] font-semibold text-ink text-center leading-tight">{reward.label}</span>
            <AnimatePresence>
              {reward.locked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-2 right-2"
                >
                  <Lock className="w-3 h-3 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
            {reward.locked && (
              <span className="text-[9px] text-muted-foreground mt-1">Lv {reward.unlockAt}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
