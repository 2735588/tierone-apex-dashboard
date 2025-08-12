import { X, Trophy, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TierOneBadge } from "@/data/badges";

interface BadgeModalProps {
  badge: TierOneBadge;
  children: React.ReactNode;
}

export const BadgeModal = ({ badge, children }: BadgeModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md border-0 p-0 max-w-none w-full h-full flex items-center justify-center animate-fade-in">
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 animate-scale-in">
          {/* Close Button */}
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-background/10 backdrop-blur-sm hover:bg-background/20 text-white"
            >
              <X className="w-6 h-6" />
            </Button>
          </DialogTrigger>

          {/* Badge Image */}
          <div className="w-full max-w-xs h-[40vh] flex items-center justify-center mb-8">
            {badge.imageUrl ? (
              <img
                src={badge.imageUrl}
                alt={badge.name}
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
            ) : (
              <div className="w-48 h-48 bg-tier-card border-2 border-accent/30 clip-hexagon flex items-center justify-center filter drop-shadow-2xl">
                <Trophy className="w-16 h-16 text-tier-gold" />
              </div>
            )}
          </div>

          {/* Badge Content */}
          <div className="text-center space-y-6 max-w-md">
            {/* Badge Title */}
            <h1 className="text-4xl font-bold text-white mb-4">
              {badge.name}
            </h1>

            {/* Badge Requirement */}
            <p className="text-xl text-gray-300 leading-relaxed">
              {badge.requirement}
            </p>

            {/* Status Badge */}
            <div className="flex justify-center">
              {badge.isUnlocked ? (
                <Badge className="bg-green-500/20 text-green-400 border-green-400/30 px-6 py-3 text-lg font-semibold flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Badge Earned!
                </Badge>
              ) : (
                <Badge className="bg-gray-500/20 text-gray-400 border-gray-400/30 px-6 py-3 text-lg font-semibold flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Locked
                </Badge>
              )}
            </div>

            {/* Earned Date */}
            {badge.isUnlocked && badge.earnedDate && (
              <div className="text-center">
                <p className="text-gray-400 text-lg">
                  Earned on {new Date(badge.earnedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}

            {/* Progress for locked badges */}
            {!badge.isUnlocked && badge.progress > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Progress</span>
                  <span>{badge.progress}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};