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
import { Scan } from "./pages/Scan";
import Profile from "./pages/Profile";
import Tour from "./pages/Tour";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
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
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/onboarding" element={<GenderSelection />} />
              <Route path="/male" element={<MaleIndex />} />
              <Route path="/female" element={<FemaleIndex />} />
              <Route path="/progress-badges" element={<ProgressBadges />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/ai-scan" element={<AIScan />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tour" element={<Tour />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
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
