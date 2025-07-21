import { Scan, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ScanButton = () => {
  return (
    <div className="relative">
      {/* Scan button with ripple effect */}
      <Button 
        className="scan-button w-20 h-20 rounded-full bg-gradient-primary hover:bg-gradient-primary border-2 border-accent/30 tier-glow transition-all duration-300 hover:scale-105"
        size="lg"
      >
        <div className="flex flex-col items-center gap-1">
          <Scan className="w-6 h-6 text-primary-foreground" />
          <span className="text-xs font-semibold text-primary-foreground">SCAN</span>
        </div>
      </Button>
      
      {/* Secondary camera indicator */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center tier-glow">
        <Camera className="w-3 h-3 text-accent-foreground" />
      </div>
    </div>
  );
};