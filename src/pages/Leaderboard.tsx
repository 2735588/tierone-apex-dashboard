import { Crown, Trophy, Medal, Users, Globe, Flag, Filter, Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Leaderboard = () => {
  const [muscleFilter, setMuscleFilter] = useState("overall");

  const globalLeaders = [
    { rank: 1, name: "Alex_Beast", score: 774, country: "🇺🇸", tier: "Diamond" },
    { rank: 2, name: "Nordic_Thor", score: 763, country: "🇳🇴", tier: "Diamond" },
    { rank: 3, name: "Aussie_Tank", score: 754, country: "🇦🇺", tier: "Diamond" },
    { rank: 4, name: "UK_Warrior", score: 745, country: "🇬🇧", tier: "Gold" },
    { rank: 5, name: "Tokyo_Titan", score: 742, country: "🇯🇵", tier: "Gold" },
    { rank: 6, name: "Berlin_Beast", score: 735, country: "🇩🇪", tier: "Gold" },
    { rank: 7, name: "Brazil_Bull", score: 726, country: "🇧🇷", tier: "Gold" },
    { rank: 8, name: "Maple_Muscle", score: 716, country: "🇨🇦", tier: "Gold" },
  ];

  const nationalLeaders = [
    { rank: 1, name: "Kiwi_King", score: 678, country: "🇳🇿", tier: "Gold" },
    { rank: 2, name: "Auckland_Alpha", score: 666, country: "🇳🇿", tier: "Gold" },
    { rank: 3, name: "Wellington_Wolf", score: 657, country: "🇳🇿", tier: "Gold" },
    { rank: 4, name: "Christchurch_Chief", score: 647, country: "🇳🇿", tier: "Silver" },
    { rank: 5, name: "Hamilton_Hero", score: 638, country: "🇳🇿", tier: "Silver" },
  ];

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


  const LeaderboardCard = ({ user, isGlobal = false }: { user: any, isGlobal?: boolean }) => (
    <Card className={`tier-card mb-2 transition-all duration-200 hover:scale-102 cursor-pointer ${getTopThreeGlow(user.rank)}`}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              user.rank <= 3 ? 'bg-gradient-primary text-primary-foreground tier-glow' : 'bg-muted text-muted-foreground'
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
            <Button variant="ghost" size="sm" className="mt-1 text-xs h-5 px-2">
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Crown className="w-8 h-8 text-accent tier-glow energy-pulse" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">Compete with the world's elite</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <Select value={muscleFilter} onValueChange={setMuscleFilter}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overall">Overall</SelectItem>
            <SelectItem value="chest">Chest</SelectItem>
            <SelectItem value="arms">Arms</SelectItem>
            <SelectItem value="shoulders">Shoulders</SelectItem>
            <SelectItem value="back">Back</SelectItem>
            <SelectItem value="core">Core</SelectItem>
            <SelectItem value="quads">Quads</SelectItem>
            <SelectItem value="hamstrings">Hamstrings</SelectItem>
            <SelectItem value="calves">Calves</SelectItem>
          </SelectContent>
        </Select>
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
              Top Global Athletes
            </h3>
            <div className="space-y-1">
              {globalLeaders.map((user) => (
                <LeaderboardCard key={user.rank} user={user} isGlobal={true} />
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
              {nationalLeaders.map((user) => (
                <LeaderboardCard key={user.rank} user={user} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;