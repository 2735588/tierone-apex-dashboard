export default function HexBadge({
  src,
  size = 64,
  glow = "none", // "bronze" | "silver" | "gold" | "green" | "blue" | "none"
  alt = "badge",
  className = "",
  isUnlocked = true
}: {
  src: string;
  size?: number;
  glow?: "bronze" | "silver" | "gold" | "green" | "blue" | "none";
  alt?: string;
  className?: string;
  isUnlocked?: boolean;
}) {
  const glowMap: Record<string, string> = {
    bronze: "rgba(178,106,41,.6)",
    silver: "rgba(192,198,212,.6)",
    gold:   "rgba(216,163,63,.6)",
    green:  "rgba(16,185,129,.6)",
    blue:   "rgba(59,130,246,.6)",
    none:   "transparent",
  };

  // More conservative hex clip-path that doesn't cut corners too aggressively
  const hexClipPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

  return (
    <div className={`relative ${className}`} aria-label={alt} style={{ width: size, height: size }}>
      {/* Glow effect positioned outside the hexagon */}
      {glow !== "none" && isUnlocked && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: size + 16,
            height: size + 16,
            left: -8,
            top: -8,
            boxShadow: `0 0 24px 8px ${glowMap[glow]}`,
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
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          clipPath: hexClipPath,
          filter: isUnlocked ? "none" : "grayscale(100%) opacity(0.4)",
        }}
      />
    </div>
  );
}