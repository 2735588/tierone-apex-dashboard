import { TierBadge } from "@/components/TierBadge";
import { MuscleGroup } from "@/components/MuscleGroup";
import { ScanButton } from "@/components/ScanButton";
import { Bell, Settings, Flame, Timer, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import bodyImage from "@/assets/body-silhouette.png";
import { BrandMark } from "@/components/Brand";

const FemaleIndex = () => {
  // Reordered muscle groups with female-focused priorities
  const muscleGroups = [
    { name: "Glutes", score: 82, position: { bottom: "28%", left: "38%" }, isActive: true },
    { name: "Core", score: 78, position: { top: "40%", left: "36%" } },
    { name: "Legs", score: 85, position: { bottom: "18%", left: "33%" } },
    { name: "Back", score: 74, position: { top: "20%", right: "28%" } },
    { name: "Shoulders", score: 71, position: { top: "10%", left: "28%" } },
    { name: "Arms", score: 68, position: { top: "26%", right: "18%" } },
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
          <div className="w-10 h-10 bg-gradient-primary-female rounded-full flex items-center justify-center tier-glow">
            <BrandMark size={16} className="filter brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
              TierOne
            </h1>
            <div className="w-16 h-1 bg-gradient-primary mx-auto rounded-full tier-glow" />
          </div>
        </div>

        {/* Central Scan Button */}
        <div className="flex justify-center mb-6">
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground px-10 py-4 rounded-full font-bold tier-glow energy-pulse text-lg shadow-xl transform hover:scale-105 transition-all duration-200">
            <Zap className="w-6 h-6 mr-3" />
            START SCAN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FemaleIndex;