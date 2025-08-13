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
import { BadgeModal } from "@/components/BadgeModal";
import { tierOneBadges, getBadgesByType } from "@/data/badges";
import bodySilhouette from "@/assets/body-silhouette.png";

const ProgressBadges = () => {
  const { gender } = useGender();
  const isFemale = gender === 'female';
  const [currentStreak, setCurrentStreak] = useState(36);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<any>(null);

  const muscleGroups = [
    { name: "Chest", key: "chest", score: 87, tier: "Gold", history: [82, 85, 87], advice: "Focus on progressive overload with bench press variations and incline movements for upper chest development." },
    { name: "Back", key: "back", score: 84, tier: "Gold", history: [79, 82, 84], advice: "Strengthen your back with pull-ups, rows, and deadlifts for better posture and overall strength." },
    { name: "Shoulders", key: "shoulders", score: 92, tier: "Gold", history: [88, 90, 92], advice: "Incorporate more rear delt work and overhead pressing for balanced shoulder development." },
    { name: "Arms", key: "arms", score: 78, tier: "Silver", history: [74, 76, 78], advice: "Increase training frequency with both compound and isolation exercises for arm growth." },
    { name: "Legs", key: "legs", score: 89, tier: "Gold", history: [85, 87, 89], advice: "Build powerful legs with squats, deadlifts, and unilateral training for balanced development." },
    { name: "Core", key: "core", score: 81, tier: "Gold", history: [77, 79, 81], advice: "Develop core stability with planks, anti-rotation exercises, and compound movements." }
  ];

  const overallPotentialScore = 98;

  // Get TierOne badges organized by category
  const allBadges = tierOneBadges;
  const streakBadges = getBadgesByType('streak');
  const sponsoredBadges = getBadgesByType('sponsored');
  const globalBadges = getBadgesByType('global');
  const muscleGroupBadges = getBadgesByType('muscle-group');
  
  // Group muscle group badges by muscle group
  const chestBadges = muscleGroupBadges.filter(badge => badge.category === 'Chest Performance');
  const backBadges = muscleGroupBadges.filter(badge => badge.category === 'Back Performance');
  const shouldersBadges = muscleGroupBadges.filter(badge => badge.category === 'Shoulders Performance');
  const armsBadges = muscleGroupBadges.filter(badge => badge.category === 'Arms Performance');
  const legsBadges = muscleGroupBadges.filter(badge => badge.category === 'Legs Performance');
  const coreBadges = muscleGroupBadges.filter(badge => badge.category === 'Core Performance');
  
  const badgeCategories = [
    { name: 'Consistency', badges: streakBadges, icon: Flame },
    { name: 'Brand Challenges', badges: sponsoredBadges, icon: Award },
    { name: 'Global Events', badges: globalBadges, icon: Trophy },
    { 
      name: 'Performance', 
      badges: [], // We'll handle performance badges separately with subcategories
      icon: Target,
      subcategories: [
        { name: 'Chest', badges: chestBadges },
        { name: 'Back', badges: backBadges },
        { name: 'Shoulders', badges: shouldersBadges },
        { name: 'Arms', badges: armsBadges },
        { name: 'Legs', badges: legsBadges },
        { name: 'Core', badges: coreBadges }
      ]
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

      <Tabs defaultValue="scores" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="scores" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Muscle Scores
          </TabsTrigger>
          <TabsTrigger value="streaks" className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Streaks
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Badges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="space-y-6">
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

          {/* Body Silhouette - Scan Style */}
          <Card className="tier-card">
            <CardContent className="p-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="scan-grid-bg absolute inset-0 rounded-full opacity-20" />
                  <div className="relative w-48 h-64 flex items-center justify-center">
                    <img 
                      src={bodySilhouette} 
                      alt="Body silhouette showing muscle groups"
                      className="w-full h-full object-contain body-scan-pulse filter brightness-110"
                    />
                    {/* Scanning effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent scan-line opacity-60" />
                  </div>
                  
                  {/* Progress ring around body */}
                  <div className="absolute inset-0 rounded-full border-2 border-accent/30 tier-glow animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Muscle Group Scores */}
          <Card className="tier-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Muscle Group Performance
              </CardTitle>
              <CardDescription>
                Track your strength and development across all major muscle groups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {muscleGroups.map((muscle, index) => {
                const glowIntensity = muscle.score >= 90 ? 'muscle-glow-high' : muscle.score >= 80 ? 'muscle-glow-medium' : muscle.score >= 70 ? 'muscle-glow-low' : '';
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer group hover:scale-[1.02] transition-all duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="font-semibold text-lg text-foreground group-hover:text-green-400 transition-colors">
                              {muscle.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                              {muscle.score}
                            </span>
                            <span className="text-sm text-muted-foreground font-medium">
                              /100
                            </span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700 ease-out ${glowIntensity}`}
                              style={{ width: `${muscle.score}%` }}
                            />
                          </div>
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse opacity-60" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="tier-card">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />
                          {muscle.name} Analysis
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-green-400 mb-2">
                            {muscle.score}
                          </div>
                          <p className="text-muted-foreground">Current Performance Score</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Progress Trend</h4>
                          <div className="flex items-center gap-2">
                            {muscle.history.map((score: number, i: number) => (
                              <div key={i} className="flex-1">
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-400 transition-all"
                                    style={{ width: `${(score / 100) * 100}%` }}
                                  />
                                </div>
                                <div className="text-xs text-center mt-1">{score}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Training Focus</h4>
                          <p className="text-sm text-muted-foreground">
                            {muscle.advice}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

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
                {category.subcategories ? (
                  <Badge variant="outline" className="ml-auto">
                    {category.subcategories.reduce((total, sub) => total + sub.badges.filter(badge => badge.isUnlocked).length, 0)}/
                    {category.subcategories.reduce((total, sub) => total + sub.badges.length, 0)}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="ml-auto">
                    {category.badges.filter(badge => badge.isUnlocked).length}/{category.badges.length}
                  </Badge>
                )}
              </div>
              
              {/* Handle Performance category with subcategories */}
              {category.subcategories ? (
                category.subcategories.map((subcategory, subIndex) => (
                  <div key={subIndex} className="space-y-3">
                    <div className="flex items-center gap-2 ml-6">
                      <div className="w-2 h-2 rounded-full bg-accent/60" />
                      <h4 className="text-md font-medium text-muted-foreground">{subcategory.name}</h4>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {subcategory.badges.filter(badge => badge.isUnlocked).length}/{subcategory.badges.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 ml-6">
                      {subcategory.badges.map((badge) => (
                        <BadgeModal key={badge.id} badge={badge}>
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
                        </BadgeModal>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                /* Handle regular categories without subcategories */
                <div className="grid grid-cols-3 gap-4">
                  {category.badges.map((badge) => (
                    <BadgeModal key={badge.id} badge={badge}>
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
                    </BadgeModal>
                  ))}
                </div>
              )}
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
