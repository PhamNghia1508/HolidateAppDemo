import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Sparkle } from "@phosphor-icons/react";

const springConfig = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8
};

export function DynamicIsland() {
  const { toasts, dismiss } = useToast();
  const [activeToast, setActiveToast] = useState<any>(null);

  useEffect(() => {
    const currentToast = toasts[0];
    if (currentToast && currentToast.open !== false) {
      setActiveToast(currentToast);
      // Auto dismiss after 3 seconds
      const timer = setTimeout(() => {
        dismiss(currentToast.id);
        setActiveToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setActiveToast(null);
    }
  }, [toasts, dismiss]);

  const hasToast = !!activeToast;

  return (
    <div className="absolute top-[14px] left-[50%] -translate-x-1/2 z-[9999] flex justify-center pointer-events-none">
      <motion.div
        layout
        initial={{ width: 122, height: 35, borderRadius: 22 }}
        animate={{
          width: hasToast ? 340 : 122,
          height: hasToast ? 75 : 35,
          borderRadius: hasToast ? 32 : 22,
          x: hasToast ? [-3, 3, -2, 2, 0] : 0,
          boxShadow: hasToast 
            ? "0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.1)" 
            : "0 0 0 rgba(0,0,0,0), inset 0 1px 2px rgba(255,255,255,0.04), 0 0 0 rgba(255,255,255,0)",
        }}
        transition={{
          ...springConfig,
          x: { duration: 0.4, ease: "easeInOut" },
          boxShadow: { duration: 0.5 }
        }}
        className="bg-[#080402] overflow-hidden flex items-center px-4 relative pointer-events-auto"
        onClick={() => hasToast && dismiss(activeToast.id)}
      >
        <AnimatePresence mode="wait">
          {hasToast && (
            <motion.div
              key={activeToast.id}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              transition={{ delay: 0.15, ...springConfig }}
              className="flex items-center gap-3 w-full"
            >
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                <Sparkle weight="fill" className="text-wi-primary w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-white mb-0.5 truncate tracking-wide">{activeToast.title}</h4>
                {activeToast.description && (
                  <p className="text-[11px] font-medium text-white/60 truncate font-serif italic">{activeToast.description}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
