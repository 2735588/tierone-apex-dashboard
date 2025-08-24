interface BrandMarkProps {
  size?: 16 | 20 | 24 | 32 | 48 | 64;
  className?: string;
  ariaLabel?: string;
}

export function BrandMark({ size = 24, className, ariaLabel = "TierOne", ...props }: BrandMarkProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center bg-gradient-primary rounded-sm ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel}
      {...props}
    >
      <span className="text-primary-foreground font-bold text-xs">T1</span>
    </div>
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
      className={`absolute inset-0 pointer-events-none flex items-center justify-center ${className}`} 
      style={{ opacity }}
      {...props}
    >
      <div className="bg-gradient-primary rounded-full w-32 h-32 flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-4xl">T1</span>
      </div>
    </div>
  );
}

export const BRAND_ASSETS = {
  mark: "/t1-mark-256.png",
  icon: "/t1-appicon-1024.png",
  og: "/t1-og-1200x630.png"
};