import { Crown, Trophy, Medal, Users, Globe, Flag, Search, Eye, Star, Award, Target } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const globalLeaders = [
    { rank: 1, name: "Alex_Beast", score: 774, country: "🇺🇸", tier: "Diamond", records: [
      { exercise: "Bench Press", weight: 315, unit: "lbs", isPinned: true },
      { exercise: "Deadlift", weight: 495, unit: "lbs", isPinned: true },
      { exercise: "Squat", weight: 405, unit: "lbs", isPinned: false }
    ]},
    { rank: 2, name: "Nordic_Thor", score: 763, country: "🇳🇴", tier: "Diamond", records: [
      { exercise: "Deadlift", weight: 220, unit: "kg", isPinned: true },
      { exercise: "Overhead Press", weight: 100, unit: "kg", isPinned: true },
      { exercise: "Squat", weight: 180, unit: "kg", isPinned: false }
    ]},
    { rank: 3, name: "Aussie_Tank", score: 754, country: "🇦🇺", tier: "Diamond", records: [
      { exercise: "Squat", weight: 200, unit: "kg", isPinned: true },
      { exercise: "Bench Press", weight: 150, unit: "kg", isPinned: true }
    ]},
    { rank: 4, name: "UK_Warrior", score: 745, country: "🇬🇧", tier: "Gold", records: [
      { exercise: "Bench Press", weight: 275, unit: "lbs", isPinned: true },
      { exercise: "Barbell Row", weight: 225, unit: "lbs", isPinned: false }
    ]},
    { rank: 5, name: "Tokyo_Titan", score: 742, country: "🇯🇵", tier: "Gold", records: [
      { exercise: "Overhead Press", weight: 85, unit: "kg", isPinned: true }
    ]},
    { rank: 6, name: "Berlin_Beast", score: 735, country: "🇩🇪", tier: "Gold", records: [
      { exercise: "Deadlift", weight: 190, unit: "kg", isPinned: true }
    ]},
    { rank: 7, name: "Brazil_Bull", score: 726, country: "🇧🇷", tier: "Gold", records: [
      { exercise: "Squat", weight: 170, unit: "kg", isPinned: true }
    ]},
    { rank: 8, name: "Maple_Muscle", score: 716, country: "🇨🇦", tier: "Gold", records: [
      { exercise: "Bench Press", weight: 225, unit: "lbs", isPinned: true }
    ]},
  ];

  const nationalLeaders = [
    { rank: 1, name: "Kiwi_King", score: 678, country: "🇳🇿", tier: "Gold", records: [
      { exercise: "Bench Press", weight: 130, unit: "kg", isPinned: true },
      { exercise: "Deadlift", weight: 180, unit: "kg", isPinned: true }
    ]},
    { rank: 2, name: "Auckland_Alpha", score: 666, country: "🇳🇿", tier: "Gold", records: [
      { exercise: "Squat", weight: 160, unit: "kg", isPinned: true }
    ]},
    { rank: 3, name: "Wellington_Wolf", score: 657, country: "🇳🇿", tier: "Gold", records: [
      { exercise: "Overhead Press", weight: 75, unit: "kg", isPinned: true }
    ]},
    { rank: 4, name: "Christchurch_Chief", score: 647, country: "🇳🇿", tier: "Silver", records: [
      { exercise: "Deadlift", weight: 170, unit: "kg", isPinned: true }
    ]},
    { rank: 5, name: "Hamilton_Hero", score: 638, country: "🇳🇿", tier: "Silver", records: [
      { exercise: "Bench Press", weight: 115, unit: "kg", isPinned: true }
    ]},
  ];

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
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

  const filterUsers = (users: any[]) => {
    if (!searchQuery.trim()) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };


  const LeaderboardCard = ({ user, isGlobal = false }: { user: any, isGlobal?: boolean }) => (
    <Card 
      className={`tier-card mb-2 transition-all duration-200 hover:scale-102 cursor-pointer ${getTopThreeGlow(user.rank)}`}
      onClick={() => handleUserClick(user)}
    >
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

      {/* User Search */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
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
              Top Global Athletes
            </h3>
            <div className="space-y-1">
              {filterUsers(globalLeaders).map((user) => (
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
              {filterUsers(nationalLeaders).map((user) => (
                <LeaderboardCard key={user.rank} user={user} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Profile Modal */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-base">{selectedUser?.country}</span>
              {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              {/* Tier Score Section */}
              <Card className="tier-card">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">
                      {selectedUser.score}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">Overall TierScore</div>
                    <Badge className={`${getTierColor(selectedUser.tier)} border-current`} variant="outline">
                      <Award className="w-3 h-3 mr-1" />
                      {selectedUser.tier} Tier
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Pinned Records Section */}
              <Card className="tier-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Pinned Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {selectedUser.records?.filter((record: any) => record.isPinned).map((record: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-accent/5 rounded-lg border border-accent/20">
                        <div className="flex items-center gap-2">
                          <Target className="w-3 h-3 text-accent" />
                          <span className="text-sm font-medium">{record.exercise}</span>
                        </div>
                        <div className="text-sm font-bold text-accent">
                          {record.weight} {record.unit}
                        </div>
                      </div>
                    ))}
                    {!selectedUser.records?.some((record: any) => record.isPinned) && (
                      <div className="text-center text-muted-foreground text-sm py-4">
                        No pinned records yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leaderboard;