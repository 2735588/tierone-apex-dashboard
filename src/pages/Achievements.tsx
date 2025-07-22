import { Trophy, Medal, Award, Star, Upload, Play, Calendar, User, Weight, Dumbbell, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const achievements = [
    {
      id: 1,
      exercise: "Bench Press",
      weight: 315,
      unit: "lbs",
      date: "2024-01-15",
      category: "Push",
      medal: "Gold",
      verified: true,
      videoThumbnail: "/api/placeholder/200/150",
      isPinned: true
    },
    {
      id: 2,
      exercise: "Deadlift",
      weight: 405,
      unit: "lbs", 
      date: "2024-01-10",
      category: "Pull",
      medal: "Diamond",
      verified: true,
      videoThumbnail: "/api/placeholder/200/150",
      isPinned: true
    },
    {
      id: 3,
      exercise: "Squat",
      weight: 365,
      unit: "lbs",
      date: "2024-01-08",
      category: "Legs",
      medal: "Gold",
      verified: true,
      videoThumbnail: "/api/placeholder/200/150",
      isPinned: true
    },
    {
      id: 4,
      exercise: "Pull-ups",
      weight: 25,
      unit: "reps",
      date: "2024-01-05",
      category: "Calisthenics",
      medal: "Silver",
      verified: false,
      videoThumbnail: "/api/placeholder/200/150",
      isPinned: false
    },
    {
      id: 5,
      exercise: "Overhead Press",
      weight: 185,
      unit: "lbs",
      date: "2024-01-03",
      category: "Push",
      medal: "Silver",
      verified: true,
      videoThumbnail: "/api/placeholder/200/150",
      isPinned: false
    }
  ];

  const categories = [
    { name: "all", label: "All Lifts", icon: Dumbbell },
    { name: "Push", label: "Push", icon: Award },
    { name: "Pull", label: "Pull", icon: Trophy },
    { name: "Legs", label: "Legs", icon: Medal },
    { name: "Calisthenics", label: "Calisthenics", icon: Star }
  ];

  const getMedalColor = (medal: string) => {
    switch (medal) {
      case "Diamond": return "text-cyan-400";
      case "Gold": return "text-yellow-400";
      case "Silver": return "text-gray-300";
      default: return "text-orange-400";
    }
  };

  const getMedalIcon = (medal: string) => {
    switch (medal) {
      case "Diamond": return "💎";
      case "Gold": return "🏆";
      case "Silver": return "🥈";
      default: return "🥉";
    }
  };

  const filteredAchievements = selectedCategory === "all" 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const pinnedAchievements = achievements.filter(a => a.isPinned);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-accent tier-glow energy-pulse" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
            <p className="text-muted-foreground">Your verified lifting résumé</p>
          </div>
        </div>
        
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground tier-glow">
          <Upload className="w-4 h-4 mr-2" />
          Add Lift
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className="whitespace-nowrap flex items-center gap-2 min-w-fit"
            >
              <IconComponent className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Achievement Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <Card className="tier-card text-center">
          <CardContent className="p-3">
            <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1 tier-glow" />
            <div className="text-base font-bold text-accent">12</div>
            <div className="text-xs text-muted-foreground">Total PRs</div>
          </CardContent>
        </Card>
        
        <Card className="tier-card text-center">
          <CardContent className="p-3">
            <Medal className="w-5 h-5 text-cyan-400 mx-auto mb-1 tier-glow" />
            <div className="text-base font-bold text-accent">3</div>
            <div className="text-xs text-muted-foreground">Diamond</div>
          </CardContent>
        </Card>
        
        <Card className="tier-card text-center">
          <CardContent className="p-3">
            <Award className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-base font-bold text-accent">85%</div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </CardContent>
        </Card>

        <Card className="tier-card text-center">
          <CardContent className="p-3">
            <Users className="w-5 h-5 text-accent mx-auto mb-1" />
            <div className="text-base font-bold text-accent">7</div>
            <div className="text-xs text-muted-foreground">Challenges</div>
          </CardContent>
        </Card>
      </div>

      {/* Pinned Records */}
      {pinnedAchievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 tier-glow" />
            Pinned Records
          </h3>
          <div className="grid gap-3">
            {pinnedAchievements.map((achievement) => (
              <Card key={achievement.id} className="tier-card border-accent/30 bg-accent/5">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    {/* Video Thumbnail */}
                    <div className="relative w-16 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Play className="w-4 h-4 text-white hover:scale-110 transition-transform cursor-pointer" />
                      </div>
                      <div className="absolute top-1 right-1">
                        <Badge className="text-xs bg-green-400/20 text-green-400 border-green-400/30">
                          ✓
                        </Badge>
                      </div>
                    </div>

                    {/* Achievement Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <h3 className="font-semibold text-foreground text-sm truncate">{achievement.exercise}</h3>
                        <span className={`text-sm ${getMedalColor(achievement.medal)} tier-glow`}>
                          {getMedalIcon(achievement.medal)}
                        </span>
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      </div>
                      
                      <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Weight className="w-3 h-3" />
                          <span className="font-bold text-accent text-sm">
                            {achievement.weight} {achievement.unit}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(achievement.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="mt-1 text-xs border-accent/30 text-accent">
                        {achievement.category}
                      </Badge>
                    </div>

                    {/* Challenge Button */}
                    <Button variant="outline" size="sm" className="text-xs hover:tier-glow transition-all flex-shrink-0">
                      <Users className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Achievements */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-accent" />
          All Achievements
        </h3>
        <div className="space-y-3">
          {filteredAchievements.map((achievement) => (
            <Card key={achievement.id} className="tier-card transition-all duration-200 hover:scale-105">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  {/* Video Thumbnail */}
                  <div className="relative w-16 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Play className="w-4 h-4 text-white hover:scale-110 transition-transform cursor-pointer" />
                    </div>
                    <div className="absolute top-1 right-1">
                      {achievement.verified ? (
                        <Badge className="text-xs bg-green-400/20 text-green-400 border-green-400/30">
                          ✓
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Achievement Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="font-semibold text-foreground text-sm truncate">{achievement.exercise}</h3>
                      <span className={`text-sm ${getMedalColor(achievement.medal)}`}>
                        {getMedalIcon(achievement.medal)}
                      </span>
                      {achievement.isPinned && (
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Weight className="w-3 h-3" />
                        <span className="font-bold text-accent text-sm">
                          {achievement.weight} {achievement.unit}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(achievement.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="mt-1 text-xs">
                      {achievement.category}
                    </Badge>
                  </div>

                  {/* Challenge Button */}
                  <Button variant="outline" size="sm" className="text-xs flex-shrink-0">
                    <Users className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No achievements yet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start recording your lifts to build your achievement collection
          </p>
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground tier-glow">
            <Upload className="w-4 h-4 mr-2" />
            Record Your First Lift
          </Button>
        </div>
      )}
    </div>
  );
};

export default Achievements;