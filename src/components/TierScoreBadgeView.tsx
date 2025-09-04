import { getTierBadgeSrc, getTierName, getTierGlow } from "@/lib/tierScoreBadge";
import HexBadge from "./HexBadge";

export function TierScoreBadgeView({
  score,
  percentile, // pass global percentile (0–100). If you track rank, compute as rank/totalUsers*100.
  size = 160,  // px; tweak to match your design
}: {
  score: number;
  percentile?: number;
  size?: number;
}) {
  const src = getTierBadgeSrc(score, percentile);
  const tierName = getTierName(score, percentile);
  const glow = getTierGlow(score, percentile);
  
  // Make Silver tier bigger
  const adjustedSize = tierName === 'silver' ? size * 1.25 : size; // 25% bigger for silver

  return (
    <div className="w-full flex items-center justify-center my-4">
      <HexBadge
        src={src}
        size={adjustedSize}
        glow={glow}
        alt={`TierScore ${tierName} badge`}
        isUnlocked={true}
      />
    </div>
  );
}