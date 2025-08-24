interface BrandMarkProps {
  size?: 16 | 20 | 24 | 32 | 48 | 64 | 128 | 256 | 512;
  className?: string;
  ariaLabel?: string;
}

function getOptimalMarkSize(size: number): string {
  if (size <= 32) return "/t1-mark-32.png";
  if (size <= 64) return "/t1-mark-64.png";
  if (size <= 128) return "/t1-mark-128.png";
  if (size <= 256) return "/t1-mark-256.png";
  return "/t1-mark-512.png";
}

export function BrandMark({ size = 24, className, ariaLabel = "TierOne", ...props }: BrandMarkProps) {
  const srcPath = getOptimalMarkSize(size);
  
  return (
    <img 
      src={srcPath}
      alt="TierOne logo" 
      width={size} 
      height={size} 
      className={className}
      loading="lazy"
      aria-label={ariaLabel}
      {...props} 
    />
  );
}

interface BrandWordmarkProps {
  children: React.ReactNode;
  className?: string;
}

export function BrandWordmark({ children, className, ...props }: BrandWordmarkProps) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}

interface BrandWatermarkProps {
  opacity?: number;
  className?: string;
}

export function BrandWatermark({ opacity = 0.06, className, ...props }: BrandWatermarkProps) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none ${className}`} 
      style={{ opacity }}
      {...props}
    >
      <img 
        src="/t1-mark-512.png" 
        alt="" 
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

export const BRAND_ASSETS = {
  mark: "/t1-mark-512.png",
  markSizes: {
    32: "/t1-mark-32.png",
    64: "/t1-mark-64.png", 
    128: "/t1-mark-128.png",
    256: "/t1-mark-256.png",
    512: "/t1-mark-512.png",
    1024: "/t1-mark-1024.png"
  },
  appIcon: "/t1-appicon-1024.png",
  appIconSizes: {
    192: "/t1-appicon-192.png",
    512: "/t1-appicon-512.png",
    1024: "/t1-appicon-1024.png"
  },
  og: "/t1-og-1200x630.png"
};