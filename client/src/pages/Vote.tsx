import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Clock, Zap, Check } from "lucide-react";
import Confetti from "@/components/Confetti";

const BG = "#EEE6D4";
const SURF = "#F9F4EA";
const BLUE = "#C8371E";
const BLUE_BRIGHT = "#A62D17";
const T1 = "#1A0E07";
const T2 = "#5C4033";
const T3 = "#9C8470";
const BORDER = "rgba(26,14,7,0.10)";
const SHADOW = "0 1px 3px rgba(26,14,7,0.06), 0 4px 16px rgba(26,14,7,0.06)";
const WARN = "#C8860A";

const members = [
  { name: "Nghĩa", initial: "N", status: "Đồng ý", state: "active" as const, color: BLUE },
  { name: "Linh", initial: "L", status: "Đồng ý", state: "active" as const, color: "#8B5CF6" },
  { name: "Minh", initial: "M", status: "Có thể", state: "maybe" as const, color: WARN },
  { name: "An", initial: "A", status: "Đợi", state: "pending" as const, color: T3 },
];

const choices = [
  { label: "Đồng ý", emoji: "✅", variant: "blue" as const },
  { label: "Có thể", emoji: "🤔", variant: "neutral" as const },
  { label: "Đổi giờ", emoji: "🕐", variant: "amber" as const },
];

// Live activity feed with specific microcopy per brief
const activityFeed = [
  {
    name: "Linh",
    action: "vừa đồng ý",
    badge: "Đồng ý",
    badgeColor: BLUE,
    time: "2 phút trước",
    initial: "L",
    color: "#8B5CF6",
    emoji: "✅",
  },
  {
    name: "Minh",
    action: "đổi sang có thể",
    badge: "Có thể",
    badgeColor: WARN,
    time: "8 phút trước",
    initial: "M",
    color: WARN,
    emoji: "🔄",
  },
  {
    name: "An",
    action: "chưa phản hồi",
    badge: "Đang đợi",
    badgeColor: T3,
    time: "15 phút trước",
    initial: "A",
    color: T3,
    emoji: "⏳",
  },
];

// Heart burst particles
function HeartBurst({ burstKey }: { burstKey: number }) {
  const HEARTS = ["❤️", "💙", "💛", "💚", "💜", "🧡", "❤️", "💙"];
  return (
    <>
      {HEARTS.map((heart, i) => {
        const angle = (i * (360 / HEARTS.length) - 90) * Math.PI / 180;
        const dist = 55 + Math.random() * 20;
        return (
          <motion.div key={`${burstKey}-h-${i}`}
            className="absolute pointer-events-none text-[15px]"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 60 }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 10, scale: [0, 1.5, 1, 0], opacity: [1, 1, 0.8, 0] }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >{heart}</motion.div>
        );
      })}
    </>
  );
}

function VoteRing({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: [0, 2.5, 4], opacity: [0.8, 0.5, 0] }} exit={{}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 pointer-events-none"
          style={{ width: 200, height: 200, marginTop: -100, marginLeft: -100, border: `3px solid ${BLUE}`, borderRadius: "50%", zIndex: 9998 }}
        />
      )}
    </AnimatePresence>
  );
}

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 400, damping: 30 });

