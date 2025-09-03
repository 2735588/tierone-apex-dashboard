import { useEffect, useState } from "react";
import StreakFlame from "@/components/StreakFlame";
import { getStreak, startQuickWorkout, completeQuickWorkout, pingStreak } from "@/lib/api";

export default function WorkoutHero({ 
  streak, 
  onStreakUpdate 
}: { 
  streak: { days: number; loggedToday: boolean };
  onStreakUpdate: (newStreak: { days: number; loggedToday: boolean }) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  async function quickLog() {
    if (busy || streak.loggedToday) return;
    setBusy(true);

    try {
      // start + complete a minimal workout to count for streaks
      const { sessionId } = await startQuickWorkout();
      await completeQuickWorkout(sessionId);
      await pingStreak();

      // optimistic UI: increment once if not already logged
      const newStreak = streak.loggedToday ? streak : { days: streak.days + 1, loggedToday: true };
      onStreakUpdate(newStreak);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="px-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(90% 80% at 50% 0%, rgba(16,185,129,.16), transparent 70%)" }} />
        
        {/* Header row: flame + title + streak */}
        <div className="relative flex items-center gap-3">
          <StreakFlame days={streak.days} size={44} />
          <div className="flex-1">
            <div className="text-xl font-extrabold text-zinc-100">
              <span>{loading ? "Loading…" : "Ready to train?"}</span>
            </div>
            <div className="text-[12px] text-zinc-400">
              Keep your streak alive: go to the gym <b>4 of 7 days</b> each week.
            </div>
          </div>
        </div>

        {/* Single action: Quick Log */}
        <button
          onClick={quickLog}
          disabled={busy || streak.loggedToday}
          className={`mt-4 w-full rounded-xl px-3 py-3 font-semibold ${
            busy || streak.loggedToday
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-400 text-black"
          }`}
        >
          {streak.loggedToday ? "Logged today" : "+ Quick Log"}
        </button>

        <div className="mt-2 text-[12px] text-zinc-500">
          Tap <b>Quick Log</b> once per day to mark gym activity and keep the flame burning.
        </div>
      </div>
    </div>
  );
}