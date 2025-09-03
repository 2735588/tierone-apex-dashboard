export function StreakCard({ streak = 7 }: { streak?: number }) {
  return (
    <div className="px-4 mt-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 70% at 50% 0%, rgba(16,185,129,.10), transparent 70%)" }} />
        <div className="relative">
          <div className="text-[11px] uppercase tracking-widest text-zinc-400">Current Streak</div>
          <div className="mt-1 text-4xl font-extrabold text-emerald-400">{streak}</div>
          <div className="text-[12px] text-zinc-300">days strong</div>
        </div>
      </div>
    </div>
  );
}