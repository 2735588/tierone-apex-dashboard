import { TierScoreBadgeView } from "@/components/TierScoreBadgeView";
import { getTierName } from "@/lib/tierScoreBadge";
import { Skeleton } from "@/components/ui/skeleton";

interface TodayCardProps {
  score: number;
  percentile?: number;
  todaysPlan?: "Rest" | "Push" | "Pull" | "Legs" | "Full-body";
  scanAvailable: boolean;
  onScanClick: () => void;
  onQuickLog: () => void;
  quickLogLoading?: boolean;
  loggedToday?: boolean;
  loading?: boolean;
}

export function TodayCard({
  score,
  percentile,
  todaysPlan,
  scanAvailable,
  onScanClick,
  onQuickLog,
  quickLogLoading = false,
  loggedToday = false,
  loading = false
}: TodayCardProps) {
  const currentTier = getTierName(score, percentile);
  const isEmerald = percentile !== undefined && percentile <= 1;
  
  // Calculate points to next tier
  const getPointsToNextTier = () => {
    if (isEmerald) return null;
    if (score < 60) return { points: 60 - score, tier: "Silver" };
    if (score < 70) return { points: 70 - score, tier: "Gold" };
    if (score < 80) return { points: 80 - score, tier: "Diamond" };
    if (score < 90) return { points: 90 - score, tier: "Emerald*" };
    return { points: null, tier: "Emerald*" }; // Already at max score tier
  };

  const nextTierInfo = getPointsToNextTier();

  if (loading) {
    return (
      <div className="px-4 mt-2">
        <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5">
          <div className="flex flex-col items-center text-center space-y-3">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-full h-12 rounded-xl" />  
            <Skeleton className="w-24 h-3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-2">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        {/* Subtle emerald glow behind badge */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 60% at 50% 25%, rgba(16,185,129,.12), transparent 70%)" }} />
        
        <div className="relative flex flex-col items-center text-center space-y-3">
          {/* TierScore Badge */}
          <div className="relative" style={{ filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))" }}>
            <TierScoreBadgeView score={score} percentile={percentile} size={92} />
          </div>

          {/* Today's Plan */}
          <div className="text-zinc-300 text-sm font-medium">
            {todaysPlan || "Ready to train?"}
          </div>

          {/* Primary CTA */}
          <button
            onClick={scanAvailable ? onScanClick : onQuickLog}
            disabled={quickLogLoading || (!scanAvailable && loggedToday)}
            className={`w-full rounded-xl px-4 py-3 font-semibold transition-all ${
              quickLogLoading || (!scanAvailable && loggedToday)
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-black"
            }`}
            style={{ minHeight: "44px" }}
          >
            {quickLogLoading 
              ? "Logging..." 
              : scanAvailable 
                ? "Start Body Scan" 
                : loggedToday 
                  ? "Logged Today" 
                  : "Quick Log"
            }
          </button>

          {/* Micro-progress line */}
          <div className="text-xs text-zinc-400">
            {isEmerald ? (
              "Top 1% • Emerald"
            ) : nextTierInfo?.points ? (
              `${nextTierInfo.points} pts to ${nextTierInfo.tier}`
            ) : (
              "Peak performance tier"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}