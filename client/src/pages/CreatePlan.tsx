import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Sparkle, CalendarBlank, Users, CaretRight } from "@phosphor-icons/react";

const STEPS = [
  { key: "mood", label: "Mood & Nhóm", num: 1 },
  { key: "time", label: "Thời gian", num: 2 },
  { key: "budget", label: "Ngân sách", num: 3 },
];

const CTA_LABELS = [
  { label: "Chọn thời gian", icon: CalendarBlank },
  { label: "Thêm ngân sách", icon: CaretRight },
  { label: "Gợi ý ngay", icon: Sparkle },
];

// Live preview hints based on selections
function getHint(group: string, mood: string[], location: string) {
  const count = mood.includes("Chill") ? 12 : mood.includes("Ăn ngon") ? 18 : 9;
  const area = location === "Gần tôi" ? "gần bạn" : `tại ${location}`;
  return `Với ${mood[0] || "Chill"} + ${group} + ${area} → ${count} địa điểm hot`;
}

export default function CreatePlan() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialGroupParam = searchParams.get("group") || "friends";
  const mapParamToLabel = (param: string) => {
    switch (param) {
      case "family": return "Gia đình";
      case "couple": return "Người yêu";
      case "company": return "Công ty";
      case "friends":
      default: return "Bạn bè";
    }
  };

  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(mapParamToLabel(initialGroupParam));
  const [selectedMood, setSelectedMood] = useState<string[]>(["Chill"]);
  const [selectedLocation, setSelectedLocation] = useState("Gần tôi");
  const [budget, setBudget] = useState(50);

  const groups = ["Bạn bè", "Gia đình", "Công ty", "Người yêu"];
  const moods = ["Chill", "Ăn ngon", "Ảnh đẹp", "Phiêu lưu"];
  const locations = ["Gần tôi", "Quận 1", "Thủ Đức", "Tùy chọn"];
  const budgetLabels = ["100k", "300k", "600k", "1M+"];

  const canAdvance = stepIdx < STEPS.length - 1;
  const ctaLabel = CTA_LABELS[stepIdx];
  const hint = getHint(selectedGroup, selectedMood, selectedLocation);

  const getTimeHints = (group: string) => {
    if (group === "Người yêu") return ["Lịch rảnh chung", "1/2 người rảnh", "Chưa khớp lịch"];
    if (group === "Gia đình") return ["Cả nhà rảnh", "Ba bận", "Mẹ bận"];
    return ["4/4 bạn rảnh", "3/4 bạn rảnh", "2/4 bạn rảnh"];
  };
  const timeHints = getTimeHints(selectedGroup);

  const Chip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`px-5 py-3 rounded-none text-sm font-serif italic border transition-all shadow-sm ${
        active ? 'border-slate-900 text-slate-900 bg-white ring-1 ring-slate-900' : 'border-slate-200 text-slate-500 bg-white hover:border-slate-400'
      }`}>
      {label}
    </motion.button>
  );

  return (
    <div className="flex-1 overflow-y-auto pb-24 relative">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 35 }} className="pt-8 mb-8 px-6">
        <h1 className="font-serif text-4xl text-slate-900 leading-none mb-3 tracking-tight mt-2">Kể cho chúng tôi nghe...</h1>
        <p className="text-sm font-serif italic text-slate-500">Chúng tôi sẽ thiết kế một ngày hoàn hảo dành riêng cho bạn.</p>
      </motion.div>

      {/* Stepper Minimal */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((step, i) => {
          const isActive = i === stepIdx;
          const isDone = i < stepIdx;
          return (
            <div key={step.key} className="flex items-center flex-1">
              <button
                onClick={() => i <= stepIdx && setStepIdx(i)}
                className="flex items-center gap-2 focus:outline-none"
                style={{ opacity: i > stepIdx ? 0.3 : 1, cursor: i > stepIdx ? "default" : "pointer" }}>
                <span className={`font-serif text-lg ${isActive || isDone ? "text-slate-900" : "text-slate-400"}`}>
                  0{step.num}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-[1px] mx-4"
                  style={{ background: i < stepIdx ? "#0F172A" : "#E2E8F0" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* AI live preview hint */}
      <AnimatePresence>
        {stepIdx === 0 && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="mb-8"
          >
            <p className="text-sm font-bold text-slate-900 border-l-2 border-slate-900 pl-3 py-1">
              {hint}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Area */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="mb-8">
        <AnimatePresence mode="wait">
          {stepIdx === 0 && (
            <motion.div key="mood" custom={direction}
              initial={{ opacity: 0, x: 40 * direction }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * direction }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}>
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl text-slate-900">Đi với ai?</span>
                  <Users className="w-5 h-5 text-slate-400" weight="light" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {groups.map(g => <Chip key={g} label={g} active={selectedGroup === g} onClick={() => setSelectedGroup(g)} />)}
                </div>
              </div>
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl text-slate-900">Cảm hứng hôm nay</span>
                  <Sparkle className="w-5 h-5 text-slate-400" weight="light" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {moods.map(m => (
                    <Chip key={m} label={m} active={selectedMood.includes(m)}
                      onClick={() => setSelectedMood(p => p.includes(m) ? p.filter(x => x !== m) : [...p, m])} />
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl text-slate-900">Khu vực</span>
                  <MapPin className="w-5 h-5 text-slate-400" weight="light" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {locations.map(l => <Chip key={l} label={l} active={selectedLocation === l} onClick={() => setSelectedLocation(l)} />)}
                </div>
              </div>
            </motion.div>
          )}

          {stepIdx === 1 && (
            <motion.div key="time" custom={direction}
              initial={{ opacity: 0, x: 40 * direction }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * direction }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-2xl text-slate-900">Thời gian lý tưởng</span>
                <CalendarBlank className="w-5 h-5 text-slate-400" weight="light" />
              </div>
              {[
                { day: "Thứ bảy", date: "28/6", time: "18:30", highlight: true, hint: timeHints[0] },
                { day: "Chủ nhật", date: "29/6", time: "15:00", highlight: false, hint: timeHints[1] },
                { day: "Thứ hai", date: "30/6", time: "19:00", highlight: false, hint: timeHints[2] },
              ].map((opt, i) => (
                <motion.button key={i} whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-none flex items-center justify-between p-5 mb-4 border transition-all shadow-sm bg-white ${
                    opt.highlight ? 'border-slate-900 ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-400'
                  }`}>
                  <div className="text-left">
                    <p className={`font-serif text-lg ${opt.highlight ? 'text-slate-900' : 'text-slate-700'}`}>{opt.day}, {opt.time}</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{opt.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {opt.highlight && <div className="w-2 h-2 rounded-none bg-slate-900" />}
                    <span className={`text-[10px] font-bold uppercase tracking-[0.1em] ${opt.highlight ? 'text-slate-900' : 'text-slate-400'}`}>{opt.hint}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {stepIdx === 2 && (
            <motion.div key="budget" custom={direction}
              initial={{ opacity: 0, x: 40 * direction }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 * direction }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}>
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-2xl text-slate-900">Ngân sách / người</span>
                <span className="font-serif text-4xl text-slate-900 leading-none">
                  {budgetLabels[Math.min(3, Math.floor((budget / 100) * 4))]}
                </span>
              </div>
              <input type="range" min="0" max="100" value={budget} onChange={e => setBudget(Number(e.target.value))}
                className="w-full h-[2px] rounded-full appearance-none cursor-pointer mb-6"
                style={{ background: "#E2E8F0", accentColor: "#0F172A" }} />
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-10 text-slate-400">
                {budgetLabels.map(l => <span key={l}>{l}</span>)}
              </div>
              <div className="p-5 border-l-2 border-slate-900 bg-slate-50">
                <p className="font-serif italic text-base leading-relaxed text-slate-700">
                  Hệ thống sẽ cân chỉnh các nhà hàng, quán cafe và hoạt động giải trí sao cho phù hợp nhất với ngân sách chung của nhóm.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-4 mt-auto">
        {stepIdx > 0 && (
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => { setDirection(-1); setStepIdx(i => i - 1); }}
            className="w-[60px] h-[60px] rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-colors z-10">
            ←
          </motion.button>
        )}
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (canAdvance) {
              setDirection(1);
              setStepIdx(i => i + 1);
            } else {
              const mappedGroup = selectedGroup === "Người yêu" ? "couple" : selectedGroup === "Gia đình" ? "family" : selectedGroup === "Công ty" ? "company" : "friends";
              setLocation("/suggested?group=" + mappedGroup);
            }
          }}
          className="flex-1 h-[60px] bg-slate-900 text-white rounded-none shadow-md font-bold text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-wi-primary transition-colors z-10">
          <span>{ctaLabel.label}</span>
          {stepIdx < 2 && <CaretRight className="w-4 h-4" weight="bold" />}
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
