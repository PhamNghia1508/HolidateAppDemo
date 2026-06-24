import { useLocation } from "wouter";
import { Home, Calendar, Heart, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

/* ============================================================
   BOTTOM NAV — Premium Dark Glass Dock
   Obsidian + Electric Mint, compact, tech-unicorn 2026
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
      transition={{ type: "spring", stiffness: 400, damping: 35, delay: 0.2 }}
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center justify-around px-1.5 py-1.5 max-w-[360px] w-[92%]"
      style={{
        background: "rgba(18, 18, 20, 0.72)",
        backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "20px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = location === tab.path;
        const Icon = tab.icon === VoteIcon ? VoteIcon : tab.icon;
        return (
          <motion.button
            key={tab.path}
            onClick={() => setLocation(tab.path)}
            whileTap={{ scale: 0.88 }}
            className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 relative focus:outline-none rounded-xl"
            data-testid={`nav-${tab.path.slice(1)}`}
          >
            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "#00E5A8" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            <motion.div
              animate={isActive ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative z-10"
              style={{ color: isActive ? "#00E5A8" : "#52525B" }}
            >
              <Icon className="w-5 h-5" />
            </motion.div>

            <motion.span
              animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
              className="relative z-10 text-[9px] font-medium tracking-wide"
              style={{ color: isActive ? "#00E5A8" : "#52525B" }}
            >
              {tab.label}
            </motion.span>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
