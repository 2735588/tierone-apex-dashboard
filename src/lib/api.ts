export type PRRecord = { valueKg: number; updatedAt?: string; proofUrl?: string };

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
export async function fetchCurrentPRs(): Promise<Record<string, PRRecord>> {
  // TODO: call your backend. For now, mock:
  return {
    "Back Squat":     { valueKg: 160, updatedAt: "2025-08-30T10:00:00Z", proofUrl: "" },
    "Bench Press":    { valueKg: 110, updatedAt: "2025-08-28T10:00:00Z", proofUrl: "" },
    "Deadlift":       { valueKg: 200, updatedAt: "2025-08-20T10:00:00Z", proofUrl: "" },
    "Overhead Press": { valueKg: 70,  updatedAt: "2025-08-22T10:00:00Z", proofUrl: "" },
  };
}

// 1) Ask server for a presigned URL to upload the video
export async function signVideoUpload(filename: string, mime: string, bytes: number): Promise<{ uploadUrl:string; fileUrl:string; mediaId:string }> {
  // POST /media/sign-upload { filename, mime, bytes }
  return { uploadUrl: "", fileUrl: "", mediaId: "" }; // mock
}

// 2) Submit PR with the uploaded media id (server will enforce 7-day cooldown)
export async function submitPRWithVideo(lift: string, valueKg: number, mediaId: string): Promise<PRRecord> {
  // POST /prs/submit-with-video { lift, valueKg, mediaId }
  return { valueKg, updatedAt: new Date().toISOString(), proofUrl: "" };
}

// Manual upsert (no media). Returns updated record.
export async function upsertManualPR(lift: string, valueKg: number) {
  // POST /prs/upsert-manual { lift, valueKg }
  // Return { valueKg, updatedAt }
  return { valueKg, updatedAt: new Date().toISOString() };
}

// Workout & Streak APIs
export async function getStreak(): Promise<{ days: number; loggedToday: boolean }> {
  // GET /streaks/me
  return { days: 7, loggedToday: false }; // mock
}

export async function getFriendsStreaks(): Promise<Array<{ id:string; name:string; days:number }>> {
  // GET /streaks/friends
  return [
    { id:"1", name:"Alex", days:14 },
    { id:"2", name:"Sam",  days:9  },
    { id:"3", name:"Jess", days:6  },
  ];
}

export async function startQuickWorkout(): Promise<{ sessionId:string }> {
  // POST /workouts/quick/start
  return { sessionId:"mock" };
}

export async function completeQuickWorkout(sessionId?: string): Promise<{ ok:boolean }> {
  // POST /workouts/quick/complete
  return { ok:true };
}

// Call when a PR is updated to keep streaks alive.
export async function pingStreak() {
  // POST /streaks/ping  (mark activity today)
  return { ok: true };
}
