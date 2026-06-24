import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Heart, Zap, Star, Trophy, MapPin, Camera, Lock, Crown, Sparkles } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const BLUE = "#C8371E";
const BLUE_BRIGHT = "#A62D17";
const T1 = "#1A0E07";
const T2 = "#5C4033";
const T3 = "#9C8470";
const BORDER = "rgba(26,14,7,0.10)";
const SHADOW = "0 1px 3px rgba(26,14,7,0.06), 0 4px 16px rgba(26,14,7,0.06)";
const SURF = "#F9F4EA";
const SURF2 = "#EDE0C8";

// Warm Mimi colors
const MIMI_BODY = "#FFD4A8";
const MIMI_STROKE = "#FDBA74";
const MIMI_EAR_INNER = "#FFB085";
const MIMI_NOSE = "#FB923C";
const MIMI_CHEEK = "#FCA5A5";
const MIMI_EYE = "#1A0800";
const MIMI_WHISKER = "#FDBA74";

function getEnergyState(energy: number) {
  if (energy >= 85) return { label: "Đang rất vui 😄", color: "#3D6B4F", desc: "Mimi tràn đầy năng lượng!" };
  if (energy >= 65) return { label: "Ổn áp 😊", color: BLUE, desc: "Mimi đang trong trạng thái tốt." };
  if (energy >= 40) return { label: "Hơi đói rồi 😐", color: "#F59E0B", desc: "Thêm vài kỷ niệm nữa là Mimi vui ngay." };
  return { label: "Đói bụng rồi 🥺", color: "#EF4444", desc: "Mimi cần được cho ăn kỷ niệm!" };
}

// Stars for dark stage background
function StageStars() {
  const stars = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 0.8 + Math.random() * 1.4,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.5,
  })), []);

  return (
    <>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.left}%`, top: `${s.top}%`,
          width: s.size, height: s.size,
          borderRadius: "50%",
          background: "white",
          animation: `star-twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          pointerEvents: "none",
        }} />
      ))}
    </>
  );
}

