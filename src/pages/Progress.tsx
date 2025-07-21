import { TrendingUp, Calendar, Target, Activity } from "lucide-react";

const Progress = () => {
  const muscleProgressData = [
    { 
      muscle: "Chest", 
      current: 87, 
      previous: 82, 
      change: "+5", 
      trend: "up",
      weeklyData: [78, 80, 82, 84, 85, 87, 87] 
    },
    { 
      muscle: "Shoulders", 
      current: 92, 
      previous: 89, 
      change: "+3", 
      trend: "up",
      weeklyData: [85, 87, 89, 90, 91, 92, 92] 
    },
    { 
      muscle: "Arms", 
      current: 78, 
      previous: 70, 
      change: "+8", 
      trend: "up",
      weeklyData: [65, 67, 70, 73, 75, 77, 78] 
    },
    { 
      muscle: "Core", 
      current: 65, 
      previous: 63, 
      change: "+2", 
      trend: "up",
      weeklyData: [58, 60, 61, 63, 64, 65, 65] 
    },
    { 
      muscle: "Back", 
      current: 84, 
      previous: 78, 
      change: "+6", 
      trend: "up",
      weeklyData: [72, 74, 76, 78, 80, 82, 84] 
    },
    { 
      muscle: "Legs", 
      current: 71, 
      previous: 67, 
      change: "+4", 
      trend: "up",
      weeklyData: [63, 65, 67, 68, 69, 70, 71] 
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Muscle Growth Tracker</h1>
        <p className="text-muted-foreground">Track your muscle development scores over time</p>
      </div>

      {/* Time Period Selector */}
      <div className="flex gap-2 mb-6">
        {["7D", "1M", "3M", "6M", "1Y"].map((period) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === "1M"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Overall Progress Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="tier-card rounded-xl p-4 text-center">
          <TrendingUp className="w-6 h-6 text-tier-gold mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">+4.7</div>
          <div className="text-xs text-muted-foreground">Avg Score Increase</div>
        </div>
        
        <div className="tier-card rounded-xl p-4 text-center">
          <Target className="w-6 h-6 text-accent mx-auto mb-2" />
          <div className="text-lg font-bold text-foreground">6/6</div>
          <div className="text-xs text-muted-foreground">Groups Improving</div>
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="tier-card rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          Overall Score Trend
        </h3>
        
        <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Score progression visualization</p>
            <p className="text-xs text-muted-foreground mt-1">Shows muscle development over time</p>
          </div>
        </div>
      </div>

      {/* Muscle Group Progress */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Individual Muscle Groups</h3>
        
        {muscleProgressData.map((item, index) => (
          <div key={index} className="tier-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{item.muscle}</h4>
                <div className="text-sm text-tier-gold">{item.change} this month</div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-accent">{item.current}</div>
                <div className="text-xs text-muted-foreground">Current Score</div>
              </div>
            </div>
            
            {/* Mini trend line */}
            <div className="flex items-end gap-1 mb-2 h-8">
              {item.weeklyData.map((value, i) => (
                <div
                  key={i}
                  className="bg-accent/60 rounded-sm flex-1"
                  style={{ height: `${(value / 100) * 100}%` }}
                />
              ))}
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="performance-bar h-full rounded-full" 
                style={{ width: `${item.current}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Last Updated */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        Last scan: Today, 2:30 PM
      </div>
    </div>
  );
};

export default Progress;