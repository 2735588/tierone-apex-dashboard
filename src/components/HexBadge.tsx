// Use URL-encoded SVG directly to avoid btoa issues
const HEX_MASK_SVG = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3cpolygon points='50,0 100,25 100,75 50,100 0,75 0,25' fill='black'/%3e%3c/svg%3e";

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

  const maskStyle = {
    WebkitMask: `url("${HEX_MASK_SVG}") no-repeat center / contain`,
    mask: `url("${HEX_MASK_SVG}") no-repeat center / contain`,
  };

  return (
    <div className={`relative ${className}`} aria-label={alt}>
      {/* Main hex image */}
      <div
        style={{
          width: size,
          height: size,
          backgroundImage: `url("${src}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          ...maskStyle,
        }}
      />
      
      {/* Glow effect */}
      {glow !== "none" && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            ...maskStyle,
            boxShadow: `0 0 20px 8px ${glowMap[glow]}`,
          }}
        />
      )}
    </div>
  );
}