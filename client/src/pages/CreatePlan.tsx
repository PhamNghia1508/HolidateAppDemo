import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Heart, Sparkles, Calendar, Users } from "lucide-react";

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
  const budgetValue = budgetLabels[Math.floor((budget / 100) * (budgetLabels.length - 1))] || "300k-600k";

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,35,30,0.08) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      {/* Background image */}
      <div className="absolute top-0 right-0 w-full h-[200px] overflow-hidden opacity-30">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFF8EF]" />
      </div>

      <div className="flex-1 overflow-y-auto pb-28 px-5 relative z-10">
        {/* Header */}
        <div className="pt-5 mb-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
            Tạo plan
          </div>
          <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">Tạo Gather trong ngày</h1>
          <p className="text-[14px] text-[#7B6658] mt-1">
            GatherGo sẽ cân bằng quãng đường, ngân sách và vibe của cả nhóm.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-3 mb-6">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(s.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all backdrop-blur-sm border ${
                step === s.toLowerCase()
                  ? "bg-[#10231E] text-white border-[#10231E]/50 shadow-md"
                  : "bg-white/60 text-[#7B6658] border-white/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <div className="premium-glass-card p-5 mb-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}>
          <AnimatePresence mode="wait">
            {step === "mood" && (
              <motion.div
                key="mood"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Group */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px] font-semibold text-[#231F1B]">Đi với ai?</span>
                    <Users className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groups.map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGroup(g)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
                          selectedGroup === g
                            ? "bg-[#10231E] text-white border-[#10231E] shadow-md"
                            : "bg-white/70 text-[#231F1B] border-[#7B6658]/20"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px] font-semibold text-[#231F1B]">Mood hôm nay</span>
                    <Sparkles className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((m) => (
                      <button
                        key={m}
                        onClick={() =>
                          setSelectedMood((prev) =>
                            prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
                          )
                        }
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
                          selectedMood.includes(m)
                            ? "bg-[#10231E] text-white border-[#10231E] shadow-md"
                            : "bg-white/70 text-[#231F1B] border-[#7B6658]/20"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px] font-semibold text-[#231F1B]">Khu vực</span>
                    <MapPin className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLocation(l)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
                          selectedLocation === l
                            ? "bg-[#10231E] text-white border-[#10231E] shadow-md"
                            : "bg-white/70 text-[#231F1B] border-[#7B6658]/20"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === "thời gian" && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-center py-8"
              >
                <Calendar className="w-12 h-12 text-[#4a7c59] mx-auto mb-4" />
                <p className="text-[16px] font-semibold text-[#231F1B]">Thứ bảy, 18:30</p>
                <p className="text-[13px] text-[#7B6658] mt-2">4 người • có thể đổi sau khi vote</p>
              </motion.div>
            )}

            {step === "ngân sách" && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] font-semibold text-[#231F1B]">Ngân sách</span>
                  <span className="text-[14px] font-bold text-[#4a7c59]">{budgetValue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-[#4a7c59]/20 rounded-full appearance-none cursor-pointer accent-[#4a7c59]"
                />
                <div className="flex justify-between mt-2 text-[11px] text-[#7B6658]">
                  {budgetLabels.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Time card */}
        <div className="flex items-center gap-3 rounded-[16px] p-4 mb-5 border border-white/60 backdrop-blur-md bg-white/50 cursor-pointer hover:bg-white/70 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-[#4a7c59]/15 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#4a7c59]" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#231F1B]">Thứ bảy, 18:30</p>
            <p className="text-[12px] text-[#7B6658]">4 người • có thể đổi sau khi vote</p>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/suggested")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A4C 50%, #F3D37A 100%)",
            boxShadow: "0 8px 32px rgba(255,107,74,0.35), 0 0 60px rgba(255,107,74,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          <Sparkles className="w-4 h-4" />
          Gợi ý lịch trình
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
