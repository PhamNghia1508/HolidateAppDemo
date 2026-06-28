import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DynamicIsland } from "@/components/premium/DynamicIsland";
import { MimiIntelligence } from "@/components/premium/MimiIntelligence";
import NotFound from "@/pages/not-found";

import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Plan from "@/pages/Plan";
import CreatePlan from "@/pages/CreatePlan";
import Suggested from "@/pages/Suggested";
import PlanDetail from "@/pages/PlanDetail";
import Confirmed from "@/pages/Confirmed";
import LiveJourney from "@/pages/LiveJourney";
import Memories from "@/pages/Memories";
import Photobooth from "@/pages/Photobooth";
import Pet from "@/pages/Pet";

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell flex flex-col relative overflow-x-hidden bg-[#F8F9FA]">
      {/* Global Canvas Texture Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      <div className="relative z-10 flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
}

const pageTransition = {
  initial: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  transition: { type: "spring" as const, stiffness: 350, damping: 30, mass: 0.9 },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="flex-1 flex flex-col min-h-0"
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <Switch location={location} key={location}>
      <Route path="/"><PageWrapper><Onboarding /></PageWrapper></Route>
      <Route path="/home"><PageWrapper><Home /></PageWrapper></Route>
      <Route path="/plan"><PageWrapper><Plan /></PageWrapper></Route>
      <Route path="/create-plan"><PageWrapper><CreatePlan /></PageWrapper></Route>
      <Route path="/suggested"><PageWrapper><Suggested /></PageWrapper></Route>
      <Route path="/plan-detail"><PageWrapper><PlanDetail /></PageWrapper></Route>
      <Route path="/confirmed"><PageWrapper><Confirmed /></PageWrapper></Route>
      <Route path="/live"><PageWrapper><LiveJourney /></PageWrapper></Route>
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
        {/* phone-outer: desktop centering wrapper */}
        <div className="phone-outer">
          {/* phone-device: the frame — transform creates containing block for fixed children */}
          <div className="phone-device">
            {/* Dynamic island (desktop only) */}
            <DynamicIsland />
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
            <MimiIntelligence />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
