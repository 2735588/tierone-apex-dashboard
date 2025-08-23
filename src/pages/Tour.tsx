import { useState } from "react";
import { Flame, Plus, Trophy, Calendar, Target, Bell, Settings, ChevronRight, Zap, Award, Users, Clock, Camera, Crown, Medal, Lock, Star, Globe, Flag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeHex } from "@/components/BadgeHex";
import { BadgeModal } from "@/components/BadgeModal";
import { TierBadge } from "@/components/TierBadge";
import { tierOneBadges } from "@/data/badges";
import bodyImage from "@/assets/body-silhouette.png";

const Tour = () => {
  const [currentStreak] = useState(7);
  const [currentQuote] = useState("Every workout is a step closer to your best self");

  // Static sample score object matching services.ts shape
  const sampleScore = {
    overall_score: 78,
    tier: "Platinum" as const,
    bodyfat_pct: 14,
    muscle_scores: [
      { muscle_group: "Chest", tier_score: 82, percentile: 88 },
      { muscle_group: "Back", tier_score: 76, percentile: 80 },
      { muscle_group: "Quads", tier_score: 84, percentile: 90 }
    ]
  };

  // Mock scan stats
  const daysSinceLastScan = 3;
  const lastTierScore = 645;
  const nationalRank = 2314;
  const scansCompleted = 2;
  const nextMilestone = 3;
  const milestoneProgress = (scansCompleted / nextMilestone) * 100;

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, name: "Alex_Beast", score: 774, country: "🇺🇸", tier: "Diamond" },
    { rank: 2, name: "Nordic_Thor", score: 763, country: "🇳🇴", tier: "Diamond" },
    { rank: 3, name: "Aussie_Tank", score: 754, country: "🇦🇺", tier: "Diamond" },
    { rank: 4, name: "UK_Warrior", score: 745, country: "🇬🇧", tier: "Gold" },
    { rank: 5, name: "Tokyo_Titan", score: 742, country: "🇯🇵", tier: "Gold" },
    { rank: 6, name: "Berlin_Beast", score: 735, country: "🇩🇪", tier: "Gold" },
    { rank: 7, name: "Brazil_Bull", score: 726, country: "🇧🇷", tier: "Gold" },
    { rank: 8, name: "Maple_Muscle", score: 716, country: "🇨🇦", tier: "Gold" },
    { rank: 9, name: "Kiwi_King", score: 678, country: "🇳🇿", tier: "Gold" },
    { rank: 10, name: "Auckland_Alpha", score: 666, country: "🇳🇿", tier: "Gold" }
  ];

  const getStreakIntensity = (streak: number) => {
    if (streak >= 100) return "text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.8)]";
    if (streak >= 50) return "text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]";
    if (streak >= 25) return "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]";
    if (streak >= 10) return "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]";
    if (streak >= 5) return "text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.3)]";
    return "text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.2)]";
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Diamond": return "text-cyan-400";
      case "Gold": return "text-yellow-400";
      case "Silver": return "text-gray-300";
      default: return "text-orange-400";
    }
  };

  const getTopThreeGlow = (rank: number) => {
    if (rank === 1) return "tier-glow border-yellow-400/50 shadow-yellow-400/20";
    if (rank === 2) return "tier-glow border-gray-300/50 shadow-gray-300/20";
    if (rank === 3) return "tier-glow border-orange-400/50 shadow-orange-400/20";
    return "";
  };

  const LeaderboardCard = ({ user }: { user: any }) => (
    <Card className={`tier-card mb-2 transition-all duration-200 ${getTopThreeGlow(user.rank)}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              user.rank <= 3 ? 'bg-gradient-primary text-primary-foreground tier-glow' : 'bg-accent/20 text-accent border border-accent/30 tier-glow'
            }`}>
              {user.rank <= 3 ? (
                user.rank === 1 ? <Crown className="w-4 h-4" /> :
                user.rank === 2 ? <Trophy className="w-4 h-4" /> :
                <Medal className="w-4 h-4" />
              ) : (
                user.rank
              )}
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground text-sm">{user.name}</span>
                <span className="text-base">{user.country}</span>
              </div>
              <div className={`text-xs font-medium ${getTierColor(user.tier)}`}>
                {user.tier} Tier
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-accent">{user.score}</div>
            <div className="text-xs text-muted-foreground">TierScore</div>
            <Button variant="ghost" size="sm" className="mt-1 text-xs h-5 px-2" disabled>
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Filter badges for tour - mark earned badges
  const earnedBadgeIds = ['first-scan', 'streak-7'];
  const tourBadges = tierOneBadges.map(badge => ({
    ...badge,
    isUnlocked: earnedBadgeIds.includes(badge.id)
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground text-center">TierOne Product Tour (Read-Only)</h1>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <a href="#home" className="text-accent hover:text-accent/80 transition-colors">1. Home Dashboard</a>
            <a href="#scan-before" className="text-accent hover:text-accent/80 transition-colors">2. Scan (Before)</a>
            <a href="#scan-after" className="text-accent hover:text-accent/80 transition-colors">3. Scan (After)</a>
            <a href="#leaderboard" className="text-accent hover:text-accent/80 transition-colors">4. Leaderboard</a>
            <a href="#achievements" className="text-accent hover:text-accent/80 transition-colors">5. Achievements</a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-16">
        
        {/* 1. Home Section */}
        <section id="home" className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground">1. Home Dashboard</h2>
          
          <div className="bg-background border border-border/50 rounded-xl overflow-hidden">
            {/* Status bar simulation */}
            <div className="flex justify-between items-center px-6 py-2 text-xs text-muted-foreground bg-card/30">
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

              <div className="flex items-center gap-2">          
                <Button variant="ghost" size="sm" className="relative" disabled>
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full energy-pulse"></div>
                </Button>
                
                <Button variant="ghost" size="sm" disabled>
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-4 space-y-8">
              
              {/* Centered Large Streak Tracker */}
              <div className="flex justify-center">
                <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm border border-accent/30 rounded-2xl px-8 py-6 tier-glow">
                  <Flame className={`w-12 h-12 ${getStreakIntensity(currentStreak)} transition-all duration-500`} />
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Current Streak</div>
                    <div className="text-4xl font-bold text-accent tier-glow">{currentStreak}</div>
                    <div className="text-sm text-muted-foreground">days strong</div>
                  </div>
                </div>
              </div>
              
              {/* Workout Log CTA */}
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Ready to dominate today?</h2>
                  <p className="text-muted-foreground">Log your workout and keep the momentum going</p>
                </div>
                
                <Button
                  disabled
                  className="w-full max-w-sm bg-gradient-primary text-primary-foreground font-bold text-xl rounded-2xl tier-glow h-16"
                >
                  <Plus className="w-7 h-7 mr-3" />
                  Log Today's Workout
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  disabled
                  className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 flex-col gap-2"
                >
                  <Target className="w-6 h-6 text-accent" />
                  <span className="text-xs font-medium">Body Scan</span>
                </Button>
                
                <Button
                  variant="outline"
                  disabled
                  className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 flex-col gap-2"
                >
                  <Trophy className="w-6 h-6 text-accent" />
                  <span className="text-xs font-medium">Leaderboard</span>
                </Button>

                <Button
                  variant="outline"
                  disabled
                  className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 flex-col gap-2"
                >
                  <Award className="w-6 h-6 text-accent" />
                  <span className="text-xs font-medium">Achievements</span>
                </Button>
              </div>

              {/* Motivational Quote */}
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-4 text-center">
                <p className="text-muted-foreground italic font-medium">
                  "{currentQuote}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Scan Before Section */}
        <section id="scan-before" className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground">2. Scan (Before) - Guided Capture</h2>
          
          <div className="bg-background border border-border/50 rounded-xl overflow-hidden">
            {/* Status bar simulation */}
            <div className="h-6 bg-background" />
            
            {/* Header */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center tier-glow">
                    <span className="text-sm font-bold text-primary-foreground">T1</span>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">Body Scan</h1>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col items-center px-6 py-8 space-y-8">
              
              {/* 3D Body Preview */}
              <div className="relative">
                <div className="scan-grid-bg absolute inset-0 rounded-full opacity-20" />
                <div className="relative w-48 h-64 flex items-center justify-center">
                  <img 
                    src={bodyImage} 
                    alt="Body Silhouette" 
                    className="w-full h-full object-contain body-scan-pulse filter brightness-110"
                  />
                  {/* Scanning effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent scan-line opacity-60" />
                </div>
                
                {/* Progress ring around body */}
                <div className="absolute inset-0 rounded-full border-2 border-accent/30 tier-glow animate-pulse" />
              </div>

              {/* Scan Stats */}
              <div className="w-full max-w-sm space-y-4">
                <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-xl p-4">
                  <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">Current Tier Score</div>
                    <div className="text-3xl font-bold text-accent tier-glow">{lastTierScore}</div>
                    <div className="text-xs text-muted-foreground">Ranked #{nationalRank} NZ</div>
                  </div>
                </div>

                {/* Days Since Last Scan */}
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground">Last Scan</div>
                      <div className="text-xs text-muted-foreground">{daysSinceLastScan} days ago</div>
                    </div>
                    <Zap className="w-5 h-5 text-accent energy-pulse" />
                  </div>
                  <div className="mt-2 text-xs text-accent font-medium">
                    Ready for your next breakthrough? 💪
                  </div>
                </div>

                {/* Progress to Next Milestone */}
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-foreground">Scan Progress</div>
                      <div className="text-xs text-muted-foreground">{scansCompleted}/{nextMilestone}</div>
                    </div>
                    <Progress value={milestoneProgress} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Next tier update unlocks at your {nextMilestone}rd scan
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Scan Button */}
              <div className="w-full max-w-sm pt-4">
                <Button
                  disabled
                  className="w-full h-16 bg-gradient-primary text-primary-foreground font-bold text-lg rounded-2xl tier-glow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Camera className="w-5 h-5" />
                    </div>
                    <span>START SCAN</span>
                    <Target className="w-5 h-5 energy-pulse" />
                  </div>
                </Button>
                
                <div className="text-center text-xs text-muted-foreground mt-3">
                  Position yourself in good lighting for best results
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Scan After Section */}
        <section id="scan-after" className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground">3. Scan (After) - Sample Results</h2>
          
          <div className="bg-background border border-border/50 rounded-xl p-6">
            <div className="flex flex-col items-center space-y-8">
              
              {/* Overall Score Display */}
              <div className="text-center">
                <TierBadge 
                  score={sampleScore.overall_score} 
                  rank={sampleScore.tier} 
                  percentile={15} 
                />
              </div>

              {/* Body Fat Percentage */}
              <div className="bg-card/50 backdrop-blur-sm border border-accent/20 rounded-xl p-4 w-full max-w-sm">
                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">Body Fat Percentage</div>
                  <div className="text-2xl font-bold text-accent">{sampleScore.bodyfat_pct}%</div>
                  <div className="text-xs text-muted-foreground">Excellent range for your goals</div>
                </div>
              </div>

              {/* Muscle Group Scores */}
              <div className="w-full max-w-sm space-y-4">
                <h3 className="text-lg font-semibold text-foreground text-center">Muscle Group Breakdown</h3>
                <div className="space-y-3">
                  {sampleScore.muscle_scores.map((muscle, index) => (
                    <div key={index} className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-foreground">{muscle.muscle_group}</div>
                        <div className="text-sm font-bold text-accent">{muscle.tier_score}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">Top {100 - muscle.percentile}% globally</div>
                        <Progress value={muscle.tier_score} className="w-24 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Create Share Card Button */}
              <Button
                disabled
                className="w-full max-w-sm bg-gradient-primary text-primary-foreground font-bold rounded-2xl tier-glow h-12"
              >
                Create Share Card
              </Button>
            </div>
          </div>
        </section>

        {/* 4. Leaderboard Section */}
        <section id="leaderboard" className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground">4. Leaderboard</h2>
          
          <div className="bg-background border border-border/50 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-8 h-8 text-accent tier-glow energy-pulse" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
                <p className="text-muted-foreground">Compete with the world's elite</p>
              </div>
            </div>

            <Tabs defaultValue="global" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="global" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Global
                </TabsTrigger>
                <TabsTrigger value="national" className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  National (NZ)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="global">
                {/* Your Position */}
                <Card className="tier-card mb-8 border-accent/30 bg-accent/5 tier-glow">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">#1,847</div>
                      <div className="text-base text-muted-foreground mb-1">Your Global Rank</div>
                      <div className="text-accent font-semibold text-lg">Top 4% Worldwide</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Global Leaders */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400 tier-glow" />
                    Top 10 Global Athletes
                  </h3>
                  <div className="space-y-1">
                    {leaderboardData.map((user) => (
                      <LeaderboardCard key={user.rank} user={user} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="national">
                {/* Your National Position */}
                <Card className="tier-card mb-8 border-primary/30 bg-primary/5 tier-glow">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">#12</div>
                      <div className="text-base text-muted-foreground mb-1">Your National Rank (NZ)</div>
                      <div className="text-primary font-semibold text-lg">Top 8% New Zealand</div>
                    </div>
                  </CardContent>
                </Card>

                {/* National Leaders */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary tier-glow" />
                    Top New Zealand Athletes
                  </h3>
                  <div className="space-y-1">
                    {leaderboardData.slice(8, 10).map((user) => (
                      <LeaderboardCard key={user.rank} user={user} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 5. Achievements Section */}
        <section id="achievements" className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground">5. Achievements</h2>
          
          <div className="bg-background border border-border/50 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-accent tier-glow energy-pulse" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Badge Collection</h1>
                  <p className="text-muted-foreground">Your achievement showcase</p>
                </div>
              </div>
            </div>

            {/* Earned vs Total Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card className="tier-card text-center">
                <CardContent className="p-4">
                  <Award className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-accent">{earnedBadgeIds.length}</div>
                  <div className="text-xs text-muted-foreground">Earned</div>
                </CardContent>
              </Card>
              <Card className="tier-card text-center">
                <CardContent className="p-4">
                  <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <div className="text-xl font-bold text-muted-foreground">{tierOneBadges.length - earnedBadgeIds.length}</div>
                  <div className="text-xs text-muted-foreground">Locked</div>
                </CardContent>
              </Card>
            </div>

            {/* Badge Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {tourBadges.map((badge) => (
                <BadgeModal key={badge.id} badge={badge}>
                  <div className="cursor-pointer relative">
                    <BadgeHex
                      name={badge.name}
                      description={badge.description}
                      type={badge.type}
                      glow={badge.glow}
                      imageUrl={badge.imageUrl}
                      isUnlocked={badge.isUnlocked}
                      progress={badge.progress}
                      size="sm"
                    />
                    {/* Lock overlay for locked badges */}
                    {!badge.isUnlocked && (
                      <div className="absolute top-0 right-0 w-4 h-4 bg-muted-foreground rounded-full flex items-center justify-center">
                        <Lock className="w-2 h-2 text-background" />
                      </div>
                    )}
                  </div>
                </BadgeModal>
              ))}
            </div>

            {/* Earned Badges Showcase */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 tier-glow" />
                Recently Earned
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {tourBadges.filter(badge => badge.isUnlocked).map((badge) => (
                  <Card key={badge.id} className="tier-card border-accent/30 bg-accent/5">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <BadgeHex
                          name={badge.name}
                          description=""
                          type={badge.type}
                          glow={badge.glow}
                          imageUrl={badge.imageUrl}
                          isUnlocked={true}
                          size="sm"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">{badge.name}</h4>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                          {badge.earnedDate && (
                            <p className="text-xs text-accent mt-1">
                              Earned {new Date(badge.earnedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            This is a read-only tour showcasing TierOne's key features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tour;