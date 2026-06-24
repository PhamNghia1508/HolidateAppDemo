import { useLocation } from "wouter";
import { Home, Calendar, Heart, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

/* ============================================================
   BOTTOM NAV — Floating Spatial Island
   Glassmorphism 2.0, AI glow, spring physics, detached
   ============================================================ */

const tabs = [
  { path: "/home", label: "Trang chủ", icon: Home },
  { path: "/plan", label: "Plan", icon: Calendar },
  { path: "/vote", label: "Vote", icon: VoteIcon },
  { path: "/memories", label: "Kỷ niệm", icon: Heart },
  { path: "/pet", label: "Pet", icon: PawPrint },
];

function VoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
      <path d="M8 7l2 5-2 5" />
      <path d="M16 7l-2 5 2 5" />
    </svg>
  );
}

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.3 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center justify-around px-2 py-2 max-w-[380px] w-[90%]"
      style={{
        background: "rgba(255, 248, 239, 0.72)",
        backdropFilter: "blur(32px) saturate(160%)",
        WebkitBackdropFilter: "blur(32px) saturate(160%)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "24px",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04), 0 0 40px rgba(98,201,165,0.06)",
      }}
    >
      {/* Ambient glow behind active tab */}
      <div className="absolute inset-0 pointer-events-none rounded-[24px] overflow-hidden">
        {tabs.map((tab, i) => {
          const isActive = location === tab.path;
          if (!isActive) return null;
          return (
            <motion.div
              key={tab.path}
              layoutId="nav-glow"
              className="absolute top-1/2 -translate-y-1/2 h-[40px] rounded-full"
              style={{
                background: "radial-gradient(ellipse, rgba(98,201,165,0.2) 0%, transparent 70%)",
                filter: "blur(20px)",
                left: `${i * 20 + 5}%`,
                width: "15%",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isActive = location === tab.path;
        const Icon = tab.icon === VoteIcon ? VoteIcon : tab.icon;
        return (
          <motion.button
            key={tab.path}
            onClick={() => setLocation(tab.path)}
            whileTap={{ scale: 0.88 }}
            className="flex flex-col items-center gap-1 min-w-[60px] py-1.5 relative focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-2 focus:ring-offset-transparent rounded-xl"
            data-testid={`nav-${tab.path.slice(1)}`}
          >
            {/* Active pill background */}
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "rgba(98, 201, 165, 0.12)",
                  border: "1px solid rgba(98, 201, 165, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            <motion.div
              animate={isActive ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`relative z-10 ${isActive ? "text-emerald" : "text-clay"}`}
            >
              <Icon className="w-5 h-5" />
            </motion.div>

            <motion.span
              animate={isActive ? { opacity: 1, scale: 1.05 } : { opacity: 0.6, scale: 1 }}
              className={`relative z-10 text-[10px] font-medium ${isActive ? "text-emerald font-semibold" : "text-clay"}`}
            >
              {tab.label}
            </motion.span>

            {/* Active dot */}
            {isActive && (
              <motion.span
                layoutId="nav-dot"
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
