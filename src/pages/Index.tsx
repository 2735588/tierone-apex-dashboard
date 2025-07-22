import { TierBadge } from "@/components/TierBadge";
import { MuscleGroup } from "@/components/MuscleGroup";
import { ScanButton } from "@/components/ScanButton";
import { Bell, Settings, Flame, Timer, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import bodyImage from "@/assets/body-silhouette.png";

const Index = () => {
  const muscleGroups = [
    { name: "Chest", score: 87, position: { top: "25%", left: "35%" }, isActive: true },
    { name: "Shoulders", score: 92, position: { top: "18%", left: "15%" } },
    { name: "Arms", score: 78, position: { top: "35%", right: "20%" } },
    { name: "Core", score: 65, position: { top: "45%", left: "30%" } },
    { name: "Back", score: 84, position: { top: "30%", right: "35%" } },
    { name: "Legs", score: 71, position: { bottom: "25%", left: "40%" } },
  ];

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
        {/* TierScore - Main Focus (Large & Centered) */}
        <div className="flex justify-center mb-8">
          <TierBadge score={2847} rank="APEX TIER" percentile={2} />
        </div>

        {/* National & Global Rank Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="tier-card rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-tier-gold">#12</div>
            <div className="text-sm text-muted-foreground">National Rank</div>
          </div>
          
          <div className="tier-card rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-accent">#1,847</div>
            <div className="text-sm text-muted-foreground">Global Rank</div>
          </div>
        </div>

        {/* Scan Countdown & Status */}
        <div className="tier-card rounded-xl p-4 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Timer className="w-5 h-5 text-accent" />
            <span className="text-lg font-bold text-foreground">Next scan available in 3 days</span>
          </div>
          <div className="text-sm text-muted-foreground">Free tier: 1 scan per week</div>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Flame className="w-4 h-4 text-tier-gold" />
            <span className="text-sm text-tier-gold font-medium">🔥 Streak Day 7</span>
          </div>
        </div>

        {/* Body Scan with Muscle Group Scores */}
        <div className="relative flex flex-col items-center mb-8">
          <div className="relative">
            <img 
              src={bodyImage} 
              alt="Body tracking" 
              className="w-56 h-72 object-contain opacity-90"
            />
            
            {/* Muscle group score chips positioned around the body */}
            {muscleGroups.map((group, index) => (
              <MuscleGroup
                key={index}
                name={group.name}
                score={group.score}
                position={group.position}
                isActive={group.isActive}
              />
            ))}
          </div>
        </div>

        {/* Scan button centered at bottom */}
        <div className="flex justify-center mb-6">
          <ScanButton />
        </div>

        {/* Top 3 Muscle Scores - Quick Access */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button variant="ghost" className="tier-card h-16 flex-col gap-1 text-center">
            <div className="text-lg font-bold text-accent">87</div>
            <div className="text-xs text-muted-foreground">Chest</div>
          </Button>
          <Button variant="ghost" className="tier-card h-16 flex-col gap-1 text-center">
            <div className="text-lg font-bold text-accent">78</div>
            <div className="text-xs text-muted-foreground">Arms</div>
          </Button>
          <Button variant="ghost" className="tier-card h-16 flex-col gap-1 text-center">
            <div className="text-lg font-bold text-accent">71</div>
            <div className="text-xs text-muted-foreground">Legs</div>
          </Button>
        </div>

        {/* Performance Summary */}
        <div className="tier-card rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            Performance Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Strength Gain</span>
              <span className="text-sm font-semibold text-tier-gold">+3.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Muscle Activation</span>
              <span className="text-sm font-semibold text-accent">89%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Recovery Score</span>
              <span className="text-sm font-semibold text-primary">92%</span>
            </div>
          </div>
        </div>

        {/* Start New Scan Button */}
        <div className="flex justify-center">
          <Button variant="tier" size="lg" className="w-full h-14 text-lg">
            <Zap className="w-6 h-6 mr-2" />
            Start New Scan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
