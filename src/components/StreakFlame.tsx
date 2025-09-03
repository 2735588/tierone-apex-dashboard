import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

function hueFor(days:number){ // 0→30+ : green→amber
  const t = Math.min(days/30, 1); // 0..1
  return 140 - 110*t;             // 140° (emerald) → 30° (orange)
}

export default function StreakFlame({
  days, size = 40
}: { days:number; size?:number }) {
  const hue = hueFor(days);
  const fill = `hsl(${hue} 90% 55%)`;
  const glow = `hsla(${hue}, 90%, 50%, ${0.35 + Math.min(days/60, .25)})`;

  return (
    <div className="relative" style={{ width:size, height:size }}>
      <div aria-hidden className="absolute inset-0 -z-10"
           style={{ filter:"blur(16px)", background:`radial-gradient(50% 50% at 50% 60%, ${glow}, transparent 70%)` }} />
      <Flame 
        size={size} 
        style={{ color: fill }} 
        className="drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}