import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Users, Camera } from "lucide-react";

const BG = "#F1F5FB";
const SURF = "#FFFFFF";
const BLUE = "#3B82F6";
const BLUE_BRIGHT = "#2563EB";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(0,0,0,0.08)";
const SHADOW = "0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06)";

const floatingChips = [
  { text: "3 plan sẵn sàng", icon: Zap, top: "1rem", left: "1rem", delay: 0 },
  { text: "4 bạn đang vote", icon: Users, top: "3.2rem", right: "1rem", delay: 0.22 },
  { text: "Đã lưu kỷ niệm", icon: Camera, bottom: "3.2rem", left: "1.8rem", delay: 0.44 },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex-1 flex flex-col px-6 py-4 overflow-hidden relative" style={{ background: BG }}>
      {/* Status bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold" style={{ color: T2 }}>9:41</span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: i < 2 ? 4 : 16, height: i < 2 ? 4 : 8, background: T1, borderRadius: i === 2 ? 2 : "50%" }} />
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <div className="page-label">GatherGo</div>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full h-[248px] rounded-3xl overflow-hidden mb-6"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&auto=format&fit=crop"
          alt="Friends gathering"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,0.65), rgba(15,23,42,0.15) 55%, transparent)" }} />

        {/* Floating chips — now with icons, no awkward vertical bar */}
        {floatingChips.map(({ text, icon: Icon, top, left, right, bottom, delay }: any, i) => (
          <motion.div key={i}
            animate={{ y: [0, -(5 + i * 1.5), 0] }}
            transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay }}
            className="absolute flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              top, left, right, bottom,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${BORDER}`,
              boxShadow: SHADOW,
            }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(59,130,246,0.12)" }}>
              <Icon className="w-3.5 h-3.5" style={{ color: BLUE }} />
            </div>
            <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color: T1 }}>{text}</span>
          </motion.div>
        ))}

        {/* Avatar stack */}
        <div className="absolute bottom-4 right-5 flex -space-x-2">
          {[BLUE, "#8B5CF6", "#F59E0B"].map((c, i) => (
            <div key={i} className="w-8 h-8 rounded-full" style={{ background: `${c}CC`, border: "2px solid white" }} />
          ))}
        </div>
      </motion.div>

      {/* Text */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.55 }}>
        <h1 className="text-[32px] font-black leading-[1.08] mb-3 tracking-tight" style={{ color: T1 }}>
          Plan đi chơi{" "}
          <span className="block mt-1">
            cùng nhau,{" "}
            <span style={{ color: BLUE }}>dễ hơn bao giờ hết</span>
          </span>
        </h1>
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: T2 }}>
          Chọn nhóm, mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </p>

        {/* Feature pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {[
            { label: "Gợi ý nhanh", primary: true },
            { label: "Vote cùng nhóm", primary: false },
            { label: "Lưu kỷ niệm", primary: false },
          ].map(({ label, primary }) => (
            <span key={label} className="px-3.5 py-2 rounded-full text-[12px] font-semibold"
              style={{
                background: primary ? BLUE : SURF,
                color: primary ? "#FFFFFF" : BLUE_BRIGHT,
                border: `1px solid ${primary ? BLUE : "rgba(59,130,246,0.25)"}`,
                boxShadow: primary ? "0 2px 8px rgba(59,130,246,0.25)" : SHADOW,
              }}>
              {label}
            </span>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/home")} className="w-full h-[56px] premium-cta-mint">
          Bắt đầu tạo Gather
        </motion.button>
        <p className="text-center text-[13px] mt-4" style={{ color: T3 }}>Không feed công khai. Không chat lòng vòng.</p>
      </motion.div>

      <div className="flex justify-center mt-auto mb-2">
        <div className="w-[120px] h-1 rounded-full" style={{ background: "rgba(15,23,42,0.12)" }} />
      </div>
    </div>
  );
}
