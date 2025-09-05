import { nextAllowedUpdate, fmtDateShort } from "@/lib/cooldown";
import { Play } from "lucide-react";

export default function PRCard({
  lift, valueKg, updatedAt, proofUrl, onEdit, onViewProof, canEdit = true
}: {
  lift: string; valueKg: number; updatedAt?: string; proofUrl?: string; onEdit: ()=>void; onViewProof?: ()=>void; canEdit?: boolean;
}) {
  const cd = nextAllowedUpdate(updatedAt, 7); // enforce weekly
  const locked = !cd.allowed;
  const hasProof = proofUrl && proofUrl.length > 0;

  return (
    <div className="rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold text-zinc-100">{lift}</div>
            {hasProof && (
              <div className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                VERIFIED
              </div>
            )}
          </div>
          <div className="mt-1 text-emerald-400 text-2xl font-extrabold">{valueKg}<span className="text-sm text-emerald-300"> kg</span></div>
          <div className="mt-1 text-[11px] text-zinc-400">Updated {updatedAt ? fmtDateShort(updatedAt) : "—"}</div>
          {locked && <div className="mt-1 text-[11px] text-amber-400/90">Next allowed update in {cd.waitDays} day(s)</div>}
        </div>
        <div className="flex flex-col gap-2">
          {canEdit && (
            <button
              onClick={onEdit}
              disabled={locked}
              className={`rounded-lg px-3 py-2 text-sm ${locked ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-emerald-500 text-black font-semibold"}`}
            >
              Update PR
            </button>
          )}
          {hasProof && onViewProof && (
            <button
              onClick={onViewProof}
              className="rounded-lg px-3 py-2 text-sm bg-zinc-800 text-zinc-200 hover:bg-zinc-700 flex items-center gap-1"
            >
              <Play className="w-3 h-3" />
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}