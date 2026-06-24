import { useLocation } from "wouter";
import BottomNav from "@/components/BottomNav";

const timeline = [
  { time: "18:30", title: "Bistro Nhà Gỗ", desc: "Ăn tối nhẹ", active: true },
  { time: "20:00", title: "Skyline Coffee", desc: "Rooftop ngắm thành phố", active: false },
  { time: "21:30", title: "River Walk", desc: "Đi dạo & chụp ảnh", active: false },
];

export default function PlanDetail() {
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
        <h1 className="text-[26px] font-bold text-ink mb-1">Rooftop chill night</h1>
        <p className="text-[14px] text-muted-foreground mb-5">
          Plan sẵn sàng để gửi nhóm vote.
        </p>

        {/* Hero visual */}
        <div className="w-full h-[160px] rounded-[20px] bg-sage/20 mb-5 overflow-hidden flex items-center justify-center relative">
          <div className="absolute inset-0 bg-sage/30" />
          <div className="relative z-10 text-center">
            <p className="text-[18px] font-bold text-white">Ăn tối nhẹ <span className="text-[18px]">→</span> rooftop <span className="text-[18px]">→</span> đi dạo</p>
            <div className="flex gap-2 justify-center mt-3">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[12px] font-medium">Chill</span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[12px] font-medium">Ảnh đẹp</span>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between bg-white rounded-[16px] p-4 border border-border/30 mb-5">
          <div className="text-center">
            <p className="text-[16px] font-bold text-sage">4.2km</p>
            <p className="text-[11px] text-muted-foreground">Quãng đường</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-bold text-sage">520k</p>
            <p className="text-[11px] text-muted-foreground">Mỗi người</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-bold text-sage">3</p>
            <p className="text-[11px] text-muted-foreground">Điểm đến</p>
          </div>
          <div className="text-center">
            <p className="text-[16px] font-bold text-sage">4</p>
            <p className="text-[11px] text-muted-foreground">Người</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-[20px] p-5 border border-border/30 mb-5">
          <h3 className="text-[16px] font-bold text-ink mb-4">Timeline</h3>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${item.active ? "bg-coral" : "bg-sage/30 border-2 border-sage"}`} />
                  {i < timeline.length - 1 && <div className="w-0.5 h-10 bg-sage/20 mt-1" />}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-coral">{item.time}</p>
                  <p className="text-[15px] font-semibold text-ink">{item.title}</p>
                  <p className="text-[12px] text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => setLocation("/vote")}
          className="w-full h-[52px] rounded-[14px] bg-coral text-white font-semibold text-[16px] shadow-lg shadow-coral/20 hover:bg-coral/90 transition-colors"
          data-testid="button-send-vote"
        >
          Gửi nhóm vote
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
