import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Users, Camera, ArrowRight } from "lucide-react";

const BLUE = "#3B82F6";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const SURF = "#FFFFFF";
const SHADOW = "0 2px 8px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.07)";

// Word-by-word headline
const headlineWords = [
  { text: "Plan", blue: false, br: false },
  { text: "đi chơi", blue: false, br: true },
  { text: "cùng nhau,", blue: false, br: false },
  { text: "dễ hơn", blue: true, br: true },
  { text: "bao giờ hết", blue: true, br: false },
];

const floatingChips = [
  { text: "3 plan sẵn sàng", icon: Zap, top: "1rem", left: "1rem", delay: 0.6 },
  { text: "4 bạn đang vote", icon: Users, top: "3.4rem", right: "1rem", delay: 0.8 },
  { text: "Đã lưu kỷ niệm", icon: Camera, bottom: "4rem", left: "2rem", delay: 1.0 },
];

// Spark burst on CTA
function SparkBurst({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i * 36) * Math.PI / 180;
        return (
          <motion.div key={i}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: i % 2 === 0 ? 6 : 4,
              height: i % 2 === 0 ? 6 : 4,
              background: [BLUE, "#8B5CF6", "#F59E0B", "#22C55E"][i % 4],
              top: "50%", left: "50%",
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * (50 + i * 5),
              y: Math.sin(angle) * (50 + i * 5),
              scale: [0, 1.6, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />
        );
      })}
    </>
  );
}

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [sparkVisible, setSparkVisible] = useState(false);
  const [sparkKey, setSparkKey] = useState(0);

  const handleCTA = () => {
    setSparkVisible(true);
    setSparkKey(k => k + 1);
    setTimeout(() => {
      setSparkVisible(false);
      setLocation("/home");
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col px-6 py-4 overflow-hidden relative" style={{ background: "#F7F5F0" }}>

      {/* Aurora background blobs — 3 animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Blue aurora */}
        <div className="aurora-blob"
          style={{
            width: 340, height: 340,
            top: -60, right: -80,
            background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(139,92,246,0.12) 50%, transparent 70%)",
            animation: "aurora-1 12s ease-in-out infinite",
          }} />
        {/* Amber aurora */}
        <div className="aurora-blob"
          style={{
            width: 280, height: 280,
            bottom: 80, left: -60,
            background: "radial-gradient(circle, rgba(245,158,11,0.16) 0%, rgba(249,115,22,0.08) 50%, transparent 70%)",
            animation: "aurora-2 15s ease-in-out infinite",
          }} />
        {/* Purple aurora */}
        <div className="aurora-blob"
          style={{
            width: 200, height: 200,
            top: "40%", left: "30%",
            background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
            animation: "aurora-3 18s ease-in-out infinite",
          }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
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
        <div className="mb-4"><div className="page-label">GatherGo</div></div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full h-[272px] rounded-[24px] overflow-hidden mb-6"
          style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.10)" }}>
          <img
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&auto=format&fit=crop"
            alt="Friends gathering" className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(175deg, rgba(15,23,42,0.04) 0%, rgba(15,23,42,0.35) 50%, rgba(15,23,42,0.72) 100%)" }} />

          {/* Floating chips */}
          {floatingChips.map(({ text, icon: Icon, top, left, right, bottom, delay }: any, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, -(3 + i * 1.5), 0] }}
              transition={{ opacity: { delay, duration: 0.4 }, scale: { delay, duration: 0.4 }, y: { duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 } }}
              className="absolute flex items-center gap-2 px-3 py-2 rounded-2xl"
              style={{ top, left, right, bottom, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.60)", boxShadow: SHADOW }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(59,130,246,0.12)" }}>
                <Icon className="w-3.5 h-3.5" style={{ color: BLUE }} />
              </div>
              <span className="text-[12px] font-semibold whitespace-nowrap" style={{ color: T1 }}>{text}</span>
            </motion.div>
          ))}

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="absolute bottom-4 right-4 text-right">
            <div className="flex items-center gap-1.5 justify-end mb-1">
              {["#3B82F6", "#8B5CF6", "#F59E0B", "#22C55E"].map((c, i) => (
                <div key={i} className="w-7 h-7 rounded-full"
                  style={{ background: `${c}CC`, border: "2px solid rgba(255,255,255,0.7)", marginLeft: i > 0 ? "-8px" : "0" }} />
              ))}
            </div>
            <p className="text-[11px] font-semibold text-white/80">2,400 nhóm chốt plan tuần này</p>
          </motion.div>
        </motion.div>

        {/* Word-by-word headline */}
        <div className="mb-3">
          <h1 className="text-[36px] font-black leading-[1.06] tracking-tight" style={{ color: T1 }}>
            {headlineWords.map(({ text, blue, br }, i) => (
              <span key={i}>
                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.14, type: "spring", stiffness: 380, damping: 28 }}
                  style={{ color: blue ? BLUE : T1, display: "inline" }}
                >
                  {text}
                </motion.span>
                {br ? <br /> : " "}
              </span>
            ))}
          </h1>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="text-[15px] leading-relaxed mb-5" style={{ color: T2 }}>
          Chọn mood, thời gian và ngân sách. GatherGo tạo plan địa phương để cả nhóm dễ đồng ý.
        </motion.p>

        {/* Feature rows */}
        <div className="flex flex-col gap-2.5 mb-7">
          {[
            { icon: Zap, label: "Gợi ý nhanh theo mood & vibe nhóm", color: BLUE, delay: 1.0 },
            { icon: Users, label: "Vote cùng nhóm, không cần chat lòng vòng", color: "#8B5CF6", delay: 1.1 },
            { icon: Camera, label: "Lưu kỷ niệm mỗi chuyến đi lại", color: "#F59E0B", delay: 1.2 },
          ].map(({ icon: Icon, label, color, delay }) => (
            <motion.div key={label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay, type: "spring", stiffness: 400, damping: 28 }}
              className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <span className="text-[13px] font-medium" style={{ color: T2 }}>{label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA with spark burst */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
          className="relative">
          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCTA}
            className="w-full h-[58px] premium-cta-mint flex items-center justify-center gap-2 text-[16px] relative overflow-visible">
            Bắt đầu tạo Gather
            <ArrowRight className="w-4 h-4" />
            <AnimatePresence>
              {sparkVisible && <SparkBurst visible={sparkVisible} key={sparkKey} />}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          className="text-center text-[12px] mt-3" style={{ color: T3 }}>
          Không feed công khai · Không chat lòng vòng · Riêng tư 100%
        </motion.p>

        <div className="flex justify-center mt-auto mb-2 pt-4">
          <div className="w-[120px] h-1 rounded-full" style={{ background: "rgba(15,23,42,0.12)" }} />
        </div>
      </div>
    </div>
  );
}
