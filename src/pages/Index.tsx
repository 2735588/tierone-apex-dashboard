import { TierBadge } from "@/components/TierBadge";
import { MuscleGroup } from "@/components/MuscleGroup";
import { ScanButton } from "@/components/ScanButton";
import { Bell, Settings, Flame, Timer, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import bodyImage from "@/assets/body-silhouette.png";

const Index = () => {
  const muscleGroups = [
    { name: "Chest", score: 87, position: { top: "18%", left: "38%" }, isActive: true },
    { name: "Shoulders", score: 92, position: { top: "10%", left: "28%" } },
    { name: "Arms", score: 78, position: { top: "26%", right: "18%" } },
    { name: "Back", score: 84, position: { top: "20%", right: "28%" } },
    { name: "Core", score: 65, position: { top: "40%", left: "36%" } },
    { name: "Legs", score: 71, position: { bottom: "18%", left: "33%" } },
  ];

  const getBadgeTier = (score: number) => {
    if (score >= 95) return { tier: "Diamond", color: "text-cyan-400", icon: "💎" };
    if (score >= 85) return { tier: "Gold", color: "text-yellow-400", icon: "🥇" };
    if (score >= 70) return { tier: "Silver", color: "text-gray-300", icon: "🥈" };
    return { tier: "Bronze", color: "text-orange-400", icon: "🥉" };
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

        {/* Scan Status & Streak */}
        <div className="tier-card rounded-xl p-3 mb-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Timer className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold text-foreground">Next scan in 3 days</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Flame className="w-4 h-4 text-tier-gold" />
            <span className="text-xs text-tier-gold font-medium">🔥 7-day streak</span>
          </div>
        </div>

        {/* Body Scan with All 6 Muscle Groups */}
        <div className="relative flex flex-col items-center mb-4">
          <div className="relative">
            <img 
              src={bodyImage} 
              alt="Body tracking" 
              className="w-48 h-64 object-contain opacity-90"
            />
            
            {/* All 6 muscle group score chips positioned around the body */}
            {muscleGroups.map((group, index) => (
              <button
                key={index}
                className={`absolute bg-background/95 backdrop-blur border border-border rounded-xl px-3 py-2 text-xs font-medium ${group.isActive ? 'tier-glow border-accent' : ''} hover:scale-110 transition-all duration-200 cursor-pointer shadow-lg`}
                style={group.position}
                onClick={() => {/* Navigate to muscle detail */}}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-foreground font-semibold">{group.name}</span>
                  <span className="text-accent font-bold text-sm">{group.score}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Central Scan Button */}
        <div className="flex justify-center mb-6">
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground px-10 py-4 rounded-full font-bold tier-glow energy-pulse text-lg shadow-xl transform hover:scale-105 transition-all duration-200">
            <Zap className="w-6 h-6 mr-3" />
            START SCAN
          </Button>
        </div>

        {/* Performance Metrics */}
        <div className="tier-card rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            Performance Metrics
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full energy-pulse"></div>
                <span className="text-sm text-muted-foreground">Strength Gain</span>
              </div>
              <span className="text-base font-bold text-green-400">+3.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Muscle Activation</span>
              </div>
              <span className="text-base font-bold text-yellow-400">89%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full tier-glow"></div>
                <span className="text-sm text-muted-foreground">Recovery Score</span>
              </div>
              <span className="text-base font-bold text-primary">92%</span>
            </div>
          </div>
        </div>

        {/* Quick Access Muscle Groups */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {muscleGroups.slice(0, 3).map((group) => (
            <Button 
              key={group.name}
              variant="ghost" 
              className="tier-card h-18 flex-col gap-2 text-center hover:tier-glow transition-all duration-200 hover:scale-105"
              onClick={() => {/* Navigate to detailed view */}}
            >
              <span className="text-lg font-bold text-accent">{group.score}</span>
              <div className="text-xs text-muted-foreground font-medium">{group.name}</div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
