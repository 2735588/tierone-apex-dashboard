type Action = { label: string; sub?: string; icon?: string; onClick: () => void; disabled?: boolean; };

export function QuickActions({ actions }: { actions: Action[] }) {
  return (
    <div className="px-4 mt-4 grid grid-cols-2 gap-3">
      {actions.map(a => (
        <button key={a.label} onClick={a.onClick} disabled={a.disabled}
          className={`rounded-2xl p-4 text-left ring-1 ring-white/5 bg-zinc-900/60 hover:bg-zinc-800 transition ${
            a.disabled ? "opacity-40 cursor-not-allowed" : ""}`}>
          <div className="text-zinc-100 font-semibold">{a.label}</div>
          {a.sub && <div className="text-[12px] text-zinc-400 mt-1">{a.sub}</div>}
        </button>
      ))}
    </div>
  );
}