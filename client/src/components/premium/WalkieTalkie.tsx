import { motion, AnimatePresence } from "framer-motion";
import { Microphone, MicrophoneSlash } from "@phosphor-icons/react";
import { useState, useRef, useEffect } from "react";

export function WalkieTalkie() {
  const [isHolding, setIsHolding] = useState(false);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setIsHolding(true);
  };

  const handleEnd = () => {
    setIsHolding(false);
  };

  // Allow multi-touch start/end
  useEffect(() => {
    const disableSelect = (e: Event) => e.preventDefault();
    if (isHolding) {
      document.addEventListener('contextmenu', disableSelect);
    }
    return () => {
      document.removeEventListener('contextmenu', disableSelect);
    };
  }, [isHolding]);

  return (
    <>
      <div 
        className="fixed bottom-28 right-4 z-[900] flex flex-col items-center gap-2"
      >
        <AnimatePresence>
          {isHolding && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/20 shadow-xl"
            >
              <div className="flex gap-1 items-end h-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity, 
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                    className="w-1 bg-green-500 rounded-full"
                  />
                ))}
              </div>
              <span className="text-white text-xs font-bold tracking-wide">Đang phát cho Nhóm...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          animate={isHolding ? { scale: 1.2 } : { scale: 1 }}
          whileHover={!isHolding ? { scale: 1.05 } : {}}
          className={`w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center transition-colors duration-300 relative ${isHolding ? "bg-rose-500" : "bg-white border border-slate-200"}`}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          {isHolding && (
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-rose-500 rounded-full z-0"
            />
          )}
          
          <div className="relative z-10">
            {isHolding ? (
              <Microphone className="w-8 h-8 text-white" weight="fill" />
            ) : (
              <Microphone className="w-8 h-8 text-slate-700" weight="bold" />
            )}
          </div>
        </motion.button>
      </div>
    </>
  );
}
