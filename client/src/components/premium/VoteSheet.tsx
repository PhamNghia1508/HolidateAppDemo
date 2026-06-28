import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, Question, X } from "@phosphor-icons/react";
import confetti from "canvas-confetti";
import { getPlanById } from "@/data/mockData";

const BLUE = "#F13158";
const T2 = "#475569";
const T3 = "#94A3B8";
const WARN = "#F59E0B";

const getMembersByGroup = (group: string) => {
  if (group === "couple") {
    return [
      { name: "Nghĩa", initial: "N", status: "Đợi", state: "pending" as const, color: T3 },
      { name: "Linh", initial: "L", status: "Đợi", state: "pending" as const, color: T3 },
    ];
  }
  if (group === "family") {
    return [
      { name: "Ba Nghĩa", initial: "B", status: "Đợi", state: "pending" as const, color: T3 },
      { name: "Mẹ Linh", initial: "M", status: "Đợi", state: "pending" as const, color: T3 },
    ];
  }
  if (group === "company") {
    return [
      { name: "Trưởng nhóm", initial: "T", status: "Đợi", state: "pending" as const, color: T3 },
      { name: "HR", initial: "H", status: "Đợi", state: "pending" as const, color: T3 },
      { name: "Kế toán", initial: "K", status: "Đợi", state: "pending" as const, color: T3 },
      { name: "Dev Team", initial: "D", status: "Đợi", state: "pending" as const, color: T3 },
    ];
  }
  return [
    { name: "Nghĩa", initial: "N", status: "Đợi", state: "pending" as const, color: T3 },
    { name: "Linh", initial: "L", status: "Đợi", state: "pending" as const, color: T3 },
    { name: "Minh", initial: "M", status: "Đợi", state: "pending" as const, color: T3 },
    { name: "An", initial: "A", status: "Đợi", state: "pending" as const, color: T3 },
  ];
};

const choices = [
  { label: "Đồng ý", icon: CheckCircle, variant: "blue" as const },
  { label: "Có thể", icon: Question, variant: "neutral" as const },
  { label: "Đổi giờ", icon: Clock, variant: "amber" as const },
];

function HeartBurst({ burstKey }: { burstKey: number }) {
  const HEARTS = ["❤️", "💙", "💛", "💚", "💜", "🧡", "❤️", "💙"];
  return (
    <>
      {HEARTS.map((heart, i) => {
        const angle = (i * (360 / HEARTS.length) - 90) * Math.PI / 180;
        const dist = 55 + Math.random() * 20;
        return (
          <motion.div key={`${burstKey}-h-${i}`}
            className="absolute pointer-events-none text-base"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 60 }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist - 10, scale: [0, 1.5, 1, 0], opacity: [1, 1, 0.8, 0] }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >{heart}</motion.div>
        );
      })}
    </>
  );
}

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 400, damping: 30 });

