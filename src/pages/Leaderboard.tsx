import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronDown, ChevronRight, X } from "lucide-react";
import { BrandMark } from "@/components/Brand";
import { useDebounce } from "use-debounce";
import { getTierBadgeSrc } from "@/lib/tierScoreBadge";
import { bucketByTier, tierConfig, type Tier } from "@/lib/tiering";
import { fetchLeaderboard } from "@/services";

interface User {
  id: string;
  username: string;
  score: number;
  percentile?: number;
  lastWorkoutAt?: string;
  prCount?: number;
  avatar?: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTiers, setExpandedTiers] = useState<Record<Tier, boolean>>({
    bronze: true,
    silver: true,
    gold: true,
    diamond: true,
    emerald: true,
  });

  // Mock data for demonstration
  const mockUsers: User[] = [
    { id: "1", username: "Alex_Beast", score: 95, percentile: 0.5, prCount: 15, lastWorkoutAt: "2024-01-03" },
    { id: "2", username: "Nordic_Thor", score: 88, percentile: 2.1, prCount: 12, lastWorkoutAt: "2024-01-02" },
    { id: "3", username: "Aussie_Tank", score: 75, percentile: 15.3, prCount: 8, lastWorkoutAt: "2024-01-01" },
    { id: "4", username: "UK_Warrior", score: 65, percentile: 32.1, prCount: 6, lastWorkoutAt: "2023-12-30" },
    { id: "5", username: "Tokyo_Titan", score: 55, percentile: 55.8, prCount: 4, lastWorkoutAt: "2023-12-28" },
    { id: "6", username: "Berlin_Beast", score: 72, percentile: 25.4, prCount: 9, lastWorkoutAt: "2023-12-29" },
    { id: "7", username: "Brazil_Bull", score: 81, percentile: 8.7, prCount: 11, lastWorkoutAt: "2024-01-01" },
    { id: "8", username: "Maple_Muscle", score: 68, percentile: 28.9, prCount: 7, lastWorkoutAt: "2023-12-31" },
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleTier = (tier: Tier) => {
    setExpandedTiers(prev => ({ ...prev, [tier]: !prev[tier] }));
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? 
        <span key={i} className="bg-emerald-400/20 text-emerald-300 rounded px-0.5">{part}</span> : 
        part
    );
  };

  const filteredUsers = debouncedSearch.trim() 
    ? users.filter(user => 
        user.username.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : users;

  const tierBuckets = bucketByTier(filteredUsers);
  const tierOrder: Tier[] = ["bronze", "silver", "gold", "diamond", "emerald"];

  const UserRow = ({ user }: { user: User }) => {
    const tierName = tierConfig[user.score >= 90 && user.percentile && user.percentile <= 1 ? "emerald" : 
      user.score < 60 ? "bronze" :
      user.score < 70 ? "silver" :
      user.score < 80 ? "gold" : "diamond"];

    return (
      <div
        className="flex items-center justify-between p-4 bg-zinc-900/60 ring-1 ring-white/5 rounded-2xl mb-3 cursor-pointer hover:bg-zinc-800/60 transition-colors"
        onClick={() => handleUserClick(user.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleUserClick(user.id);
          }
        }}
      >
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-zinc-800 text-zinc-100 text-sm font-medium">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Badge 
            className={`w-6 h-6 rounded-full p-0 flex items-center justify-center ${tierName.bgColor} border-0`}
          >
            <img 
              src={getTierBadgeSrc(user.score, user.percentile)} 
              alt={tierName.name}
              className="w-4 h-4"
            />
          </Badge>
          <div>
            <div className="font-bold text-zinc-100">
              {debouncedSearch.trim() ? highlightMatch(user.username, debouncedSearch) : user.username}
            </div>
            <div className={`text-xs ${tierName.color}`}>
              {tierName.name} Tier
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-lg font-bold text-zinc-100">{user.score}</div>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-500" />
        </div>
      </div>
    );
  };

  const TierSection = ({ tier, users: tierUsers }: { tier: Tier, users: User[] }) => {
    const config = tierConfig[tier];
    const isExpanded = expandedTiers[tier];

    return (
      <div className="mb-6">
        <Collapsible open={isExpanded} onOpenChange={() => toggleTier(tier)}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-zinc-900/40 ring-1 ring-white/5 rounded-2xl hover:bg-zinc-800/40 transition-colors">
            <div className="flex items-center gap-3">
              <img 
                src={getTierBadgeSrc(tier === "bronze" ? 50 : tier === "silver" ? 65 : tier === "gold" ? 75 : tier === "diamond" ? 85 : 95, 
                  tier === "emerald" ? 0.5 : undefined)} 
                alt={config.name}
                className="w-8 h-8"
              />
              <div>
                <span className={`font-bold ${config.color}`}>{config.name}</span>
                {'glow' in config && config.glow && <span className="ml-2 text-emerald-400/60 text-xs">✨</span>}
              </div>
              <Badge variant="secondary" className="ml-2">
                {tierUsers.length}
              </Badge>
            </div>
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            {tierUsers.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                No users in this tier yet.
              </div>
            ) : (
              tierUsers.map(user => <UserRow key={user.id} user={user} />)
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/60 ring-1 ring-white/5 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-full animate-pulse" />
            <div className="w-6 h-6 bg-zinc-800 rounded-full animate-pulse" />
            <div>
              <div className="w-24 h-4 bg-zinc-800 rounded animate-pulse mb-1" />
              <div className="w-16 h-3 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-8 h-6 bg-zinc-800 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BrandMark size={24} />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-sm text-zinc-400">Compete with the world's elite</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-4 h-4" />
        <Input
          placeholder="Search users…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 bg-zinc-900/60 border-white/10 text-zinc-100 placeholder:text-zinc-500"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : debouncedSearch.trim() ? (
        // Search Results
        <div>
          <h2 className="text-lg font-semibold mb-4 text-zinc-100">
            Search Results ({filteredUsers.length})
          </h2>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-zinc-500 mb-4">No users found.</div>
              <button
                onClick={clearSearch}
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredUsers.map(user => <UserRow key={user.id} user={user} />)
          )}
        </div>
      ) : (
        // Tier Sections
        <div>
          {tierOrder.map(tier => (
            <TierSection key={tier} tier={tier} users={tierBuckets[tier]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;