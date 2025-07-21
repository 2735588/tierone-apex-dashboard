import { Trophy, Star, Flame, Target, Award, Crown, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Badges = () => {
  const badges = [
    {
      id: 1,
      name: "Consistency King",
      tier: "Diamond",
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
      description: "Achieve 90+ scores in all muscle groups",
      progress: 5,
      total: 6,
      earned: false,
      icon: Crown,
      color: "text-tier-gold",
      bgColor: "from-tier-gold/20 to-yellow-600/20",
    },
    {
      id: 3,
      name: "Iron Beast",
      tier: "Silver",
      description: "Complete 100 total scans",
      progress: 100,
      total: 100,
      earned: true,
      icon: Shield,
      color: "text-gray-300",
      bgColor: "from-gray-300/20 to-gray-500/20",
    },
    {
      id: 4,
      name: "Tier Crusher",
      tier: "Bronze",
      description: "Reach TierScore of 2000+",
      progress: 2847,
      total: 2000,
      earned: true,
      icon: Trophy,
      color: "text-orange-400",
      bgColor: "from-orange-400/20 to-orange-600/20",
    },
    {
      id: 5,
      name: "Elite Performer",
      tier: "Gold",
      description: "Maintain top 100 global rank for 7 days",
      progress: 3,
      total: 7,
      earned: false,
      icon: Star,
      color: "text-tier-gold",
      bgColor: "from-tier-gold/20 to-yellow-600/20",
    },
    {
      id: 6,
      name: "Apex Predator",
      tier: "Diamond",
      description: "Reach #1 National Rank",
      progress: 0,
      total: 1,
      earned: false,
      icon: Zap,
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

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Badge Collection</h1>
        <p className="text-muted-foreground">Unlock achievements through dedication and performance</p>
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
        {badges.map((badge) => {
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
                    {badge.progress >= badge.total ? "COMPLETED" : `${badge.progress}/${badge.total}`}
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
    </div>
  );
};

export default Badges;