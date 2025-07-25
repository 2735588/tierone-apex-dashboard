import { useState } from "react";
import { Flame, Trophy, Target, Clock, Diamond, Crown, Star, Zap, TrendingUp, Award, X, BarChart3 } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProgressBadges = () => {
  const { gender } = useGender();
  const isFemale = gender === 'female';
  const [currentStreak, setCurrentStreak] = useState(36);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<any>(null);

  const maleMuscleGroups = [
    { name: "Chest", score: 87, tier: "Gold", history: [82, 85, 87], advice: "Focus on progressive overload with bench press variations" },
    { name: "Shoulders", score: 92, tier: "Gold", history: [88, 90, 92], advice: "Incorporate more rear delt work for balanced development" },
    { name: "Arms", score: 78, tier: "Silver", history: [74, 76, 78], advice: "Increase training frequency and add isolation exercises" },
    { name: "Back", score: 84, tier: "Gold", history: [80, 82, 84], advice: "Focus on mind-muscle connection during pull movements" },
    { name: "Core", score: 65, tier: "Silver", history: [62, 63, 65], advice: "Add compound movements and stability training" },
    { name: "Legs", score: 73, tier: "Silver", history: [70, 71, 73], advice: "Increase squat depth and add unilateral exercises" },
  ];

  const femaleMuscleGroups = [
    { name: "Glutes", score: 82, tier: "Gold", history: [78, 80, 82], advice: "Build beautiful glute shape and strength with hip thrusts, Romanian deadlifts, and Bulgarian split squats. Focus on activation exercises and progressive overload for amazing results!" },
    { name: "Core", score: 78, tier: "Silver", history: [74, 76, 78], advice: "Develop incredible core stability and posture with planks, dead bugs, and Pallof presses. Strong core = confident posture and functional strength!" },
    { name: "Legs", score: 85, tier: "Gold", history: [82, 84, 85], advice: "Tone and strengthen your legs with unilateral training like lunges, step-ups, and single-leg deadlifts. Build balanced strength while enhancing stability!" },
    { name: "Back", score: 74, tier: "Silver", history: [70, 72, 74], advice: "Improve posture and build a strong, elegant back with rows, lat pulldowns, and face pulls. Perfect for countering daily desk work!" },
    { name: "Shoulders", score: 71, tier: "Silver", history: [68, 70, 71], advice: "Strengthen and sculpt your shoulders with lateral raises, overhead presses, and band work. Great for enhancing posture and creating beautiful shoulder definition!" },
    { name: "Arms", score: 68, tier: "Silver", history: [64, 66, 68], advice: "Build toned, functional arm strength with push-ups, tricep dips, and resistance band exercises. Focus on form and control for the best results!" },
  ];

  const muscleGroups = isFemale ? femaleMuscleGroups : maleMuscleGroups;

  const overallPotentialScore = 98;

  const maleSpecificBadges = [
    {
      id: 11,
      name: "Strength Warrior",
      description: "Achieve 85+ in any muscle group",
      tier: "Gold",
      unlocked: true,
      progress: 100,
      icon: Trophy,
      category: "Performance"
    },
  ];

  const femaleSpecificBadges = [
    {
      id: 11,
      name: "Glute Builder: Level 1",
      description: "Reach 75+ glute development score",
      tier: "Gold",
      unlocked: true,
      progress: 100,
      icon: Trophy,
      category: "Performance"
    },
    {
      id: 12,
      name: "Core Queen",
      description: "Achieve 80+ core stability",
      tier: "Gold",
      unlocked: false,
      progress: 78,
      icon: Star,
      category: "Performance"
    },
    {
      id: 13,
      name: "Form First",
      description: "Complete 5 technique videos",
      tier: "Silver",
      unlocked: true,
      progress: 100,
      icon: Target,
      category: "Skill"
    },
    {
      id: 14,
      name: "Strength & Grace",
      description: "Hit PR on lower body compound",
      tier: "Gold",
      unlocked: false,
      progress: 85,
      icon: Zap,
      category: "Performance"
    },
  ];

  const universalBadges = [
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
      id: 3,
      name: "Diamond Elite",
      description: "Reach 95+ score in any muscle",
      tier: "Diamond",
      unlocked: false,
      progress: 97,
      icon: Diamond,
      category: "Performance"
    },
  ];

  const genderSpecificBadges = isFemale ? femaleSpecificBadges : maleSpecificBadges;
  const badges = [...universalBadges, ...genderSpecificBadges];

  // Continue with existing badges starting from Scan Specialist
  const additionalBadges = [
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

  const allBadges = [...badges, ...additionalBadges];

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
    if (streak >= 100) return "text-cyan-400 tier-glow animate-pulse";
    if (streak >= 50) return "text-red-400 energy-pulse";
    if (streak >= 30) return "text-orange-400 energy-pulse";
    if (streak >= 7) return "text-yellow-400";
    return "text-blue-400";
  };

  const getPotentialColor = () => "text-cyan-400";

  const getProgressBarGradient = (currentScore: number, potentialScore: number) => {
    const progressPercent = (currentScore / potentialScore) * 100;
    return progressPercent;
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

          {/* Overall Potential Score */}
          <Card className="tier-card tier-glow">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-foreground mb-4">
                Overall Potential
              </CardTitle>
              <div className={`text-6xl font-bold ${getPotentialColor()} tier-glow mb-4`}>
                {overallPotentialScore}
              </div>
              <Badge className={`${getTierBadge(overallPotentialScore).color} bg-transparent border-0 text-lg`}>
                {getTierBadge(overallPotentialScore).tier} Tier
              </Badge>
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
                  <Card 
                    key={muscle.name} 
                    className={`tier-card cursor-pointer transition-all duration-300 hover:scale-105 hover:tier-glow ${muscle.score >= 95 ? 'tier-glow' : ''}`}
                    onClick={() => setSelectedMuscleGroup(muscle)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <span className="font-medium text-foreground text-sm">{muscle.name}</span>
                        <div className={`text-2xl font-bold mt-2 ${tierInfo.color}`}>{muscle.score}</div>
                        <div className={`text-xs mt-1 ${tierInfo.color}`}>{tierInfo.tier}</div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Overall Improvement Tips */}
          <Card className="tier-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Overall Improvement Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                • Prioritize compound lifts that engage multiple muscle groups
              </div>
              <div className="text-sm text-muted-foreground">
                • Use progressive overload and track weekly improvements
              </div>
              <div className="text-sm text-muted-foreground">
                • Ensure adequate recovery, sleep, and protein intake for muscle growth
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid gap-4">
            {allBadges.map((badge) => {
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

      {/* Detailed Muscle Group Modal */}
      <Dialog open={!!selectedMuscleGroup} onOpenChange={() => setSelectedMuscleGroup(null)}>
        <DialogContent className="max-w-md bg-card border border-accent/20">
          {selectedMuscleGroup && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="text-foreground">{selectedMuscleGroup.name} Details</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedMuscleGroup(null)}
                    className="p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Score Overview */}
                <div className="text-center tier-card p-4">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {selectedMuscleGroup.score}
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">Current Score</div>
                  <Badge className={`${getTierBadge(selectedMuscleGroup.score).color} bg-transparent border-0`}>
                    {getTierBadge(selectedMuscleGroup.score).tier} Tier
                  </Badge>
                </div>

                {/* Historical Progression */}
                <div className="tier-card p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    Recent Progress
                  </h4>
                  <div className="flex justify-between items-center">
                    {selectedMuscleGroup.history.map((score: number, index: number) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-accent">{score}</div>
                        <div className="text-xs text-muted-foreground">
                          {index === 0 ? '3w ago' : index === 1 ? '2w ago' : 'Last week'}
                        </div>
                      </div>
                    ))}
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getPotentialColor()}`}>
                        {selectedMuscleGroup.score}
                      </div>
                      <div className="text-xs text-cyan-300/70">Current</div>
                    </div>
                  </div>
                </div>

                {/* Improvement Advice */}
                <div className="tier-card p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    Improvement Tips
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedMuscleGroup.advice}
                  </p>
                </div>

                {/* Related Badges */}
                <div className="tier-card p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    Related Badges
                  </h4>
                  <div className="space-y-2">
                    {allBadges
                      .filter(badge => badge.category === "Performance")
                      .slice(0, 2)
                      .map(badge => (
                        <div key={badge.id} className="flex items-center gap-3 p-2 rounded border border-accent/20">
                          <div className={`w-8 h-8 rounded-full bg-background border flex items-center justify-center ${
                            badge.unlocked ? 'border-accent' : 'border-muted'
                          }`}>
                            <badge.icon className={`w-4 h-4 ${getBadgeColor(badge.tier, badge.unlocked)}`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{badge.name}</div>
                            <div className="text-xs text-muted-foreground">{badge.description}</div>
                          </div>
                          {badge.unlocked && (
                            <Award className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgressBadges;