import { useLocation } from "wouter";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Calendar, Vote, Heart, Sparkles, TrendingUp } from "lucide-react";

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

const S = (i: number) => ({ delay: 0.06 + i * 0.05, type: "spring" as const, stiffness: 420, damping: 32 });

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: BG }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(0)} className="pt-6 mb-5">
        <div className="page-label mb-1">GatherGo</div>
        <h1 className="text-[26px] font-black tracking-tight" style={{ color: T1 }}>Chào Nghĩa 👋</h1>
      </motion.div>

      {/* Pulse card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
        className="flex items-center gap-3 rounded-2xl p-3 mb-4"
        style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.15)` }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(59,130,246,0.12)" }}>
          <TrendingUp className="w-4 h-4" style={{ color: BLUE }} />
        </div>
        <div>
          <p className="text-[12px] font-semibold" style={{ color: T1 }}>Today's Gather Pulse</p>
          <p className="text-[11px]" style={{ color: T3 }}>Nhóm đang hào hứng — 3 plan sẵn sàng</p>
        </div>
        <div className="ml-auto flex -space-x-1.5">
          {[BLUE, "#8B5CF6", "#F59E0B"].map((c, i) => (
            <div key={i} className="w-6 h-6 rounded-full" style={{ background: `${c}44`, border: `1.5px solid ${c}66` }} />
          ))}
        </div>
      </motion.div>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={S(2)}
        whileHover={{ scale: 1.01 }}
      >
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setLocation("/plan-detail")}
          className="w-full rounded-3xl overflow-hidden mb-5 relative focus:outline-none"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop"
            alt="Rooftop bar" className="w-full h-[200px] object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.75) 0%, rgba(15,23,42,0.30) 50%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full w-fit mb-2"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.20)" }}>
              <Sparkles className="w-3 h-3 text-white/80" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">Gợi ý hợp mood</span>
            </div>
            <h2 className="text-[24px] font-black text-white tracking-tight">Rooftop chill night</h2>
            <p className="text-[12px] mt-1 text-white/60">18:30 • 3 điểm đến • 520k/người</p>
            <div className="flex gap-2 mt-2">
              {["Hợp mood nhất", "Ảnh đẹp"].map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-[11px] font-medium text-white"
                  style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.18)" }}>{t}</span>
              ))}
            </div>
          </div>
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold"
            style={{ background: "#FFFFFF", color: T1, boxShadow: SHADOW }}>
            2 bạn đang vote
          </motion.div>
        </motion.button>
      </motion.div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={S(3)} className="mb-5">
        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/create-plan")}
          className="w-full h-[52px] premium-cta-mint flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" /> Tạo Gather mới
        </motion.button>
      </motion.div>

      {/* Bento */}
      <div className="bento-asymmetric mb-3">
        {[
          { label: "Gợi ý gần tôi", sub: "Quán hot gần bạn", icon: MapPin, path: "/suggested" },
          { label: "Plan", sub: "2 sẵn", icon: Calendar, path: "/plan" },
        ].map(({ label, sub, icon: Icon, path }, i) => (
          <motion.button key={path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(4 + i)}
            whileTap={{ scale: 0.97 }} onClick={() => setLocation(path)}
            className="rounded-2xl text-left p-4"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: "rgba(59,130,246,0.10)" }}>
              <Icon className="w-4 h-4" style={{ color: BLUE }} />
            </div>
            <p className="text-[15px] font-bold" style={{ color: T1 }}>{label}</p>
            <p className="text-[12px] mt-0.5" style={{ color: T3 }}>{sub}</p>
          </motion.button>
        ))}
      </div>

      <div className="bento mb-5">
        {[
          { label: "Join bằng mã", sub: "Vào plan bạn gửi", icon: Vote, path: "/vote" },
          { label: "Kỷ niệm", sub: "Đêm rooftop", icon: Heart, path: "/memories" },
        ].map(({ label, sub, icon: Icon, path }, i) => (
          <motion.button key={path} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={S(6 + i)}
            whileTap={{ scale: 0.97 }} onClick={() => setLocation(path)}
            className="rounded-2xl text-left p-4"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: "rgba(59,130,246,0.10)" }}>
              <Icon className="w-5 h-5" style={{ color: BLUE }} />
            </div>
            <p className="text-[15px] font-bold" style={{ color: T1 }}>{label}</p>
            <p className="text-[12px] mt-0.5" style={{ color: T3 }}>{sub}</p>
          </motion.button>
        ))}
      </div>

      {/* Pet Status */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="flex items-center gap-3 rounded-2xl px-4 py-3"
        style={{ background: SURF2, border: `1px solid rgba(59,130,246,0.15)` }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#22C55E" }} />
        <p className="text-[13px] font-medium" style={{ color: BLUE_BRIGHT }}>GoPet đang vui vì bạn vừa lưu kỷ niệm.</p>
      </motion.div>

      <BottomNav />
    </div>
  );
}
