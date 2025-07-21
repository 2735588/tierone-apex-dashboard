import { TrendingUp, Calendar, Award, Target, BarChart3 } from "lucide-react";

const Progress = () => {
  const weeklyData = [
    { day: "Mon", score: 85 },
    { day: "Tue", score: 92 },
    { day: "Wed", score: 78 },
    { day: "Thu", score: 95 },
    { day: "Fri", score: 88 },
    { day: "Sat", score: 91 },
    { day: "Sun", score: 87 },
  ];

  const achievements = [
    { title: "Strength Beast", description: "150+ lbs bench press", earned: true, icon: "🏆" },
    { title: "Consistency King", description: "30-day workout streak", earned: true, icon: "👑" },
    { title: "Cardio Master", description: "5K under 25 minutes", earned: false, icon: "🏃" },
    { title: "Iron Will", description: "100 total workouts", earned: true, icon: "💪" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Progress Analytics</h1>
        <p className="text-muted-foreground">Track your journey to greatness</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="tier-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Growth Rate</span>
          </div>
          <div className="text-2xl font-bold text-accent">+24%</div>
          <div className="text-xs text-muted-foreground">This month</div>
        </div>
        
        <div className="tier-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-tier-gold" />
            <span className="text-sm font-medium text-foreground">Streak</span>
          </div>
          <div className="text-2xl font-bold text-tier-gold">23</div>
          <div className="text-xs text-muted-foreground">Days active</div>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className="tier-card rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">Weekly Performance</h3>
        </div>
        
        <div className="flex items-end justify-between h-32 gap-2">
          {weeklyData.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-performance rounded-t-md transition-all duration-500"
                style={{ height: `${(day.score / 100) * 100}%` }}
              />
              <div className="text-xs text-muted-foreground mt-2">{day.day}</div>
              <div className="text-xs font-semibold text-accent">{day.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body Stats */}
      <div className="tier-card rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Body Composition</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Muscle Mass</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div className="bg-gradient-performance h-full rounded-full w-4/5" />
              </div>
              <span className="text-sm font-semibold text-accent">78%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Body Fat</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div className="bg-primary h-full rounded-full w-1/4" />
              </div>
              <span className="text-sm font-semibold text-primary">12%</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Hydration</span>
            <div className="flex items-center gap-2">
              <div className="w-20 bg-muted rounded-full h-2">
                <div className="bg-accent h-full rounded-full w-5/6" />
              </div>
              <span className="text-sm font-semibold text-accent">92%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="tier-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-tier-gold" />
          <h3 className="font-semibold text-foreground">Achievements</h3>
        </div>
        
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                achievement.earned 
                  ? 'bg-accent/10 border border-accent/20 tier-glow' 
                  : 'bg-muted/20 border border-muted'
              }`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className={`font-semibold ${achievement.earned ? 'text-accent' : 'text-muted-foreground'}`}>
                  {achievement.title}
                </div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              {achievement.earned && (
                <Award className="w-4 h-4 text-tier-gold" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;