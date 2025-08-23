// src/services.ts — mock backend so the app works now (no accounts needed)

export type PoseLabel =
  | "front_relaxed" | "back_relaxed" | "left_side" | "right_side"
  | "front_flex" | "back_flex" | "most_muscular" | "ab_thigh"
  | "front_double_biceps" | "back_double_biceps";

export type MuscleScore = { muscle_group: string; tier_score: number; percentile: number };
export type ScorePayload = {
  overall_score: number;
  tier: "Bronze"|"Silver"|"Gold"|"Platinum"|"Diamond"|"Legend";
  bodyfat_pct: number;
  muscle_scores: MuscleScore[];
};

const mockDB: { scans: Record<string, any>; scores: Record<string, ScorePayload> } = { scans: {}, scores: {} };

function makeId() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }
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
  return groups.map(g => ({
    muscle_group: g,
    tier_score: Math.floor(40 + Math.random()*60),
    percentile: Math.round(50 + Math.random()*50),
  }));
}

// ---- Scan flow (mock) ----
export async function startScan(): Promise<{ scanId: string; uploadUrls: Record<PoseLabel,string> }> {
  const scanId = makeId();
  const poses: PoseLabel[] = [
    "front_relaxed","back_relaxed","left_side","right_side",
    "front_flex","back_flex","most_muscular","ab_thigh",
    "front_double_biceps","back_double_biceps"
  ];
  mockDB.scans[scanId] = { status: "draft", photos: {} };
  const uploadUrls = Object.fromEntries(poses.map(p => [p, `mock://upload/${scanId}/${p}`])) as Record<PoseLabel,string>;
  return { scanId, uploadUrls };
}

export async function uploadPose(uploadUrl: string, file: File) {
  if (!uploadUrl.startsWith("mock://")) return;
  const parts = uploadUrl.split("/"); // mock://upload/<scanId>/<pose>
  const scanId = parts[3]; const pose = parts[4];
  if (!mockDB.scans[scanId]) mockDB.scans[scanId] = { status: "draft", photos: {} };
  mockDB.scans[scanId].photos[pose] = URL.createObjectURL(file); // for preview if needed
}

export async function completeScan(scanId: string) {
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

// ---- Leaderboard (mock) ----
export type LeaderboardRow = { position: number; handle: string; country: string; overall_score: number; delta?: number };

export async function fetchLeaderboard(): Promise<LeaderboardRow[]> {
  return Array.from({ length: 20 }).map((_, i) => ({
    position: i + 1,
    handle: `user${i + 1}`,
    country: ["NZ", "AU", "US", "GB"][i % 4],
    overall_score: Math.floor(55 + Math.random()*40),
    delta: Math.floor(-3 + Math.random()*7),
  }));
}

// ---- Badges (mock) ----
export type Badge = { slug: string; name: string; description: string; rarity: "common"|"rare"|"epic" };

export async function fetchUserBadges(): Promise<Badge[]> {
  return [
    { slug: "first-scan", name: "First Scan", description: "Completed your first scan", rarity: "common" },
    { slug: "streak-7", name: "Streak 7", description: "7-day training streak", rarity: "rare" },
  ];
}