import { Trophy, Star, Flame, Target, Award, Crown, Zap, Shield, TrendingUp, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProgressBadges = () => {
  const [activeTab, setActiveTab] = useState<'progress' | 'badges'>('progress');

  const muscleProgressData = [
    { 
      muscle: "Chest", 
      current: 87, 
      previous: 82, 
      change: "+5", 
      trend: "up",
      weeklyData: [78, 80, 82, 84, 85, 87, 87] 
    },
    { 
      muscle: "Shoulders", 
      current: 92, 
      previous: 89, 
      change: "+3", 
      trend: "up",
      weeklyData: [85, 87, 89, 90, 91, 92, 92] 
    },
    { 
      muscle: "Arms", 
      current: 78, 
      previous: 70, 
      change: "+8", 
      trend: "up",
      weeklyData: [65, 67, 70, 73, 75, 77, 78] 
    },
    { 
      muscle: "Core", 
      current: 65, 
      previous: 63, 
      change: "+2", 
      trend: "up",
      weeklyData: [58, 60, 61, 63, 64, 65, 65] 
    },
    { 
      muscle: "Back", 
      current: 84, 
      previous: 78, 
      change: "+6", 
      trend: "up",
      weeklyData: [72, 74, 76, 78, 80, 82, 84] 
    },
    { 
      muscle: "Legs", 
      current: 71, 
      previous: 67, 
      change: "+4", 
      trend: "up",
      weeklyData: [63, 65, 67, 68, 69, 70, 71] 
    },
  ];

  const badges = [
    {
      id: 1,
      name: "Consistency King",
      tier: "Diamond",
      category: "Consistency",
      description: "Complete 30 consecutive training days",
      progress: 27,
      total: 30,
      earned: false,
      icon: Flame,
      color: "text-blue-400",
      bgColor: "from-blue-400/20 to-blue-600/20",
    },
    {
      id: 2,
      name: "Strength Demon",
      tier: "Gold",
      category: "Performance",
      description: "Deadlift over 200kg",
      progress: 180,
      total: 200,
      earned: false,
      icon: Crown,
      color: "text-tier-gold",
      bgColor: "from-tier-gold/20 to-yellow-600/20",
    },
    {
      id: 3,
      name: "Iron Beast",
      tier: "Silver",
      category: "Scan Milestones",
      description: "Complete 25 scans",
      progress: 25,
      total: 25,
      earned: true,
      icon: Shield,
      color: "text-gray-300",
      bgColor: "from-gray-300/20 to-gray-500/20",
    },
    {
      id: 4,
      name: "Progress Master",
      tier: "Gold",
      category: "Progress",
      description: "Improve any muscle score by +20%",
      progress: 15,
      total: 20,
      earned: false,
      icon: TrendingUp,
      color: "text-tier-gold",
      bgColor: "from-tier-gold/20 to-yellow-600/20",
    },
    {
      id: 5,
      name: "Elite Performer",
      tier: "Diamond",
      category: "Leaderboard Status",
      description: "Reach Top 500 Global",
      progress: 1847,
      total: 500,
      earned: false,
      icon: Star,
      color: "text-blue-400",
      bgColor: "from-blue-400/20 to-blue-600/20",
    },
  ];

  const getTierBadge = (tier: string, earned: boolean) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-bold";
    if (!earned) return `${baseClasses} bg-muted text-muted-foreground`;
    
    switch (tier) {
      case "Diamond":
        return `${baseClasses} bg-blue-400/20 text-blue-400 border border-blue-400/30`;
      case "Gold":
        return `${baseClasses} bg-tier-gold/20 text-tier-gold border border-tier-gold/30`;
      case "Silver":
        return `${baseClasses} bg-gray-300/20 text-gray-300 border border-gray-300/30`;
      case "Bronze":
        return `${baseClasses} bg-orange-400/20 text-orange-400 border border-orange-400/30`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const getProgressPercentage = (progress: number, total: number) => {
    return Math.min((progress / total) * 100, 100);
  };

  const badgeCategories = ["All", "Consistency", "Performance", "Progress", "Scan Milestones", "Leaderboard Status"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBadges = selectedCategory === "All" 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Progress & Badges</h1>
        <p className="text-muted-foreground">Track your journey and unlock achievements</p>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === 'progress' ? 'tier' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('progress')}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Progress
        </Button>
        <Button
          variant={activeTab === 'badges' ? 'tier' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('badges')}
        >
          <Award className="w-4 h-4 mr-2" />
          Badges
        </Button>
      </div>

      {activeTab === 'progress' ? (
        <>
          {/* Time Period Selector */}
          <div className="flex gap-2 mb-6">
            {["7D", "1M", "3M", "6M", "1Y"].map((period) => (
              <button
                key={period}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  period === "1M"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Overall Progress Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="tier-card rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-tier-gold mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">+4.7</div>
              <div className="text-xs text-muted-foreground">Avg Score Increase</div>
            </div>
            
            <div className="tier-card rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">6/6</div>
              <div className="text-xs text-muted-foreground">Groups Improving</div>
            </div>
          </div>

          {/* Body Map Interactive - Premium Feature */}
          <div className="tier-card rounded-xl p-4 mb-6 relative">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              Interactive Body Map
            </h3>
            
            <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <Crown className="w-12 h-12 text-tier-gold mx-auto mb-2" />
                <p className="text-foreground font-medium">Premium Feature</p>
                <p className="text-xs text-muted-foreground mt-1">Tap muscle groups for detailed analytics</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-tier-gold/10 to-accent/10 opacity-50" />
            </div>
          </div>

          {/* Muscle Group Progress */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Individual Muscle Groups</h3>
            
            {muscleProgressData.map((item, index) => (
              <div key={index} className="tier-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.muscle}</h4>
                    <div className="text-sm text-tier-gold">{item.change} this month</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{item.current}</div>
                    <div className="text-xs text-muted-foreground">Current Score</div>
                  </div>
                </div>
                
                {/* Mini trend line */}
                <div className="flex items-end gap-1 mb-2 h-8">
                  {item.weeklyData.map((value, i) => (
                    <div
                      key={i}
                      className="bg-accent/60 rounded-sm flex-1"
                      style={{ height: `${(value / 100) * 100}%` }}
                    />
                  ))}
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="performance-bar h-full rounded-full" 
                    style={{ width: `${item.current}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Badge Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {badgeCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="tier-card rounded-xl p-4 text-center">
              <Award className="w-6 h-6 text-tier-gold mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">
                {badges.filter(b => b.earned).length}
              </div>
              <div className="text-xs text-muted-foreground">Badges Earned</div>
            </div>
            
            <div className="tier-card rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">
                {Math.round((badges.filter(b => b.earned).length / badges.length) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Completion</div>
            </div>
          </div>

          {/* Badge Grid */}
          <div className="space-y-4">
            {filteredBadges.map((badge) => {
              const IconComponent = badge.icon;
              const progressPercent = getProgressPercentage(badge.progress, badge.total);
              
              return (
                <div 
                  key={badge.id}
                  className={`
                    tier-card rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]
                    ${badge.earned ? 'tier-glow' : 'opacity-75'}
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        bg-gradient-to-br ${badge.bgColor}
                        ${badge.earned ? 'tier-glow' : ''}
                      `}>
                        <IconComponent className={`w-6 h-6 ${badge.color}`} />
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-foreground">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        <div className="text-xs text-accent mt-1">{badge.category}</div>
                      </div>
                    </div>
                    
                    <div className={getTierBadge(badge.tier, badge.earned)}>
                      {badge.tier}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className={badge.earned ? "text-accent" : "text-foreground"}>
                        {badge.earned ? "COMPLETED" : `${badge.progress}/${badge.total}`}
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`
                          h-full rounded-full transition-all duration-500
                          ${badge.earned ? 'performance-bar' : 'bg-accent/60'}
                        `}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Last Updated */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        Last updated: Today, 2:30 PM
      </div>
    </div>
  );
};

export default ProgressBadges;