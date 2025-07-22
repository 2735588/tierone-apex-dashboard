import { Bell, Settings, Flame, Zap, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const currentStreak = 12; // Example streak days
  
  const getStreakColor = (days: number) => {
    if (days >= 100) return "text-white drop-shadow-glow";
    if (days >= 30) return "text-red-400";
    if (days >= 7) return "text-orange-400";
    return "text-yellow-400";
  };

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
            <Flame className="w-5 h-5 text-primary-foreground" />
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
      <div className="px-6 flex-1 flex flex-col items-center">
        {/* Global & National Rank Orbs */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-28 bg-gradient-to-br from-accent via-accent to-accent/70 rounded-full flex items-center justify-center tier-glow energy-pulse shadow-2xl">
              <div className="text-center">
                <div className="text-xs text-white/80 font-medium">GLOBAL</div>
                <div className="text-xl font-bold text-white">#1,847</div>
              </div>
            </div>
            <div className="text-sm text-accent font-medium mt-3">Top 4% Worldwide</div>
          </div>
          
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary to-primary/70 rounded-full flex items-center justify-center tier-glow shadow-xl">
              <div className="text-center">
                <div className="text-xs text-white/80 font-medium">NZ</div>
                <div className="text-lg font-bold text-white">#12</div>
              </div>
            </div>
            <div className="text-sm text-primary font-medium mt-3">Top 8% NZ</div>
          </div>
        </div>

        {/* 3D Animated Avatar */}
        <div className="relative mb-8">
          <div className="w-40 h-52 relative">
            {/* Animated silhouette with circuit glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-accent/10 to-transparent rounded-full opacity-80 animate-pulse"></div>
            <div className="w-full h-full relative overflow-hidden rounded-full">
              {/* Human silhouette */}
              <svg 
                width="160" 
                height="208" 
                viewBox="0 0 160 208" 
                className="w-full h-full drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 15px hsl(var(--accent) / 0.4))' }}
              >
                {/* Head */}
                <ellipse cx="80" cy="25" rx="18" ry="22" fill="hsl(var(--accent) / 0.8)" className="animate-pulse" />
                
                {/* Torso */}
                <path 
                  d="M62 47 C62 47, 58 60, 58 80 L58 120 C58 130, 65 135, 80 135 C95 135, 102 130, 102 120 L102 80 C102 60, 98 47, 98 47 Z" 
                  fill="hsl(var(--accent) / 0.7)"
                  className="animate-pulse"
                  style={{ animationDelay: '0.5s' }}
                />
                
                {/* Arms */}
                <ellipse cx="45" cy="70" rx="8" ry="25" fill="hsl(var(--accent) / 0.6)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                <ellipse cx="115" cy="70" rx="8" ry="25" fill="hsl(var(--accent) / 0.6)" className="animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Legs */}
                <ellipse cx="68" cy="165" rx="10" ry="35" fill="hsl(var(--accent) / 0.6)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                <ellipse cx="92" cy="165" rx="10" ry="35" fill="hsl(var(--accent) / 0.6)" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
                
                {/* Circuit glow lines */}
                <path 
                  d="M80 47 L80 135" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth="2" 
                  opacity="0.8"
                  className="animate-pulse"
                />
                <path 
                  d="M62 80 L98 80" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth="1.5" 
                  opacity="0.6"
                  className="animate-pulse"
                  style={{ animationDelay: '0.8s' }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Central Scan Button */}
        <div className="flex justify-center mb-8">
          <Button 
            className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground px-12 py-5 rounded-full font-bold tier-glow energy-pulse text-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
            onClick={() => {/* Open camera scan */}}
          >
            <Camera className="w-7 h-7 mr-3" />
            START SCAN
          </Button>
        </div>

        {/* Streak Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Flame className={`w-8 h-8 ${getStreakColor(currentStreak)} drop-shadow-lg animate-pulse`} />
            <span className={`text-lg font-bold ${getStreakColor(currentStreak)}`}>
              {currentStreak}-day streak
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Keep the momentum going! 💪
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
