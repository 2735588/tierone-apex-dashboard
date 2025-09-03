export default function HexBadge({
  src,
  size = 64,
  glow = "none", // "bronze" | "silver" | "gold" | "green" | "blue" | "none"
  alt = "badge",
  className = ""
}: {
  src: string;
  size?: number;
  glow?: "bronze" | "silver" | "gold" | "green" | "blue" | "none";
  alt?: string;
  className?: string;
}) {
  const glowMap: Record<string, string> = {
    bronze: "rgba(178,106,41,.4)",
    silver: "rgba(192,198,212,.4)",
    gold:   "rgba(216,163,63,.4)",
    green:  "rgba(16,185,129,.4)",
    blue:   "rgba(59,130,246,.4)",
    none:   "transparent",
  };

  const maskId = `hex-mask-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative ${className}`} aria-label={alt} style={{ width: size, height: size }}>
      {/* SVG mask definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={maskId}>
            <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
          </clipPath>
        </defs>
      </svg>
      
      {/* Main hex image */}
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: `url("${src}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          clipPath: `url(#${maskId})`,
        }}
      />
      
      {/* Glow effect */}
      {glow !== "none" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle, ${glowMap[glow]} 0%, transparent 70%)`,
            clipPath: `url(#${maskId})`,
          }}
        />
      )}
    </div>
  );
}