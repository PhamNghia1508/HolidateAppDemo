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
   OBSIDIAN APP SHELL — Dark, premium, tech-unicorn grade
   ============================================================ */

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-x-hidden bg-[#09090B]">
      {/* Subtle ambient mint blur — behind content only */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #00E5A8 0%, transparent 70%)", filter: "blur(100px)" }}
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
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { type: "spring", stiffness: 400, damping: 35, duration: 0.25 },
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
