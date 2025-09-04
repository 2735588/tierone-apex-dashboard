export type TierOpt = "Bronze" | "Silver" | "Gold" | "Diamond" | "Tier One (Emerald)";

export const TIER_OPTS: TierOpt[] = ["Bronze", "Silver", "Gold", "Diamond", "Tier One (Emerald)"];

export function getTierFromScore(score: number, percentile?: number): TierOpt {
  if (percentile !== undefined && percentile <= 1) return "Tier One (Emerald)";
  if (score < 60) return "Bronze";
  if (score < 70) return "Silver";  
  if (score < 80) return "Gold";
  if (score < 90) return "Diamond";
  return "Diamond";
}

export function filterAndSort(users: any[], tier: TierOpt, q: string) {
  const norm = (s: string) => s.toLowerCase();
  
  // Add tierLabel to users based on their score/percentile
  const usersWithTier = users.map(user => ({
    ...user,
    tierLabel: getTierFromScore(user.score, user.percentile)
  }));
  
  const inTier = usersWithTier.filter(u => u.tierLabel === tier);
  const searched = q ? inTier.filter(u => norm(u.username).includes(norm(q))) : inTier;
  
  return searched.sort((a, b) =>
    new Date(b.lastWorkoutAt || 0).getTime() - new Date(a.lastWorkoutAt || 0).getTime() ||
    (b.prCount || 0) - (a.prCount || 0) ||
    a.username.localeCompare(b.username)
  );
}