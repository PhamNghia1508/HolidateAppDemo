import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, CarProfile, Sparkle, HandHeart } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export function TripWrapped({ onClose, groupParam }: { onClose: () => void, groupParam: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Hành trình khép lại",
      subtitle: "Hôm nay, nhóm mình đã đi được...",
      value: "54.2 km",
      icon: <CarProfile className="w-16 h-16 text-white mb-4" weight="fill" />,
      color: "from-blue-600 to-indigo-800"
    },
    {
      title: "Kỷ niệm khó quên",
      subtitle: "Mọi người đã cùng nhau thả...",
      value: "12 Geo-Pins",
      icon: <Sparkle className="w-16 h-16 text-white mb-4" weight="fill" />,
      color: "from-purple-600 to-pink-700"
    },
    {
      title: groupParam === "family" ? "Chi phí hôm nay" : "Quỹ Nhóm",
      subtitle: groupParam === "couple" ? "Bạn đã chi..." : "Và đặc biệt, Minh nợ bạn...",
      value: groupParam === "couple" ? "800,000đ" : "150,000đ",
      icon: <HandHeart className="w-16 h-16 text-white mb-4" weight="fill" />,
      color: "from-emerald-600 to-teal-800"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSlide < slides.length - 1) {
        setCurrentSlide(s => s + 1);
      } else {
        // Auto close after last slide
        const closeTimer = setTimeout(onClose, 4000);
        return () => clearTimeout(closeTimer);
      }
    }, 4000); // 4 seconds per slide
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length, onClose]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        className="fixed inset-0 z-[3000] bg-slate-950 flex flex-col"
      >
        {/* Dynamic Sophisticated Background */}
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0.8, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color}`}
        />

        {/* Story Progress Bars */}
        <div className="relative z-10 flex gap-2 p-5 pt-12" role="progressbar" aria-valuenow={currentSlide + 1} aria-valuemin={1} aria-valuemax={slides.length}>
          {slides.map((_, i) => (
            <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                initial={{ width: i < currentSlide ? "100%" : "0%" }}
                animate={{ width: i === currentSlide ? "100%" : i < currentSlide ? "100%" : "0%" }}
                transition={{ duration: i === currentSlide ? 4 : 0, ease: "linear" }}
                className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <div className="relative z-10 flex justify-end px-5">
          <button 
            onClick={onClose} 
            aria-label="Skip summary and end trip"
            className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-black/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <X className="w-5 h-5" weight="bold" />
          </button>
        </div>

        {/* Content */}
        <button 
          className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center w-full focus:outline-none"
          onClick={() => {
            if (currentSlide < slides.length - 1) setCurrentSlide(s => s + 1);
            else onClose();
          }}
          aria-label={currentSlide < slides.length - 1 ? "Next slide" : "End summary"}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center w-full max-w-sm"
            >
              <div className="w-24 h-24 mb-8 flex items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                {slides[currentSlide].icon}
              </div>
              <h2 className="text-white/80 font-bold text-xs mb-3 uppercase tracking-[0.2em]">{slides[currentSlide].title}</h2>
              <p className="text-white text-3xl font-serif mb-8 leading-tight drop-shadow-md">{slides[currentSlide].subtitle}</p>
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-black text-4xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] tracking-tight"
              >
                {slides[currentSlide].value}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Bottom Call to Action */}
        <div className="relative z-10 p-8 flex justify-center pb-safe">
          <AnimatePresence>
            {currentSlide === slides.length - 1 && (
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="bg-slate-900 text-white border border-slate-700 px-10 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-2xl hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 w-full max-w-xs justify-center"
              >
                <CheckCircle className="w-6 h-6 text-emerald-400" weight="fill" />
                <span className="uppercase tracking-widest text-sm">Kết thúc hành trình</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
