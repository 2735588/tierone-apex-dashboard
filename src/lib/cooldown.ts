export function nextAllowedUpdate(lastAt?: string, days = 7) {
  if (!lastAt) return { allowed: true, waitDays: 0, nextAt: null as string | null };
  const last = new Date(lastAt).getTime();
  const ms = days * 24 * 60 * 60 * 1000;
  const next = last + ms;
  const now = Date.now();
  if (now >= next) return { allowed: true, waitDays: 0, nextAt: new Date(next).toISOString() };
  const waitDays = Math.ceil((next - now) / (24 * 60 * 60 * 1000));
  return { allowed: false, waitDays, nextAt: new Date(next).toISOString() };
}

export function fmtDateShort(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}