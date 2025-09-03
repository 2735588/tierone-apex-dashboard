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

  // More conservative hex clip-path that doesn't cut corners too aggressively
  const hexClipPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

  return (
    <div className={`relative ${className}`} aria-label={alt} style={{ width: size, height: size }}>
      {/* Glow effect positioned behind and slightly larger */}
      {glow !== "none" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            width: size + 8,
            height: size + 8,
            left: -4,
            top: -4,
            background: `radial-gradient(ellipse, ${glowMap[glow]} 30%, transparent 70%)`,
            clipPath: hexClipPath,
          }}
        />
      )}
      
      {/* Main hex image */}
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: `url("${src}")`,
          backgroundSize: "contain", // Changed from cover to contain to prevent cropping
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          clipPath: hexClipPath,
        }}
      />
    </div>
  );
}