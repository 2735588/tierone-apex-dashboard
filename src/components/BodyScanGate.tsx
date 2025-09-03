import { useEffect, useState } from "react";
import { getLastBodyScan, startBodyScan } from "@/lib/api";
import { nextAllowedUpdate, fmtDateShort } from "@/lib/cooldown";

export default function BodyScanGate({
  onStarted
}: { onStarted: () => void }) {
  const [last, setLast] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    (async () => {
      const { lastScanAt } = await getLastBodyScan();
      setLast(lastScanAt);
      setLoading(false);
    })();
  }, []);

  const cd = nextAllowedUpdate(last, 7);
  const disabled = loading || !cd.allowed;

  async function handleStart() {
    setStarting(true);
    const res = await startBodyScan();
    setStarting(false);
    if (res.started) {
      onStarted?.();
    } else {
      // backend said still locked (authoritative)
      // optionally toast: `Next scan: ${fmtDateShort(res.nextAt)}`
    }
  }

  return (
    <div className="px-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(80% 80% at 50% 0%, rgba(16,185,129,.18), transparent 70%)" }} />
        <div className="relative">
          <div className="text-2xl font-extrabold text-zinc-100">Ready to level up?</div>
          <div className="mt-1 text-zinc-400">Body Scan updates your TierScore and muscle breakdown.</div>

          <button
            onClick={handleStart}
            disabled={disabled || starting}
            className={`mt-4 w-full rounded-xl py-3 transition ${
              disabled ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
            }`}
          >
            {starting ? "Starting…" : cd.allowed ? "+ Start Body Scan" : `Locked • Next ${fmtDateShort(cd.nextAt ?? "")}`}
          </button>

          <div className="mt-2 text-[12px] text-zinc-400">
            {loading
              ? "Checking eligibility…"
              : last
                ? <>Last scan: {fmtDateShort(last)} • Scans allowed once every 7 days</>
                : "You haven't scanned yet • Scans allowed once every 7 days"}
          </div>
        </div>
      </div>
    </div>
  );
}