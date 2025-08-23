import { useNavigate } from 'react-router-dom';
import { Bell, Settings, Flame, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import bodyImage from "@/assets/body-silhouette.png";
import { BrandMark } from "@/components/Brand";

const ScanLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Status bar simulation */}
      <div className="flex justify-between items-center px-6 py-2 text-xs text-muted-foreground">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <div className="w-4 h-2 border border-current rounded-sm">
            <div className="w-3/4 h-full bg-current rounded-sm"></div>
          </div>
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center tier-glow">
            <BrandMark width={20} height={20} className="filter brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">TierOne</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Alex</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full energy-pulse"></div>
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className="px-6 flex-1">
        {/* Global & National Rank Orbs */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-accent via-accent to-accent/70 rounded-full flex items-center justify-center tier-glow energy-pulse shadow-lg">
              <div className="text-center">
                <div className="text-xs text-white/80 font-medium">GLOBAL</div>
                <div className="text-lg font-bold text-white">#1,847</div>
              </div>
            </div>
            <div className="text-xs text-accent font-medium mt-2">Top 4% Worldwide</div>
          </div>
          
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary via-primary to-primary/70 rounded-full flex items-center justify-center tier-glow shadow-md">
              <div className="text-center">
                <div className="text-xs text-white/80 font-medium">NZ</div>
                <div className="text-base font-bold text-white">#12</div>
              </div>
            </div>
            <div className="text-xs text-primary font-medium mt-2">Top 8% NZ</div>
          </div>
        </div>

        {/* Body Scan Model */}
        <div className="relative flex flex-col items-center mb-4">
          <img 
            src={bodyImage} 
            alt="Body tracking" 
            className="w-48 h-64 object-contain opacity-90"
          />
        </div>

        {/* Central Scan Button */}
        <div className="flex justify-center mb-6">
          <Button 
            onClick={() => navigate('/scan')}
            className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground px-10 py-4 rounded-full font-bold tier-glow energy-pulse text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Zap className="w-6 h-6 mr-3" />
            START SCAN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScanLanding;