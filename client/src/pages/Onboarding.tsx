import { useLocation } from "wouter";
import { MapPin, Heart, Vote } from "lucide-react";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col px-6 py-4 max-w-md mx-auto">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink">9:41</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-ink" />
          <div className="w-1 h-1 rounded-full bg-ink" />
          <div className="w-4 h-2 rounded-sm border border-ink bg-ink" />
        </div>
      </div>

      {/* Brand */}
      <p className="text-sm font-medium text-sage mb-6">GatherGo</p>

      {/* Hero visual */}
      <div className="relative w-full h-[270px] rounded-3xl bg-sage-light/60 overflow-hidden mb-8 flex items-center justify-center">
        {/* Abstract route map */}
        <svg viewBox="0 0 342 270" className="absolute inset-0 w-full h-full">
          <path d="M50 180 Q120 100 200 60 Q280 20 320 50" stroke="#4a7c59" strokeWidth="2" strokeDasharray="8 6" fill="none" />
          <circle cx="50" cy="180" r="14" fill="#e8f5e9" stroke="#4a7c59" strokeWidth="2" />
          <circle cx="200" cy="60" r="14" fill="#fff3e0" stroke="#e76f51" strokeWidth="2" />
          <circle cx="320" cy="50" r="14" fill="#fce4ec" stroke="#e76f51" strokeWidth="2" />
          <text x="50" y="183" textAnchor="middle" fill="#4a7c59" fontSize="14">&#128205;</text>
          <text x="200" y="63" textAnchor="middle" fill="#e76f51" fontSize="14">&#128077;</text>
          <text x="320" y="53" textAnchor="middle" fill="#e76f51" fontSize="14">&#10084;</text>
        </svg>
        {/* Floating bubbles */}
        <div className="absolute top-6 left-6 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-coral" />
            <span className="text-sm font-medium text-ink">3 plan sẵn sàng</span>
          </div>
        </div>
        <div className="absolute top-24 right-6 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-sage" />
            <span className="text-sm font-medium text-ink">4 bạn đang vote</span>
          </div>
        </div>
        <div className="absolute bottom-16 left-12 bg-white rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-yellow" />
            <span className="text-sm font-medium text-ink">Đã lưu kỷ niệm</span>
          </div>
        </div>
        {/* Avatar stack */}
        <div className="absolute top-32 left-16 flex -space-x-2">
          <div className="w-10 h-10 rounded-full bg-sage/30 border-2 border-white" />
          <div className="w-10 h-10 rounded-full bg-coral/30 border-2 border-white" />
          <div className="w-10 h-10 rounded-full bg-yellow/30 border-2 border-white" />
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-[28px] font-bold text-ink leading-[1.2] mb-3">
        Plan đi chơi cùng nhau, dễ hơn bao giờ hết
      </h1>
      <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
        Chọn nhóm, mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
      </p>

      {/* Pills */}
      <div className="flex gap-3 mb-8">
        <span className="px-4 py-2 rounded-full bg-sage text-white text-sm font-medium">Gợi ý nhanh</span>
        <span className="px-4 py-2 rounded-full bg-white text-sage text-sm font-medium border border-sage/20">Vote cùng nhóm</span>
        <span className="px-4 py-2 rounded-full bg-white text-sage text-sm font-medium border border-sage/20">Lưu kỷ niệm</span>
      </div>

      {/* CTA */}
      <button
        onClick={() => setLocation("/home")}
        className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors"
        data-testid="button-start"
      >
        Bắt đầu tạo Gather
      </button>

      <p className="text-center text-[13px] text-muted-foreground mt-4">
        Không feed công khai. Không chat lòng vòng.
      </p>

      {/* Home indicator */}
      <div className="flex justify-center mt-auto mb-2">
        <div className="w-[120px] h-[4px] rounded-full bg-ink/30" />
      </div>
    </div>
  );
}
