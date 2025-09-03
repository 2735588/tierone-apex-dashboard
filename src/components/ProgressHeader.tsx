export function ProgressHeader({
  name = "Braedon Williams",
  athlete = "Hybrid Athlete",
  onShare,
  onNewScan
}: { name?: string; athlete?: string; onShare?: ()=>void; onNewScan?: ()=>void }) {
  return (
    <div className="relative rounded-2xl p-4 mb-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 70%)" }} />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-800 grid place-items-center text-zinc-200 font-semibold">BW</div>
          <div>
            <div className="text-sm font-semibold text-zinc-100">{name}</div>
            <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {athlete}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onShare} className="rounded-xl px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm">Share</button>
          <button onClick={onNewScan} className="rounded-xl px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold">New Scan</button>
        </div>
      </div>
    </div>
  );
}