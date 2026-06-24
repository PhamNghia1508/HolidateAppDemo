import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import SpatialCard from "@/components/SpatialCard";
import SpringButton from "@/components/SpringButton";
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
      className="min-h-screen flex flex-col max-w-md mx-auto relative"
      style={{ background: "linear-gradient(180deg, #f3eee8 0%, #e8e0d6 100%)" }}
    >
      {/* Background image */}
      <div className="absolute top-0 right-0 w-full h-[200px] overflow-hidden opacity-30">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f3eee8]" />
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-6 relative z-10">
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
        <h1 className="text-[26px] font-bold text-ink mb-2">Tạo Gather trong ngày</h1>
        <p className="text-[14px] text-muted-foreground mb-6">
          GatherGo sẽ cân bằng quãng đường, ngân sách và vibe của cả nhóm.
        </p>

        {/* Step Indicator */}
        <div className="flex gap-3 mb-6">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(s.toLowerCase())}
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all backdrop-blur-sm border ${
                step === s.toLowerCase()
                  ? "bg-sage/90 text-white border-sage/50 shadow-md"
                  : "bg-white/60 text-muted-foreground border-white/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Form Card - SpatialCard */}
        <SpatialCard glow="sage" className="mb-5">
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
                    <Users className="w-5 h-5 text-sage" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {groups.map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGroup(g)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
                          selectedGroup === g
                            ? "bg-sage text-white border-sage shadow-md shadow-sage/20"
                            : "bg-white/70 text-sage border-sage/30"
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
                    <span className="text-[14px] font-semibold text-ink">Mood hôm nay</span>
                    <Sparkles className="w-5 h-5 text-sage" />
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
                            ? "bg-sage text-white border-sage shadow-md shadow-sage/20"
                            : "bg-white/70 text-sage border-sage/30"
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
                    <span className="text-[14px] font-semibold text-ink">Khu vực</span>
                    <MapPin className="w-5 h-5 text-sage" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {locations.map((l) => (
                      <button
                        key={l}
                        onClick={() => setSelectedLocation(l)}
                        className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all ${
                          selectedLocation === l
                            ? "bg-sage text-white border-sage shadow-md shadow-sage/20"
                            : "bg-white/70 text-sage border-sage/30"
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
                  <span className="text-[14px] font-bold text-sage">{budgetValue}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-sage/20 rounded-full appearance-none cursor-pointer accent-sage"
                />
                <div className="flex justify-between mt-2 text-[11px] text-muted-foreground">
                  {budgetLabels.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SpatialCard>

        {/* Time card */}
        <div className="flex items-center gap-3 rounded-[16px] p-4 mb-5 border border-white/60 backdrop-blur-md bg-white/50 cursor-pointer hover:bg-white/70 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-sage/15 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-sage" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">Thứ bảy, 18:30</p>
            <p className="text-[12px] text-muted-foreground">4 người • có thể đổi sau khi vote</p>
          </div>
        </div>

        {/* Spring CTA */}
        <SpringButton onClick={() => setLocation("/suggested")} data-testid="button-suggest">
          <Sparkles className="w-4 h-4" />
          Gợi ý lịch trình
        </SpringButton>
      </div>

      <BottomNav />
    </div>
  );
}
