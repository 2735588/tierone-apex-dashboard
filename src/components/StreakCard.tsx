import { useEffect, useState } from "react";
import StreakFlame from "./StreakFlame";

function getTimeLeftToday() {
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  
  const msLeft = endOfDay.getTime() - now.getTime();
  const hoursLeft = Math.floor(msLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}`;
}

function getStreakTier(streak: number) {
  if (streak >= 100) return 'D';
  if (streak >= 30) return 'C';
  if (streak >= 7) return 'B';
  return 'A';
}

interface StreakCardProps {
  streak?: number;
  hasLoggedToday?: boolean;
}

export function StreakCard({ 
  streak = 0, 
  hasLoggedToday = false
}: StreakCardProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeftToday());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeftToday());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const tier = getStreakTier(streak);
  const showHelper = streak > 0 && !hasLoggedToday;

  return (
    <div className="px-4 mt-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 70% at 50% 0%, rgba(16,185,129,.10), transparent 70%)" }} />
        
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-3">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {streak > 0 ? "Current Streak" : "Start your streak"}
            </div>
          </div>

          {/* Main content */}
          <div className="flex items-center justify-center gap-4">
            {/* Flame */}
            <div className="flex-shrink-0">
              <StreakFlame days={streak} size={48} />
            </div>

            {/* Streak number and text */}
            <div className="text-center">
              {streak > 0 ? (
                <>
                  <div className="text-5xl font-extrabold text-emerald-400 leading-none">
                    {streak}
                  </div>
                  <div className="text-sm text-zinc-300 mt-1">days strong</div>
                </>
              ) : (
                <div className="text-base text-zinc-300">Log a workout today</div>
              )}
            </div>
          </div>

          {/* Helper text */}
          {showHelper && (
            <div className="text-center mt-3">
              <div className="text-xs text-zinc-400">
                Keep it alive: <span className="text-emerald-300 font-medium">{timeLeft} left today</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}