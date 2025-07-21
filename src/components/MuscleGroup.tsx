import { TrendingUp, Target } from "lucide-react";

interface MuscleGroupProps {
  name: string;
  score: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  isActive?: boolean;
}

export const MuscleGroup = ({ name, score, position, isActive = false }: MuscleGroupProps) => {
  return (
    <div 
      className={`absolute flex flex-col items-center ${isActive ? 'z-10' : 'z-0'}`}
      style={{
        top: position.top,
        bottom: position.bottom,
        left: position.left,
        right: position.right,
      }}
    >
      {/* Connecting line */}
      <div className={`w-px h-6 ${isActive ? 'bg-accent' : 'bg-muted'} mb-1`} />
      
      {/* Glowing score chip */}
      <div className={`
        tier-card rounded-full px-3 py-1.5 text-center transition-all duration-300 border
        ${isActive ? 'tier-glow scale-110 border-accent energy-pulse' : 'border-muted hover:scale-105 hover:border-accent/50'}
      `}>
        <div className={`text-sm font-bold ${isActive ? 'text-accent' : 'text-tier-gold'}`}>
          {score}
        </div>
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          {name}
        </div>
      </div>
    </div>
  );
};