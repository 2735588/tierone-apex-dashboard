const HEX_MASK_BASE64 =
  "data:image/svg+xml;base64," +
  btoa(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <polygon points='50,0 100,25 100,75 50,100 0,75 0,25' fill='black'/>
    </svg>
  `);

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
    bronze: "rgba(178,106,41,.35)",
    silver: "rgba(192,198,212,.35)",
    gold:   "rgba(216,163,63,.35)",
    green:  "rgba(16,185,129,.35)",
    blue:   "rgba(59,130,246,.35)",
    none:   "transparent",
  };

  return (
    <div className={`relative ${className}`} aria-label={alt}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",          // keep scale
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        WebkitMaskImage: `url(${HEX_MASK_BASE64})`,
        maskImage: `url(${HEX_MASK_BASE64})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    >
      {/* soft glow that respects the same mask */}
      {glow !== "none" && (
        <div className="pointer-events-none absolute inset-0"
             style={{
               WebkitMaskImage: `url(${HEX_MASK_BASE64})`,
               maskImage: `url(${HEX_MASK_BASE64})`,
               WebkitMaskRepeat: "no-repeat",
               maskRepeat: "no-repeat",
               WebkitMaskSize: "contain",
               maskSize: "contain",
               WebkitMaskPosition: "center",
               maskPosition: "center",
               boxShadow: `0 0 22px 6px ${glowMap[glow]}`
             }} />
      )}
    </div>
  );
}