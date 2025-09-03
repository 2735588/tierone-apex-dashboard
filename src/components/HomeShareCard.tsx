import { forwardRef } from "react";

export const HomeShareCard = forwardRef<HTMLDivElement, {
  name: string; athlete: string; score: number; tier: string;
  top: { name:string; score:number }[]; variant?: "story" | "square";
}>(({ name, athlete, score, tier, top, variant="story" }, ref) => {
  const w = 1080, h = variant==="story" ? 1920 : 1080;
  return (
    <div ref={ref} style={{ width:w, height:h }} className="relative bg-black text-white rounded-2xl overflow-hidden">
      <div className="absolute inset-0" style={{ background:"radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,.18), transparent 70%)" }} />
      <div className="p-16">
        <img src="/t1-appicon-1024.png" className="h-80 w-80 opacity-10 absolute -right-10 -top-10" />
        <div className="text-3xl font-bold">{name}</div>
        <div className="mt-2 text-emerald-300">{athlete}</div>
        <div className="mt-10 text-xl uppercase tracking-widest text-zinc-300">TierScore</div>
        <div className="text-[220px] leading-none font-extrabold text-emerald-400">{score}</div>
        <div className="text-2xl text-emerald-300">{tier} Tier</div>
        <div className="mt-12 grid grid-cols-3 gap-8">
          {top.slice(0,3).map(m=>(
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

HomeShareCard.displayName = "HomeShareCard";