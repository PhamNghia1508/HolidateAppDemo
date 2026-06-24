import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Clock, Zap } from "lucide-react";

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

  useEffect(() => {
    const timer = setTimeout(() => setProgress((voteCount / 4) * 100), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleVote = (choice: string) => {
    setMyChoice(choice);
    if (choice === "Đồng ý" && voteCount < 4) {
      setVoteCount(4);
      setProgress(100);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative"
      style={{ background: "linear-gradient(180deg, #f3eee8 0%, #e8e0d6 100%)" }}
    >
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

        {/* Vote Progress */}
        <div className="rounded-[16px] p-4 mb-5 border border-white/60 backdrop-blur-md bg-white/60">
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

        {/* Members with gradient glow borders */}
        <div className="rounded-[20px] p-5 border border-white/60 backdrop-blur-md bg-white/60 mb-5">
          <div className="grid grid-cols-4 gap-3">
            {members.map((m, i) => (
              <div key={m.name} className="flex flex-col items-center">
                <div
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
                </div>
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

        {/* Your choice - Neumorphism cards */}
        <div className="rounded-[20px] p-5 border border-white/60 backdrop-blur-md bg-white/60 mb-5">
          <h3 className="text-[16px] font-bold text-ink mb-3">Bạn chọn gì?</h3>
          <div className="flex gap-3 mb-3">
            {choices.map((choice) => {
              const isSelected = myChoice === choice.label;
              return (
                <motion.button
                  key={choice.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
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

        {/* Gradient CTA */}
        <motion.button
          onClick={() => setLocation("/confirmed")}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="w-full h-[52px] rounded-[14px] font-semibold text-[16px] text-white shadow-lg overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #e76f51 0%, #f4a261 100%)",
          }}
          data-testid="button-confirm"
        >
          <span className="relative z-10">Chốt plan & gửi nhắc hẹn</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
