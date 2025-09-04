import { useState, useRef, useEffect } from "react";
import { Flame, Trophy, Target, Clock, Diamond, Crown, Star, Zap, TrendingUp, Award, X, BarChart3 } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import HexBadge from "@/components/HexBadge";
import { BadgeModal } from "@/components/BadgeModal";
import { tierOneBadges, getBadgesByType } from "@/data/badges";
import bodySilhouette from "@/assets/body-silhouette.png";
import { ProfileTop } from "@/components/ProfileTop";
import { PerformanceSummary } from "@/components/PerformanceSummary";
import { MuscleGroupList } from "@/components/MuscleGroupList";
import { SharePanel } from "@/components/SharePanel";
import { ShareProgressCard } from "@/components/ShareProgressCard";
import { shareElement } from "@/hooks/useShare";

const ProgressBadges = () => {
  const { gender } = useGender();
  const isFemale = gender === 'female';
  const [currentStreak, setCurrentStreak] = useState(36);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("scores");
  const storyRef = useRef<HTMLDivElement>(null);

  // URL persistence
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && ['scores', 'streaks', 'badges'].includes(tab)) {
      setActiveTab(tab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(window.location.search);
    const tabMap: Record<string, string> = {
      'scores': 'muscles',
      'streaks': 'streaks', 
      'badges': 'badges'
    };
    params.set('tab', tabMap[value] || 'muscles');
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  const muscleGroups = [
    { name: "Chest", score: 87, delta: +2 },
    { name: "Back", score: 84, delta: +1 },
    { name: "Shoulders", score: 92, delta: +3 },
    { name: "Arms", score: 78, delta: 0 },
    { name: "Legs", score: 89, delta: +2 },
    { name: "Core", score: 81, delta: +1 }
  ];

  const handleShare = async () => {
    if (storyRef.current) {
      await shareElement(storyRef.current, "tierone-progress.png");
    }
  };

  const handleNewScan = () => {
    // Navigate to scan page
    console.log("Navigate to new scan");
  };

  const overallPotentialScore = 98;

  // Get TierOne badges organized by category
  const allBadges = tierOneBadges;
  const streakBadges = getBadgesByType('streak');
  const tierscoreBadges = getBadgesByType('tierscore');
  const muscleGroupBadges = getBadgesByType('muscle-group');
  
  // Group muscle group badges by muscle group
  const chestBadges = muscleGroupBadges.filter(badge => badge.category === 'Chest Performance');
  const backBadges = muscleGroupBadges.filter(badge => badge.category === 'Back Performance');
  const shouldersBadges = muscleGroupBadges.filter(badge => badge.category === 'Shoulders Performance');
  const armsBadges = muscleGroupBadges.filter(badge => badge.category === 'Arms Performance');
  const legsBadges = muscleGroupBadges.filter(badge => badge.category === 'Legs Performance');
  const coreBadges = muscleGroupBadges.filter(badge => badge.category === 'Core Performance');
  
  const badgeCategories = [
    { name: 'TierScore', badges: tierscoreBadges, icon: Target },
    { name: 'Consistency', badges: streakBadges, icon: Flame },
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
    <div className="min-h-screen bg-background text-foreground pb-24">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-center px-6 mb-6">
          <TabsList className="grid grid-cols-3">
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
        </div>

        <TabsContent value="scores" className="space-y-4">
          {/* 1) Top profile header */}
          <ProfileTop name="Braedon Williams" athlete="Hybrid Athlete" />
          
          {/* 1.5) TierScore Badge */}
          <div className="flex justify-center px-6">
            {(() => {
              const tierScore = 65; // Current user's TierScore
              const isTop1Percent = false; // Would be calculated from backend
              
              let badgeName = 'TierScore Bronze';
              if (isTop1Percent) {
                badgeName = 'TierScore Emerald';
              } else if (tierScore >= 80) {
                badgeName = 'TierScore Diamond';
              } else if (tierScore >= 70) {
                badgeName = 'TierScore Gold';
              } else if (tierScore >= 60) {
                badgeName = 'TierScore Silver';
              }
              
              const tierscoreBadge = tierscoreBadges.find(badge => badge.name === badgeName);
              
              return tierscoreBadge ? (
                <HexBadge
                  src={tierscoreBadge.imageUrl || '/placeholder-badge.png'}
                  size={160}
                  glow={tierscoreBadge.glow === 'emerald' ? 'emerald' : tierscoreBadge.glow === 'diamond' ? 'blue' : tierscoreBadge.glow}
                  alt={`${badgeName} Badge`}
                  isUnlocked={true}
                />
              ) : null;
            })()}
          </div>
          
          {/* 2) Joined summary: TierScore (hero) + Overall Potential */}
          <div className="px-6">
            <PerformanceSummary
              potentialScore={98}
              potentialTier="Diamond Tier"
              potentialDelta={+3}
              tierScore={72}
              percentileLabel="Top 30%"
              globalRank={4821}
              nationalRank={312}
              updated="3 days ago"
              onShare={handleShare}
              onViewLeaderboards={() => console.log("View leaderboards")}
              onHowItWorks={() => console.log("Show how TierScore works")}
            />
          </div>
          
          {/* 3) Muscle Group Performance */}
          <div className="px-6">
            <MuscleGroupList data={muscleGroups} />
          </div>

          {/* 4) Share panel after muscle list */}
          <SharePanel onShare={handleShare} />

          {/* Offscreen share card */}
          <div className="fixed -left-[9999px] top-0">
            <ShareProgressCard
              ref={storyRef} 
              variant="story"
              name="Braedon Williams" 
              athlete="Hybrid Athlete"
              score={98} 
              tier="Diamond Tier"
              muscles={[
                {name:"Shoulders",score:92},
                {name:"Legs",score:89},
                {name:"Chest",score:87}
              ]}
            />
          </div>
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
                            <div className="flex flex-col items-center">
                              <HexBadge
                                src={badge.imageUrl || '/placeholder-badge.png'}
                                size={80}
                              glow={badge.isUnlocked ? (badge.glow === 'bronze' ? 'bronze' : badge.glow === 'silver' ? 'silver' : badge.glow === 'gold' ? 'gold' : badge.glow === 'diamond' ? 'blue' : badge.glow === 'emerald' ? 'green' : 'green') : 'none'}
                                alt={badge.name}
                                isUnlocked={badge.isUnlocked}
                              />
                              <div className="mt-2 text-xs font-semibold text-zinc-200 truncate max-w-[120px]">
                                {badge.name}
                              </div>
                            </div>
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
                        <div className="flex flex-col items-center">
                          <HexBadge
                            src={badge.imageUrl || '/placeholder-badge.png'}
                            size={80}
                            glow={badge.isUnlocked ? (badge.glow === 'bronze' ? 'bronze' : badge.glow === 'silver' ? 'silver' : badge.glow === 'gold' ? 'gold' : badge.glow === 'diamond' ? 'blue' : badge.glow === 'emerald' ? 'green' : 'green') : 'none'}
                            alt={badge.name}
                            isUnlocked={badge.isUnlocked}
                          />
                          <div className="mt-2 text-xs font-semibold text-zinc-200 truncate max-w-[120px]">
                            {badge.name}
                          </div>
                        </div>
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
