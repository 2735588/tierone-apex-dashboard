export function OverallPotential({
  score = 98,
  tier = "Diamond Tier",
  delta = +3,
  onHowItWorks,
}: { score?: number; tier?: string; delta?: number; onHowItWorks?:()=>void }) {
  const pos = delta >= 0;
  return (
    <div className="relative rounded-2xl p-4 mb-5 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
           style={{ background: "radial-gradient(55% 60% at 50% 0%, rgba(16,185,129,0.10), transparent 70%)" }} />
      <div className="relative flex flex-col items-center text-center">
        <div className="uppercase tracking-widest text-[11px] md:text-xs text-zinc-300/80">Overall Potential</div>
        {/* SMALLER than TierScore now */}
        <div className="mt-1 text-4xl md:text-5xl font-extrabold text-emerald-400">{score}</div>
        <div className="mt-1 text-emerald-300 text-[13px] md:text-sm">{tier}</div>
        <div className={`mt-0.5 text-[11px] ${pos? "text-emerald-400":"text-rose-400"}`}>
          {pos?"+":""}{delta} in last 30 days
        </div>
        <button onClick={onHowItWorks} className="mt-2 text-[12px] text-zinc-400 hover:text-zinc-200">
          ⓘ How TierScore works
        </button>
      </div>
    </div>
  );
}