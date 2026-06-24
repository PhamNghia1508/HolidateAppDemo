import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft, MapPin, Clock, Users, Share2 } from "lucide-react";

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
  { time: "18:30", title: "Bistro Nhà Gỗ", desc: "Ăn tối nhẹ — chọn đồ ăn kiểu tapas", active: true },
  { time: "20:00", title: "Skyline Coffee", desc: "Rooftop ngắm thành phố, check-in", active: false },
  { time: "21:30", title: "River Walk", desc: "Đi dạo bờ sông & chụp ảnh", active: false },
];

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 420, damping: 32 });

export default function PlanDetail() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-20 relative" style={{ background: BG }}>
      {/* Sticky header with back button */}
      <div className="sticky top-0 z-20 px-5 pt-5 pb-3"
        style={{ background: "rgba(241,245,251,0.90)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLocation("/suggested")}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <ArrowLeft className="w-4 h-4" style={{ color: T1 }} />
          </motion.button>
          <div className="flex-1 min-w-0">
            <div className="page-label">Plan Detail</div>
            <h1 className="text-[18px] font-black tracking-tight truncate" style={{ color: T1 }}>Rooftop chill night</h1>
          </div>
          <motion.button whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <Share2 className="w-4 h-4" style={{ color: T2 }} />
          </motion.button>
        </div>
      </div>

      <div className="px-5">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={S(0)}
          className="w-full h-[164px] rounded-2xl overflow-hidden mb-4 relative"
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
          className="rounded-2xl p-4 mb-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="flex items-center justify-between">
            {[
              { icon: MapPin, value: "4.2km", label: "Quãng đường" },
              { icon: Users, value: "520k", label: "Mỗi người" },
              { icon: Clock, value: "3h", label: "Thời gian" },
              { icon: Users, value: "4", label: "Người" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: BLUE }} />
                <p className="text-[16px] font-black" style={{ color: BLUE }}>{s.value}</p>
                <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: T3 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(2)}
          className="rounded-2xl p-4 mb-5" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="page-label mb-3">Lịch trình</div>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full mt-1"
                    style={{ background: item.active ? BLUE : "#E2E8F0", border: item.active ? "none" : `2px solid #CBD5E1` }} />
                  {i < timeline.length - 1 && <div className="w-px h-10 mt-1 bg-slate-200" />}
                </div>
                <div>
                  <p className="text-[12px] font-bold" style={{ color: BLUE }}>{item.time}</p>
                  <p className="text-[15px] font-bold" style={{ color: T1 }}>{item.title}</p>
                  <p className="text-[12px]" style={{ color: T3 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(3)}
          className="rounded-2xl p-3 mb-5"
          style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.15)` }}>
          <p className="text-[12px]" style={{ color: "#3B82F6" }}>
            GatherGo đã cân bằng khoảng cách giữa các điểm đến — đi bộ hoặc xe tối đa 10 phút mỗi chặng.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(4)}>
          <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
            onClick={() => setLocation("/vote")} className="w-full h-[52px] premium-cta-mint">
            Gửi nhóm vote
          </motion.button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
