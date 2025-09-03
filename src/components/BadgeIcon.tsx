interface BadgeIconProps {
  src: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  glowColor?: string;
}

export function BadgeIcon({ src, size = "md", label, glowColor }: BadgeIconProps) {
  const px = size === "sm" ? 40 : size === "lg" ? 96 : 64;
  
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        style={{ width: px, height: px }}
      >
        {glowColor && (
          <div 
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: `0 0 24px 4px ${glowColor}59` }} 
          />
        )}
        <img
          src={src}
          alt={label ?? "badge"}
          className="absolute inset-0 m-auto"
          style={{
            width: px, 
            height: px,
            objectFit: "contain",
            imageRendering: "auto"
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
      {label && (
        <div className="mt-2 text-xs font-semibold text-zinc-200 truncate max-w-[120px]">
          {label}
        </div>
      )}
    </div>
  );
}