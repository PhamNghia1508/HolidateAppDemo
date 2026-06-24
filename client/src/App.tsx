import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Onboarding} />
      <Route path="/home" component={Home} />
      <Route path="/plan" component={Plan} />
      <Route path="/create-plan" component={CreatePlan} />
      <Route path="/suggested" component={Suggested} />
      <Route path="/plan-detail" component={PlanDetail} />
      <Route path="/vote" component={Vote} />
      <Route path="/confirmed" component={Confirmed} />
      <Route path="/memories" component={Memories} />
      <Route path="/pet" component={Pet} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
