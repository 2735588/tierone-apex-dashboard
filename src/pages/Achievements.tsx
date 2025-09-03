import { Trophy, Medal, Award, Star, Upload, Play, Calendar, User, Weight, Dumbbell, Users, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchUserBadges } from "@/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tierOneBadges, TierOneBadge } from "@/data/badges";
import { BadgeIcon } from "@/components/BadgeIcon";
import { BadgeModal } from "@/components/BadgeModal";
import { BrandMark } from "@/components/Brand";

const Achievements = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [earnedBadgeSlugs, setEarnedBadgeSlugs] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Debug: Test if file compiles properly
  console.log("Achievements component loaded successfully");

  useEffect(() => { 
    setIsLoading(true);
    fetchUserBadges().then((userBadges) => {
      const slugSet = new Set(userBadges.map(b => b.slug));
      setEarnedBadgeSlugs(slugSet);
      setIsLoading(false);
    });
  }, []);

  const categories = [
    { name: "All", label: "All", icon: Trophy },
    { name: "Consistency", label: "Consistency", icon: Star },
    { name: "Brand Challenges", label: "Brand Challenges", icon: Award },
    { name: "Global Events", label: "Global Events", icon: Trophy },
    { name: "Performance", label: "Performance", icon: Medal },
  ];

  // Merge badge catalog with earned status
  const badgesWithEarnedStatus: TierOneBadge[] = tierOneBadges.map(badge => ({
    ...badge,
    isUnlocked: earnedBadgeSlugs.has(badge.id)
  }));

  const filteredBadges = selectedCategory === "All" 
    ? badgesWithEarnedStatus
    : badgesWithEarnedStatus.filter(badge => {
        if (selectedCategory === "Performance") {
          return badge.category.includes("Performance");
        }
        return badge.category === selectedCategory;
      });

  const achievements = [
    {
      id: 1,
      exercise: "Bench Press",
      weight: 315,
      unit: "lbs",
      date: "2024-01-15",
      category: "Push",
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
      verified: true,
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
      verified: true,
      videoThumbnail: "/api/placeholder/200/150",
      isPinned: false
    }
  ];

  const earnedCount = filteredBadges.filter(b => b.isUnlocked).length;
  const totalCount = filteredBadges.length;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BrandMark size={20} className="mr-2" />
          <Trophy className="w-8 h-8 text-accent tier-glow energy-pulse" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Achievements</h1>
            <p className="text-muted-foreground">Earn badges and track your progress</p>
          </div>
        </div>
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

      {/* Badge Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="tier-card text-center">
          <CardContent className="p-3">
            <Trophy className="w-5 h-5 text-accent mx-auto mb-1" />
            <div className="text-base font-bold text-accent">{earnedCount}</div>
            <div className="text-xs text-muted-foreground">Earned</div>
          </CardContent>
        </Card>
        <Card className="tier-card text-center">
          <CardContent className="p-3">
            <Medal className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
            <div className="text-base font-bold text-foreground">{totalCount}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card className="tier-card text-center">
          <CardContent className="p-3">
            <Star className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <div className="text-base font-bold text-accent">{Math.round((earnedCount / totalCount) * 100)}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Grid */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-accent" />
          {selectedCategory} Badges
        </h3>
        
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="w-24 h-24 bg-muted rounded-full animate-pulse" />
                <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredBadges.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-6">
            {filteredBadges.map((badge) => {
              const getGlow = () => {
                if (!badge.isUnlocked) return "none";
                switch (badge.glow) {
                  case 'bronze': return 'bronze';
                  case 'silver': return 'silver';
                  case 'gold': return 'gold';
                  default: return 'none';
                }
              };

              return (
                <BadgeModal key={badge.id} badge={badge}>
                  <div className="cursor-pointer relative">
                    <BadgeIcon
                      src={badge.imageUrl || '/placeholder-badge.png'}
                      size="md"
                      label={badge.name}
                      glow={getGlow()}
                    />
                    {!badge.isUnlocked && (
                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </BadgeModal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <BrandMark size={32} className="opacity-80 mx-auto mb-4" />
            <p className="text-muted-foreground">No badges in this category</p>
          </div>
        )}
      </div>

      {/* Pinned Records */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 tier-glow" />
          Pinned Records
        </h3>
        <div className="grid gap-3">
          {achievements.filter(a => a.isPinned).map((achievement) => (
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
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm truncate">{achievement.exercise}</h3>
                      {achievement.verified && (
                        <Badge className="text-xs bg-green-400/20 text-green-400 border-green-400/30">
                          Verified
                        </Badge>
                      )}
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
    </div>
  );
};

export default Achievements;