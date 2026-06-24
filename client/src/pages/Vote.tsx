import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Clock, Zap } from "lucide-react";
import Confetti from "@/components/Confetti";

const members = [
  { name: "Nghĩa", status: "Đồng ý", color: "#4a7c59" },
  { name: "Linh", status: "Đồng ý", color: "#4a7c59" },
  { name: "Minh", status: "Có thể", color: "#F3D37A" },
  { name: "An", status: "Đợi", color: "#7B6658" },
];

const choices = [
  { label: "Đồng ý", icon: "👍", color: "#4a7c59", bg: "#4a7c5920" },
  { label: "Có thể", icon: "✌️", color: "#F3D37A", bg: "#F3D37A20" },
  { label: "Đổi giờ", icon: "⏰", color: "#FF6B4A", bg: "#FF6B4A20" },
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
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,35,30,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,107,74,0.06) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <Confetti trigger={confettiTrigger} />

      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <div className="pt-5 mb-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
            Vote
          </div>
          <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">Cả nhóm vote plan</h1>
          <p className="text-[14px] text-[#7B6658] mt-1">
            Khỏi chat lòng vòng — chốt nhanh trong một shared space.
          </p>
        </div>

        {/* Vote Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="premium-glass-card p-4 mb-4"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-[#F3D37A]" />
            <p className="text-[16px] font-bold text-[#4a7c59]">{voteCount}/4 người đã vote</p>
          </div>
          <p className="text-[13px] text-[#7B6658] mb-3">
            {voteCount === 4 ? "Cả nhóm đã đồng ý! 🎉" : "Còn An chưa phản hồi"}
          </p>
          <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #4a7c59, #65C6A2)",
                boxShadow: "0 0 12px rgba(74,124,89,0.4)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, type: "spring", stiffness: 60 }}
            />
          </div>
        </motion.div>

        {/* Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
          className="premium-glass-card p-4 mb-4"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60 mb-3">
            Nhóm
          </div>
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
                      ? `linear-gradient(135deg, ${m.color}, #65C6A2)`
                      : m.status === "Đợi"
                      ? "#E8E0D6"
                      : m.color,
                    boxShadow: m.status === "Đồng ý"
                      ? "0 0 20px rgba(74,124,89,0.4), 0 4px 12px rgba(74,124,89,0.3)"
                      : m.status === "Đợi"
                      ? "none"
                      : "0 4px 12px rgba(243,211,122,0.3)",
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
                        <Clock className="w-4 h-4 text-[#7B6658]" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
                <p className="text-[12px] font-semibold text-[#231F1B]">{m.name}</p>
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full mt-0.5"
                  style={{
                    background: m.status === "Đồng ý" ? "#4a7c5920" : m.status === "Có thể" ? "#F3D37A20" : "#7B665820",
                    color: m.status === "Đồng ý" ? "#4a7c59" : m.status === "Có thể" ? "#B8941D" : "#7B6658",
                  }}
                >
                  {m.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your choice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
          className="premium-glass-card p-4 mb-5"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60 mb-3">
            Bạn chọn gì?
          </div>
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
          <p className="text-[12px] text-[#7B6658]">Mỗi lựa chọn đều cập nhật cho cả nhóm.</p>
        </motion.div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/confirmed")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A4C 50%, #F3D37A 100%)",
            boxShadow: "0 8px 32px rgba(255,107,74,0.35), 0 0 60px rgba(255,107,74,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          Chốt plan & gửi nhắc hẹn
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
