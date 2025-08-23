// src/services.ts
// One-file services so you don't need multiple folders.
// Works in "mock mode" now. Later, add Supabase keys to use a real backend.

import { createClient } from "@supabase/supabase-js";

// ----- Minimal "supabase client" with safe fallback -----
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
export const hasSupabase = !!supabase;

// ----- Types -----
export type PoseLabel =
  | "front_relaxed" | "back_relaxed" | "left_side" | "right_side"
  | "front_flex" | "back_flex" | "most_muscular" | "ab_thigh"
  | "front_double_biceps" | "back_double_biceps";

export type ReserveResponse = {
  scan_id: string;
  upload_urls: Record<PoseLabel, string>;
};

export type MuscleScore = { muscle_group: string; tier_score: number; percentile: number };
export type ScorePayload = {
  overall_score: number;
  tier: "Bronze"|"Silver"|"Gold"|"Platinum"|"Diamond"|"Legend";
  bodyfat_pct: number;
  muscle_scores: MuscleScore[];
};

// ----- Mock DB so everything works right now -----
const mockDB: any = { scans: {} as Record<string, any>, scores: {} as Record<string, ScorePayload> };

function uid() { return (crypto as any).randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2); }
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

// ----- Public functions your pages will use -----
export async function startScan(): Promise<{ scanId: string; uploadUrls: Record<PoseLabel,string> }> {
  // Mock for now
  const scan_id = uid();
  const poses: PoseLabel[] = [
    "front_relaxed","back_relaxed","left_side","right_side",
    "front_flex","back_flex","most_muscular","ab_thigh",
    "front_double_biceps","back_double_biceps"
  ];
  mockDB.scans[scan_id] = { status: "draft", photos: {} };
  return {
    scanId: scan_id,
    uploadUrls: Object.fromEntries(poses.map(p => [p, `mock://upload/${scan_id}/${p}`])) as Record<PoseLabel,string>,
  };
}

export async function uploadPose(uploadUrl: string, file: File) {
  // Mock just stores an object URL so UI can preview
  if (uploadUrl.startsWith("mock://")) {
    const parts = uploadUrl.split("/"); // mock://upload/<scan>/<pose>
    const scan_id = parts[3]; const pose = parts[4];
    if (!mockDB.scans[scan_id]) mockDB.scans[scan_id] = { status: "draft", photos: {} };
    mockDB.scans[scan_id].photos[pose] = URL.createObjectURL(file);
    return;
  }
  // TODO: PUT to signed URL when Supabase is enabled
  await new Promise(r => setTimeout(r, 200));
}

export async function completeScan(scanId: string) {
  // Mock: simulate scoring
  mockDB.scans[scanId].status = "processing";
  setTimeout(() => {
    const overall = Math.floor(45 + Math.random()*55);
    mockDB.scans[scanId].status = "scored";
    mockDB.scores[scanId] = {
      overall_score: overall,
      tier: randomTier(overall),
      bodyfat_pct: Math.round(8 + Math.random()*20),
      muscle_scores: mockMuscleScores(),
    };
  }, 1200);
}

export async function fetchScore(scanId: string): Promise<ScorePayload | null> {
  return mockDB.scores[scanId] ?? null;
}

export type LeaderboardRow = { position: number; handle: string; country: string; overall_score: number; delta?: number; };

export async function fetchLeaderboard(
  scope: "global"|"country" = "global",
  country?: string,
  period: "daily"|"weekly"|"alltime" = "alltime"
): Promise<LeaderboardRow[]> {
  // Mock data
  return Array.from({length:20}).map((_,i)=>({
    position: i+1,
    handle: `user${i+1}`,
    country: ["NZ","AU","US","GB"][i%4],
    overall_score: Math.floor(55 + Math.random()*40),
    delta: Math.floor(-3 + Math.random()*7),
  }));
}

export type Badge = { slug: string; name: string; description: string; rarity: "common"|"rare"|"epic"; };
export async function fetchUserBadges(userId: string): Promise<Badge[]> {
  // Mock: show 2 starter badges
  return [
    { slug: "first-scan", name: "First Scan", description: "Completed your first scan", rarity: "common" },
    { slug: "streak-7", name: "Streak 7", description: "7-day training streak", rarity: "rare" },
  ];
}
