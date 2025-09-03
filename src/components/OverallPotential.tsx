export function OverallPotential({ score=98, tier="Diamond Tier", delta=+3 }:{
  score?: number; tier?: string; delta?: number;
}) {
  const pos = delta>=0;
  return (
    <div className="relative rounded-2xl p-5 mb-5 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 60% at 50% 0%, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0) 70%)" }} />
      <div className="relative flex flex-col items-center">
        <div className="uppercase tracking-widest text-xs md:text-sm text-zinc-300/80">Overall Potential</div>
        <div className="mt-2 text-6xl md:text-7xl font-extrabold text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.25)]">{score}</div>
        <div className="mt-2 text-emerald-300 text-sm font-medium">{tier}</div>
        <div className={`mt-1 text-[12px] ${pos? "text-emerald-400":"text-rose-400"}`}>{pos? "+":""}{delta} in last 30 days</div>
        <button className="mt-3 text-[12px] text-zinc-400 hover:text-zinc-200">ⓘ How TierScore works</button>
      </div>
    </div>
  );
}