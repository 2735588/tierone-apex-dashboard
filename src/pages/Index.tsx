import { TierBadge } from "@/components/TierBadge";
import { MuscleGroup } from "@/components/MuscleGroup";
import { ScanButton } from "@/components/ScanButton";
import { Bell, Settings, Flame, Timer, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import bodyImage from "@/assets/body-silhouette.png";

const Index = () => {
  const muscleGroups = [
    { name: "Chest", score: 87, position: { top: "20%", left: "40%" }, isActive: true, change: "+3" },
    { name: "Shoulders", score: 92, position: { top: "12%", left: "25%" }, change: "+5" },
    { name: "Arms", score: 78, position: { top: "28%", right: "15%" }, change: "-1" },
    { name: "Back", score: 84, position: { top: "22%", right: "25%" }, change: "+2" },
    { name: "Core", score: 65, position: { top: "42%", left: "38%" }, change: "+7" },
    { name: "Legs", score: 71, position: { bottom: "15%", left: "35%" }, change: "+4" },
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
        <div className="flex justify-center gap-6 mb-6">
          <div className="relative flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/50 rounded-full flex items-center justify-center tier-glow energy-pulse">
              <div className="text-center">
                <div className="text-lg font-bold text-white">#12</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">National</div>
            <div className="text-xs text-accent">Top 3%</div>
          </div>
          
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/50 rounded-full flex items-center justify-center tier-glow">
              <div className="text-center">
                <div className="text-sm font-bold text-white">#1,847</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Global</div>
            <div className="text-xs text-primary">Top 8%</div>
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
            {muscleGroups.map((group, index) => {
              const badge = getBadgeTier(group.score);
              return (
                <div
                  key={index}
                  className={`absolute bg-background/90 backdrop-blur border border-border rounded-lg px-2 py-1 text-xs font-medium ${group.isActive ? 'tier-glow border-accent' : ''} hover:scale-105 transition-transform cursor-pointer`}
                  style={group.position}
                >
                  <div className="flex items-center gap-1">
                    <span className={badge.color}>{badge.icon}</span>
                    <span className="text-foreground">{group.name}</span>
                    <span className="text-accent font-bold">{group.score}</span>
                    <span className={`text-xs ${group.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {group.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Central Scan Button */}
        <div className="flex justify-center mb-4">
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground px-8 py-3 rounded-full font-bold tier-glow energy-pulse">
            <Zap className="w-5 h-5 mr-2" />
            SCAN NOW
          </Button>
        </div>

        {/* Daily Metrics with Icons */}
        <div className="tier-card rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            Daily Metrics
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Strength Gain</span>
              </div>
              <span className="text-sm font-semibold text-green-400">+3.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Muscle Activation</span>
              </div>
              <span className="text-sm font-semibold text-yellow-400">89%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Recovery Score</span>
              </div>
              <span className="text-sm font-semibold text-primary">92%</span>
            </div>
          </div>
        </div>

        {/* All 6 Muscle Groups Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {muscleGroups.map((group) => {
            const badge = getBadgeTier(group.score);
            return (
              <Button 
                key={group.name}
                variant="ghost" 
                className="tier-card h-16 flex-col gap-1 text-center hover:tier-glow transition-all"
              >
                <div className="flex items-center gap-1">
                  <span className={`text-xs ${badge.color}`}>{badge.icon}</span>
                  <span className="text-lg font-bold text-accent">{group.score}</span>
                </div>
                <div className="text-xs text-muted-foreground">{group.name}</div>
                <div className={`text-xs ${group.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {group.change}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
