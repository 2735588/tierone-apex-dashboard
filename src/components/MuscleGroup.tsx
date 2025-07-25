import { TrendingUp, Target } from "lucide-react";
import { useGender } from "@/contexts/GenderContext";

interface MuscleGroupProps {
  name: string;
  score: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  isActive?: boolean;
}

export const MuscleGroup = ({ name, score, position, isActive = false }: MuscleGroupProps) => {
  const { gender } = useGender();
  const isFemale = gender === 'female';
  
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
      <div className={`w-px h-6 ${isActive ? (isFemale ? 'bg-accent-female' : 'bg-accent') : 'bg-muted'} mb-1`} />
      
      {/* Glowing score chip */}
      <div className={`
        tier-card rounded-full px-3 py-1.5 text-center transition-all duration-300 border
        ${isActive ? `tier-glow scale-110 ${isFemale ? 'border-accent-female' : 'border-accent'} energy-pulse` : `border-muted hover:scale-105 ${isFemale ? 'hover:border-accent-female/50' : 'hover:border-accent/50'}`}
      `}>
        <div className={`text-sm font-bold ${isActive ? (isFemale ? 'text-accent-female' : 'text-accent') : 'text-tier-gold'}`}>
          {score}
        </div>
        <div className="text-xs text-muted-foreground whitespace-nowrap">
          {name}
        </div>
      </div>
    </div>
  );
};