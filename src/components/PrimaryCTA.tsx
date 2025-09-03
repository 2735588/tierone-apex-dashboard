export function PrimaryCTA({ onScan }: { onScan: () => void }) {
  return (
    <div className="px-4">
      <div className="relative rounded-2xl p-4 bg-zinc-900/60 ring-1 ring-white/5 overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(80% 80% at 50% 0%, rgba(16,185,129,.18), transparent 70%)" }} />
        <div className="relative">
          <div className="text-2xl font-extrabold text-zinc-100">Ready to level up?</div>
          <div className="mt-1 text-zinc-400">Scan now to update your TierScore and muscle breakdown.</div>
          <button onClick={onScan}
            className="mt-4 w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 transition">
            + Start Body Scan
          </button>
        </div>
      </div>
    </div>
  );
}