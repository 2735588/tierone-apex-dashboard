import { getLeaderboard, type LeaderboardRow } from "./api";

export async function fetchLeaderboard(
  scope: "global" | "country" = "global",
  country?: string,
  period: "daily" | "weekly" | "alltime" = "alltime"
): Promise<LeaderboardRow[]> {
  return getLeaderboard(scope, country, period);
}
