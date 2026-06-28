import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Heart } from "@phosphor-icons/react";
import { useState } from "react";

export function GeoMemoryDrop({ onClose }: { onClose: () => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, scale: 0.9, rotate: -5 }}
          animate={{ y: 0, scale: 1, rotate: 0 }}
          exit={{ y: 50, scale: 0.9, rotate: 5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-sm relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Polaroid Photo */}
          <div className="relative rounded-lg overflow-hidden aspect-[4/5] bg-slate-100 shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&auto=format&fit=crop" 
              alt="Memory" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 text-white text-xs font-bold">
              <MapPin weight="fill" className="w-3.5 h-3.5 text-rose-400" />
              Ngã tư Sở, Hà Nội
            </div>
          </div>

          {/* Polaroid Text & Actions */}
          <div className="mt-4 px-2 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-[Shadows_Into_Light,cursive] text-2xl text-slate-800 leading-tight">
                  Trà đá vỉa hè chém gió tung nóc nhà! ✌️
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop" className="w-6 h-6 rounded-full" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Minh thả • 10:30 Sáng</span>
                </div>
              </div>
              
              <button 
                onClick={() => setLiked(!liked)}
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 shadow-sm"
              >
                <Heart weight={liked ? "fill" : "bold"} className={`w-5 h-5 transition-colors ${liked ? "text-rose-500" : "text-slate-400"}`} />
              </button>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="absolute -top-4 -right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" weight="bold" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
