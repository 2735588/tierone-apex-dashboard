import { Badge } from "./ui/badge";
import { Trophy, Award, Zap, Medal } from "lucide-react";
import { cropBadgeToCircle } from "@/utils/badgeImageUtils";
import { useState, useEffect } from "react";

export type BadgeType = 'streak' | 'sponsored' | 'global' | 'muscle-group';
export type BadgeGlow = 'green' | 'bronze' | 'silver' | 'gold' | 'diamond';

interface BadgeHexProps {
  name: string;
  description: string;
  type: BadgeType;
  glow: BadgeGlow;
  imageUrl?: string;
  isUnlocked: boolean;
  progress?: number;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}

export const BadgeHex = ({ 
  name, 
  description, 
  type, 
  glow, 
  imageUrl, 
  isUnlocked, 
  progress = 0, 
  size = 'md',
  showProgress = false 
}: BadgeHexProps) => {
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (imageUrl && !imageError) {
      cropBadgeToCircle(imageUrl)
        .then(setCroppedImageUrl)
        .catch(() => setImageError(true));
    }
  }, [imageUrl, imageError]);
  const getGlowClass = () => {
    if (!isUnlocked) return 'opacity-40 grayscale';
    
    switch (glow) {
      case 'green':
        return 'badge-glow-green';
      case 'bronze':
        return 'badge-glow-bronze';
      case 'silver':
        return 'badge-glow-silver';
      case 'gold':
        return 'badge-glow-gold';
      case 'diamond':
        return 'badge-glow-diamond';
      default:
        return '';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-16 h-16';
      case 'lg':
        return 'w-32 h-32';
      default:
        return 'w-24 h-24';
    }
  };

  const getFallbackIcon = () => {
    switch (type) {
      case 'streak':
        return <Zap className="w-8 h-8 text-green-400" />;
      case 'sponsored':
        return <Award className="w-8 h-8 text-blue-400" />;
      case 'global':
        return <Trophy className="w-8 h-8 text-blue-400" />;
      case 'muscle-group':
        return <Medal className="w-8 h-8 text-tier-gold" />;
      default:
        return <Trophy className="w-8 h-8" />;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Hexagonal Badge */}
      <div className={`
        relative ${getSizeClass()} ${getGlowClass()}
        transition-all duration-300 hover:scale-105
      `}>
        {/* Badge Image or Fallback */}
        {croppedImageUrl && !imageError ? (
          <img 
            src={croppedImageUrl} 
            alt={name}
            className="w-full h-full object-contain rounded-full"
            onError={() => setImageError(true)}
          />
        ) : null}
        
        {/* Fallback Hexagonal Background */}
        <div className={`
          ${croppedImageUrl && !imageError ? 'hidden' : 'flex'} w-full h-full 
          bg-tier-card border-2 border-accent/30 
          clip-hexagon items-center justify-center
          ${getGlowClass()}
        `}>
          {getFallbackIcon()}
        </div>

        {/* Progress Ring (for unlocked badges with progress) */}
        {showProgress && isUnlocked && progress > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="hsl(var(--accent) / 0.2)"
                strokeWidth="2"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                strokeDasharray={`${progress * 2.83} 283`}
                className="transition-all duration-500"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Badge Info */}
      <div className="text-center space-y-1">
        <h4 className={`text-sm font-semibold ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
          {name}
        </h4>
        <p className="text-xs text-muted-foreground max-w-24 leading-tight">
          {description}
        </p>
        
        {/* Progress Indicator - Hidden */}
        {showProgress && false && (
          <Badge variant={isUnlocked ? "default" : "outline"} className="text-xs">
            {isUnlocked ? 'Earned' : `${progress}%`}
          </Badge>
        )}
      </div>
    </div>
  );
};