import { useEffect, useState } from "react";

export default function T1Logo3D({
  src = "/lovable-uploads/d97184d5-8e48-44be-9fde-6b7578e17c18.png",
  size = 144,
  speed = 10,
  glow = "rgba(16,185,129,0.18)",
  tilt = 8,
}: {
  src?: string;
  size?: number;
  speed?: number;
  glow?: string;
  tilt?: number;
}) {
  const [prefersReduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const spinStyle = {
    animationName: 'spin3d',
    animationDuration: `${speed}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  };

  return (
    <>
      <style>{`
        @keyframes spin3d {
          0%   { transform: rotateY(0deg)   rotateX(${tilt}deg); }
          50%  { transform: rotateY(180deg) rotateX(${tilt}deg); }
          100% { transform: rotateY(360deg) rotateX(${tilt}deg); }
        }
      `}</style>
      
      <div className="relative w-full grid place-items-center py-4">
        {/* background glow */}
        <div
          aria-hidden
          className="absolute -z-10"
          style={{
            width: size * 3,
            height: size * 3,
            filter: "blur(36px)",
            background: `radial-gradient(circle at 50% 30%, ${glow}, rgba(0,0,0,0) 60%)`,
          }}
        />
        {/* perspective wrapper */}
        <div
          className="relative"
          style={{ width: size, height: size * 0.72, perspective: 900 }}
        >
          {/* spinner */}
          <div
            className="relative will-change-transform"
            style={{
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              ...(prefersReduced ? {} : spinStyle),
            }}
          >
            {/* "card" face with logo */}
            <img
              src={src}
              alt="TierOne"
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                transform: `rotateX(${tilt}deg) translateZ(0px)`,
                filter: "drop-shadow(0 6px 18px rgba(16,185,129,0.32))",
              }}
            />
            {/* subtle backside reflection for 3D illusion */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                transform: `rotateY(180deg) rotateX(${tilt}deg)`,
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.05), rgba(255,255,255,0) 70%)",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}