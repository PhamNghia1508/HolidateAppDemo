import { Switch, Route } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Plan from "@/pages/Plan";
import CreatePlan from "@/pages/CreatePlan";
import Suggested from "@/pages/Suggested";
import PlanDetail from "@/pages/PlanDetail";
import Vote from "@/pages/Vote";
import Confirmed from "@/pages/Confirmed";
import Memories from "@/pages/Memories";
import Pet from "@/pages/Pet";

/* ============================================================
   SPATIAL APP SHELL — Floating ambient glows, grain layer,
   smooth page transitions
   ============================================================ */

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden bg-cream-warm">
      {/* Ambient floating blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-30"
          style={{ background: "hsl(var(--coral))" }}
        />
        <div
          className="absolute top-1/3 -left-32 w-60 h-60 rounded-full blur-[80px] opacity-20"
          style={{ background: "hsl(var(--mint))" }}
        />
        <div
          className="absolute bottom-20 right-10 w-64 h-64 rounded-full blur-[90px] opacity-20"
          style={{ background: "hsl(var(--champagne))" }}
        />
        <div
          className="absolute top-2/3 left-1/4 w-48 h-48 rounded-full blur-[70px] opacity-15"
          style={{ background: "hsl(var(--rose))" }}
        />
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

/* Page transition wrapper */
const pageTransition = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.35 },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   ROUTER
   ============================================================ */

function Router() {
  return (
    <Switch>
      <Route path="/">
        <PageWrapper><Onboarding /></PageWrapper>
      </Route>
      <Route path="/home">
        <PageWrapper><Home /></PageWrapper>
      </Route>
      <Route path="/plan">
        <PageWrapper><Plan /></PageWrapper>
      </Route>
      <Route path="/create-plan">
        <PageWrapper><CreatePlan /></PageWrapper>
      </Route>
      <Route path="/suggested">
        <PageWrapper><Suggested /></PageWrapper>
      </Route>
      <Route path="/plan-detail">
        <PageWrapper><PlanDetail /></PageWrapper>
      </Route>
      <Route path="/vote">
        <PageWrapper><Vote /></PageWrapper>
      </Route>
      <Route path="/confirmed">
        <PageWrapper><Confirmed /></PageWrapper>
      </Route>
      <Route path="/memories">
        <PageWrapper><Memories /></PageWrapper>
      </Route>
      <Route path="/pet">
        <PageWrapper><Pet /></PageWrapper>
      </Route>
      <Route>
        <PageWrapper><NotFound /></PageWrapper>
      </Route>
    </Switch>
  );
}

/* ============================================================
   APP
   ============================================================ */

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppShell>
          <AnimatePresence mode="wait">
            <Router />
          </AnimatePresence>
        </AppShell>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
