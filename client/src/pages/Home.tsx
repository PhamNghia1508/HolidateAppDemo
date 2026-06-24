import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Vote, Heart } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#f3eee8] flex flex-col max-w-md mx-auto">
      {/* Scrollable content */}
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

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg font-semibold text-ink">Chào Nghĩa <span className="text-lg">👋</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-sage bg-sage/10 px-3 py-1 rounded-full">1 plan đang chờ vote</span>
            <div className="w-9 h-9 rounded-full bg-sage/20" />
          </div>
        </div>

        {/* Hero Card */}
        <div className="w-full rounded-[20px] bg-sage p-5 mb-5 text-white">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-white/70">Gợi ý hợp mood</span>
          <h2 className="text-[22px] font-bold mt-2 mb-2">Rooftop chill night</h2>
          <p className="text-[14px] text-white/80 mb-3">18:30 • 3 điểm đến • 520k/người</p>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/20 text-[12px] font-medium text-white">Hợp mood nhất</span>
            <span className="px-3 py-1.5 rounded-full bg-white/20 text-[12px] font-medium text-white">Ảnh đẹp</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setLocation("/create-plan")}
          className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors mb-5"
          data-testid="button-create-plan"
        >
          Tạo Gather mới
        </button>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-[16px] p-4 border border-border/30">
            <div className="w-9 h-9 rounded-xl bg-sage/10 flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5 text-sage" />
            </div>
            <p className="text-[14px] font-semibold text-ink">Gợi ý gần tôi</p>
            <p className="text-[12px] text-muted-foreground">Quán hot gần bạn</p>
          </div>
          <div className="bg-white rounded-[16px] p-4 border border-border/30">
            <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-coral" />
            </div>
            <p className="text-[14px] font-semibold text-ink">Plan đã lưu</p>
            <p className="text-[12px] text-muted-foreground">2 plan sẵn sàng</p>
          </div>
          <div className="bg-white rounded-[16px] p-4 border border-border/30">
            <div className="w-9 h-9 rounded-xl bg-sage/10 flex items-center justify-center mb-2">
              <Vote className="w-5 h-5 text-sage" />
            </div>
            <p className="text-[14px] font-semibold text-ink">Join bằng mã</p>
            <p className="text-[12px] text-muted-foreground">Vào plan bạn gửi</p>
          </div>
          <div className="bg-white rounded-[16px] p-4 border border-border/30">
            <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-coral" />
            </div>
            <p className="text-[14px] font-semibold text-ink">Kỷ niệm gần đây</p>
            <p className="text-[12px] text-muted-foreground">Đêm rooftop</p>
          </div>
        </div>

        {/* Pet status */}
        <p className="text-[13px] text-sage mb-2">GoPet đang vui vì bạn vừa lưu kỷ niệm.</p>
      </div>

      <BottomNav />
    </div>
  );
}
