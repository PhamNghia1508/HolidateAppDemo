import { useLocation } from "wouter";
import { House, CalendarBlank, CheckSquareOffset, Heart, PawPrint } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { path: "/home", label: "Home", icon: House, badge: 0 },
  { path: "/plan", label: "Plan", icon: CalendarBlank, badge: 0 },
  { path: "/memories", label: "Memories", icon: Heart, badge: 0 },
  { path: "/pet", label: "Pet", icon: PawPrint, badge: 0 },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ type: "spring", stiffness: 400, damping: 35, delay: 0.15 }}
      className="fixed bottom-6 left-1/2 w-[calc(100%-2rem)] max-w-[400px] z-[999]"
    >
      <div className="bg-white/90 backdrop-blur-2xl border border-white/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] rounded-[2rem] px-2 py-2 flex items-center justify-between relative overflow-hidden">
        {tabs.map((tab) => {
          const isActive = location === tab.path;
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              aria-label={tab.label}
              onClick={() => setLocation(tab.path)}
              className="relative flex items-center justify-center h-12 outline-none focus:outline-none"
              style={{ flex: isActive ? 2 : 1 }}
              data-testid={`nav-${tab.path.slice(1)}`}
            >
              {/* Active Pill Background */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-slate-900 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative z-10 flex items-center gap-2 px-3">
                <div className="relative flex items-center justify-center">
                  <Icon 
                    className={`w-[22px] h-[22px] transition-colors duration-300 ${isActive ? "text-white" : "text-slate-400"}`} 
                    weight={isActive ? "fill" : "bold"} 
                  />
                  {tab.badge > 0 && (
                    <div className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full flex items-center justify-center bg-rose-500 border-2 border-white shadow-sm">
                      <span className="text-[9px] font-bold text-white leading-none">{tab.badge}</span>
                    </div>
                  )}
                </div>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-bold text-white tracking-wide whitespace-nowrap overflow-hidden"
                    >
                      {tab.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
