import { supabase, hasSupabase } from "@/lib/supabaseClient";

export type PoseLabel =
  | "front_relaxed"
  | "back_relaxed"
  | "left_side"
  | "right_side"
  | "front_flex"
  | "back_flex"
  | "most_muscular"
  | "ab_thigh"
  | "front_double_biceps"
  | "back_double_biceps";

export interface ReserveResponse {
  scan_id: string;
  upload_urls: Record<PoseLabel, string>;
}

export interface MuscleScore {
  muscle_group: string;
  tier_score: number;
  percentile: number;
}

export interface ScorePayload {
  overall_score: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond" | "Legend";
  bodyfat_pct: number;
  muscle_scores: MuscleScore[];
}

const mockDB: any = {
  scans: {},
  scores: {},
};

function uid() {
  return crypto.randomUUID();
}

function randomTier(score: number) {
  if (score >= 90) return "Legend";
  if (score >= 80) return "Diamond";
  if (score >= 70) return "Platinum";
  if (score >= 60) return "Gold";
  if (score >= 50) return "Silver";
  return "Bronze";
}

function mockMuscleScores(): MuscleScore[] {
  const groups = ["Chest","Back","Shoulders","Arms","Quads","Hamstrings","Glutes","Calves","Abs"];
  return groups.map(g => {
    const ts = Math.floor(40 + Math.random()*60);
    const pct = Math.round(50 + Math.random()*50);
    return { muscle_group: g, tier_score: ts, percentile: pct };
  });
}

export async function reserveScan(): Promise<ReserveResponse> {
  if (!hasSupabase) {
    const scan_id = uid();
    const poses: PoseLabel[] = [
      "front_relaxed","back_relaxed","left_side","right_side",
      "front_flex","back_flex","most_muscular","ab_thigh",
      "front_double_biceps","back_double_biceps"
    ];
    mockDB.scans[scan_id] = { status: "draft", photos: {} };
    return {
      scan_id,
      upload_urls: Object.fromEntries(
        poses.map(p => [p, `mock://upload/${scan_id}/${p}`])
      ) as Record<PoseLabel,string>,
    };
  }

  // TODO: implement Supabase version later
  return { scan_id: uid(), upload_urls: {} as Record<PoseLabel,string> };
}

export async function uploadPhoto(uploadUrl: string, file: File): Promise<void> {
  if (uploadUrl.startsWith("mock://")) {
    const [_, __, scan_id, pose] = uploadUrl.split("/");
    if (!mockDB.scans[scan_id]) mockDB.scans[scan_id] = { status: "draft", photos: {} };
    mockDB.scans[scan_id].photos[pose] = URL.createObjectURL(file);
    return;
  }
  await new Promise((r)=>setTimeout(r, 200));
}

export async function finalizeScan(scan_id: string): Promise<void> {
  if (!hasSupabase) {
    mockDB.scans[scan_id].status = "processing";
    setTimeout(() => {
      const overall = Math.floor(45 + Math.random()*55);
      mockDB.scans[scan_id].status = "scored";
      mockDB.scores[scan_id] = {
        overall_score: overall,
        tier: randomTier(overall),
        bodyfat_pct: Math.round(8 + Math.random()*20),
        muscle_scores: mockMuscleScores(),
      };
    }, 1200);
    return;
  }
}

export async function getScore(scan_id: string): Promise<ScorePayload | null> {
  if (!hasSupabase) {
    return mockDB.scores[scan_id] ?? null;
  }
  return null;
}

export type LeaderboardRow = {
  position: number;
  handle: string;
  country: string;
  overall_score: number;
  delta?: number;
};

const mockLeaders: LeaderboardRow[] = Array.from({length:20}).map((_,i)=>({
  position: i+1,
  handle: `user${i+1}`,
  country: ["NZ","AU","US","GB"][i%4],
  overall_score: Math.floor(55 + Math.random()*40),
  delta: Math.floor(-3 + Math.random()*7),
}));

export async function getLeaderboard(scope: "global"|"country"="global", country?: string, period: "daily"|"weekly"|"alltime"="alltime"): Promise<LeaderboardRow[]> {
  if (!hasSupabase) return mockLeaders;
  return [];
}

export type Badge = { slug: string; name: string; description: string; rarity: "common"|"rare"|"epic"; };

export async function getBadgesForUser(userId: string): Promise<Badge[]> {
  if (!hasSupabase) {
    return [
      { slug: "first-scan", name: "First Scan", description: "Completed your first scan", rarity: "common" },
      { slug: "streak-7", name: "Streak 7", description: "7-day training streak", rarity: "rare" },
    ];
  }
  return [];
}
