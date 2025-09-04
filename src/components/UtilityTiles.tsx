interface UtilityAction {
  label: string;
  sub: string;
  onClick: () => void;
}

interface UtilityTilesProps {
  actions: UtilityAction[];
}

export function UtilityTiles({ actions }: UtilityTilesProps) {
  return (
    <div className="px-4 mt-6">
      <div className="grid grid-cols-2 gap-3">
        {actions.slice(0, 4).map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className="relative rounded-xl p-3 bg-zinc-900/40 ring-1 ring-white/5 hover:bg-zinc-900/60 transition-all text-left group"
            style={{ minHeight: "44px" }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "radial-gradient(80% 80% at 50% 0%, rgba(16,185,129,.06), transparent 70%)" }} />
            
            <div className="relative">
              <div className="text-sm font-medium text-zinc-100">{action.label}</div>
              <div className="text-xs text-zinc-400 mt-0.5">{action.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}