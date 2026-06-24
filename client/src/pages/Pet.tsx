import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";
import { Heart, Sparkles, PawPrint } from "lucide-react";

export default function Pet() {
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
        <h1 className="text-[26px] font-bold text-ink mb-2">GoPet</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          Mỗi chuyến đi hoàn thành giúp GoPet lớn lên.
        </p>

        {/* Pet Card */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          <p className="text-[13px] text-muted-foreground mb-3">Level 3</p>
          {/* Pet Illustration */}
          <div className="flex justify-center mb-4">
            <div className="w-28 h-28 rounded-full bg-sage/10 flex items-center justify-center">
              <svg className="w-20 h-20" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#4a7c59" strokeWidth="2.5" />
                <circle cx="38" cy="45" r="4" fill="#4a7c59" />
                <circle cx="62" cy="45" r="4" fill="#4a7c59" />
                <ellipse cx="50" cy="55" rx="8" ry="4" fill="none" stroke="#4a7c59" strokeWidth="2" />
                <circle cx="28" cy="35" r="10" fill="#f5e6d3" stroke="#4a7c59" strokeWidth="2" />
                <circle cx="72" cy="35" r="10" fill="#f5e6d3" stroke="#4a7c59" strokeWidth="2" />
                <circle cx="28" cy="35" r="3" fill="#e76f51" />
                <circle cx="72" cy="35" r="3" fill="#e76f51" />
                <rect x="35" y="62" width="30" height="12" rx="6" fill="#4a7c59" />
              </svg>
            </div>
          </div>
          <h3 className="text-[20px] font-bold text-ink text-center mb-1">GoPet</h3>
          <p className="text-[13px] text-muted-foreground text-center">Đang vui • Muốn thêm kỷ niệm</p>
        </div>

        {/* Energy */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          <h3 className="text-[16px] font-bold text-ink mb-2">Năng lượng kỷ niệm</h3>
          <p className="text-[13px] text-muted-foreground mb-3">
            Hoàn thành plan, lưu ảnh và recap để tăng năng lượng cho GoPet.
          </p>
          <div className="w-full h-2 bg-sage/10 rounded-full overflow-hidden">
            <div className="w-[70%] h-full bg-coral rounded-full" />
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          <h3 className="text-[16px] font-bold text-ink mb-3">Mở khóa tiếp theo</h3>
          <div className="flex gap-3">
            <div className="flex-1 flex flex-col items-center bg-sage-light/30 rounded-[12px] p-3">
              <Heart className="w-6 h-6 text-sage mb-1" />
              <span className="text-[12px] font-medium text-ink">Nhãn dán</span>
            </div>
            <div className="flex-1 flex flex-col items-center bg-sage-light/30 rounded-[12px] p-3">
              <Sparkles className="w-6 h-6 text-sage mb-1" />
              <span className="text-[12px] font-medium text-ink">Mũ len</span>
            </div>
            <div className="flex-1 flex flex-col items-center bg-sage-light/30 rounded-[12px] p-3">
              <PawPrint className="w-6 h-6 text-sage mb-1" />
              <span className="text-[12px] font-medium text-ink">Huy hiệu</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors">
          Cho pet ăn kỷ niệm
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
