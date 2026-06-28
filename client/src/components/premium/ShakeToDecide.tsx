import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MagicWand, Play } from "@phosphor-icons/react";
import Confetti from "react-confetti";

const DESTINATIONS = [
  "Lẩu Haidilao",
  "Nướng GoGi",
  "Ốc Đào",
  "Skyline Coffee",
  "Pizza 4P's",
  "Sushi Hokkaido",
  "Bún đậu mắm tôm",
  "Cơm tấm sườn bì",
  "Dimsum Baoz",
  "Gà rán Texas",
];

export function ShakeToDecide({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setResult(null);
      setIsSpinning(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpinning) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % DESTINATIONS.length);
      }, 80); // Fast spinning

      // Stop spinning after 3 seconds
      setTimeout(() => {
        clearInterval(interval);
        setIsSpinning(false);
        setResult(DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)]);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isSpinning]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={!isSpinning ? onClose : undefined} />
          
          {result && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={200} gravity={0.15} colors={['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899']} />}

          <motion.div 
            className="relative w-full max-w-sm bg-white border-2 border-slate-900 p-8 shadow-[12px_12px_0px_rgba(15,23,42,0.1)] flex flex-col items-center text-center"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Close button */}
            {!isSpinning && (
              <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900">
                <X className="w-6 h-6" weight="bold" />
              </button>
            )}

            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mb-4 shadow-inner">
              <MagicWand className="w-8 h-8" weight="fill" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">Lắc Máy Chốt Kèo</h2>
            <p className="text-slate-500 text-sm font-serif italic mb-8">Không biết đi đâu? Để Mimi quyết định hộ nhóm bạn nhé!</p>

            {/* The Slot Machine Viewport */}
            <div className="w-full h-24 bg-slate-50 border-y-2 border-slate-900 relative overflow-hidden flex items-center justify-center mb-8">
               <div className="absolute left-0 right-0 h-4 bg-gradient-to-b from-slate-900/10 to-transparent top-0 z-10" />
               <div className="absolute left-0 right-0 h-4 bg-gradient-to-t from-slate-900/10 to-transparent bottom-0 z-10" />
               
               {/* Arrow indicators */}
               <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"><Play className="w-4 h-4" weight="fill" /></div>
               <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 rotate-180"><Play className="w-4 h-4" weight="fill" /></div>

               <AnimatePresence mode="popLayout">
                 <motion.div
                   key={result || (isSpinning ? currentIndex : 'idle')}
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: -50, opacity: 0 }}
                   transition={{ duration: isSpinning ? 0.08 : 0.4, ease: "linear" }}
                   className="absolute w-full text-center px-12"
                 >
                   <span className={`font-serif text-2xl font-bold ${result ? 'text-indigo-600' : 'text-slate-900'}`}>
                     {result ? result : (isSpinning ? DESTINATIONS[currentIndex] : "???")}
                   </span>
                 </motion.div>
               </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsSpinning(true)}
              disabled={isSpinning}
              className={`w-full py-4 px-6 border-2 border-slate-900 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${isSpinning ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 text-white hover:bg-white hover:text-slate-900'}`}
            >
              {isSpinning ? "Đang Lắc..." : result ? "Lắc Lại Nào!" : "Lắc Ngay"}
            </button>
            
            {result && (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-3 py-4 px-6 border-2 border-indigo-600 bg-indigo-50 font-bold uppercase tracking-widest text-sm text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
              >
                Chốt Đơn Chỗ Này!
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
