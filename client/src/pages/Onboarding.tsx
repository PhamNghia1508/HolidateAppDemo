import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Users, Camera, ArrowRight } from "lucide-react";

const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const SURF = "#FFFFFF";
const BORDER = "rgba(0,0,0,0.08)";
const SHADOW = "0 2px 8px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.07)";

const floatingChips = [
  { text: "3 plan sẵn sàng", icon: Zap, top: "1rem", left: "1rem", delay: 0 },
  { text: "4 bạn đang vote", icon: Users, top: "3.2rem", right: "1rem", delay: 0.22 },
  { text: "Đã lưu kỷ niệm", icon: Camera, bottom: "3.8rem", left: "1.8rem", delay: 0.44 },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 flex flex-col px-6 py-4 overflow-hidden relative" style={{ background: "#F7F5F0" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold" style={{ color: T2 }}>9:41</span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: i < 2 ? 4 : 16, height: i < 2 ? 4 : 8, background: T1, borderRadius: i === 2 ? 2 : "50%", opacity: i < 2 ? 0.3 : 1 }} />
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <div className="page-label">GatherGo</div>
      </div>

      {/* Hero image — cinematic, taller */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full h-[272px] rounded-[24px] overflow-hidden mb-6"
        style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&auto=format&fit=crop"
          alt="Friends gathering"
          className="w-full h-full object-cover"
        />
        {/* Richer overlay — cinematic depth */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(175deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.35) 50%, rgba(15,23,42,0.72) 100%)" }} />

        {/* Floating chips */}
        {floatingChips.map(({ text, icon: Icon, top, left, right, bottom, delay }: any, i) => (
          <motion.div key={i}
            animate={{ y: [0, -(4 + i * 1.5), 0] }}
            transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay }}
            className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl"
            style={{
              top, left, right, bottom,
              background: "rgba(255,255,255,0.94)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,255,255,0.60)`,
              boxShadow: SHADOW,
            }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(59,130,246,0.12)" }}>
              <Icon className="w-3.5 h-3.5" style={{ color: BLUE }} />
            </div>
            <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color: T1 }}>{text}</span>
          </motion.div>
        ))}

        {/* Social proof — bottom right */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="absolute bottom-4 right-4 text-right"
        >
          <div className="flex items-center gap-1.5 justify-end mb-1">
            {["#3B82F6", "#8B5CF6", "#F59E0B", "#22C55E"].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full" style={{ background: `${c}CC`, border: "2px solid rgba(255,255,255,0.7)", marginLeft: i > 0 ? "-8px" : "0" }} />
            ))}
          </div>
          <p className="text-[11px] font-semibold text-white/80">2,400 nhóm chốt plan tuần này</p>
        </motion.div>
      </motion.div>

      {/* Text — more dramatic headline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.55 }}>
        <h1 className="text-[36px] font-black leading-[1.04] mb-3 tracking-tight" style={{ color: T1 }}>
          Plan đi chơi{" "}
          <span className="block">cùng nhau,{" "}
            <span style={{ color: BLUE }}>dễ hơn</span>
          </span>
          <span style={{ color: BLUE }}>bao giờ hết</span>
        </h1>
        <p className="text-[15px] leading-relaxed mb-5" style={{ color: T2 }}>
          Chọn mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </p>

        {/* Feature rows — icon + text, cleaner than pills */}
        <div className="flex flex-col gap-2.5 mb-7">
          {[
            { icon: Zap, label: "Gợi ý nhanh theo mood & vibe nhóm", color: BLUE },
            { icon: Users, label: "Vote cùng nhóm, không cần chat lòng vòng", color: "#8B5CF6" },
            { icon: Camera, label: "Lưu kỷ niệm mỗi chuyến đi lại", color: "#F59E0B" },
          ].map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <span className="text-[13px] font-medium" style={{ color: T2 }}>{label}</span>
            </div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/home")}
          className="w-full h-[58px] premium-cta-mint flex items-center justify-center gap-2 text-[16px]">
          Bắt đầu tạo Gather
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        <p className="text-center text-[12px] mt-3" style={{ color: T3 }}>Không feed công khai · Không chat lòng vòng · Riêng tư 100%</p>
      </motion.div>

      <div className="flex justify-center mt-auto mb-2 pt-4">
        <div className="w-[120px] h-1 rounded-full" style={{ background: "rgba(15,23,42,0.12)" }} />
      </div>
    </div>
  );
}
