import { useState, useRef, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { PawPrint, Heart, Lightning, Star, Trophy, MapPin, Camera, Lock, Crown, Sparkle } from "@phosphor-icons/react";
import BottomNav from "@/components/BottomNav";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { useDrag } from "@use-gesture/react";
import { triggerHaptic } from "@/components/premium/ParticleEffects";
import { FoxSVG, DogSVG, BunnySVG } from "@/components/premium/PetAvatars";

function getEnergyState(energy: number) {
  if (energy >= 85) return { label: "Đang rất vui 😄", color: "#3D6B4F", colorClass: "text-wi-green", desc: "Thú cưng tràn đầy năng lượng!" };
  if (energy >= 65) return { label: "Ổn áp 😊", color: "#C8371E", colorClass: "text-wi-primary", desc: "Thú cưng đang trong trạng thái tốt." };
  if (energy >= 40) return { label: "Hơi đói rồi 😐", color: "#F59E0B", colorClass: "text-orange-500", desc: "Thêm vài kỷ niệm nữa là bé vui ngay." };
  return { label: "Đói bụng rồi 🥺", color: "#EF4444", colorClass: "text-red-500", desc: "Thú cưng cần được cho ăn kỷ niệm!" };
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

// SVGs are imported from PetAvatars.tsx

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, type: "spring" as const, stiffness: 300, damping: 25 } }),
};

