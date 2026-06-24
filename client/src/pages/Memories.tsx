import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";
import { MapPin, Sparkles, Heart, Plus } from "lucide-react";

export default function Memories() {
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

        {/* Title */}
        <h1 className="text-[26px] font-bold text-ink mb-2">Memory Vault</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          Ký ức của chuyến đi được gom lại thành album, note và recap.
        </p>

        {/* Album Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="h-[100px] rounded-[16px] bg-sage/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-sage" />
            </div>
          </div>
          <div className="h-[100px] rounded-[16px] bg-coral/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
              <Heart className="w-4 h-4 text-coral" />
            </div>
          </div>
          <div className="h-[100px] rounded-[16px] bg-yellow/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-yellow" />
            </div>
          </div>
          <div className="h-[100px] rounded-[16px] bg-sage/20 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-sage" />
            </div>
          </div>
        </div>

        {/* Memory Title Card */}
        <div className="bg-white rounded-[16px] p-4 border border-border/30 mb-4">
          <h3 className="text-[16px] font-bold text-ink mb-1">Đêm rooftop đầu hè</h3>
          <p className="text-[12px] text-muted-foreground">12 ảnh • 3 địa điểm • 4 người</p>
        </div>

        {/* AI Recap */}
        <div className="bg-sage-light/30 rounded-[16px] p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold text-sage bg-sage/10 px-2 py-0.5 rounded-full">AI recap</span>
            <span className="text-[11px] text-muted-foreground">Tạo từ Gather đã chốt</span>
          </div>
          <p className="text-[13px] text-ink leading-relaxed">
            Một buổi tối chill đúng nghĩa — cả nhóm ăn nhẹ, ngắm thành phố và kịp sẵn vài tấm ảnh đẹp.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between bg-white rounded-[16px] p-4 border border-border/30 mb-4">
          <div className="text-center">
            <p className="text-[16px] font-bold text-ink">3</p>
            <p className="text-[11px] text-muted-foreground">Stops</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-bold text-ink">4</p>
            <p className="text-[11px] text-muted-foreground">People</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-bold text-ink">520k</p>
            <p className="text-[11px] text-muted-foreground">Each</p>
          </div>
        </div>

        {/* Note + FAB */}
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-sage">Lần sau săn hoàng hôn.</p>
          <button className="w-12 h-12 rounded-full bg-coral text-white flex items-center justify-center shadow-lg shadow-coral/20">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
