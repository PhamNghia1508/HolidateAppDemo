import { motion, AnimatePresence } from "framer-motion";
import { WarningCircle, PhoneCall, MapPin, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function SOSAlert({ onClose, targetName }: { onClose: () => void, targetName: string }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="alert"
        aria-live="assertive"
        className="fixed inset-0 z-[2000] bg-red-950/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ opacity: pulse ? 0.4 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-red-600 mix-blend-overlay"
          />
        </div>

        <div className="relative z-10 flex justify-end">
          <button 
            onClick={onClose} 
            aria-label="Close SOS Alert"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-red-950"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center">
          <motion.div 
            animate={{ scale: pulse ? 1.15 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(239,68,68,0.8)] mb-10"
          >
            <WarningCircle className="w-16 h-16 text-white" weight="fill" />
          </motion.div>
          
          <h1 className="text-4xl font-black text-white tracking-widest uppercase mb-3 drop-shadow-md">SOS ALERT</h1>
          <p className="text-red-100 text-lg mb-10 max-w-[280px]">
            <strong className="text-white font-bold">{targetName}</strong> vừa kích hoạt chế độ Khẩn Cấp!
          </p>

          <div className="bg-black/50 backdrop-blur-md border border-red-500/40 p-6 rounded-[2rem] w-full max-w-sm mb-12 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-red-400" weight="fill" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase text-red-400 tracking-widest mb-0.5">Vị trí hiện tại</p>
                  <p className="text-white font-medium text-sm">Cách bạn 3.2km</p>
                </div>
              </div>
            </div>
            
            <div 
              className="h-28 bg-slate-900 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center mb-5"
              aria-label="Map showing SOS location"
              role="img"
            >
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop')] bg-cover bg-center" />
              <div className="relative z-10">
                <div className="w-4 h-4 bg-red-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-[0_8px_30px_rgba(239,68,68,0.5)] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900">
              <MapPin className="w-5 h-5" weight="bold" />
              Chỉ đường ngay
            </button>
          </div>
          
          <div className="w-full flex gap-4 max-w-sm">
            <button className="flex-1 py-4 bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/50">
              <PhoneCall className="w-5 h-5" weight="fill" />
              Gọi điện
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
