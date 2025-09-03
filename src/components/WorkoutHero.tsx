import { useEffect, useState } from "react";
import StreakFlame from "@/components/StreakFlame";
import { getStreak, startQuickWorkout, completeQuickWorkout, pingStreak } from "@/lib/api";

export default function WorkoutHero({
  onStartFull // optional: route to detailed logger
}: { onStartFull?: ()=>void }) {
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState<{ days:number; loggedToday:boolean }>({ days:0, loggedToday:false });
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();

  useEffect(()=>{
    (async ()=>{
      setLoading(true);
      setStreak(await getStreak());
      setLoading(false);
    })();
  },[]);

  async function quickLog() {
    setBusy(true);
    try {
      const { sessionId } = await startQuickWorkout();
      setSessionId(sessionId);
      await completeQuickWorkout(sessionId);
      await pingStreak();
      const s = await getStreak();
      setStreak(s);
    } finally { setBusy(false); }
  }

  return (
    <div className="px-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(90% 80% at 50% 0%, rgba(16,185,129,.16), transparent 70%)" }} />
        <div className="relative flex items-center gap-3">
          <StreakFlame days={streak.days} size={44} />
          <div className="flex-1">
            <div className="text-xl font-extrabold text-zinc-100">
              {loading ? "Loading…" : streak.loggedToday ? "Workout logged today" : "Ready to train?"}
            </div>
            <div className="text-[12px] text-zinc-400">
              {streak.days}-day streak • keep the flame burning
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={onStartFull}
            className="rounded-xl px-3 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium">
            Open Logger
          </button>
          <button
            onClick={quickLog}
            disabled={busy || streak.loggedToday}
            className={`rounded-xl px-3 py-3 font-semibold ${
              busy || streak.loggedToday
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-black"
            }`}>
            {streak.loggedToday ? "Already Logged" : "+ Quick Log"}
          </button>
        </div>

        <div className="mt-2 text-[12px] text-zinc-500">
          Quick Log marks activity for today (counts toward streak). Use the logger for sets & PRs.
        </div>
      </div>
    </div>
  );
}