// Mây bay lơ lửng ban ngày
function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <motion.div 
        className="absolute top-10 w-32 h-10 bg-white rounded-full blur-xl"
        animate={{ x: [-100, 400] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-32 w-24 h-8 bg-white rounded-full blur-lg"
        animate={{ x: [-100, 400] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
      />
    </div>
  );
}

function AmbientBackground({ isNight, isParty }: { isNight: boolean, isParty: boolean }) {
  if (isParty) {
    return (
      <motion.div 
        className="absolute inset-0 pointer-events-none -z-10"
        animate={{ backgroundColor: ["#F13158", "#F59E0B", "#10B981", "#F13158"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.08 }}
      />
    );
  }
  return (
    <div className={`absolute inset-0 pointer-events-none -z-10 transition-colors duration-1000 ${isNight ? 'bg-[#181412]' : 'bg-[#F8F9FA]'}`}>
      {isNight ? (
         <div className="absolute inset-0">
           <StageStars />
         </div>
      ) : (
         <div className="absolute inset-0">
           <Clouds />
         </div>
      )}
    </div>
  );
}

export default function Pet() {
  const [energy, setEnergy] = useState(70);
  const [isHappy, setIsHappy] = useState(false);
  const [sparkId, setSparkId] = useState(0);
  const [level, setLevel] = useState(3);
  const [levelUpVisible, setLevelUpVisible] = useState(false);
  const [levelUpNum, setLevelUpNum] = useState(4);
  const [memoriesUntilLevel] = useState(2);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [activePet, setActivePet] = useState<'fox' | 'dog' | 'bunny'>('fox');
  const [isPetting, setIsPetting] = useState(false);
  const [petDirection, setPetDirection] = useState(0); // -1 left, 1 right
  const [actionState, setActionState] = useState<'idle' | 'tilt' | 'lookLeft' | 'shake' | 'lookRight'>('idle');
  const [isPartyMode, setIsPartyMode] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;  const energyState = getEnergyState(energy);

  // Action AI Loop
  useEffect(() => {
    if (isPetting || isHappy || isPartyMode) return;
    const actions = ['idle', 'tilt', 'lookLeft', 'shake', 'lookRight', 'idle', 'idle', 'idle'];
    
    const actionInterval = setInterval(() => {
      const randomAction = actions[Math.floor(Math.random() * actions.length)] as any;
      setActionState(randomAction);
      
      if (randomAction !== 'idle') {
        setTimeout(() => setActionState('idle'), 1500);
      }
    }, 4500);
    
    return () => clearInterval(actionInterval);
  }, [isPetting, isHappy, isPartyMode]);

  // Party Mode Haptics
  useEffect(() => {
    if (!isPartyMode) return;
    
    // Thug life pet action
    setActionState('idle');
    
    const hapticInterval = setInterval(() => {
      triggerHaptic(40);
    }, 500); // 120 BPM
    
    return () => clearInterval(hapticInterval);
  }, [isPartyMode]);

  const feedPet = () => {
    triggerHaptic(30); // Strong haptic on feed
    const newEnergy = Math.min(100, energy + 15);
    setEnergy(newEnergy);
    setIsHappy(true);
    setSparkId(id => id + 1);
    if (newEnergy >= 100) {
      const nextLevel = level + 1;
      setTimeout(() => {
        setLevelUpNum(nextLevel);
        setLevelUpVisible(true);
        
        // WOW Confetti Cannon
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 360, ticks: 60, zIndex: 10000, colors: ["#C8371E", "#3D6B4F", "#C8860A", "#8B5CF6"] };
        const interval: any = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
        }, 250);

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

  const bindPetting = useDrag(({ active, movement: [mx, my], velocity: [vx, vy], first }) => {
    if (first && active) {
      setIsPetting(true);
      triggerHaptic(10);
    }
    if (active) {
      setPetDirection(mx > 0 ? 1 : mx < 0 ? -1 : 0);
      // Small haptics during drag based on velocity
      if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
        triggerHaptic(5);
        
        // Randomly emit tiny hearts when petting
        if (Math.random() > 0.8) {
          const heartPath = confetti.shapeFromPath({ path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z' });
          confetti({
            particleCount: 1,
            spread: 30,
            origin: { x: 0.5 + (Math.random() * 0.1 - 0.05), y: 0.4 },
            colors: ["#FDA4AF", "#F43F5E"],
            shapes: [heartPath],
            scalar: 0.8,
            gravity: -0.2,
            ticks: 80,
            zIndex: 1000,
          });
        }
      }
    } else {
      setIsPetting(false);
      setPetDirection(0);
    }
  });

  return (
    <div className="flex-1 overflow-y-auto pb-24 px-6 relative bg-transparent">
      
      {/* Real-time Environment */}
      <AmbientBackground isNight={isNight} isParty={isPartyMode} />

      {/* Header */}
      <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible"
        className="relative z-10 flex items-center justify-between pt-8 mb-8">
        <div>
          <h1 className={`text-[36px] font-serif tracking-tight leading-tight ${isNight ? 'text-white' : 'text-slate-900'} transition-colors duration-1000`}>
            {activePet === 'fox' ? 'Cáo Nhỏ' : activePet === 'dog' ? 'Corgi' : 'Thỏ Trắng'}
          </h1>
          <div className={`text-[11px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors duration-1000 ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>Linh Vật GatherGo</div>
        </div>
        <div className="flex items-center gap-2">
          {/* Party Mode Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPartyMode(!isPartyMode)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${isPartyMode ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white/50 backdrop-blur-md border-slate-200'} shadow-sm text-lg`}
          >
            🪩
          </motion.button>
          
          <div className={`flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-md ${isNight ? 'border-slate-700 bg-slate-800/50 text-white' : 'border-slate-200 bg-white/50 text-slate-900'}`}>
            <Star className="w-4 h-4 text-wi-primary" weight="fill" />
            <span className="text-[13px] font-bold">Lv {level}</span>
          </div>
        </div>
      </motion.div>

      {/* Pet Stage — Museum Pedestal */}
      <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="mb-10 z-10 relative flex justify-center">
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={1000}
          transitionSpeed={1500}
          gyroscope={true}
          className="w-full max-w-[320px] aspect-square rounded-full"
        >
          <div
            ref={stageRef}
            {...bindPetting()}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className={`w-full h-full rounded-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-[#1E1917] border border-[#2C2421] shadow-[inset_0_4px_12px_rgba(255,255,255,0.03),inset_0_-12px_32px_rgba(0,0,0,0.8),0_12px_32px_rgba(0,0,0,0.4)]' : 'bg-[#FAFAFA] border border-white shadow-[inset_0_4px_12px_rgba(255,255,255,0.8),inset_0_-12px_32px_rgba(0,0,0,0.08),0_12px_32px_rgba(26,14,7,0.12)]'} touch-none cursor-grab active:cursor-grabbing`}
          >
            {/* Hologram EXP Ring */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none -rotate-90">
              <circle cx="50%" cy="50%" r="48%" fill="none" stroke={isNight ? "#334155" : "#e2e8f0"} strokeWidth="4" />
              <motion.circle 
                cx="50%" cy="50%" r="48%" fill="none" 
                stroke={energy >= 100 ? "#F59E0B" : "#8B5CF6"} 
                strokeWidth="6" 
                strokeDasharray="300%"
                animate={{ strokeDashoffset: `calc(300% - (300% * ${energy}) / 100)` }}
                transition={{ type: "spring", bounce: 0, duration: 1 }}
                style={{ filter: energy >= 100 ? 'drop-shadow(0 0 8px #F59E0B)' : 'drop-shadow(0 0 4px #8B5CF6)' }}
              />
            </svg>

            {/* Subtle Pedestal Shadow */}
          <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-[140px] h-[20px] rounded-[100%] blur-md pointer-events-none ${isNight ? 'bg-black/50' : 'bg-slate-200'}`} />

            {/* Day/Night specifics */}
            {isNight && <StageStars />}
            {!isNight && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-yellow-100/30 rounded-full blur-3xl pointer-events-none" />}

            <div className="relative z-10 w-full flex flex-col items-center mt-4 pointer-events-none">
              <motion.div
                animate={
                  isPartyMode && !isPetting && !isHappy
                    ? { y: [0, -15, 0, -15, 0], scaleY: [1, 1.1, 0.9, 1.1, 1], rotate: [0, -5, 5, -5, 0] } // Dance to the beat
                    : isPetting 
                    ? { y: 2, rotate: petDirection * 12, skewX: petDirection * -10, scale: [1, 0.95, 1], transition: { repeat: Infinity, duration: 0.3 } } // Skew based petting
                    : isHappy
                      ? { 
                          y: [0, 10, -60, -10, -30, 0], // Squash, stretch up, bounce
                          scaleY: [1, 0.7, 1.2, 0.9, 1.05, 1],
                          scaleX: [1, 1.3, 0.8, 1.1, 0.95, 1],
                          rotate: [0, 0, 360, 360, 360, 360]
                        }
                      : actionState === 'tilt'
                        ? { rotate: [0, 15, 15, 0] }
                        : actionState === 'lookLeft'
                          ? { scaleX: [-1, -1, 1] }
                          : actionState === 'lookRight'
                            ? { scaleX: [1, 1, 1] } // standard
                          : actionState === 'shake'
                            ? { rotate: [0, -10, 10, -10, 10, -5, 5, 0] }
                      : { y: [0, -8, 0], scale: [1, 1.02, 1] } // Breathing idle
                }
                transition={
                  isPartyMode && !isPetting && !isHappy
                    ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } // 120 BPM
                    : isPetting 
                    ? { type: "spring", stiffness: 300, damping: 20 }
                    : isHappy
                      ? { duration: 1.2, ease: "easeInOut" }
                      : actionState !== 'idle'
                        ? { duration: 1.5, type: "spring" }
                      : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative"
              >
                {activePet === 'fox' && <FoxSVG eyeOffset={eyeOffset} isHappy={isHappy} isPetting={isPetting} isPartyMode={isPartyMode} size={150} />}
                {activePet === 'dog' && <DogSVG eyeOffset={eyeOffset} isHappy={isHappy} isPetting={isPetting} isPartyMode={isPartyMode} size={150} />}
                {activePet === 'bunny' && <BunnySVG eyeOffset={eyeOffset} isHappy={isHappy} isPetting={isPetting} isPartyMode={isPartyMode} size={150} />}

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
                        background: (activePet === 'fox' 
                          ? ["#C8371E", "#FB923C", "#FDBA74", "#FFB085", "#FCA5A5"]
                          : activePet === 'dog'
                            ? ["#F59E0B", "#D97706", "#FCD34D", "#FEF3C7", "#B45309"]
                            : ["#FBCFE8", "#F472B6", "#E2E8F0", "#FFFFFF", "#F9A8D4"])[i % 5],
                        marginTop: -3, marginLeft: -3,
                      }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{
                        x: Math.cos(angle) * (70 + i * 3),
                        y: Math.sin(angle) * (70 + i * 3),
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
        </div>
      </Tilt>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={feedPet}
          className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 h-[48px] px-8 bg-slate-900 text-white font-bold text-[13px] uppercase tracking-[0.1em] flex items-center gap-2 hover:bg-wi-primary transition-colors">
          <PawPrint className="w-4 h-4" weight="fill" /> Cho thú cưng ăn
        </motion.button>
      </motion.div>

      {/* Pet Selector UI */}
      <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible" className="mb-10 flex justify-center gap-4">
        {[
          { id: 'fox', label: 'Cáo', icon: '🦊' },
          { id: 'dog', label: 'Corgi', icon: '🐕' },
          { id: 'bunny', label: 'Thỏ', icon: '🐰' }
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => {
              triggerHaptic(15);
              setActivePet(p.id as any);
              setIsHappy(true); // show pop effect
              setTimeout(() => setIsHappy(false), 800);
            }}
            className={`px-4 py-2 rounded-full border text-[14px] font-bold transition-all ${
              activePet === p.id 
                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-110'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="mr-2 text-[16px]">{p.icon}</span> {p.label}
          </button>
        ))}
      </motion.div>

      <div className="text-center mb-10">
        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
          className="font-serif italic text-[16px] text-slate-500">
          {isHappy ? "Thú cưng no nê rồi! 🎉" : "Đang vui — muốn thêm kỷ niệm"}
        </motion.p>
      </div>

      {/* Stats - Editorial */}
      <div className="grid grid-cols-3 gap-6 mb-10 border-t border-b border-slate-100 py-6">
        {[
          { icon: MapPin, value: 12, label: "Tụ tập" },
          { icon: Camera, value: 48, label: "Hình ảnh" },
          { icon: Star, value: "5d", label: "Chuỗi ngày" },
        ].map(({ icon: Icon, value, label }, i) => (
          <motion.div key={label} custom={3 + i} variants={cardVariants} initial="hidden" animate="visible"
            className="flex flex-col items-center text-center">
            <Icon className="w-5 h-5 text-slate-400 mb-2" weight="light" />
            <div className="text-[24px] font-serif text-slate-900 leading-none mb-1">{value}</div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Energy & Unlock */}
      <div className="flex gap-6 mb-10">
        <motion.div custom={6} variants={cardVariants} initial="hidden" animate="visible"
          className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50">
          <div className="text-[36px] font-serif text-slate-900 mb-1">{energy}%</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Năng lượng</div>
          <div className="w-full h-[2px] bg-slate-200 mt-4 relative">
            <motion.div className="absolute top-0 left-0 h-full bg-slate-900"
              initial={{ width: "0%" }} animate={{ width: `${energy}%` }}
              transition={{ duration: 1.2, type: "spring" }} />
          </div>
        </motion.div>

        <motion.div custom={7} variants={cardVariants} initial="hidden" animate="visible"
          className="flex-1 flex flex-col items-center justify-center p-6 border border-slate-200">
          <div className="text-[28px] mb-2">👑</div>
          <div className="text-[14px] font-serif text-slate-900 italic">Vương miện</div>
          <div className="text-[10px] font-bold uppercase tracking-widest mt-2 text-slate-400">Còn {memoriesUntilLevel} kỷ niệm</div>
        </motion.div>
      </div>

      {/* Rewards */}
      <motion.div custom={8} variants={cardVariants} initial="hidden" animate="visible" className="mb-10">
        <h2 className="font-serif text-[24px] text-slate-900 mb-6">Phần Thưởng</h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8">
          {[
            { icon: <Heart className="w-6 h-6" weight="light" />, label: "Nhãn dán", locked: false },
            { icon: <Star className="w-6 h-6" weight="light" />, label: "Mũ len", locked: false },
            { icon: <Trophy className="w-6 h-6" weight="light" />, label: "Huy hiệu", locked: true, unlockAt: 5 },
            { icon: <Crown className="w-6 h-6" weight="light" />, label: "Vương miện", locked: true, unlockAt: 8 },
            { icon: <Lightning className="w-6 h-6" weight="light" />, label: "Aura", locked: true, unlockAt: 10 },
            { icon: <Sparkle className="w-6 h-6" weight="light" />, label: "Star dust", locked: true, unlockAt: 12 },
          ].map((r, i) => (
            <motion.div key={r.label}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.05, type: "spring" }}
              className={`flex flex-col items-center ${r.locked ? "opacity-40" : "cursor-pointer"}`}>
              <div className="mb-2 text-slate-800">{r.icon}</div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">{r.label}</span>
              {r.locked && <span className="text-[10px] font-serif italic text-slate-400">Lv {r.unlockAt}</span>}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div custom={9} variants={cardVariants} initial="hidden" animate="visible" className="mb-8">
        <div className="bg-wi-surface rounded-3xl p-5 border border-wi-border shadow-sm">
          <div className="text-label text-wi-t3 mb-4">THÀNH TÍCH GẦN ĐÂY</div>
          <div className="flex gap-3">
            {[
              { icon: Trophy, label: "First Gather", desc: "Tạo plan đầu", active: true },
              { icon: Heart, label: "Social Star", desc: "Vote 5 lần", active: true },
              { icon: Camera, label: "Photographer", desc: "12 ảnh", active: false },
            ].map((b, i) => (
              <Tilt key={b.label} className="flex-1" tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={b.active} glareMaxOpacity={0.1}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.65 + i * 0.1, type: "spring" }}
                  className={`h-full flex flex-col items-center rounded-[20px] p-3 border ${b.active ? "bg-white border-[1.5px] border-wi-primary/20 shadow-sm" : "bg-gray-50 border-wi-border opacity-50"}`}>
                  <b.icon className={`w-5 h-5 mb-1.5 ${b.active ? "text-wi-primary" : "text-wi-t3"}`} weight="duotone" />
                  <span className={`text-[11px] font-black text-center leading-tight ${b.active ? "text-wi-t1" : "text-wi-t3"}`}>{b.label}</span>
                  <span className={`text-[9px] font-medium mt-1 text-center ${b.active ? "text-wi-t2" : "text-wi-t3"}`}>{b.desc}</span>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
