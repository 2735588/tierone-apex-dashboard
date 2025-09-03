export function OverallTierScore({
  score = 72,
  percentileLabel = "Top 30%",
  globalRank = 4821,
  nationalRank = 312,
  updated = "3 days ago",
}: {
  score?: number;
  percentileLabel?: string;
  globalRank?: number;
  nationalRank?: number;
  updated?: string;
}) {
  return (
    <div className="relative rounded-2xl p-5 mb-5 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(16,185,129,.14), transparent 70%)" }} />
      <div className="relative flex flex-col items-center text-center">
        <div className="uppercase tracking-widest text-xs md:text-sm text-zinc-300/80">
          TierScore <span className="text-zinc-500">(Objective Standard)</span>
        </div>
        {/* BIGGER than Overall Potential */}
        <div className="mt-2 text-6xl md:text-7xl font-extrabold text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.25)]">
          {score}
        </div>
        <div className="mt-2 text-emerald-300 text-sm md:text-base font-medium">{percentileLabel}</div>
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-zinc-800/80 text-zinc-200 text-[11px] px-2 py-0.5">
            Global: #{globalRank.toLocaleString()}
          </span>
          <span className="rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] px-2 py-0.5">
            National: #{nationalRank.toLocaleString()}
          </span>
        </div>
        <div className="mt-3 text-[11px] text-zinc-400">Updated • {updated}</div>
      </div>
    </div>
  );
}