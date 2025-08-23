interface BrandMarkProps {
  size?: 16 | 20 | 24 | 32 | 48 | 64;
  className?: string;
  ariaLabel?: string;
}

export function BrandMark({ size = 24, className, ariaLabel = "TierOne", ...props }: BrandMarkProps) {
  return (
    <img 
      src="/t1-mark-256.png" 
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
        src="/t1-mark-256.png" 
        alt="" 
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

export const BRAND_ASSETS = {
  mark: "/t1-mark-256.png",
  icon: "/t1-appicon-1024.png",
  og: "/t1-og-1200x630.png"
};