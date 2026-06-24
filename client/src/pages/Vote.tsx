import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Clock, Zap } from "lucide-react";
import SpatialCard from "@/components/SpatialCard";
import SpringButton from "@/components/SpringButton";
import Confetti from "@/components/Confetti";

const members = [
  { name: "Nghĩa", status: "Đồng ý", color: "#4a7c59" },
  { name: "Linh", status: "Đồng ý", color: "#4a7c59" },
  { name: "Minh", status: "Có thể", color: "#e9c46a" },
  { name: "An", status: "Đợi", color: "#b8b8b8" },
];

const choices = [
  { label: "Đồng ý", icon: "👍", color: "#4a7c59" },
  { label: "Có thể", icon: "✌️", color: "#e9c46a" },
  { label: "Đổi giờ", icon: "⏰", color: "#e76f51" },
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
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f3eee8 0%, #e8e0d6 100%)" }}
    >
      {/* Confetti for 100% vote */}
      <Confetti trigger={confettiTrigger} />

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
        <h1 className="text-[26px] font-bold text-ink mb-2">Cả nhóm vote plan</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          Khỏi chat lòng vòng — chốt nhanh trong một shared space.
        </p>

        {/* Vote Progress - SpatialCard */}
        <SpatialCard glow="sage" className="mb-5">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-yellow" />
              <p className="text-[16px] font-bold text-sage">{voteCount}/4 người đã vote</p>
            </div>
            <p className="text-[13px] text-muted-foreground mb-3">
              {voteCount === 4 ? "Cả nhóm đã đồng ý! 🎉" : "Còn An chưa phản hồi"}
            </p>
            <div className="w-full h-3 bg-white/80 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #4a7c59, #2a9d8f)",
                  boxShadow: "0 0 10px rgba(74,124,89,0.4)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, type: "spring", stiffness: 60 }}
              />
            </div>
          </div>
        </SpatialCard>

        {/* Members with gradient glow borders */}
        <SpatialCard glow="none" className="mb-5">
          <div className="p-5">
            <div className="grid grid-cols-4 gap-3">
              {members.map((m) => (
                <div key={m.name} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-1 relative"
                    style={{
                      background: m.status === "Đồng ý"
                        ? `linear-gradient(135deg, ${m.color}, #2a9d8f)`
                        : m.status === "Đợi"
                        ? "#e0e0e0"
                        : m.color,
                      boxShadow: m.status === "Đồng ý"
                        ? "0 0 20px rgba(74,124,89,0.5), 0 4px 12px rgba(74,124,89,0.3)"
                        : m.status === "Đợi"
                        ? "none"
                        : "0 4px 12px rgba(233,196,106,0.3)",
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
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                  <p className="text-[12px] font-semibold text-ink">{m.name}</p>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5"
                    style={{
                      background: m.status === "Đồng ý" ? "rgba(74,124,89,0.15)" :
                                  m.status === "Có thể" ? "rgba(233,196,106,0.2)" :
                                  "rgba(184,184,184,0.2)",
                      color: m.status === "Đồng ý" ? "#4a7c59" :
                             m.status === "Có thể" ? "#d4a017" :
                             "#888",
                    }}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SpatialCard>

        {/* Your choice - Neumorphism cards */}
        <SpatialCard glow="none" className="mb-5">
          <div className="p-5">
            <h3 className="text-[16px] font-bold text-ink mb-3">Bạn chọn gì?</h3>
            <div className="flex gap-3 mb-3">
              {choices.map((choice) => {
                const isSelected = myChoice === choice.label;
                return (
                  <motion.button
                    key={choice.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleVote(choice.label)}
                    className="flex-1 py-3 rounded-[14px] text-[13px] font-semibold transition-all flex flex-col items-center gap-1"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${choice.color}, ${choice.color}dd)`
                        : "#ffffff",
                      color: isSelected ? "#fff" : choice.color,
                      boxShadow: isSelected
                        ? `0 4px 20px ${choice.color}44, 0 8px 24px ${choice.color}22`
                        : "4px 4px 12px rgba(0,0,0,0.08), -4px -4px 12px rgba(255,255,255,0.8)",
                      border: isSelected ? "none" : "1px solid rgba(255,255,255,0.6)",
                    }}
                  >
                    <span className="text-lg">{choice.icon}</span>
                    <span>{choice.label}</span>
                  </motion.button>
                );
              })}
            </div>
            <p className="text-[12px] text-muted-foreground">Mỗi lựa chọn đều cập nhật cho cả nhóm.</p>
          </div>
        </SpatialCard>

        {/* Gradient CTA - SpringButton */}
        <SpringButton onClick={() => setLocation("/confirmed")} data-testid="button-confirm">
          <span className="relative z-10">Chốt plan & gửi nhắc hẹn</span>
        </SpringButton>
      </div>

      <BottomNav />
    </div>
  );
}
