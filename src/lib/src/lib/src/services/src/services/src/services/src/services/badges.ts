import { getBadgesForUser, type Badge } from "./api";

export async function fetchUserBadges(userId: string): Promise<Badge[]> {
  return getBadgesForUser(userId);
}
