import { forwardRef } from "react";

export const ShareProgressCard = forwardRef<HTMLDivElement, {
  name:string; athlete:string; score:number; tier:string; muscles:{name:string;score:number}[]; variant?:"story"|"square";
}>(({ name, athlete, score, tier, muscles, variant="story" }, ref) => {
  const w = 1080, h = variant==="story" ? 1920 : 1080;
  return (
    <div ref={ref} style={{ width:w, height:h }} className="relative bg-black text-white rounded-2xl overflow-hidden">
      <div className="absolute inset-0" style={{ background:"radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,0.18), transparent 70%)" }} />
      <div className="p-16">
        <div className="text-3xl font-bold">{name}</div>
        <div className="mt-2 inline-flex items-center gap-2 text-emerald-300">{athlete}</div>
        <div className="mt-10 text-xl uppercase tracking-widest text-zinc-300">Overall Potential</div>
        <div className="text-[220px] leading-none font-extrabold text-emerald-400">{score}</div>
        <div className="text-2xl text-emerald-300">{tier}</div>
        <div className="mt-12 grid grid-cols-3 gap-8">
          {muscles.slice(0,3).map(m=>(
            <div key={m.name} className="rounded-xl bg-zinc-900/60 p-8 ring-1 ring-white/5">
              <div className="text-zinc-300">{m.name}</div>
              <div className="text-5xl font-bold text-emerald-400">{m.score}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-10 right-10 text-zinc-400 text-lg">#TierOne</div>
      </div>
    </div>
  );
});