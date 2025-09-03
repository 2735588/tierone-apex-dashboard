import { nextAllowedUpdate } from "@/lib/cooldown";

export default function PRCard({
  lift, valueKg, updatedAt, onEdit, enforceWeekly = false
}: {
  lift: string;
  valueKg: number;
  updatedAt?: string;
  onEdit: ()=>void;
  enforceWeekly?: boolean;
}) {
  const { allowed, waitDays } = nextAllowedUpdate(updatedAt, 7);
  const lock = enforceWeekly && !allowed;

  return (
    <div className="rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-zinc-100">{lift}</div>
          <div className="mt-1 text-emerald-400 text-2xl font-extrabold">{valueKg}<span className="text-sm text-emerald-300"> kg</span></div>
          <div className="mt-1 text-[11px] text-zinc-400">Updated {updatedAt ? new Date(updatedAt).toLocaleDateString() : "—"}</div>
          {!enforceWeekly && updatedAt && (
            <div className="mt-1 text-[11px] text-zinc-500">Next suggested check: {waitDays ? `${waitDays} day(s)` : "anytime"}</div>
          )}
          {lock && <div className="mt-1 text-[11px] text-amber-400/90">Next allowed update in {waitDays} day(s)</div>}
        </div>
        <button
          onClick={onEdit}
          disabled={lock}
          className={`rounded-lg px-3 py-2 text-sm ${lock ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-emerald-500 text-black font-semibold"}`}
        >
          Update PR
        </button>
      </div>
    </div>
  );
}