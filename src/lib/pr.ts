export const MAIN_LIFTS = ["Back Squat", "Bench Press", "Deadlift", "Overhead Press"] as const;
export type MainLift = typeof MAIN_LIFTS[number];

export function kgToLb(kg: number) { return Math.round(kg * 2.20462 * 10) / 10; }
export function lbToKg(lb: number) { return Math.round((lb / 2.20462) * 10) / 10; }

export { nextAllowedUpdate } from "./cooldown";