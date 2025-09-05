import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronRight, X } from "lucide-react";
import { BrandMark } from "@/components/Brand";
import { useDebounce } from "use-debounce";
import { filterAndSort, ALL_FILTER_OPTS, TIER_OPTS, PR_OPTS, type FilterOpt } from "@/lib/leaderboardTier";
import { fetchLeaderboard } from "@/services";

interface User {
  id: string;
  username: string;
  score: number;
  percentile?: number;
  lastWorkoutAt?: string;
  prCount?: number;
  avatar?: string;
  prs?: Record<string, number>;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FilterOpt>(() => {
    const saved = localStorage.getItem('leaderboard-filter');
    return (saved as FilterOpt) || "Gold";
  });

  // Mock data for demonstration
  const mockUsers: User[] = [
    { id: "1", username: "Alex_Beast", score: 95, percentile: 0.5, prCount: 15, lastWorkoutAt: "2024-01-03", prs: { "Back Squat": 500, "Bench Press": 315, "Deadlift": 625, "Overhead Press": 225 } },
    { id: "2", username: "Nordic_Thor", score: 88, percentile: 2.1, prCount: 12, lastWorkoutAt: "2024-01-02", prs: { "Back Squat": 455, "Bench Press": 285, "Deadlift": 565, "Overhead Press": 195 } },
    { id: "3", username: "Aussie_Tank", score: 75, percentile: 15.3, prCount: 8, lastWorkoutAt: "2024-01-01", prs: { "Back Squat": 405, "Bench Press": 255, "Deadlift": 495, "Overhead Press": 165 } },
    { id: "4", username: "UK_Warrior", score: 65, percentile: 32.1, prCount: 6, lastWorkoutAt: "2023-12-30", prs: { "Back Squat": 365, "Bench Press": 225, "Deadlift": 455, "Overhead Press": 145 } },
    { id: "5", username: "Tokyo_Titan", score: 55, percentile: 55.8, prCount: 4, lastWorkoutAt: "2023-12-28", prs: { "Back Squat": 325, "Bench Press": 195, "Deadlift": 405, "Overhead Press": 125 } },
    { id: "6", username: "Berlin_Beast", score: 72, percentile: 25.4, prCount: 9, lastWorkoutAt: "2023-12-29", prs: { "Back Squat": 385, "Bench Press": 245, "Deadlift": 475, "Overhead Press": 155 } },
    { id: "7", username: "Brazil_Bull", score: 81, percentile: 8.7, prCount: 11, lastWorkoutAt: "2024-01-01", prs: { "Back Squat": 435, "Bench Press": 275, "Deadlift": 535, "Overhead Press": 185 } },
    { id: "8", username: "Maple_Muscle", score: 68, percentile: 28.9, prCount: 7, lastWorkoutAt: "2023-12-31", prs: { "Back Squat": 355, "Bench Press": 215, "Deadlift": 435, "Overhead Press": 135 } },
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filter: FilterOpt) => {
    setSelectedFilter(filter);
    localStorage.setItem('leaderboard-filter', filter);
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

  const filteredUsers = filterAndSort(users, selectedFilter, debouncedSearch);

  const UserRow = ({ user }: { user: User }) => {
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
          <div className="font-bold text-zinc-100">
            {debouncedSearch.trim() ? highlightMatch(user.username, debouncedSearch) : user.username}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-zinc-500" />
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
      <div className="relative mb-4">
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

      {/* Filter Selector */}
      <div className="mb-6">
        <Select value={selectedFilter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full bg-zinc-900/60 border-white/10 text-zinc-100">
            <SelectValue placeholder="Select filter" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-white/10">
            {/* Tier Options */}
            {TIER_OPTS.map(tier => (
              <SelectItem key={tier} value={tier} className="text-zinc-100 focus:bg-zinc-800">
                🏆 {tier}
              </SelectItem>
            ))}
            {/* PR Options */}
            {PR_OPTS.map(pr => (
              <SelectItem key={pr} value={pr} className="text-zinc-100 focus:bg-zinc-800">
                💪 {pr} Leaderboard
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div>
          {debouncedSearch.trim() && (
            <h2 className="text-lg font-semibold mb-4 text-zinc-100">
              Search Results ({filteredUsers.length})
            </h2>
          )}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-zinc-500 mb-4">
                {debouncedSearch.trim() ? "No users found." : 
                 PR_OPTS.includes(selectedFilter as any) ? 
                   `No users with ${selectedFilter} records yet.` : 
                   "No users in this tier yet."}
              </div>
              {debouncedSearch.trim() && (
                <button
                  onClick={clearSearch}
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredUsers.map(user => <UserRow key={user.id} user={user} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;