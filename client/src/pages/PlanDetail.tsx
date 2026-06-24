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

  const cardStagger = (i: number) => ({
    delay: i * 0.08,
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  });

  return (
    <div className="flex-1 overflow-y-auto pb-32 px-5 relative">
      <div className="ambient-mint-blur top-20 left-1/2 -translate-x-1/2" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="pt-6 mb-5"
      >
        <div className="page-label mb-1">Plan Detail</div>
        <h1 className="text-heading text-[#FAFAFA] tracking-tight font-black">Rooftop chill night</h1>
        <p className="text-body text-[#A1A1AA] mt-1">Plan sẵn sàng để gửi nhóm vote.</p>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={cardStagger(0)}
        className="w-full h-[160px] rounded-2xl overflow-hidden mb-5 relative shadow-xl"
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
          alt="Rooftop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/80 via-[#09090B]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <p className="text-[16px] font-bold text-white">
            Ăn tối nhẹ → rooftop → đi dạo
          </p>
          <div className="flex gap-2 justify-center mt-2">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-label border border-white/10">Chill</span>
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-label border border-white/10">Ảnh đẹp</span>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(1)}
        className="obsidian-card p-4 mb-4"
      >
        <div className="flex items-center justify-between">
          {[
            { value: "4.2km", label: "Quãng đường" },
            { value: "520k", label: "Mỗi người" },
            { value: "3", label: "Điểm đến" },
            { value: "4", label: "Người" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-[16px] font-black text-[#00E5A8]">{s.value}</p>
              <p className="text-micro text-[#71717A]">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(2)}
        className="obsidian-card p-4 mb-5"
      >
        <div className="page-label mb-3">Timeline</div>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${item.active ? "bg-[#00E5A8]" : "bg-[#3F3F46] border-2 border-[#52525B]"}`} />
                {i < timeline.length - 1 && <div className="w-0.5 h-10 bg-[#3F3F46] mt-1" />}
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#00E5A8]">{item.time}</p>
                <p className="text-title text-[#FAFAFA]">{item.title}</p>
                <p className="text-body text-[#71717A]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={cardStagger(3)}
      >
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/vote")}
          className="w-full h-[52px] premium-cta-mint"
        >
          Gửi nhóm vote
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
