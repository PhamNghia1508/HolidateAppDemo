import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, PauseCircle, SkipForward, MusicNotes, Users, ThumbsUp } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export function GroupDJSheet({ onClose }: { onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [skipVotes, setSkipVotes] = useState(1);
  const totalUsers = 4;

  // Fake Equalizer bars
  const [eq, setEq] = useState([1, 2, 1, 3, 1]);
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setEq(prev => prev.map(() => Math.random() * 20 + 5));
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex justify-center items-end"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dj-sheet-title"
          className="w-full max-w-md bg-slate-900 rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden relative border-t border-slate-800"
        >
          {/* Subtle Glow instead of excessive animated gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-64 bg-pink-500/10 blur-[80px] pointer-events-none rounded-full" />

          <div className="p-6 flex flex-col items-center pb-10 relative z-10">
            <div className="w-12 h-1.5 bg-slate-700/50 rounded-full mb-8" />
            
            <div className="flex items-center gap-2 mb-10 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 shadow-sm">
              <Users className="w-4 h-4 text-pink-500" />
              <span id="dj-sheet-title" className="text-xs font-bold text-slate-200 tracking-widest uppercase">Group DJ • Bạn đang phát</span>
            </div>

            {/* Spinning Vinyl */}
            <div className="relative mb-10">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-48 h-48 rounded-full bg-slate-950 shadow-2xl flex items-center justify-center border-4 border-slate-800/80"
              >
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border border-white/5" />
                <div className="absolute inset-6 rounded-full border border-white/10" />
                <div className="absolute inset-10 rounded-full border border-white/5" />
                
                {/* Album Art */}
                <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-800 relative">
                  <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop" className="w-full h-full object-cover" alt="Starboy Album Art" />
                </div>
              </motion.div>
              
              {/* Turntable Arm */}
              <motion.div 
                animate={{ rotate: isPlaying ? 25 : 0 }}
                className="absolute -top-2 -right-2 w-12 h-32 origin-top bg-gradient-to-b from-slate-300 to-slate-400 rounded-full shadow-lg border border-slate-300"
                style={{ clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)' }}
              />
            </div>

            <div className="text-center mb-10">
              <h2 className="text-2xl font-serif font-bold text-white mb-2">Starboy</h2>
              <div className="text-slate-400 font-medium flex items-center justify-center gap-3">
                <span>The Weeknd</span>
                <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
                  {eq.map((h, i) => (
                    <motion.div key={i} animate={{ height: h }} className="w-1 bg-pink-500 rounded-t-full opacity-80" />
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-8 mb-10">
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                aria-label={isPlaying ? "Pause music" : "Play music"}
                className="text-white hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-full"
              >
                {isPlaying ? <PauseCircle weight="fill" className="w-16 h-16 text-slate-100" /> : <PlayCircle weight="fill" className="w-16 h-16 text-slate-100" />}
              </button>
            </div>

            {/* Vote Skip */}
            <div className="w-full px-4 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-3 px-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">Bình chọn qua bài</span>
                <span className="text-xs text-slate-300 font-bold bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">{skipVotes}/{totalUsers}</span>
              </div>
              <button 
                onClick={() => setSkipVotes(v => Math.min(v + 1, totalUsers))}
                aria-label={`Vote to skip track. Current votes: ${skipVotes} out of ${totalUsers}`}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${skipVotes >= totalUsers / 2 ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20 focus:ring-pink-500 hover:bg-pink-500' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 focus:ring-slate-400 border border-slate-700'}`}
              >
                <SkipForward className="w-5 h-5" weight={skipVotes >= totalUsers / 2 ? "fill" : "bold"} />
                VOTE SKIP
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
