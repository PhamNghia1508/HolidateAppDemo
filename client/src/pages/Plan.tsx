import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "@/components/BottomNav";
import { MapPin, Clock, Users, CaretRight, Plus, Lightning, Lock, PencilSimple, CheckCircle } from "@phosphor-icons/react";

const BG = "#F8F9FA";
const SURF = "#FFFFFF";
const BLUE = "#F13158";
const BLUE_BRIGHT = "#E11D48";
const T1 = "#0F172A";
const T2 = "#475569";
const T3 = "#94A3B8";
const BORDER = "rgba(15,23,42,0.1)";
const SHADOW = "none";
const WARN = "#F59E0B";
const GREEN = "#10B981";

import { RouteTrail } from "@/components/premium/RouteTrail";
import { MemberVotes } from "@/components/premium/MemberVotes";
import { SkeletonList } from "@/components/premium/SkeletonCard";
import { ShakeToDecide } from "@/components/premium/ShakeToDecide";
import { usePlans } from "@/hooks/usePlans";
import { MagicWand } from "@phosphor-icons/react";

const S = (i: number) => ({ delay: i * 0.07, type: "spring" as const, stiffness: 420, damping: 32 });

export default function Plan() {
  const [, setLocation] = useLocation();
  const { data: plans, isLoading } = usePlans();
  const [showShake, setShowShake] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto pb-24 px-6 relative">
      <ShakeToDecide isOpen={showShake} onClose={() => setShowShake(false)} />

      {/* Floating Action Button for Shake To Decide */}
      <motion.button 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowShake(true)}
        className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full shadow-[0_8px_30px_rgba(99,102,241,0.5)] flex items-center justify-center text-white z-50 border-2 border-white"
      >
        <MagicWand className="w-6 h-6" weight="fill" />
      </motion.button>

      {/* Header */}
      <div className="flex items-center justify-between pt-8 mb-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Lịch Trình</div>
          <h1 className="font-serif text-4xl text-slate-900 leading-none tracking-tight">Kế hoạch của bạn</h1>
        </div>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setLocation("/create-plan")}
          className="h-10 px-4 rounded-none font-bold text-sm flex items-center gap-1 border border-slate-900 bg-slate-900 text-white uppercase tracking-wider">
          <Plus className="w-4 h-4" weight="bold" /> Tạo mới
        </motion.button>
      </div>

      {/* Route motif decoration */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
        className="flex items-center gap-1.5 mb-5">
        {[BLUE, WARN, GREEN, T3].map((c, i) => (
          <div key={i} className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-none" style={{ background: c, opacity: i === 3 ? 0.4 : 0.7 }} />
            {i < 3 && <div className="w-6 h-px mx-0.5" style={{ background: `${c}40` }} />}
          </div>
        ))}
        <span className="text-xs font-semibold ml-1" style={{ color: T3 }}>3 lịch trình đang hoạt động</span>
      </motion.div>

      {/* Stats — minimal chips */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={S(0)}
        className="flex gap-2 mb-6">
        {[
          { value: "3", label: "Plan", color: BLUE, bg: "rgba(241,49,88,0.08)" },
          { value: "1", label: "Đang vote", color: WARN, bg: "rgba(245,158,11,0.08)" },
          { value: "1", label: "Đã chốt", color: GREEN, bg: "rgba(16,185,129,0.08)" },
        ].map((s, i) => (
          <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-slate-200"
            style={{ background: "#FFFFFF" }}>
            <span className="font-serif text-lg leading-none" style={{ color: s.color }}>{s.value}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Plan list */}
      {isLoading ? (
        <div className="mt-4 mb-6">
          <SkeletonList count={3} />
        </div>
      ) : (
        <div className="space-y-3">
          {plans?.map((plan, i) => {
            const isVoting = plan.status === "voting";
            const isLocked = plan.status === "locked";
            const isDraft = plan.status === "draft";
            const mappedGroup = plan.group === "Người yêu" || plan.group === "Couple" ? "couple" : plan.group === "Gia đình" ? "family" : plan.group === "Công ty" ? "company" : "friends";

          return (
            <motion.div key={plan.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={S(i + 2)}>

              {/* ── VOTING CARD ── cinematic, urgent, live */}
              {isVoting && (
                <motion.button whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation(`/plan-detail?group=${mappedGroup}&planId=${plan.id}`)}
                  className="w-full text-left rounded-none overflow-hidden focus:outline-none mb-4 shadow-sm"
                  style={{
                    border: "1px solid #E2E8F0",
                    background: "#FFFFFF"
                  }}>
                  {/* Photo hero */}
                  {plan.img && (
                    <div className="relative h-[160px] w-full overflow-hidden">
                      <img src={plan.img} alt={plan.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                      {/* LIVE badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-3 py-1.5 rounded-none">
                        <motion.div animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-none bg-slate-900" />
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-900">LIVE VOTE</span>
                      </div>
                      {/* Progress in hero */}
                      <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-none shadow-sm">
                          <span className="font-serif text-xl text-slate-900 leading-none">
                            {plan.votedCount}<span className="text-sm text-slate-500">/{plan.totalCount}</span>
                          </span>
                      </div>
                    </div>
                  )}
                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-2xl text-slate-900 leading-tight">{plan.title}</h3>
                      <CaretRight className="w-5 h-5 mt-1 flex-shrink-0 text-slate-400" weight="light" />
                    </div>
                    {/* Route trail */}
                    <div className="mb-4">
                      <RouteTrail stops={plan.stops} color={BLUE} />
                    </div>
                    {/* Meta row */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" weight="fill" />{plan.time}</div>
                        <span>{plan.cost}</span>
                      </div>
                      <MemberVotes members={plan.members} votedCount={plan.votedCount} totalCount={plan.totalCount} accentColor={BLUE} />
                    </div>
                  </div>
                </motion.button>
              )}

              {/* ── LOCKED CARD ── clean success state */}
              {isLocked && (
                <motion.button whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation(`/plan-detail?state=confirmed&group=${mappedGroup}&planId=${plan.id}`)}
                  className="w-full text-left rounded-none overflow-hidden focus:outline-none border border-slate-200 bg-white mb-4 shadow-sm">
                  {/* Green locked top strip */}
                  <div className="flex items-center gap-4 px-5 pt-5 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0 border border-slate-200">
                      <Lock className="w-5 h-5 text-slate-900" weight="light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">Đã chốt ✓</p>
                      <h3 className="font-serif text-2xl text-slate-900 leading-tight truncate">{plan.title}</h3>
                    </div>
                    <div className="flex items-center px-3 py-1.5 rounded-none border border-slate-200 flex-shrink-0">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{plan.group}</span>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-4">
                    <RouteTrail stops={plan.stops} color={GREEN} />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" weight="fill" />{plan.time}</div>
                        <span>{plan.cost}</span>
                      </div>
                      <MemberVotes members={plan.members} votedCount={plan.votedCount} totalCount={plan.totalCount} accentColor={GREEN} />
                    </div>
                  </div>
                </motion.button>
              )}

              {/* ── DRAFT CARD ── muted, inactive */}
              {isDraft && (
                <motion.button whileTap={{ scale: 0.98 }}
                  onClick={() => setLocation("/create-plan")}
                  className="w-full text-left rounded-none overflow-hidden focus:outline-none mb-4"
                  style={{
                    background: "#FAFAF9",
                    border: `1px dashed #CBD5E1`,
                  }}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-none bg-slate-200 text-slate-500">
                            <PencilSimple className="w-3.5 h-3.5" weight="fill" />
                            <span className="text-xs font-bold uppercase tracking-widest">NHÁP</span>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{plan.group}</span>
                        </div>
                        <h3 className="font-serif italic text-2xl text-slate-600">{plan.title}</h3>
                      </div>
                      <CaretRight className="w-5 h-5 mt-1 flex-shrink-0 text-slate-400" weight="light" />
                    </div>
                    <div className="opacity-60 grayscale">
                      <RouteTrail stops={plan.stops} color={T3} />
                    </div>
                    <div className="flex items-center gap-3 mt-4 text-xs font-bold uppercase tracking-widest text-slate-400 border-t border-slate-200 pt-4">
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" weight="fill" />{plan.time}</div>
                      <span>{plan.cost}</span>
                    </div>
                  </div>
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
      )}

      {/* Mimi nudge */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
        className="flex items-center gap-4 rounded-none px-5 py-4 mt-6 border border-slate-200 bg-slate-50">
        <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          className="w-10 h-10 rounded-none bg-white border border-slate-200 flex items-center justify-center text-xl">🐾</motion.div>
        <p className="font-serif italic text-sm flex-1 text-slate-600">
          Mimi đang chờ cả nhóm vote xong để được đi chơi cùng!
        </p>
      </motion.div>

      <BottomNav />
    </main>
  );
}
