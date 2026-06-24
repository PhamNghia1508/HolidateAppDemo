import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import GlassCard from "@/components/GlassCard";
import GlowButton from "@/components/GlowButton";
import PageHeader from "@/components/PageHeader";

const timeline = [
  { time: "18:30", title: "Bistro Nhà Gỗ", desc: "Ăn tối nhẹ", active: true },
  { time: "20:00", title: "Skyline Coffee", desc: "Rooftop ngắm thành phố", active: false },
  { time: "21:30", title: "River Walk", desc: "Đi dạo & chụp ảnh", active: false },
];

export default function PlanDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5">
      <PageHeader
        label="Plan Detail"
        title="Rooftop chill night"
        subtitle="Plan sẵn sàng để gửi nhóm vote."
      />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full h-[160px] rounded-3xl overflow-hidden mb-5 relative shadow-xl"
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
          alt="Rooftop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald/70 via-emerald/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <p className="text-[16px] font-bold text-white">
            Ăn tối nhẹ → rooftop → đi dạo
          </p>
          <div className="flex gap-2 justify-center mt-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-label border border-white/20">Chill</span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-label border border-white/20">Ảnh đẹp</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <GlassCard delay={0.1} className="p-4 mb-4">
        <div className="flex items-center justify-between">
          {[
            { value: "4.2km", label: "Quãng đường" },
            { value: "520k", label: "Mỗi người" },
            { value: "3", label: "Điểm đến" },
            { value: "4", label: "Người" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-[16px] font-black text-mint">{s.value}</p>
              <p className="text-micro text-clay">{s.label}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Timeline */}
      <GlassCard delay={0.2} className="p-4 mb-5">
        <div className="premium-label mb-3">Timeline</div>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${item.active ? "bg-coral" : "bg-mint/30 border-2 border-mint"}`} />
                {i < timeline.length - 1 && <div className="w-0.5 h-10 bg-mint/20 mt-1" />}
              </div>
              <div>
                <p className="text-[13px] font-bold text-coral">{item.time}</p>
                <p className="text-title text-ink">{item.title}</p>
                <p className="text-body text-clay">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlowButton onClick={() => setLocation("/vote")}>
          Gửi nhóm vote
        </GlowButton>
      </motion.div>

      <BottomNav />
    </div>
  );
}
