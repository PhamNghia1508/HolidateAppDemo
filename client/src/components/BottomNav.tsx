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
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 pb-6 max-w-md mx-auto"
      style={{
        background: "rgba(255, 248, 239, 0.75)",
        backdropFilter: "blur(24px) saturate(150%)",
        WebkitBackdropFilter: "blur(24px) saturate(150%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.06), 0 -2px 8px rgba(0,0,0,0.02)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = location === tab.path;
        const Icon = tab.icon === VoteIcon ? VoteIcon : tab.icon;
        return (
          <motion.button
            key={tab.path}
            onClick={() => setLocation(tab.path)}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-0.5 min-w-[56px] py-1 relative"
            data-testid={`nav-${tab.path.slice(1)}`}
          >
            <motion.div
              animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`${isActive ? "text-[#4a7c59]" : "text-[#7B6658]"}`}
            >
              <Icon className="w-5 h-5" />
            </motion.div>
            <motion.span
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
              className={`text-[10px] font-medium ${isActive ? "text-[#4a7c59] font-semibold" : "text-[#7B6658]"}`}
            >
              {tab.label}
            </motion.span>
            {isActive && (
              <motion.span
                layoutId="nav-dot"
                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4a7c59]"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
