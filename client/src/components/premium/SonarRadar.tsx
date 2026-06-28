import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, WarningCircle, NavigationArrow, CheckCircle } from "@phosphor-icons/react";

const getMembersByGroup = (group: string) => {
  if (group === "couple") return [
    { initial: "L", name: "Linh", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop", x: 65, y: 35, distance: "2km", status: "Đang mua trà sữa 🧋", isLost: false }
  ];
  if (group === "family") return [
    { initial: "B", name: "Ba", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop", x: 45, y: 45, distance: "100m", status: "Đã đến", isLost: false },
    { initial: "M", name: "Mẹ", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop", x: 55, y: 55, distance: "50m", status: "Đang đậu xe", isLost: false }
  ];
  return [
    { initial: "L", name: "Linh", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop", x: 30, y: 30, distance: "20m", status: "Đã tới", isLost: false },
    { initial: "M", name: "Minh", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop", x: 70, y: 30, distance: "15m", status: "Đã tới", isLost: false },
    { initial: "A", name: "An", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop", x: 80, y: 80, distance: "5km", status: "Mù đường cứu với 😭", isLost: true }
  ];
};

export function SonarRadar({ groupParam }: { groupParam: string }) {
  const members = getMembersByGroup(groupParam);
  const [pings, setPings] = useState<number[]>([]);
  const [showRescueDetails, setShowRescueDetails] = useState(false);
  const lostMember = members.find(m => m.isLost);

  // Generate sonar pings continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setPings(prev => [...prev, Date.now()]);
      setTimeout(() => {
        setPings(prev => prev.slice(1));
      }, 4000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[6px] overflow-hidden flex items-center justify-center">
      
      {/* Soft glowing ambient background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[100px]" />
        {lostMember ? (
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-rose-600/20 blur-[120px]" />
        ) : (
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-emerald-500/10 blur-[120px]" />
        )}
      </div>

      {/* SVG Connecting Line for Lost Member */}
      {lostMember && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
          <defs>
            <linearGradient id="laser" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(244,63,94,0)" />
              <stop offset="100%" stopColor="rgba(244,63,94,1)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <motion.line 
            x1="50%" y1="50%" 
            x2={`${lostMember.x}%`} y2={`${lostMember.y}%`} 
            stroke="url(#laser)" 
            strokeWidth="4" 
            strokeDasharray="8 8"
            filter="url(#glow)"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      )}

      {/* Concentric rings */}
      <div className="absolute w-[80vw] h-[80vw] max-w-[400px] max-h-[400px] border border-slate-700/50 rounded-full pointer-events-none shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]" />
      <div className="absolute w-[50vw] h-[50vw] max-w-[250px] max-h-[250px] border border-slate-600/50 rounded-full pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.03)]" />
      <div className="absolute w-[20vw] h-[20vw] max-w-[100px] max-h-[100px] border border-slate-500/50 rounded-full pointer-events-none shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]" />
      
      {/* Animating Sonar Pings (Ripples) */}
      {pings.map((pingId) => (
        <motion.div
          key={pingId}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: "120vw", height: "120vw", opacity: 0 }}
          transition={{ duration: 4, ease: "easeOut" }}
          className="absolute rounded-full border-[1.5px] border-indigo-400/40 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.2)] pointer-events-none"
        />
      ))}

      {/* Center User (Me - Nghĩa) */}
      <div className="absolute z-30 flex flex-col items-center justify-center">
        <div className="relative w-12 h-12 rounded-full border-[2.5px] border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.5)] overflow-hidden">
          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop" alt="Bạn" className="w-full h-full object-cover" />
        </div>
        <div className="mt-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Bạn (Nghĩa)
        </div>
      </div>

      {/* Friends on Radar */}
      {members.map((m, i) => {
        const isLost = m.isLost;
        
        // SAFE FRIENDS: Minimal UI to avoid clutter
        if (!isLost) {
          return (
            <div 
              key={i} 
              className="absolute z-20 flex flex-col items-center opacity-60"
              style={{ left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div className="relative w-8 h-8 rounded-full border-2 border-emerald-500 overflow-hidden">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover grayscale opacity-80" />
                <div className="absolute inset-0 bg-emerald-500/20" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                <CheckCircle className="w-2.5 h-2.5 text-white" weight="fill" />
              </div>
            </div>
          );
        }

        // LOST FRIEND: Maximum emphasis
        return (
          <div 
            key={i} 
            className="absolute z-40 flex flex-col items-center"
            style={{ left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div 
              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 border-2 border-rose-500 rounded-full animate-ping opacity-60" />
              <div className="w-14 h-14 rounded-full border-[3px] border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.6)] overflow-hidden bg-white z-10 relative">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Distance Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-orange-500 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full border border-rose-400/50 whitespace-nowrap shadow-lg flex items-center gap-1 z-20">
                <MapPin className="w-2.5 h-2.5" weight="fill" /> {m.distance}
              </div>
            </motion.div>

            {/* Friend Status Bubble - Positioned ABOVE to avoid bottom clipping */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute bottom-full mb-3 px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl rounded-br-none shadow-[0_10px_25px_rgba(244,63,94,0.4)] border border-white/20 text-white text-[11px] font-bold whitespace-nowrap z-20 flex items-center gap-1"
            >
              {m.status}
              <div className="absolute -bottom-1.5 right-0 w-3 h-3 bg-orange-500 border-b border-r border-white/20 transform rotate-45" />
            </motion.div>
          </div>
        );
      })}

      {/* SOS Control Panel (Bottom) */}
      <AnimatePresence>
        {lostMember && !showRescueDetails && (
          <motion.div 
            initial={{ y: 20, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 20, opacity: 0, x: "-50%" }}
            className="absolute bottom-4 left-1/2 z-50 w-[90%] max-w-[300px]"
          >
            <div 
              onClick={() => setShowRescueDetails(true)}
              className="bg-white/90 backdrop-blur-2xl border border-slate-200 rounded-3xl p-3 shadow-[0_20px_40px_rgba(244,63,94,0.15)] flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-3 overflow-hidden pl-2">
                <div className="w-10 h-10 shrink-0 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
                  <WarningCircle className="w-6 h-6 text-rose-500" weight="fill" />
                </div>
                <div className="min-w-0">
                  <div className="text-slate-900 text-sm font-bold truncate tracking-wide">{lostMember.name} ĐANG LẠC</div>
                  <div className="text-slate-500 text-[10px] truncate uppercase tracking-widest mt-0.5">Cách bạn {lostMember.distance} • Hướng Đông Nam</div>
                </div>
              </div>
              <button 
                className="shrink-0 ml-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full p-3 shadow-[0_4px_15px_rgba(244,63,94,0.3)] pointer-events-none"
              >
                <NavigationArrow className="w-5 h-5" weight="fill" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deep Dive Rescue Action Sheet */}
      <AnimatePresence>
        {showRescueDetails && lostMember && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowRescueDetails(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            
            {/* Bottom Sheet */}
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 rounded-t-3xl p-4 z-[70] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-3 shrink-0" />
              
              <div className="flex gap-3 items-center mb-3 shrink-0">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-orange-500 overflow-hidden shadow-sm">
                    <img src={lostMember.img} alt={lostMember.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-white p-0.5 rounded-full border border-slate-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-sm" />
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-base">Giải cứu {lostMember.name}</h3>
                  <p className="text-orange-600 text-xs font-semibold">Đang thất lạc cách đây 5 phút</p>
                </div>
                <button 
                  onClick={() => setShowRescueDetails(false)}
                  className="ml-auto w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 mb-3 shrink-0">
                {/* Mini Map Visual */}
                <div className="w-full h-24 rounded-xl overflow-hidden relative border border-slate-200 shadow-inner">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop" alt="Map Location" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                  
                  {/* Fake map pin for the lost user */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-orange-500/30 rounded-full animate-ping" />
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10 relative overflow-hidden">
                        <img src={lostMember.img} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between z-20">
                    <div>
                      <div className="text-slate-900 text-xs font-bold flex items-center gap-1 bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full shadow-sm">
                        <MapPin className="text-orange-500 w-3 h-3" weight="fill" />
                        Ngã tư Sở, Hà Nội
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider mb-0.5">Pin</div>
                    <div className="text-red-500 text-xs font-bold flex items-center gap-1">
                      12% (Sắp sập)
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider mb-0.5">Mạng</div>
                    <div className="text-amber-500 text-xs font-bold">Yếu (1 vạch)</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-auto shrink-0 pb-2">
                <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-sm font-bold transition-colors border border-slate-200 shadow-sm">
                  Gọi Điện
                </button>
                <button className="flex-[2] bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(244,63,94,0.3)]">
                  <NavigationArrow className="w-4 h-4" weight="bold" />
                  Chỉ đường Google Maps
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
