interface WeakSpotNudgeProps {
  muscleGroup: string;
  deficit: number;
  exercises: string[];
  onQuickLog: () => void;
}

export function WeakSpotNudge({ muscleGroup, deficit, exercises, onQuickLog }: WeakSpotNudgeProps) {
  return (
    <div className="px-4 mt-4">
      <div className="relative rounded-xl p-3 bg-amber-500/5 ring-1 ring-amber-500/20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(80% 80% at 50% 0%, rgba(245,158,11,.08), transparent 70%)" }} />
        
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-amber-200">
                {muscleGroup} lagging by {deficit} pts
              </div>
              <div className="text-xs text-amber-300/80 mt-1">
                Try {exercises.join(", ")} (3×8–12)
              </div>
            </div>
            
            <button
              onClick={onQuickLog}
              className="ml-3 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-medium rounded-lg transition-colors"
              style={{ minHeight: "32px" }}
            >
              Quick Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}