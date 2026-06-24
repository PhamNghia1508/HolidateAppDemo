import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const timeline = [
  { time: "18:30", title: "Bistro Nhà Gỗ", desc: "Ăn tối nhẹ", active: true },
  { time: "20:00", title: "Skyline Coffee", desc: "Rooftop ngắm thành phố", active: false },
  { time: "21:30", title: "River Walk", desc: "Đi dạo & chụp ảnh", active: false },
];

export default function PlanDetail() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(16,35,30,0.06) 0%, transparent 50%), linear-gradient(180deg, #FFF8EF 0%, #F7EFE5 100%)",
      }}
    >
      <div className="flex-1 overflow-y-auto pb-28 px-5">
        {/* Header */}
        <div className="pt-5 mb-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60">
            Plan Detail
          </div>
          <h1 className="text-[22px] font-black text-[#231F1B] tracking-tight mt-0.5">Rooftop chill night</h1>
          <p className="text-[14px] text-[#7B6658] mt-1">Plan sẵn sàng để gửi nhóm vote.</p>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full h-[160px] rounded-[24px] overflow-hidden mb-5 relative shadow-xl"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10231E]/70 via-[#10231E]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <p className="text-[16px] font-bold text-white">
              Ăn tối nhẹ → rooftop → đi dạo
            </p>
            <div className="flex gap-2 justify-center mt-2">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">Chill</span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">Ảnh đẹp</span>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="premium-glass-card p-4 mb-4"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 0 40px rgba(74,124,89,0.08), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="flex items-center justify-between">
            {[
              { value: "4.2km", label: "Quãng đường" },
              { value: "520k", label: "Mỗi người" },
              { value: "3", label: "Điểm đến" },
              { value: "4", label: "Người" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[16px] font-black text-[#4a7c59]">{s.value}</p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7B6658] opacity-60">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="premium-glass-card p-4 mb-5"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.4)" }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7B6658] opacity-60 mb-3">
            Timeline
          </div>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${item.active ? "bg-[#FF6B4A]" : "bg-[#4a7c59]/30 border-2 border-[#4a7c59]"}`} />
                  {i < timeline.length - 1 && <div className="w-0.5 h-10 bg-[#4a7c59]/20 mt-1" />}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#FF6B4A]">{item.time}</p>
                  <p className="text-[14px] font-semibold text-[#231F1B]">{item.title}</p>
                  <p className="text-[12px] text-[#7B6658]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setLocation("/vote")}
          className="w-full h-[52px] rounded-[16px] font-bold text-[16px] text-white flex items-center justify-center gap-2 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FF6B4A 0%, #FF8A4C 50%, #F3D37A 100%)",
            boxShadow: "0 8px 32px rgba(255,107,74,0.35), 0 0 60px rgba(255,107,74,0.15), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          Gửi nhóm vote
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
