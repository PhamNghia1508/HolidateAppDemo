import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Clock, Zap, Check, Ban, Clock3 } from "lucide-react";
import Confetti from "@/components/Confetti";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const SURF2 = "#F8FAFC";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";
const DANGER = "#EF4444";
const WARN = "#F59E0B";

const members = [
  { name: "Nghĩa", status: "Đồng ý", state: "active" as const },
  { name: "Linh", status: "Đồng ý", state: "active" as const },
  { name: "Minh", status: "Có thể", state: "maybe" as const },
  { name: "An", status: "Đợi", state: "pending" as const },
];

const choices = [
  { label: "Đồng ý", icon: Check, variant: "blue" as const },
  { label: "Có thể", icon: Clock3, variant: "neutral" as const },
  { label: "Đổi giờ", icon: Ban, variant: "danger" as const },
];

const S = (i: number) => ({ delay: i * 0.08, type: "spring" as const, stiffness: 400, damping: 30 });

export default function Vote() {
  const [, setLocation] = useLocation();
  const [myChoice, setMyChoice] = useState("Đồng ý");
  const [voteCount, setVoteCount] = useState(3);
  const [progress, setProgress] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setProgress((voteCount / 4) * 100), 300);
    return () => clearTimeout(t);
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
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <Confetti trigger={confettiTrigger} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-6">
        <div className="page-label mb-1">Vote</div>
        <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Cả nhóm vote plan</h1>
        <p className="text-[13px] mt-1" style={{ color: T2 }}>Khỏi chat lòng vòng — chốt nhanh trong một shared space.</p>
      </motion.div>

      {/* Progress Card */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
        className="rounded-2xl p-4 mb-3" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4" style={{ color: BLUE }} />
          <p className="text-[15px] font-bold" style={{ color: BLUE_BRIGHT }}>{voteCount}/4 người đã vote</p>
        </div>
        <p className="text-[13px] mb-3" style={{ color: T2 }}>
          {voteCount === 4 ? "Cả nhóm đã đồng ý! 🎉" : "Còn An chưa phản hồi"}
        </p>
        <div className="progress-track">
          <motion.div
            style={{ background: BLUE, height: "100%", borderRadius: 3 }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </motion.div>

      {/* Members */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(2)}
        className="rounded-2xl p-4 mb-3" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="page-label mb-3">Nhóm</div>
        <div className="grid grid-cols-4 gap-3">
          {members.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring" }} className="flex flex-col items-center">
              <div className={`avatar-token ${m.state}`}>
                <span>{m.name[0]}</span>
                {m.state === "active" && <div className="status-dot" />}
                {m.state === "maybe" && <div className="status-dot warning" />}
                {m.state === "pending" && (
                  <div className="absolute -bottom-1 -right-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Clock className="w-3.5 h-3.5" style={{ color: T3 }} />
                    </motion.div>
                  </div>
                )}
              </div>
              <p className="text-[11px] font-semibold mt-1.5" style={{ color: T1 }}>{m.name}</p>
              <span className={`status-pill mt-1 ${m.state === "active" ? "mint" : m.state === "maybe" ? "warning" : "muted"}`}>
                {m.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Choice */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(3)}
        className="rounded-2xl p-4 mb-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="page-label mb-3">Bạn chọn gì?</div>
        <div className="flex gap-2.5 mb-3">
          {choices.map((choice) => {
            const isSelected = myChoice === choice.label;
            const Icon = choice.icon;
            const accentColor = choice.variant === "blue" ? BLUE : choice.variant === "danger" ? DANGER : WARN;
            return (
              <motion.button key={choice.label} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(choice.label)}
                className="flex-1 flex flex-col items-center gap-2 rounded-[14px] py-4"
                style={{
                  background: isSelected
                    ? choice.variant === "blue" ? "rgba(59,130,246,0.08)"
                    : choice.variant === "danger" ? "rgba(239,68,68,0.07)"
                    : "rgba(245,158,11,0.07)"
                    : SURF2,
                  border: `1.5px solid ${isSelected ? accentColor : "rgba(0,0,0,0.07)"}`,
                  boxShadow: isSelected ? `0 2px 12px ${accentColor}20` : "none",
                  transition: "all 0.18s ease",
                }}>
                <Icon className="w-5 h-5" style={{ color: isSelected ? accentColor : T3 }} />
                <span className="text-[13px] font-semibold" style={{ color: isSelected ? accentColor : T2 }}>{choice.label}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="text-[12px]" style={{ color: T3 }}>Mỗi lựa chọn đều cập nhật cho cả nhóm.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(4)}>
        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/confirmed")} className="w-full h-[52px] premium-cta">
          Chốt plan & gửi nhắc hẹn
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
