import { Trophy, Users, Medal, Crown } from "lucide-react";

interface LeaderEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
}

export const LeaderboardTab = () => {
  const topUsers: LeaderEntry[] = [
    { rank: 1, name: "Alex M.", score: 2847, avatar: "🔥" },
    { rank: 2, name: "Jordan K.", score: 2734, avatar: "💪" },
    { rank: 3, name: "Casey R.", score: 2698, avatar: "⚡" },
    { rank: 4, name: "Morgan L.", score: 2543, avatar: "🎯" },
    { rank: 5, name: "Riley P.", score: 2487, avatar: "🚀" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-4 h-4 text-tier-gold" />;
      case 2: return <Medal className="w-4 h-4 text-tier-silver" />;
      case 3: return <Medal className="w-4 h-4 text-tier-bronze" />;
      default: return <span className="text-muted-foreground font-bold">#{rank}</span>;
    }
  };

  return (
    <div className="tier-card rounded-xl p-4 w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-tier-gold" />
        <h3 className="font-bold text-foreground">Global Leaders</h3>
        <Users className="w-4 h-4 text-muted-foreground ml-auto" />
      </div>
      
      {/* Leaderboard entries */}
      <div className="space-y-3">
        {topUsers.map((user) => (
          <div 
            key={user.rank}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
              user.rank <= 3 ? 'tier-glow' : ''
            }`}
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-8">
              {getRankIcon(user.rank)}
            </div>
            
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
              {user.avatar}
            </div>
            
            {/* Name and score */}
            <div className="flex-1">
              <div className="font-semibold text-sm text-foreground">{user.name}</div>
              <div className="text-xs text-muted-foreground">TierScore</div>
            </div>
            
            {/* Score */}
            <div className="text-right">
              <div className="font-bold text-accent">{user.score.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View all button */}
      <div className="mt-4 pt-3 border-t border-border">
        <button className="w-full text-sm text-accent hover:text-accent/80 transition-colors">
          View Full Leaderboard →
        </button>
      </div>
    </div>
  );
};