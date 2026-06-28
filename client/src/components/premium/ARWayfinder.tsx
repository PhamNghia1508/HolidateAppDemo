import { motion } from "framer-motion";
import { X, NavigationArrow, Camera } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function ARWayfinder({ onClose, targetName, distance }: { onClose: () => void; targetName: string; distance: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col"
    >
      {/* Fake Camera Feed Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&auto=format&fit=crop" 
          alt="AR Camera View" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* AR UI Elements */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="pt-safe px-4 py-4 flex justify-between items-center mt-2">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">AR MODE ACTIVE</span>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center AR Arrow & Distance */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateX: [0, 10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-rose-500/20 rounded-full blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <NavigationArrow className="w-24 h-24 text-rose-500 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]" weight="fill" />
            
            <div className="mt-8 bg-black/60 backdrop-blur-xl border border-rose-500/50 p-4 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col items-center min-w-[200px]">
              <div className="w-16 h-16 rounded-full border-2 border-rose-500 overflow-hidden -mt-12 shadow-[0_0_20px_rgba(244,63,94,0.5)] bg-white">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop" alt="Target" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-white font-bold text-lg mt-2">{targetName}</h2>
              <p className="text-rose-400 text-sm font-medium uppercase tracking-widest mt-1">{distance} PHÍA TRƯỚC</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Instructions */}
        <div className="pb-safe px-6 pb-10 text-center">
          <p className="text-white/80 text-sm font-medium animate-pulse">Giữ điện thoại hướng lên để định vị...</p>
        </div>
      </div>
      
      {/* Scanner overlay effect */}
      <motion.div 
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none z-20"
      />
    </motion.div>
  );
}
