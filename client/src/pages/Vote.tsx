import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import PageHeader from "@/components/PageHeader";
import { Clock, Zap } from "lucide-react";
import Confetti from "@/components/Confetti";

const members = [
  { name: "Nghĩa", status: "Đồng ý", color: "mint" },
  { name: "Linh", status: "Đồng ý", color: "mint" },
  { name: "Minh", status: "Có thể", color: "champagne" },
  { name: "An", status: "Đợi", color: "clay" },
];

const choices = [
  { label: "Đồng ý", icon: "👍", color: "mint" },
  { label: "Có thể", icon: "✌️", color: "champagne" },
  { label: "Đổi giờ", icon: "⏰", color: "coral" },
];

export default function Vote() {
  const [, setLocation] = useLocation();
  const [myChoice, setMyChoice] = useState("Đồng ý");
  const [voteCount, setVoteCount] = useState(3);
  const [progress, setProgress] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setProgress((voteCount / 4) * 100), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleVote = (choice: string) => {
    setMyChoice(choice);
    if (choice === "Đồng ý" && voteCount < 4) {
      setVoteCount(4);
      setProgress(100);
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 4000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5">
      <Confetti trigger={confettiTrigger} />

      <PageHeader
        label="Vote"
        title="Cả nhóm vote plan"
        subtitle="Khỏi chat lòng vòng — chốt nhanh trong một shared space."
      />

      {/* Vote Progress */}
      <GlassCard delay={0} className="p-4 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-champagne" />
          <p className="text-title text-mint">{voteCount}/4 người đã vote</p>
        </div>
        <p className="text-body text-clay mb-3">
          {voteCount === 4 ? "Cả nhóm đã đồng ý! 🎉" : "Còn An chưa phản hồi"}
        </p>
        <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(var(--mint)), hsl(var(--mint-light)))",
              boxShadow: "0 0 12px rgba(98,201,165,0.4)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
          />
        </div>
      </GlassCard>

      {/* Members */}
      <GlassCard delay={0.1} className="p-4 mb-4">
        <div className="premium-label mb-3">Nhóm</div>
        <div className="grid grid-cols-4 gap-3">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.08, type: "spring" }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full flex items-center justify-center mb-1 relative"
                style={{
                  background: m.status === "Đồng ý"
                    ? "linear-gradient(135deg, hsl(var(--mint)), hsl(var(--mint-light)))"
                    : m.status === "Đợi"
                    ? "hsl(var(--cream))"
                    : "hsl(var(--champagne))",
                  boxShadow: m.status === "Đồng ý"
                    ? "0 0 20px rgba(98,201,165,0.4), 0 4px 12px rgba(98,201,165,0.3)"
                    : m.status === "Đợi"
                    ? "none"
                    : "0 4px 12px rgba(244,208,111,0.3)",
                  opacity: m.status === "Đợi" ? 0.5 : 1,
                }}
              >
                <span className="text-[14px] font-bold text-white">{m.name[0]}</span>
                {m.status === "Đợi" && (
                  <div className="absolute -bottom-1 -right-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Clock className="w-4 h-4 text-clay" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
              <p className="text-label text-ink">{m.name}</p>
              <span className={`text-micro px-2 py-0.5 rounded-full mt-0.5 ${
                m.status === "Đồng ý"
                  ? "bg-mint/10 text-mint"
                  : m.status === "Có thể"
                  ? "bg-champagne/10 text-champagne"
                  : "bg-clay/10 text-clay"
              }`}>
                {m.status}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Your choice */}
      <GlassCard delay={0.2} className="p-4 mb-5">
        <div className="premium-label mb-3">Bạn chọn gì?</div>
        <div className="flex gap-3 mb-3">
          {choices.map((choice) => {
            const isSelected = myChoice === choice.label;
            return (
              <motion.button
                key={choice.label}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleVote(choice.label)}
                className={`flex-1 py-3 rounded-2xl text-[13px] font-semibold transition-all flex flex-col items-center gap-1 focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-2 focus:ring-offset-cream ${
                  isSelected ? "text-white" : ""
                }`}
                style={{
                  background: isSelected
                    ? choice.color === "mint"
                      ? "linear-gradient(135deg, hsl(var(--mint)), hsl(var(--mint-light)))"
                      : choice.color === "champagne"
                      ? "linear-gradient(135deg, hsl(var(--champagne)), hsl(var(--sunset)))"
                      : "linear-gradient(135deg, hsl(var(--coral)), hsl(var(--sunset)))"
                    : "#ffffff",
                  color: isSelected ? "#fff" : `hsl(var(--${choice.color}))`,
                  boxShadow: isSelected
                    ? `0 4px 20px rgba(98,201,165,0.3), 0 8px 24px rgba(98,201,165,0.15)`
                    : "4px 4px 12px rgba(0,0,0,0.06), -4px -4px 12px rgba(255,255,255,0.8)",
                  border: isSelected ? "none" : "1px solid rgba(255,255,255,0.6)",
                }}
              >
                <span className="text-lg">{choice.icon}</span>
                <span>{choice.label}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="text-body text-clay">Mỗi lựa chọn đều cập nhật cho cả nhóm.</p>
      </GlassCard>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlowButton onClick={() => setLocation("/confirmed")}>
          Chốt plan & gửi nhắc hẹn
        </GlowButton>
      </motion.div>

      <BottomNav />
    </div>
  );
}
