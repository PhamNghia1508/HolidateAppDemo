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
import Photobooth from "@/pages/Photobooth";
import Pet from "@/pages/Pet";

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell flex flex-col relative overflow-x-hidden" style={{ background: "#EEE6D4" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-80px] right-[-60px] w-[320px] h-[320px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,55,30,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-[20%] left-[-40px] w-[240px] h-[240px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(200,130,10,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />
      </div>
      <div className="grain-overlay" />
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { type: "spring" as const, stiffness: 400, damping: 34 },
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

function Router() {
  return (
    <Switch>
      <Route path="/"><PageWrapper><Onboarding /></PageWrapper></Route>
      <Route path="/home"><PageWrapper><Home /></PageWrapper></Route>
      <Route path="/plan"><PageWrapper><Plan /></PageWrapper></Route>
      <Route path="/create-plan"><PageWrapper><CreatePlan /></PageWrapper></Route>
      <Route path="/suggested"><PageWrapper><Suggested /></PageWrapper></Route>
      <Route path="/plan-detail"><PageWrapper><PlanDetail /></PageWrapper></Route>
      <Route path="/vote"><PageWrapper><Vote /></PageWrapper></Route>
      <Route path="/confirmed"><PageWrapper><Confirmed /></PageWrapper></Route>
      <Route path="/memories"><PageWrapper><Memories /></PageWrapper></Route>
      <Route path="/photobooth"><PageWrapper><Photobooth /></PageWrapper></Route>
      <Route path="/pet"><PageWrapper><Pet /></PageWrapper></Route>
      <Route><PageWrapper><NotFound /></PageWrapper></Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* phone-outer: desktop centering wrapper */}
        <div className="phone-outer">
          {/* phone-device: the frame — transform creates containing block for fixed children */}
          <div className="phone-device">
            {/* Dynamic island (desktop only) */}
            <div className="phone-island" aria-hidden="true" />
            {/* Side buttons (desktop only) */}
            <div className="phone-btn-left" aria-hidden="true" />
            <div className="phone-btn-right" aria-hidden="true" />
            <AppShell>
              <AnimatePresence mode="wait">
                <Router />
              </AnimatePresence>
            </AppShell>
            {/* Home indicator (desktop only) */}
            <div className="phone-home-bar" aria-hidden="true" />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
