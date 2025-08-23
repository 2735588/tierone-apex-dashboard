import { reserveScan, uploadPhoto, finalizeScan, getScore, type PoseLabel, type ScorePayload } from "./api";

export async function startScan(): Promise<{ scanId: string; uploadUrls: Record<PoseLabel,string> }> {
  const res = await reserveScan();
  return { scanId: res.scan_id, uploadUrls: res.upload_urls };
}

export async function uploadPose(uploadUrl: string, file: File) {
  return uploadPhoto(uploadUrl, file);
}

export async function completeScan(scanId: string) {
  return finalizeScan(scanId);
}

export async function fetchScore(scanId: string): Promise<ScorePayload | null> {
  return getScore(scanId);
}
