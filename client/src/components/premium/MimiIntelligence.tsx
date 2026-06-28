import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, Microphone } from "@phosphor-icons/react";

export function MimiIntelligence() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-mimi", handleOpen);
    return () => window.removeEventListener("open-mimi", handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[99999] pointer-events-none flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Apple Intelligence Edge Glow Simulation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {/* We use a thick border-like inner shadow and multi-colored blurred shapes on the edges */}
             <div className="absolute inset-0 ring-[8px] ring-white/10 rounded-[48px] pointer-events-none" />
             
             {/* Glowing Orbs around the edges */}
             <motion.div 
               animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] opacity-70 mix-blend-screen pointer-events-none"
             >
                <div className="absolute top-0 left-0 w-1/2 h-1/4 bg-[#ff2d55] blur-[80px] rounded-full" />
                <div className="absolute top-0 right-0 w-1/2 h-1/4 bg-[#5856d6] blur-[80px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/4 bg-[#34c759] blur-[80px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/4 bg-[#ffcc00] blur-[80px] rounded-full" />
             </motion.div>
             
             {/* Inner mask to keep the center clear, only edge glows */}
             <div className="absolute inset-[6px] bg-[#080402]/95 rounded-[42px] pointer-events-none" />
          </div>
          
          {/* Backdrop for clicking outside to close */}
          <div className="absolute inset-0 pointer-events-auto" onClick={() => setIsOpen(false)} />

          {/* Chat Interface */}
          <motion.div 
             initial={{ y: 100, scale: 0.95, opacity: 0 }}
             animate={{ y: 0, scale: 1, opacity: 1 }}
             exit={{ y: 100, scale: 0.95, opacity: 0 }}
             transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
             className="relative z-10 mx-4 mb-8 bg-[#1A1A1A]/80 backdrop-blur-3xl p-2 rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 pointer-events-auto flex items-center gap-3"
          >
            {/* The Orb */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center relative overflow-hidden flex-shrink-0 ml-1">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-bl from-orange-400 via-transparent to-green-400 mix-blend-overlay opacity-80"
               />
               <Sparkle className="text-white w-5 h-5 relative z-10" weight="fill" />
            </div>
            
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hỏi Mimi để tạo plan, đặt bàn..." 
              className="flex-1 bg-transparent border-none outline-none font-serif text-white placeholder:text-white/40 placeholder:italic text-[15px]" 
              autoFocus 
            />
            
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white/80 mr-1 flex-shrink-0">
              <Microphone className="w-5 h-5" weight="fill" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
