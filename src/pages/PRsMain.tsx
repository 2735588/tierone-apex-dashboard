import { useEffect, useState } from "react";
import { MAIN_LIFTS } from "@/lib/pr";
import { fetchCurrentPRs, PRRecord, pingStreak } from "@/lib/api";
import PRCard from "@/components/PRCard";
import PRUpdateModalVideo from "@/components/PRUpdateModalVideo";
import VideoModal from "@/components/VideoModal";

export default function PRsMain() {
  const [prs, setPrs] = useState<Record<string, PRRecord>>({});
  const [editing, setEditing] = useState<{ lift: string; open: boolean } | null>(null);
  const [viewing, setViewing] = useState<{ lift: string; url: string; open: boolean } | null>(null);

  useEffect(() => { (async () => setPrs(await fetchCurrentPRs()))(); }, []);

  function handleSaved(lift: string, updated: PRRecord) {
    setPrs(prev => ({ ...prev, [lift]: updated }));
  }

  return (
    <div className="pb-24">
      <div className="px-4 pt-3 pb-2">
        <div className="text-lg font-semibold text-zinc-100">Main Lift PRs</div>
        <div className="text-[12px] text-zinc-400 mt-1">Video proof required • Updates allowed once every 7 days</div>
      </div>

      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MAIN_LIFTS.map(lift => (
          <PRCard
            key={lift}
            lift={lift}
            valueKg={prs[lift]?.valueKg ?? 0}
            updatedAt={prs[lift]?.updatedAt}
            proofUrl={prs[lift]?.proofUrl}
            onEdit={() => setEditing({ lift, open: true })}
            onViewProof={prs[lift]?.proofUrl ? () => setViewing({ lift, url: prs[lift].proofUrl!, open: true }) : undefined}
          />
        ))}
      </div>

      <PRUpdateModalVideo
        open={!!editing?.open}
        lift={editing?.lift ?? ""}
        currentKg={editing?.lift ? (prs[editing.lift]?.valueKg ?? 0) : 0}
        onClose={() => setEditing(null)}
        onSaved={(updated) => handleSaved(editing!.lift, updated)}
      />

      <VideoModal
        open={!!viewing?.open}
        title={viewing?.lift ?? ""}
        videoUrl={viewing?.url ?? ""}
        onClose={() => setViewing(null)}
      />
    </div>
  );
}