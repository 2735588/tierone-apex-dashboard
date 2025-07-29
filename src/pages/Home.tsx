import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Plus, Trophy, Calendar, Target, Bell, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();
  const [currentStreak, setCurrentStreak] = useState(7); // Mock streak data

  // Mock competitions data
  const competitions = [
    {
      id: 1,
      title: "Summer Shred Challenge",
      description: "30-day transformation challenge",
      daysLeft: 15,
      participants: 2847,
      prize: "$500 Prize Pool"
    },
    {
      id: 2,
      title: "Push-Up Championships",
      description: "See who can do the most push-ups",
      daysLeft: 3,
      participants: 1205,
      prize: "Champion Badge"
    },
    {
      id: 3,
      title: "Consistency King",
      description: "Longest gym streak wins",
      daysLeft: 22,
      participants: 892,
      prize: "VIP Status"
    }
  ];

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
            <h2 className="text-lg font-semibold text-foreground">Ready to dominate today?</h2>
            <p className="text-sm text-muted-foreground">Log your workout and keep the momentum going</p>
          </div>
          
          <Button
            onClick={handleLogWorkout}
            className="w-full max-w-sm bg-gradient-primary text-primary-foreground font-bold text-lg rounded-2xl tier-glow h-14 hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-6 h-6 mr-3" />
            Log Today's Workout
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/scan')}
            className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 hover:bg-accent/10 flex-col gap-2"
          >
            <Target className="w-6 h-6 text-accent" />
            <span className="text-sm">Body Scan</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/leaderboard')}
            className="h-20 bg-card/30 backdrop-blur-sm border-accent/20 hover:bg-accent/10 flex-col gap-2"
          >
            <Trophy className="w-6 h-6 text-accent" />
            <span className="text-sm">Leaderboard</span>
          </Button>
        </div>

        {/* Competitions & Events */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Competitions & Events</h3>
            <Button variant="ghost" size="sm" className="text-accent">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {competitions.map((competition) => (
              <Card key={competition.id} className="bg-card/30 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{competition.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{competition.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{competition.daysLeft} days left</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          <span>{competition.participants.toLocaleString()} competing</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg mb-1">{competition.prize}</div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-4 text-center">
          <p className="text-sm text-muted-foreground italic">
            "Every workout is a step closer to your best self"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;