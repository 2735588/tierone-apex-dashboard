import { useEffect, useState } from "react";

function hueFor(days:number){ // 0→30+ : green→amber
  const t = Math.min(days/30, 1); // 0..1
  return 140 - 110*t;             // 140° (emerald) → 30° (orange)
}

export default function StreakFlame({
  days, size = 40
}: { days:number; size?:number }) {
  const [reduce,setReduce]=useState(false);
  useEffect(()=>{
    const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const h=(e:MediaQueryListEvent)=>setReduce(e.matches);
    mq.addEventListener?.("change",h); return ()=>mq.removeEventListener?.("change",h);
  },[]);
  const hue = hueFor(days);
  const fill = `hsl(${hue} 90% 55%)`;
  const glow = `hsla(${hue}, 90%, 50%, ${0.35 + Math.min(days/60, .25)})`;

  return (
    <div className="relative" style={{ width:size, height:size }}>
      <div aria-hidden className="absolute inset-0 -z-10"
           style={{ filter:"blur(16px)", background:`radial-gradient(50% 50% at 50% 60%, ${glow}, transparent 70%)` }} />
      <svg viewBox="0 0 64 64" width={size} height={size}
           className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor={fill}/>
            <stop offset="100%" stopColor="hsl(0 0% 100% / .9)"/>
          </linearGradient>
        </defs>
        {/* flame shape */}
        <path
          d="M32 4c6 10-3 14 7 20 10 6 10 18 0 26-10 8-26 3-28-9-2-10 5-15 10-18 4-3 5-6 5-9 0-3 4-5 6-10z"
          fill="url(#g)">
          {!reduce && (
            <animate attributeName="d" dur="1.8s" repeatCount="indefinite"
              values="
              M32 4c6 10-3 14 7 20 10 6 10 18 0 26-10 8-26 3-28-9-2-10 5-15 10-18 4-3 5-6 5-9 0-3 4-5 6-10z;
              M32 4c6 10-3 14 8 19 10 6 11 18 1 26-10 8-26 3-28-9-2-10 5-15 10-18 4-3 5-6 5-9 0-3 4-5 4-9z;
              M32 4c6 10-3 14 7 20 10 6 10 18 0 26-10 8-26 3-28-9-2-10 5-15 10-18 4-3 5-6 5-9 0-3 4-5 6-10z"/>
          )}
        </path>
      </svg>
    </div>
  );
}