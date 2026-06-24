import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Sparkles, Calendar, Users, ChevronRight } from "lucide-react";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";

const STEPS = [
  { key: "mood", label: "Mood & Nhóm", num: 1 },
  { key: "time", label: "Thời gian", num: 2 },
  { key: "budget", label: "Ngân sách", num: 3 },
];

export default function CreatePlan() {
  const [, setLocation] = useLocation();
  const [stepIdx, setStepIdx] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState("Bạn bè");
  const [selectedMood, setSelectedMood] = useState<string[]>(["Chill"]);
  const [selectedLocation, setSelectedLocation] = useState("Gần tôi");
  const [budget, setBudget] = useState(50);

  const groups = ["Bạn bè", "Gia đình", "Người yêu"];
  const moods = ["Chill", "Ăn ngon", "Ảnh đẹp", "Phiêu lưu"];
  const locations = ["Gần tôi", "Quận 1", "Thủ Đức", "Tùy chọn"];
  const budgetLabels = ["100k", "300k", "600k", "1M+"];
  const currentStep = STEPS[stepIdx];

  const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button onClick={onClick}
      className="px-4 py-2 rounded-full text-[13px] font-semibold border transition-all focus:outline-none"
      style={{
        background: active ? T1 : SURF,
        color: active ? "#FFFFFF" : T2,
        border: `1px solid ${active ? T1 : BORDER}`,
        boxShadow: active ? "0 2px 8px rgba(15,23,42,0.18)" : SHADOW,
      }}>
      {label}
    </button>
  );

  const canAdvance = stepIdx < STEPS.length - 1;

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 420, damping: 35 }} className="pt-6 mb-5">
        <div className="page-label mb-1">Tạo plan</div>
        <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Tạo Gather trong ngày</h1>
        <p className="text-[13px] mt-1" style={{ color: T2 }}>GatherGo sẽ cân bằng quãng đường, ngân sách và vibe của cả nhóm.</p>
      </motion.div>

      {/* Step Progress — visual stepper, not ambiguous tabs */}
      <div className="flex items-center gap-0 mb-6">
        {STEPS.map((step, i) => {
          const isActive = i === stepIdx;
          const isDone = i < stepIdx;
          return (
            <div key={step.key} className="flex items-center flex-1">
              <button
                onClick={() => i <= stepIdx && setStepIdx(i)}
                className="flex flex-col items-center gap-1 focus:outline-none"
                style={{ opacity: i > stepIdx ? 0.4 : 1, cursor: i > stepIdx ? "default" : "pointer" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-black transition-all"
                  style={{
                    background: isDone ? "#22C55E" : isActive ? BLUE : SURF,
                    color: isDone || isActive ? "#FFFFFF" : T3,
                    border: `2px solid ${isDone ? "#22C55E" : isActive ? BLUE : BORDER}`,
                    boxShadow: isActive ? `0 0 0 4px rgba(59,130,246,0.15)` : "none",
                  }}>
                  {isDone ? "✓" : step.num}
                </div>
                <span className="text-[10px] font-semibold whitespace-nowrap"
                  style={{ color: isActive ? BLUE_BRIGHT : isDone ? "#22C55E" : T3 }}>
                  {step.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 rounded-full"
                  style={{ background: i < stepIdx ? "#22C55E" : BORDER }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 mb-5" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <AnimatePresence mode="wait">
          {stepIdx === 0 && (
            <motion.div key="mood" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[16px] font-bold" style={{ color: T1 }}>Đi với ai?</span>
                  <Users className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {groups.map(g => <Chip key={g} label={g} active={selectedGroup === g} onClick={() => setSelectedGroup(g)} />)}
                </div>
              </div>
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[16px] font-bold" style={{ color: T1 }}>Mood hôm nay</span>
                  <Sparkles className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {moods.map(m => (
                    <Chip key={m} label={m} active={selectedMood.includes(m)}
                      onClick={() => setSelectedMood(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m])} />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[16px] font-bold" style={{ color: T1 }}>Khu vực</span>
                  <MapPin className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {locations.map(l => <Chip key={l} label={l} active={selectedLocation === l} onClick={() => setSelectedLocation(l)} />)}
                </div>
              </div>
            </motion.div>
          )}

          {stepIdx === 1 && (
            <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[16px] font-bold" style={{ color: T1 }}>Chọn thời gian</span>
                <Calendar className="w-5 h-5" style={{ color: BLUE }} />
              </div>
              {[
                { day: "Thứ bảy", date: "28/6", time: "18:30", highlight: true },
                { day: "Chủ nhật", date: "29/6", time: "15:00", highlight: false },
                { day: "Thứ hai", date: "30/6", time: "19:00", highlight: false },
              ].map((opt, i) => (
                <motion.button key={i} whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl mb-2"
                  style={{
                    background: opt.highlight ? "rgba(59,130,246,0.08)" : "#F8FAFC",
                    border: `1.5px solid ${opt.highlight ? BLUE : BORDER}`,
                  }}>
                  <div className="text-left">
                    <p className="text-[14px] font-bold" style={{ color: T1 }}>{opt.day}, {opt.time}</p>
                    <p className="text-[12px]" style={{ color: T3 }}>{opt.date} • 4 người phù hợp</p>
                  </div>
                  {opt.highlight && <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: BLUE }}>
                    <span className="text-white text-[10px] font-black">✓</span>
                  </div>}
                </motion.button>
              ))}
            </motion.div>
          )}

          {stepIdx === 2 && (
            <motion.div key="budget" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[16px] font-bold" style={{ color: T1 }}>Ngân sách / người</span>
                <span className="text-[16px] font-black" style={{ color: BLUE }}>
                  {budgetLabels[Math.min(3, Math.floor((budget / 100) * 4))]}
                </span>
              </div>
              <input type="range" min="0" max="100" value={budget} onChange={e => setBudget(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer mb-2"
                style={{ accentColor: BLUE }} />
              <div className="flex justify-between text-[11px]" style={{ color: T3 }}>
                {budgetLabels.map(l => <span key={l}>{l}</span>)}
              </div>
              <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(59,130,246,0.06)", border: `1px solid rgba(59,130,246,0.15)` }}>
                <p className="text-[12px]" style={{ color: BLUE_BRIGHT }}>GatherGo sẽ lọc địa điểm phù hợp ngân sách này cho cả nhóm.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {stepIdx > 0 && (
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => setStepIdx(i => i - 1)}
            className="h-[52px] px-5 rounded-2xl font-semibold text-[15px]"
            style={{ background: SURF, border: `1px solid ${BORDER}`, color: T2, boxShadow: SHADOW }}>
            ← Quay lại
          </motion.button>
        )}
        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => canAdvance ? setStepIdx(i => i + 1) : setLocation("/suggested")}
          className="flex-1 h-[52px] premium-cta-mint flex items-center justify-center gap-2">
          {canAdvance ? (
            <><span>Tiếp theo</span><ChevronRight className="w-4 h-4" /></>
          ) : (
            <><Sparkles className="w-4 h-4" /><span>Gợi ý lịch trình</span></>
          )}
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
