import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Clock, Users, ChevronRight, Plus, Zap, Lock, FileEdit, CheckCircle2 } from "lucide-react";

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
const GREEN = "#3D6B4F";

// Route stop motif — the signature design element
function RouteTrail({ stops, color, compact = false }: { stops: string[]; color: string; compact?: boolean }) {
  return (
    <div className="flex items-center overflow-hidden">
      {stops.map((stop, i) => (
        <div key={i} className="flex items-center min-w-0">
          <div className="flex-shrink-0" style={{
            width: i === 0 ? 7 : 5,
            height: i === 0 ? 7 : 5,
            borderRadius: "50%",
            background: i === 0 ? color : `${color}70`,
            boxShadow: i === 0 ? `0 0 0 2px ${color}22` : "none",
          }} />
          {!compact && (
            <span className="text-[10px] font-semibold px-1 truncate max-w-[68px]"
              style={{ color: i === 0 ? T1 : T2 }}>
              {stop}
            </span>
          )}
          {i < stops.length - 1 && (
            <div className="flex-shrink-0" style={{
              width: compact ? 14 : 10,
              height: 1,
              background: `${color}35`,
              marginLeft: compact ? 2 : 0,
              marginRight: compact ? 2 : 0,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// Member vote avatar row
function MemberVotes({
  members, votedCount, totalCount, accentColor,
}: {
  members: { i: string; color: string }[];
  votedCount: number; totalCount: number; accentColor: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {members.map((m, idx) => {
        const voted = idx < votedCount;
        return (
          <motion.div key={idx}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + idx * 0.05, type: "spring", stiffness: 500, damping: 24 }}
            className="relative w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{
              background: voted ? m.color : "rgba(26,14,7,0.10)",
              border: `1.5px solid ${voted ? "white" : "transparent"}`,
              color: voted ? "white" : T3,
              opacity: voted ? 1 : 0.55,
            }}>
            {m.i}
            {voted && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center"
                style={{ background: GREEN, border: "1.5px solid white" }}>
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <path d="M1 3l1.5 1.5L5 1.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

const savedPlans = [
  {
    id: 1,
    title: "Rooftop chill night",
    time: "Thứ bảy, 18:30",
    stops: ["Vinhomes", "Skyline Coffee", "Bar 86"],
    cost: "520k/người",
    group: "Bạn bè",
    groupColor: BLUE,
    mood: "Chill 🌙",
    status: "voting" as const,
    urgencyText: "Linh và Minh đã đồng ý • còn An",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=240&h=120&fit=crop",
    members: [
      { i: "N", color: BLUE },
      { i: "L", color: "#8B5CF6" },
      { i: "M", color: WARN },
      { i: "A", color: "#9C8470" },
    ],
    votedCount: 2,
    totalCount: 4,
  },
  {
    id: 2,
    title: "Food tour Quận 1",
    time: "Chủ nhật, 17:00",
    stops: ["Bến Thành", "Nhà Hàng Ngon", "Chả Cá", "Cà Phê Trứng"],
    cost: "380k/người",
    group: "Gia đình",
    groupColor: WARN,
    mood: "Ăn ngon 🍜",
    status: "locked" as const,
    urgencyText: null,
    img: null,
    members: [
      { i: "B", color: WARN },
      { i: "M", color: "#F97316" },
      { i: "D", color: GREEN },
    ],
    votedCount: 3,
    totalCount: 3,
  },
  {
    id: 3,
    title: "Picnic công viên",
    time: "Thứ năm, 15:00",
    stops: ["Công viên Gia Định", "Cafe sân vườn"],
    cost: "260k/người",
    group: "Người yêu",
    groupColor: "#EC4899",
    mood: "Nhẹ nhàng 🌸",
    status: "draft" as const,
    urgencyText: null,
    img: null,
    members: [
      { i: "N", color: BLUE },
      { i: "T", color: "#EC4899" },
    ],
    votedCount: 0,
    totalCount: 2,
  },
];

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 420, damping: 32 });

export default function Plan() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-5 relative" style={{ background: BG }}>

      {/* Header */}
      <div className="flex items-center justify-between pt-6 mb-2">
        <div>
          <div className="page-label mb-1">Plan</div>
          <h1 className="text-[28px] font-black tracking-tight" style={{ color: T1 }}>Lịch trình của bạn</h1>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/create-plan")}
          className="h-9 px-4 rounded-xl font-bold text-[13px] premium-cta-mint flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Tạo mới
        </motion.button>
      </div>

      {/* Route motif decoration */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-1.5 mb-5">
        {[BLUE, WARN, GREEN, T3].map((c, i) => (
          <div key={i} className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: c, opacity: i === 3 ? 0.4 : 0.7 }} />
            {i < 3 && <div className="w-6 h-px mx-0.5" style={{ background: `${c}40` }} />}
          </div>
        ))}
        <span className="text-[10px] font-semibold ml-1" style={{ color: T3 }}>3 lịch trình đang hoạt động</span>
      </motion.div>

      {/* Stats — minimal chips */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(0)}
        className="flex gap-2 mb-5">
        {[
          { value: "3", label: "Plan", color: BLUE, bg: "rgba(200,55,30,0.08)" },
          { value: "1", label: "Đang vote", color: WARN, bg: "rgba(200,134,10,0.08)" },
          { value: "1", label: "Đã chốt", color: GREEN, bg: "rgba(61,107,79,0.08)" },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: s.bg, border: `1px solid ${s.color}22` }}>
            <span className="text-[15px] font-black" style={{ color: s.color }}>{s.value}</span>
            <span className="text-[11px] font-semibold" style={{ color: s.color }}>{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Plan list */}
      <div className="space-y-3">
        {savedPlans.map((plan, i) => {
          const isVoting = plan.status === "voting";
          const isLocked = plan.status === "locked";
          const isDraft = plan.status === "draft";

          return (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={S(i + 2)}>

              {/* ── VOTING CARD ── cinematic, urgent, live */}
              {isVoting && (
                <motion.button whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation("/vote")}
                  className="w-full text-left rounded-3xl overflow-hidden focus:outline-none"
                  style={{
                    boxShadow: "0 4px 24px rgba(200,55,30,0.15), 0 1px 4px rgba(200,55,30,0.10)",
                    border: "1.5px solid rgba(200,55,30,0.22)",
                  }}>
                  {/* Photo hero */}
                  {plan.img && (
                    <div className="relative h-[120px] w-full overflow-hidden">
                      <img src={plan.img} alt={plan.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to bottom, rgba(26,14,7,0.10) 0%, rgba(26,14,7,0.70) 100%)" }} />
                      {/* LIVE badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}>
                        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full" style={{ background: "#EF4444" }} />
                        <span className="text-[10px] font-black" style={{ color: T1 }}>LIVE VOTE</span>
                      </div>
                      {/* Progress in hero */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-semibold text-white/80">{plan.urgencyText}</span>
                          <span className="text-[11px] font-black" style={{ color: "#F4A07A" }}>
                            {plan.votedCount}/{plan.totalCount}
                          </span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.20)" }}>
                          <motion.div className="h-full rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(plan.votedCount / plan.totalCount) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3, type: "spring" }}
                            style={{ background: "rgba(255,255,255,0.85)" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Card body */}
                  <div className="p-4" style={{ background: SURF }}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-[18px] font-black leading-tight" style={{ color: T1 }}>{plan.title}</h3>
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: T3 }} />
                    </div>
                    {/* Route trail */}
                    <div className="mb-3">
                      <RouteTrail stops={plan.stops} color={plan.groupColor} />
                    </div>
                    {/* Meta row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[11px]" style={{ color: T3 }}>
                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{plan.time}</div>
                        <span>{plan.cost}</span>
                      </div>
                      <MemberVotes members={plan.members} votedCount={plan.votedCount} totalCount={plan.totalCount} accentColor={plan.groupColor} />
                    </div>
                  </div>
                </motion.button>
              )}

              {/* ── LOCKED CARD ── clean success state */}
              {isLocked && (
                <motion.button whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation("/plan-detail")}
                  className="w-full text-left rounded-2xl overflow-hidden focus:outline-none"
                  style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
                  {/* Green locked top strip */}
                  <div className="flex items-center gap-2.5 px-4 pt-4 pb-3"
                    style={{ borderBottom: "1px solid rgba(61,107,79,0.12)" }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(61,107,79,0.12)" }}>
                      <Lock className="w-3.5 h-3.5" style={{ color: GREEN }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GREEN }}>Đã chốt ✓</p>
                      <h3 className="text-[16px] font-black leading-tight truncate" style={{ color: T1 }}>{plan.title}</h3>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0"
                      style={{ background: "rgba(61,107,79,0.08)", border: "1px solid rgba(61,107,79,0.20)" }}>
                      <span className="text-[11px] font-semibold" style={{ color: GREEN }}>{plan.group}</span>
                    </div>
                  </div>
                  <div className="px-4 pb-4 pt-3">
                    <RouteTrail stops={plan.stops} color={plan.groupColor} />
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center gap-3 text-[11px]" style={{ color: T3 }}>
                        <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{plan.time}</div>
                        <span>{plan.cost}</span>
                      </div>
                      <MemberVotes members={plan.members} votedCount={plan.votedCount} totalCount={plan.totalCount} accentColor={plan.groupColor} />
                    </div>
                  </div>
                </motion.button>
              )}

              {/* ── DRAFT CARD ── muted, inactive */}
              {isDraft && (
                <motion.button whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation("/create-plan")}
                  className="w-full text-left rounded-2xl overflow-hidden focus:outline-none"
                  style={{
                    background: "#FAFAF9",
                    border: `1.5px dashed ${BORDER}`,
                    opacity: 0.85,
                  }}>
                  <div className="px-4 py-3.5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                            style={{ background: "#EDE3D0", border: "1px solid rgba(26,14,7,0.12)" }}>
                            <FileEdit className="w-3 h-3" style={{ color: T3 }} />
                            <span className="text-[10px] font-bold" style={{ color: T3 }}>NHÁP</span>
                          </div>
                          <span className="text-[11px]" style={{ color: T3 }}>{plan.group}</span>
                        </div>
                        <h3 className="text-[16px] font-black" style={{ color: T2 }}>{plan.title}</h3>
                      </div>
                      <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: T3 }} />
                    </div>
                    <RouteTrail stops={plan.stops} color={T3} />
                    <div className="flex items-center gap-3 mt-2 text-[11px]" style={{ color: T3 }}>
                      <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{plan.time}</div>
                      <span>{plan.cost}</span>
                    </div>
                  </div>
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Mimi nudge */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
        className="flex items-center gap-2.5 rounded-2xl px-4 py-3 mt-4"
        style={{ background: "rgba(200,55,30,0.05)", border: "1px solid rgba(200,55,30,0.10)" }}>
        <motion.span animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          className="text-[18px]">🐾</motion.span>
        <p className="text-[12px] font-medium flex-1" style={{ color: BLUE_BRIGHT }}>
          Mimi đang chờ cả nhóm vote xong để được đi chơi cùng!
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
