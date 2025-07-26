import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/BottomNavigation";
import { GenderProvider } from "@/contexts/GenderContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import { SignUp } from "./pages/SignUp";
import GenderSelection from "./pages/GenderSelection";
import MaleIndex from "./pages/MaleIndex";
import FemaleIndex from "./pages/FemaleIndex";
import ProgressBadges from "./pages/ProgressBadges";
import Leaderboard from "./pages/Leaderboard";
import Achievements from "./pages/Achievements";
import AIScan from "./pages/AIScan";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <GenderProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background pb-20">
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/home" element={<Index />} />
              <Route path="/onboarding" element={<GenderSelection />} />
              <Route path="/male" element={<MaleIndex />} />
              <Route path="/female" element={<FemaleIndex />} />
              <Route path="/progress-badges" element={<ProgressBadges />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/ai-scan" element={<AIScan />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNavigation />
          </div>
        </BrowserRouter>
        </TooltipProvider>
      </GenderProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
