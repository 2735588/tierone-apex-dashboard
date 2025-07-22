import { useState } from "react";
import { Flame, Trophy, Target, Clock, Diamond, Crown, Star, Zap, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProgressBadges = () => {
  const [currentStreak, setCurrentStreak] = useState(36);

  const muscleGroups = [
    { name: "Chest", score: 87, tier: "Gold", progress: 85 },
    { name: "Shoulders", score: 92, tier: "Gold", progress: 95 },
    { name: "Arms", score: 78, tier: "Silver", progress: 60 },
    { name: "Back", score: 84, tier: "Gold", progress: 80 },
    { name: "Core", score: 65, tier: "Silver", progress: 30 },
    { name: "Legs", score: 71, tier: "Silver", progress: 45 },
  ];

  const badges = [
    {
      id: 1,
      name: "Consistency Master",
      description: "Complete 30 consecutive days",
      tier: "Gold",
      unlocked: true,
      progress: 100,
      icon: Clock,
      category: "Streak"
    },
    {
      id: 2,
      name: "Strength Warrior",
      description: "Achieve 85+ in any muscle group",
      tier: "Gold",
      unlocked: true,
      progress: 100,
      icon: Trophy,
      category: "Performance"
    },
    {
      id: 3,
      name: "Diamond Elite",
      description: "Reach 95+ score in any muscle",
      tier: "Diamond",
      unlocked: false,
      progress: 97,
      icon: Diamond,
      category: "Performance"
    },
    {
      id: 4,
      name: "Scan Specialist",
      description: "Complete 25 scans",
      tier: "Silver",
      unlocked: true,
      progress: 100,
      icon: Zap,
      category: "Activity"
    },
    {
      id: 5,
      name: "Leaderboard Legend",
      description: "Reach Top 500 Global",
      tier: "Gold",
      unlocked: false,
      progress: 65,
      icon: Crown,
      category: "Ranking"
    }
  ];

  const getBadgeColor = (tier: string, unlocked: boolean) => {
    if (!unlocked) return "text-muted-foreground";
    switch (tier) {
      case "Diamond": return "text-cyan-400";
      case "Gold": return "text-yellow-400";
      case "Silver": return "text-gray-300";
      default: return "text-orange-400";
    }
  };

  const getStreakFlameColor = (streak: number) => {
    if (streak >= 100) return "text-cyan-400 tier-glow";
    if (streak >= 50) return "text-red-400";
    if (streak >= 30) return "text-orange-400";
    if (streak >= 7) return "text-yellow-400";
    return "text-blue-400";
  };

  const getTierBadge = (score: number) => {
    if (score >= 95) return { tier: "Diamond", color: "text-cyan-400", bgColor: "bg-cyan-400/10" };
    if (score >= 85) return { tier: "Gold", color: "text-yellow-400", bgColor: "bg-yellow-400/10" };
    if (score >= 70) return { tier: "Silver", color: "text-gray-300", bgColor: "bg-gray-300/10" };
    return { tier: "Bronze", color: "text-orange-400", bgColor: "bg-orange-400/10" };
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 pb-24">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Progress & Badges</h1>
        <p className="text-muted-foreground">Track your journey to elite performance</p>
      </div>

      <Tabs defaultValue="streaks" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="streaks" className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Streaks & Consistency
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            TierOne Badges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="streaks" className="space-y-6">
          {/* Current Streak */}
          <Card className="tier-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Flame className={`w-16 h-16 ${getStreakFlameColor(currentStreak)} energy-pulse`} />
              </div>
              <CardTitle className="text-3xl font-bold text-accent">
                {currentStreak} Days
              </CardTitle>
              <CardDescription className="text-lg">
                Current Streak {currentStreak >= 100 && "🔥 LEGENDARY"}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Muscle Group Tiers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Muscle Group Tiers
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {muscleGroups.map((muscle) => {
                const tierInfo = getTierBadge(muscle.score);
                return (
                  <Card key={muscle.name} className={`tier-card ${muscle.score >= 95 ? 'tier-glow' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{muscle.name}</span>
                        <Badge className={`${tierInfo.bgColor} ${tierInfo.color} border-0`}>
                          {tierInfo.tier}
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-accent mb-1">{muscle.score}</div>
                      <div className="text-xs text-muted-foreground">
                        {muscle.progress}% to next tier
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid gap-4">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <Card 
                  key={badge.id} 
                  className={`tier-card transition-all duration-200 ${
                    badge.unlocked && badge.tier === "Diamond" ? 'tier-glow' : ''
                  } ${badge.unlocked ? 'hover:scale-105' : 'opacity-75'}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-background border-2 flex items-center justify-center ${
                        badge.unlocked ? 'border-accent' : 'border-muted'
                      }`}>
                        <IconComponent 
                          className={`w-6 h-6 ${getBadgeColor(badge.tier, badge.unlocked)}`} 
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{badge.name}</h4>
                          <Badge 
                            className={`${badge.unlocked ? getBadgeColor(badge.tier, true) : 'text-muted-foreground'} bg-transparent border-0`}
                          >
                            {badge.tier}
                          </Badge>
                          {badge.unlocked && badge.tier === "Diamond" && (
                            <Diamond className="w-4 h-4 text-cyan-400 tier-glow" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                        
                        {!badge.unlocked && (
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-accent h-2 rounded-full transition-all duration-300"
                              style={{ width: `${badge.progress}%` }}
                            />
                          </div>
                        )}
                        
                        {badge.unlocked && (
                          <div className="flex items-center gap-1 text-green-400">
                            <Award className="w-4 h-4" />
                            <span className="text-xs font-medium">UNLOCKED</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Diamond className="w-4 h-4" />
              Unlock Premium Badges
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressBadges;