import { useEffect, useState } from 'react';

interface SplashScreenProps {
  show: boolean;
  logo?: string;
  tagline?: string;
}

export function SplashScreen({ 
  show, 
  logo = "/t1-mark-1024.png", 
  tagline = "Preparing your TierScore…" 
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(show);
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (!show && isVisible) {
      // Start fade out animation
      setIsVisible(false);
      // Remove from DOM after animation completes
      setTimeout(() => setShouldRender(false), 500);
    } else if (show && !shouldRender) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [show, isVisible, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Logo with pulse animation */}
      <div className="relative">
        <img 
          src={logo} 
          alt="TierOne" 
          className="h-20 w-20 animate-pulse"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(16,185,129,0.3))'
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 h-20 w-20 rounded-full animate-ping"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
            animationDuration: '2s'
          }}
        />
      </div>

      {/* Tagline */}
      <div className="mt-6 text-sm text-muted-foreground animate-fade-in">
        {tagline}
      </div>

      {/* Loading dots */}
      <div className="mt-4 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/60"
            style={{
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-pulse, .animate-ping, .animate-fade-in {
              animation: none;
            }
          }
        `
      }} />
    </div>
  );
}