import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Clock, Zap, Check, Clock3, CalendarClock } from "lucide-react";
import Confetti from "@/components/Confetti";

const BG = "#F7F5F0";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.05)";
const WARN = "#F59E0B";

const members = [
  { name: "Nghĩa", initial: "N", status: "Đồng ý", state: "active" as const, color: BLUE },
  { name: "Linh", initial: "L", status: "Đồng ý", state: "active" as const, color: "#8B5CF6" },
  { name: "Minh", initial: "M", status: "Có thể", state: "maybe" as const, color: WARN },
  { name: "An", initial: "A", status: "Đợi", state: "pending" as const, color: T3 },
];

const choices = [
  { label: "Đồng ý", icon: Check, variant: "blue" as const, emoji: "✅" },
  { label: "Có thể", icon: Clock3, variant: "neutral" as const, emoji: "🤔" },
  { label: "Đổi giờ", icon: CalendarClock, variant: "danger" as const, emoji: "🕐" },
];

// Fake activity feed entries
const activityFeed = [
  { name: "Linh", action: "vote Đồng ý", time: "2 phút trước", color: "#8B5CF6" },
  { name: "Minh", action: "vote Có thể", time: "8 phút trước", color: WARN },
  { name: "Nghĩa", action: "tạo vote", time: "15 phút trước", color: BLUE },
];

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 400, damping: 30 });

