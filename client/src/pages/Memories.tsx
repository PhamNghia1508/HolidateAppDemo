import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { Sparkles, Plus, Star, Clock, MapPin, Zap } from "lucide-react";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const SURF2 = "#F0F5FF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.07)";
const SHADOW = "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)";

const memories = [
  { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop", caption: "Rooftop", size: "large" },
  { img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop", caption: "Party", size: "small" },
  { img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300&h=200&fit=crop", caption: "Dinner", size: "small" },
  { img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=300&h=200&fit=crop", caption: "Night", size: "large" },
];

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 420, damping: 32 });

export default function Memories() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-5">
        <div className="page-label mb-1">Kỷ niệm</div>
        <h1 className="text-[24px] font-black tracking-tight" style={{ color: T1 }}>Memory Vault</h1>
        <p className="text-[13px] mt-1" style={{ color: T2 }}>Kỷ ức của chuyến đi được gom lại thành album, note và recap.</p>
      </motion.div>

      {/* Score */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
        className="flex items-center gap-3 rounded-2xl p-3 mb-4"
        style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.15)` }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)" }}>
          <Zap className="w-5 h-5" style={{ color: BLUE }} />
        </div>
        <div>
          <p className="text-[12px] font-semibold" style={{ color: T1 }}>Vibe captured</p>
          <p className="text-[11px]" style={{ color: T3 }}>12 kỷ niệm • 48 ảnh • 5 streak</p>
        </div>
        <div className="ml-auto text-[22px] font-black" style={{ color: BLUE }}>87</div>
      </motion.div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {memories.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(i + 2)}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className={`rounded-2xl overflow-hidden cursor-pointer relative ${m.size === "large" ? "h-[140px]" : "h-[110px]"}`}
            style={{ boxShadow: SHADOW }}>
            <img src={m.img} alt={m.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.55), transparent)" }} />
            <div className="absolute bottom-2 left-3">
              <span className="text-[11px] font-semibold text-white/90">{m.caption}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Album card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(6)}
        className="rounded-2xl p-4 mb-3" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <h3 className="text-[16px] font-bold" style={{ color: T1 }}>Đêm rooftop đầu hè</h3>
        <p className="text-[12px]" style={{ color: T3 }}>12 ảnh • 3 địa điểm • 4 người</p>
      </motion.div>

      {/* AI Recap */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(7)}
        className="rounded-2xl p-4 mb-3" style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.15)` }}>
        <div className="flex items-center gap-2 mb-2">
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <Sparkles className="w-4 h-4" style={{ color: BLUE }} />
          </motion.div>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(59,130,246,0.10)", color: BLUE_BRIGHT, border: `1px solid rgba(59,130,246,0.20)` }}>
            AI recap
          </span>
          <span className="text-[11px]" style={{ color: T3 }}>Tạo từ Gather đã chốt</span>
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: T2 }}>
          Một buổi tối chill đúng nghĩa — cả nhóm ăn nhẹ, ngắm thành phố và kịp sẵn vài tấm ảnh đẹp.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(8)}
        className="rounded-2xl p-4 mb-5" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
        <div className="flex items-center justify-between">
          {[{ icon: MapPin, value: "3", label: "Stops" }, { icon: Star, value: "4", label: "People" }, { icon: Clock, value: "520k", label: "Each" }].map((s, i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ background: "rgba(59,130,246,0.10)" }}>
                <s.icon className="w-4 h-4" style={{ color: BLUE }} />
              </div>
              <p className="text-[16px] font-black" style={{ color: T1 }}>{s.value}</p>
              <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: T3 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium" style={{ color: BLUE_BRIGHT }}>Lần sau săn hoàng hôn.</p>
        <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full flex items-center justify-center premium-cta-mint">
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
