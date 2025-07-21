import { TrendingUp, Target } from "lucide-react";

interface MuscleGroupProps {
  name: string;
  percentage: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  isActive?: boolean;
}

export const MuscleGroup = ({ name, percentage, position, isActive = false }: MuscleGroupProps) => {
  const getPerformanceColor = (percent: number) => {
    if (percent >= 80) return "text-tier-gold";
    if (percent >= 60) return "text-accent";
    if (percent >= 40) return "text-primary";
    return "text-muted-foreground";
  };

  const getProgressWidth = (percent: number) => {
    return `${Math.min(percent, 100)}%`;
  };

  return (
    <div 
      className="absolute z-10 flex flex-col items-center"
      style={position}
    >
      {/* Progress indicator */}
      <div className={`tier-card rounded-lg p-3 min-w-[80px] ${isActive ? 'tier-glow scale-105' : ''} transition-all duration-300`}>
        {/* Muscle group name */}
        <div className="text-xs font-semibold text-center text-foreground mb-2">
          {name.toUpperCase()}
        </div>
        
        {/* Percentage with icon */}
        <div className="flex items-center justify-center gap-1 mb-2">
          <Target className="w-3 h-3 text-accent" />
          <span className={`text-sm font-bold ${getPerformanceColor(percentage)}`}>
            {percentage}%
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
          <div 
            className="performance-bar h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: getProgressWidth(percentage) }}
          />
        </div>
        
        {/* Trend indicator */}
        <div className="flex items-center justify-center mt-2">
          <TrendingUp className="w-3 h-3 text-accent" />
        </div>
      </div>
    </div>
  );
};