export default function Vote() {
  const [, setLocation] = useLocation();
  const [myChoice, setMyChoice] = useState("Đồng ý");
  const [voteCount, setVoteCount] = useState(3);
  const [progress, setProgress] = useState(0);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setProgress((voteCount / 4) * 100), 300);
    const t2 = setTimeout(() => setShowActivity(true), 600);
    return () => { clearTimeout(t); clearTimeout(t2); };
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
    <div className="flex-1 overflow-y-auto pb-24 px-5 relative" style={{ background: BG }}>
      <Confetti trigger={confettiTrigger} />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-4">
        <div className="page-label mb-1">Vote</div>
        <h1 className="text-[26px] font-black tracking-tight" style={{ color: T1 }}>Cả nhóm vote plan</h1>
        <p className="text-[13px] mt-0.5" style={{ color: T2 }}>Khỏi chat lòng vòng — chốt nhanh trong một shared space.</p>
      </motion.div>

      {/* Plan context card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
        className="flex items-center gap-3 rounded-2xl overflow-hidden mb-4"
        style={{ background: T1, boxShadow: "0 4px 20px rgba(15,23,42,0.20)" }}>
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=80&fit=crop"
          alt="Plan" className="w-[80px] h-[68px] object-cover flex-shrink-0"
        />
        <div className="py-2 pr-3 flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Đang vote</p>
          <p className="text-[15px] font-black text-white truncate leading-tight">Rooftop chill night</p>
          <p className="text-[12px] text-white/55">Thứ bảy, 18:30 · 3 điểm đến</p>
        </div>
        <div className="pr-4 flex-shrink-0 text-center">
          <span className="text-[18px] font-black" style={{ color: "#93C5FD" }}>{voteCount}/4</span>
          <p className="text-[9px] font-bold uppercase tracking-wide text-white/40">vote</p>
        </div>
      </motion.div>

      {/* Live activity feed */}
      <AnimatePresence>
        {showActivity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl p-3.5 mb-3 overflow-hidden"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}
          >
            <p className="page-label mb-2.5">Hoạt động gần đây</p>
            <div className="space-y-2">
              {activityFeed.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, type: "spring", stiffness: 400, damping: 28 }}
                  className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ background: item.color }}>
                    {item.name[0]}
                  </div>
                  <p className="text-[12px] flex-1" style={{ color: T2 }}>
                    <span className="font-semibold" style={{ color: T1 }}>{item.name}</span>
                    {" "}{item.action}
                  </p>
                  <p className="text-[10px]" style={{ color: T3 }}>{item.time}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(2)}
        className="rounded-2xl p-4 mb-3" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: BLUE }} />
            <p className="text-[15px] font-bold" style={{ color: BLUE_BRIGHT }}>{voteCount}/4 người đã vote</p>
          </div>
          <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full" style={{ background: voteCount === 4 ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.10)", color: voteCount === 4 ? "#15803D" : "#92400E" }}>
            {voteCount === 4 ? "Đủ rồi! 🎉" : "Còn thiếu 1"}
          </span>
        </div>

        {/* Segmented progress — shows Đồng ý / Có thể / Đợi */}
        <div className="flex gap-1 h-2 rounded-full overflow-hidden mb-2">
          <motion.div initial={{ flex: 0 }} animate={{ flex: 2 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="h-full rounded-l-full" style={{ background: BLUE }} />
          <motion.div initial={{ flex: 0 }} animate={{ flex: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="h-full" style={{ background: WARN }} />
          <motion.div initial={{ flex: 0 }} animate={{ flex: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="h-full rounded-r-full" style={{ background: "#E2E8F0" }} />
        </div>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: T3 }}>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: BLUE }} />2 đồng ý</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: WARN }} />1 có thể</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#E2E8F0" }} />1 chưa vote</span>
        </div>
        {voteCount < 4 && (
          <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-[12px] mt-2.5 font-medium" style={{ color: BLUE_BRIGHT }}>
            Chỉ cần An xác nhận là chốt được ngay! 👀
          </motion.p>
        )}
      </motion.div>

      {/* Members */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(3)}
        className="rounded-2xl p-4 mb-3" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="page-label mb-3">Nhóm bạn bè</div>
        <div className="grid grid-cols-4 gap-3">
          {members.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, scale: 0.80 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 350, damping: 22 }}
              className="flex flex-col items-center">
              <div className="relative">
                <motion.div
                  animate={m.state === "active" ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-bold text-[15px]"
                  style={{
                    background: m.state === "active" ? `${m.color}18` : m.state === "maybe" ? "rgba(245,158,11,0.10)" : "#F1F5F9",
                    border: `2px solid ${m.state === "active" ? m.color : m.state === "maybe" ? WARN : BORDER}`,
                    color: m.state === "active" ? m.color : m.state === "maybe" ? "#B45309" : T3,
                    boxShadow: m.state === "active" ? `0 0 0 4px ${m.color}14` : "none",
                  }}>
                  {m.initial}
                </motion.div>
                {m.state === "active" && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: "#22C55E" }} />
                )}
                {m.state === "maybe" && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: WARN }} />
                )}
                {m.state === "pending" && (
                  <motion.div className="absolute bottom-0 right-0"
                    animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }}>
                    <Clock className="w-3.5 h-3.5" style={{ color: T3 }} />
                  </motion.div>
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

      {/* Vote choice — tactile */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(4)}
        className="rounded-2xl p-4 mb-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="page-label mb-3">Bạn chọn gì?</div>
        <div className="flex gap-2.5 mb-3">
          {choices.map((choice) => {
            const isSelected = myChoice === choice.label;
            const Icon = choice.icon;
            const accentColor = choice.variant === "blue" ? BLUE : choice.variant === "danger" ? WARN : "#64748B";
            return (
              <motion.button key={choice.label}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => handleVote(choice.label)}
                className="flex-1 flex flex-col items-center gap-2 rounded-[16px] py-4"
                style={{
                  background: isSelected
                    ? choice.variant === "blue" ? "rgba(59,130,246,0.08)"
                    : "rgba(245,158,11,0.07)"
                    : "#F8F7F4",
                  border: `2px solid ${isSelected ? accentColor : "rgba(0,0,0,0.06)"}`,
                  boxShadow: isSelected ? `0 2px 16px ${accentColor}28, 0 0 0 1px ${accentColor}20` : "none",
                  transition: "all 0.16s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}>
                <motion.div animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, type: "spring" }}>
                  <span className="text-[20px]">{choice.emoji}</span>
                </motion.div>
                <span className="text-[12px] font-bold" style={{ color: isSelected ? accentColor : T2 }}>{choice.label}</span>
              </motion.button>
            );
          })}
        </div>
        <p className="text-[12px]" style={{ color: T3 }}>Mỗi lựa chọn đều cập nhật ngay cho cả nhóm.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(5)}>
        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/confirmed")} className="w-full h-[54px] premium-cta">
          Chốt plan & gửi nhắc hẹn
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
