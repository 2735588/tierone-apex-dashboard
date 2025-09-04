export const TIER_BADGE_SRC: Record<"bronze"|"silver"|"gold"|"diamond"|"emerald", string> = {
  bronze:  "/lovable-uploads/65d9305f-1a94-40d2-b250-2f765da7e4c8.png",
  silver:  "/lovable-uploads/692bf62e-ddac-4e9d-9109-a40cacc38e5d.png", 
  gold:    "/lovable-uploads/7188c940-69c8-4a96-b333-27323f631ad2.png",
  diamond: "/lovable-uploads/d832c910-8a35-4ebd-9604-136fa047bf7e.png",
  emerald: "/lovable-uploads/0a7c5346-a421-499f-90e7-385107439d7c.png", // emerald (top 1%)
};

type TierName = "bronze" | "silver" | "gold" | "diamond" | "emerald";

/**
 * @param score number   // user TierScore (0–100)
 * @param percentile number | undefined // user global percentile (0–100). e.g., 0.9 means top 0.9%.
 *        If you don't have percentile, pass `undefined` and Emerald won't trigger.
 */
export function getTierName(score: number, percentile?: number): TierName {
  // Emerald if user is top 1% (i.e., percentile <= 1)
  if (percentile !== undefined && percentile <= 1) return "emerald";

  if (score < 60) return "bronze";
  if (score < 70) return "silver";
  if (score < 80) return "gold";
  if (score < 90) return "diamond";
  // If score >= 90 but not top 1%, still diamond
  return "diamond";
}

export function getTierBadgeSrc(score: number, percentile?: number) {
  return TIER_BADGE_SRC[getTierName(score, percentile)];
}

export function getTierGlow(score: number, percentile?: number): "bronze"|"silver"|"gold"|"blue"|"emerald" {
  const tier = getTierName(score, percentile);
  switch (tier) {
    case "emerald": return "emerald";
    case "diamond": return "blue";
    case "gold": return "gold";
    case "silver": return "silver";
    default: return "bronze";
  }
}