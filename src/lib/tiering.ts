export type Tier = "bronze" | "silver" | "gold" | "diamond" | "emerald";

export function tierFrom(score: number, percentile?: number): Tier {
  if (percentile !== undefined && percentile <= 1) return "emerald";
  if (score < 60) return "bronze";
  if (score < 70) return "silver";
  if (score < 80) return "gold";
  if (score < 90) return "diamond";
  return "diamond";
}

export function bucketByTier(users: Array<{
  id: string; 
  username: string; 
  score: number;
  percentile?: number; 
  lastWorkoutAt?: string; 
  prCount?: number;
}>) {
  const buckets = {
    bronze: [], 
    silver: [], 
    gold: [], 
    diamond: [], 
    emerald: []
  } as Record<Tier, any[]>;
  
  users.forEach(u => buckets[tierFrom(u.score, u.percentile)].push(u));
  
  const sort = (a: any, b: any) =>
    b.score - a.score ||
    (new Date(b.lastWorkoutAt || 0).getTime() - new Date(a.lastWorkoutAt || 0).getTime()) ||
    (b.prCount || 0) - (a.prCount || 0) ||
    a.username.localeCompare(b.username);
    
  (Object.keys(buckets) as Tier[]).forEach(t => buckets[t].sort(sort));
  return buckets;
}

export const tierConfig = {
  bronze: { name: "Bronze", color: "text-amber-600", bgColor: "bg-amber-600/10" },
  silver: { name: "Silver", color: "text-slate-400", bgColor: "bg-slate-400/10" },
  gold: { name: "Gold", color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  diamond: { name: "Diamond", color: "text-blue-400", bgColor: "bg-blue-400/10" },
  emerald: { name: "TierOne", color: "text-emerald-400", bgColor: "bg-emerald-400/10", glow: true }
} as const satisfies Record<Tier, { name: string; color: string; bgColor: string; glow?: boolean }>;