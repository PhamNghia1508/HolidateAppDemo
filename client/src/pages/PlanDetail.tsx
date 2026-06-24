import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const SURF2 = "#F0F5FF";
const BLUE = "#3B82F6";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";

const timeline = [
  { time: "18:30", title: "Bistro Nhà Gỗ", desc: "Ăn tối nhẹ", active: true },
  { time: "20:00", title: "Skyline Coffee", desc: "Rooftop ngắm thành phố", active: false },
  { time: "21:30", title: "River Walk", desc: "Đi dạo & chụp ảnh", active: false },
];

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 420, damping: 32 });

export default function PlanDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-5">
        <div className="page-label mb-1">Plan Detail</div>
        <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Rooftop chill night</h1>
        <p className="text-[13px] mt-1" style={{ color: T2 }}>Plan sẵn sàng để gửi nhóm vote.</p>
      </motion.div>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={S(1)}
        className="w-full h-[164px] rounded-2xl overflow-hidden mb-5 relative"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop" alt="Rooftop" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.70), rgba(15,23,42,0.20) 55%, transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <p className="text-[15px] font-bold text-white">Ăn tối nhẹ → rooftop → đi dạo</p>
          <div className="flex gap-2 justify-center mt-2">
            {["Chill", "Ảnh đẹp"].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-[11px] font-medium text-white"
                style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.20)" }}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(2)}
        className="rounded-2xl p-4 mb-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="flex items-center justify-between">
          {[{ value: "4.2km", label: "Quãng đường" }, { value: "520k", label: "Mỗi người" }, { value: "3", label: "Điểm đến" }, { value: "4", label: "Người" }].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-[16px] font-black" style={{ color: BLUE }}>{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: T3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(3)}
        className="rounded-2xl p-4 mb-5" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="page-label mb-3">Timeline</div>
        <div className="space-y-4">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full"
                  style={{ background: item.active ? BLUE : "#E2E8F0", border: item.active ? "none" : `2px solid ${T3}` }} />
                {i < timeline.length - 1 && <div className="w-px h-10 mt-1 bg-slate-200" />}
              </div>
              <div>
                <p className="text-[13px] font-bold" style={{ color: BLUE }}>{item.time}</p>
                <p className="text-[15px] font-bold" style={{ color: T1 }}>{item.title}</p>
                <p className="text-[12px]" style={{ color: T3 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(4)}>
        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/vote")} className="w-full h-[52px] premium-cta-mint">
          Gửi nhóm vote
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  );
}
