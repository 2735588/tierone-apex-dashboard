import { useEffect, useState } from "react";
import { MAIN_LIFTS } from "@/lib/pr";
import { fetchCurrentPRs, upsertManualPR, pingStreak } from "@/lib/api";
import PRCard from "@/components/PRCard";
import PRUpdateModal from "@/components/PRUpdateModal";

export default function PRsMain() {
  const [prs, setPrs] = useState<Record<string, { valueKg: number, updatedAt?: string }>>({});
  const [editing, setEditing] = useState<{ lift: string; open: boolean } | null>(null);

  useEffect(() => { (async () => setPrs(await fetchCurrentPRs()))(); }, []);

  async function saveLift(lift: string, valueKg: number) {
    const updated = await upsertManualPR(lift, valueKg);
    setPrs(prev => ({ ...prev, [lift]: updated }));
    await pingStreak(); // connect to streaks on PR update
  }

  return (
    <div className="pb-24">
      <div className="px-4 pt-3 pb-2">
        <div className="text-lg font-semibold text-zinc-100">Main Lift PRs</div>
        <div className="text-[12px] text-zinc-400 mt-1">Manual updates (no video). Weekly proof can be enabled later.</div>
      </div>

      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MAIN_LIFTS.map(lift => (
          <PRCard
            key={lift}
            lift={lift}
            valueKg={prs[lift]?.valueKg ?? 0}
            updatedAt={prs[lift]?.updatedAt}
            onEdit={() => setEditing({ lift, open: true })}
            enforceWeekly={false} // turn true when you require weekly + video
          />
        ))}
      </div>

      <PRUpdateModal
        open={!!editing?.open}
        lift={editing?.lift ?? ""}
        currentKg={editing?.lift ? (prs[editing.lift]?.valueKg ?? 0) : 0}
        onClose={() => setEditing(null)}
        onSave={(kg) => saveLift(editing!.lift, kg)}
      />
    </div>
  );
}