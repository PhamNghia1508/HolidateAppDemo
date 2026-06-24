import { useLocation } from "wouter";
import { Home, Calendar, Heart, PawPrint } from "lucide-react";

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-card/90 backdrop-blur-md border-t border-border rounded-t-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-2 py-2 pb-6 max-w-md mx-auto">
      {tabs.map((tab) => {
        const isActive = location === tab.path;
        const Icon = tab.icon === VoteIcon ? VoteIcon : tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => setLocation(tab.path)}
            className="flex flex-col items-center gap-0.5 min-w-[60px] py-1 relative"
            data-testid={`nav-${tab.path.slice(1)}`}
          >
            <div className={`${isActive ? "text-sage" : "text-muted-foreground"} transition-colors`}>
              <Icon className="w-6 h-6" />
            </div>
            <span className={`text-[11px] font-medium ${isActive ? "text-sage" : "text-muted-foreground"}`}>
              {tab.label}
            </span>
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sage" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
