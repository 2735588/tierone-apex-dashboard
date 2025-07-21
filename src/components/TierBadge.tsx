import { Trophy, Zap } from "lucide-react";

interface TierBadgeProps {
  score: number;
  rank: string;
  percentile: number;
}

export const TierBadge = ({ score, rank, percentile }: TierBadgeProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-glow rounded-full blur-xl scale-150 opacity-60"></div>
      
      {/* Main badge */}
      <div className="relative tier-badge rounded-full w-32 h-32 flex flex-col items-center justify-center border-2 border-accent/30">
        {/* Trophy icon */}
        <Trophy className="w-6 h-6 text-tier-gold mb-1" />
        
        {/* TierScore */}
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{score}</div>
          <div className="text-xs font-medium text-accent">TIERSCORE</div>
        </div>
        
        {/* Energy icon */}
        <Zap className="w-4 h-4 text-energy energy-pulse mt-1" />
      </div>
      
      {/* Rank and percentile */}
      <div className="mt-4 text-center">
        <div className="text-lg font-bold text-accent">{rank}</div>
        <div className="text-sm text-muted-foreground">Top {percentile}%</div>
      </div>
    </div>
  );
};