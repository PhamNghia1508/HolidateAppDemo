import { useLocation } from "wouter";
import { Home, Calendar, Heart, PawPrint } from "lucide-react";
import { motion } from "framer-motion";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-card/90 backdrop-blur-xl border-t border-border/40 rounded-t-[24px] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] px-2 py-2 pb-6 max-w-md mx-auto">
      {tabs.map((tab) => {
        const isActive = location === tab.path;
        const Icon = tab.icon === VoteIcon ? VoteIcon : tab.icon;
        return (
          <motion.button
            key={tab.path}
            onClick={() => setLocation(tab.path)}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-0.5 min-w-[60px] py-1 relative"
            data-testid={`nav-${tab.path.slice(1)}`}
          >
            <motion.div
              animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`${isActive ? "text-sage" : "text-muted-foreground"}`}
            >
              <Icon className="w-6 h-6" />
            </motion.div>
            <motion.span
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
              className={`text-[11px] font-medium ${isActive ? "text-sage" : "text-muted-foreground"}`}
            >
              {tab.label}
            </motion.span>
            {isActive && (
              <motion.span
                layoutId="nav-dot"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sage"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