export function VoteSheet({ onClose, planId, groupParam, onComplete }: { onClose: () => void, planId: number, groupParam: string, onComplete: () => void }) {
  const [showActivity, setShowActivity] = useState(false);
  const [heartBurstKey, setHeartBurstKey] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const [members, setMembers] = useState(() => getMembersByGroup(groupParam));
  const [activityFeed, setActivityFeed] = useState<any[]>([]);
  
  const totalVotes = members.length;
  const initialVotes = members.filter(m => m.status === "Đồng ý").length;

  const [voteCount, setVoteCount] = useState(initialVotes);
  const [myChoice, setMyChoice] = useState<string | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  const planObj = getPlanById(groupParam, planId);
  const plan = planObj ? {
    title: planObj.title,
    meta: `Thứ bảy, ${planObj.time} · ${planObj.stops}`,
    img: planObj.img
  } : {
    title: "Kế hoạch",
    meta: "Đang tải...",
    img: ""
  };

  const [justTapped, setJustTapped] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowActivity(true), 500);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    
    const simulateVote = (delay: number, memberName: string, initial: string, choice: string) => {
      timeouts.push(setTimeout(() => {
        const isAgree = choice === "Đồng ý";
        const badgeColor = isAgree ? BLUE : (choice === "Có thể" ? WARN : T2);
        const stateVal = isAgree ? "active" : (choice === "Có thể" ? "maybe" : "pending");
        
        setMembers(prev => prev.map(m => 
          m.name === memberName ? { ...m, status: choice, state: stateVal as any, color: badgeColor } : m
        ));

        setActivityFeed(prev => [
          {
            name: memberName, action: `vừa chọn ${choice.toLowerCase()}`, badge: choice,
            badgeColor: badgeColor, time: "Vừa xong", initial, color: badgeColor, icon: isAgree ? CheckCircle : (choice === "Có thể" ? Question : Clock),
          },
          ...prev
        ]);

        if (isAgree) {
          setVoteCount(prev => Math.min(totalVotes, prev + 1));
        }
      }, delay));
    };

    if (groupParam === "couple") {
      simulateVote(3000, "Linh", "L", "Đồng ý");
    } else if (groupParam === "family") {
      simulateVote(2500, "Mẹ Linh", "M", "Đồng ý");
    } else {
      simulateVote(2000, "Linh", "L", "Đồng ý");
      simulateVote(4500, "Minh", "M", "Có thể");
    }

    return () => {
      clearTimeout(t);
      timeouts.forEach(clearTimeout);
    };
  }, [groupParam]);

  useEffect(() => {
    if (voteCount >= totalVotes && !confettiTrigger) {
      setConfettiTrigger(true);
      setTimeout(() => { 
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 10000, gravity: 0.8 };
        const interval: any = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 60 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: 0.5, y: 0.6 } });
        }, 250);
      }, 400);
      
      // Auto complete after 3 seconds
      setTimeout(() => {
        onComplete();
      }, 3500);
    }
  }, [voteCount, totalVotes, confettiTrigger, onComplete]);

  const handleVote = (choice: string) => {
    if (myChoice) return;

    setJustTapped(choice);
    setTimeout(() => setJustTapped(null), 500);
    setMyChoice(choice);
    
    const isAgree = choice === "Đồng ý";
    const statusText = choice;
    const badgeColor = isAgree ? BLUE : (choice === "Có thể" ? WARN : T2);
    const stateVal = isAgree ? "active" : (choice === "Có thể" ? "maybe" : "pending");
    
    const myName = groupParam === "family" ? "Ba Nghĩa" : "Nghĩa";
    const myInitial = groupParam === "family" ? "B" : "N";

    setMembers(prev => prev.map(m => 
      m.name === myName ? { ...m, status: statusText, state: stateVal as any, color: badgeColor } : m
    ));

    setActivityFeed(prev => [
      {
        name: myName, action: `vừa chọn ${choice.toLowerCase()}`, badge: choice,
        badgeColor: badgeColor, time: "Vừa xong", initial: myInitial, color: badgeColor, icon: isAgree ? CheckCircle : Clock,
      },
      ...prev
    ]);

    if (isAgree) {
      setVoteCount(totalVotes); // Shortcut for prototype: auto-complete when user agrees
      setHeartBurstKey(k => k + 1);
      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 900);
    } else {
      setTimeout(() => {
        setVoteCount(totalVotes); // Still auto-complete for other choices after a short delay
      }, 1000);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>
        
        <div className="px-6 pb-4 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl text-slate-900 leading-tight">Biểu quyết</h2>
            <p className="text-sm font-serif italic text-slate-500">{plan.title}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
            <X weight="bold" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-12 no-scrollbar">
          {/* Progress */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(1)}
            className="mb-8">
            <div className="flex items-end justify-between mb-2">
              <p className="font-serif text-2xl text-slate-900 leading-none">{voteCount}/{totalVotes}</p>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {voteCount === totalVotes ? "Hoàn thành" : "Đang chờ"}
              </span>
            </div>
            <div className="h-[2px] bg-slate-100 mb-4 flex relative">
              <motion.div initial={{ flex: 0 }} animate={{ flex: voteCount === totalVotes ? totalVotes : initialVotes }}
                transition={{ duration: 0.9, delay: 0.3, type: "spring", stiffness: 60 }}
                className="h-full bg-slate-900" />
              {voteCount < totalVotes && (
                <motion.div initial={{ flex: 0 }} animate={{ flex: 1 }}
                  transition={{ duration: 0.9, delay: 0.45, type: "spring", stiffness: 60 }}
                  className="h-full bg-slate-400" />
              )}
            </div>
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-none bg-slate-900" />{voteCount} Đồng Ý</span>
              {groupParam !== "couple" && <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-none bg-slate-400" />1 Có Thể</span>}
              {voteCount < totalVotes && <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-none bg-slate-200" />1 Chưa Vote</span>}
            </div>
          </motion.div>

          {/* Live activity feed */}
          <AnimatePresence>
            {showActivity && activityFeed.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }} className="mb-8 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Hoạt Động</p>
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-[10px] font-bold tracking-widest text-rose-500">LIVE</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {activityFeed.slice(0, 3).map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, type: "spring", stiffness: 400, damping: 28 }}
                      className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center font-serif text-sm text-slate-900 bg-white border border-slate-200 rounded-full">
                        {item.initial}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700">
                          <span className="font-bold text-slate-900 mr-1">{item.name}</span>
                          {item.action}
                        </p>
                      </div>
                      <item.icon weight="fill" className="w-4 h-4" style={{ color: item.badgeColor }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Members */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(2)}
            className="mb-8">
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {members.map((m, i) => (
                <motion.div key={m.name}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05, type: "spring" }}
                  className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center font-serif text-xl text-slate-900 mb-2 relative">
                    {m.initial}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center" style={{ backgroundColor: m.color === T3 ? "#CBD5E1" : m.color }}>
                      {m.status === "Đồng ý" && <CheckCircle weight="fill" className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{m.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vote choices */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={S(3)}>
            <div className="flex flex-col gap-3">
              {choices.map((choice) => {
                const isSelected = myChoice === choice.label;
                const isJustTapped = justTapped === choice.label;
                return (
                  <motion.button key={choice.label}
                    whileTap={{ scale: 0.98 }}
                    animate={isJustTapped ? { scale: [0.98, 1.02, 1] } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    onClick={() => handleVote(choice.label)}
                    className={`w-full flex items-center justify-between px-6 py-4 border rounded-xl transition-colors relative overflow-hidden ${
                      isSelected ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}>
                    <span className={`font-serif text-xl ${isSelected ? 'text-white' : 'text-slate-900'}`}>{choice.label}</span>
                    <choice.icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-400'}`} weight={isSelected ? "fill" : "light"} />
                    <AnimatePresence>
                      {showHearts && choice.label === "Đồng ý" && <HeartBurst burstKey={heartBurstKey} />}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
