import { useState } from "react";
import { Flame, Trophy, Target, Clock, Diamond, Crown, Star, Zap, TrendingUp, Award, X, BarChart3 } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { BadgeHex } from "@/components/BadgeHex";
import { tierOneBadges, getBadgesByType } from "@/data/badges";

const ProgressBadges = () => {
  const { gender } = useGender();
  const isFemale = gender === 'female';
  const [currentStreak, setCurrentStreak] = useState(36);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<any>(null);

  const muscleGroups = isFemale ? [
    { name: "Glutes", score: 82, tier: "Gold", history: [78, 80, 82], advice: "Build beautiful glute shape and strength with hip thrusts, Romanian deadlifts, and Bulgarian split squats." },
    { name: "Core", score: 78, tier: "Silver", history: [74, 76, 78], advice: "Develop incredible core stability and posture with planks, dead bugs, and Pallof presses." },
    { name: "Legs", score: 85, tier: "Gold", history: [82, 84, 85], advice: "Tone and strengthen your legs with unilateral training like lunges, step-ups, and single-leg deadlifts." },
  ] : [
    { name: "Chest", score: 87, tier: "Gold", history: [82, 85, 87], advice: "Focus on progressive overload with bench press variations" },
    { name: "Shoulders", score: 92, tier: "Gold", history: [88, 90, 92], advice: "Incorporate more rear delt work for balanced development" },
    { name: "Arms", score: 78, tier: "Silver", history: [74, 76, 78], advice: "Increase training frequency and add isolation exercises" },
  ];

  const overallPotentialScore = 98;

  // Get TierOne badges organized by category
  const allBadges = tierOneBadges;
  const streakBadges = getBadgesByType('streak');
  const sponsoredBadges = getBadgesByType('sponsored');
  const globalBadges = getBadgesByType('global');
  const muscleGroupBadges = getBadgesByType('muscle-group');
  
  const badgeCategories = [
    { name: 'Consistency', badges: streakBadges, icon: Flame },
    { name: 'Brand Challenges', badges: sponsoredBadges, icon: Award },
    { name: 'Global Events', badges: globalBadges, icon: Trophy },
    { name: 'Performance', badges: muscleGroupBadges, icon: Target }
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
    if (streak >= 100) return `text-cyan-400 tier-glow animate-pulse`;
    if (streak >= 50) return `text-red-400 energy-pulse`;
    if (streak >= 30) return `text-orange-400 energy-pulse`;
    if (streak >= 7) return "text-yellow-400";
    return "text-blue-400";
  };

  const getPotentialColor = () => isFemale ? "text-[#FF66B2]" : "text-[#00FF66]";
  const getGlowClass = () => isFemale ? "tier-glow-female" : "tier-glow";
  const getTierBadge = (score: number) => {
    if (score >= 95) return { tier: "Diamond", color: "text-cyan-400", bgColor: "bg-cyan-400/10" };
    if (score >= 85) return { tier: "Gold", color: "text-yellow-400", bgColor: "bg-yellow-400/10" };
    if (score >= 70) return { tier: "Silver", color: "text-gray-300", bgColor: "bg-gray-300/10" };
    return { tier: "Bronze", color: "text-orange-400", bgColor: "bg-orange-400/10" };
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 pb-24">
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
                <Flame className={`w-16 h-16 ${getStreakFlameColor(currentStreak)}`} />
              </div>
              <CardTitle className="text-3xl font-bold text-accent">
                {currentStreak} Days
              </CardTitle>
              <CardDescription className="text-lg">
                Current Streak {currentStreak >= 100 && "🔥 LEGENDARY"}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Overall Potential Score */}
          <Card className={`tier-card ${getGlowClass()}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-foreground mb-4">
                Overall Potential
              </CardTitle>
              <div className={`text-6xl font-bold ${getPotentialColor()} ${getGlowClass()} mb-4`}>
                {overallPotentialScore}
              </div>
              <Badge className={`${getPotentialColor()} bg-transparent border-0 text-lg`}>
                {getTierBadge(overallPotentialScore).tier} Tier
              </Badge>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          {/* Badge Collection Stats */}
          <Card className="tier-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-tier-gold">{allBadges.filter(badge => badge.isUnlocked).length}</div>
                  <div className="text-sm text-muted-foreground">Earned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{allBadges.length}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{Math.round((allBadges.filter(badge => badge.isUnlocked).length / allBadges.length) * 100)}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badge Categories */}
          {badgeCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="flex items-center gap-2">
                <category.icon className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <Badge variant="outline" className="ml-auto">
                  {category.badges.filter(badge => badge.isUnlocked).length}/{category.badges.length}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {category.badges.map((badge) => (
                  <Dialog key={badge.id}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <BadgeHex
                          name={badge.name}
                          description={badge.description}
                          type={badge.type}
                          glow={badge.glow}
                          imageUrl={badge.imageUrl}
                          isUnlocked={badge.isUnlocked}
                          progress={badge.progress}
                          showProgress={!badge.isUnlocked}
                          size="md"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="tier-card">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <div className="w-12 h-12">
                            <BadgeHex
                              name={badge.name}
                              description=""
                              type={badge.type}
                              glow={badge.glow}
                              imageUrl={badge.imageUrl}
                              isUnlocked={badge.isUnlocked}
                              size="sm"
                            />
                          </div>
                          {badge.name}
                        </DialogTitle>
                        <DialogDescription>
                          {badge.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Requirement:</span>
                          <span className="text-sm font-medium text-right max-w-48">{badge.requirement}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Category:</span>
                          <span className="text-sm font-medium">{badge.category}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Rarity:</span>
                          <Badge variant={badge.isUnlocked ? "default" : "outline"} className="capitalize">
                            {badge.rarity}
                          </Badge>
                        </div>
                        {badge.earnedDate && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Earned:</span>
                            <span className="text-sm font-medium">{new Date(badge.earnedDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {!badge.isUnlocked && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Progress:</span>
                              <span className="text-sm font-medium">{badge.progress}%</span>
                            </div>
                            <Progress value={badge.progress} className="h-3" />
                          </div>
                        )}
                        {badge.isUnlocked && (
                          <div className="flex items-center gap-2 text-green-400">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm font-medium">Badge Earned!</span>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ))}

          {/* Premium Badges CTA */}
          <Card className="tier-card border-accent/50">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-tier-gold" />
              <h3 className="text-lg font-bold mb-2">Unlock Premium Badges</h3>
              <p className="text-muted-foreground mb-4">
                Get access to exclusive badges and challenges with TierOne Premium
              </p>
              <Button className="bg-gradient-primary">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressBadges;
