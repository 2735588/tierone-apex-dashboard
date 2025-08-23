import { useState, useRef } from "react";
import { Download, Copy, Share, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { ScorePayload } from "@/services";
import { toast } from "@/hooks/use-toast";
import { BrandMark } from "@/components/Brand";

interface ShareCardProps {
  scoreData: ScorePayload;
  handle?: string;
}

export const ShareCard = ({ scoreData, handle = "@athlete" }: ShareCardProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getTopMuscles = () => {
    return scoreData.muscle_scores
      .sort((a, b) => b.tier_score - a.tier_score)
      .slice(0, 3);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Legend": return "text-purple-400";
      case "Diamond": return "text-cyan-400";
      case "Platinum": return "text-gray-300";
      case "Gold": return "text-yellow-400";
      case "Silver": return "text-gray-400";
      case "Bronze": return "text-orange-400";
      default: return "text-accent";
    }
  };

  const exportAsImage = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#000000",
        scale: 2,
        width: 400,
        height: 600,
        useCORS: true
      });

      return canvas;
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Export failed",
        description: "Please try again",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownload = async () => {
    const canvas = await exportAsImage();
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `tierone-score-${scoreData.overall_score}.png`;
    link.href = canvas.toDataURL();
    link.click();

    toast({
      title: "Downloaded!",
      description: "Your share card has been saved"
    });
  };

  const handleCopyImage = async () => {
    const canvas = await exportAsImage();
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          toast({
            title: "Copied!",
            description: "Share card copied to clipboard"
          });
        }
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Download the image instead",
        variant: "destructive"
      });
    }
  };

  const topMuscles = getTopMuscles();

  return (
    <div className="space-y-4">
      {/* Hidden card for export */}
      <div 
        ref={cardRef}
        className="w-[400px] h-[600px] bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 flex flex-col justify-between"
        style={{ 
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: isExporting ? "absolute" : "relative",
          left: isExporting ? "-9999px" : "auto",
          top: isExporting ? "-9999px" : "auto"
        }}
      >
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <BrandMark width={16} height={16} className="filter brightness-0 invert" />
            </div>
            <span className="text-white font-bold text-xl">TierOne</span>
          </div>
          
          <div className="text-gray-400 text-lg mb-2">{handle}</div>
        </div>

        {/* Main Score */}
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-2">
            {scoreData.overall_score}
          </div>
          <div className="text-xl text-gray-300 mb-6">TierScore</div>
          
          <div className={`text-2xl font-bold mb-8 ${getTierColor(scoreData.tier)}`}>
            {scoreData.tier} Tier
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">Body Fat</span>
            <span className="text-white font-bold">{scoreData.bodyfat_pct}%</span>
          </div>
          
          <div className="space-y-2">
            <div className="text-gray-400 text-sm mb-2">Top Muscle Groups</div>
            {topMuscles.map((muscle, index) => (
              <div key={muscle.muscle_group} className="flex justify-between items-center">
                <span className="text-gray-300">{muscle.muscle_group}</span>
                <span className="text-cyan-400 font-bold">{muscle.tier_score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="text-gray-500 text-sm">
            Scan your physique at tierone.app
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleCopyImage}
          disabled={isExporting}
          className="flex-1 bg-gradient-primary hover:bg-gradient-primary/90"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          Copy Image
        </Button>
        
        <Button
          onClick={handleDownload}
          disabled={isExporting}
          variant="outline"
          className="flex-1"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Download
        </Button>
      </div>
    </div>
  );
};