interface PR {
  lift: string;
  value: number;
}

interface RecentPRStripProps {
  onAdd: () => void;
}

export function RecentPRStrip({ onAdd }: RecentPRStripProps) {
  // Mock data - TODO: Connect to actual PR data
  const recentPRs: PR[] = [
    { lift: "Bench Press", value: 225 },
    { lift: "Squat", value: 315 },
    { lift: "Deadlift", value: 405 },
  ];

  return (
    <div className="px-4 mt-4">
      <div className="rounded-2xl bg-zinc-900/60 ring-1 ring-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-zinc-100">Recent PRs</h3>
          <button
            onClick={onAdd}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            + Add PR
          </button>
        </div>
        
        {recentPRs.length > 0 ? (
          <div className="space-y-2">
            {recentPRs.map((pr, i) => (
              <div key={i} className="flex justify-between items-center py-1">
                <span className="text-sm text-zinc-300">{pr.lift}</span>
                <span className="text-sm text-zinc-100 font-medium">{pr.value} lbs</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-zinc-400">
            <div className="text-sm">No PRs logged yet</div>
          </div>
        )}
      </div>
    </div>
  );
}