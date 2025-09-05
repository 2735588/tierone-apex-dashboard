import { MAIN_LIFTS } from "./pr";

export type TierOpt = "Bronze" | "Silver" | "Gold" | "Diamond" | "Tier One (Emerald)";
export type PRFilterOpt = typeof MAIN_LIFTS[number];
export type FilterOpt = TierOpt | PRFilterOpt;

export const TIER_OPTS: TierOpt[] = ["Bronze", "Silver", "Gold", "Diamond", "Tier One (Emerald)"];
export const PR_OPTS: PRFilterOpt[] = [...MAIN_LIFTS];
export const ALL_FILTER_OPTS: FilterOpt[] = [...TIER_OPTS, ...PR_OPTS];

export function getTierFromScore(score: number, percentile?: number): TierOpt {
  if (percentile !== undefined && percentile <= 1) return "Tier One (Emerald)";
  if (score < 60) return "Bronze";
  if (score < 70) return "Silver";  
  if (score < 80) return "Gold";
  if (score < 90) return "Diamond";
  return "Diamond";
}

export function filterAndSort(users: any[], filter: FilterOpt, q: string) {
  const norm = (s: string) => s.toLowerCase();
  
  // Add tierLabel to users based on their score/percentile
  const usersWithTier = users.map(user => ({
    ...user,
    tierLabel: getTierFromScore(user.score, user.percentile)
  }));
  
  let filtered: any[];
  
  // Check if it's a tier filter or PR filter
  if (TIER_OPTS.includes(filter as TierOpt)) {
    // Tier-based filtering
    filtered = usersWithTier.filter(u => u.tierLabel === filter);
  } else {
    // PR-based filtering - filter by users who have PRs for this lift
    filtered = usersWithTier.filter(u => u.prs && u.prs[filter]);
  }
  
  const searched = q ? filtered.filter(u => norm(u.username).includes(norm(q))) : filtered;
  
  return searched.sort((a, b) => {
    // If filtering by PR, sort by that PR value first
    if (PR_OPTS.includes(filter as PRFilterOpt)) {
      const aPR = a.prs?.[filter] || 0;
      const bPR = b.prs?.[filter] || 0;
      if (aPR !== bPR) return bPR - aPR;
    }
    
    return new Date(b.lastWorkoutAt || 0).getTime() - new Date(a.lastWorkoutAt || 0).getTime() ||
      (b.prCount || 0) - (a.prCount || 0) ||
      a.username.localeCompare(b.username);
  });
}