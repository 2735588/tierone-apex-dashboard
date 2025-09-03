interface BadgeIconProps {
  src: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  glow?: "bronze" | "silver" | "gold" | "none";
}

export function BadgeIcon({ src, size = "md", label, glow = "none" }: BadgeIconProps) {
  const px = size === "sm" ? 40 : size === "lg" ? 96 : 64;
  
  const glowMap: Record<string, string> = {
    bronze: "rgba(178,106,41,.35)",
    silver: "rgba(192,198,212,.35)",
    gold: "rgba(216,163,63,.35)",
    none: "transparent",
  };

  // inline SVG hex for mask (flat-top regular hexagon)
  const hex = encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid slice'>
      <polygon points='50,0 100,25 100,75 50,100 0,75 0,25' fill='black'/>
    </svg>
  `);

  const mask = `url("data:image/svg+xml;utf8,${hex}")`;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: px, height: px }}
      >
        <img
          src={src}
          alt={label ?? "badge"}
          loading="lazy"
          decoding="async"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            WebkitMaskImage: mask,
            maskImage: mask,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain"
          }}
        />
        {/* soft glow ring, inherits mask so it stays hex */}
        {glow !== "none" && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              WebkitMaskImage: mask,
              maskImage: mask,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              boxShadow: `0 0 22px 6px ${glowMap[glow]}`
            }}
          />
        )}
      </div>
      {label && (
        <div className="mt-2 text-xs font-semibold text-zinc-200 truncate max-w-[120px]">
          {label}
        </div>
      )}
    </div>
  );
}