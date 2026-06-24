import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import SpatialCard from "@/components/SpatialCard";
import SpringButton from "@/components/SpringButton";

const timeline = [
  { time: "18:30", title: "Bistro Nhà Gỗ", desc: "Ăn tối nhẹ", active: true },
  { time: "20:00", title: "Skyline Coffee", desc: "Rooftop ngắm thành phố", active: false },
  { time: "21:30", title: "River Walk", desc: "Đi dạo & chụp ảnh", active: false },
];

export default function PlanDetail() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative"
      style={{ background: "linear-gradient(180deg, #f3eee8 0%, #e8e0d6 100%)" }}
    >
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

        {/* Hero with image */}
        <div className="w-full h-[160px] rounded-[20px] overflow-hidden mb-5 relative shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sage/80 via-sage/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <p className="text-[18px] font-bold text-white">
              Ăn tối nhẹ → rooftop → đi dạo
            </p>
            <div className="flex gap-2 justify-center mt-2">
              <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-sm text-white text-[12px] font-medium">Chill</span>
              <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-sm text-white text-[12px] font-medium">Ảnh đẹp</span>
            </div>
          </div>
        </div>

        {/* Metrics - SpatialCard */}
        <SpatialCard glow="sage" className="mb-5 p-4">
          <div className="flex items-center justify-between">
            {[
              { value: "4.2km", label: "Quãng đường" },
              { value: "520k", label: "Mỗi người" },
              { value: "3", label: "Điểm đến" },
              { value: "4", label: "Người" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[16px] font-bold text-sage">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </SpatialCard>

        {/* Timeline - SpatialCard */}
        <SpatialCard glow="sage" className="mb-5">
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
        </SpatialCard>

        {/* Spring CTA */}
        <SpringButton onClick={() => setLocation("/vote")} data-testid="button-send-vote">
          Gửi nhóm vote
        </SpringButton>
      </div>

      <BottomNav />
    </div>
  );
}
