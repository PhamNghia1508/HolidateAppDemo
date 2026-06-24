import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Sparkles, Calendar, Users } from "lucide-react";

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

  const cardStagger = (i: number) => ({
    delay: i * 0.08,
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  });

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      <div className="ambient-mint-blur top-20 left-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="pt-6 mb-5"
        >
          <div className="page-label mb-1">Tạo plan</div>
          <h1 className="text-heading text-[#FAFAFA] tracking-tight font-black">Tạo Gather trong ngày</h1>
          <p className="text-body text-[#A1A1AA] mt-1">
            GatherGo sẽ cân bằng quãng đường, ngân sách và vibe của cả nhóm.
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          {steps.map((s) => (
            <button
              key={s}
              onClick={() => setStep(s.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all border focus:outline-none ${
                step === s.toLowerCase()
                  ? "bg-[#FAFAFA] text-[#09090B] border-[#FAFAFA]"
                  : "bg-[#121214] text-[#71717A] border-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardStagger(0)}
          className="obsidian-card p-5 mb-5"
        >
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
                    <span className="text-title text-[#FAFAFA]">Đi với ai?</span>
                    <Users className="w-5 h-5 text-[#00E5A8]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groups.map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGroup(g)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all focus:outline-none ${
                          selectedGroup === g
                            ? "bg-[#FAFAFA] text-[#09090B] border-[#FAFAFA]"
                            : "bg-[#18181B] text-[#A1A1AA] border-white/10"
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
                    <span className="text-title text-[#FAFAFA]">Mood hôm nay</span>
                    <Sparkles className="w-5 h-5 text-[#00E5A8]" />
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
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all focus:outline-none ${
                          selectedMood.includes(m)
                            ? "bg-[#FAFAFA] text-[#09090B] border-[#FAFAFA]"
                            : "bg-[#18181B] text-[#A1A1AA] border-white/10"
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
                    <span className="text-title text-[#FAFAFA]">Khu vực</span>
                    <MapPin className="w-5 h-5 text-[#00E5A8]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLocation(l)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all focus:outline-none ${
                          selectedLocation === l
                            ? "bg-[#FAFAFA] text-[#09090B] border-[#FAFAFA]"
                            : "bg-[#18181B] text-[#A1A1AA] border-white/10"
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
                <Calendar className="w-12 h-12 text-[#00E5A8] mx-auto mb-4" />
                <p className="text-[16px] font-semibold text-[#FAFAFA]">Thứ bảy, 18:30</p>
                <p className="text-body text-[#71717A] mt-2">4 người • có thể đổi sau khi vote</p>
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
                  <span className="text-title text-[#FAFAFA]">Ngân sách</span>
                  <span className="text-title text-[#00E5A8]">{budgetValue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-[#00E5A8]/20 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: "#00E5A8" }}
                />
                <div className="flex justify-between mt-2 text-[11px] text-[#71717A]">
                  {budgetLabels.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Time card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardStagger(1)}
          className="flex items-center gap-3 rounded-2xl p-4 mb-5 border border-white/10 bg-[#121214] cursor-pointer hover:bg-[#18181B] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00E5A8]/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#00E5A8]" />
          </div>
          <div>
            <p className="text-title text-[#FAFAFA]">Thứ bảy, 18:30</p>
            <p className="text-body text-[#71717A]">4 người • có thể đổi sau khi vote</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardStagger(2)}
        >
          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation("/suggested")}
            className="w-full h-[52px] premium-cta-mint flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Gợi ý lịch trình
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