// Animated Mimi SVG — warm, expressive, eye-follow
function MimiSVG({ eyeOffset, isHappy, size = 120 }: { eyeOffset: { x: number; y: number }; isHappy: boolean; size?: number }) {
  const ex = eyeOffset.x;
  const ey = eyeOffset.y;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* Body */}
      <ellipse cx="60" cy="82" rx="33" ry="26" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="2.5" />
      {/* Head */}
      <circle cx="60" cy="52" r="28" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="2.5" />
      {/* Ears */}
      <path d="M38 30 L32 12 L50 26 Z" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="2.5" />
      <path d="M82 30 L88 12 L70 26 Z" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="2.5" />
      {/* Inner ears */}
      <path d="M40 28 L36 16 L48 25 Z" fill={MIMI_EAR_INNER} />
      <path d="M80 28 L84 16 L72 25 Z" fill={MIMI_EAR_INNER} />
      {/* Eyes — blink + follow */}
      <motion.g
        animate={{ scaleY: [1, 1, 1, 0.08, 1, 1, 1, 1, 0.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.38, 0.40, 0.42, 0.65, 0.72, 0.76, 0.78, 1] }}
        style={{ transformOrigin: "60px 48px" }}>
        {/* Left eye */}
        <circle cx={50 + ex} cy={48 + ey} r="5.5" fill={MIMI_EYE} />
        <circle cx={51.5 + ex * 0.5} cy={46.5 + ey * 0.5} r="2" fill="white" />
        {/* Right eye */}
        <circle cx={70 + ex} cy={48 + ey} r="5.5" fill={MIMI_EYE} />
        <circle cx={71.5 + ex * 0.5} cy={46.5 + ey * 0.5} r="2" fill="white" />
      </motion.g>
      {/* Nose */}
      <ellipse cx="60" cy="58" rx="3" ry="2.2" fill={MIMI_NOSE} />
      {/* Mouth */}
      {isHappy
        ? <path d="M55 63 Q60 68 65 63" stroke={MIMI_NOSE} strokeWidth="2" fill="none" strokeLinecap="round" />
        : <path d="M56 63 Q60 66 64 63" stroke={MIMI_NOSE} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      }
      {/* Whiskers */}
      <line x1="35" y1="56" x2="20" y2="53" stroke={MIMI_WHISKER} strokeWidth="1.2" />
      <line x1="35" y1="60" x2="18" y2="61" stroke={MIMI_WHISKER} strokeWidth="1.2" />
      <line x1="35" y1="64" x2="21" y2="67" stroke={MIMI_WHISKER} strokeWidth="1.2" />
      <line x1="85" y1="56" x2="100" y2="53" stroke={MIMI_WHISKER} strokeWidth="1.2" />
      <line x1="85" y1="60" x2="102" y2="61" stroke={MIMI_WHISKER} strokeWidth="1.2" />
      <line x1="85" y1="64" x2="99" y2="67" stroke={MIMI_WHISKER} strokeWidth="1.2" />
      {/* Cheek blush */}
      <circle cx="40" cy="58" r="6" fill={MIMI_CHEEK} opacity="0.45" />
      <circle cx="80" cy="58" r="6" fill={MIMI_CHEEK} opacity="0.45" />
      {/* Paws */}
      <ellipse cx="40" cy="97" rx="9" ry="7" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="2" />
      <ellipse cx="80" cy="97" rx="9" ry="7" fill={MIMI_BODY} stroke={MIMI_STROKE} strokeWidth="2" />
      {/* Tail */}
      <path d="M90 80 Q108 65 104 48" stroke={MIMI_STROKE} strokeWidth="3" fill="none" strokeLinecap="round">
        <animate attributeName="d"
          values="M90 80 Q108 65 104 48;M90 80 Q112 58 108 42;M90 80 Q108 65 104 48"
          dur="1.6s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
      </path>
      {/* Happy sparkles */}
      {isHappy && <>
        <motion.text x="96" y="28" fontSize="14" textAnchor="middle"
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: [0, 1, 0], y: [5, -8, -20] }}
          transition={{ duration: 0.9 }}>✨</motion.text>
        <motion.text x="30" y="22" fontSize="12" textAnchor="middle"
          initial={{ opacity: 0, y: 5 }} animate={{ opacity: [0, 1, 0], y: [5, -5, -18] }}
          transition={{ duration: 0.9, delay: 0.1 }}>💛</motion.text>
      </>}
    </svg>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, type: "spring" as const, stiffness: 300, damping: 25 } }),
};

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);
  const [sparkId, setSparkId] = useState(0);
  const [level, setLevel] = useState(3);
  const [levelUpVisible, setLevelUpVisible] = useState(false);
  const [levelUpNum, setLevelUpNum] = useState(4);
  const [memoriesUntilLevel] = useState(2);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const stageRef = useRef<HTMLDivElement>(null);

  const energyState = getEnergyState(energy);

  const feedPet = () => {
    const newEnergy = Math.min(100, energy + 15);
    setEnergy(newEnergy);
    setIsHappy(true);
    setSparkId(id => id + 1);
    if (newEnergy >= 100) {
      const nextLevel = level + 1;
      setTimeout(() => {
        setLevelUpNum(nextLevel);
        setLevelUpVisible(true);
        setTimeout(() => setLevel(nextLevel), 200);
        setTimeout(() => setEnergy(25), 200);
        setTimeout(() => setLevelUpVisible(false), 2800);
      }, 700);
    }
    setTimeout(() => setIsHappy(false), 1500);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setEyeOffset({
      x: Math.max(-3, Math.min(3, dx * 3.5)),
      y: Math.max(-2, Math.min(2, dy * 2.5)),
    });
  };

  const handlePointerLeave = () => {
    setEyeOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20 px-5 relative" style={{ background: "#EEE6D4" }}>

      {/* Level-up ceremony overlay */}
      <AnimatePresence>
        {levelUpVisible && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 9999, background: "rgba(8, 10, 22, 0.93)", backdropFilter: "blur(10px)" }}
          >
            <motion.div
              initial={{ scale: 0.3, rotate: -20 }} animate={{ scale: [0.3, 1.5, 1.1, 1.0], rotate: [-20, 10, -5, 0] }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="text-[80px] mb-4">⭐</motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.7, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 350, damping: 22 }}>
              <div className="text-[52px] font-black text-white text-center leading-tight tracking-tight">LEVEL UP!</div>
              <div className="text-[22px] font-bold text-center mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                Mimi lên Lv {levelUpNum}! 🎉
              </div>
              <div className="flex justify-center gap-2 mt-3">
                {["✨", "🌟", "💛", "🌟", "✨"].map((s, i) => (
                  <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.08, type: "spring" }} className="text-[20px]">{s}</motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible"
        className="flex items-center justify-between pt-6 mb-4">
        <div>
          <div className="page-label mb-0.5">GoPet Ecosystem</div>
          <h1 className="text-[26px] font-black tracking-tight" style={{ color: T1 }}>Mimi</h1>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: SURF2, border: `1px solid rgba(200,55,30,0.18)`, boxShadow: SHADOW }}>
          <Star className="w-3.5 h-3.5 fill-current" style={{ color: "#F59E0B" }} />
          <span className="text-[12px] font-bold" style={{ color: T1 }}>Lv {level}</span>
        </div>
      </motion.div>

      {/* Pet Stage — DARK */}
      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="mb-4">
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="rounded-3xl p-6 flex flex-col items-center relative overflow-hidden"
          style={{
            background: "linear-gradient(150deg, #0B0F1E 0%, #1A1240 55%, #0C1B35 100%)",
            minHeight: 260,
            boxShadow: "0 12px 40px rgba(8,10,30,0.40), 0 2px 8px rgba(0,0,0,0.20)",
            border: "1px solid rgba(255,255,255,0.06)",
            cursor: "none",
          }}>

          {/* Star field */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <StageStars />
          </div>

          {/* Glow halo behind Mimi */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 200, height: 200,
              background: "radial-gradient(circle, rgba(200,55,30,0.18) 0%, rgba(200,134,10,0.06) 50%, transparent 70%)",
              filter: "blur(30px)",
            }} />

          {/* Second warm glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 160, height: 160,
              background: "radial-gradient(circle, rgba(253,186,116,0.18) 0%, transparent 70%)",
              filter: "blur(20px)",
            }} />

          <div className="relative mb-4 z-10 w-full flex flex-col items-center">
            <motion.div
              animate={isHappy
                ? { y: [0, -32, -14, -24, 0], rotate: [0, -10, 10, -6, 0], scale: [1, 1.1, 1.05, 1.08, 1] }
                : { y: [0, -8, 0] }
              }
              transition={isHappy
                ? { duration: 0.85, type: "spring" }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              className="relative"
            >
              <MimiSVG eyeOffset={eyeOffset} isHappy={isHappy} size={130} />

              {/* Tap burst particles */}
              <AnimatePresence>
                {isHappy && [...Array(14)].map((_, i) => {
                  const angle = (i * (360 / 14)) * Math.PI / 180;
                  return (
                    <motion.div key={`spark-${sparkId}-${i}`}
                      className="absolute top-1/2 left-1/2 rounded-full"
                      style={{
                        width: i % 3 === 0 ? 8 : 5,
                        height: i % 3 === 0 ? 8 : 5,
                        background: [BLUE, "#8B5CF6", "#C8860A", MIMI_NOSE, "#3D6B4F"][i % 5],
                        marginTop: -3, marginLeft: -3,
                      }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * (60 + i * 3),
                        y: Math.sin(angle) * (60 + i * 3),
                        scale: [0, 1.8, 0],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          <h2 className="text-[22px] font-black tracking-tight text-white relative z-10">Mimi</h2>
          <motion.p animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
            className="text-[13px] mt-0.5 relative z-10" style={{ color: "rgba(255,255,255,0.65)" }}>
            {isHappy ? "Mimi no nê rồi! 🎉" : "Đang vui — muốn thêm kỷ niệm"}
          </motion.p>

          <motion.button whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.93 }}
            onClick={feedPet}
            className="mt-4 h-[42px] px-6 rounded-full font-bold text-[14px] flex items-center gap-2 relative z-10"
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "white",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.30)",
            }}>
            <PawPrint className="w-4 h-4" /> Cho Mimi ăn kỷ niệm
          </motion.button>

          {/* Level badge corner */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full z-10"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <Star className="w-3 h-3 fill-current" style={{ color: "#F59E0B" }} />
            <span className="text-[11px] font-bold text-white">Lv {level}</span>
          </div>
        </div>
      </motion.div>

      {/* Energy bar */}
      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="mb-4">
        <div className="rounded-2xl p-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: energyState.color }} />
              <span className="text-[13px] font-bold" style={{ color: energyState.color }}>{energyState.label}</span>
            </div>
            <span className="text-[18px] font-black" style={{ color: BLUE }}>{energy}%</span>
          </div>
          <div className="progress-track" style={{ height: 8, background: "#F1F5F9", borderRadius: 4, overflow: "hidden" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${energyState.color}, ${BLUE})` }}
              initial={{ width: "0%" }} animate={{ width: `${energy}%` }}
              transition={{ duration: 1.2, type: "spring", stiffness: 60 }} />
          </div>
          <p className="text-[12px] mt-2" style={{ color: T3 }}>
            {energyState.desc}{" "}
            {memoriesUntilLevel > 0 && (
              <span>Cần thêm <span style={{ color: BLUE, fontWeight: 700 }}>{memoriesUntilLevel} kỷ niệm</span> để lên Level {level + 1}.</span>
            )}
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {[
          { icon: MapPin, value: 12, label: "Gather", color: BLUE },
          { icon: Camera, value: 48, label: "Photos", color: "#8B5CF6" },
          { icon: Star, value: "5d", label: "Streak", color: "#F59E0B" },
        ].map(({ icon: Icon, value, label, color }, i) => (
          <motion.div key={label} custom={3 + i} variants={cardVariants} initial="hidden" animate="visible"
            whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
            className="rounded-2xl p-3 flex flex-col items-center text-center"
            style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-1"
              style={{ background: `${color}12` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="text-[22px] font-black" style={{ color }}>{value}</div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: T3 }}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Energy ring + Unlock next */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible"
          className="rounded-2xl p-4 flex flex-col items-center justify-center"
          style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="relative w-[72px] h-[72px]">
            <svg width="72" height="72" className="transform -rotate-90">
              <circle cx="36" cy="36" r="30" fill="none" stroke="#E2E8F0" strokeWidth="5" />
              <motion.circle cx="36" cy="36" r="30" fill="none" stroke={energyState.color} strokeWidth="5" strokeLinecap="round"
                strokeDasharray={188} initial={{ strokeDashoffset: 188 }}
                animate={{ strokeDashoffset: 188 - (energy / 100) * 188 }}
                transition={{ duration: 1.5, delay: 0.3, type: "spring", stiffness: 60 }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[16px] font-black" style={{ color: T1 }}>{energy}%</span>
            </div>
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] mt-2" style={{ color: T3 }}>Energy</div>
        </motion.div>

        <motion.div custom={7} variants={cardVariants} initial="hidden" animate="visible"
          className="rounded-2xl p-4 flex flex-col items-center justify-center text-center"
          style={{ background: SURF2, border: `1px solid rgba(200,55,30,0.14)` }}>
          <div className="text-[9px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: T3 }}>Mở khóa tiếp</div>
          <div className="text-[26px] mb-1">👑</div>
          <div className="text-[13px] font-bold" style={{ color: T1 }}>Tiny Crown</div>
          <div className="text-[10px] mt-1" style={{ color: T3 }}>Còn {memoriesUntilLevel} kỷ niệm</div>
          <div className="w-full h-1 rounded-full mt-2 overflow-hidden" style={{ background: "#E2E8F0" }}>
            <div className="h-full rounded-full" style={{ width: "50%", background: BLUE }} />
          </div>
        </motion.div>
      </div>

      {/* Rewards */}
      <motion.div custom={8} variants={cardVariants} initial="hidden" animate="visible" className="mb-4">
        <div className="rounded-2xl p-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="flex items-center justify-between mb-3">
            <div className="page-label">Phần thưởng</div>
            <div className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: SURF2, color: BLUE, border: `1px solid rgba(200,55,30,0.18)` }}>Level {level}</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <Heart className="w-4 h-4" />, label: "Nhãn dán", locked: false },
              { icon: <Star className="w-4 h-4" />, label: "Mũ len", locked: false },
              { icon: <Trophy className="w-4 h-4" />, label: "Huy hiệu", locked: true, unlockAt: 5 },
              { icon: <Crown className="w-4 h-4" />, label: "Vương miện", locked: true, unlockAt: 8 },
              { icon: <Zap className="w-4 h-4" />, label: "Aura", locked: true, unlockAt: 10 },
              { icon: <Sparkles className="w-4 h-4" />, label: "Star dust", locked: true, unlockAt: 12 },
            ].map((r, i) => (
              <motion.div key={r.label}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.05, type: "spring" }}
                whileHover={!r.locked ? { scale: 1.10, y: -4 } : {}}
                className="relative flex flex-col items-center rounded-2xl p-2.5 border"
                style={{
                  background: r.locked ? "#EDE3D0" : SURF2,
                  borderColor: r.locked ? "rgba(26,14,7,0.06)" : "rgba(200,55,30,0.18)",
                  opacity: r.locked ? 0.55 : 1,
                }}>
                <div className="mb-1" style={{ color: r.locked ? T3 : BLUE }}>{r.icon}</div>
                <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: T1 }}>{r.label}</span>
                {r.locked && <>
                  <Lock className="absolute top-1.5 right-1.5 w-2.5 h-2.5" style={{ color: T3 }} />
                  <span className="text-[8px] mt-0.5" style={{ color: T3 }}>Lv {r.unlockAt}</span>
                </>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div custom={9} variants={cardVariants} initial="hidden" animate="visible" className="mb-5">
        <div className="rounded-2xl p-4" style={{ background: SURF, border: `1px solid ${BORDER}`, boxShadow: SHADOW }}>
          <div className="page-label mb-3">Thành tích gần đây</div>
          <div className="flex gap-2">
            {[
              { icon: Trophy, label: "First Gather", desc: "Tạo plan đầu", active: true },
              { icon: Heart, label: "Social Star", desc: "Vote 5 lần", active: true },
              { icon: Camera, label: "Photographer", desc: "12 ảnh", active: false },
            ].map((b, i) => (
              <motion.div key={b.label}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex-1 flex flex-col items-center rounded-2xl p-2.5 border"
                style={{
                  background: b.active ? SURF2 : "#EDE3D0",
                  borderColor: b.active ? "rgba(200,55,30,0.18)" : BORDER,
                  opacity: b.active ? 1 : 0.5,
                }}>
                <b.icon className="w-4 h-4 mb-1" style={{ color: b.active ? BLUE : T3 }} />
                <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: T1 }}>{b.label}</span>
                <span className="text-[8px]" style={{ color: T3 }}>{b.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
