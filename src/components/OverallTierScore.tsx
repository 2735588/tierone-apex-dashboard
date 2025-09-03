export function OverallTierScore({
  score = 72,
  percentileLabel = "Top 30%",
  globalRank = 4821,
  nationalRank = 312,
  updated = "3 days ago",
  onShare,
  onViewLeaderboards,
}: {
  score?: number;
  percentileLabel?: string;
  globalRank?: number;
  nationalRank?: number;
  updated?: string;
  onShare?: () => void;
  onViewLeaderboards?: () => void;
}) {
  return (
    <div className="relative rounded-2xl p-4 mb-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 60% at 50% 0%, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 70%)" }}
      />
      <div className="relative flex flex-col items-center">
        <div className="uppercase tracking-widest text-[11px] md:text-xs text-zinc-300/80">
          TierScore <span className="text-zinc-500">(Objective Standard)</span>
        </div>

        {/* slightly smaller than Overall Potential */}
        <div className="mt-1 text-4xl md:text-5xl font-extrabold text-emerald-400 drop-shadow-[0_0_14px_rgba(16,185,129,0.25)]">
          {score}
        </div>

        <div className="mt-1 text-emerald-300 text-[13px] md:text-sm">{percentileLabel}</div>

        {/* rank chips */}
        <div className="mt-2 flex items-center gap-2">
          <span className="rounded-full bg-zinc-800/80 text-zinc-200 text-[11px] px-2 py-0.5">
            Global: #{globalRank.toLocaleString()}
          </span>
          <span className="rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] px-2 py-0.5">
            National: #{nationalRank.toLocaleString()}
          </span>
        </div>

        {/* meta + actions */}
        <div className="mt-3 flex w-full items-center justify-between gap-2">
          <div className="text-[11px] text-zinc-400">Updated • {updated}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={onShare}
              className="rounded-lg px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[12px]"
            >
              Share
            </button>
            <button
              onClick={onViewLeaderboards}
              className="rounded-lg px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black text-[12px] font-semibold"
            >
              View Leaderboards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}