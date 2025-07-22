import { Play, Calendar, Weight, Trophy, Plus, Video, Medal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const achievements = [
    {
      id: 1,
      exercise: "Bench Press",
      weight: 315,
      unit: "lbs",
      date: "2024-01-15",
      videoUrl: "#",
      isPersonalRecord: true,
      category: "Push",
      medal: "gold",
    },
    {
      id: 2,
      exercise: "Deadlift",
      weight: 495,
      unit: "lbs", 
      date: "2024-01-12",
      videoUrl: "#",
      isPersonalRecord: true,
      category: "Pull",
      medal: "gold",
    },
    {
      id: 3,
      exercise: "Squat",
      weight: 405,
      unit: "lbs",
      date: "2024-01-10",
      videoUrl: "#",
      isPersonalRecord: true,
      category: "Legs",
      medal: "gold",
    },
    {
      id: 4,
      exercise: "Pull-ups",
      weight: 45,
      unit: "lbs added",
      date: "2024-01-08",
      videoUrl: "#",
      isPersonalRecord: false,
      category: "Calisthenics",
      medal: "silver",
    },
  ];

  const categories = ["All", "Push", "Pull", "Legs", "Calisthenics"];
  const filteredAchievements = selectedCategory === "All" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const getMedalIcon = (medal: string) => {
    switch (medal) {
      case "gold":
        return <Medal className="w-4 h-4 text-tier-gold" />;
      case "silver":
        return <Medal className="w-4 h-4 text-gray-300" />;
      default:
        return <Medal className="w-4 h-4 text-orange-400" />;
    }
  };

  const totalWeight = achievements.reduce((sum, achievement) => sum + achievement.weight, 0);
  const personalRecords = achievements.filter(a => a.isPersonalRecord).length;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Achievements</h1>
        <p className="text-muted-foreground">Showcase your strongest lifts and personal records</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="tier-card rounded-xl p-4 text-center">
          <Trophy className="w-5 h-5 text-tier-gold mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">{personalRecords}</div>
          <div className="text-xs text-muted-foreground">Personal Records</div>
        </div>
        
        <div className="tier-card rounded-xl p-4 text-center">
          <Weight className="w-5 h-5 text-accent mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">{totalWeight.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Volume</div>
        </div>
        
        <div className="tier-card rounded-xl p-4 text-center">
          <Video className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">{achievements.length}</div>
          <div className="text-xs text-muted-foreground">Recorded Lifts</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {categories.map((category) => (
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

      {/* Record New Achievement Button */}
      <Button variant="tier" className="w-full mb-6 h-12">
        <Plus className="w-5 h-5 mr-2" />
        Record New Achievement
      </Button>

      {/* Achievement Cards */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Your Top Lifts</h3>
        
        {filteredAchievements.map((achievement) => (
          <div key={achievement.id} className="tier-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center tier-glow">
                  <Weight className="w-6 h-6 text-primary-foreground" />
                </div>
                
                <div>
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    {achievement.exercise}
                    {getMedalIcon(achievement.medal)}
                    {achievement.isPersonalRecord && (
                      <Trophy className="w-4 h-4 text-tier-gold" />
                    )}
                  </h4>
                  <div className="text-xs text-accent">{achievement.category}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(achievement.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">
                  {achievement.weight}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.unit}
                </div>
              </div>
            </div>
            
            {/* Video thumbnail and play button with 3-second preview */}
            <div className="relative bg-muted rounded-lg h-24 flex items-center justify-center group">
              <Button variant="ghost" size="sm" className="hover:bg-accent/20">
                <Play className="w-6 h-6 text-accent mr-2" />
                Watch Video
              </Button>
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Users className="w-4 h-4 text-accent" />
                </Button>
              </div>
            </div>

            {/* Challenge Friend Option */}
            <div className="mt-3 flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-accent">
                <Users className="w-4 h-4 mr-2" />
                Challenge Friend
              </Button>
            </div>
            
            {/* Achievement stats */}
            {achievement.isPersonalRecord && (
              <div className="mt-3 flex items-center justify-center">
                <div className="tier-card rounded-full px-3 py-1 tier-glow">
                  <span className="text-xs font-bold text-tier-gold">PERSONAL RECORD</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Upload instruction */}
      <div className="mt-6 tier-card rounded-xl p-4 text-center">
        <Video className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">
          All lifts must be recorded in-app to be validated and added to your achievements
        </p>
      </div>
    </div>
  );
};

export default Achievements;