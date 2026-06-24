import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Heart, Sparkles, Calendar } from "lucide-react";

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
    <div className="min-h-screen bg-[#f3eee8] flex flex-col max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto pb-24 px-6">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-4 mb-4">
          <span className="text-sm font-medium text-ink">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-1 h-1 rounded-full bg-ink" />
            <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-[26px] font-bold text-ink mb-2"
        >
          Tạo Gather trong ngày
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-[14px] text-muted-foreground mb-6"
        >
          GatherGo sẽ cân bằng quãng đường, ngân sách và vibe của cả nhóm.
        </motion.p>

        {/* Step Indicator with animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-6"
        >
          {steps.map((s, i) => (
            <motion.button
              key={s}
              onClick={() => setStep(s.toLowerCase())}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                step === s.toLowerCase()
                  ? "bg-sage text-white"
                  : "bg-white text-muted-foreground border border-border"
              }`}
            >
              {s}
            </motion.button>
          ))}
        </motion.div>

        {/* Form Card with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260 }}
          className="bg-white rounded-[20px] p-5 border border-border/30 mb-5"
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
                    <span className="text-[14px] font-semibold text-ink">Đi với ai?</span>
                    <Heart className="w-5 h-5 text-sage" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groups.map((g, i) => (
                      <motion.button
                        key={g}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedGroup(g)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                          selectedGroup === g
                            ? "bg-sage text-white border-sage"
                            : "bg-white text-sage border-sage/30"
                        }`}
                      >
                        {g}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px] font-semibold text-ink">Mood hôm nay</span>
                    <Sparkles className="w-5 h-5 text-sage" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((m, i) => (
                      <motion.button
                        key={m}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setSelectedMood((prev) =>
                            prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
                          )
                        }
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                          selectedMood.includes(m)
                            ? "bg-sage text-white border-sage"
                            : "bg-white text-sage border-sage/30"
                        }`}
                      >
                        {m}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[14px] font-semibold text-ink">Khu vực</span>
                    <MapPin className="w-5 h-5 text-sage" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((l, i) => (
                      <motion.button
                        key={l}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedLocation(l)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                          selectedLocation === l
                            ? "bg-sage text-white border-sage"
                            : "bg-white text-sage border-sage/30"
                        }`}
                      >
                        {l}
                      </motion.button>
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
                <Calendar className="w-12 h-12 text-sage mx-auto mb-4" />
                <p className="text-[16px] font-semibold text-ink">Thứ bảy, 18:30</p>
                <p className="text-[13px] text-muted-foreground mt-2">4 người • có thể đổi sau khi vote</p>
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
                  <span className="text-[14px] font-semibold text-ink">Ngân sách</span>
                  <motion.span
                    key={budgetValue}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-[14px] font-bold text-sage"
                  >
                    {budgetValue}
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-sage/10 rounded-full appearance-none cursor-pointer accent-sage"
                />
                <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="flex items-center gap-3 bg-sage-light/30 rounded-[16px] p-4 mb-5 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-sage" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">Thứ bảy, 18:30</p>
            <p className="text-[12px] text-muted-foreground">4 người • có thể đổi sau khi vote</p>
          </div>
        </motion.div>

        {/* CTA with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={() => setLocation("/suggested")}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors overflow-hidden"
            data-testid="button-suggest"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-200%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Gợi ý lịch trình
            </span>
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
