import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Plus, Trophy, Calendar, Target, Bell, Settings, ChevronRight, Zap, Award, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Home = () => {
  const navigate = useNavigate();
  const [currentStreak, setCurrentStreak] = useState(7); // Mock streak data

  // Mock competitions data organized by categories
  const globalCompetitions = [
    {
      id: 1,
      title: "Global Fitness Championship",
      description: "Worldwide transformation challenge",
      daysLeft: 15,
      participants: 28475,
      prize: "Global Champion Badge",
      category: "Global"
    },
    {
      id: 2,
      title: "International Push-Up League",
      description: "Global push-up competition",
      daysLeft: 8,
      participants: 15203,
      prize: "Elite Athlete Badge",
      category: "Global"
    }
  ];

  const sponsoredChallenges = [
    {
      id: 1,
      title: "Gymshark Push-Up Challenge",
      description: "30-day push-up progression",
      daysLeft: 12,
      participants: 8429,
      prize: "Gymshark Badge + Gear",
      category: "Sponsored",
      brand: "Gymshark"
    },
    {
      id: 2,
      title: "Nike Running Series",
      description: "Weekly distance goals",
      daysLeft: 5,
      participants: 12847,
      prize: "Nike Champion Badge",
      category: "Sponsored",
      brand: "Nike"
    }
  ];

  const communityChallenges = [
    {
      id: 5,
      title: "Local Gym Heroes",
      description: "Compete with your gym buddies",
      daysLeft: 7,
      participants: 145,
      prize: "Gym Champion Badge",
      category: "Community"
    },
    {
      id: 6,
      title: "Weekend Warriors",
      description: "Weekend workout consistency",
      daysLeft: 3,
      participants: 892,
      prize: "VIP Community Status",
      category: "Community"
    }
  ];

  const motivationalQuotes = [
    "Every workout is a step closer to your best self",
    "Champions train when others sleep",
    "The only bad workout is the one you didn't do",
    "Consistency beats perfection every time"
  ];

  const [currentQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const getStreakIntensity = (streak: number) => {
    if (streak >= 100) return "text-orange-400 drop-shadow-[0_0_20px_rgba(251,146,60,0.8)]";
    if (streak >= 50) return "text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]";
    if (streak >= 25) return "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]";
    if (streak >= 10) return "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]";
    if (streak >= 5) return "text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.3)]";
    return "text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.2)]";
  };

  const handleLogWorkout = () => {
    // Navigate to workout logging (placeholder for now)
    console.log("Navigate to workout logging");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Status bar simulation */}
      <div className="flex justify-between items-center px-6 py-2 text-xs text-muted-foreground">
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
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full energy-pulse"></div>
          </Button>
          
          <Button variant="ghost" size="sm">
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
            onClick={handleLogWorkout}
            className="w-full max-w-sm bg-gradient-primary text-primary-foreground font-bold text-xl rounded-2xl tier-glow h-16 hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-7 h-7 mr-3" />
            Log Today's Workout
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/scan')}
            className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 hover:bg-accent/10 flex-col gap-2"
          >
            <Target className="w-6 h-6 text-accent" />
            <span className="text-xs font-medium">Body Scan</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/leaderboard')}
            className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 hover:bg-accent/10 flex-col gap-2"
          >
            <Trophy className="w-6 h-6 text-accent" />
            <span className="text-xs font-medium">Leaderboard</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/achievements')}
            className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 hover:bg-accent/10 flex-col gap-2"
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

        {/* Global Competitions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-foreground">Global Competitions</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-accent">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {globalCompetitions.map((competition) => (
                <Card key={competition.id} className="min-w-[280px] bg-card/30 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-foreground mb-1">{competition.title}</h4>
                          <p className="text-sm text-muted-foreground">{competition.description}</p>
                        </div>
                        <div className="bg-accent/20 px-2 py-1 rounded-full">
                          <span className="text-xs font-bold text-accent">GLOBAL</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{competition.daysLeft} days left</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{competition.participants.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-accent">{competition.prize}</div>
                        <Button size="sm" variant="tier" className="text-xs h-8">
                          Join Competition
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Sponsored Challenges */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-foreground">Sponsored Challenges</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-accent">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {sponsoredChallenges.map((competition) => (
                <Card key={competition.id} className="min-w-[280px] bg-card/30 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-foreground mb-1">{competition.title}</h4>
                          <p className="text-sm text-muted-foreground">{competition.description}</p>
                        </div>
                        <div className="bg-primary/20 px-2 py-1 rounded-full">
                          <span className="text-xs font-bold text-primary">SPONSORED</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{competition.daysLeft} days left</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{competition.participants.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-accent">{competition.prize}</div>
                        <Button size="sm" variant="tier" className="text-xs h-8">
                          Join Challenge
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Community Challenges */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-foreground">Community Challenges</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-accent">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-4 pb-4">
              {communityChallenges.map((competition) => (
                <Card key={competition.id} className="min-w-[280px] bg-card/30 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-foreground mb-1">{competition.title}</h4>
                          <p className="text-sm text-muted-foreground">{competition.description}</p>
                        </div>
                        <div className="bg-secondary/20 px-2 py-1 rounded-full">
                          <span className="text-xs font-bold text-secondary-foreground">COMMUNITY</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{competition.daysLeft} days left</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{competition.participants.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-accent">{competition.prize}</div>
                        <Button size="sm" variant="tier" className="text-xs h-8">
                          Join Community
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Home;