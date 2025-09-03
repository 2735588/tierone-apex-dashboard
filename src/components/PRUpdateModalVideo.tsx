import { useEffect, useMemo, useRef, useState } from "react";
import { kgToLb, lbToKg } from "@/lib/pr";
import { signVideoUpload, submitPRWithVideo, pingStreak } from "@/lib/api";

function VideoPicker({
  file, setFile
}: { file: File | null; setFile: (f: File | null)=>void }) {
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  return (
    <div className="mt-4">
      <label className="text-[11px] text-zinc-400">Video proof (required)</label>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="file" accept="video/*"
          onChange={(e)=> setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-[12px] file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0
                     file:bg-zinc-800 file:text-zinc-200 file:cursor-pointer text-zinc-300"
        />
      </div>
      {preview && (
        <video src={preview} controls className="mt-2 w-full rounded-lg ring-1 ring-white/10" />
      )}
      <div className="mt-1 text-[11px] text-zinc-500">MP4/MOV recommended • up to ~60s • good lighting</div>
    </div>
  );
}

export default function PRUpdateModalVideo({
  open, onClose, lift, currentKg, onSaved
}: {
  open: boolean; onClose: ()=>void; lift: string; currentKg: number;
  onSaved: (updated:{ valueKg:number; updatedAt?:string; proofUrl?:string })=>void;
}) {
  const [unit, setUnit] = useState<"kg"|"lb">("kg");
  const [val, setVal] = useState<number>(currentKg);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const shown = useMemo(()=> unit==="kg" ? val : kgToLb(val), [val, unit]);
  const setShown = (n:number)=> setVal(unit==="kg" ? n : lbToKg(n));

  useEffect(()=>{ if(open){ setUnit("kg"); setVal(currentKg); setFile(null);} }, [open, currentKg]);

  async function handleSave() {
    if (!file) return; // required
    setBusy(true);
    try {
      const sig = await signVideoUpload(file.name, file.type || "video/mp4", file.size);
      await fetch(sig.uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type || "video/mp4" } });
      const updated = await submitPRWithVideo(lift, val, sig.mediaId);
      onSaved(updated);
      await pingStreak();
      onClose();
    } catch (e) {
      // optionally toast error
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-end md:place-items-center p-0 md:p-6">
      <div className="w-full md:w-[440px] rounded-t-2xl md:rounded-2xl bg-zinc-950 ring-1 ring-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-zinc-400">Update PR (video required)</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-200">✕</button>
        </div>

        <div className="text-lg font-semibold text-zinc-100">{lift}</div>

        <div className="mt-4 flex items-end gap-3">
          <div className="flex-1">
            <label className="text-[11px] text-zinc-400">PR Value</label>
            <input
              inputMode="decimal"
              value={Number.isFinite(shown) ? shown : ""}
              onChange={(e)=> setShown(parseFloat(e.target.value || "0"))}
              className="mt-1 w-full rounded-xl bg-zinc-900 ring-1 ring-white/10 px-3 py-2 text-zinc-100"
            />
          </div>
          <div>
            <label className="text-[11px] text-zinc-400">Unit</label>
            <select value={unit} onChange={(e)=> setUnit(e.target.value as any)}
              className="mt-1 rounded-xl bg-zinc-900 ring-1 ring-white/10 px-2 py-2 text-zinc-100">
              <option>kg</option><option>lb</option>
            </select>
          </div>
        </div>

        <VideoPicker file={file} setFile={setFile} />

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg px-3 py-2 bg-zinc-800 text-zinc-200">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!file || busy}
            className={`rounded-lg px-3 py-2 ${!file || busy ? "bg-zinc-800 text-zinc-500" : "bg-emerald-500 text-black font-semibold"}`}
          >
            {busy ? "Uploading…" : "Save PR"}
          </button>
        </div>
      </div>
    </div>
  );
}