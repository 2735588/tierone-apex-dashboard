export function PerformanceSummary({
  potentialScore = 98,
  potentialTier = "Diamond Tier",
  potentialDelta = +3,
  tierScore = 72,
  percentileLabel = "Top 30%",
  globalRank = 4821,
  nationalRank = 312,
  updated = "3 days ago",
  onShare,
  onViewLeaderboards,
  onHowItWorks
}: {
  potentialScore?: number;
  potentialTier?: string;
  potentialDelta?: number;
  tierScore?: number;
  percentileLabel?: string;
  globalRank?: number;
  nationalRank?: number;
  updated?: string;
  onShare?: () => void;
  onViewLeaderboards?: () => void;
  onHowItWorks?: () => void;
}) {
  const pos = potentialDelta >= 0;
  return (
    <section className="relative rounded-2xl p-5 mb-5 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 70% at 50% 0%, rgba(16,185,129,.14), transparent 70%)" }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {/* Overall Potential (left) */}
        <div className="flex flex-col items-center text-center">
          <div className="uppercase tracking-widest text-xs md:text-sm text-zinc-300/80">Overall Potential</div>
          <div className="mt-2 text-6xl md:text-7xl font-extrabold text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.25)]">
            {potentialScore}
          </div>
          <div className="mt-2 text-emerald-300 text-sm font-medium">{potentialTier}</div>
          <div className={`mt-1 text-[12px] ${pos ? "text-emerald-400" : "text-rose-400"}`}>
            {pos ? "+" : ""}{potentialDelta} in last 30 days
          </div>
          <button
            onClick={onHowItWorks}
            className="mt-3 text-[12px] text-zinc-400 hover:text-zinc-200"
          >
            ⓘ How TierScore works
          </button>
        </div>

        {/* Divider on desktop */}
        <div className="hidden md:block w-px bg-white/5 my-2" aria-hidden />

        {/* TierScore (right) */}
        <div className="flex flex-col items-center text-center">
          <div className="uppercase tracking-widest text-[11px] md:text-xs text-zinc-300/80">
            TierScore <span className="text-zinc-500">(Objective Standard)</span>
          </div>
          <div className="mt-2 text-4xl md:text-5xl font-extrabold text-emerald-400 drop-shadow-[0_0_14px_rgba(16,185,129,0.25)]">
            {tierScore}
          </div>
          <div className="mt-1 text-emerald-300 text-[13px] md:text-sm">{percentileLabel}</div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full bg-zinc-800/80 text-zinc-200 text-[11px] px-2 py-0.5">
              Global: #{globalRank.toLocaleString()}
            </span>
            <span className="rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] px-2 py-0.5">
              National: #{nationalRank.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">Updated • {updated}</div>
        </div>
      </div>

    </section>
  );
}