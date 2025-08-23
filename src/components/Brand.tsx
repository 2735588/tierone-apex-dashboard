interface BrandMarkProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export function BrandMark({ width = 24, height = 24, className, alt = "TierOne logo", ...props }: BrandMarkProps) {
  return (
    <img 
      src="/lovable-uploads/675bf1fa-5029-4a85-8d18-374a63536abd.png" 
      alt={alt} 
      width={width} 
      height={height} 
      className={className}
      {...props} 
    />
  );
}

export const BRAND_ASSETS = {
  favicon: "/lovable-uploads/3a40bdc6-8f9c-42a3-8d82-f9bb666db820.png",
  og: "/lovable-uploads/a6746a21-c406-4329-807e-0e3c2d55c8b2.png",
  mark: "/lovable-uploads/675bf1fa-5029-4a85-8d18-374a63536abd.png"
};