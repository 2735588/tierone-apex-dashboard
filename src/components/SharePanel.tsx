import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SharePanelProps {
  onShare: () => void;
}

export function SharePanel({ onShare }: SharePanelProps) {
  return (
    <div className="px-6 py-4">
      <Button 
        onClick={onShare}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
        size="lg"
      >
        <Share className="w-4 h-4 mr-2" />
        Create Share Card
      </Button>
    </div>
  );
}