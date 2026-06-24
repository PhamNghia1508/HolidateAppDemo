import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";
import { Calendar, Heart, Share2, Check } from "lucide-react";

export default function Confirmed() {
  const [, setLocation] = useLocation();

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

        {/* Success Section */}
        <div className="flex flex-col items-center mt-8 mb-8">
          {/* Check circle */}
          <div className="relative w-24 h-24 rounded-full bg-sage-light flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full bg-sage/20 animate-ping" />
            <Check className="w-12 h-12 text-sage relative z-10" strokeWidth={2.5} />
          </div>

          <Heart className="w-5 h-5 text-coral mb-2" />
          <h1 className="text-[26px] font-bold text-ink mb-2">Plan đã chốt!</h1>
          <p className="text-[14px] text-muted-foreground">Rooftop chill night • Thứ bảy, 18:30</p>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <Calendar className="w-5 h-5 text-sage mx-auto mb-1" />
              <p className="text-[16px] font-bold text-ink">3</p>
              <p className="text-[11px] text-muted-foreground">người</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[16px] font-bold text-ink">3</p>
              <p className="text-[11px] text-muted-foreground">điểm đến</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[16px] font-bold text-ink">1h</p>
              <p className="text-[11px] text-muted-foreground">nhắc trước</p>
            </div>
          </div>
          <div className="bg-sage-light/30 rounded-[12px] p-3 text-center">
            <p className="text-[13px] text-sage font-medium">GatherGo sẽ nhắc nhóm trước giờ đi.</p>
          </div>
        </div>

        {/* CTAs */}
        <button
          onClick={() => setLocation("/plan-detail")}
          className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors mb-3"
          data-testid="button-view-itinerary"
        >
          Xem lịch trình
        </button>
        <button
          className="w-full h-[52px] rounded-[14px] bg-white text-coral font-semibold text-[16px] border border-coral hover:bg-coral/5 transition-colors flex items-center justify-center gap-2"
          data-testid="button-invite"
        >
          <Share2 className="w-4 h-4" />
          Mời thêm bạn
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
