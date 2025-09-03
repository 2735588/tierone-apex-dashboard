import { useEffect, useState } from "react";

export default function T1LogoHero({
  src = "/lovable-uploads/dc0ffd36-4e86-4391-a662-5207dbc88ba2.png",   // or "/t1-appicon-1024.png"
  size = 160,                  // px
  tilt = 10,                   // X tilt (deg)
  yaw = 16,                    // left↔right swing (deg)
  period = 7,                  // seconds per full swing (L→R→L)
  glow = "rgba(16,185,129,0.22)"
}: {
  src?: string; size?: number; tilt?: number; yaw?: number; period?: number; glow?: string;
}) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  return (
    <div className="relative w-full grid place-items-center py-4">
      {/* soft brand glow */}
      <div
        aria-hidden
        className="absolute -z-10"
        style={{
          width: size * 3,
          height: size * 2.4,
          filter: "blur(38px)",
          background: `radial-gradient(60% 60% at 50% 30%, ${glow}, rgba(0,0,0,0) 70%)`,
        }}
      />
      <div style={{ perspective: 900 }}>
        <div
          className="relative will-change-transform"
          style={{
            width: size,
            height: size * 0.72,
            transformStyle: "preserve-3d",
            animation: reduce ? undefined : `swing ${period}s ease-in-out infinite`,
          }}
        >
          {/* logo */}
          <img
            src={src}
            alt="TierOne"
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              transform: `rotateX(${tilt}deg)`,
              filter: "drop-shadow(0 8px 18px rgba(16,185,129,0.35))",
            }}
          />

          {/* glossy sweep */}
          {!reduce && (
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(110deg, rgba(255,255,255,0) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 55%)",
                mixBlendMode: "screen",
                transform: `rotateX(${tilt}deg) translateX(-120%)`,
                animation: `shine ${Math.max(1, period*1.25)}s ease-in-out infinite`,
              }}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes swing {
          0%   { transform: rotateY(-${yaw}deg) rotateX(${tilt}deg); }
          50%  { transform: rotateY(${yaw}deg)  rotateX(${tilt}deg); }
          100% { transform: rotateY(-${yaw}deg) rotateX(${tilt}deg); }
        }
        @keyframes shine {
          0%, 75% { transform: rotateX(${tilt}deg) translateX(-120%); opacity: 0; }
          80%     { opacity: .35; }
          100%    { transform: rotateX(${tilt}deg) translateX(140%); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { animation: none !important; }
        }
      `}</style>
    </div>
  );
}