export default function Vote() {
  const [, setLocation] = useLocation();
  const [myChoice, setMyChoice] = useState("Đồng ý");
  const [voteCount, setVoteCount] = useState(3);
  const [confettiTrigger, setConfettiTrigger] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [heartBurstKey, setHeartBurstKey] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showRing, setShowRing] = useState(false);
  const [justTapped, setJustTapped] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowActivity(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleVote = (choice: string) => {
    setJustTapped(choice);
    setTimeout(() => setJustTapped(null), 500);
    setMyChoice(choice);
    if (choice === "Đồng ý") {
      setHeartBurstKey(k => k + 1);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 900);
      if (voteCount < 4) {
        setVoteCount(4);
        setTimeout(() => { setShowRing(true); setTimeout(() => setShowRing(false), 1000); }, 150);
        setTimeout(() => { setConfettiTrigger(true); setTimeout(() => setConfettiTrigger(false), 5000); }, 400);
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-5 relative" style={{ background: BG }}>
      <Confetti trigger={confettiTrigger} />
      <VoteRing visible={showRing} />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-4">
        <div className="page-label mb-1">Vote</div>
        <h1 className="text-[28px] font-black tracking-tight" style={{ color: T1 }}>Cả nhóm vote plan</h1>
        <p className="text-[13px] mt-0.5" style={{ color: T2 }}>Khỏi chat lòng vòng — chốt ngay trong shared space.</p>
      </motion.div>

      {/* Plan context card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
        className="flex items-center gap-3 rounded-2xl overflow-hidden mb-4"
        style={{ background: T1, boxShadow: "0 4px 20px rgba(26,14,7,0.20)" }}>
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=120&h=80&fit=crop"
          alt="Plan" className="w-[80px] h-[68px] object-cover flex-shrink-0" />
        <div className="py-2 pr-3 flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Đang vote</p>
          <p className="text-[15px] font-black text-white truncate leading-tight">Rooftop chill night</p>
          <p className="text-[12px] text-white/55">Thứ bảy, 18:30 · 3 điểm đến</p>
        </div>
        <div className="pr-4 flex-shrink-0 text-center">
          <span className="text-[18px] font-black" style={{ color: "#F4A07A" }}>{voteCount}/4</span>
          <p className="text-[9px] font-bold uppercase tracking-wide text-white/40">vote</p>
        </div>
      </motion.div>

      {/* Live activity feed — REAL microcopy per brief */}
      <AnimatePresence>
        {showActivity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="rounded-2xl mb-3 overflow-hidden"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-3">
                <p className="page-label">Hoạt động gần đây</p>
                {/* Live pulse indicator */}
                <div className="flex items-center gap-1.5">
                  <motion.div animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full" style={{ background: "#3D6B4F" }} />
                  <span className="text-[10px] font-bold" style={{ color: "#3D6B4F" }}>LIVE</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {activityFeed.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 400, damping: 28 }}
                    className="flex items-center gap-2.5">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
                      style={{ background: item.color }}>
                      {item.initial}
                    </div>
                    {/* Message */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px]" style={{ color: T2 }}>
                        <span className="font-bold" style={{ color: T1 }}>{item.name}</span>{" "}
                        {item.action}
                      </p>
                    </div>
                    {/* Badge + time */}
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${item.badgeColor}12`, color: item.badgeColor, border: `1px solid ${item.badgeColor}22` }}>
                        {item.emoji} {item.badge}
                      </span>
                      <span className="text-[9px]" style={{ color: T3 }}>{item.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
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
          <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: voteCount === 4 ? "rgba(61,107,79,0.10)" : "rgba(200,134,10,0.10)",
              color: voteCount === 4 ? "#3D6B4F" : "#B45309",
            }}>
            {voteCount === 4 ? "Đủ rồi! 🎉" : "Còn thiếu 1"}
          </span>
        </div>
        <div className="flex gap-1 h-1.5 rounded-full overflow-hidden mb-2">
          <motion.div initial={{ flex: 0 }} animate={{ flex: 2 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="h-full rounded-l-full" style={{ background: BLUE }} />
          <motion.div initial={{ flex: 0 }} animate={{ flex: 1 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="h-full" style={{ background: WARN }} />
          <motion.div initial={{ flex: 0 }} animate={{ flex: 1 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="h-full rounded-r-full" style={{ background: "rgba(26,14,7,0.10)" }} />
        </div>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: T3 }}>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: BLUE }} />2 đồng ý</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: WARN }} />1 có thể</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgba(26,14,7,0.15)" }} />1 chưa vote</span>
        </div>
        {voteCount < 4 && (
          <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-[12px] mt-2 font-medium" style={{ color: BLUE_BRIGHT }}>
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
                  animate={m.state === "active" ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-bold text-[15px]"
                  style={{
                    background: m.state === "active" ? `${m.color}16` : m.state === "maybe" ? "rgba(245,158,11,0.10)" : "#EDE3D0",
                    border: `2px solid ${m.state === "active" ? m.color : m.state === "maybe" ? WARN : BORDER}`,
                    color: m.state === "active" ? m.color : m.state === "maybe" ? "#B45309" : T3,
                    boxShadow: m.state === "active" ? `0 0 0 4px ${m.color}14` : "none",
                  }}>
                  {m.initial}
                </motion.div>
                {m.state === "active" && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white" style={{ background: "#3D6B4F" }} />}
                {m.state === "maybe" && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center text-[8px]" style={{ background: WARN }}>?</div>}
                {m.state === "pending" && <motion.div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center" style={{ background: "#EDE3D0" }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.8, repeat: Infinity }}><Clock className="w-2.5 h-2.5" style={{ color: T3 }} /></motion.div>}
              </div>
              <p className="text-[11px] font-semibold mt-1.5" style={{ color: T1 }}>{m.name}</p>
              <span className={`status-pill mt-1 ${m.state === "active" ? "mint" : m.state === "maybe" ? "warning" : "muted"}`}>{m.status}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vote choices — overshoot spring physics */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(4)}
        className="rounded-2xl p-4 mb-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="page-label mb-3">Bạn chọn gì?</div>
        <div className="flex gap-2.5 mb-3">
          {choices.map((choice) => {
            const isSelected = myChoice === choice.label;
            const accentColor = choice.variant === "blue" ? BLUE : choice.variant === "amber" ? WARN : "#64748B";
            const isJustTapped = justTapped === choice.label;
            return (
              <div key={choice.label} className="flex-1 relative">
                <motion.button
                  whileTap={{ scale: 0.84 }}
                  animate={isJustTapped ? { scale: [0.84, 1.14, 0.97, 1.04, 1] } : { scale: 1 }}
                  transition={isJustTapped
                    ? { type: "spring", stiffness: 700, damping: 10, duration: 0.6 }
                    : { type: "spring", stiffness: 400, damping: 28 }}
                  onClick={() => handleVote(choice.label)}
                  className="w-full flex flex-col items-center gap-2 rounded-[16px] py-4 relative overflow-visible focus:outline-none"
                  style={{
                    background: isSelected ? (choice.variant === "blue" ? "rgba(200,55,30,0.09)" : "rgba(200,134,10,0.08)") : "#F5EFE3",
                    border: `2px solid ${isSelected ? accentColor : "rgba(0,0,0,0.06)"}`,
                    boxShadow: isSelected ? `0 0 0 3px ${accentColor}18, 0 4px 20px ${accentColor}22` : "none",
                    transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                  }}>
                  <motion.span animate={isSelected ? { scale: [1, 1.3, 1.1, 1] } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 14, duration: 0.5 }}
                    className="text-[22px] block">{choice.emoji}</motion.span>
                  <span className="text-[12px] font-bold" style={{ color: isSelected ? accentColor : T2 }}>{choice.label}</span>
                  <AnimatePresence>
                    {showHearts && choice.label === "Đồng ý" && <HeartBurst burstKey={heartBurstKey} />}
                  </AnimatePresence>
                </motion.button>
              </div>
            );
          })}
        </div>
        <p className="text-[12px]" style={{ color: T3 }}>Mỗi lựa chọn đều cập nhật ngay cho cả nhóm.</p>
      </motion.div>

      {/* Mimi waiting bubble */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="flex items-center gap-2.5 rounded-2xl px-4 py-3 mb-4"
        style={{ background: "rgba(200,55,30,0.05)", border: "1px solid rgba(200,55,30,0.12)" }}>
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-[18px] flex-shrink-0">🐾</motion.span>
        <p className="text-[12px] font-medium flex-1" style={{ color: BLUE_BRIGHT }}>
          Mimi đang chờ cả nhóm vote xong để cùng đi chơi!
        </p>
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
