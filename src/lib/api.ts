// Body scan
export async function getLastBodyScan(): Promise<{ lastScanAt?: string }> {
  // GET /scans/last  -> { lastScanAt?: ISO }
  return { lastScanAt: undefined }; // mock
}

export async function startBodyScan(): Promise<{ started: boolean; reason?: string; nextAt?: string }> {
  // POST /scans/start
  // Server must enforce: if < 7 days since last scan, return { started:false, reason:"cooldown", nextAt }
  return { started: true };
}

// PRs (as before)
export async function fetchCurrentPRs(): Promise<Record<string, { valueKg: number; updatedAt?: string }>> {
  // TODO: call your backend. For now, mock:
  return {
    "Back Squat":     { valueKg: 160, updatedAt: "2025-08-30T10:00:00Z" },
    "Bench Press":    { valueKg: 110, updatedAt: "2025-08-28T10:00:00Z" },
    "Deadlift":       { valueKg: 200, updatedAt: "2025-08-20T10:00:00Z" },
    "Overhead Press": { valueKg: 70,  updatedAt: "2025-08-22T10:00:00Z" },
  };
}

// Manual upsert (no media). Returns updated record.
export async function upsertManualPR(lift: string, valueKg: number) {
  // POST /prs/upsert-manual { lift, valueKg }
  // Return { valueKg, updatedAt }
  return { valueKg, updatedAt: new Date().toISOString() };
}

// Call when a PR is updated to keep streaks alive.
export async function pingStreak() {
  // POST /streaks/ping
  return { ok: true };
}
