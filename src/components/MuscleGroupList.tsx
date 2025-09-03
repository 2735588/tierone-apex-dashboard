type MG = { name:string; score:number; delta?:number };

export function MuscleGroupList({ data }:{ data:MG[] }) {
  const best  = data.reduce((a,b)=> b.score>a.score? b:a, data[0]);
  const focus = data.reduce((a,b)=> b.score<a.score? b:a, data[0]);
  
  return (
    <div className="rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-zinc-400">Muscle Group Performance</div>
        <div className="text-[11px] text-zinc-400">Last scan • 3 days ago</div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-[11px]">
        <div className="rounded-lg bg-emerald-500/10 text-emerald-300 px-2 py-1">Best: {best.name} {best.score}/100</div>
        <div className="rounded-lg bg-zinc-800/80 text-zinc-200 px-2 py-1">Focus: {focus.name} {focus.score}/100</div>
      </div>

      <div className="space-y-3">
        {data.map(m=>(
          <div key={m.name}>
            <div className="flex items-center justify-between">
              <div className="text-zinc-200 text-sm">{m.name}</div>
              <div className="flex items-center gap-2">
                {typeof m.delta==="number" && (
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${m.delta>=0?"bg-emerald-500/10 text-emerald-300":"bg-rose-500/10 text-rose-300"}`}>
                    {m.delta>=0?"+":""}{m.delta}
                  </span>
                )}
                <div className="text-zinc-400 text-sm">{m.score}<span className="text-zinc-500 text-xs">/100</span></div>
              </div>
            </div>
            <div className="mt-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${m.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
        <div>Next scan: in 4 days</div>
        <div className="text-right">Tip: long-press a muscle for scoring FAQ</div>
      </div>
    </div>
  );
}