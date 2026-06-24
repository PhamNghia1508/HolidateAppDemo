import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Clock, Zap, Check, Ban, Clock3 } from "lucide-react";
import Confetti from "@/components/Confetti";

const members = [
  { name: "Nghĩa", status: "Đồng ý", state: "active" as const },
  { name: "Linh", status: "Đồng ý", state: "active" as const },
  { name: "Minh", status: "Có thể", state: "maybe" as const },
  { name: "An", status: "Đợi", state: "pending" as const },
];

const choices = [
  { label: "Đồng ý", icon: Check, variant: "mint" as const },
  { label: "Có thể", icon: Clock3, variant: "neutral" as const },
  { label: "Đổi giờ", icon: Ban, variant: "danger" as const },
];

const cardStagger = (i: number) => ({
  delay: i * 0.08,
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
});

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
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      <Confetti trigger={confettiTrigger} />

      {/* Ambient mint blur behind cards */}
      <div className="ambient-mint-blur top-32 left-1/2 -translate-x-1/2" />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="pt-6 mb-6"
      >
        <div className="page-label mb-1">VOTE</div>
        <h1 className="text-heading text-[#FAFAFA] tracking-tight font-black">
          Cả nhóm vote plan
        </h1>
        <p className="text-body text-[#A1A1AA] mt-1">
          Khỏi chat lòng vòng — chốt nhanh trong một shared space.
        </p>
      </motion.div>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(0)}
        className="obsidian-card p-4 mb-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-[#00E5A8]" />
          <p className="text-title text-[#00E5A8]">
            {voteCount}/4 người đã vote
          </p>
        </div>
        <p className="text-body text-[#A1A1AA] mb-3">
          {voteCount === 4 ? "Cả nhóm đã đồng ý! 🎉" : "Còn An chưa phản hồi"}
        </p>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </motion.div>

      {/* Members Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(1)}
        className="obsidian-card p-4 mb-3"
      >
        <div className="page-label mb-3">Nhóm</div>
        <div className="grid grid-cols-4 gap-3">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring" }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`avatar-token ${m.state}`}
              >
                <span>{m.name[0]}</span>
                {m.state === "active" && <div className="status-dot" />}
                {m.state === "maybe" && <div className="status-dot warning" />}
                {m.state === "pending" && (
                  <div className="absolute -bottom-1 -right-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Clock className="w-3.5 h-3.5 text-[#71717A]" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
              <p className="text-label text-[#FAFAFA] mt-1.5">{m.name}</p>
              <span className={`status-pill mt-1 ${
                m.state === "active" ? "mint" : m.state === "maybe" ? "warning" : "muted"
              }`}>
                {m.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vote Choice Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(2)}
        className="obsidian-card p-4 mb-4"
      >
        <div className="page-label mb-3">Bạn chọn gì?</div>
        <div className="flex gap-2.5 mb-3">
          {choices.map((choice) => {
            const isSelected = myChoice === choice.label;
            const Icon = choice.icon;
            return (
              <motion.button
                key={choice.label}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(choice.label)}
                className={`premium-vote-button flex-1 flex flex-col items-center gap-2 ${
                  isSelected ? "selected" : ""
                } ${choice.variant === "danger" ? "danger" : ""}`}
                style={{
                  background: isSelected
                    ? choice.variant === "mint"
                      ? "rgba(0, 229, 168, 0.12)"
                      : choice.variant === "danger"
                      ? "rgba(255, 77, 109, 0.12)"
                      : "rgba(255, 255, 255, 0.06)"
                    : "#18181B",
                  borderColor: isSelected
                    ? choice.variant === "mint"
                      ? "#00E5A8"
                      : choice.variant === "danger"
                      ? "rgba(255, 77, 109, 0.5)"
                      : "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.08)",
                }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{
                    color: isSelected
                      ? choice.variant === "mint"
                        ? "#00E5A8"
                        : choice.variant === "danger"
                        ? "#FF4D6D"
                        : "#FAFAFA"
                      : choice.variant === "mint"
                      ? "#00E5A8"
                      : choice.variant === "danger"
                      ? "#FF4D6D"
                      : "#71717A",
                  }}
                />
                <span
                  className="text-[13px] font-semibold"
                  style={{
                    color: isSelected ? "#FAFAFA" : "#A1A1AA",
                  }}
                >
                  {choice.label}
                </span>
              </motion.button>
            );
          })}
        </div>
        <p className="text-body text-[#71717A]">
          Mỗi lựa chọn đều cập nhật cho cả nhóm.
        </p>
      </motion.div>

      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(3)}
      >
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/confirmed")}
          className="w-full h-[52px] premium-cta"
        >
          Chốt plan & gửi nhắc hẹn
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
