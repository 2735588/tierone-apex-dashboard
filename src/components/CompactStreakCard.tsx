import { useEffect, useState } from "react";

interface CompactStreakCardProps {
  streak: number;
}

export function CompactStreakCard({ streak }: CompactStreakCardProps) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const nextMilestone = (() => {
    if (streak < 7) return { target: 7, label: "1 week" };
    if (streak < 30) return { target: 30, label: "1 month" };
    if (streak < 100) return { target: 100, label: "100 days" };
    if (streak < 365) return { target: 365, label: "1 year" };
    if (streak < 1000) return { target: 1000, label: "1000 days" };
    return { target: streak + 100, label: `${streak + 100} days` };
  })();

  const daysToMilestone = nextMilestone.target - streak;

  return (
    <div className="px-4 mt-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 70% at 50% 0%, rgba(16,185,129,.08), transparent 70%)" }} />
        
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-zinc-400">Current Streak</div>
              <div className="mt-0.5 text-2xl font-extrabold text-emerald-400">{streak}</div>
              <div className="text-[11px] text-zinc-300">days strong</div>
            </div>
            
            <div className="text-right">
              <div className="text-[11px] text-zinc-400">Keep alive</div>
              <div className="text-sm font-bold text-emerald-300">{timeLeft}</div>
              <div className="text-[10px] text-zinc-500">left today</div>
            </div>
          </div>
          
          {daysToMilestone > 0 && (
            <div className="mt-3 text-center">
              <div className="text-[11px] text-zinc-400">
                {daysToMilestone} day{daysToMilestone !== 1 ? 's' : ''} to {nextMilestone.label}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}