import { useLocation } from "wouter";
import { Home, Calendar, Heart, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

function VoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const tabs = [
  { path: "/home", label: "Trang chủ", icon: Home, badge: 0 },
  { path: "/plan", label: "Plan", icon: Calendar, badge: 0 },
  { path: "/vote", label: "Vote", icon: VoteIcon, badge: 1 },
  { path: "/memories", label: "Kỷ niệm", icon: Heart, badge: 0 },
  { path: "/pet", label: "Pet", icon: PawPrint, badge: 0 },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 35, delay: 0.15 }}
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 -1px 0 rgba(0,0,0,0.05), 0 -8px 24px rgba(0,0,0,0.04)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-stretch justify-around max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = location === tab.path;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.path}
              onClick={() => setLocation(tab.path)}
              whileTap={{ scale: 0.86 }}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 py-3 relative focus:outline-none"
              data-testid={`nav-${tab.path.slice(1)}`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full"
                  style={{ background: "#C8371E" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative">
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{ color: isActive ? "#C8371E" : "#9C8470" }}
                >
                  <Icon className="w-[22px] h-[22px]" />
                </motion.div>
                {tab.badge > 0 && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: "#EF4444", border: "1.5px solid white" }}
                  >
                    <span className="text-[8px] font-black text-white leading-none">{tab.badge}</span>
                  </motion.div>
                )}
              </div>
              <motion.span
                animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
                className="text-[9.5px] font-semibold tracking-wide leading-none"
                style={{ color: isActive ? "#C8371E" : "#9C8470" }}
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
