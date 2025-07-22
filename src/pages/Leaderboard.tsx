import { Crown, Trophy, Flag, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'national'>('global');

  const globalLeaderboard = [
    { rank: 1, name: "Marcus Steel", country: "🇺🇸", score: 3247, badge: "Diamond" },
    { rank: 2, name: "Viktor Petrov", country: "🇷🇺", score: 3195, badge: "Diamond" },
    { rank: 3, name: "Chen Wei", country: "🇨🇳", score: 3142, badge: "Diamond" },
    { rank: 4, name: "Alex Thompson", country: "🇺🇸", score: 3089, badge: "Gold" },
    { rank: 5, name: "Luis Rodriguez", country: "🇪🇸", score: 3034, badge: "Gold" },
    { rank: 6, name: "James Wilson", country: "🇬🇧", score: 2998, badge: "Gold" },
    { rank: 7, name: "Nikolai Volkov", country: "🇷🇺", score: 2956, badge: "Gold" },
    { rank: 8, name: "Ahmed Hassan", country: "🇪🇬", score: 2923, badge: "Gold" },
    { rank: 9, name: "David Kim", country: "🇰🇷", score: 2891, badge: "Gold" },
    { rank: 10, name: "Rafael Silva", country: "🇧🇷", score: 2847, badge: "Gold" },
  ];

  const nationalLeaderboard = [
    { rank: 1, name: "Marcus Steel", state: "CA", score: 3247, badge: "Diamond" },
    { rank: 2, name: "Alex Thompson", state: "TX", score: 3089, badge: "Gold" },
    { rank: 3, name: "James Wilson", state: "NY", score: 2998, badge: "Gold" },
    { rank: 4, name: "Michael Brown", state: "FL", score: 2876, badge: "Gold" },
    { rank: 5, name: "You", state: "CA", score: 2847, badge: "Gold", isUser: true },
    { rank: 6, name: "Ryan Davis", state: "WA", score: 2823, badge: "Silver" },
    { rank: 7, name: "Kevin Miller", state: "CO", score: 2798, badge: "Silver" },
    { rank: 8, name: "Tony Garcia", state: "AZ", score: 2745, badge: "Silver" },
    { rank: 9, name: "Chris Lee", state: "OR", score: 2712, badge: "Silver" },
    { rank: 10, name: "Matt Johnson", state: "NV", score: 2689, badge: "Silver" },
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Diamond": return "text-blue-400";
      case "Gold": return "text-tier-gold";
      case "Silver": return "text-gray-300";
      default: return "text-orange-400";
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-tier-gold" />;
    if (rank <= 3) return <Trophy className="w-4 h-4 text-tier-gold" />;
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
  };

  const currentData = activeTab === 'global' ? globalLeaderboard : nationalLeaderboard;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">Compete with the world's elite athletes</p>
      </div>

      {/* TierOne Crown Badge */}
      <div className="tier-card rounded-xl p-4 mb-6 text-center tier-glow">
        <Crown className="w-8 h-8 text-tier-gold mx-auto mb-2" />
        <h3 className="font-bold text-foreground">TierOne Elite Rankings</h3>
        <p className="text-sm text-muted-foreground">Top 10 physique athletes worldwide</p>
      </div>

      {/* Tab Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === 'global' ? 'tier' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('global')}
        >
          <Flag className="w-4 h-4 mr-2" />
          Global
        </Button>
        <Button
          variant={activeTab === 'national' ? 'tier' : 'ghost'}
          className="flex-1"
          onClick={() => setActiveTab('national')}
        >
          <MapPin className="w-4 h-4 mr-2" />
          National (US)
        </Button>
      </div>

      {/* User Rank Display (National only) */}
      {activeTab === 'national' && (
        <div className="tier-card rounded-xl p-4 mb-6 text-center">
          <div className="text-2xl font-bold text-accent">#12</div>
          <div className="text-sm text-muted-foreground">Your National Rank</div>
          <div className="text-xs text-tier-gold mt-1">Top 0.01% of athletes</div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-3">
        {currentData.map((athlete) => (
          <div
            key={athlete.rank}
            className={`
              tier-card rounded-xl p-4 transition-all duration-200 hover:scale-[1.02]
              ${athlete.isUser ? 'tier-glow border border-accent/30' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(athlete.rank)}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`font-bold ${athlete.isUser ? 'text-accent' : 'text-foreground'}`}>
                      {athlete.name}
                    </h4>
                    {athlete.rank <= 10 && (
                      <div className="w-2 h-2 bg-tier-gold rounded-full energy-pulse" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{activeTab === 'global' ? athlete.country : `${(athlete as any).state}`}</span>
                    <span className={`text-xs font-medium ${getBadgeColor(athlete.badge)}`}>
                      {athlete.badge}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-accent">{athlete.score.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">TierScore</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See How You Compare CTA */}
      <div className="mt-6">
        <Button variant="outline" className="w-full">
          <Trophy className="w-4 h-4 mr-2" />
          See How You Compare
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;