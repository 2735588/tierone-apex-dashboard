import { Play, Clock, Target, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Workouts = () => {
  const workouts = [
    { name: "Push Power", duration: "45 min", difficulty: "High", completed: true, score: 892 },
    { name: "Leg Destroyer", duration: "60 min", difficulty: "Extreme", completed: true, score: 956 },
    { name: "Core Crusher", duration: "30 min", difficulty: "Medium", completed: false, score: 0 },
    { name: "Pull Domination", duration: "50 min", difficulty: "High", completed: false, score: 0 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Extreme": return "text-destructive";
      case "High": return "text-accent";
      case "Medium": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Training Hub</h1>
        <p className="text-muted-foreground">Push your limits, track your gains</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="tier-card rounded-xl p-4">
          <Clock className="w-5 h-5 text-accent mb-2" />
          <div className="text-lg font-bold text-foreground">127</div>
          <div className="text-xs text-muted-foreground">Total Sessions</div>
        </div>
        
        <div className="tier-card rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-tier-gold mb-2" />
          <div className="text-lg font-bold text-foreground">+18%</div>
          <div className="text-xs text-muted-foreground">Strength Gain</div>
        </div>
      </div>

      {/* Create Workout Button */}
      <Button variant="tier" className="w-full mb-6 h-12">
        <Plus className="w-5 h-5 mr-2" />
        Create Custom Workout
      </Button>

      {/* Workout List */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Recommended Workouts</h3>
        
        {workouts.map((workout, index) => (
          <div key={index} className="tier-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{workout.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground">{workout.duration}</span>
                  <span className={`text-sm font-medium ${getDifficultyColor(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                {workout.completed ? (
                  <div>
                    <div className="text-lg font-bold text-accent">{workout.score}</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                ) : (
                  <Button variant="tier" size="sm">
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </Button>
                )}
              </div>
            </div>
            
            {/* Progress bar for completed workouts */}
            {workout.completed && (
              <div className="w-full bg-muted rounded-full h-2">
                <div className="performance-bar h-full rounded-full w-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;