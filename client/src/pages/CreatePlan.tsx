import { useState } from "react";
import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";
import { MapPin, Heart, Sparkles, Calendar } from "lucide-react";

export default function CreatePlan() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState("mood");
  const [selectedGroup, setSelectedGroup] = useState("Bạn bè");
  const [selectedMood, setSelectedMood] = useState<string[]>(["Chill"]);
  const [selectedLocation, setSelectedLocation] = useState("Gần tôi");

  const groups = ["Bạn bè", "Gia đình", "Người yêu"];
  const moods = ["Chill", "Ăn ngon", "Ảnh đẹp", "Phiêu lưu"];
  const locations = ["Gần tôi", "Quận 1", "Thủ Đức", "Tùy chọn"];

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
        <h1 className="text-[26px] font-bold text-ink mb-2">Tạo Gather trong ngày</h1>
        <p className="text-[14px] text-muted-foreground mb-6">
          GatherGo sẽ cân bằng quãng đường, ngân sách và vibe của cả nhóm.
        </p>

        {/* Step Indicator */}
        <div className="flex gap-3 mb-6">
          {["Mood", "Thời gian", "Ngân sách"].map((s, i) => (
            <span
              key={s}
              className={`px-4 py-1.5 rounded-full text-[12px] font-semibold ${
                i === 0
                  ? "bg-sage text-white"
                  : "bg-white text-muted-foreground border border-border"
              }`}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          {/* Group */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-semibold text-ink">Đi với ai?</span>
              <Heart className="w-5 h-5 text-sage" />
            </div>
            <div className="flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGroup(g)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                    selectedGroup === g
                      ? "bg-sage text-white border-sage"
                      : "bg-white text-sage border-sage/30"
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
                  onClick={() => setSelectedMood((prev) =>
                    prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
                  )}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                    selectedMood.includes(m)
                      ? "bg-sage text-white border-sage"
                      : "bg-white text-sage border-sage/30"
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
                  className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                    selectedLocation === l
                      ? "bg-sage text-white border-sage"
                      : "bg-white text-sage border-sage/30"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Slider */}
          <div className="mt-5 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-semibold text-ink">Ngân sách</span>
              <span className="text-[14px] font-bold text-sage">300k–600k</span>
            </div>
            <div className="w-full h-2 bg-sage/10 rounded-full overflow-hidden">
              <div className="w-[60%] h-full bg-sage rounded-full" />
            </div>
          </div>
        </div>

        {/* Time card */}
        <div className="flex items-center gap-3 bg-sage-light/30 rounded-[16px] p-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-sage" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-ink">Thứ bảy, 18:30</p>
            <p className="text-[12px] text-muted-foreground">4 người • có thể đổi sau khi vote</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setLocation("/suggested")}
          className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors"
          data-testid="button-suggest"
        >
          Gợi ý lịch trình
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
