export const MAIN_LIFTS = ["Back Squat", "Bench Press", "Deadlift", "Overhead Press"] as const;
export type MainLift = typeof MAIN_LIFTS[number];

export function kgToLb(kg: number) { return Math.round(kg * 2.20462 * 10) / 10; }
export function lbToKg(lb: number) { return Math.round((lb / 2.20462) * 10) / 10; }

export function nextAllowedUpdate(lastAt?: string, days = 7) {
  if (!lastAt) return { allowed: true, waitDays: 0 };
  const last = new Date(lastAt).getTime();
  const now = Date.now();
  const ms = days * 24 * 60 * 60 * 1000;
  const diff = last + ms - now;
  if (diff <= 0) return { allowed: true, waitDays: 0 };
  return { allowed: false, waitDays: Math.ceil(diff / (24*60*60*1000)) };
}