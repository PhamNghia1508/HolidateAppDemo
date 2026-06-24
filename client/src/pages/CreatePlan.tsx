import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Sparkles, Calendar, Users } from "lucide-react";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const SURF2 = "#F8FAFC";
const BLUE = "#3B82F6";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";

export default function CreatePlan() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState("mood");
  const [selectedGroup, setSelectedGroup] = useState("Bạn bè");
  const [selectedMood, setSelectedMood] = useState<string[]>(["Chill"]);
  const [selectedLocation, setSelectedLocation] = useState("Gần tôi");
  const [budget, setBudget] = useState(50);

  const groups = ["Bạn bè", "Gia đình", "Người yêu"];
  const moods = ["Chill", "Ăn ngon", "Ảnh đẹp", "Phiêu lưu"];
  const locations = ["Gần tôi", "Quận 1", "Thủ Đức", "Tùy chọn"];
  const steps = ["Mood", "Thời gian", "Ngân sách"];
  const budgetLabels = ["100k", "300k", "600k", "1M+"];

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

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 420, damping: 35 }} className="pt-6 mb-5">
        <div className="page-label mb-1">Tạo plan</div>
        <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Tạo Gather trong ngày</h1>
        <p className="text-[13px] mt-1" style={{ color: T2 }}>GatherGo sẽ cân bằng quãng đường, ngân sách và vibe của cả nhóm.</p>
      </motion.div>

      {/* Steps */}
      <div className="flex gap-2 mb-6">
        {steps.map((s) => (
          <button key={s} onClick={() => setStep(s.toLowerCase())}
            className="px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all border focus:outline-none"
            style={{
              background: step === s.toLowerCase() ? T1 : SURF,
              color: step === s.toLowerCase() ? "#FFFFFF" : T2,
              border: `1px solid ${step === s.toLowerCase() ? T1 : BORDER}`,
              boxShadow: SHADOW,
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-5 mb-5" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <AnimatePresence mode="wait">
          {step === "mood" && (
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
          {step === "thời gian" && (
            <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: BLUE }} />
              <p className="text-[16px] font-semibold" style={{ color: T1 }}>Thứ bảy, 18:30</p>
              <p className="text-[13px] mt-2" style={{ color: T3 }}>4 người • có thể đổi sau khi vote</p>
            </motion.div>
          )}
          {step === "ngân sách" && (
            <motion.div key="budget" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[16px] font-bold" style={{ color: T1 }}>Ngân sách</span>
                <span className="text-[16px] font-bold" style={{ color: BLUE }}>
                  {budgetLabels[Math.floor((budget / 100) * (budgetLabels.length - 1))] || "300k"}
                </span>
              </div>
              <input type="range" min="0" max="100" value={budget} onChange={e => setBudget(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: BLUE }} />
              <div className="flex justify-between mt-2 text-[11px]" style={{ color: T3 }}>
                {budgetLabels.map(l => <span key={l}>{l}</span>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Time row */}
      <div className="flex items-center gap-3 rounded-2xl p-4 mb-5"
        style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,0.10)" }}>
          <Calendar className="w-5 h-5" style={{ color: BLUE }} />
        </div>
        <div>
          <p className="text-[15px] font-bold" style={{ color: T1 }}>Thứ bảy, 18:30</p>
          <p className="text-[12px]" style={{ color: T3 }}>4 người • có thể đổi sau khi vote</p>
        </div>
      </div>

      <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
        onClick={() => setLocation("/suggested")}
        className="w-full h-[52px] premium-cta-mint flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" /> Gợi ý lịch trình
      </motion.button>

      <BottomNav />
    </div>
  );
}
