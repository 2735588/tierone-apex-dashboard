import { useEffect, useState } from "react";
import { getLastBodyScan, startBodyScan } from "@/lib/api";
import { nextAllowedUpdate, fmtDateShort } from "@/lib/cooldown";

interface BodyScanCardProps {
  onStarted: () => void;
}

export function BodyScanCard({ onStarted }: BodyScanCardProps) {
  const [lastScan, setLastScan] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  // Mock deltas for now - in real app this would come from API
  const mockDeltas = {
    tierScore: 4,
    topMuscles: [
      { name: "Shoulders", delta: 6 },
      { name: "Back", delta: 3 },
      { name: "Arms", delta: 2 }
    ]
  };

  useEffect(() => {
    (async () => {
      const { lastScanAt } = await getLastBodyScan();
      setLastScan(lastScanAt);
      setLoading(false);
    })();
  }, []);

  const cooldown = nextAllowedUpdate(lastScan, 7);

  async function handleStart() {
    if (!cooldown.allowed) return;
    
    setStarting(true);
    const res = await startBodyScan();
    setStarting(false);
    
    if (res.started) {
      onStarted();
    }
  }

  const getDaysUntilNext = () => {
    if (cooldown.allowed) return 0;
    return cooldown.waitDays;
  };

  return (
    <div className="px-4 mt-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(80% 80% at 50% 0%, rgba(16,185,129,.10), transparent 70%)" }} />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-sm font-semibold text-zinc-100">Body Scan</div>
              <div className="text-xs text-zinc-400">
                {loading 
                  ? "Checking status..."
                  : lastScan 
                    ? `Last: ${fmtDateShort(lastScan)}`
                    : "Never scanned"
                }
              </div>
            </div>
            
            {lastScan && !loading && (
              <div className="text-right">
                <div className="text-xs text-emerald-400 font-medium">
                  +{mockDeltas.tierScore} TierScore
                </div>
                <div className="text-[10px] text-zinc-500">last scan</div>
              </div>
            )}
          </div>

          {/* Recent improvements */}
          {lastScan && !loading && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {mockDeltas.topMuscles.map((muscle, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full"
                  >
                    {muscle.name} +{muscle.delta}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={loading || !cooldown.allowed || starting}
            className={`w-full rounded-xl py-3 font-medium transition-all ${
              loading || !cooldown.allowed || starting
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed text-sm"
                : "bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
            }`}
            style={{ minHeight: "44px" }}
          >
            {starting 
              ? "Starting Scan..." 
              : cooldown.allowed 
                ? "Start Body Scan"
                : `Next scan in ${getDaysUntilNext()} day${getDaysUntilNext() !== 1 ? 's' : ''}`
            }
          </button>

          <div className="mt-2 text-[11px] text-zinc-500 text-center">
            Scans update your TierScore and muscle breakdown
          </div>
        </div>
      </div>
    </div>
  );
}